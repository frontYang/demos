/* eslint-disable */
import Vue from "vue"
import Router from "vue-router"
import Login from "./views/Login"
import Index from "./views/Index"
import Home from "./views/Home"
import Table from "./views/Table"

Vue.use(Router)

let Loader = (view) => import(/* webpackChunkName: "aChunkName" */`./views/${view}.vue`);

export default new Router({
  // mode: 'history',
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
          path: "/table",
          name: "table",
          component: Table,
          redirect: '/table/table_pager',
          children: [
            {
              path: "/table/table_pager",
              name: "table_pager",
              component: () => Loader('table/TablePager')
            },
            {
              path: "/table/table_tree",
              name: "table_tree",
              component: () => Loader('table/TableTree')
            },
          ]
        },
        {
          path: "/cascader",
          name: "cascader",
          component: () => Loader('Cascader')
        },
        {
          path: "/selector",
          name: "selector",
          component: () => Loader('Selector')
        },
        {
          path: "/others/importcard",
          name: "importcard",
          component: () => Loader('others/ImportCard')
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
