// pages/allAppmi/allAppmi.js
var common = require("../../utils/request.js");
var selectvalue
Page({

  /**
   * 页面的初始数据
   */
  data: {
      guofen:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    common.getGuofen(this)
  },

  checkboxChange:function(e){
    selectvalue=e.detail.value
  },
  select:function(e){
    if (selectvalue.length>2){
      wx.showToast({
        title: '最多选择2个果粉',
        duration:1500,
        icon:'none'
      })
    }else{
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];

      for (var i = 0; i < selectvalue.length;i++){
        if(i==0){
          prevPage.setData({
            person1: this.data.guofen[selectvalue[i]].name,
            cardno1: this.data.guofen[selectvalue[i]].idCardNum,
          })
    
        }else if(i==1){
          prevPage.setData({
            person2: this.data.guofen[selectvalue[i]].name,
            cardno2: this.data.guofen[selectvalue[i]].idCardNum,
          })
        }
      }
   
  
      wx.navigateBack({
        
      })
    }
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