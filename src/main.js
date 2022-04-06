import Vue from 'vue'
import App from './App.vue'
import'bootstrap/dist/css/bootstrap.css'
import {http} from "./utils/http";
import VeeValidate from './plugins/vee-validate'

Vue.use(VeeValidate)
Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
