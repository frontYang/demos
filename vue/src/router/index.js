/* eslint-disable */
import Vue from "vue"
import Router from "vue-router"
import Login from "@/views/Login"
import Index from "@/views/Index"
import Home from "@/views/Home"

Vue.use(Router)

let Loader = (view) => import(/* webpackChunkName: "aChunkName" */`@/views/${view}.vue`);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: '登录页'
      }
    },
    {
      path: "/",
      name: "home",
      component: Home,
      redirect: '/index',
      children: [
        {
          path: "/index",
          name: "index",
          component: Index,
          meta: {
            title: '首页'
          }
        },
        {
          path: "/table/:id",
          name: "table",
          component: () => Loader('Table'),
          meta: {
            title: '表格'
          },
          children: [
            {
              path: "/table/table_pager/:id",
              name: "table_pager",
              meta: {
                title: '表格分页'
              },
              component: () => Loader('table/TablePager'),
            },
            {
              path: "/table/table_tree/:id",
              name: "table_tree",
              meta: {
                title: '表格树形'
              },
              component: () => Loader('table/TableTree')
            },
            {
              path: "/table/table_tool/:id",
              name: "table_tool",
              meta: {
                title: '表格工具'
              },
              component: () => Loader('table/TableTool')
            },
          ]
        },
        {
          path: "/form/:id",
          name: "form",
          meta: {
            title: '表单'
          },
          component: () => Loader('Form'),
          children: [
            {
              path: "/form/editor/:id",
              name: "editor",
              meta: {
                title: '编辑器'
              },
              component: () => Loader('form/Editor2')
            },
            {
              path: "/form/cascader/:id",
              name: "cascader",
              meta: {
                title: '多选级联面板'
              },
              component: () => Loader('form/Cascader')
            },
            {
              path: "/form/selector/:id",
              name: "selector",
              meta: {
                title: '异步多选级联面板'
              },
              component: () => Loader('form/Selector')
            },
          ]
        },
        {
          path: "/dialog/:id",
          name: "dialog",
          meta: {
            title: '对话框'
          },
          component: () => Loader('Dialog'),
          children: [

          ]
        },
        {
          path: "/others/:id",
          name: "others",
          meta: {
            title: '其他'
          },
          component: () => Loader('Others'),
          children: [
            {
              path: "/others/Pdf/:id",
              name: "Pdf",
              meta: {
                title: 'PDF'
              },
              component: () => Loader('others/Pdf')
            }
          ]
        },
      ]
    }
  ]
});
