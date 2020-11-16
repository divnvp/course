<template>
  <v-main>
    <v-card height="200px" flat>
    <v-bottom-navigation class="teal elevation-24 rounded-0"
                         dark
                         app
                         shift
                         horizontal>
      <v-btn class="font-weight-medium" @click="$router.push('/')">
        <span>Домой</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn class="font-weight-medium">
        <span>Помощь</span>
        <v-icon>help</v-icon>
      </v-btn>
      <v-btn>
        <span>Настройки</span>
        <v-icon>settings</v-icon>
      </v-btn>
    </v-bottom-navigation>
    </v-card>
  </v-main>
</template>

<script>

export default {

}

</script>