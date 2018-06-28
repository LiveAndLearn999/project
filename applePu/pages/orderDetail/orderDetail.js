// pages/orderDetail/orderDetail.js
var common = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetailTil1: '等待支付',
    orderDetailTil2: '预约成功',
    orderDetailTil3: '支付取消',
    orderDetailTilcit1: '酒店确认有房，将为您保留5分钟，请在3月26号18：35前完成支付。如超时支付订单将自动取消。',
    orderDetailTilcit2: '觅TA酒店欢迎您的到来',
    orderDetailTilcit3: '订单超时，订单自动取消',

    // 评价
    showAmountModal: {
      showModal: 'hideModal',
      showMask: 'hideMask'
    },
    showAmountModal1: {
      showModal: 'hideModal',
      showMask: 'hideMask'
    },
    showView: true,
    showView2: true,
    showView3: true,
    showView4: true,
    showView5: true,
    dd: '您对本次服务满意吗',
    cont: 0,
    cont2: 0,
    cont3: 0,
    cont4: 0,
    cont5: 0,
    conts: 0,
    conts2:5,

    showColor: false,
    showColor1: false,
    showColor2: false,
    showColor3: false,
    showColor4: false,
    showColor5: false,
    showColor6: false,
    showColor7: false,
    data: {},
    roomshow:false,

  },


  // 评价


  showColor: function () {
    var that = this;
    that.setData({
      showColor: (!that.data.showColor)
    })
  },
  gohotel: function () {
    var that = this
    wx.openLocation({
      latitude: that.data.data.latitude,
      longitude: that.data.data.longitude,
    })
  },
  call: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.data.tel //仅为示例，并非真实的电话号码
    });
  },
  showColor1: function () {
    var that = this;
    that.setData({
      showColor1: (!that.data.showColor1)
    })
  },
  showColor2: function () {
    var that = this;
    that.setData({
      showColor2: (!that.data.showColor2)
    })
  },
  showColor3: function () {
    var that = this;
    that.setData({
      showColor3: (!that.data.showColor3)
    })
  },
  showColor4: function () {
    var that = this;
    that.setData({
      showColor4: (!that.data.showColor4)
    })
  },
  showColor5: function () {
    var that = this;
    that.setData({
      showColor5: (!that.data.showColor5)
    })
  },
  showColor6: function () {
    var that = this;
    that.setData({
      showColor6: (!that.data.showColor6)
    })
  },
  showColor7: function () {
    var that = this;
    that.setData({
      showColor7: (!that.data.showColor7)
    })
  },


  hideAmountModal: function (e) {
    this.setData({
      showAmountModal: {
        showModal: 'hideModal',
        showMask: 'hideMask',
      },
    })
  },
  hideAmountModal1: function (e) {
    this.setData({
      showAmountModal1: {
        showModal: 'hideModal',
        showMask: 'hideMask',
      },
    })
  },
  paydetail: function (e) {
    this.setData({
      showAmountModal1: {
        showModal: 'showModal',
        showMask: 'showMask',
      },
    })
  },
  doaction: function (e) {
    
    if (this.data.data.orderStatus == '1') {
      common.reSubmitOrder(this)
    } else if (this.data.data.orderStatus == '2') {
      common.compOrder(this)
    } else if (this.data.data.orderStatus == '3') {

    } else if (this.data.data.orderStatus == '4') {
      this.setData({
        showAmountModal: {
          showModal: 'showModal',
          showMask: 'showMask',
        }
      })
    }
  },
  ffff:function(){
    var that = this;
    if(that.data.conts2>0){
      that.setData({
        conts:(5-that.data.conts2+1),
        conts2:(that.data.conts2-1)
      });
    } else if (that.data.conts2 <= 0) {
      that.setData({
        conts:(that.data.conts-1)
      })
    }
    if(that.data.conts<=0){
      that.setData({
        conts2:5,
        conts:0
      })
    }
    if (that.data.conts == 0) {
      that.setData({
        showView: true,
        showView2: true,
        showView3: true,
        showView4: true,
        showView5: true,
        contss: false,
        dd: '您对本次服务满意吗'
      });
    }
   else  if (that.data.conts == 1) {
      that.setData({
        showView: false,
        showView2: true,
        showView3: true,
        showView4: true,
        showView5: true,
        contss: true,
        dd: '111'
      });
    } else if (that.data.conts == 2) {
      that.setData({
        showView: false,
        showView2: false,
        showView3: true,
        showView4: true,
        showView5: true,
        contss: true,
        dd: '2222'
      });
    } else if (that.data.conts == 3) {
      that.setData({
        showView: false,
        showView2: false,
        showView3: false,
        showView4: true,
        showView5: true,
        contss: true,
        dd: '333'
      });
    } else if (that.data.conts == 4) {
      that.setData({
        showView: false,
        showView2: false,
        showView3: false,
        showView4: false,
        showView5: true,
        contss: true,
        dd: '444'
      });
    } else if (that.data.conts == 5) {
      that.setData({
        showView: false,
        showView2: false,
        showView3: false,
        showView4: false,
        showView5: false,
        contss: true,
        dd: '555'
      });
    }
  },

  // onChangeShowState: function () {
  //   var that = this;
  //   that.setData({
  //     showView: (!that.data.showView)
  //   });
  //   if (that.data.showView == false) {
  //     that.data.cont = that.data.cont + 1;
  //   } else if (that.data.showView == true) {
  //     that.data.cont = that.data.cont - 1;
  //   };
  //   that.data.conts = that.data.cont + that.data.cont2 + that.data.cont3 + that.data.cont4 + that.data.cont5;
  //   console.log(that.data.conts);
  //   if (that.data.conts == 0) {
  //     that.setData({
  //       dd: '您对本次服务满意吗',
  //       contss: false
  //     })
  //   } else if (that.data.conts == 1) {
  //     that.setData({
  //       dd: '111',
  //       contss: true
  //     })
  //   } else if (that.data.conts == 2) {
  //     that.setData({
  //       dd: '222',
  //       contss: true
  //     })
  //   } else if (that.data.conts == 3) {
  //     that.setData({
  //       dd: '333',
  //       contss: true
  //     })
  //   } else if (that.data.conts == 4) {
  //     that.setData({
  //       dd: '444',
  //       contss: true
  //     })
  //   } else if (that.data.conts == 5) {
  //     that.setData({
  //       dd: '555',
  //       contss: true
  //     })
  //   }
  // },
  // onChangeShowState2: function () {
  //   var that = this;
  //   that.setData({
  //     showView2: (!that.data.showView2)
  //   });
  //   if (that.data.showView2 == false) {
  //     that.data.cont2 = that.data.cont2 + 1;
  //   } else if (that.data.showView2 == true) {
  //     that.data.cont2 = that.data.cont2 - 1;
  //   };
  //   that.data.conts = that.data.cont + that.data.cont2 + that.data.cont3 + that.data.cont4 + that.data.cont5;
  //   console.log(that.data.conts);
  //   if (that.data.conts == 0) {
  //     that.setData({
  //       dd: '您对本次服务满意吗',
  //       contss: false
  //     })
  //   } else if (that.data.conts == 1) {
  //     that.setData({
  //       dd: '111',
  //       contss: true
  //     })
  //   } else if (that.data.conts == 2) {
  //     that.setData({
  //       dd: '222',
  //       contss: true
  //     })
  //   } else if (that.data.conts == 3) {
  //     that.setData({
  //       dd: '333',
  //       contss: true
  //     })
  //   } else if (that.data.conts == 4) {
  //     that.setData({
  //       dd: '444',
  //       contss: true
  //     })
  //   } else if (that.data.conts == 5) {
  //     that.setData({
  //       dd: '555',
  //       contss: true
  //     })
  //   }
  // },

  // onChangeShowState3: function () {
  //   var that = this;
  //   that.setData({
  //     showView3: (!that.data.showView3)
  //   });
  //   if (that.data.showView3 == false) {
  //     that.data.cont3 = that.data.cont3 + 1;
  //   } else if (that.data.showView3 == true) {
  //     that.data.cont3 = that.data.cont3 - 1;
  //   };
  //   that.data.conts = that.data.cont + that.data.cont2 + that.data.cont3 + that.data.cont4 + that.data.cont5;
  //   console.log(that.data.conts);
  //   if (that.data.conts == 0) {
  //     that.setData({
  //       dd: '您对本次服务满意吗',
  //       contss: false
  //     })
  //   } else if (that.data.conts == 1) {
  //     that.setData({
  //       dd: '111',
  //       contss: true
  //     })
  //   } else if (that.data.conts == 2) {
  //     that.setData({
  //       dd: '222',
  //       contss: true
  //     })
  //   } else if (that.data.conts == 3) {
  //     that.setData({
  //       dd: '333',
  //       contss: true
  //     })
  //   } else if (that.data.conts == 4) {
  //     that.setData({
  //       dd: '444',
  //       contss: true
  //     })
  //   } else if (that.data.conts == 5) {
  //     that.setData({
  //       dd: '555',
  //       contss: true
  //     })
  //   }
  // },

  // onChangeShowState4: function () {
  //   var that = this;
  //   that.setData({
  //     showView4: (!that.data.showView4)
  //   });
  //   if (that.data.showView4 == false) {
  //     that.data.cont4 = that.data.cont4 + 1;
  //   } else if (that.data.showView4 == true) {
  //     that.data.cont4 = that.data.cont4 - 1;
  //   };
  //   that.data.conts = that.data.cont + that.data.cont2 + that.data.cont3 + that.data.cont4 + that.data.cont5;
  //   console.log(that.data.conts);
  //   if (that.data.conts == 0) {
  //     that.setData({
  //       dd: '您对本次服务满意',
  //       contss: false
  //     })
  //   } else if (that.data.conts == 1) {
  //     that.setData({
  //       dd: '111',
  //       contss: true
  //     })
  //   } else if (that.data.conts == 2) {
  //     that.setData({
  //       dd: '222',
  //       contss: true
  //     })
  //   } else if (that.data.conts == 3) {
  //     that.setData({
  //       dd: '333',
  //       contss: true
  //     })
  //   } else if (that.data.conts == 4) {
  //     that.setData({
  //       dd: '444',
  //       contss: true
  //     })
  //   } else if (that.data.conts == 5) {
  //     that.setData({
  //       dd: '555',
  //       contss: true
  //     })
  //   }
  // },

  // onChangeShowState5: function () {
  //   var that = this;
  //   that.setData({
  //     showView5: (!that.data.showView5)
  //   });
  //   if (that.data.showView5 == false) {
  //     that.data.cont5 = that.data.cont5 + 1;
  //   } else if (that.data.showView5 == true) {
  //     that.data.cont5 = that.data.cont5 - 1;
  //   };
  //   that.data.conts = that.data.cont + that.data.cont2 + that.data.cont3 + that.data.cont4 + that.data.cont5;
  //   console.log(that.data.conts);
  //   if (that.data.conts == 0) {
  //     that.setData({
  //       dd: '您对本次服务满意吗',
  //       contss: false
  //     })
  //   } else if (that.data.conts == 1) {
  //     that.setData({
  //       dd: '111',
  //       contss: true
  //     })
  //   } else if (that.data.conts == 2) {
  //     that.setData({
  //       dd: '222',
  //       contss: true
  //     })
  //   } else if (that.data.conts == 3) {
  //     that.setData({
  //       dd: '333',
  //       contss: true
  //     })
  //   } else if (that.data.conts == 4) {
  //     that.setData({
  //       dd: '444',
  //       contss: true
  //     })
  //   } else if (that.data.conts == 5) {
  //     that.setData({
  //       dd: '555',
  //       contss: true
  //     })
  //   }
  // },


  // 评价

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    this.setData({
      orderno: options.orderno
    })
    common.getorderDetail(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    if (that.data.orderDetailTil1 == '等待支付') {
      orderDshow: true
      // orderDshowbt1:true,
      // orderDshowbt2:true

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