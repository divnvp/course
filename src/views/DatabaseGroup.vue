<template>
    <v-container fluid>
    <v-card class="teal rounded-xl px-10 pa-10 elevation-0">
      <v-row class="white--text">
      <v-card-title class="font-weight-bold text-h2 pb-10">
        Группы
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
            <v-dialog
                content-class="round"
                hide-overlay
                transition="dialog-bottom-transition"
                max-width="400px">
            <template v-slot:activator="{ on, attrs }">
            <v-btn rounded class="font-weight-bold" fab v-bind="attrs" v-on="on">
              <v-icon color="teal darken-2">add</v-icon>
            </v-btn>
            </template>
              <DialogAdd :title="'Добавить группу'"></DialogAdd>
            </v-dialog>
            <v-dialog
                content-class="round"
                hide-overlay
                transition="dialog-bottom-transition"
                max-width="400px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn rounded class="font-weight-bold mx-5" fab v-bind="attrs" v-on="on">
                  <v-icon color="blue">edit</v-icon>
                </v-btn>
              </template>
              <DialogChangeGroup></DialogChangeGroup>
            </v-dialog>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn rounded class="font-weight-bold" fab v-bind="attrs" v-on="on" @click="deleteRow">
                  <v-icon color="deep-orange">delete</v-icon>
                </v-btn>
              </template>
              <span>Удалить</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" lg="6" class="text-right">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn rounded class="font-weight-bold teal darken-3" fab v-bind="attrs" v-on="on" @click="logout">
                <v-icon color="white">mdi-logout-variant</v-icon>
              </v-btn>
            </template>
            <span>Выйти</span>
          </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn rounded text class="font-weight-bold" fab v-bind="attrs" v-on="on" @click="students">
                  <v-icon size="50" color="white">mdi-menu-right-outline</v-icon>
                </v-btn>
              </template>
              <span>Студенты</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
      <v-alert :value="!!error" type="error">
        {{error}}
      </v-alert>
      <v-row>
        <v-col >
          <v-card class="elevation-0">
          <v-data-table
              :headers="headersGroup"
              :items="itemsGroup"
              :hide-default-footer="true"
              :search="search"
              :single-select="singleSelect"
              item-key="id"
              show-select
              height="300px"
              @click:row="getRow"
              :loading="loading"
              v-model="selected"
              class="rounded-xl">
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import api from '../api';
import {logOut} from "@/services/auth";
import DialogAdd from "@/components/Dialog";

export default {
  components: {DialogAdd},
  data() {
    return {
      singleSelect: true,
      error: null,
      currentStudent: null,
      selected: [],
      loading: false,
      search: '',
      headersGroup:[
        { text: 'ИД', value: 'id' },
        { text: 'Группа', value: 'className'},
        { text: 'Факультет', value: 'faculty' },
      ],
      itemsGroup:[],
    }
  },
  methods: {
    getRow(item,row){
      row.select(true);
      console.log(item.id)
      this.currentStudent = item;
    },
    deleteRow(){
      if (this.currentStudent != null){
        const index = this.itemsGroup.indexOf(this.currentStudent);
        api.delete('groups/'+this.currentStudent.id)
        this.itemsGroup.splice(index, 1);
      }
    },
    logout(){
      logOut()
      this.$router.push('/auth')
    },
    getGroups(){
      this.error = null;
      this.loading = true
      api.get("/groups/get").then(response => {
        this.itemsGroup = response;
        this.loading = false
      }).catch(err => {
        this.error = err;
        this.loading = true
      });
    },
    students(){
      this.$router.push('/students/get')
    }
  },
  mounted: function () {
    this.getGroups();
  },
}

</script>

<style>

.text-input-white .v-text-field__slot input {
color: #fff !important;
}

.round {
  border-radius: 30px;
  overflow-y: hidden;
}

tr.v-data-table__selected {
  background: lightsalmon !important;
}

</style>
