define(function () {  
    'use strict';  
    function ctrl($scope,$rootScope,$controller,$mainServices,$timeout,$ionicTabsDelegate) {  
    	$scope.user = {'txtPassword':'','txtPasswordConfirm':''};
    	var base = $controller('baseController', { $scope: $scope });

		$scope.tipSetPassSucc = function(){
			var backUrl = "#/mine/myIndex";
			var backUrlLogin = localStorage.getItem("backUrlLogin");// 本地存储
			if(backUrlLogin != null && backUrlLogin != "" && typeof(backUrlLogin) != "undefined"){
				backUrl = backUrlLogin;
				localStorage.removeItem("backUrlLogin");// 本地存储
			}
			if(backUrl == "#/index/index"){
				$rootScope.hideTabs = "";
				$ionicTabsDelegate.select(0);
			} else {
				skip(backUrl);
			};
		}

    	$scope.binding = function () {
		    var registerMobileLocal = localStorage.getItem("registerMobileLocal");
		    var openid = localStorage.getItem("openid");
		    var type = localStorage.getItem("type");
		    if(registerMobileLocal == null || openid == null || type == null){
		      	alert("参数丢失,请重新登录。");
		      	$timeout(function(){skip('#/'+$scope.host+'/log')},3000);
		      	return;
		    }
		
		    var password = $scope.user.txtPassword;
		    if(!$mainServices.yzLogPass(password)){
		      	alert("请输入有效的登录密码。");
		      	return;
		    }
		
		    var passwordconfirm = $scope.user.txtPasswordConfirm;
		    if(passwordconfirm == ""){
		      	alert("请确认登录密码。");
		      	return;
		    }
		
		    if(password != passwordconfirm){
		      	alert("两次密码不一致。");
		      	return;
		    }
		
		    var passMD5 = hex_md5(password);
			var registerSms = localStorage.getItem("registerSms");//短信验证码
		    //提交表单
		    var url = basePath+"userBindingSubmit.jsp";
		    var dataJson = {'sub_':1,'username': registerMobileLocal,'password': passMD5,'openid': openid,'type': type,'platform':2,smscode:registerSms};
		    $mainServices.post(url,dataJson, true).success(function (subRetJson) {
                var code = subRetJson.code;
			    var message = subRetJson.message;
			    if(code == 200){
			      	var uid = subRetJson.uid;
			      	localStorage.setItem("uid_local",uid);// 本地存储
			      	$mainServices.userLogin(uid.substring(uid.indexOf('_')+1,uid.indexOf('.')));
					$mainServices.postNew(domain2+"vouchers/insertSprogRecord.do",{userID:uid},false).success(function (subRetJson) {

					});
					$("#tipSetPassSucc").show();
					localStorage.removeItem("registerSms");//删除短信验证码
					localStorage.removeItem("registerMobileLocal");//删除手机号码
					localStorage.removeItem("registerSmsTimeLocal");//删除验证码发送时的毫秒数
			    }else{
			      	alert(message);
			      	$timeout(function(){skip('#/'+$scope.host+'/log')},3000);
			    }
			

          	});
		    
        }
    	
    }  
  
    ctrl.$inject = ['$scope','$rootScope', '$controller','$mainServices','$timeout','$ionicTabsDelegate'];  
    return ctrl;  
      
}); 