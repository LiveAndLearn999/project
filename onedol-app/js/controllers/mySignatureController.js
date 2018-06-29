define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices) {  
    	 $scope.data = {signature: ""};
        var base = $controller('baseController', { $scope: $scope });
        
        var u = localStorage.getItem("uid_local");
       	if (u != null && u != "") {
       		$mainServices.post(basePath + "getUser.jsp",{t:7,u:u},true).success(function(JSON_list_user){
                var signature = "";
				if(JSON_list_user.length > 0){
				    signature = JSON_list_user[0].signature + "";
				}
                $scope.data.signature = signature;
            });
       		
        }

		$scope.setSignature = function () {
            var u = localStorage.getItem("uid_local");
            var signature = $mainServices.trim($scope.data.signature);
            if (signature == "") {
                alert("请输入您的签名");
                return;
            }
            var url = basePath + "seting.jsp";
            var dataJson = {'u': u, 't': 3, 'signature': signature};
            $mainServices.post(url,dataJson,true).success(function(jsonRet){
                if (jsonRet != null) {
	                var code = jsonRet.code;
	                if (code == 200) {
	                    skip('#/' + $scope.host + '/myInfo');
	                } else {
	                    if(code == 900){
	                        alert(jsonRet.message);
	                    }else{
	                        alert("网络异常，请稍后重试");
	                    }
	                }
	            }
            });
            
        }

        
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices'];  
    return ctrl;  
      
}); 