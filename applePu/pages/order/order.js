// pages/order/order.js
var common = require("../../utils/request.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAmountModal: {
      showModal: 'hideModal',
      showMask: 'hideMask',
    },
    showDown: true,
    showUp: false,
    errorMsg: '',
    preorderinfo: {},
    guofen: [],
    person1: '',
    person2: '',
    cardno1: '',
    cardno2: '',
    mobile: '',
    showAmountModal1: {
      showModal: 'hideModal',
      showMask: 'hideMask',
    },
    phonenumber: '',
    btncodename: '免费获取',
    btncodeclass: ''
  },

  toCoupons: function () {
    wx.navigateTo({
      url: '../coupons/coupons'
    })
  },

  selectAppmi: function () {
    wx.navigateTo({
      url: '../allAppmi/allAppmi'
    })
  },


  showAmountModal: function (e) {
    var that = this;
    that.setData({
      showAmountModal: {
        showModal: 'showModal',
        showMask: 'showMask',
      },
      showDown: false,
      showUp: true

    })
  },

  hideAmountModal: function (e) {
    var that = this;
    that.setData({
      showAmountModal: {
        showModal: 'hideModal',
        showMask: 'hideMask',
      },
      showDown: true,
      showUp: false
    })
  },

  hideAmountModal1: function (e) {
    var that = this;
    that.setData({
      showAmountModal1: {
        showModal: 'hideModal',
        showMask: 'hideMask',
      },
    })
  },
  cale:function(){
    var that = this;
    that.setData({
      showAmountModal1: {
        showModal: 'hideModal',
        showMask: 'hideMask',
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hotelNo: options.hotelNo,
      subjectId: options.subjectId,
      startTime: options.startTime,
      endTime: options.endTime,
      date: options.date,
    })
    common.preOrder(this)
  },
  submitOrder: function (e) {
    var flag = true
    this.data.person1 = e.detail.value.person1
    this.data.person2 = e.detail.value.person2
    if (this.data.person1.length == 0 && this.data.person2.length == 0)
      flag = false
    if (this.data.person1.length != 0&&!util.validateIdCard((this.data.cardno1 = e.detail.value.cardno1)))
      flag = false
    if (this.data.person2.length!=0&&!util.validateIdCard((this.data.cardno2 = e.detail.value.cardno2)))
      flag = false
    this.data.mobile = e.detail.value.mobile;
    console.log(this.data.mobile.length)
    if (this.data.mobile.length != 11 || this.data.mobile.length == '')
      flag = false
    if (flag) {
      common.submitOrder(this);
      // var d = common.submitOrder(this);
      // console.log(111111);
      // console.log(d);
      // console.log(1111);
    } else {
      wx.showToast({
        title: '请检查身份证信息和手机号是否正确',
        duration: 3000,
        icon: 'none'
      })
    }
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
    common.getcode(this);
    // console.log(11111111111);
    // console.log(common.getcode(this));
    // console.log(11111111111);
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
  checkIphone: function (e) {

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