// Pages/myActivity/myActivity.js
const utils = require('../../utils/utils');
const db_utils = require('../../utils/db_utils');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentActivityIndex: 0,
    offset: 0, //当前的偏移量
    activityId: [],
    activities: [],
    tabActivities: [],
    currentIndex: 0, //当前的swiper索引值
    swiperHeight: 0, //swiper容器高度
    userType: '',  //用户类型
    currentTime: null,
  },

  /**
   * 修改tab
   */
  changeTab: function (event) {
    let index;
    if (event.type == 'change') {
      index = event.detail.current;
    } else {
      index = event.currentTarget.dataset.index;
    }
    this.setData({ currentIndex: index });
    if (index == 1) {
      this.getCurrentTime();

      // // this.data.tabActivities = this.data.activities[this.data.activities.startTime < this.data.currentTime];
      // let item = this.data.activities.map((item, index) => {
      //   return item.startTime;
      // });
      // console.log(item[item < this.data.currentTime]);
      // // console.log(this.data.tabActivities)
    }
  },


  /**
   * 返回上一页监听函数
   */
  goBack: function (event) {
    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onReachBottom: function (options) {
    if (this.data.hasNext == true) {
      let stuQuery = new wx.BaaS.Query();
      stuQuery.compare('studentId', '=', '5bd072e67bc6aa18e705dc34');
      db_utils.searchData(app.globalData.joinActivityTableId, stuQuery, (res) => {
        this.data.activityId = res.data.objects.map((item, index) => {
          return item.activityId;
        });
        console.log(this.data.activityId);
        let activityQuery = new wx.BaaS.Query();
        activityQuery.in('id', this.data.activityId);
        this.getDataPerPage(activityQuery);
      })
    }
  },

  onPullDownRefresh: function (options) {
    this.data.activities = [];
    this.data.offset = 0;
    let stuQuery = new wx.BaaS.Query();
    stuQuery.compare('studentId', '=', '5bd072e67bc6aa18e705dc34');
    db_utils.searchData(app.globalData.joinActivityTableId, stuQuery, (res) => {
      this.data.activityId = res.data.objects.map((item, index) => {
        return item.activityId;
      });
      console.log(this.data.activityId);
      let activityQuery = new wx.BaaS.Query();
      activityQuery.in('id', this.data.activityId);
      this.getDataPerPage(activityQuery);
    })
    wx.stopPullDownRefresh();
  },

  /**
   * 分页加载
   */
  getDataPerPage: function (query) {
    let that = this;
    let Product = new wx.BaaS.TableObject(app.globalData.activityTableId);
    if (query == undefined) {
      query = new wx.BaaS.Query();
    }
    wx.showNavigationBarLoading();
    Product.limit(20).setQuery(query).offset(this.data.offset).orderBy('-created_at').find().then(res => {
      //判断是否有下一页
      console.log(res);
      that.data.hasNext = res.data.meta.next == null ? false : true;
      if (that.data.hasNext) {
        that.data.offset += 20;
      }
      //进一步处理获取到的数据使之能被瀑布流插件使用
      that.data.activities = that.data.activities.concat(res.data.objects)
      that.setData({
        activities: that.data.activities,
        swiperHeight: that.data.activities.length * 230
      });
      console.log(this.data);
      wx.hideNavigationBarLoading();

    }, err => {
      wx.showToast({
        title: '网络故障',
      });
    });
  },
  getCurrentTime: function () {
    let that = this;
    wx.request({
      url: 'https://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.data.currentTime = new Date(parseInt(res.data.data.t));
        console.log(that.data.activities);
        console.log(that.data.activities[0].startTime);
        console.log(typeof that.data.activities[0].startTime);

        let activityTime = new Date(Date.parse(that.data.activities[0].startTime));

        console.log("test:");
        console.log(activityTime);
        console.log(that.data.currentTime);
        console.log(activityTime < that.data.currentTime);
        console.log(activityTime > that.data.currentTime);
      },
      fail(res) {
        utils.showModel('网络故障', '获取当前时间失败');
      }
    })
  },
})