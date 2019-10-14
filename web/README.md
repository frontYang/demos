[TOC]

# Javascript常用功能模块封装

## facebook登录&分享

使用方式：

​	html: 

```html
<!-- 分享 -->
<div class="facebook btn-share">facebook分享</div>

<!-- 登录 -->
<fb:login-button scope="public_profile,email" onlogin="FBUtil.checkLoginState();">登录</fb:login-button>

<!-- 登录状态 -->
<div id="status"></div>
```



​	javascript：

```js
// 初始化
FBUtil.init({
  appid: '884858771882601',
  loginIntf: '', // 登录请求接口
  loginCallback(response) {
    // 登录成功回调
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  }
});

var btnShare = document.querySelector('.btn-share')
btnShare.addEventListener('click', function(){
  FBUtil.share(function(response){
    // 分享成功回调
  })
})
```

[案例展示](./facebook/index.html)

## 九宫格抽奖

使用方式：

html：

```html
<ul class="play clearfix" id="JawardContainer">
  <li class="lottery-unit prize bg-award select">
    <div class="">
      <img src="https://iph.href.lu/120x120" alt="">
      <p>一等奖</p>
    </div>
  </li>
  <li class="lottery-unit prize bg-award">
    <div class="">
      <img src="https://iph.href.lu/120x120" alt="">
      <p>二等奖</p>
    </div>
  </li>
  <li class="lottery-unit prize bg-award">
    <div class="">
      <img src="https://iph.href.lu/120x120" alt="">
      <p>三等奖</p>
    </div>
  </li>
  <li class="lottery-unit prize bg-award">
    <div class="">
      <img src="https://iph.href.lu/120x120" alt="">
      <p>谢谢参与</p>
    </div>
  </li>

  <li class="btn">
    <div class="lottery-btn"></div>                
  </li>

  <li class="lottery-unit prize bg-award">
    <div class="">
      <img src="https://iph.href.lu/120x120" alt="">
      <p>一等奖</p>
    </div>
  </li>
  <li class="lottery-unit prize bg-award">
    <div class="">
      <img src="https://iph.href.lu/120x120" alt="">
      <p>88一等奖</p>
    </div>
  </li>
  <li class="lottery-unit prize bg-award">
    <div class="">
      <img src="https://iph.href.lu/120x120" alt="">
      <p>一等奖</p>
    </div>
  </li>
  <li class="lottery-unit prize bg-award">
    <div class="">
      <img src="https://iph.href.lu/120x120" alt="">
      <p>一等奖</p>
    </div>
  </li>
</ul>
```



javascript：

```js
// 初始化
lotteryUtil.init({
  ele: 'JawardContainer',
  request(){
    // 异步请求中奖接口，获取中奖信息
    var i = 5;
    lotteryUtil.win(i)
  },
  success(index){
    // 中奖回调位置
    console.log(index)
  }
})
```

[案例展示](./lottery/index.html)

## 网页音乐播放

使用方式：

html：

```html
<div class="music btn-music" id="btnMusic" style="position: relative; z-index: 999;">
  music
</div>

<audio loop="loop" id="audio" preload="preload" autoplay="autoplay" loop="loop">
  <source src="https://fqj.springgame.com//reserve/themes/mp3/bgm.mp3"  type="audio/mp3">
</audio>
```

JavaScript：

```js
// 初始化
musicUtil.init({
  toggleId: 'btnMusic', // 控制按钮id
  audioId: 'audio', // 音频id
  isPlay: true // 是否默认播放
})
```

[案例展示](./music/index.html)

## 网页繁简体切换

使用方式：

html：

```html
<div class="translate-style">
  繁/简：<a id="translateLink" href="javascript:twUtil.translatePage();">繁體</a>
</div>
```



javascript：

```js
// 初始化
twUtil.translateInitilization({
  translateButtonId: "translateLink", // 默认互换id
  translateDelay: 0, // 延迟时间,若不在前, 要设定延迟翻译时间, 如100表示100ms,默认为0
  defaultEncoding: 2, //网站编写字体是否繁体，1-繁体，2-简体
   msgToTraditionalChinese: "繁體", //此处可以更改为你想要显示的文字
   msgToSimplifiedChinese: "简体", //同上，但两处均不建议更改
});
```

[案例展示](./translate/index.html)

## 微信PC端扫码登录

使用方式：

html：

```html
<!-- id -->
<div id="login_container"></div>

<!-- 引入微信第三方api -->
<!-- // 官方文档：https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html -->
<script src="//res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
```



javascript：

```js
// 初始化
var obj = new WxLogin({
  self_redirect: true,
  id: "login_container",
  appid: "your app id",
  scope: "snsapi_login",
  redirect_uri: "get_web_open_id intf ",
  state: "",
  style: "",
  href: ""
})
```

[案例展示](./wechat/index.html)

## 多选级联列表(异步数据)


[案例展示](./mul_cascader_panel/index.html)
