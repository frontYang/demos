

## 项目结构
```
+-- components(组件)
|   +-- ui-test
+-- pages(页面)
|   +-- common(公用资源)
|   +-- package(分包目录)
|   +-- api(对应api分包各个子页面)
|   +-- ui(对应ui分包各个子页面)
+-- templates(模板)
+-- test(测试文件)
+-- image(只支持相对定位的图片，例如tabBar图标)
+-- utils
|   +-- util.js(公用方法)
|   +-- config.js(项目配置相关)
|   +-- canvasApi.js(画图工具函数)
|   +-- charts.js(基于f2的图标)
|   +-- load_more.js(加载更多)
|   +-- upload.js(上传图片)
|   +-- sdk.js(用户日志统计API)
+-- app.js
+-- app.json
+-- app.wxss
+-- jsconfig.json
+-- project.config.json

```

---

## pages
- package (主包)
  - api 
  - ui
- api (api分包)
  - formid (收集formid结构)
  - load (上拉加载更多&下拉刷新)
  - upload (上传图片)
  - userinfo (授权登录)
- ui (ui分包)
  - arrow (纯css箭头)
  - calendar (每日做到小程序中的日历)
  - charts (图表)
  - date (获取日期范围)
  - editor (富文本)
  - native (原生表单组件样式更多)

---

## components
### ui-calendar
> 说明：简单的日历组件

使用方法：
```html
<ui-calendar bindSelectEvent="Function|选择日期" id="uiCalendar"></ui-calendar>
```

```js
const uiCalendar = this.selectComponent('#uiCalendar')
uiCalendar.init(this.data.today, (curDay, current, index) => {
  console.log('日历回调', curDay, current, index)
})
```

---

### f2-canvas
> 说明：基于f2的图表组件
github: https://github.com/antvis/wx-f2.git

使用方法：
```html
<f2-canvas 
  class="elementClass" 
  id="elementId" 
  canvas-id="canvasId" 
  opts="{{ opts }}">
</f2-canvas>

```

```js
// 懒加载
...
opts: {
  lazyLoad: true
},
...

let weekChart = this.selectComponent('#elementId')
weekChart.init((...arg) => {
  initChartLine([...arg, chartData]) // 相关方法
})

```

---

### ui-datepicker
> 说明： 日期选择组件

使用方法：
```html
<ui-datepicker
  date-time="{{start_date}}"
  bindchangeEvent="changeDateStart"
  bindcolumnChangeEvent="changeDateStart"
></ui-datepicker>
```

```js
...
changeDateStart(){
  // 选择日期回调
}
...

```

---

### ui-editor
> 说明： 富文本组件

使用方法：
```html
<ui-editor 
  placeholder="请填写"
  bindInputEvent="inputEditor"
  html="{{html}}"
>
</ui-editor>
```

```js



...

data: {
  html: '<p style="color:red;"></p>'
},

inputEditor(){
  // 获取内容
}
...

```


---