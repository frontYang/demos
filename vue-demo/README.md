# vue-demo2

## 项目结构
```
+-- public
+-- src
|   +-- assets
|   +-- mock
|       +-- api(接口)
|       +-- index.js(入口)
|   +-- router
|       +-- modules(router模块)
|       +-- index.js(router入口)
|   +-- store
|       +-- modules(vuex模块)
|       +-- index.js(vuex入口)
|   +-- utils(存放js公用文件)
|        +-- config.js(配置项)
|        +-- https.js(axios封装)
|        +-- request.js(页面接口请求)
|        +-- utils.js(工具函数)
|        +-- validate.js(表单验证)
|   +-- views(页面)
|       +-- Home.vue(基础布局)
|       +-- Index.vue(首页)
|   +-- App.vue
|   +-- main.js
|   +-- registerServiceWorker.js
+-- tests
+-- vue.config.js
+-- babel.config.js
+-- cypress.json
+-- jest.config.js
+-- postcss.config.js
+-- .browserslistrc
+-- .eslintrc.js
+-- .gitignore
+-- .yarnrc
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your end-to-end tests
```
yarn run test:e2e
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
