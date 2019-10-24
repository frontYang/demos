[TOC]

---

# 移动端调试方式



## vConsole

在HTML中引入以下代码

```html
<script src="https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js"></script>
  <script>new VConsole();</script>
```

[官方文档入口](https://github.com/Tencent/vConsole)

---

## eruda

在HTML中引入以下代码

```html
<script src="http://cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>
```

[官方文档入口]( https://github.com/liriliri/eruda )

---

## weinre

- 安装weinre ：`npm -g install weinre`
- 启动weinre（指定port并使weinre在其他设备下使用）： `weinre --httpPort 8082 --boundHost -all-`
- 启动weinre（默认）：`weinre`
- 打开调试工具：`http://本地ip:8080`
- 在HTML中引入以下代码

```html
<script src="http://localhost:8082/target/target-script-min.js#anonymous"></script>
```



[官方文档入口](  https://people.apache.org/~pmuellr/weinre/docs/latest/Home.html  )



