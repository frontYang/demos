const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // 环境配置, 默认为生产环境
  mode: 'development', 

  // 入口
  entry: {
    app: './src/app.js'
  },

  // 输出
  output: { // 输出
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'), // __dirname: 可以防止不同操作系统之间的文件路径问题，并且可以使相对路径按照预期工作
  },

  // loader
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
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
    ]
  },

  // 插件
  plugins: [    
    // 清除文件夹
    new CleanWebpackPlugin(), 

    // 生成html模板
    new HtmlWebpackPlugin({
      title: 'Production', // 文档标题
      inject: 'body', //  true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
      hash: false, // 是否增加hash
      template: './src/index.html', // 指定文件
      filename: 'index.html', // 文件名
    }),

    // 使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.NamedModulesPlugin(),

    // 启用热替换模块
    new webpack.HotModuleReplacementPlugin(),
  ],
}