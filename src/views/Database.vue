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
      <v-row aria-orientation="horizontal">
        <v-col cols="12"
               sm="6"
               md="5"
               lg="6"
               xl="2">
          <v-dialog
              v-model="dialog"
              content-class="round"
              hide-overlay
              transition="dialog-bottom-transition"
              max-width="400px">
          <template v-slot:activator="{ on, attrs }">
          <v-btn rounded class="font-weight-bold" fab v-bind="attrs" v-on="on">
            <v-icon color="teal">add</v-icon>
          </v-btn>
          </template>
            <DialogAdd></DialogAdd>
          </v-dialog>
<!--          <v-dialog-->
<!--              v-model="dialog"-->
<!--              content-class="round"-->
<!--              hide-overlay-->
<!--              transition="dialog-bottom-transition"-->
<!--              max-width="400px">-->
<!--            <template v-slot:activator="{ on, attrs }">-->
              <v-btn rounded class="font-weight-bold mx-5" fab>
                <v-icon color="blue">edit</v-icon>
              </v-btn>
<!--            </template>-->
<!--            <DialogChange></DialogChange>-->
<!--          </v-dialog>-->
          <v-btn rounded class="font-weight-bold" fab>
            <v-icon color="red">delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
    <v-data-table
        :headers="headers"
        :items="items"
        :hide-default-footer="true"
        :search="search"
        :single-select="singleSelect"
        item-key="name"
        show-select
        class="rounded-xl">
      <template v-slot:item.groups="{ item }">
        <p>{{ item.groups.className }}</p>
      </template>
      <template v-slot:item.score="{ item }">
        <v-chip
            :color="getColor(item.score)"
            dark>
          {{ item.score }}
        </v-chip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>

import api from '../api';
import DialogAdd from "@/components/DialogAdd";
// import DialogChange from "@/components/DialogChange";

export default {
  components: { DialogAdd },
  data() {
    return {
      singleSelect: false,
      selected: [],
      dialog: false,
      search: '',
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Name', value: 'name'},
        {text: 'Score', value: 'score'},
        {text: 'Birthday', value: 'birthday'},
        {text: 'Sex', value: 'sex'},
        {text: 'Group', value: 'groups'},
      ],
      items: [],
    }
  },
  methods: {
    getStudents() {
      api.get("/students/get").then(response => {
          this.items = response;
      }).catch(function (error){
        error.response.data
      });
    },
    getColor (score) {
      if (score < 3.5) return 'red'
      else if (score < 4.5) return 'orange'
      else return 'green'
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

.round {
  border-radius: 30px;
  overflow-y: hidden;
}

</style>
