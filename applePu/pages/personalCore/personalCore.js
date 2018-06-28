// pages/personalCore/personalCore.js
var common = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    showAmountModal1: {
      showModal: 'hideModal',
      showMask: 'hideMask',
    },
    phonenumber: '',
    btncodename:'免费获取',
    btncodeclass:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = wx.getStorageSync('userinfo');
    var that = this
    if (userinfo.headUrl == '') {
      wx.getUserInfo({
        withCredentials: true,
        success: res => {
          common.uploadUserInfo(that, res)
        },
        fail: res => {
          wx.showToast({
            title: '请同意',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }

  },
  bindmobile: function (event) {
    this.setData({
      showAmountModal1: {
        showModal: 'showModal',
        showMask: 'showMask',
      }
    })
  },
  yajinwatch: function (event) {
    wx.navigateTo({
      url: '../meInterests/meInterests',
    })
  },
  submitbindmobile: function (event) {
    if (this.data.code.length == 0) {
      wx.showToast({
        title: '验证码不能为空',
        duration: 3000,
        icon: 'none'
      })
      return
    }
    this.setData({
      btncodename:'重新获取'
    })
    common.updateSubscriberMobile(this)
  },
  getcode: function (event) {
    if (this.data.phonenumber.length != 11 || this.data.phonenumber.length == '') {
      wx.showToast({
        title: '请输入正确的手机号码',
        duration: 3000,
        icon: 'none'
      })
      return
    }
    common.getcode(this)
  },
  mobileinput: function (event) {
    this.setData({
      phonenumber: event.detail.value
    })
  },
  codeinput: function (event) {
    this.setData({
      code: event.detail.value
    })
  },
  hideAmountModal: function (event) {
    this.setData({
      showAmountModal1: {
        showModal: 'hideModal',
        showMask: 'hideMask',
      }
    })
  },
  actioncnt2: function () {
    wx.makePhoneCall({
      phoneNumber: '18888888888' //仅为示例，并非真实的电话号码
    });
  },
  toLoad: function () {
    // wx.navigateTo({
    //   url: '../toLoad/toLoad'
    // })
  },
  toCoupons: function () {
    wx.navigateTo({
      url: '../coupons/coupons'
    })
  },
  toappMi: function () {
    wx.navigateTo({
      url: '../allAppmi/allAppmi'
    })
  },

  toMyorder: function () {
    wx.switchTab({
      url: '../myOrder/myOrder'
    })
  },

  chongzhi: function () {
    wx.navigateTo({
      url: '../topUp/topUp'
    })

  },

  setting: function () {
    wx.navigateTo({
      url: '../setting/setting'
    })
  },
  yajin: function () {
    wx.navigateTo({
      url: '../deposit/deposit'
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    common.getUserInfo(this)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


})