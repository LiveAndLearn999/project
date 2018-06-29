define(function () {  
    'use strict';  
    function ctrl($scope,$ionicHistory,$mainServices,$location,$rootScope,$ionicTabsDelegate,$ionicScrollDelegate,$state,$ionicModal,$timeout,$ionicViewSwitcher) {
    	$scope.canLoadMore = {code:false,nowPageMore:0};
    	$scope.host = $mainServices.curState();
    	$scope.left = parseInt(window.screen.availWidth)*0.7;
	    $scope.top = parseInt(window.screen.availHeight)-30;
	    $scope.width = parseInt(window.screen.availWidth);
	    $scope.height = parseInt(window.screen.availHeight)-50;
		$scope.modalFlag = 1;

		$scope.goBack = function() {
			var url = $state.current.name;
            if($ionicHistory.backView() == null || url == $ionicHistory.backView().stateName){
                if(url.indexOf('index.') == 0){
                    skip('#/index/index');
                    $rootScope.hideTabs = '';
                    $ionicTabsDelegate.select(0);
                } else if (url.indexOf('product.') == 0){
                    skip('#/product/productlist');
                    $rootScope.hideTabs = '';
                    $ionicTabsDelegate.select(1);
                } else if (url.indexOf('activite.') == 0){
                    skip('#/activite/newPublishList');
                    $rootScope.hideTabs = '';
                    $ionicTabsDelegate.select(2);
                } else if (url.indexOf('cart.') == 0){
                    skip('#/cart/cart');
                    $rootScope.hideTabs = '';
                    $ionicTabsDelegate.select(3);
                } else if (url.indexOf('mine.') == 0){
                    skip('#/mine/myIndex');
                    $rootScope.hideTabs = '';
                    $ionicTabsDelegate.select(4);
                }
                $ionicViewSwitcher.nextDirection("back");
                $timeout(function () {
                    $ionicHistory.clearHistory();
                    $ionicHistory.clearCache();
                },10);
            } else {
				$ionicHistory.goBack();
			}
		}

	    // QQ登录
	    $scope.onelogQq = function() {
			localStorage.removeItem("openid");
			localStorage.removeItem("type");
        	$mainServices.onelogQq();
      	}
	    // 微信登录
	    $scope.onelogWeixin = function() {
			localStorage.removeItem("openid");
			localStorage.removeItem("type");
        	$mainServices.onelogWeixin();
      	}
	    
	    $scope.skip = function(url){
      		skip(url);
    	}
        window.androidGoBack = function() {
        	if($location.path() != '/index/index' && $location.path() != '/product/productlist' && $location.path() != '/activite/newPublishList' && $location.path() != '/cart/cart' && $location.path() != '/mine/myIndex' && $location.path() != '/index/payFinish' && $location.path() != '/cart/payFinish' && $location.path() != '/mine/payFinish' && $location.path() != '/product/payFinish' && $location.path() != '/activite/payFinish'){
                var url = $state.current.name;
                if($ionicHistory.backView() == null || url == $ionicHistory.backView().stateName){
                    if(url.indexOf('index.') == 0){
                        skip('#/index/index');
                    } else if (url.indexOf('product.') == 0){
                        skip('#/product/productlist');
                    } else if (url.indexOf('activite.') == 0){
                        skip('#/activite/newPublishList');
                    } else if (url.indexOf('cart.') == 0){
                        skip('#/cart/cart');
                    } else if (url.indexOf('mine.') == 0){
                        skip('#/mine/myIndex');
                    }
                    $ionicViewSwitcher.nextDirection("back");
                    $timeout(function () {
                        $ionicHistory.clearHistory();
                        $ionicHistory.clearCache();
                    },10);
                } else {
                    $ionicHistory.goBack();
                }
        	}
			if(alertPopup != ''){
				alertPopup.close();
			}
      	}

		window.closeInfoDialog = function () {
			$(".gDia").remove();
		}
		window.jumpWinGoods = function () {
			$(".gDia").remove();
			skip('#/'+$scope.host+'/winGoods/1');
		}
		$rootScope.updateVersion = function () {
			if(isiOS){
				$mainServices.iosBrowerPay("https://itunes.apple.com/cn/app/yi-yuan-xing/id1110690278?mt=8");
			}else{
				$mainServices.iosBrowerPay("https://resource.1yuanxing.com/1yx_h5/archive/1yuanxing.apk");
			}
		}

		$scope.tabPoint = function(){
			if($location.path() == '/index/index' || $location.path() == '/product/productlist' || $location.path() == '/activite/newPublishList' || $location.path() == '/cart/cart' || $location.path() == '/mine/myIndex'){
				var u = localStorage.getItem("uid_local");
				$rootScope.tabPoint = false;
				$rootScope.linkPoint = false;
				if (u != null && u != "" && typeof(u) != "undefined"){
					var url = domain2+"vouchers/checkVouchersInfo.do";
					var dataJson = {user:{userID:u,sh:1},page:{currentPage:1,pageNumber:5}};
					$mainServices.postNew(url,dataJson,false).success(function(JSONObj){
						if(JSONObj.ret == "success"){
							var JSON_list = JSONObj.obtainRecords;
							if(JSON_list != null && JSON_list.length > 0){
								$rootScope.tabPoint = true;
								if($location.path() == '/mine/myIndex'){
									$rootScope.linkPoint = true;
								}
							}
						}
					});
				}
			}
		};

		$scope.closeRootModal = function() {
			$scope.modalFlag = 1;
			$scope.modalRoot.remove();
		};
		$scope.getNoticeInfo = function (nid){
			var url = domain2 + "news/gainNewsInfo.do";
			var dataJson = {'nid':nid};
			$mainServices.postNew(url,dataJson,true).success(function(JSONObj) {
				if(JSONObj.ret == "success") {
					var news = JSONObj.news;
					var content = news.content;
					$scope.rntitle = news.ntitle;
					$scope.rproDetail = content;
				} else {
					alert(JSONObj.message);
				}
			});
		}
		// 处理推送信息
		window.showWinInfoDialog = function (json){
			if(typeof(json) == "string"){
				var json = JSON.parse(json);
			}
			if(json.flag == 1 ||json.flag == '1'){
				// 进入推送公告的详情页
				if($scope.modalFlag == 1){
					$ionicModal.fromTemplateUrl('templates/mine/noticeModal.html', {
						scope: $scope,
						animation: 'slide-in-up'
					}).then(function(modal) {
						$scope.modalRoot = modal;
						$scope.modalRoot.show();
						$scope.modalFlag = 2;
						$scope.getNoticeInfo(json.nid);
					});
				}
			} else if(json.flag != 2 && json.flag != '2'){
				//显示推送中奖信息弹框
				if($(".winInfoDia").length > 0){
					return;
				}
				var htmlPubTankuang =
					"<div class='gDia winInfoDia'>"+
					"<div class='outter-dialog'>"+
					"<div class='inner-dialog'>"+
					"<img class='img-winInfo' src='img/bg_winInfo.png'>"+
					"<div class='box-winInfo'><h5>获得商品</h5><p class='ellipsis2'>(第"+json.pterm+"期)"+json.ptitle+"</p><img class='btn-winInfo' onclick='jumpWinGoods()' src='img/btn_winInfo.png'></div>"+
					"</div></div><div class='btn-close' onclick='closeInfoDialog()'><img src='img/btn_close.png'></div></div>";
				$('body').append(htmlPubTankuang);
				var ImgObj = new Image();
				ImgObj.src = 'img/bg_winInfo.png';
				ImgObj.onload = function() {
					var ih = parseInt($(".winInfoDia").height());
					var gh = parseInt($(".winInfoDia .inner-dialog").height());
					$(".winInfoDia .outter-dialog").css("margin-top",(ih-gh)/2);
				}
			}


		}

    }  
  
    ctrl.$inject = ['$scope', '$ionicHistory','$mainServices','$location','$rootScope','$ionicTabsDelegate','$ionicScrollDelegate','$state','$ionicModal','$timeout','$ionicViewSwitcher'];
    return ctrl;  
      
}); 