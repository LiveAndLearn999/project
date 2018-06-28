// pages/topUp/topUp.js
var common = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sCon: true,
    sCon2: false,

    giving: false,
    shouimg: '../../img/up.png',
    ishang: true,
    red: {},
    selectid: 0,
    orderno: '',
    depositAmount: 0,
    payPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      orderno: options.orderno,
      depositAmount: (Number)(options.depositAmount),
      payPrice: (Number)( options.payPrice)
    });
    common.getRechargeList(this);
  },
  setMoney:function(){
    var that=this
    this.setData({
      ordernum: that.data.depositAmount + that.data.res[0].rechargeAmount
    })
  },
  showMore: function () {
    this.setData({
      ishang: !this.data.ishang,
    })
    if (this.data.ishang)
      this.setData({
        shouimg: '../../img/up.png',
      })
    else
      this.setData({
        shouimg: '../../img/down.png',
      })
  },




  goTopup: function () {
    wx.redirectTo({
      url: '../topUp/topUp'
    })
  },



  givingThere: function (event) {
    var that = this
    this.setData({
      selectid: event.currentTarget.id,
      ordernum: that.data.depositAmount  + that.data.res[event.currentTarget.id].rechargeAmount
    })
  },

  showIco2: function () {
    var that=this
    this.setData({
      selectid: -1,
      ordernum: that.data.depositAmount + that.data.payPrice
    })
  },
  recharge: function (event) {
    console.log("-----------------")
    if (this.data.selectid==-1){
      common.reSubmitOrder(this)
    }else{
      common.rechargeOrderPay(this)
    }
  
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