import Vue from 'vue';
import VueRouter from 'vue-router'

/* <vue-router-configuration> */

/*import LoginForm from '../components/Login.vue'*/
import RestaurantStart from '../components/RestaurantStart.vue'
import RestaurantMainPage from '../components/RestaurantMainPage.vue'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    /* adding { path: '/', component: app } here leads to the map not rendering */
    { path: '/restaurant-start', component: RestaurantStart },
    { path: '/main-page', component: RestaurantMainPage },
  ]
});
/* </vue-router-configuration> */
