<template id="app">
  <v-app>
    <transition name="fade" class="fade-enter">
      <router-view></router-view>
    </transition>
<!--    <BottomNav></BottomNav>-->
  </v-app>
</template>

<script>
// import BottomNav from '@/components/BottomNav'
// import MainTheme from '@/views/MainTheme'
export default {
  // components: { BottomNav },
  name: 'App'
}
</script>

<style>
.v-application {
  font-family: body-font-family, sans-serif !important;
}
.title {
font-family: title-font, sans-serif !important;
}

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