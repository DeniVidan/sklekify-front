import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'


axios.defaults.baseURL = 'http://localhost:3000'

Vue.config.productionTip = false
Vue.use(Vuetify)




new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
