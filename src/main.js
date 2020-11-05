import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import './plugins/vuetify.js'
import VueRouter from 'vue-router'
import router from "@/router";
import store from './plugins/vuex';

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  vuetify : new Vuetify(),
  render: h => h(App),
  router,
  store
}).$mount('#app')
