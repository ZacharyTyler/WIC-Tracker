import Vue from 'vue'
import VueRouter from 'vue-router'
// @ts-ignore
import Login from '../views/Login.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/listView/',
      name: 'listView',
      // route level code-splitting
      // this generates a separate chunk (listView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        // @ts-ignore
        return import(/* webpackChunkName: "listView" */ '../views/ListView.vue')
      }
    },
    {
      path: "*",
      redirect: '/listView'
    }
  ]

})

