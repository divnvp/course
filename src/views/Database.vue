<template>
    <v-container fluid>
    <v-card class="teal rounded-xl px-10 pa-10 elevation-0">
      <v-row class="white--text">
      <v-card-title class="font-weight-bold text-h2 pb-10">
        Студенты
      </v-card-title>
        <v-spacer></v-spacer>
        <v-col
            cols="12"
            sm="5"
            md="6"
            lg="6"
            xl="6"
            class="px-10">
        <v-text-field class="font-weight-medium text-input-white"
                      append-icon="search"
                      filled
                      label="Поиск"
                      v-model="search"
                      rounded
                      color="white">
        </v-text-field>
        </v-col>
      </v-row>
      <v-container fill-height fluid>
        <v-row>
          <v-col cols="12"
                 sm="6"
                 md="5"
                 lg="6"
                 xl="2">
            <v-btn rounded class="font-weight-bold" fab @click="addStudentBegin()">
              <v-icon color="teal darken-2">add</v-icon>
            </v-btn>
            <v-dialog
                v-model="editDialog"
                content-class="round"
                hide-overlay
                transition="dialog-bottom-transition"
                max-width="400px">
              <DialogAdd @save="saveStudent()" :value="saveStudentValue" :title="'Добавить студента'"></DialogAdd>
            </v-dialog>

          </v-col>
          <v-col cols="12" lg="6" class="text-right">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn rounded class="font-weight-bold indigo" fab v-bind="attrs" v-on="on" @click="logout">
                <v-icon color="white">mdi-logout-variant</v-icon>
              </v-btn>
            </template>
            <span>Выйти</span>
          </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn rounded text class="font-weight-bold" fab v-bind="attrs" v-on="on" @click="groups">
                  <v-icon size="50" color="white">mdi-menu-right-outline</v-icon>
                </v-btn>
              </template>
              <span>Группы</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

      <v-row>
        <v-col >
          <v-card class="elevation-0">
          <v-data-table
              :headers="headers"
              :items="items"
              :hide-default-footer="true"
              :search="search"
              item-key="id"
              show-select
              fixed-header
              height="500"
              @click:row="getRow"
              :loading="loading"
              v-model="selected"
              class="rounded-xl">

              <template v-slot:item.actions="row">
                <td>
                  <v-btn class=" elevation-0" dark small color="blue" width="50" @click="updateStudentBegin(row.item)">
                    <v-icon dark>edit</v-icon>
                  </v-btn>
                  <v-dialog content-class="round"
                            hide-overlay
                            transition="dialog-bottom-transition"
                            max-width="400px">
                    <DialogAdd @save="saveStudent()" :value="saveStudentValue" :title="'Изменить студента'"></DialogAdd>
                  </v-dialog>

                  <v-btn class="mx-2 elevation-0" dark small color="deep-orange" @click="onButtonClick(row.item)">
                    <v-icon dark>delete</v-icon>
                  </v-btn>
                </td>
              </template>

              <template v-slot:item.groups="{ item }">
                {{ item.groups.className }}
              </template>
              <template v-slot:item.score="{ item }">
                <v-chip
                    :color="getColor(item.score)"
                    class="short"
                    dark>
                  {{ item.score }}
                </v-chip>
              </template>
          </v-data-table>
            <v-alert :value="!!error" type="error">
              {{error}}
            </v-alert>
          </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>
<script>

import api from "@/api";
import DialogAdd from "@/components/Dialog";
import {logOut} from "@/services/auth";

export default {
  components: { DialogAdd },
  data() {
    return {
      singleSelect: true,
      editDialog: false,
      error:null,
      menu: false,
      currentStudent: null,
      saveStudentValue: {},
      selected: [],
      loading: false,
      search: '',
      headers: [
        {text: 'ИД', value: 'id'},
        {text: 'ФИО', value: 'name'},
        {text: 'Средний балл', value: 'score'},
        {text: 'Дата рождения', value: 'birthday'},
        {text: 'Пол', value: 'sex'},
        {text: 'Группа', value: 'groups'},
        {text: 'Действия', value: 'actions'},
      ],
      items: [],
      model: 0,
    }
  },
  methods: {
    onButtonClick(){
      if (this.currentStudent != null){
        for(let i = 0; i <this.selected.length; i++){
          const index = this.items.indexOf(this.selected[i]);
          api.delete('students/'+this.selected[i].id)
          this.items.splice(index, 1);
        }
      }
    },
    saveStudent() {
      if(this.saveStudentValue.id === null) {
        console.log("add");
        api.post('/students/post', {
          name: this.saveStudentValue.fioField,
          score: this.saveStudentValue.score,
          birthday: this.saveStudentValue.date,
          sex: this.saveStudentValue.sex,
          groups: this.saveStudentValue.groupsmod
        }).then(window.location.reload()
        ).catch(err => {
          this.error = err;
        });
      } else {
        console.log("update");
        api.put('students/update', {
          id: this.saveStudentValue.id,
          name: this.saveStudentValue.fioField,
          score: this.saveStudentValue.score,
          birthday: this.saveStudentValue.date,
          sex: this.saveStudentValue.sex,
          groups: this.saveStudentValue.groupsmod
        }).then(window.location.reload()
        ).catch(err => {
          this.error = err;
        });
      }
      this.editDialog = false;
    },
    addStudentBegin() {
      this.saveStudentValue = {
        id: null,
        fioField: "",
        score: '',
        date: null,
        sex: '',
        groupsmod: null,
      };
      this.editDialog = true;
    },
    updateStudentBegin(student) {
      this.saveStudentValue = {
        id: student.id,
        fioField: student.name,
        score: student.score,
        date: student.birthday,
        sex: student.sex,
        groupsmod: student.groups,
      };
      this.editDialog = true;
    },
    getStudents() {
      this.error = null;
      this.loading = true
      api.get("/students/get").then(response => {
        this.items = response;
        this.loading = false
      }).catch(err => {
        this.error = err;
        this.loading = true
      });
    },
    getColor (score) {
      if (score < 3.0) return 'deep-orange'
      else if (score < 4.5) return 'orange'
      else return 'teal darken-3'
    },
    logout(){
      logOut()
      this.$router.push('/auth')
    },
    groups(){
      this.$router.push('/groups/get')
    },
    getRow(item,row){
      row.select(true);
      this.currentStudent = item;
      this.saveStudentValue.fioField = item.name;
    },

},
mounted: function () {
  this.getStudents();
},
}

</script>


<style>

.text-input-white .v-text-field__slot input {
color: #fff !important;
}

v-data-table__selected {
  background: blue !important;
}

.short{
  width:50px;
  justify-content: center;
}

</style>
