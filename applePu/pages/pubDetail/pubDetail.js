// pages/pubDetail/pubDetail.js
var Data = require("../../utils/data.js");
var common = require("../../utils/request.js");
//获取应用实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
    array1: ['22:00'],
    array2: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
    date: '',
    weeks_ch :['日', '一', '二', '三', '四', '五', '六'],
    hotelinfo: {},
    subjectinfo: {},
    subjecttimes: {},
    opensubjectid: -1,
    avatarUrl: null,
    hotelNo: '',
    index: 0,
  },
  listenerPickerSelected: function (e) {
    this.setData({
      index: e.detail.value,
      opensubjectid: -1,
    });
    this.getsubject();
  },

  bindViewTap: function () {
    var that = this;
    var startDate = that.data.date;
    var endDate = that.data.tomorrow;
    wx.navigateTo({
      url: '../pickerTime/pickerTime?startDate=' + startDate
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  getsubject: function () {
  
    this.setData({
      opensubjectid: -1,
   
    });
    common.getSubject(this)
  },
  // getsubject: function () {
  //   this.setData({
  //     opensubjectid: -1,
  //   });
  //   var that = this
  //   var date = Data.formatDate(new Date(), "yyyy-MM-dd");
  //   this.setData({
  //     index: 0
  //   });
  //   if (this.data.date != date) {
  //     this.setData({
  //       array: that.data.array2,
  //     });
  //   } else {
  //     this.sethour()
  //   }
  //   common.getSubject(this)
  // },
  onLoad: function (options) {
    var date = Data.formatDate(new Date(), "yyyy-MM-dd");
    this.setData({
      date: date,
      xingqi: "星期" + this.data.weeks_ch[new Date().getDay()]
    });
    common.getHotelInfo(this, options.hotelNo)
    this.setData({
      hotelNo: options.hotelNo
    })

  },
  sethour:function(){
    var hour = Data.formatDate(new Date(), "HH");
    if (hour <= 9) {
      this.setData({
        index: 0
      });
    } else if (hour >= 22) {
      this.setData({
        array: this.data.array1,
        index: 0
      });
    } else {
      var array = this.data.array
      this.setData({
        array: array.splice(hour - 9),
        index: 0
      });
    }
  },

  list: function (e) {
    var index = e.currentTarget.id;
    if (this.data.opensubjectid == index) {
      index = -1
      this.setData({
        opensubjectid: index,
      })
      return
    }
    var subjectid = e.currentTarget.dataset.subjectid
    wx.showLoading({
      title: '加载中...',
    })
    common.getSubjectRoom(this, subjectid, index)

  },
  pingfen: function () {
    wx.navigateTo({
      url: '../pubEvaluation/pubEvaluation'
    })
  },

  orderPay: function (e) {
    wx.navigateTo({
      url: '../order/order?hotelNo=' + this.data.hotelNo + "&subjectId=" + e.currentTarget.dataset.subjectid + "&startTime=" + e.currentTarget.dataset.starttime + "&endTime=" + e.currentTarget.dataset.endtime + "&date=" + this.data.date.replace(new RegExp("-", "gm"), "")
    })
  },
  goTitImage: function (e) {
    wx.navigateTo({
      url: '../pubdPreview2/pubdPreview2?hotelNo=' + e.currentTarget.dataset.hotelno
    })
  },
  previewImage: function (e) {
    common.getSubjectDetailPics(this, e.currentTarget.dataset.subjectid)
  },
  goMap: function () {
    // wx.navigateTo({
    //   url: '../pubMap/pubMap'
    // })
    var that = this
    wx.openLocation({
      latitude: that.data.hotelinfo.latitude,
      longitude: that.data.hotelinfo.longitude,
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
    common.getSubject(this)
  },

  bindPickerChange: function (e) {
    this.setData({
      areaIndex: e.detail.value
    })
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