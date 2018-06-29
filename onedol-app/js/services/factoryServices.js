define(function(){  
    'use strict'  
    var service = function($http,$rootScope){  
        return {
            checkLogin: function(backUrl, logUrl, toUrl){
		        localStorage.removeItem("backUrlLogin");
		        var u = localStorage.getItem("uid_local");
		        if(u == null || u == "" || typeof(u) == "undefined"){
		          // 跳转登录
		          localStorage.setItem("backUrlLogin",backUrl); //存储登录后的跳转页面
		          skip(logUrl);
		        }else{
		          skip(toUrl);
		        }
	      	},
	      	firstCheckLogin: function(){
	            // 首次进入app验证账号有效性
	            var u = localStorage.getItem("uid_local");
				var clientTime = localStorage.getItem("clientTime");
	            if(u != null && u != "" && typeof(u) != "undefined"){
					var publicParse = new Date();
					var nowDate =  Date.UTC(publicParse.getFullYear(),publicParse.getMonth() ,publicParse.getDate(),publicParse.getHours(),publicParse.getMinutes(),publicParse.getSeconds())-3600000*8; //转换成毫秒数
					if(nowDate - parseInt(clientTime) > 24*3600*1000*15){
						localStorage.removeItem("uid_local");
						localStorage.removeItem("clientTime");
						return;
					}
					// 验证账号有效性
	                var url = basePath + "checkUser.jsp";
	                var dataJson = {'u':u};
	                $http.post(url,dataJson).success(function (subRetJson) {
	                    var code = subRetJson.code;
	                    if(code != 200){
	                        localStorage.removeItem("uid_local");
							localStorage.removeItem("clientTime");
	                    } else {
							localStorage.setItem("clientTime",nowDate);
	                        var dataJson = {'u': u};
	                        var url = basePath + "getCartNum.jsp";
	                        //异步加载数据。。。。。。。。
	                        $http.post(url,dataJson).success(function(num){
	                            var reg = /^[0-9]*$/;
	                            if (!reg.test(num)) {
	                                if(num == 0){
	                                    $rootScope.cartNumber = 0;
	                                } else {
	                                    $rootScope.cartNumber = num;
	                                }
	
	                            }
	
	                        });
	                    }
	                });
	            }
	        },
	        getCardNum: function() {
	            var u = localStorage.getItem("uid_local");
	            if(u != null && u != ''){
	                var dataJson = {'u': u};
	                var url = basePath + "getCartNum.jsp";
	                // 异步加载数据。。。。。。。。
	                $http.post(url, dataJson).success(function (num) {
	                    var reg = /^[0-9]*$/;
	                    if (!reg.test(num)) {
	                        if(num == 0){
	                            $rootScope.cartNumber = 0;
	                        } else {
	                            $rootScope.cartNumber = num;
	                        }
	                    }
	                });
	            }
	        },
	        hideOrShowAppContent:function(){
	            $rootScope.center = {};
	            $rootScope.mob = {shengming:false,classify:false,prJfBt:true,cardexplain:false,onelog:true,balancePaid:true,jifenPaid:true,repairBill:false};
	            if(isiOS){
	                // 异步加载数据。。。。。。。。
	                var url = basePath + "getUtil.jsp";
	                $http.post(url, {}).success(function (JSONObjRet) {
	                    var showShengming = JSONObjRet.showShengming; //IOS是否显示声明:1显示 2隐藏
	                    if(showShengming == "1"){
	                        $rootScope.mob.shengming = true;
	                    } else if(showShengming == "2"){
	                        $rootScope.mob.shengming = false;
	                    }
	
	                    var balancePaid = JSONObjRet.balancePaid; //IOS是否显示余额支付:1显示 2隐藏
	                    if(balancePaid == "1"){
	                    	$rootScope.mob.balancePaid = true; // 余额支付显示
	                    } else if(balancePaid == "2"){
	                    	$rootScope.mob.balancePaid = false; // 余额支付隐藏
	                    }
	
	                    var chongZhi = JSONObjRet.chongZhi; //IOS是否显示余额、充值、账户明细:1显示 2隐藏
	                    if(chongZhi == "1"){
							$rootScope.mob.prJfBt = true; // 我的充值、积分、提现按钮
							$rootScope.mob.cardexplain = true; // 我的账户明细
	                        $rootScope.mob.classify = true; // 首页充值分类一栏
	
	                    } else if(chongZhi == "2"){
							$rootScope.mob.prJfBt = false; // 我的充值、积分、提现按钮
							$rootScope.mob.cardexplain = false; // 我的账户明细
	                        $rootScope.mob.classify = false; // 首页充值分类一栏隐藏
						}
	
	                    var quickLogin = JSONObjRet.QuickLogin; //IOS是否显示三方登录:1显示 2隐藏
	                    if(quickLogin == "1"){
	                    	$rootScope.mob.onelog = true;
	                    }else if(quickLogin == "2"){
							$rootScope.mob.onelog = false;
	                    }
//	
	                    var showjifenpay = JSONObjRet.showjifenpay; //IOS是否显示积分支付1显示 2隐藏
	                    if(showjifenpay == "1"){
	                    	$rootScope.mob.jifenPaid = true;
	                    }else if(showjifenpay == "2"){
	                    	$rootScope.mob.jifenPaid = false;
	                    }
						var repairBill = JSONObjRet.repairBill; //IOS是否显示补单1显示 2隐藏
						if(repairBill == "1"){
							$rootScope.mob.repairBill = true;
						}else if(repairBill == "2"){
							$rootScope.mob.repairBill = false;
						}
	                    return 1;
	                });
	            } else if(isAndroid){
	                var url = basePath + "getUtil.jsp";
	                $http.post(url, {}).success(function (JSONObjRet) {
	                    var showjifenpayAndroid = JSONObjRet.showjifenpayAndroid; //android是否显示积分支付1显示 2隐藏
	                    if (showjifenpayAndroid == "1") {
	                        $rootScope.mob.jifenPaid = true;
	                    } else if (showjifenpayAndroid == "2") {
	                        $rootScope.mob.jifenPaid = false;
	                    }
						var repairBill = JSONObjRet.repairBill;
						if(repairBill == "1"){
							$rootScope.mob.repairBill = true;
						}else if(repairBill == "2"){
							$rootScope.mob.repairBill = false;
						}
	                });
					
	                $rootScope.mob.prJfBt = true; // 我的充值、积分、提现按钮
					$rootScope.mob.cardexplain = true; // 我的账户明细
	                $rootScope.mob.classify = true;// 首页充值分类一栏
	                return 1;
	            }
	
	        },        
        }  
		
    };  
  
    service.$inject = ['$http','$rootScope'];  
  
    return service;  
});