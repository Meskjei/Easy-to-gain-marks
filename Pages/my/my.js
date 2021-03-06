// Pages/my/my.js
const app = getApp();
const db_utils = require('../../utils/db_utils');
const utils = require('../../utils/utils');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    functionType: [{
      functionName: '扫码签到',
      functionIconPath: '../../images/scan.png'
    }, {
      functionName: '上传材料',
      functionIconPath: '../../images/update.png'
    }], //功能栏功能类型
    userInfo: {}, //当前用户信息
    userType: '' //当前用户类型
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    if (app.globalData.userType == 'c') {
      this.data.functionType = [{
        functionName: '发布活动',
        functionIconPath: '../../images/publish.png'
      }, {
        functionName: '开始签到',
        functionIconPath: '../../images/checkIn.png'
      }]
    }
    this.setData({
      functionType: that.data.functionType,
      userInfo: app.globalData.userInfo,
      userType: app.globalData.userType
    });

    console.log(this.data);
    if(this.data.userType == 's'){
      this.getMarks();
    }
    
  },


  getMarks: function(e) {
    let query = new wx.BaaS.Query();
    query.compare('studentId', '=', app.globalData.userInfo.id);
    db_utils.searchData(app.globalData.scoreTableId, query, (res) => {
      if (res.data.objects == "") {
        utils.showModel('网络故障', '获取用户分数失败');
      } else {
        app.globalData.userScore = res.data.objects[0];
        console.log(res.data.objects[0]);
      }
    })
  },
  /**
   * 前往我的综测分数
   */
  toMyMarks: function(event) {
    wx.navigateTo({
      url: '../myMarks/myMarks',
    });
  },
  toMyActivity: function (event) {
    wx.navigateTo({
      url: '../myActivity/myActivity',
    });
  },
  toChooseActivity: function (event) {
    wx.navigateTo({
      url: '../chooseActivity/chooseActivity',
    });
  },
  toPublishActivity: function (event) {
    wx.navigateTo({
      url: '../publishActivity/publishActivity',
    });
  },
  toSubmission:function(event){
    wx.navigateTo({
      url: '../submission/submission',
    });
  },
  allFun: function(res) {
    let index = res.currentTarget.dataset.index;
    if(app.globalData.userType=='s'){
      switch (index) {
        case 0:
          this.scan();
          break;
        case 1:
          this.toSubmission();
          break;
        default:
          break;
      }
    }
    else if (app.globalData.userType == 'c') {
      switch (index) {
        case 0:
          this.toPublishActivity();
          break;
        case 1:
          this.chooseActivity();
          break;
        default:
          break;
      }
    }
    else if (app.globalData.userType == 'e') {
      switch (index) {
        case 0:
          this.scan();
          break;
        case 1:
          this.upload();
          break;
        default:
          break;
      }
    }
    else{
      utils.showMessage("用户类型错误");
    }
  },
  scan: function() {
    wx.scanCode({
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log(res);
        wx.showToast({
          title: '网络故障',
          image: '../image/netError.png'
        });
      }
    })
  },
})