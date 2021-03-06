import * as echarts from '../ec-canvas/echarts';
const utils = require('../../utils/utils');
const db_utils = require('../../utils/db_utils');
const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: '#3e475a',
    title: {
      text: '历年综测评分',
      left: 'center',
      bottom: 32,
      textStyle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
      }
    },
    legend: {
      bottom: 0,
      data: [app.globalData.userScore.firstYear.slice(0, 4), app.globalData.userScore.secondYear.slice(0, 4), app.globalData.userScore.thirdYear.slice(0, 4), app.globalData.userScore.fourthYear.slice(0, 4)],
      itemGap: 20,
      textStyle: {
        color: '#fff',
        fontSize: 14
      },
      selectedMode: 'single'
    },
    radar: {
      indicator: [{
          name: '智育',
          max: 10
        },
        {
          name: '德育',
          max: 10
        },
        {
          name: '体育',
          max: 5
        }
      ],
      shape: 'circle',
      splitNumber: 5,
      name: {
        textStyle: {
          color: 'rgb(255, 255, 255)'
        }
      },
      splitLine: {
        lineStyle: {
          color: [
            'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
            'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
            'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
          ].reverse()
        }
      },
      splitArea: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(238, 197, 102, 0.5)'
        }
      }
    },
    series: [{
        name: app.globalData.userScore.firstYear.slice(0, 4),
        type: 'radar',
        data: [app.globalData.userScore.firstYearScore],
        label: {
          show: true,
          position: 'inside'
        },
        itemStyle: {
          normal: {
            color: '#F9713C'
          }
        },
        areaStyle: {
          normal: {
            opacity: 0.1
          }
        }
      },
      {
        name: app.globalData.userScore.secondYear.slice(0, 4),
        type: 'radar',
        data: [app.globalData.userScore.secondYearScore],
        label: {
          show: true,
          position: 'inside'
        },
        itemStyle: {
          normal: {
            color: '#F9713C'
          }
        },
        areaStyle: {
          normal: {
            opacity: 0.1
          }
        }
      },
      {
        name: app.globalData.userScore.thirdYear.slice(0, 4),
        type: 'radar',
        data: [app.globalData.userScore.thirdYearScore],
        label: {
          show: true,
          position: 'inside'
        },
        itemStyle: {
          normal: {
            color: '#F9713C'
          }
        },
        areaStyle: {
          normal: {
            opacity: 0.1
          }
        }
      },
      {
        name: app.globalData.userScore.fourthYear.slice(0, 4),
        type: 'radar',
        data: [app.globalData.userScore.fourthYearScore],
        label: {
          show: true,
          position: 'inside'
        },
        itemStyle: {
          normal: {
            color: '#F9713C'
          }
        },
        areaStyle: {
          normal: {
            opacity: 0.1
          }
        }
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onLoad: function(options) {},
  onShareAppMessage: function(res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },
  /**
   * 返回上一页监听函数
   */
  goBack: function(event) {
    wx.navigateBack({
      delta: 1
    });
  },
});