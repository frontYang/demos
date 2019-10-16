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

- 四个核心概念：
- 	入口(entry)
-   输出(output)
-   loader
-   插件(plugins)


## 前提条件
在开始之前，请确保安装了[ Node.js](https://nodejs.org/en/) 的最新版本。使用 Node.js 最新的长期支持版本(LTS - Long Term Support)，是理想的起步。使用旧版本，你可能遇到各种问题，因为它们可能缺少 webpack 功能以及/或者缺少相关 package 包。



## 安装&初始化项目

初始化项目：
```
# 创建文件夹
mkdir demo1 && cd demo1

# 初始化项目，会生成一个package.json文件
npm init -y

# 局部安装webpack
npm i webpack webpack-cli -D
```

配置npm脚本，首先简单配置一个webpack打包命令，在根目录直接运行npm run dev就可以查看打包的文件：

```js
// package.json
//..
"scripts": {
	"dev": "webpack --config webpack.config.js" // webpack.config.js为默认的配置文件名， --config webpack.config.js 可以省略，如果想要指定，即可放入指定的文件名
}
//..

```

主要目录如下:
```
+-- dist(打包后的文件目录)
+-- src
|		+-- index.html(展示html文件)
|		+-- app.js(入口文件)
+-- webpack.config.js(配置文件)
+-- package.json
+-- package.lock.json
```



## entry和output
- entry: 指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。可以配置单个入口或多个入口
- output: 指示 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件

- 单入口配置项

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

- 多入口配置项

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
> loader用于对模块的源代码进行转换。让 webpack 能够去处理那些非 JavaScript之外的任何静态资源；
> 下面将展示几个基本常用的loader配置，更多loader请查看[loaders](https://www.webpackjs.com/loaders//)


### 几种常用的loader
- 样式:
  - style-loader
  - css-loader
  - sass-loader
- 文件: file-loader
- 转换编译: babel-loader



#### 处理样式

step1: 安装样式相关依赖
```
npm i style-loader css-loader sass-loader node-sass -D
```

step2: 添加loader配置项，loader执行顺序是从右往左，从上往下
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
```

step3: 在入口文件引入css文件
```
// index.js
import './index.css';
```

step4: 执行命令 `npm run dev`


#### 处理图片
step1: 安装file-loader

```
npm i file-loader -D
```

step2: 增加loader配置项
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
step3: 执行命令 `npm run dev`


#### 处理es6
step1: 安装依赖
```
npm i babel-loader @babel/core @babel/preset-env -D
```

step2: 增加loader配置项
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
```

step3: 在更目录增加babel配置项
```js
// .babelrc
{
  "presets": ["@babel/preset-env"]
}

```
step4: 执行命令 `npm run dev`


## 插件
> 插件用来处理各种各样的任务, plugins 选项用于以各种方式自定义 webpack 构建过程。webpack 附带了各种内置插件，可以通过 webpack.[plugin-name] 访问这些插件。下面是几个基本常用插件的是用方式，更多插件请查看[plugins](https://www.webpackjs.com/plugins/)


### HTML模板

step1: 安装依赖
```
npm i -D html-webpack-plugin clean-webpack-plugin
```

step2: 在plugins中增加HtmlWebpackPlugin
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

step4: 执行命令 `npm run dev`


### 开启本地服务器
step1：安装依赖
```
npm i -D webpack-dev-server
```

step2: 增加devServer配置项
```js
// webpack.config.js
//..
devServer: {
  contentBase: './dist'
},
//..
```

step3: 在package.json中增加脚本命令
```js
//..
"scripts": {
	"serve": "webpack-dev-server --open"
}
//..

```

step4: 执行 `npm run serve` 即可启动服务器


### 模块热替换(HMR)
- HRM功能会在应用程序运行过程中，替换、添加或删除 模块，而无需重新加载整个页面，这个功能能大大提高开发效率

step1: 在配置文件中增加plugins配置：

```js
// webpack.config.js
const webpack = require('webpack');
//..
devServer: {
  contentBase: './dist',
  hot: true,
},
plugins: [
  //..
  new webpack.NamedModulesPlugin(), // 使用该插件会显示模块的相对路径，建议用于开发环境。
  new webpack.HotModuleReplacementPlugin() // 启用热替换模块
]//..
```

step2: 执行 `npm run serve` 查看效果，修改样式不会刷新浏览器，直接改变界面

更多配置项请查看[官方文档](https://www.webpackjs.com/)

