import F2 from '../components/f2-canvas/lib/f2';


/* 柱形图—— type: 1:周期，2:月份，3:年份 */
export const initChartColumn = (opts) => {
  let [canvas, width, height, data, type] = opts
  let xTickCount = ''
  let yTickCount = 4
  let max = Math.max.apply(Math, data.map(function (o) { return o.sign_count }))

  data.forEach((item) => {
    // 如果数值为0，占最大值的0.05份
    if (max == 0) max = 1
    if (max == 1) yTickCount = 2
    if (item.sign_count == 0) item.sign_count = max * 0.05
  })

  // 月份X轴显示7个
  if (type == 2) xTickCount = 7

  // 年份增加背景
  if (type == 3) data.forEach(item => item.per = 1)

  let chart = new F2.Chart({
    el: canvas,
    width: width,
    height: height,
    appendPadding: 5
  })

  chart.source(data, {
    number: {
      tickCount: xTickCount
    },
    sign_count: {
      max: max,
      tickCount: yTickCount,
      formatter: function formatter(val) {
        return Math.floor(val)
      }
    },
    per: {
      min: 0,
      formatter: function formatter(val) {
        return (val * 100).toFixed(0) + '%';
      }
    }
  })

  chart.tooltip(false)

  if (type == 3) {
    // 年份背景
    chart.axis('per', false);
    chart.axis('sign_count', {
      position: 'left',
      grid: null,
      line: {
        lineWidth: 1,
        stroke: '#eee',
        top: true,
      }
    })
    chart.interval().position('number*per').color('#fff4cf')
  } else {
    chart.axis('sign_count', {
      grid: null,
      line: {
        lineWidth: 1,
        stroke: '#eee',
        top: true,
      }
    })
  }

  chart.interval().position('number*sign_count').color('#ffa020').adjust('stack')
  chart.render()
  return chart
}

/* 折线图——周期 */
export const initChartLine = (opts) => {
  let [canvas, width, height, data] = opts
  let chart = new F2.Chart({
    el: canvas,
    width,
    height
  });

  chart.source(data, {
    sign_count: {
      tickCount: 2,
      range: [0, 1]
    }
  });
  chart.tooltip(false);
  chart.axis('sign_count', {
    label: function label(text, index, total) {
      var textCfg = {};
      if (index === 0) {
        textCfg.textAlign = 'left';
      } else if (index === total - 1) {
        textCfg.textAlign = 'right';
      }
      return textCfg;
    }
  });
  chart.line().position('number*sign_count').style({
    stroke: '#888',
    lineWidth: 1
  });
  chart.point().position('number*sign_count').color('#ffa020').style({
    stroke: '#ffa020',
    lineWidth: 1
  })
  chart.render()
}