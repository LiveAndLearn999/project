//提供接口
var Data = require("data.js");
var util = require('md5.js')
module.exports = {
  userLogin: userLogin,//用户登录
  uploadUserInfo: uploadUserInfo,//上传用户信息
  getUserInfo: getUserInfo,//获取用户详细信息
  getBanner: getBanner,//营销位广告
  getNearHotels: getNearHotels,//附近酒店
  getHotelInfo: getHotelInfo,//酒店详情
  getSubject: getSubject,//酒店主题列表
  getSubjectRoom: getSubjectRoom,//酒店主题时间段
  getTypePics: getTypePics,//酒店分类列表
  getTypeDetailPics: getTypeDetailPics,//酒店分类详情图片列表
  getSubjectDetailPics: getSubjectDetailPics,//酒店主题详情图片列表
  getGuofen: getGuofen,//果粉列表
  preOrder: preOrder,//预定
  location2Address: location2Address,//坐标转地址
  subscriberDeposit: subscriberDeposit,//获取押金状态
  getOrderList: getOrderList,//获取订单信息
  submitOrder: submitOrder,//提交订单
  getRechargeList: getRechargeList,//获取充值列表
  recharge: recharge,//充值
  getorderDetail: getorderDetail,//获取订单详情
  compOrder: compOrder,//完成入住
  getcode: getcode,//获取绑定手机验证码
  updateSubscriberMobile: updateSubscriberMobile,//获取绑定手机验证码
  reSubmitOrder: reSubmitOrder,//订单详情点击立即支付
  subscriberRefundDeposit: subscriberRefundDeposit,//押金退回接口
  rechargeOrderPay: rechargeOrderPay,//充值并订购
}
// var base = 'http://120.26.217.12:8080/hotel/'
var base = 'https://mita69.com/hotel/'
var openid = wx.getStorageSync('openid')
var userinfo = wx.getStorageSync('userinfo')
function userLogin(code, th) {
  var params = {
    code: code, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcx/login',
    data: params,
    success: function (res) {
      if (res.data.status == '0000') {
        wx.setStorageSync('userinfo', res.data.data)
        wx.setStorageSync('openid', res.data.data.openId)
        openid = res.data.data.openId
        userinfo = res.data.data
        getBanner(th)
        getNearHotels(th)
      }
      else
        console.log(res.data.msg)
    }
  })
}

function uploadUserInfo(th, res) {

  var params = {
    encryptedData: res.encryptedData, iv: res.iv, openId: openid, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcx/updateSubscriber',
    data: params,
    success: function (res) {
      console.log(res)
      if (res.data.status == '0000') {
        wx.setStorageSync('userinfo', res.data.data)
        userinfo = res.data.data
        th.setData({
          userinfo: userinfo
        })
      }
      else
        console.log(res.data.msg)
    }
  })
}

function getUserInfo(th) {
  var params = {
    openId: openid, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcx/subscriber',
    data: params,
    success: function (res) {
      if (res.data.status == '0000') {
        wx.setStorageSync('userinfo', res.data.data)
        userinfo = res.data.data
        if (userinfo.mobile != '')
          userinfo.mobile = userinfo.mobile.substr(0, 3) + '****' + userinfo.mobile.substr(7)
        th.setData({
          userinfo: userinfo,
        })
      }
      else
        console.log(res.data.msg)
    }
  })

}

function getBanner(th) {
  var params = {
    openId: openid, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcxHotel/activityList',
    data: params,
    success: function (res) {
      if (res.data.status == '0000') {
        th.setData({
          banners: res.data.data
        })
      }
      else
        console.log(res.data.msg)
    }
  })
}

function getNearHotels(th) {
  var params = {
    openId: openid, pageNo: th.data.page, pageSize: 10, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcxHotel/hotelList',
    data: params,
    success: function (res) {
      // console.log(res)

      if (res.data.status == '0000') {
        if (res.data.data.length == 0)
          th.setData({
            hasMore: false
          })
        th.setData({
          nearHotels: th.data.nearHotels.concat(res.data.data)
        })
      }
      else
        console.log(res.data.msg)
    }
  })
}
function getHotelInfo(th, hotelNo) {
  var params = {
    hotelNo: hotelNo, openId: openid, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcxHotel/hotel',
    data: params,
    success: function (res) {
      // console.log(res)
      if (res.data.status == '0000') {
        th.setData({
          hotelinfo: res.data.data
        })
      }
      else
        console.log(res.data.msg)
    }
  })
}
function getSubject(th) {
  var hour = th.data.array[th.data.index]
  var params = {
    date: th.data.date.replace(new RegExp("-", "gm"), ""), hotelNo: th.data.hotelNo, hour: hour.split(":")[0], openId: openid, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcxHotel/subjectList',
    data: params,
    success: function (res) {
      console.log(res)
      if (res.data.status == '0000') {
        th.setData({
          subjectinfo: res.data.data
        })
      }
      else
        console.log(res.data.msg)
    }
  })
}

