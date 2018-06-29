define(function () {  
    'use strict';  
    function ctrl($scope,$ionicHistory,$mainServices,$factoryServices,$timeout,$ionicPopup,$controller,$state,$ionicScrollDelegate) {
    	$scope.hpFlag =  $factoryServices.hideOrShowAppContent(); //判断第一次请求是否成功 1成功
    	$scope.type_tx;//提现 0代表可以提现 1代表不可提现
    	$scope.headpic = 'img/head_pic_sys.jpg'; // 头像默认图片
    	$scope.nickname = 'Hello！请先登录'; // 默认昵称
    	$scope.experience = '登录/注册'; // 默认经验值
    	$scope.jumpurl = '#/mine/myInfo'; // 默认跳转地址
    	$scope.integral = 0; //默认可用积分
    	$scope.balance = 0; //默认可用余额
    	$scope.app_ewm = ""; // 判断是否获得二维码图片路径
    	var base = $controller('baseController', { $scope: $scope });

    	$scope.skip = function(url){
    		skip(url);
    	}
    	$scope.init = function(isHide){
	        // 查询会员基本信息
	        var u = localStorage.getItem("uid_local");
	        if (u != null && u != "" && typeof(u) != "undefined") {
	            var url = basePath + "getUser.jsp";
	            var dataJson = {'u': u, 't': 4};
	            // 异步加载数据。。。。。。。
	            $mainServices.post(url, dataJson, isHide).success(function (JSON_list) {
	                if (JSON_list.length > 0) {
	                    $scope.type_tx = JSON_list[0].type_tx; //提现 0代表可以提现 1代表不可提现
	                    $scope.headpic = $mainServices.getHttpOrlocalHeadPic(JSON_list[0].headpic);
	                    $scope.nickname = '<p style="margin-top:8px">'+JSON_list[0].nickname+'</p>';
	                    $scope.experience = '';
	                    $scope.integral = JSON_list[0].integral;
    					$scope.balance = JSON_list[0].balance;
	                    $scope.jumpurl = '#/mine/myInfo';
	                }
	            });
	        } else {
	            $scope.nickname = 'Hello！请先登录';
				$scope.experience = '登录/注册';
	            $scope.integral = 0;
    			$scope.balance = 0;
				$scope.jumpurl = '#/' + $scope.host + '/log';
				$scope.headpic = 'img/head_pic_sys.jpg';
	            localStorage.setItem("backUrlLogin", "#/" + $scope.host + "/myIndex");
	        }
	    }
    	
    	// 初始化首次加载
    	$scope.init(true);
    	// 获取app下载二维码
	    $mainServices.post(basePath + "getShareInfo.jsp", {t: 5}, false).success(function (json_link){
	        $scope.app_ewm = json_link[0].content;
	    });
	    
	    $scope.jumpNext = function () {
	        skip($scope.jumpurl);
	    };
	    // 设置
	    $scope.mySeting = function () {
	        $state.go("mine.mySeting", {});
	    };
	    // 分享
	    $scope.share = function () {
	    	$scope.invitationCode = localStorage.getItem("invitationCode");

	    		var u = localStorage.getItem("uid_local");
		        if (u != null && u != "" && typeof(u) != "undefined") {
		        	var url = basePath + "getUserYqm.jsp";
		            var dataJson = {'u': u};
		            // 异步加载数据。。。。。。。
		            $mainServices.post(url, dataJson, false).success(function (JSON_list) {
		            	$scope.invitationCode = JSON_list.yqm;
				    	if($mainServices.isNull($scope.invitationCode)){
				    		$scope.invitationCodeShow = false;
				    	} else {
				    		$scope.invitationCodeShow = true;
				    		localStorage.setItem("invitationCode",$scope.invitationCode);
				    	}
		            });
		        } else {
		        	$scope.invitationCodeShow = false;
		        }

	    	
	        var myPopup = $ionicPopup.show({
	            templateUrl: 'templates/mine/shareTemplate.html',
	            title: '扫码下载一元行官方app',
	            scope: $scope,
	            buttons: [
	                { text: '关闭' }
	            ]
	        });
	        myPopup.then(function (res) {
	            //console.log('Tapped!', res);
	        });
	
	        $scope.WeixinAppShare=function(type){
	          	$mainServices.WeixinAppShare(type,$scope.invitationCode);
	          	$timeout(function(){
	            	myPopup.close();
	          	},1000);
	        }
	    };
		// 积分明细
		$scope.integralDetails = function () {
			$factoryServices.checkLogin("#/mine/myIndex", "#/mine/log", "#/mine/integralDetails");
		};
	    // 账户明细
	    $scope.accountDetail = function () {
	        $factoryServices.checkLogin("#/mine/myIndex", "#/mine/log", "#/mine/accountDetail");
	    };
	    // 佣金管理
	    $scope.commission = function () {
	        $factoryServices.checkLogin("#/mine/myIndex", "#/mine/log", "#/mine/commission")
	    };
	    // 去充值
	    $scope.recharge = function () {
	        $factoryServices.checkLogin("#/mine/myIndex", "#/mine/log", "#/mine/recharge")
	    };
	    // 去提现
	    $scope.cash = function () {
	    	if ($scope.type_tx == 1){
	    		alert('您当前不能提现');
	    	} else {
	    		$factoryServices.checkLogin("#/mine/myIndex", "#/mine/log", "#/mine/cash")
	    	}
	    };
	    // 获得的商品/我的一元行记录
	    $scope.buyRecord = function () {
			localStorage.setItem("buyRecordType",1);
	        $factoryServices.checkLogin("#/mine/myIndex", "#/mine/log", "#/mine/buyRecord")
	    };
		$scope.winGoods = function (val) {
			$factoryServices.checkLogin("#/mine/myIndex", "#/mine/log", "#/mine/winGoods/" + val)
		};
	    // 我的晒单
	    $scope.myindexorderdetail_share = function () {
			localStorage.setItem("shareListType",1);
	        $factoryServices.checkLogin("#/mine/myIndex", "#/mine/log", "#/mine/shareList")
	    };
		// 我的红包
		$scope.myGift = function () {
			$factoryServices.checkLogin("#/mine/myIndex", "#/mine/log", "#/mine/gift")
		};
		// 收货地址管理
	    $scope.userAddress = function () {
			$factoryServices.checkLogin("#/mine/myIndex", "#/mine/log", "#/mine/userAddress/0")
	    };
		// 签到送积分
		$scope.sendIntegral= function () {
			$factoryServices.checkLogin("#/mine/myIndex", "#/mine/log", "#/mine/integral");
		};
		// 在线客服
		$scope.customerService = function () {
			$state.go("mine.customerService", {});
		};
		// 公告列表
		$scope.noticeList = function () {
			$state.go("mine.noticeList", {});
		};
		// 不到账补单
		$scope.supple = function () {
			$factoryServices.checkLogin("#/mine/myIndex", "#/mine/log", "#/mine/supple");
		};
		$scope.tabPoint(); // 打红点
	    var isFirst = 1; // 标志位 暂时用来防止重复执行$ionicView.beforeEnter事件
	    $scope.$on('$stateChangeSuccess',function(){
	        if(isFirst == 1){
	            isFirst = 2;
	            $scope.$on("$ionicView.beforeEnter", function () {
	               $scope.init(false);
	               $scope.getShareSx(false); // 分享二维码
	               if($scope.hpFlag == 0){
	                   $scope.hpFlag =  $factoryServices.hideOrShowAppContent();
	               }
					$scope.tabPoint(); // 打红点
					localStorage.removeItem("winGoodsType");
					base = $controller('baseController', { $scope: $scope });
	            });
	        }
	
	    });
	    
	    // 获取app下载二维码
	    $scope.getShareSx = function(isHide){
	        if($scope.app_ewm == ""){
	            var url = basePath + "getShareInfo.jsp";
	            var dataJson = {t: 5};
	            $mainServices.post(url,dataJson,isHide).success(function(JSON_list){
	                $scope.app_ewm = JSON_list[0].content;
	            });
	        }
	    }
    }
  
    ctrl.$inject = ['$scope', '$ionicHistory','$mainServices','$factoryServices','$timeout','$ionicPopup','$controller','$state','$ionicScrollDelegate'];
    return ctrl;  
    
}); 