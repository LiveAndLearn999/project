define(function(){  
    'use strict'  
    var service = function($state,$ionicLoading,$http,$q,$ionicPopup){   
		var comm = this;
		this.showLoading = function() {
	    	$ionicLoading.show({
		        // content: 'Loading',
		        animation: 'fade-in',
		        showBackdrop: false,
		        showDelay: 0,
		        template: '<ion-spinner class="loading-img" icon="ios"></ion-spinner><p class="loading-text">正在加载...<p>'
		    });
	    };
	    this.hideLoading = function() {
	      	$ionicLoading.hide();
	    };
	    this.curState = function(){
	      	return $state.current.name.substring(0,$state.current.name.indexOf("."));
	    };
	    //获取N位随机整数
		this.getRndNum = function(n){
		    var rnd="";
		    for(var i=0;i<n;i++){
		        rnd += Math.floor(Math.random()*10);
		    }
		    return rnd;
		};
		this.getNowDate = function(){
			var d = new Date();
			return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
		};
		// 验证全数字
		this.yzNumber = function(tmp) {
			var reg = /^[0-9]+$/;
			if (!reg.test(tmp)) {
				return false;
			} else {
				return true;
			}
		};
		// 验证正数
		this.yzPositiveNumber = function(tmp) {
			var reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
			if (!reg.test(tmp)) {
				return false;
			} else {
				return true;
			}
		};
		// 验证全中文
		this.yzChina = function(tmp) {
		    var reg = /^[\u4e00-\u9fa5]+$/;
		    if (!reg.test(tmp)) {
		        return false;
		    } else {
		        return true;
		    }
		}
		//手机号模糊显示
		this.substringPhone = function(p){
			var p_s = "";
			if(p != null && p != "" && p.length >= 11){
				p_s = p.substring(0,3) + "****" + p.substring(7,11);
			}
			return p_s;
		};
		// 验证身份证
		this.yzIdCard = function(tmp) {
		    var reg = /^(\d{15}|\d{18}|\d{17}(\d|X|x)|([A-Z]{1,2}|\d)\d{6}\([A-Z0-9]\))$/; // 身份证
		    if (!reg.test(tmp)) {
		        return false;
		    } else {
		        return true;
		    }
		}
		// 验证手机号码
		this.yzPhone = function(tmp) {
		    var reg = /^1[9|8|7|6|5|4|3][0-9]\d{8}$/;
		    if (!reg.test(tmp)) {
		        return false;
		    } else {
		        return true;
		    }
		};
		// 验证固定电话
		this.yzTelPhone = function(tmp) {
		    var reg = /^\d{3}-\d{8}|\d{4}-\d{7}$/;
			var reg2 = /^\d{3}\d{8}|\d{4}-\d{7}$/;
		    if (!reg.test(tmp) && !reg2.test(tmp)) {
		        return false;
		    } else {
		        return true;
		    }
		}
		// 验证邮箱地址
		this.yzEmail = function(tmp) {
		    var reg =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; // 邮箱地址
		    if (!reg.test(tmp)) {
		        return false;
		    } else {
		        return true;
		    }
		};
		// 验证登录密码6-18位
		this.yzLogPass = function(tmp) {
		    var reg = /\b(^[a-zA-Z0-9]{6,18}$)\b/;
		    if (!reg.test(tmp)) {
		        return false;
		    } else {
		        return true;
		    }
		};
		// 字符串拆分，返回数组
		this.splitStr = function(str,zifu){
			var strs = new Array(); //定义一数组
			strs = str.split(zifu); //字符分割
			return strs;
		};
	    this.isNull = function(obj) {
	      	if(obj == null || obj == undefined  || obj == "" || typeof(obj) == "undefined" || typeof(obj) == "null"){
	          	return true;
	      	} else {
	          	return false;
	      	}
	    };
		this.get = function(url,isHide,func){
			var that = this;
			var d = $q.defer();
			var promise = d.promise;
			comm.hideLoading();
			if(typeof isHide=='undefined') {
				isHide=true;
			}
			if(isHide){
				comm.showLoading();
			}
			var fnc;
			promise.success = function (fn) {
				fnc = fn;
				return promise;
			}
			promise.error = function (fn) {
				promise.then(null, fn);
				return promise;
			}
			$http.get(url,{},{timeout:12000}).success(function (data){
				d.resolve(data);
				if(isHide) {
					comm.hideLoading();
				}
				if(func != null && func != undefined){
					fnc = func;
				}
				promise.then(fnc);
			}).error(function (error){
				d.reject(error);
				if(isHide) {
					comm.hideLoading();

					var alertPopup = $ionicPopup.alert({
						title: '提示',
						template: '<p style="text-align:center;">数据读取异常，请检查您的网络！</p>',
						buttons:[
							{text:'重新加载'}
						]
					});
					alertPopup.then(function(res) {
						alertPopup.close();
						if(func != null && func != undefined){
							fnc = func;
						}
						that.get(url,isHide,fnc);
					});
				}
			});
			return promise;
		};
	    this.post = function(url,data,isHide,func){
	      	var that = this;
	      	var d = $q.defer();
	      	var promise = d.promise;
	      	comm.hideLoading();
		    if(typeof isHide=='undefined') {
		    	isHide=true;
		    }
	      	if(isHide){
	          comm.showLoading();
	      	}
	      	var fnc;
	        promise.success = function (fn) {
	            fnc = fn;
	            return promise;
	        }
	        promise.error = function (fn) {
	            promise.then(null, fn);
	            return promise;
	        }
	      	$http.post(url,data,{timeout:12000}).success(function (data){
	            d.resolve(data);
	            if(isHide) {
	                comm.hideLoading();
	            }
	            if(func != null && func != undefined){
	                fnc = func;
	            }
	          	promise.then(fnc);
	        }).error(function (error){
	            d.reject(error);
	            if(isHide) {
	                comm.hideLoading();
	
	                alertPopup = $ionicPopup.alert({
	                  	title: '提示',
	                  	template: '<p style="text-align:center;">数据读取异常，请检查您的网络！</p>',
	                  	buttons:[
	                    	{text:'重新加载'}
	                  	]
	                });
	                alertPopup.then(function(res) {
	                    alertPopup.close();
	                    if(func != null && func != undefined){
	                        fnc = func;
	                    }
	                    that.post(url,data,isHide,fnc);
	                });
	            }
	        });
	        return promise;
	    };
	    this.postNew = function(url,data,isHide,func){
          	var that = this;
          	var d = $q.defer();
          	var promise = d.promise;
          	comm.hideLoading();
          	if(typeof isHide=='undefined') {
              	isHide=true;
          	}
          	if(isHide){
              	comm.showLoading();
          	}
          	var fnc;
          	promise.success = function (fn) {
              	fnc = fn;
              	// promise.then(fn);
              	return promise;
          	}
          	promise.error = function (fn) {
              	promise.then(null, fn);
              	return promise;
          	}
          	var postCfg = {
            	headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            	transformRequest: function (data) {
                	return JSON.stringify(data);
            	},
            	timeout:12000
          	};
          	$http.post(url,data,postCfg).success(function (data){
              	d.resolve(data);
              	if(isHide) {
                  	comm.hideLoading();
              	}
              	if(func != null && func != undefined){
                  	fnc = func;
              	}
              	promise.then(fnc);
          	}).error(function (error) {
                d.reject(error);
                if(isHide) {
                    comm.hideLoading();

                    alertPopup = $ionicPopup.alert({
                        title: '提示',
                        template: '<p style="text-align:center;">数据读取异常，请检查您的网络！</p>',
                        buttons:[
                            {text:'重新加载'}
                        ]
                    });
                    alertPopup.then(function(res) {
                        alertPopup.close();
                        if(func != null && func != undefined){
                            fnc = func;
                        }
                        that.postNew(url,data,isHide,fnc);
                    });
                }
            });
			return promise;
      	};
	    // 产品图片路径处理
	    this.getHttpOrlocalProPic = function(pic){
	    	if(pic != null && pic != ""){
		        if(pic.indexOf("http://") < 0 && pic.indexOf("https://") < 0){
		        	pic = domain3 + pic;
		        } else if(pic.indexOf("http://") > -1){
					pic = pic.replace(/http/, "https");
				}
		    } else{
				pic = "img/pro_pic_default.png";
			}
	      	return pic;
	    };
	    // 用户头像路径处理
	    this.getHttpOrlocalHeadPic = function(pic){
	      	if(pic != null && pic != ""){
		        if(pic.indexOf("http://") < 0 && pic.indexOf("https://") < 0){
		          	pic = domain3 + pic;
		        } else if(pic.indexOf("http://") > -1){
					pic = pic.replace(/http/, "https");
				}
	      	}else{
	        	pic = "img/head_pic_sys.jpg";
	      	}
	      	return pic;
	    };
	    // 截掉时间最后的.0
	    this.getTimeNo_0 = function(t){
			if(t != null && t != ""&& t.indexOf(".") > -1){
				t = t.substring(0,t.indexOf("."));
			}
			return t;
		}
	    // 删除左右两端的空格
	     this.trim = function(str) { 
    		return str.replace(/(^\s*)|(\s*$)/g, "");
		}
	    // 字符串截取、标题截取指定长度
		this.subStringTitle = function(tmp,num){
			if(tmp != null && tmp != ""){
				if(tmp.length > num){
					tmp = tmp.substring(0,num) + "...";
				}
			}
			return tmp;
		}
		this.yzChinaOrEnglish = function(tmp) {
		    var reg = /^[A-Za-z\u4e00-\u9fa5]+$/
		    if (!reg.test(tmp)) {
		        return false;
		    } else {
		        return true;
		    }
		}
		// 处理性别
		this.getSexStr= function(sex){
		  	var s = "保密";
		  	if(sex == 1){
		    	s = "男";
		  	} else if(sex == 2){
		    	s = "女";
		  	}
		  return s;
		}
		// 平台标志
		this.flagPlatform= function(sex){
		  	var flag = 2;
		  	if(isiOS){
		    	flag = 4;
		  	} else if(isAndroid){
		    	flag = 3;
		  	}
		  return flag;
		}
		// 判断会员等级
		this.getShowlevel = function(leval){
		  	if(leval == "1"){
		    	leval = "列兵";
		  	} else if(leval == "2"){
		    	leval = "上等兵";
		  	} else if(leval == "3"){
		    	leval = "士官";
		  	} else if(leval == "4"){
		    	leval = "尉官";
		  	} else if(leval == "5"){
		    	leval = "校官";
		  	} else if(leval == "6"){
		    	leval = "少将";
		  	} else if(leval == "7"){
		    	leval = "中将";
		  	} else if(leval == "8"){
		    	leval = "上将";
		  	}
		  	return leval;
		}
	    // 接收当前url参数
	    this.getQueryString = function(name) {
		    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		  	try{
		    	var uri = window.location.href;
		    	if(uri != null && uri != ''){
		      		var ary = uri.split('?');
		      		if(ary != null && ary.length == 2){
		        		var t=ary[1];
		        		if(t.indexOf("=") != -1){
		          			var params = t.split("&");
					        for(var i=0;i<params.length;i++) {
					            var curPar=params[i].split("=");
					            if(curPar[0]==name){
					              	return curPar[1];
					            }
					        }
					        return "";
		        		} else {
		          			return "";
		        		}
		      		} else {
		        		return "";
		      		}
		    	} else {
		      		return "";
		    	}
		  	} catch (e){
		    	return "";
		  	}
		};
		// 接收传入的str的参数
		this.getUrlString = function(str,name) {
		  	try {
		    	var uri=str;
		    	if(uri!=null && uri!=''){
		      		var ary=uri.split('?');
		      		if(ary!=null && ary.length==2) {
		        		var t=ary[1];
		        		if(t.indexOf("=")!=-1){
			          		var params= t.split("&");
			          		for(var i=0;i<params.length;i++) {
			            		var curPar=params[i].split("=");
			            		if(curPar[0]==name){
			              			return curPar[1];
			            		}
			          		}
			          		return "";
			        	} else {
		          			return "";
		        		}
		      		} else {
		        		return "";
		      		}
		    	} else {
		      		return "";
		    	}
		  	} catch (e){
		    	return "";
		  	}
		}
		// 获取服务器当前时间毫秒数
		this.getServerTimeMilliseconds = function(){
			var url = domain2 + "date/getServerTime.do";
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.open("post", url, false);
		    xmlHttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
		    xmlHttp.send();
		    if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
		        var jsonRet = JSON.parse(xmlHttp.responseText);
		        return jsonRet.milliseconds;
		    } else{
		    	return 0;
		    }
		}
		// 获取服务器跟本地的时间差
		this.getServerTimeMillisecondsJianNow = function(){
			var snTime = store.getExp("serverClientTimeCha");
			if(snTime == null || snTime == ""){
				var sTime = comm.getServerTimeMilliseconds();
				var publicParse = new Date();
				var nTime =  Date.UTC(publicParse.getFullYear(),publicParse.getMonth() ,publicParse.getDate(),publicParse.getHours(),publicParse.getMinutes(),publicParse.getSeconds())-3600000*8; //转换成毫秒数
				snTime = sTime-nTime;
				store.setExp('serverClientTimeCha', snTime, 60);
			}
			return parseInt(snTime);
		}
		this.updateServerTimeMillisecondsJianNow = function(){
			var snTime = store.getExp("serverClientTimeUpdate");
			if(snTime == null || snTime == ""){
				var sTime = comm.getServerTimeMilliseconds();
				var publicParse = new Date();
				var nTime =  Date.UTC(publicParse.getFullYear(),publicParse.getMonth() ,publicParse.getDate(),publicParse.getHours(),publicParse.getMinutes(),publicParse.getSeconds())-3600000*8; //转换成毫秒数
				snTime = sTime-nTime;
				store.setExp('serverClientTimeUpdate', snTime, 30);
			}
			return parseInt(snTime);
		}
	    // 新增推送相关用户登录string user 20160809
	    this.userLogin = function(str){
	      	try {
			    if(isiOS){
			      	document.documentElement.style.webkitTouchCallout = 'none';
			      	function setupWebViewJavascriptBridge(callback) {
			        	if(window.WebViewJavascriptBridge){
			          		return callback(WebViewJavascriptBridge);
			        	}
			        	if(window.WVJBCallbacks) {
			          		return window.WVJBCallbacks.push(callback);
			        	}
			        	window.WVJBCallbacks = [callback];
			        	var WVJBIframe = document.createElement('iframe');
			        	WVJBIframe.style.display = 'none';
			        	WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
			        	document.documentElement.appendChild(WVJBIframe);
			        	setTimeout(function() {
			            	document.documentElement.removeChild(WVJBIframe)
			          	},0);
			      	}
			      	setupWebViewJavascriptBridge(function(bridge) {
			        	WebViewJavascriptBridge.callHandler('userLoginBridge', {
			            	'phoneNumber': str
			          	},function(response) {});
			      	})
			    } else if(isAndroid){
			      	window.jsAndroid.userLogin(str);
			    }
			} catch(e){
			    alert(e.message);
			}
	    };
	    // 新增推送相关用户退出string user
	    this.userLogout = function(str) {
		  	try {
		    	if(isiOS){
		      		document.documentElement.style.webkitTouchCallout = 'none';
		      		function setupWebViewJavascriptBridge(callback) {
		        		if(window.WebViewJavascriptBridge) {
		          			return callback(WebViewJavascriptBridge);
		        		}
		        		if (window.WVJBCallbacks) {
		          			return window.WVJBCallbacks.push(callback);
		        		}
			        	window.WVJBCallbacks = [callback];
			        	var WVJBIframe = document.createElement('iframe');
			        	WVJBIframe.style.display = 'none';
			        	WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
			        	document.documentElement.appendChild(WVJBIframe);
			        	setTimeout(function() {
			            	document.documentElement.removeChild(WVJBIframe)
			          	},0)
			      	}
			      	setupWebViewJavascriptBridge(function(bridge) {
			        	WebViewJavascriptBridge.callHandler('userLoginout', {
			            	'phoneNumber': str
			          	},
			          	function(response) {});
			      	})
			    } else if(isAndroid){
			      	window.jsAndroid.userLogout(str);
			    }
			} catch(e){
			    alert(e.message);
			}
		}
	    // 跳转 外部浏览器
	    this.iosBrowerPay = function(url){
	    	if(isiOS){
		      	document.documentElement.style.webkitTouchCallout = 'none';
				function setupWebViewJavascriptBridge(callback) {
					if (window.WebViewJavascriptBridge) {
						return callback(WebViewJavascriptBridge);
					}
					if (window.WVJBCallbacks) {
						return window.WVJBCallbacks.push(callback);
					}
					window.WVJBCallbacks = [callback];
					var WVJBIframe = document.createElement('iframe');
					WVJBIframe.style.display = 'none';
					WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
					document.documentElement.appendChild(WVJBIframe);
					setTimeout(function() {
						document.documentElement.removeChild(WVJBIframe)
					},0);
				}
				setupWebViewJavascriptBridge(function(bridge) {
					WebViewJavascriptBridge.callHandler('testObjcCallbackSafari', {
						'url':url
					},
					function(response) {});
				});
			} else if(isAndroid){
			    window.jsAndroid.jumpToBrowser(url);
			} else {
				skip(url);
			}
	    };
		// 原生支付
		this.nativePay = function(sid,content){
			try {
				if(isiOS){
					document.documentElement.style.webkitTouchCallout = 'none';
					function setupWebViewJavascriptBridge(callback) {
						if (window.WebViewJavascriptBridge) {
							return callback(WebViewJavascriptBridge);
						}
						if (window.WVJBCallbacks) {
							return window.WVJBCallbacks.push(callback);
						}
						window.WVJBCallbacks = [callback];
						var WVJBIframe = document.createElement('iframe');
						WVJBIframe.style.display = 'none';
						WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
						document.documentElement.appendChild(WVJBIframe);
						setTimeout(function() {
							document.documentElement.removeChild(WVJBIframe)
						},0);
					}
					setupWebViewJavascriptBridge(function(bridge) {
						WebViewJavascriptBridge.callHandler('testObjcCallbackSafari', {
								'sid':sid,
								'content':content
							},
							function(response) {});
					});
				} else if(isAndroid){
					window.jsAndroid.nativePay(sid,content);
				}
			} catch(e){
				alert(e.message);
			}
		};
	    // app分享
	    this.WeixinAppShare = function(par,invitationCode) {
	    	var url = basePath + "getShareInfoNew.jsp";
		    $http.post(url,{t:"2,3,4,9"}).success(function (jsonObj) {
		    	var pic = jsonObj[0].content;
		    	var title = jsonObj[1].content;
		    	var content = '';
				var app_link = jsonObj[3].content;
		    	if(title.length > 50){
					title = title.substring(0,50) + "...";
				}
		    	if(!comm.isNull(invitationCode)){
		    		content += '我的邀请码是：';
		    		content += invitationCode;
		    		content += '。';
					app_link += '?invitationCode=';
					app_link += invitationCode;
		    	}
		    	content += jsonObj[2].content;
				if(isiOS){
					document.documentElement.style.webkitTouchCallout = 'none';
					function setupWebViewJavascriptBridge(callback) {
						if (window.WebViewJavascriptBridge) {
							return callback(WebViewJavascriptBridge);
						}
						if (window.WVJBCallbacks) {
							return window.WVJBCallbacks.push(callback);
						}
						window.WVJBCallbacks = [callback];
						var WVJBIframe = document.createElement('iframe');
						WVJBIframe.style.display = 'none';
						WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
						document.documentElement.appendChild(WVJBIframe);
						setTimeout(function() {
							document.documentElement.removeChild(WVJBIframe)
						},0);
					}
					setupWebViewJavascriptBridge(function(bridge) {
						WebViewJavascriptBridge.callHandler('share', {
							'share': par,
							'link':app_link,
							'title':title,
							'pic':pic,
							'content':content
						},
						function(response) {});
			
					});
				} else if(isAndroid){
					//转成json格式
					var JSONObj = {
						'title': title,
			      		'link': app_link,
						'pic': pic,
						'content': content
					};
			
					var JSONObjStr = JSON.stringify(JSONObj);
			    	window.jsAndroid.share(JSONObjStr,par);
				}
		    });
			
		}
	    // 晒单分享
		this.WeixinShare = function(par,title,content) {
			// var title = "真的就花了"+num+"块钱，快来膜拜一下！";
			$http.post(basePath + "getShareInfoNew.jsp",{t:"2,1"}).success(function (jsonObj) {
		    	var pic = jsonObj[1].content;
		    	var link_ = jsonObj[0].content;
		    	if(title.length > 50){
					title = title.substring(0,50) + "...";
				}
				if(isiOS){
					document.documentElement.style.webkitTouchCallout = 'none';
					function setupWebViewJavascriptBridge(callback) {
						if (window.WebViewJavascriptBridge) {
							return callback(WebViewJavascriptBridge);
						}
						if (window.WVJBCallbacks) {
							return window.WVJBCallbacks.push(callback);
						}
						window.WVJBCallbacks = [callback];
						var WVJBIframe = document.createElement('iframe');
						WVJBIframe.style.display = 'none';
						WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
						document.documentElement.appendChild(WVJBIframe);
						setTimeout(function() {
							document.documentElement.removeChild(WVJBIframe)
						},0)
					}
					setupWebViewJavascriptBridge(function(bridge) {
						WebViewJavascriptBridge.callHandler('share', {
							'share': par,
							'link':link_,
							'title':title,
							'pic':pic,
							'content':content
						},
						function(response) {});
					});
				} else if(isAndroid){
					//转成json格式
					var JSONObj = {
						'link': link_,
						'title': title,
						'pic': pic,
						'content': content
					};
			
					var JSONObjStr = JSON.stringify(JSONObj);
					window.jsAndroid.share(JSONObjStr,par);
				}
		   });
		}
	    // 购买获得的商品-微信/微博分享
	    this.goodsWeixinShare = function(par,dataObj) {
	    	dataObj = JSON.parse(dataObj);
			var title = "真的就花了"+dataObj.num+"块钱，快来膜拜一下！";
			var pic = dataObj.pic;
			var content = "就花了"+dataObj.num+"块钱，就中了 "+dataObj.pname;
			$http.post(basePath + "getShareInfoNew.jsp",{t:"1"}).success(function (jsonObj) {
		    	var link_ = jsonObj[0].content;
		    	if(title.length > 50){
					title = title.substring(0,50) + "...";
				}
				if(isiOS){
					document.documentElement.style.webkitTouchCallout = 'none';
					function setupWebViewJavascriptBridge(callback) {
						if (window.WebViewJavascriptBridge) {
							return callback(WebViewJavascriptBridge);
						}
						if (window.WVJBCallbacks) {
							return window.WVJBCallbacks.push(callback);
						}
						window.WVJBCallbacks = [callback];
						var WVJBIframe = document.createElement('iframe');
						WVJBIframe.style.display = 'none';
						WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
						document.documentElement.appendChild(WVJBIframe);
						setTimeout(function() {
							document.documentElement.removeChild(WVJBIframe)
						},0)
					}
					setupWebViewJavascriptBridge(function(bridge) {
						WebViewJavascriptBridge.callHandler('share', {
							'share': par,
							'link':link_,
							'title':title,
							'pic':pic,
							'content':content
						},
						function(response) {});
					});
				} else if(isAndroid){
					//转成json格式
					var JSONObj = {'link':link_,'title':title,'pic':pic,'content':content};
					var JSONObjStr = JSON.stringify(JSONObj);
					window.jsAndroid.share(JSONObjStr,par);
				}
		   });
		}
		// 活动获得的商品-微信/微博分享
		this.goodsActWeixinShare = function(par,dataObj) {
			dataObj = JSON.parse(dataObj);
			var title = "一元行幸运大转盘来袭";
			var pic = dataObj.pic;
			var content = "一元行幸运大转盘活动来袭，抽中了 "+dataObj.pname;
			$http.post(basePath + "getShareInfoNew.jsp",{t:"1"}).success(function (jsonObj) {
				var link_ = jsonObj[0].content;
				if(title.length > 50){
					title = title.substring(0,50) + "...";
				}
				if(isiOS){
					document.documentElement.style.webkitTouchCallout = 'none';
					function setupWebViewJavascriptBridge(callback) {
						if (window.WebViewJavascriptBridge) {
							return callback(WebViewJavascriptBridge);
						}
						if (window.WVJBCallbacks) {
							return window.WVJBCallbacks.push(callback);
						}
						window.WVJBCallbacks = [callback];
						var WVJBIframe = document.createElement('iframe');
						WVJBIframe.style.display = 'none';
						WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
						document.documentElement.appendChild(WVJBIframe);
						setTimeout(function() {
							document.documentElement.removeChild(WVJBIframe)
						},0)
					}
					setupWebViewJavascriptBridge(function(bridge) {
						WebViewJavascriptBridge.callHandler('share', {
								'share': par,
								'link':link_,
								'title':title,
								'pic':pic,
								'content':content
							},
							function(response) {});
					});
				} else if(isAndroid){
					//转成json格式
					var JSONObj = {'link':link_,'title':title,'pic':pic,'content':content};
					var JSONObjStr = JSON.stringify(JSONObj);
					window.jsAndroid.share(JSONObjStr,par);
				}
			});
		}
		// 红包大派送-微信/微博分享
		this.snatchShare = function(par,money,typesName,catalogueName) {
			var title = "一元行红包大派送来袭";
			var pic = 'https://resource.1yuanxing.com/images/vouchers/share_snatch.gif';
			var content = "哈哈，在一元行红包大派送中，我抽中了"+money+"元"+typesName+catalogueName;
            $http.post(basePath + "getShareInfoNew.jsp",{t:"1"}).success(function (jsonObj) {
                var link_ = jsonObj[0].content;
                if(isiOS){
                    document.documentElement.style.webkitTouchCallout = 'none';
                    function setupWebViewJavascriptBridge(callback) {
                        if (window.WebViewJavascriptBridge) {
                            return callback(WebViewJavascriptBridge);
                        }
                        if (window.WVJBCallbacks) {
                            return window.WVJBCallbacks.push(callback);
                        }
                        window.WVJBCallbacks = [callback];
                        var WVJBIframe = document.createElement('iframe');
                        WVJBIframe.style.display = 'none';
                        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
                        document.documentElement.appendChild(WVJBIframe);
                        setTimeout(function() {
                            document.documentElement.removeChild(WVJBIframe)
                        },0)
                    }
                    setupWebViewJavascriptBridge(function(bridge) {
                        WebViewJavascriptBridge.callHandler('share', {
                                'share': par,
                                'link':link_,
                                'title':title,
                                'pic':pic,
                                'content':content
                            },
                            function(response) {});
                    });
                } else if(isAndroid){
                    var JSONObj = {'link':link_,'title':title,'pic':pic,'content':content};
                    var JSONObjStr = JSON.stringify(JSONObj);
                    window.jsAndroid.share(JSONObjStr,par);
                }
            });

		}
		// 获取当前版本号
	    this.getAppVersion = function(){
		    try {
		     	if(isiOS){
		         	document.documentElement.style.webkitTouchCallout = 'none';
		         	function setupWebViewJavascriptBridge(callback) {
		             	if (window.WebViewJavascriptBridge) {
		                 	return callback(WebViewJavascriptBridge);
		             	}
		             	if (window.WVJBCallbacks) {
		                 	return window.WVJBCallbacks.push(callback);
		             	}
		             	window.WVJBCallbacks = [callback];
		             	var WVJBIframe = document.createElement('iframe');
		             	WVJBIframe.style.display = 'none';
		            	 WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
		             	document.documentElement.appendChild(WVJBIframe);
		             	setTimeout(function() {
		                	document.documentElement.removeChild(WVJBIframe)
		             	},0)
		         	}
		         	setupWebViewJavascriptBridge(function(bridge) {
		             	WebViewJavascriptBridge.callHandler('versionBridge', {
		                    'foo': 'bar'
		                },
		                function(response) {});
		
		         	})
		     	} else if(isAndroid){
		         	window.jsAndroid.getAppVersion();
		     	}
		    } catch (e){
                setAppVersion();
		    }
		}
	    // QQ一键登录
	    this.onelogQq = function(){
		  	try {
		    	if(isiOS){
		     		document.documentElement.style.webkitTouchCallout = 'none';
		      		function setupWebViewJavascriptBridge(callback) {
			        	if(window.WebViewJavascriptBridge) {
			          		return callback(WebViewJavascriptBridge);
			        	}
			        	if(window.WVJBCallbacks) {
			          		return window.WVJBCallbacks.push(callback);
			        	}
				        window.WVJBCallbacks = [callback];
				        var WVJBIframe = document.createElement('iframe');
				        WVJBIframe.style.display = 'none';
				        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
				        document.documentElement.appendChild(WVJBIframe);
				        setTimeout(function() {
				            document.documentElement.removeChild(WVJBIframe)
				        },0)
		      		}
		      		setupWebViewJavascriptBridge(function(bridge) {
			        	WebViewJavascriptBridge.callHandler('qqBridge', {
			            	'foo': 'bar'
			          	},
			          	function(response) {});
			      	})
		    	} else if(isAndroid){
		      		window.jsAndroid.qqLogin();
		    	}
		  	} catch(e){
		    	alert(e.message);
		  	}
		}
	    // 微信一键登录
		this.onelogWeixin = function(){
			if(isiOS){
		    	document.documentElement.style.webkitTouchCallout = 'none';
		    	function setupWebViewJavascriptBridge(callback) {
			        if (window.WebViewJavascriptBridge) {
			            return callback(WebViewJavascriptBridge);
			        }
			        if (window.WVJBCallbacks) {
			            return window.WVJBCallbacks.push(callback);
			        }
			        window.WVJBCallbacks = [callback];
			        var WVJBIframe = document.createElement('iframe');
			        WVJBIframe.style.display = 'none';
			        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
			        document.documentElement.appendChild(WVJBIframe);
			        setTimeout(function() {
			            document.documentElement.removeChild(WVJBIframe)
			        },0)
			    }
			    setupWebViewJavascriptBridge(function(bridge) {
			        WebViewJavascriptBridge.callHandler('weixinBridge', {
			            'foo': 'bar'
			        },
			        function(response) {});
			
			    })
			} else if(isAndroid){
				window.jsAndroid.wxLogin();
			}
		}
		
    };  
  
    service.$inject = ['$state','$ionicLoading','$http','$q','$ionicPopup'];  
  
    return service;  
});