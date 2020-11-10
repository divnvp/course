<template>
<v-card rounded>
  <v-card-title class="justify-center pa-10 pb-5">
    <span class="headline font-weight-bold">
    Добавить студента
    </span>
  </v-card-title>
  <v-card-text class="pb-0">
    <v-container>
      <v-row class="d-flex justify-center align-center">
        <v-form
            ref="form">
          <v-text-field
              label="ФИО"
              color="deep-orange"
              rounded
              v-model="fio"
              outlined
              append-icon="person"
              required>
          </v-text-field>
          <v-text-field
              label="Балл"
              v-model="score"
              rounded
              color="deep-orange"
              outlined
              append-icon="star"
              required>
          </v-text-field>
          <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-x
              min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="date"
                  label="Дата рождения"
                  append-icon="mdi-calendar"
                  outlined
                  rounded
                  color="deep-orange"
                  v-bind="attrs"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                ref="picker"
                color="deep-orange"
                v-model="date"
                no-title
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
            ></v-date-picker>
          </v-menu>
        <v-combobox
            height="50px"
            color="deep-orange"
            align="center"
            v-model="sex"
            :items="items"
            label="Пол"
            rounded
            outlined
        ></v-combobox>
          <v-combobox
              height="50px"
              color="deep-orange"
              align="center"
              v-model="groupsmod"
              :items="groups"
              item-text="className"
              label="Группа"
              rounded
              outlined
          ></v-combobox>
        </v-form>
      </v-row>
    </v-container>
  </v-card-text>
  <v-card-actions class="fill-height pb-10 pa-0 justify-center">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="deep-orange"
              rounded
              v-bind="attrs"
              v-on="on"
              class="white--text elevation-0 font-weight-bold"
              width="100px"
              height="50px"
              @click="resetDetails">
            <v-icon>mdi-restart</v-icon>
          </v-btn>
        </template>
        <span>Сбросить</span>
      </v-tooltip>
    <v-col cols="12"
           sm="1"
           lg="1"></v-col>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="teal"
            rounded
            v-bind="attrs"
            v-on="on"
            class="white--text elevation-0 font-weight-bold"
            width="100px"
            height="50px"
            @click="saveDetails">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </template>
      <span>Сохранить</span>
    </v-tooltip>
  </v-card-actions>
</v-card>
</template>

<script>
import api from "@/api";

export default {
  data: () => ({
    dialog: false,
    date: null,
    fio:'',
    score:'',
    sex:'',
    groupsmod:null,
    menu: false,
    items: [
      'Мужской',
      'Женский',
    ],
    groups:[]
  }),
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    getGroups(){
      api.get("/groups/get").then(response => {
        this.groups = response;
      });
    },
    saveDetails(){
      api.post('/students/post',{
        name: this.fio,
        score: this.score,
        birthday: this.date,
        sex: this.sex,
        groups: this.groupsmod
      })
    },
    resetDetails(){
      this.$refs.form.reset()
    }
  },
  mounted: function () {
    this.getGroups();
  },
}
</script>