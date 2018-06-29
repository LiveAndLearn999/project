define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices) {  
    	$scope.user = {txtMobile:""};
    	$scope.tmp = {chk: "noCheck"};// 是否勾选服务协议
    	var base = $controller('baseController', { $scope: $scope });
    	
    	$scope.toChoose = function () {
            if ($scope.tmp.chk == 'noCheck') {
                $scope.tmp.chk = "";
            } else {
                $scope.tmp.chk = "noCheck";
            }
        }
    	
    	$scope.register = function(){
    		// 验证手机号格式
            var txtMobile = $scope.user.txtMobile;
            if (!$mainServices.yzPhone(txtMobile)) {
                alert("请输入有效的手机");
                return;
            }
            
            // 验证手机号是否存在
            $mainServices.post(basePath+"userUniqueCheck.jsp",{'username':txtMobile}, true).success(function (yzRetJson) {
                var codeYz = yzRetJson.code;
	            if (codeYz != 200) {
	                var message = yzRetJson.message;
	                alert(message);
	                return;
	            }
	            // 注册协议
	            if($scope.tmp.chk == "noCheck"){
			      	alert("请先同意用户服务协议");
			      	return;
			    }
	            // 跳转发送验证码页面 
	            localStorage.setItem("registerMobileLocal", txtMobile);
	            skip("#/" + $scope.host + "/registerStepTwo");
           	});
            
            
    	}
		
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices'];  
    return ctrl;  
      
}); 