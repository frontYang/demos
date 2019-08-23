(function(){
  ;(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v4.0";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  var FBUtil = {
    // 初始化
    init(params) {
      var self = this
      this.loginIntf = params.loginIntf

      setTimeout(function(){
        FB.init({
          appId: params.appid,
          cookie: true,
          xfbml: true,
          version: 'v4.0'
        });

        window.fbAsyncInit = function () {
          FB.getLoginStatus(function (response) {
            self.statusChangeCallback(response);
          });
        };
      }, 1000)
    },

    // 分享
    share(callback) {
      FB.ui({
        method: 'share',
        href: window.location.href,
      }, (response) => {
        if (response && !response.error_message) {
          // 分享成功
          callback && callback(response)
        }
      });
    },

    // 服务器登录接口请求，获取相关信息
    loginApi() {
      var self = this
      FB.api(this.loginIntf, function (response) {
        console.log('Successful login for: ' + response.name);
        self.loginCallback && self.loginCallback(response)
      });
    },

    // 获取登录状态
    checkLoginState() {
      var self = this
      FB.getLoginStatus(function (response) {
        self.statusChangeCallback(response);
      });
    },

    // 状态改变回调
    statusChangeCallback(response) {
      if (response.status === 'connected') {
        this.loginApi();
      } else {
        console.log('Please log into this app.');
      }
    }
  }
  window.FBUtil = FBUtil
})()