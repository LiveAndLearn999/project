define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$rootScope,$ionicTabsDelegate,$timeout,$ionicScrollDelegate) {
    	$scope.canLoadRecordIntegral = {code:false,nowPageMore:0}; // 积分明细
    	$scope.integralRecords = [];
    	$scope.getUser = {integral:'0'};
		var base = $controller('baseController', { $scope: $scope });
		var u = localStorage.getItem("uid_local");
        if (u == null || u == "" || typeof(u) == "undefined") {
            alert("请先登录。");
            return;
        } else {
        	var url =  basePath + "getUser.jsp";
	        var dataJson = {'u':u,'t':4};
	       	// 异步加载数据。。。。。。。
	        $mainServices.post(url, dataJson, true).success(function (JSON_list) {
	            $scope.getUser.integral = JSON_list[0].integral;
	        });
        }
	        
	    // 积分明细
	    $scope.recordIntegralLoad = function(){
	    	var url = domain2 + "accountDetail/selectIntegral.do";
		    $scope.canLoadRecordIntegral.nowPageMore++;
		    var dataJson = {user:{userID:u},page:{currentPage:$scope.canLoadRecordIntegral.nowPageMore,pageNumber:15}};
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
							var status = JSON_list[i].status;
				          	if(status == 1){
								sum = '<span style="color:#00a800;">+'+sum+'</span>';
				          	} else {
								sum = '<span style="color:#f00;">-'+sum+'</span>';
				          	}
				          	$scope.integralRecords.push({intime:intime,remark:remark,sum:sum});
				        }

				        $ionicScrollDelegate.resize();
				        if(pageCount <= $scope.canLoadRecordIntegral.nowPageMore){
				          	$scope.canLoadRecordIntegral.code = false;
				        }else {
				          	$scope.canLoadRecordIntegral.code = true;
				        }
				        $scope.$broadcast('scroll.infiniteScrollComplete');
		    		}
		    	} else {
		           	alert("请求失败，请重新刷新页面");
		       	}
		    });
	    }
	    
	    $scope.recordIntegralLoad(); // 首次加载
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$rootScope','$ionicTabsDelegate','$timeout','$ionicScrollDelegate'];  
    return ctrl;  
      
}); 