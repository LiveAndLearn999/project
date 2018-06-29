define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$stateParams,$ionicScrollDelegate,$timeout) {
		$scope.obj = {pterm:''};
    	$scope.qishuData = [];
    	var pid = $stateParams.pid;
      	var pterm = $stateParams.pterm;
      	var base = $controller('baseController', { $scope: $scope });
      	
      	//查询产品最大期数
	    $scope.productQishu = function(page,t) {
	        var url = basePath + "getQiShu.jsp";
	        var dataJson = {'pid': pid, 'pterm': pterm, 'host': $scope.host, 'page': page};
	
	        var isHide = false;
	        if(t == "first"){
	        	var isHide = true;
	        }
	        
	        // 异步加载数据
	        $mainServices.post(url, dataJson, isHide).success(function (JsonObj) {
	          	var pageCount = JsonObj.pageCount;
	          	var dataText = JsonObj.data;
	          	$scope.qishuData = $scope.qishuData.concat(dataText);
	          	$ionicScrollDelegate.resize();
		        if(pageCount <= ($scope.canLoadMore.nowPageMore+1)){
		            $scope.canLoadMore.code = false;
		        }else{
		            $timeout(function(){
		              	$scope.canLoadMore.code=true;
		            },500);
		        }
		        if(t == "more"){
				    $scope.$broadcast('scroll.infiniteScrollComplete');
				} else if(t != "first"){
				    $scope.$broadcast('scroll.refreshComplete');
				}
		    });
	    };
	    // 初始化
	    $scope.productQishu($scope.canLoadMore.nowPageMore,'first');

		$scope.termSubmit = function () {
			var url = basePath + "skipProduct.jsp";
			var dataJson = {'pid': pid, 'pterm': $scope.obj.pterm, 'host': $scope.host,'flag':1};
			if(isNaN($scope.obj.pterm) || $scope.obj.pterm < 1){
				alert('期数只支持正整数');
				return;
			};
			$mainServices.post(url, dataJson, true).success(function (JsonObj) {
				if(JsonObj.code == 200){
					skip(JsonObj.url);
				} else {
					alert(JsonObj.message);
					return;
				}
			});
		}

	    $scope.loadMore=function(){
      		$scope.canLoadMore.nowPageMore++;
      		$scope.productQishu($scope.canLoadMore.nowPageMore,'more');
    	};
    	$scope.doRefresh=function(){
	      	$scope.canLoadMore.nowPageMore = 0;
	      	$scope.qishuData = [];
	      	$scope.productQishu($scope.canLoadMore.nowPageMore);
	    };
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$stateParams','$ionicScrollDelegate','$timeout'];  
    return ctrl;  
      
}); 