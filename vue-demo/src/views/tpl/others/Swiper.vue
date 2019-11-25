<template>
  <div class="section-wrap">
    <div class="section-tb">
      <div class="swiper swiper-coverflow">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in list" :key="index">
            <img :src="item" alt="">
          </swiper-slide>
        </swiper>
        <div class="icon icon-left swiper-button-prev"></div>
        <div class="icon icon-right swiper-button-next"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    modData: {
      type: Object,
      value: {}
    }
  },
  data() {
    return {
      list: [
        'http://dummyimage.com/851x465',
        'http://dummyimage.com/851x465',
        'http://dummyimage.com/851x465',
        'http://dummyimage.com/851x465',
        'http://dummyimage.com/851x465'
      ],
      swiperOption: {
        loop: true,
        effect: 'coverflow',
        slidesPerView: 2,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 20,
          depth: 0,
          modifier: 3,
          slideShadows: false
        },

        navigation: {
          nextEl: '.icon-right',
          prevEl: '.icon-left'
        }
      }
    }
  },
  components: {
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/_var.scss';

.swiper-coverflow{
  width: 1300px;
  position: relative;
  .swiper-slide{
    box-sizing: border-box;
    transform: scale(.8) translateX(60%) !important;

    &.swiper-slide-active{
     transform: scale(1) translateX(0)!important;
    }

    &.swiper-slide-next{
      transform: scale(.8) translateX(-60%) !important;
    }

    img{
      width: 100%;
      border: 12px solid rgba(255,255,255,.65);
      transition: all .8s ease 0s;
    }
  }

  .icon-left,
  .icon-right{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    &:focus{
      outline: none;
    }
  }

  .icon-left{
    left: 200px;
  }
  .icon-right{
    right: 200px;
  }
}

.praise{
  display: flex;
  width: 716px;
  margin: 68px auto 0;

  .logo{
    width: 132px;
    height: 132px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 0 10px #fff;
  }
  .detail{
    padding-left: 32px;
  }
  .detail-th{
    span{
      font-size: 55px;
      padding-right: 20px;
      text-shadow: 0 1px #fff,
                    0 1px #fff,
                    0 1px #fff,
                    0 1px #fff;
    }
    em{
      font-size: 35px;
      text-shadow: 0 1px #fff,
                    0 1px #fff,
                    0 1px #fff,
                    0 1px #fff;
    }
    color: $primary;
  }
  .icons{
    padding-top: 15px;
  }
  .icon{
    width: 165px;
    height: 49px;
    background-size: 165px 49px;
    margin-right: 19px;
  }
}
</style>
