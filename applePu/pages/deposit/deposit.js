// pages/deposit/deposit.js
var common = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconShow: true,
    iconShow2: false,
    res: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    common.subscriberDeposit(this)

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
  recharge: function (event) {
    var res = this.data.res
    if (res.payStatus == '0') {
      wx.requestPayment({
        timeStamp: res.timeStamp,
        nonceStr: res.nonceStr,
        package: res.package,
        signType: res.signType,
        paySign: res.paySign,
        total_fee: res.payPrice,
        success: function (res) {
          wx.showToast({
            title: '充值成功',
            icon: 'success',
            duration: 2000
          })
          wx.navigateBack({
            
          })
        },
        fail: function (res) {
          wx.showToast({
            title: '充值失败',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }
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