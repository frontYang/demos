# webpack4构建项目实践

## 区分环境

配置环境变量：cross-env，运行跨平台设置和使用环境变量的脚本
注入环境变量：cross-env NODE_ENV=dev
获取环境变量：const env = process.env.NODE_ENV



webpack-merge

utils.js: 工具函数
```
拼接文件路径
动态获取入口
动态生成html

```


config.js: 配置文件
```
公用配置
开发环境配置
生产环境配置

```


webpack.common.js: 基础配置
```
公用的loaders

```


webpack.dev.js: 开发环境配置
```
devServer.proxy 的应用场景

```


webpack.prod.js: 生产环境配置
```
代码优化	
	OptimizeCSSPlugin
	MiniCssExtractPlugin
	SplitChunks: 代码分割，将一个文件分割成多个文件。适当的使用代码分割，能大幅提升的页面的性能
	
性能查看
	BundleAnalyzerPlugin
	
```



## 单页面


## 多页面


## vue
