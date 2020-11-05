<template id="app">
  <v-app>
    <transition name="fade" class="fade-enter">
      <router-view></router-view>
    </transition>
    <v-bottom-navigation class="teal elevation-24 rounded-0"
                         dark
                         app
                         shift
                         hide-on-scroll
                         horizontal>
      <v-btn class="font-weight-medium" @click="$router.push('/auth')">
        <span>Домой</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn class="font-weight-medium" @click="$router.push('/help')">
        <span>Помощь</span>
        <v-icon>help</v-icon>
      </v-btn>
      <v-btn>
        <span>Настройки</span>
        <v-icon>settings</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>