<template>
  <view class="page page-canvas">
    <canvas
      class="f2-canvas"
      :canvas-id="canvasId"
      @init="init"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      @longtap="press"
    >
    </canvas>
  </view>
</template>

<script>
import Renderer from '@/common/lib/f2/renderer';
import F2 from '@/common/lib/f2/f2';

// 适配小程序的事件机制
F2.Util.addEventListener = function (source, type, listener) {
  source.addListener(type, listener);
};

F2.Util.removeEventListener = function (source, type, listener) {
  source.removeListener(type, listener);
};

F2.Util.createEvent = function (event, chart) {
  const type = event.type;
  let x = 0;
  let y = 0;
  const touches = event.touches;
  if (touches && touches.length > 0) {
    x = touches[0].x;
    y = touches[0].y;
  }

  return {
    type,
    chart,
    x,
    y
  };
};

export default {
  props: {
    canvasId: {
      type: String,
      value: 'f2-canvas'
    },

    opts: {
      type: Object
    }
  },
  data() {
    return {

    }
  },

  ready: function () {
    if (!this.opts) {
      console.warn('组件需绑定 opts 变量，例：<ff-canvas id="mychart-dom-bar" '
        + 'canvas-id="mychart-bar" opts="{{ opts }}"></ff-canvas>');
      return;
    }

    if (!this.opts.lazyLoad) {
      this.init();
    }
  },

  methods: {
    init: function(callback) {
      /* console.log(uni.version)
      const version = uni.version.version.split('.').map(n => parseInt(n, 10));
      const isValid = version[0] > 1 || (version[0] === 1 && version[1] > 9)
        || (version[0] === 1 && version[1] === 9 && version[2] >= 91);
      if (!isValid) {
        console.error('微信基础库版本过低，需大于等于 1.9.91。');
        return;
      } */

      const ctx = uni.createCanvasContext(this.canvasId, this); // 获取小程序上下文
      const canvas = new Renderer(ctx);
      this.canvas = canvas;

      const query = uni.createSelectorQuery().in(this);
      query.select('.f2-canvas').boundingClientRect(res => {
        if (typeof callback === 'function') {
          this.chart = callback(canvas, res.width, res.height);
        } else if (this.opts && this.opts.onInit) {
          this.chart = this.opts.onInit(canvas, res.width, res.height);
        }
      }).exec();
    },
    touchStart(e) {
       if (this.canvas) {
         this.canvas.emitEvent('touchstart', [e]);
       }
    },
    touchMove(e) {
      if (this.canvas) {
        this.canvas.emitEvent('touchmove', [e]);
      }
    },
    touchEnd(e) {
      if (this.canvas) {
        this.canvas.emitEvent('touchend', [e]);
      }
    },
    press(e) {
      if (this.canvas) {
        this.canvas.emitEvent('press', [e]);
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
