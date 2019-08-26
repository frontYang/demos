(function (window, factory) {
  if (typeof exports === 'object') {

    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {

    define(factory);
  } else {

    window.musicUtil = factory();
  }
})(this, function () {
  var musicUtil = {
    isPlay: true,
    getId(id) {
      return Object.prototype.toString.call(id) === "[object Object]" ? id : document.getElementById(id)
    },

    // 初始化
    init(params) {
      var self = this
      this.audioObj = this.getId(params.audioId)
      this.toggleObj = this.getId(params.toggleId)
      this.isPlay = params.isPlay


      // 移动端可以用touchend
      document.body.addEventListener('click', this.playInBrower);
      document.addEventListener('DOMContentLoaded', this.playInWx);
      this.toggle()
    },

    // 暂停/播放切换
    toggle() {
      var self = this
      // 移动端可以用touchend
      this.toggleObj.addEventListener('click', function (e) {
        e.stopPropagation()
        self.isPlay = !self.isPlay
        self.musicPlay()
      })
    },

    // 浏览器自动播放
    playInBrower() {
      musicUtil.isPlay = true
      musicUtil.musicPlay();
      // 移动端可以用touchend
      document.body.removeEventListener('click', this.playInBrower);
    },

    // 微信自动播放
    playInWx() {
      musicUtil.isPlay = true
      musicUtil.musicPlay();
      document.addEventListener("WeixinJSBridgeReady", function () {
        musicUtil.musicPlay();
      }, false);
      document.removeEventListener('DOMContentLoaded', this.playInWx);
    },

    // 播放/暂停
    musicPlay() {
      var audio = this.audioObj
      if (musicUtil.isPlay && audio.paused) {
        audio.play();
        this.isPlay = true
        console.log('播放')
        return
      }

      if (!musicUtil.isPlay && !audio.paused) {
        audio.pause();
        this.isPlay = false
        console.log('暂停')
      }
    }
  }

  return musicUtil
});