function getSubjectRoom(th, subjectid, index) {
  var hour = th.data.array[th.data.index]
  var params = {
    date: th.data.date.replace(new RegExp("-", "gm"), ""), hotelNo: th.data.hotelinfo.hotelNo, hour: hour.split(":")[0], openId: openid, subjectId: subjectid, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcxHotel/subjectRoomList',
    data: params,
    success: function (res) {
      // console.log(res)
      if (res.data.status == '0000') {
        th.setData({
          subjecttimes: res.data.data,
          opensubjectid: index
        })
      }
      else
        console.log(res.data.msg)
      wx.hideLoading()
    }
  })
}
function getTypePics(th, hotelNo) {
  wx.showLoading({
    title: '加载中...',
  })
  var params = {
    hotelNo: hotelNo, openId: openid, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcxHotel/hotelType',
    data: params,
    success: function (res) {
      // console.log(res)
      if (res.data.status == '0000') {
        console.log(res.data.data)
        th.setData({
          pictures: res.data.data
        })
      }
      else
        console.log(res.data.msg)
      wx.hideLoading()
    }
  })
}
function getTypeDetailPics(th, picType) {
  wx.showLoading({
    title: '加载中...',
  })
  var params = {
    hotelNo: th.data.hotelNo, openId: openid, picType: picType, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcxHotel/hotelTypePic',
    data: params,
    success: function (res) {
      // console.log(res)
      var urls = []
      if (res.data.status == '0000') {
        for (var key in res.data.data) {
          urls[key] = res.data.data[key].picUrl
        }
        wx.previewImage({
          urls: urls,
        })
      }
      else
        console.log(res.data.msg)
      wx.hideLoading()
    }
  })
}

