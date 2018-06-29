define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$rootScope,$ionicTabsDelegate,$timeout,$ionicScrollDelegate,$ionicPopup) {
    	$scope.tab = [{tabClass:'czmx',isShow:true},{tabClass:'',isShow:false}];
    	$scope.canLoadRecordInvite = {code:false,nowPageMore:0}; // 邀请明细
    	$scope.canLoadRecordCommiss = {code:false,nowPageMore:0}; // 佣金明细
    	$scope.inviteRecords = [];
    	$scope.commissRecords = [];
    	$scope.zllist = ['我的邀请', '我的奖励'];
    	$scope.getUser = {yongjin:'0.00',yongjintotal:'0.00'};
		var base = $controller('baseController', { $scope: $scope });
		var u = localStorage.getItem("uid_local");
        if (u == null || u == "" || typeof(u) == "undefined") {
            alert("请先登录。");
            return;
        } else {
        	var url =  basePath + "getUsercommission.jsp";
	        var dataJson = {'uid': u};
	       	// 异步加载数据。。。。。。。
	        $mainServices.post(url, dataJson, true).success(function (JSON_list) {
	            $scope.getUser.yongjin = JSON_list.yongjin;
	            $scope.getUser.yongjintotal = JSON_list.yongjintotal;
	        });
        }
		// 明细切换
		$scope.i=0;
	    $scope.tabAc = function(t){
	    	$scope.i=t;
	        if(t == 0){
	        	$scope.tab = [{tabClass:'czmx',isShow:true},{tabClass:'',isShow:false}];
	        	if($scope.inviteRecords.length == 0){
	        		$scope.recordInvitationLoad();
	        	}
	        	
	        }else if(t == 1){
	        	$scope.tab = [{tabClass:'',isShow:false},{tabClass:'czmx',isShow:true}];
	        	if($scope.commissRecords.length == 0){
	        		$scope.recordCommissLoad();
	        	}
	        }
	    }
	        
	    // 佣金明细
	    $scope.recordCommissLoad = function(){
	    	var url = domain2 + "accountDetail/getAccountDetail.do";
		    $scope.canLoadRecordCommiss.nowPageMore++;
		    var dataJson = {user:{userID:u},page:{currentPage:$scope.canLoadRecordCommiss.nowPageMore,pageNumber:10000}};
		    $mainServices.postNew(url,dataJson,false).success(function(JSONObj){
		    	if(JSONObj.ret == "success"){
		    		var pageCount = JSONObj.data.page.totalPage;
		    		var JSON_list = JSONObj.data.serviceData;
		    		if(JSON_list != null && JSON_list.length > 0){
		    			$scope.list=false;
		    			$scope.val='';
		    			for (var i = 0; i < JSON_list.length; i++) {
				          	var nickname = JSON_list[i].nickname;
				          	var intime = JSON_list[i].intime;
				          	intime = $mainServices.getTimeNo_0(intime);
				          	var receiveuid = JSON_list[i].receiveuid;
							var sum = JSON_list[i].sum;
							var money;
							var maths;
				          	if(receiveuid == null){
				          		receiveuid = '转出';
								money = '0';
				          	} else {
				          		receiveuid = '收入';
								money = sum*JSON_list[i].byqruid;
								maths = "("+100/JSON_list[i].byqruid+"%)";
				          	}
				          	$scope.commissRecords.push({intime:intime,nickname:nickname,receiveuid:receiveuid,sum:money,commiss:sum,maths:maths});
				        }
				        $ionicScrollDelegate.resize();
				        if(pageCount <= $scope.canLoadRecordCommiss.nowPageMore){
				          	$scope.canLoadRecordCommiss.code = false;
				        }else {
				          	$scope.canLoadRecordCommiss.code = true;
				        }
				        $scope.$broadcast('scroll.infiniteScrollComplete');
		    		}else{
		    			$scope.list=true;
		    			$scope.val='暂无佣金';
		    		}
		    	} else {
		           	alert("请求失败，请重新刷新页面");
		       	}
		    });
	    }
	    /*二维码*/
	   	/*function getShareSx(isHide){
			var url = basePath + "getShareInfo.jsp";
			$mainServices.post(url,{t: 5},isHide).success(function(JSON_list){
				$scope.app_ewm = JSON_list[0].content;
				console.log($scope.app_ewm)
			});
		}*/
	   	$scope.zlbye = function () {
	   		$(".zlfxfooter").animate({'height':'0'},300)
	   	}
	   	$scope.share = function () {
	   		$(".zlfxfooter").animate({'height':'3rem'},300)
			$scope.invitationCode = localStorage.getItem("invitationCode");
			// if($mainServices.isNull($scope.invitationCode)){
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
			/*var myPopup = $ionicPopup.show({
				templateUrl: 'templates/mine/shareTemplate.html',
				scope: $scope,
				title: '扫码下载一元行官方app',
				buttons: [
					{text: '关闭'}
				]
			});*/
			/*myPopup.then(function (res) {});*/
			$scope.WeixinAppShare = function (type) {
				$mainServices.WeixinAppShare(type,$scope.invitationCode);
				/*$timeout(function () {
					myPopup.close();
				}, 1000);*/
			}
			/*getShareSx(false)*/
		}
	   /*二维码结束*/
		// 邀请明细
	    $scope.recordInvitationLoad = function(){
	    	var url = domain2 + "accountDetail/getInviteUser.do";
		    $scope.canLoadRecordInvite.nowPageMore++;
		    var dataJson = {user:{userID:u},page:{currentPage:$scope.canLoadRecordInvite.nowPageMore,pageNumber:10}};
		    $mainServices.postNew(url,dataJson,false).success(function(JSONObj){
		    	if(JSONObj.ret == "success"){
		    		var pageCount = JSONObj.data.page.totalPage;
		    		var JSON_list = JSONObj.data.serviceData;
		    		if(JSON_list != null && JSON_list.length > 0){
		    			for (var i = 0; i < JSON_list.length; i++) {
				          	var nickname = JSON_list[i].nickName;
				          	var experience = JSON_list[i].experience;
				          	var intime = JSON_list[i].intime;
							intime = $mainServices.getTimeNo_0(intime);
				          	if(experience <= 0){
				          		experience = '未消费';
				          	} else {
				          		experience = '已消费';
				          	}
				          	$scope.inviteRecords.push({intime:intime,nickname:nickname,experience:experience});
				        }
			        
				        $ionicScrollDelegate.resize();
				        if(pageCount <= $scope.canLoadRecordInvite.nowPageMore){
				          	$scope.canLoadRecordInvite.code = false;
				        }else {
				          	$scope.canLoadRecordInvite.code = true;
				        }
				        $scope.$broadcast('scroll.infiniteScrollComplete');
		    		}
		    	} else {
		           	alert("请求失败，请重新刷新页面");
		       }
		    });
	    }
	    
	    $scope.recordInvitationLoad(); // 首次加载
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$rootScope','$ionicTabsDelegate','$timeout','$ionicScrollDelegate','$ionicPopup'];  
    return ctrl;  
      
}); 