define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices) {
    	$scope.user = {mobile:'',traderpassword:'未开启'};
		var base = $controller('baseController', { $scope: $scope });
		var u = localStorage.getItem("uid_local");
		
		if(u != null || u != ""){
	      	$mainServices.post(basePath + "getUser.jsp",{t:1,u:u},true).success(function(JSON_list_user){
	        	var mobile = "";
	        	if(JSON_list_user.length > 0){
	          		mobile = JSON_list_user[0].username + "";
	        	}
	        	if(mobile != null || mobile != ""){
	          		mobile = $mainServices.substringPhone(mobile);
	          		$scope.user.mobile = mobile;
	        	} else {
	        		$scope.user.mobile = "未绑定";
	        	}
	      	});
	      	
	      	$mainServices.post(basePath + "getCount.jsp",{t:1,u:u},true).success(function(JSONRet){
	        	var t_count = 0;
	        	if(JSONRet != null){
	          		t_count = JSONRet.count;
	        	}
	        	if(t_count > 0){
	        		$scope.user.traderpassword = "重置";
	        	} else {
	        		$scope.user.traderpassword = "设置";
	        	}
	      });
	
	    }
		
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices'];  
    return ctrl;  
      
}); 