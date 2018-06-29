define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices) {  
    	$scope.tmp = {chk: "noCheck"};// 是否勾选服务协议
    	$scope.user = {'mobile':''};
    	var base = $controller('baseController', { $scope: $scope });
    	
    	$scope.toChoose = function () {
            if ($scope.tmp.chk == 'noCheck') {
                $scope.tmp.chk = "";
            } else {
                $scope.tmp.chk = "noCheck";
            }
        }
        $scope.binding = function() {
            // 验证手机号格式
		    var txtMobile = $scope.user.mobile;
		    if(!$mainServices.yzPhone(txtMobile)){
		      	alert("请输入有效的手机号");
		      	return;
		    }
		    // 注册协议
		    if($scope.tmp.chk == "noCheck"){
		      	alert("请先同意用户服务协议");
		      	return;
		    }
		    localStorage.setItem("registerMobileLocal",txtMobile);
		    // 验证手机号是否存在
		    $mainServices.post(basePath+"userUniqueCheck.jsp",{'username':txtMobile}, true).success(function (yzRetJson) {
                var codeYz = yzRetJson.code;
			    if(codeYz != 200){
			      	// 跳转输入密码页面
			      	skip('#/'+$scope.host+'/changePassword');
			    }else{
			      	// 跳转发送验证码页面
			      	skip('#/'+$scope.host+'/SecurityCode');
			    }
           });
		    
        }
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices'];  
    return ctrl;  
      
}); 