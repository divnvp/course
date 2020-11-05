<template>
  <v-card class="teal rounded-0 white--text px-10 pa-10 elevation-0">
    <v-row>
    <v-card-title class="font-weight-bold white--text text-h2 pb-10">
      Студенты
    </v-card-title>
      <v-spacer></v-spacer>
      <v-select v-model="selectedCategory"
                v-bind:items="groupList"
                label="Category"
                :item-text="item => item.id > 0 ? (item.name+' - '+ item.categoryType.name) : item.name"
                item-value="id" @change="searchStudent()">
      </v-select>
      <v-col
          cols="12"
          sm="5"
          md="6"
          lg="6"
          xl="6"
          class="px-10"
      >
      <v-text-field class="font-weight-medium"
                    v-model="staffTable.search"
                    background-color="white"
                    append-icon="search"
                    filled
                    rounded color="black"
                    label="Search"
                    @keyup.enter="searchStudent()"
                    @click:clear="searchStudent(true)"
      ></v-text-field>
      </v-col>
    </v-row>
    <v-data-table
        :headers="staffTable.headers"
        loading-text="Loading..."
        :loading="staffTable.loading"
        :items="stList"
        :page.sync="staffTable.page"
        :server-items-length="staffTable.totalDesserts"
        :options.sync="pagination"
    class="rounded-xl">
    </v-data-table>
  </v-card>
</template>

<script>
import api from '../api';
export default {
  data: () => ({
    stList:[],
    pagination: {},
    selectedCategory: null,
    groupList:[],
    staffTable:{
      page: 1,
      sort: 'name',
      search: null,
      descending: true,
      emptyTableMessage: 'Список пуст',
      totalDesserts: 0,
      loading: true,
      headers:[
        {
          text:'id',
          sortable: false,
          value:'id',
        },
        {
          text: 'Name',
          sortable: true,
          value:'name',
        }
      ]
    },
  }),
  computed:{
    // offset(){
    //   return (this.pagination.page - 1) * this.pagination.itemsPerPage;
    // }
  },
  methods: {
    async loadStudents(clear) {
      this.staffTable.loading = true;
      if (clear){
        this.staffTable.search = null;
      }
      try {
        const items = await api.get(
            `students/get`
        );
        let index = 0;
        this.student = items.content.map(v => {
          v.number = index++;
          return v;
        });
        this.staffTable.totalDesserts = items.totalElems;
      } catch (err) {
        console.log(`error load category staff list ${err}`);
      } finally {
        this.staffTable.loading = false;
      }
    },
    // select(item){
    //   if (!this.filter.some(v => v.id === item.id)) {
    //     this.$emit('select-user', item);
    //   }
    // },
    searchStudent(clear){
      this.staffTable.page = 1;
      this.loadStudents(clear);
    }
  },
  mounted() {
    this.loadStudents();
  },
}
</script>
