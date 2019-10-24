const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  mode: 'development', // 环境, 默认为生产环境
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  entry: {  // 入口
    index: './src/index.js',
  },
  output: { // 出口
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'), // __dirname: 可以防止不同操作系统之间的文件路径问题，并且可以使相对路径按照预期工作
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      inject: true,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
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
          'file-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除
        include: path.resolve(__dirname, 'src'), // 指定
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}