# 1. webpack4项目打包实践

## 1.1. 开发环境  vs  生产环境
    开发环境(development)和生产环境(production)的构建目标差异很大。
    在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。
    而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置。
    
    虽然，以上我们将生产环境和开发环境做了略微区分，但是，请注意，我们还是会遵循不重复原则(Don't repeat yourself - DRY)，保留一个“通用”配置。为了将这些配置合并在一起，我们将使用一个名为 webpack-merge 的工具。通过“通用”配置，我们不必在环境特定(environment-specific)的配置中重复代码。配置结构图如下：

<img src="http://localhost:3000/env.png" style="zoom:80%;" />


对应的项目结构图如下：

<img src="http://localhost:3000/mulu-simple.png" style="zoom:100%;" />

在区分开发环境和生产环境之前，我们先看看webpack的几个重要的配置项

---

## 1.2. 关于sourcemap
### 1.2.1. 是什么是sourcemap?
    我们在打包中，将开发环境中源代码经过压缩，去空格，babel编译转化，最终可以得到适用于生产环境的项目代码，这样处理后的项目代码和源代码之间差异性很大，会造成无法debug的问题。
    sourcemap就是为了解决上述代码定位的问题，简单理解，就是构建了处理前的代码和处理后的代码之间的桥梁。主要是方便开发人员的错误定位。
    Webpack打包生成的.map后缀文件，使得我们的开发调试更加方便，它能帮助我们链接到断点对应的源代码的位置进行调试（//# souceURL），而webpack中的devtool就是用来指定source-maps的配置方式的。下图是webpack中的sourcemap种类

<img src="http://localhost:3000/devtool.png" style="zoom:75%;" />


### 1.2.2. 在不同的环境中如何选择sourcemap的类型
#### 1.2.2.1. 开发环境
- eval 每个模块都使用 eval() 执行，并且都有 //@ sourceURL。此选项会相当快地构建。主要缺点是，由于会映射到转换后的代码，而不是映射到原始代码，所以不能正确的显示行数。
- inline-source-map - SourceMap 转换为 DataUrl 后添加到 bundle 中。
- eval-source-map - 每个模块使用 eval() 执行，并且 SourceMap 转换为 DataUrl 后添加到 eval() 中。初始化 SourceMap 时比较慢，但是会在重构建时提供很快的速度，并且生成实际的文件。行数能够正确映射，因为会映射到原始代码中。
- cheap-module-eval-source-map - 就像 eval-source-map，每个模块使用 eval() 执行，并且 SourceMap 转换为 DataUrl 后添加到 eval() 中。"低开销"是因为它没有生成列映射(column map)，只是映射行数。

#### 1.2.2.2. 生产环境
- source-map - 生成完整的 SourceMap，输出为独立文件。由于在 bundle 中添加了引用注释，所以开发工具知道在哪里去找到 SourceMap。
- hidden-source-map - 和 source-map 相同，但是没有在 bundle 中添加引用注释。如果你只想要 SourceMap 映射错误报告中的错误堆栈跟踪信息，但不希望将 SourceMap 暴露给浏览器开发工具。
- cheap-source-map - 不带列映射(column-map)的 SourceMap，忽略加载的 Source Map。
- cheap-module-source-map - 不带列映射(column-map)的 SourceMap，将加载的 Source Map 简化为每行单独映射。
- nosources-source-map - 创建一个没有 sourcesContent 的 SourceMap。它可以用来映射客户端（译者注：指浏览器）上的堆栈跟踪，而不会暴露所有的源码。

### 1.2.3. 总结
    在项目中可以根据情况合时宜的去改变sourcemap，常用的可以在开发环境选用 cheap-module-eval-source-map，在生产环境选用source-map

在webpack中的使用方式:
```js
module.exports = {
	devtool: 'cheap-module-eval-source-map'
}
```

---
## 1.3. devServer.proxy
devServer是用来配置 webpack-dev-server的，而这次说一下proxy。
如果有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。先来看下如下的场景

### 1.3.1. 使用场景

#### 1.3.1.1. 简单的代理
请求到 /api/xxx 现在会被代理到请求 http://localhost:3000/api/xxx

```js
mmodule.exports = {
    //...
    devServer: {
        proxy: {
            '/api': 'http://localhost:3000'
        }
    }
};
```

#### 1.3.1.2. 多个路径代理
如果想要多个路径代理到同一个target下, 可以使用由一个或多个「具有 context 属性的对象」构成的数组：
```js

module.exports = {
    //...
    devServer: {
        proxy: [{
            context: ['/auth', '/api'],
            target: 'http://localhost:3000',
        }]
    }
};
```

#### 1.3.1.3. 重写路径
如果你不想始终传递 /api ，则需要重写路径：
```js
module.exports = {
    //...
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/api' : ''}
            }
        }
    }
};

```

#### 1.3.1.4. 接受https
默认情况下，是不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。如果想要接受，只要设置 secure: false 就行：

```js
module.exports = {
    //...
    devServer: {
        proxy: {
            '/api': {
                target: 'https://other-server.example.com',
                secure: false
            }
        }
    }
};

```



---

## 1.4. splitChunks
### 1.4.1. 默认配置
SplitChunks 是由 webpack 4 内置的 SplitChunksPlugin 插件提供的能力，用来抽取公有代码;可直接在 optimization 选项中配置；其默认配置如下：

```js
module.exports = {
  //...
  splitChunks: {
    // 表示从哪些chunks里面抽取代码，除了三个可选字符串值 initial、async、all 之外，还可以通过函数来过滤所需的 chunks
    chunks: 'async',

    // 抽取出来的文件在压缩前的最小大小,默认30kb
    minSize: 30000,

    // 抽取出来的文件在压缩前的最大大小，默认为 0，表示不限制最大大小
    maxSize: 0,

    // 被引用次数，默认为1；
    minChunks: 1,

    // 最大的按需(异步)加载次数，默认为 5；
    maxAsyncRequests: 5,

    // 最大的初始化加载次数，默认为 3；
    maxInitialRequests: 3,

    // 抽取出来的文件的自动生成名字的分割符，默认为 ~；
    automaticNameDelimiter: '~',

    // 允许为SplitChunksPlugin生成的块名设置最大字符数， 默认30
    automaticNameMaxLength: 30,

    // 抽取出来文件的名字，默认为 true，表示自动生成文件名；
    name: true,

    // 缓存组
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }
  }
};
```

splitChunks的其他配置可以用管那么多，其中的cacheGroups才是配置的关键， cacheGroups可以继承或者覆盖 splitChunks 中所有的参数值，除此之外还额外提供了三个配置: test,priority,reuseExistingChunk

- test: 表示要过滤 modules，默认为所有的 modules，可匹配模块路径或 chunk 名字，当匹配的是 chunk 名字的时候，其里面的所有 modules 都会选中；


- priority：表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，那么抽取到哪个就由权重最高的说了算；


- reuseExistingChunk：表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。


### 1.4.2. cacheGroups配置场景


- 把所有 node_modules 的模块被不同的 chunk 引入超过 1 次的抽取为 common。

```js
cacheGroups: {
  common: {
    test: /[\\/]node_modules[\\/]/,
    name: 'common',
    chunks: 'initial',
    priority: 2,
    minChunks: 2,
  },
}
```

- 或者把所有模块被不同的 chunk 引入超过 1 次的抽取为 common
```js
cacheGroups: {
  common: {
    name: 'common',
    chunks: 'initial',
    priority: 2,
    minChunks: 2,
  },
}
```


- 把一些基础的框架单独抽取如 vue

```js
cacheGroups: {
  vueBase: {
    name: 'vueBase',
    test: (module) => {
        return /vue/.test(module.context);
    },
    chunks: 'initial',
    priority: 10,
  },
}
```

- 同样对于通过 MiniCssExtractPlugin 生成的 CSS 文件也可以通过 SplitChunks 来进行抽取公有样式等
```js
cacheGroups: {
  styles: {
    name: 'styles',
    test: /\.css$/,
    chunks: 'all',
    enforce: true,
    priority: 20, 
  }
}
```

---
## 1.5. uglifyjs-webpack-plugin
该插件是用来压缩js的，适用于生产环境，具体用法如下(文中提到的插件都需要先安装， npm i --dev 插件名):

```
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
  ]
}
```

详细参数查看官方文档：https://github.com/webpack-contrib/uglifyjs-webpack-plugin

---

## 1.6. optimize-css-assets-webpack-plugin
该插件用于优化\最小化CSS资源，具体用法如下：

```js
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
	plugins: [
		// 优化css 删除可能重复的CSS
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
     		//避免 cssnano 重新计算 z-index
        safe: true,

        // cssnano 集成了autoprefixer的功能
        // 会使用到autoprefixer进行无关前缀的清理
        // 关闭autoprefixer功能
        // 使用postcss的autoprefixer功能
        autoprefixer: false
      }
    }),
	]
}

```

详细参数查看官方文档：https://github.com/NMFR/optimize-css-assets-webpack-plugin

---


## 1.7. mini-css-extract-plugin
该插件将CSS提取到单独的文件中，在webpack4中才支持，具体使用方式如下：

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
	plugins: [
		// 提取css文件  
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css'
    }),	
	]
}
```
详细参数查看官方文档：https://github.com/webpack-contrib/mini-css-extract-plugin

---

## 1.8. webpack-bundle-analyzer(可视化性能面板插件)

### 1.8.1. 作用
    通过使用webpack-bundle-analyzer 可以看到项目各模块的大小，了解bundle的内容，找出最大的模块，然后可以按需优化


### 1.8.2. 使用方式
```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
	plugins: [
		// 可视化性能面板
    new BundleAnalyzerPlugin()
	]
}
```

在执行webpack打包的时候会自动打开页面，类似下图
<img src="http://localhost:3000/analyzer.gif" style="zoom:100%;" />

更多参数可以查看官方文档：https://github.com/webpack-contrib/webpack-bundle-analyzer

---


通过生产环境和开发环境的特性，并结合webpack配置，便可以进行三者的配置，并在package.json中指定不同的命令

```
"scripts": {
// 开发环境
    "serve": "webpack-dev-server --config ./build/webpack.dev.js",
    
// 生产环境
    "build": "webpack --config ./build/webpack.prod.js",
  },
