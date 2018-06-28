// pages/setting/setting.js
var common = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAmountModal1: {
      showModal: 'hideModal',
      showMask: 'hideMask',
    },
    btncodename: '免费获取',
    btncodeclass: '',
    phonenumber: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = wx.getStorageSync('userinfo')
    console.log(userinfo)
    this.setData({
      userinfo: userinfo
    })
  },
  changemobile: function (e) {
    this.setData({
      showAmountModal1: {
        showModal: 'showModal',
        showMask: 'showMask',
      }
    })
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
    if (this.data.phonenumber == this.data.userinfo.mobile) {
      wx.showToast({
        title: '请输入新的手机号码',
        duration: 3000,
        icon: 'none'
      })
      return
    }
    common.getcode(this)
  },
  hideAmountModal: function (event) {
    this.setData({
      showAmountModal1: {
        showModal: 'hideModal',
        showMask: 'hideMask',
      }
    })
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
      btncodename: '重新获取'
    })
    common.updateSubscriberMobile(this)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  aboutus: function () {
    wx.navigateTo({
      url: '../aboutUs/aboutUs'
    })
  },
  userAgre: function () {
    wx.navigateTo({
      url: '../userAgre/userAgre'
    })
  },
  depInstr: function () {
    wx.navigateTo({
      url: '../depInstr/depInstr'
    })
  },
  topUpAgreement: function () {
    wx.navigateTo({
      url: '../topUpAgreement/topUpAgreement'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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