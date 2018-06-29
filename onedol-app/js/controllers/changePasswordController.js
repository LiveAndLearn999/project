define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$rootScope,$ionicTabsDelegate) {
    	$scope.cpw = {login_password:""};
    	var base = $controller('baseController', { $scope: $scope });
    	
    	// 三方登录手机绑定
        $scope.binding = function(){
        	var passMD5 = hex_md5($scope.cpw.login_password);
            var registerMobileLocal = localStorage.getItem("registerMobileLocal");
            var openid = localStorage.getItem("openid");
           	var type = localStorage.getItem("type");
            if(registerMobileLocal == null || openid == null || type == null){
                alert("参数丢失");
                return;
            }

            // 已注册手机号判断密码是否正确
            $mainServices.post(basePath+"userpasswordyz.jsp",{username:registerMobileLocal,login_password:passMD5}, true).success(function (mmyzRetJson) {
                var code_mmyz = mmyzRetJson.code;
                if(code_mmyz != 200){
                    var message_mmyz = mmyzRetJson.message;
                    alert(message_mmyz);
                    return;
                }
                //提交表单
                var dataJson = {'sub_':1,'username': registerMobileLocal,'password': passMD5,'openid': openid,'type': type,'platform':2};
                $mainServices.post(basePath+"userBindingSubmit.jsp",dataJson, true).success(function (subRetJson) {
	                var code = subRetJson.code;
	                var message = subRetJson.message;
	                if(code == 200){
	                    var uid = subRetJson.uid;
	                    localStorage.setItem("uid_local",uid);// 本地存储
	                    $mainServices.userLogin(uid.substring(uid.indexOf('_')+1,uid.indexOf('.')));
	
	                    var backUrl = "#/"+$scope.host+"/log";
	                    var backUrlLogin = localStorage.getItem("backUrlLogin");//  本地存储
	                    if(backUrlLogin != null && backUrlLogin != "" && typeof(backUrlLogin) != "undefined"){
	                        backUrl = backUrlLogin;
	                        localStorage.removeItem("backUrlLogin");// 本地存储
	                    }
						if(backUrl == "#/index/index"){
							$rootScope.hideTabs = "";
							$ionicTabsDelegate.select(0);
						} else if(backUrl == "#/product/productlist"){
							$rootScope.hideTabs = "";
							$ionicTabsDelegate.select(1);
						} else if(backUrl == "#/activite/newPublishList"){
							$rootScope.hideTabs = "";
							$ionicTabsDelegate.select(2);
						} else if(backUrl == "#/cart/cart"){
							$rootScope.hideTabs = "";
							$ionicTabsDelegate.select(3);
						} else if(backUrl == "#/mine/myIndex"){
							$rootScope.hideTabs = "";
							$ionicTabsDelegate.select(4);
						} else{
							skip(backUrl);
						};
	                } else {
	                    alert(message);
	                    return;
	                }
	                
	           	});  
           	});    
            
                
        }
		
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$rootScope','$ionicTabsDelegate'];
    return ctrl;  
      
}); 