```



## 1.9. 公用基本配置

```js
/**
 * webpack公用打包配置
 */
const merge = require('webpack-merge')
const config = require('./config').common
const utils = require('./utils')
const publicPath = config.publicPath || '/'

module.exports = merge({
  // 入口
  entry: {
    app: utils.resolve('src/main.js'),
    index: utils.resolve('src/index.js')
  },

  // 输出
  output: {
    path: utils.resolve('./dist'),
    filename: 'js/[name].js',
    publicPath: publicPath
  },

  // 配置模块如何解析
  resolve: {
    // 自动解析确定的扩展，(能够使用户在引入模块时不带扩展，默认值['.wasm', '.mjs', '.js', '.json'])
    extensions: ['.tsx', '.ts', '.js']
  },

  // 模块配置
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          outputPath: '/assets/',
          publicPath: '/assets/'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          outputPath: '/assets/',
          publicPath: '/assets/'
        }
      }
    ]
  }
}, config)
```

---

## 1.10. 开发环境配置
```js
// webpack开发环境打包配置
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const utils = require('./utils')
const config = require('./config').dev
const HtmlwebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // host
    host: 'localhost',

    // 是否一切服务都启用 gzip 压缩
    compress: true,

    // 发生错误是否覆盖在页面上
    overlay: true,

    // 开启热更新
    hot: true,

    // 提供静态文件目录地址
    // 基于express.static实现
    contentBase: utils.resolve('dist')
  },
  plugins: [
    // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.NamedModulesPlugin(),

    // 启用热替换模块
    new webpack.HotModuleReplacementPlugin(),

    // 生成html
    new HtmlwebpackPlugin({
      template: utils.resolve('public/index.html'),
      filename: 'index.html',
      inject: true,
      minify: {
        removeComments: true, // 移除注释
        collapseWhitespace: true, // 删除空格
        removeAttributeQuotes: true // 移除属性的引号
      }
    })
  ]
}, config)


