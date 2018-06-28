// pages/topUp/topUp.js
var common = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconShow: true,
    iconShow2: false,
    giving: false,
    res: {},
    selectid: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    common.getRechargeList(this)
  },
  gorechargeprotocol: function (e) {
    wx.navigateTo({
      url: '../../pages/topUpAgreement/topUpAgreement',
    })
  },
  givingThere: function (event) {
    this.setData({
      selectid: event.currentTarget.id
    })
  },
  recharge: function (event) {
    common.recharge(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  iconShow: function () {
    var that = this
    that.setData({

      iconShow: (!that.data.iconShow),
      iconShow2: (!that.data.iconShow2)
      // nzopen1: false,
      // nzshow1: true

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