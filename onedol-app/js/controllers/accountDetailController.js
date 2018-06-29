define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$ionicScrollDelegate) {
		$scope.canLoadRecordRecharge = {code:false,nowPageMore:0}; // 充值明细
		$scope.canLoadRecordConsume = {code:false,nowPageMore:0}; // 消费明细
		$scope.canLoadRecordWithdraw = {code:false,nowPageMore:0}; // 提现明细
		$scope.canLoadRecordAssign = {code:false,nowPageMore:0}; // 转让明细
		$scope.rechargeRecords = []; // 充值明细
		$scope.consumeRecords = []; // 消费明细
		$scope.withdrawRecords = []; // 提现明细
		$scope.assignRecords = []; // 转让明细
    	$scope.tab = [{tabClass:'czmx',isShow:true},{tabClass:'',isShow:false},{tabClass:'',isShow:false},{tabClass:'',isShow:false}];
    	var base = $controller('baseController', { $scope: $scope });

		var u = localStorage.getItem("uid_local");
        if (u == null || u == '') {
        	alert("请先登录。");
        	return;
    	}

        // 充值明细
		$scope.recordRechargeLoad = function () {
			var url = domain2 + "accountDetail/selectBalacne.do";
			$scope.canLoadRecordRecharge.nowPageMore++;
			var dataJson = {user:{userID:u,yueType:1},page:{currentPage:$scope.canLoadRecordRecharge.nowPageMore,pageNumber:20}};
	        $mainServices.postNew(url,dataJson,false).success(function(JSONObj){
				if(JSONObj.ret == "success"){
					var pageCount = JSONObj.data.page.totalPage;
					var JSON_list = JSONObj.data.serviceData;
					if(JSON_list != null && JSON_list.length > 0){
						for (var i = 0; i < JSON_list.length; i++) {
							var remark = JSON_list[i].remark;
							var intime = JSON_list[i].intime;
							intime = $mainServices.getTimeNo_0(intime);
							var sum = JSON_list[i].sum;
							$scope.rechargeRecords.push({intime:intime,remark:remark,sum:sum});
						}
						$ionicScrollDelegate.resize();
						if(pageCount <= $scope.canLoadRecordRecharge.nowPageMore){
							$scope.canLoadRecordRecharge.code = false;
						}else {
							$scope.canLoadRecordRecharge.code = true;
						}
						$scope.$broadcast('scroll.infiniteScrollComplete');
					}
				} else {
					alert("请求失败，请重新刷新页面");
				}
	        });
	    }

	    // 消费明细
		$scope.recordConsumeLoad = function () {
			var url = domain2 + "accountDetail/selectBalacne.do";
			$scope.canLoadRecordConsume.nowPageMore++;
			var dataJson = {user:{userID:u,yueType:2},page:{currentPage:$scope.canLoadRecordConsume.nowPageMore,pageNumber:20}};
	        $mainServices.postNew(url,dataJson,false).success(function(JSONObj){
				if(JSONObj.ret == "success"){
					var pageCount = JSONObj.data.page.totalPage;
					var JSON_list = JSONObj.data.serviceData;
					if(JSON_list != null && JSON_list.length > 0){
						for (var i = 0; i < JSON_list.length; i++) {
							var intime = JSON_list[i].intime;
							intime = $mainServices.getTimeNo_0(intime);
							var sum = JSON_list[i].sum;
							$scope.consumeRecords.push({intime:intime,sum:sum});
						}
						$ionicScrollDelegate.resize();
						if(pageCount <= $scope.canLoadRecordConsume.nowPageMore){
							$scope.canLoadRecordConsume.code = false;
						}else {
							$scope.canLoadRecordConsume.code = true;
						}
						$scope.$broadcast('scroll.infiniteScrollComplete');
					}
				} else {
					alert("请求失败，请重新刷新页面");
				}
	        });
	    }
	    
	    // 提现明细
		$scope.recordWithdrawLoad = function () {
			var url = domain2 + "accountDetail/selectBalacne.do";
			$scope.canLoadRecordWithdraw.nowPageMore++;
			var dataJson = {user:{userID:u,yueType:4},page:{currentPage:$scope.canLoadRecordWithdraw.nowPageMore,pageNumber:20}};
	        $mainServices.postNew(url,dataJson,false).success(function(JSONObj){
				if(JSONObj.ret == "success"){
					var pageCount = JSONObj.data.page.totalPage;
					var JSON_list = JSONObj.data.serviceData;
					if(JSON_list != null && JSON_list.length > 0){
						for (var i = 0; i < JSON_list.length; i++) {
							var intime = JSON_list[i].intime;
							intime = $mainServices.getTimeNo_0(intime);
							var sum = JSON_list[i].sum;
							$scope.withdrawRecords.push({intime:intime,sum:sum});
						}
						$ionicScrollDelegate.resize();
						if(pageCount <= $scope.canLoadRecordWithdraw.nowPageMore){
							$scope.canLoadRecordWithdraw.code = false;
						}else {
							$scope.canLoadRecordWithdraw.code = true;
						}
						$scope.$broadcast('scroll.infiniteScrollComplete');
					}
				} else {
					alert("请求失败，请重新刷新页面");
				}
	        });
	    }

	    // 转让明细
		$scope.recordAssignLoad = function () {
			var url = domain2 + "accountDetail/selectBalacne.do";
			$scope.canLoadRecordAssign.nowPageMore++;
			var dataJson = {user:{userID:u,yueType:5},page:{currentPage:$scope.canLoadRecordAssign.nowPageMore,pageNumber:20}};
			$mainServices.postNew(url,dataJson,false).success(function(JSONObj){
				if(JSONObj.ret == "success"){
					var pageCount = JSONObj.data.page.totalPage;
					var JSON_list = JSONObj.data.serviceData;
					if(JSON_list != null && JSON_list.length > 0){
						for (var i = 0; i < JSON_list.length; i++) {
							var intime = JSON_list[i].intime;
							var remark = JSON_list[i].remark;
							intime = $mainServices.getTimeNo_0(intime);
							var sum = JSON_list[i].sum;
							$scope.assignRecords.push({intime:intime,sum:sum,remark:remark,});
						}
						$ionicScrollDelegate.resize();
						if(pageCount <= $scope.canLoadRecordAssign.nowPageMore){
							$scope.canLoadRecordAssign.code = false;
						}else {
							$scope.canLoadRecordAssign.code = true;
						}
						$scope.$broadcast('scroll.infiniteScrollComplete');
					}
				} else {
					alert("请求失败，请重新刷新页面");
				}
			});
		}

		// 初始化
		$scope.recordRechargeLoad();// 充值明细
        
        // 账户明细
	    $scope.tabAc = function(t){
	        if(t == 0){
	        	$scope.tab = [{tabClass:'czmx',isShow:true},{tabClass:'',isShow:false},{tabClass:'',isShow:false},{tabClass:'',isShow:false}];
				if($scope.rechargeRecords.length == 0){
					$scope.recordRechargeLoad();
				}
	        } else if(t == 1){
	        	$scope.tab = [{tabClass:'',isShow:false},{tabClass:'czmx',isShow:true},{tabClass:'',isShow:false},{tabClass:'',isShow:false}];
				if($scope.consumeRecords.length == 0){
					$scope.recordConsumeLoad();
				}
	        } else if(t == 2){
	        	$scope.tab = [{tabClass:'',isShow:false},{tabClass:'',isShow:false},{tabClass:'czmx',isShow:true},{tabClass:'',isShow:false}];
				if($scope.withdrawRecords.length == 0){
					$scope.recordWithdrawLoad();
				}
	        } else if(t == 3){
				$scope.tab = [{tabClass:'',isShow:false},{tabClass:'',isShow:false},{tabClass:'',isShow:false},{tabClass:'czmx',isShow:true}];
				if($scope.assignRecords.length == 0){
					$scope.recordAssignLoad();
				}
			}
	    }
	    
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$ionicScrollDelegate'];
    return ctrl;  
      
}); 