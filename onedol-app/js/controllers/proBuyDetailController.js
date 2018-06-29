define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$stateParams,$ionicScrollDelegate,$timeout) {
		$scope.buyRecords = [];//购买记录
    	var pid = $stateParams.pid;
      	var pterm = $stateParams.pterm;
		$scope.recordDataJson = {pid:pid,pterm:pterm,toPage:0};
      	var base = $controller('baseController', { $scope: $scope });
		$scope.canLoadRecord = false;

		$scope.recordTermLoad = function(t){
			var isHide = false;
			if( t == 'first'){
				isHide = true;
			}
			var url = basePath+"getProductBuyRecord.jsp";
			$scope.recordDataJson.toPage++;
			$mainServices.post(url,$scope.recordDataJson,isHide).success(function(JSONObj){
				var JSON_list4 = JSONObj.buyRlist;
				var pageCount = JSONObj.pageCount;
				if(JSON_list4 != null && JSON_list4.length > 0) {
					for (var i = 0; i < JSON_list4.length; i++) {
						var uid_buy = JSON_list4[i].uid;
						var num_buy = JSON_list4[i].num;
						var intime_buy = JSON_list4[i].intime;
						// intime_buy = $mainServices.getTimeNo_0(intime_buy);
						var headpic_buy = JSON_list4[i].headpic;
						var nickname_buy = JSON_list4[i].nickname;
						if(nickname_buy == "") {
							nickname_buy = JSON_list4[i].username;
						}
						headpic_buy = $mainServices.getHttpOrlocalHeadPic(headpic_buy);
						$scope.buyRecords.push({url:"#/" + $scope.host + "/userIndex/" + uid_buy,headpic_buy:headpic_buy,nickname_buy:nickname_buy,num_buy:num_buy,intime_buy:intime_buy});
					}

					$ionicScrollDelegate.resize();
					if(pageCount <= $scope.recordDataJson.toPage){
						$scope.canLoadRecord = false;
					}else {
						$scope.canLoadRecord = true;
					}
					if(t == "more"){
						$scope.$broadcast('scroll.infiniteScrollComplete');
					} else if(t == "refresh"){
						$scope.$broadcast('scroll.refreshComplete');
					}
				}
			});
		};
	    // 初始化
		$scope.recordTermLoad('first');
	    
	    $scope.loadMore=function(){
			$scope.recordTermLoad('more');
    	};
    	$scope.doRefresh=function(){
			$scope.recordDataJson.toPage = 0;
			$scope.buyRecords = [];//购买记录
			$scope.recordTermLoad('refresh');
	    };
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$stateParams','$ionicScrollDelegate','$timeout'];  
    return ctrl;  
      
}); 