
- 目录结构

```
+-- common
|   +-- lib
|     +-- f2
|     |-- iconfont.scss
|     |-- weui.scss
|   |-- charts.js(图表)
|   |-- http.js(request二次封装)
|   |-- load_more.js(上拉加载/下拉刷新)
|   |-- main.js(页面接口请求)
|   |-- upload.js(上传)
|   |-- util.js(工具函数)
|   |-- wx_util.js(小程序API二次封装)
|   |-- var.scss
+-- components
|   +-- f2-canvas(图表)
|   +-- ui-calendar(日历)
|   +-- ui-datepicker(日期区域选择器)
|   +-- ui-editor(富文本)
+-- pages(页面)
+-- static(静态资源)
+-- App.vue(Vue初始化入口文件)
+-- main.js(应用配置，用来配置App全局样式以及监听)
+-- mainifest.js(配置应用名称、appid、logo、版本等打包信息)
+-- pages.json(配置页面路由、导航条、选项卡等页面类信息)
+-- uni.scss(uni-app内置的常用样式变量)
```

- 分包：
  - package (分包入口)
    - api
    - ui
  - api
    - formid(收集formid)
    - load(下拉刷新/上拉加载)
    - upload(上传)
    - userinfo(获取用户信息)
  - ui
    - arrow(箭头)
    - calendar(日历)
    - charts(图表)
    - date(日期区域选择)
    - editor(富文本)
    - native(原生样式修改)


- Q&A:
  - 
