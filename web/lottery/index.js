;(function(){

  var lotteryUtil = {
    config: {
      ele: 'JAwardcontainer',
      btn: 'btn',
      click: false,
      awardIndex: -1,
      index: -1,    //当前转动到哪个位置，起点位置
      count: 0,     //总共有多少个位置
      timer: 0,     //setTimeout的ID，用clearTimeout清除
      speed: 20,    //初始转动速度
      times: 0,     //转动次数
      cycle: 50,    //转动基本次数：即至少需要转动多少次再进入抽奖环节
      prize: -1,    //中奖位置
    },

    init(){
      this.initLottery(this.config.ele)
      this.bind()
    },


    bind() {
      var btn = document.getElementById('btn')
      btn.addEventListener('click', function(){
        awardIndex = -1
        if (click) { //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
          return false;
        } else {
          main.lottery((i, errorMsg) => {
            awardIndex = i;
            if (errorMsg) {
              lottery.obj.find('.lottery-unit').removeClass('select');
              main.popMsg(errorMsg)
              return
            }

            lottery.speed = 100;
            roll(); // 转圈过程不响应click事件，会将click置为false
            click = true; // 一次抽奖完成后，设置click为true，可继续抽奖
          })

          return false;
        }
      })
    },

    initLottery: function (id) {
      if ($('#' + id).find('.lottery-unit').length > 0) {
        var $lottery = $('#' + id);
        var $units = $lottery.find('.lottery-unit');
        this.config.obj = $lottery;
        this.config.count = $units.length;
        $lottery.find('.lottery-unit.lottery-unit-' + this.config.index).addClass('select');
      };
    },
    roll: function () {
      var index = this.config.index;
      var count = this.config.count;
      var lottery = this.config.obj;
      lottery.find('.lottery-unit.lottery-unit-' + index).removeClass('select');
      index += 1;
      if (index > count - 1) {
        index = 0;
      };
      lottery.find('.lottery-unit.lottery-unit-' + index).addClass('select');
      this.config.index = index;
      return false;
    },
    stop: function (index) {
      this.config.prize = index;
      return false;
    },
    roll() {
      lottery.times += 1;
      lottery.roll(); //转动过程调用的是lottery的roll方法，这里是第一次调用初始化
      if (lottery.times > lottery.cycle + 10 && (lottery.prize == lottery.index)) {
        clearTimeout(lottery.timer);
        setTimeout(() => {
          alert('中奖')
        }, 500);
        lottery.prize = -1;
        lottery.times = 0;
        click = false;
      } else {
        if (lottery.times < lottery.cycle) {
          lottery.speed -= 10;
        } else if (lottery.times == lottery.cycle) {
          lottery.prize = awardIndex; // 中奖位置
          // lottery.errorMsg = msg
        } else {
          if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
            lottery.speed += 110;
          } else {
            lottery.speed += 50;
          }
        }
        if (lottery.speed < 40) {
          lottery.speed = 40;
        };

        lottery.timer = setTimeout(roll, lottery.speed); //循环调用
      }
      return false;
    },
    
  }

  window.lotteryUtil = lotteryUtil

})();


