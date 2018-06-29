define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$ionicScrollDelegate,$timeout) {  
		$scope.data = {nowPageMore:0,loadingStatus:0,renci:0,luckynumber:'',numbers:[]};
    	var base = $controller('baseController', { $scope: $scope });
    	
    	function getShopnumberAll(isHide) {
		    var pid = $mainServices.getQueryString("pid");
		    var pterm = $mainServices.getQueryString("pterm");
		    var u = $mainServices.getQueryString("u");
		    var nowPageMore = $scope.data.nowPageMore+1;
		    var url = basePath + "getShopnumberAll.jsp";
		    var dataJson = {'pid':pid,'pterm':pterm,'u': u,'toPage':nowPageMore};
		    // 异步加载数据
		    $mainServices.post(url,dataJson,isHide).success(function(JSONObjRet){
		      	var JSON_list = JSONObjRet.dblist;
		      	var pageCount = parseInt(JSONObjRet.pageCount);
		      	var recount = parseInt(JSONObjRet.recount);
		      	var showPage = parseInt(JSONObjRet.showPage);
		
		      	$scope.data.nowPageMore = showPage;
		
		      	var luckynumber = JSONObjRet.luckynumber;
		      	$scope.data.renci = recount; //总人数
		      	$scope.data.luckynumber = luckynumber; //幸运号
		      	$scope.data.numbers = $scope.data.numbers.concat(JSON_list);
		
		      	$ionicScrollDelegate.resize();
		      	if (showPage == pageCount || recount <= 0) {
		        	$timeout(function() {
		          		$scope.data.loadingStatus = 0; //停止加载更多
		        	},500);
		      	} else {
		        	$timeout(function(){
		          		$scope.data.loadingStatus=1;
		        	},500)
		      	}
				$scope.$broadcast('scroll.infiniteScrollComplete');
		    });
		}
    	
    	// 初始化
    	getShopnumberAll(true);
    	
    	$scope.loadMore = function(){
		    getShopnumberAll(false);
		}
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$ionicScrollDelegate','$timeout'];  
    return ctrl;  
      
}); 