function getSubjectDetailPics(th, subjectId) {
  wx.showLoading({
    title: '加载中...',
  })
  var params = {
    hotelNo: th.data.hotelNo, openId: openid, subjectId: subjectId, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcxHotel/hotelSubjectPic',
    data: params,
    success: function (res) {
      // console.log(res)
      var urls = []
      if (res.data.status == '0000') {
        for (var key in res.data.data) {
          urls[key] = res.data.data[key].picUrl
        }
        wx.previewImage({
          urls: urls,
        })
      }
      else
        console.log(res.data.msg)
      wx.hideLoading()
    }
  })
}
function getGuofen(th) {
  wx.showLoading({
    title: '加载中...',
  })
  var params = {
    openId: openid, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcx/subContactsList',
    data: params,
    success: function (res) {
      if (res.data.status == '0000') {
        th.setData({
          guofen: res.data.data
        })
      }
      else
        console.log(res.data.msg)
      wx.hideLoading()
    }
  })
}
function preOrder(th) {
  wx.showLoading({
    title: '加载中...',
  })
  var params = {
    date: th.data.date, endTime: th.data.endTime, hotelNo: th.data.hotelNo, openId: openid, startTime: th.data.startTime, subjectId: th.data.subjectId, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcxOrder/subjectRoomOrder',
    data: params,
    success: function (res) {
      if (res.data.status == '0000') {
        th.setData({
          preorderinfo: res.data.data
        })
      }
      else
        console.log(res.data.msg)
      wx.hideLoading()
    }
  })
}
function location2Address(th, latitude, longitude) {
  var params = {
    latitude: latitude, longitude: longitude, openId: openid, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcx/subAddress',
    data: params,
    success: function (res) {
      if (res.data.status == '0000') {
        th.setData({
          localtion: res.data.data.substr(0, 10) + '...'
        })
      }
      else
        console.log(res.data.msg)
    }
  })
}
function subscriberDeposit(th) {
  var params = {
    openId: openid, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcxOrder/subscriberDeposit',
    data: params,
    success: function (res) {
      console.log(res)
      if (res.data.status == '0000') {
        th.setData({
          res: res.data.data
        })
      }
      else
        console.log(res.data.msg)
    }
  })
}
function getOrderList(th) {
  var params = {
    openId: openid, orderStatus: th.data.currentType, pageNo: th.data.page, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcxOrder/subaOrderList',
    data: params,
    success: function (res) {
      if (res.data.status == '0000') {
        if (th.data.status != th.data.currentType) {
          th.setData({
            res: res.data.data,
            status: th.data.currentType
          })
        } else if (th.data.status == th.data.currentType) {
          th.setData({
            res: th.data.res.concat(res.data.data)
          })
        }
        if (res.data.data.length < 5) {
          th.setData({
            hasMore: false
          })
        }
      }
      else
        console.log(res.data.msg)
    }
  })
}
function submitOrder(th) {
  wx.showLoading({
    title: '加载中',
  })
  setTimeout(function () {
    wx.hideLoading()
  }, 5000)
  var params = {
    cardNo1: th.data.cardno1, cardNo2: th.data.cardno2, mobile: th.data.mobile,
    openId: openid, person1: th.data.person1, person2: th.data.person2, subOrderNo: th.data.preorderinfo.subOrderNo, t: new Date().getTime()
  };

  params.sign = encript(params)
  wx.request({
    url: base + 'xcxOrder/subjectRoomOrderCommit',
    data: params,
    success: function (res) {
      console.log(res)
      wx.hideLoading()
      if (res.data.status == '0000') {
        if (res.data.data.payStatus == '0') {
          wx.setStorageSync('needrefresh', true)
          wx.redirectTo({
            url: '../payMoy/payMoy?orderno=' + th.data.preorderinfo.subOrderNo + '&depositAmount=' + res.data.data.depositAmount + '&payPrice=' + res.data.data.payPrice
          })
         
         
        } else if (res.data.data.payStatus == '1') {
          wx.setStorageSync('needrefresh', true)
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          })
          wx.redirectTo({
            url: '../orderDetail/orderDetail?orderno=' + th.data.preorderinfo.subOrderNo
          })
        }
      } else if (res.data.status == '0014') {
        th.setData({
          showAmountModal1: {
            showModal: 'showModal',
            showMask: 'showMask',
          }
        })

      } else if (res.data.status == '0021') {
        wx.showToast({
          title: '暂时没有房间',
          icon: 'none',
          duration: 2000
        })
      } else {
        console.log(res.data.msg)
      }
    }
  })
}
function reSubmitOrder(th) {
  wx.showLoading({
    title: '加载中',
  })
  setTimeout(function () {
    wx.hideLoading()
  }, 5000)
  var subOrderNo
  if (th.data.data==null){
    subOrderNo=th.data.orderno
  }else{
    subOrderNo = th.data.data.subOrderNo
  }
  console.log(subOrderNo)
  var params = {
    openId: openid, subOrderNo: subOrderNo, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcxOrder/subjectRoomOrderPay',
    data: params,
    success: function (res) {
      wx.hideLoading()
      if (res.data.status == '0000') {
        wx.setStorageSync('needrefresh', true)
        if (res.data.data.payStatus == '0') {
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: res.data.data.signType,
            paySign: res.data.data.paySign,
            total_fee: res.data.data.payPrice,
            success: function (res) {

              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000
              })
              wx.redirectTo({
                url: '../orderDetail/orderDetail?orderno=' + th.data.data.subOrderNo
              })
            },
            fail: function (res) {
              wx.showToast({
                title: '支付失败',
                icon: 'error',
                duration: 2000
              })
            }
          })
        } else if (res.data.data.payStatus == '1') {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          })
          wx.redirectTo({
            url: '../orderDetail/orderDetail?orderno=' + th.data.data.subOrderNo
          })
        }
      }
      else
        console.log(res.data.msg)
    }
  })
}
function getRechargeList(th) {
  var params = {
    openId: openid, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcxOrder/couRechargeList',
    data: params,
    success: function (res) {
      if (res.data.status == '0000') {
        th.setData({
          res: res.data.data
        })
        th.setMoney()
      }
      else
        console.log(res.data.msg)
    }
  })
}
function recharge(th) {
  wx.showLoading({
    title: '加载中...',
  })
  var params = {
    openId: openid, rechargeId: th.data.res[th.data.selectid].id, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcxOrder/subscriberRecharge',
    data: params,
    success: function (res) {
      console.log(res)
      if (res.data.status == '0000') {
        if (res.data.data.payStatus == '0') {
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: res.data.data.signType,
            paySign: res.data.data.paySign,
            total_fee: res.data.data.payPrice,
            success: function (res) {
              wx.showToast({
                title: '充值成功',
                icon: 'success',
                duration: 2000
              })
            },
            fail: function (res) {
              wx.showToast({
                title: '充值失败',
                icon: 'error',
                duration: 2000
              })
            }
          })
        }
      }
      else
        console.log(res.data.msg)
      wx.hideLoading()
    }
  })
}
function getorderDetail(th) {
  wx.showLoading({
    title: '加载中...',
  })
  var params = {
    openId: openid, subOrderNo: th.data.orderno, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcxOrder/subaOrder',
    data: params,
    success: function (res) {
      if (res.data.status == '0000') {
        var notdate = new Date().getTime()
        var date = new Date(res.data.data.startDate + ' ' + res.data.data.startTime).getTime()
        var d = new Date(res.data.data.submitTime);
        // 移动端时间显示aN  4.8
        var d2 = res.data.data.submitTime;
        var str = d2.replace(/-/g, '/');
        var date2 = new Date(str);
        date2.setMinutes(date2.getMinutes() + 5);


        // 移动端时间显示aN结束
        d.setMinutes(d.getMinutes() + 5);
        th.setData({
          data: res.data.data,
          roomshow: date - notdate > 0 && date - notdate < 30 * 60 * 1000 ? true : false,
          orderDetailTilcit1: '酒店确认有房，将为您保留5分钟，请在' + Data.formatDate(date2, "MM月dd日HH:mm") + '前完成支付。如超时支付订单将自动取消。',
        })
      }
      else
        console.log(res.data.msg)
      wx.hideLoading()
    }
  })
}
function compOrder(th) {
  wx.showLoading({
    title: '加载中...',
  })
  var params = {
    openId: openid, subOrderNo: th.data.orderno, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcxOrder/subaOrderFinish',
    data: params,
    success: function (res) {
      wx.hideLoading()
      if (res.data.status == '0000') {
        wx.setStorageSync('needrefresh', true)
        wx.showToast({
          title: '入住完成',
          icon: 'success',
          duration: 2000
        })
        wx.redirectTo({
          url: '../orderDetail/orderDetail?orderno=' + th.data.orderno
        })
      }
      else
        console.log(res.data.msg)

    }
  })
}
function getcode(th) {
  wx.showLoading({
    title: '加载中...',
  })
  var params = {
    mobile: th.data.phonenumber, openId: openid, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcx/sendVerifyMessageForSubscriberMobile',
    data: params,
    success: function (res) {
      wx.hideLoading()
      if (res.data.status == '0000') {
        var t = 60;
        th.setData({
          btncodeclass: 'unable'
        })
        var i = setInterval(function () {
          if (t < 1) {
            th.setData({
              btncodename: '重新获取',
              btncodeclass: ''
            })
            clearInterval(i)
            return
          }
          th.setData({
            btncodename: '重新获取(' + t + ')'
          })
          t = t - 1
        }, 1000)
      }
      else
        console.log(res.data.msg)

    }
  })
}
function updateSubscriberMobile(th) {
  var params = {
    mobile: th.data.phonenumber, openId: openid, t: new Date().getTime(), vcode: th.data.code
  };
  params.sign = encript(params)
  wx.request({
    url: base + 'xcx/updateSubscriberMobile',
    data: params,
    success: function (res) {
      console.log(res)
      if (res.data.status == '0000') {
        th.setData({
          showAmountModal1: {
            showModal: 'hideModal',
            showMask: 'hideMask',
          }
        })
        wx.showToast({
          title: '绑定成功',
          icon: 'success',
          duration: 2000,
          success: function (res) {
            submitOrder(th)
          }
        })
        th.onShow()

      }
      else
        wx.showToast({
          title: '您输入的验证码有误',
          icon: 'error',
          duration: 2000
        })

    }
  })
}
function subscriberRefundDeposit(th) {
  var params = {
    openId: openid, t: new Date().getTime(), vcode: th.data.code
  };
  params.sign = encript(params)
  wx.showLoading({
    title: '加载中...',
  })
  wx.request({
    url: base + 'xcxOrder/subscriberRefundDeposit',
    data: params,
    success: function (res) {
      wx.hideLoading()
      if (res.data.status == '0000') {
        wx.redirectTo({
          url: '../Refunds/Refunds',
        })
      } else if (res.data.status == '0024') {
        wx.showToast({
          title: res.data.msg,
          icon: 'error',
          duration: 2000,
        })
      }
    }
  })
}
function rechargeOrderPay(th) {
  var params = {
    openId: openid, rechargeId: th.data.res[th.data.selectid].id, subOrderNo:th.data.orderno, t: new Date().getTime()
  };
  params.sign = encript(params)
  wx.showLoading({
    title: '加载中...',
  })
  wx.request({
    url: base + 'xcxOrder/rechargeOrderPay',
    data: params,
    success: function (res) {
      wx.hideLoading()
      console.log(res)
      if (res.data.status == '0000') {
         wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: res.data.data.signType,
            paySign: res.data.data.paySign,
            total_fee: res.data.data.payPrice,
            success: function (res) {

              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000
              })
              wx.redirectTo({
                url: '../orderDetail/orderDetail?orderno=' + th.data.preorderinfo.subOrderNo
              })
            },
            fail: function (res) {
              wx.showToast({
                title: '支付失败',
                icon: 'error',
                duration: 2000
              })
                // wx.switchTab({
                //   url: '../myOrder/myOrder'
                // })
            }
          })
      } else if (res.data.status == '0024') {
        wx.showToast({
          title: res.data.msg,
          icon: 'error',
          duration: 2000,
        })
      }
    }
  })
}
function encript(params) {
  var str = ''
  for (var key in params) {
    str += key + "=" + params[key] + "&&"
  }
  str = str.substr(0, str.length - 2)
  return util.hexMD5(str)
}