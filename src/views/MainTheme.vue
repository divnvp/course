<template>
  <v-content>
  <v-parallax
      height="900"
      src="https://images.unsplash.com/photo-1504275107627-0c2ba7a43dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80">
    <v-row
        align="center"
        justify="center" >
      <v-col
          class="text-center indigo darken-1 elevation-24"
          cols="12">
        <h1 class="display-1 mb-4 ma-0">
          База данных
        </h1>
        <h4 class="subheading">
          Студент/Группы
        </h4>
      </v-col>
      <v-btn width="150" height="50" elevation="0" rounded @click="authentication" color="white" class="black--text font-weight-bold">Войти</v-btn>
    </v-row>
  </v-parallax>
  </v-content>
</template>

<script>
export default {
  data: () => ({

  }),
  methods: {
    authentication(){
      this.$router.push('/auth')
    }
  }
}
</script>