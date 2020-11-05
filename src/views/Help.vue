<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <v-card
            class="pa-2 rounded-xl align-center px-5 py-5"
            elevation="15"
            min-width="100%"
            tile>

          <h2 class="orange--text font-weight-bold py-lg-5
        text-body-1
        text-md-body-1
        text-lg-h5
        text-xl-h5">Применение</h2>
          <h6 class="font-weight-medium">{{card_text}}
          </h6>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      card_text:
          'База данных "Студенты-Группы" была разработана для того,\n' +
          '            чтобы упростить задачу ведения списка студентов и групп,\n' +
          '            для лёкого связывания их между собой, а также редактирования\n' +
          '            отдельных элементов.'
    }
  }
}
</script>