```

---

## 1.11. 生产环境配置
```js

// webpack生产环境打包配置
const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common')
const utils = require('./utils')
const config = require('./config').prod
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',

  // 输出
  output: {
    path: utils.resolve('./dist'),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js'
  },

  // 优化
  optimization: {
    splitChunks: {
      // 表示从哪些chunks里面抽取代码，除了三个可选字符串值 initial、async、all 之外，还可以通过函数来过滤所需的 chunks
      chunks: 'all',

      // 抽取出来的文件在压缩前的最小大小,默认30kb
      minSize: 30000,

      // 抽取出来的文件在压缩前的最大大小，默认为 0，表示不限制最大大小
      maxSize: 0,

      // 被引用次数，默认为1；
      minChunks: 1,

      // 最大的按需(异步)加载次数，默认为 5；
      maxAsyncRequests: 5,

      // 最大的初始化加载次数，默认为 3；
      maxInitialRequests: 3,

      // 抽取出来的文件的自动生成名字的分割符，默认为 ~；
      automaticNameDelimiter: '~',

      // 允许为SplitChunksPlugin生成的块名设置最大字符数， 默认30
      automaticNameMaxLength: 30,

      // 抽取出来文件的名字，默认为 true，表示自动生成文件名；
      name: true,

      // 缓存组
      cacheGroups: {
        vueBase: {
          name: 'vueBase',
          test: (module) => {
            return /vue/.test(module.context)
          },
          chunks: 'initial',
          priority: 10
        },
        common: {
          name: 'common',
          chunks: 'initial',
          priority: 2,
          minChunks: 2
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
          priority: 20
        }
      }
    }
  },

  // 模块配置
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    // 清除打包目录
    new CleanWebpackPlugin(),

    // 会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境。
    new webpack.HashedModuleIdsPlugin(),

    // 提取css文件
    // DOC: https://github.com/webpack-contrib/mini-css-extract-plugin
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css'
    }),

    // 优化css 删除可能重复的CSS
    // DOC: https://github.com/NMFR/optimize-css-assets-webpack-plugin
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),

    // 压缩js
    // DOC: https://github.com/webpack-contrib/uglifyjs-webpack-plugin
    new UglifyJSPlugin({
      sourceMap: true
    }),

    new HtmlwebpackPlugin({
      template: utils.resolve('public/index.html'),
      filename: 'index.html',
      inject: true,
      minify: {
        removeComments: true, // 移除注释
        collapseWhitespace: true, // 删除空格
        removeAttributeQuotes: true // 移除属性的引号
      }
    }),

    // 可视化性能面板
    new BundleAnalyzerPlugin()
  ]
}, config)

```