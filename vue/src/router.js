/* eslint-disable */
import Vue from "vue"
import Router from "vue-router"
import Login from "./views/Login"
import Index from "./views/Index"
import Home from "./views/Home"

Vue.use(Router)

let Loader = (view) => import(/* webpackChunkName: "aChunkName" */`./views/${view}.vue`);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      redirect: '/index',
      children: [
        {
          path: "/index",
          name: "index",
          component: Index
        },
        {
          path: "/list",
          name: "list",
          component: () => Loader('List')
        },
        {
          path: "/importcard",
          name: "importcard",
          component: () => Loader('ImportCard')
        },
        {
          path: "/login",
          name: "login",
          component: Login
        },
      ]
    }
  ]
});