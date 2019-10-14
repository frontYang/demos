[toc]

# webpack4

[//]: # "- [webpack是什么](https://www.webpackjs.com/)"
[//]: # "- [安装&初始化项目](#/2)"
[//]: # "- [entry和output](https://www.webpackjs.com/configuration/entry-context/)"
[//]: # "- [loader](https://www.webpackjs.com/loaders/)"
[//]: # "- [插件](https://www.webpackjs.com/plugins/)"



## webpack是什么


- 概念：webpack 是一个现代 JavaScript 应用程序的**静态模块打包器(module bundler)**


- 作用：当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

## 安装&初始化项目


```
# 创建文件夹
mkdir demo1 && cd demo1

# 初始化项目
cnpm init -y

# 局部安装webpack
cnpm i webpack webpack-cli -D
```

## entry和output
- entry: 入口文件，可以配置单个入口或多个入口
- output: 告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件

- 单入口

```js
// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development', // 环境, 默认为生产环境
  entry: './src/index.js', // 入口
  output: { // 输出
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // __dirname: 可以防止不同操作系统之间的文件路径问题，并且可以使相对路径按照预期工作
  },
}
```

- 多入口

```js
// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development', // 环境, 默认为生产环境
  entry: {  // 入口
    index1: './src/index1.js',
    index2: './src/index2.js',
  },
  output: { // 出口
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'), // __dirname: 可以防止不同操作系统之间的文件路径问题，并且可以使相对路径按照预期工作
  },
}
```



## loader
> 用于对模块的源代码进行转换。让 webpack 能够去处理那些非 JavaScript 文件


### 几种常用的loader
- 样式:
  - style-loader
  - css-loader
  - sass-loader
- 文件: file-loader
- 转换编译: babel-loader



#### 样式

```
// 安装
cnpm i style-loader css-loader sass-loader node-sass -D
```


```js
// webpack.config.js
module: {
  rules: [
  {
    test: /\.(c|sa|sc)ss$/,
    use: [
      {
        loader: 'style-loader', // 将 JS 字符串生成为 style 节点
      },
      {
        loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
      },
      {
        loader: 'sass-loader', // 将 Sass 编译成 CSS
      }
    ]
  },
}

// index.js
import './index.css';
```



#### 图片

```
// 安装
cnpm i file-loader -D
```

```js
// webpack.config.js
module: {
  rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
          loader: 'file-loader'
        }
        ]
      }
  ]
}
```



#### babel-loader

```
// 安装
cnpm i babel-loader @babel/core @babel/preset-env -D
```

```js
// webpack.config.js
module: {
  rules: [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader'
    }
  },
}

// .babelrc
{
  "presets": ["@babel/preset-env"]
}
```



## [插件](https://www.webpackjs.com/plugins/)
> 用来处理各种各样的任务


### HTML模板
```
// 安装
cnpm i -D html-webpack-plugin clean-webpack-plugin
```

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//...
plugins: [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    title: 'Output Management', // 文档标题
    inject: 'body', //  true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
    hash: false, // 是否增加hash
    template: './src/index.html', // 指定文件
    filename: 'index.html', // 文件名
  })
],
//...
```


### 开启本地服务器

```
// 安装
cnpm i -D webpack-dev-server
```

```js
// webpack.config.js
//..
devServer: {
  contentBase: './dist'
},
//..
```

```
// 命令行
webpack-dev-server --open
```


### 模块热替换(HMR)
- HRM功能会在应用程序运行过程中，替换、添加或删除 模块，而无需重新加载整个页面

```js
// webpack.config.js
const webpack = require('webpack');
//..
devServer: {
  contentBase: './dist',
  hot: true
},
plugins: [
  //..
  new webpack.NamedModulesPlugin(), // 使用该插件会显示模块的相对路径，建议用于开发环境。
  new webpack.HotModuleReplacementPlugin() // 启用热替换模块
]//..
```
