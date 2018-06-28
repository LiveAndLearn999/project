// pages/pubdPreview /pubdPreview .js
var common = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pictures: {},
    hotelNo:0,
  },
  previewImage: function (e) {
    common.getTypeDetailPics(this, e.currentTarget.dataset.pictype)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    common.getTypePics(this, options.hotelNo)
    this.setData({
      hotelNo: options.hotelNo
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