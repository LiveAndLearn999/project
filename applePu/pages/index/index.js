//index.js
//获取应用实例
const app = getApp()
var common = require("../../utils/request.js");
var Data = require("../../utils/data.js");
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    localtion: '',
    banners: {},
    nearHotels: [],
    date:'',
    hasMore:true,
    page:1
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  chooselocation:function(){
    var that=this
    wx.chooseLocation({
      success: function(res) {
        that.setData({
          localtion: res.address.substr(0, 10) + '...'
        })
      },
    })
  },
  selectdate: function () {
    var that = this;
    var startDate = that.data.date;
    var endDate = that.data.tomorrow;
    wx.navigateTo({
      url: '../pickerTime/pickerTime?startDate=' + startDate
    })
  },
  loadmores(){
    this.setData({
      page: this.data.page+1
    })
    common.getNearHotels(this)
  },
  onLoad: function () {
    var that = this;
    var date = Data.formatDate(new Date(), "yyyy-MM-dd");
    this.setData({
      date: date
    });
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        common.location2Address(that,latitude,longitude)
      }
    })
    // 登录

    if (wx.getStorageSync('openid') == null || wx.getStorageSync('openid')=='') {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          common.userLogin(res.code, that)
       
        }
      })
    }
    else {
      common.getBanner(that)
      common.getNearHotels(that)
    }
  },
  onShow: function () {
    // var startDate = this.data.startDate;
    // var date = Data.formatDate(new Date(), "yyyy-MM-dd");
    // if (startDate == null) {
    //   startDate = date;
    // }
    // this.setData({
    //   date: startDate
    // });
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  }
})
