define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices) {  
    	$scope.data = {qq: ""};
        var base = $controller('baseController', { $scope: $scope });
        
        var u = localStorage.getItem("uid_local");
       	if (u != null && u != "") {
       		$mainServices.post(basePath + "getUser.jsp",{t:10,u:u},true).success(function(JSON_list_user){
                var qq = "";
                if(JSON_list_user.length > 0){
		    		qq = JSON_list_user[0].qq + "";
		 		}
                $scope.data.qq = qq;
            });
       		
        }

		$scope.setQq = function () {
            var u = localStorage.getItem("uid_local");
            var qq = $scope.data.qq;
            qq = $mainServices.trim(qq);
            if (qq == "") {
                alert("请输入您的qq号");
                return;
            }
            if (!$mainServices.yzNumber(qq)) {
                alert("请输入正确的qq号");
                return;
            }
            var url = basePath + "seting.jsp";
            var dataJson = {'u': u, 't': 4, 'qq': qq};
            $mainServices.post(url,dataJson,true).success(function(jsonRet){
                if (jsonRet != null) {
	                var code = jsonRet.code;
	                if (code == 200) {
	                    skip('#/' + $scope.host + '/myInfo');
	                } else {
	                    alert("网络异常，请稍后重试");
	                }
	            }
            });
            
        }


        
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices'];  
    return ctrl;  
      
}); 