define(function () {  
    'use strict';  
    function ctrl($scope,$rootScope,$controller,$mainServices,$timeout,$ionicTabsDelegate) {
    	$scope.user = {passwordold:'',txtPassword:'',txtPasswordConfirm:''};
		var base = $controller('baseController', { $scope: $scope });
		
		// 修改登录密码
	    $scope.logPassModSubmit = function(){
	      	var u = localStorage.getItem("uid_local");
	      	if(u == null || u == ""){
	        	alert("参数丢失,请重新登录。");
	        	return;
	      	}
	
	      	var passwordold = $scope.user.passwordold;
	      	if(!$mainServices.yzLogPass(passwordold)){
	        	alert("请输入有效的原密码。");
	        	return;
	      	}
	      	var passMD5old = hex_md5(passwordold);
			var password = $scope.user.txtPassword;
			if(!$mainServices.yzLogPass(password)){
				alert("请输入有效的登录密码。");
				return;
			}

			if(passwordold == password){
				alert("原密码与新密码不能一致。");
				return;
			}
			var passwordconfirm = $scope.user.txtPasswordConfirm;
			if(passwordconfirm == ""){
				alert("请确认新的登录密码。");
				return;
			}

			if(password != passwordconfirm){
				alert("两次密码不一致。");
				return;
			}
			var passMD5 = hex_md5(password);
			// 修改登录密码
			$mainServices.post(basePath + "setUser.jsp",{'t': 1,'u': u,'p': passMD5,'passMD5':passMD5old},true).success(function(subRetJson){
				var code = subRetJson.code;
				if(code == 200){
					alert("密码修改成功。");
					localStorage.removeItem("uid_local");
					$timeout(function(){
						$scope.user = {passwordold:'',txtPassword:'',txtPasswordConfirm:''};
						$rootScope.hideTabs=" ";
						$ionicTabsDelegate.select(4);
					},2000);
				} else {
					alert(subRetJson.message);
				}
			});
	    }
		
    }  
  
    ctrl.$inject = ['$scope','$rootScope', '$controller','$mainServices','$timeout','$ionicTabsDelegate'];  
    return ctrl;  
      
}); 