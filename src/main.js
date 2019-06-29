import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import VueAxios from 'vue-axios'
import { AmplifyPlugin } from 'aws-amplify-vue'
import aws_exports from '../aws-exports'
import axios from 'axios'
import router from './router'

import { store } from './store/store'

Vue.use(VueAxios, axios)

import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/main.css'
require('./assets/css/main.css');

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faCogs)

Amplify.configure(aws_exports)

Vue.use(AmplifyPlugin, AmplifyModules)
Vue.use(BootstrapVue)
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
