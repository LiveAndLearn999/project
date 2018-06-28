var app = getApp()
var common = require("../../utils/request.js");
Page({
  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    currentType: -1,
    res: [],
    hasMore: true,
    page: 1,
    status: -2,
  },
  loadmores: function () {
    this.setData({
      page: this.data.page + 1
    })
    common.getOrderList(this)
    // console.log('loadmores')
  },
  onLoad: function () {
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    this.getOrderList()
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current,
      currentType: e.detail.current == 0 ? -1 : e.detail.current,
      hasMore: true,
      page: 1
    });
    common.getOrderList(this)
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  getOrderList: function () {
    this.setData({
      status: -2,
      currentTab: 0,
      currentType: -1,
      hasMore: true,
      page: 1,
      res: []
    });
    common.getOrderList(this)
  },
  onShow: function () {
    if (wx.getStorageSync('needrefresh') == true) {
      wx.setStorageSync('needrefresh', false)
      this.getOrderList()
    }
  },
  orderDetail: function (e) {
    wx.navigateTo({
      url: '../orderDetail/orderDetail?orderno=' + e.currentTarget.dataset.orderno
    })
  }
})  