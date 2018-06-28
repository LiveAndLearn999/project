//pubMap.js
//获取应用实例
var app = getApp()
Page({
    data: {
      loadingHidden:  true ,
    markers: [{
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园',
      desc: '我现在的位置'
    }],
    covers: [{
      latitude: 23.099794,
      longitude: 113.324520,
      iconPath: '../../images/wechart.png',
      rotate: 10
    }, {
      latitude: 23.099298,
      longitude: 113.324129,
      iconPath: '../../images/wechart.png',
      rotate: 90
    }]
  },
    loadingTap:  function () {
              this.setData({
                  loadingHidden:  false
              });
              var  that  =  this;
              setTimeout(function () {
                  that.setData({
                        loadingHidden:  true
                  });
                  that.update();
              },  3000);
        },
  onLoad: function () {
    this.setData({
      loadingHidden: false
    });
    var that = this;
    setTimeout(function () {
      that.setData({
        loadingHidden: true
      });
      that.update();
    }, 3000);
    // console.log('地图定位！')
    // var that = this
    // wx.getLocation({
    //     type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //     success: function (res) {
    //       console.log(res)
    //         var latitude = res.latitude; 
    //         var longitude = res.longitude; 
    //         wx.openLocation({
    //           latitude:latitude,
    //           longitude:longitude,
    //           scale:1
    //         })
    //     }
    // });
    
  },
  onReady: function () {
    console.log('地图定位！')
    var that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res)
        var latitude = res.latitude;
        var longitude = res.longitude;
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    });

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
    wx.navigateBack({
      url: "../pubDetail/pubDetail"
    })
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
