define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$timeout) {
    	$scope.user = {txtPassword:'',txtPasswordConfirm:'',invitationCode:''};
		$scope.tmp = {chk:"noCheck",isShow:false};// 是否勾选邀请码
    	var base = $controller('baseController', { $scope: $scope });

		$scope.tipRegSucc = function(){
			skip("#/" + $scope.host + "/log");
		}

		$scope.toChoose = function () {
			if ($scope.tmp.chk == 'noCheck') {
				$scope.tmp.chk = "";
				$scope.tmp.isShow = true;
			} else {
				$scope.tmp.chk = "noCheck";
				$scope.tmp.isShow = false;
			}
		}

    	$scope.register = function () {
		    var registerMobileLocal = localStorage.getItem("registerMobileLocal");
		    if(registerMobileLocal == null){
		      	alert("参数丢失,请重新注册。");
		      	$timeout(function(){skip('#/'+$scope.host+'/register')},3000);
		      	return;
		    }
		
			// 验证邀请码
            var InvitationCode = $scope.user.invitationCode;
			var registerSms = localStorage.getItem("registerSms");//短信验证码

			if($scope.tmp.chk == "noCheck"){
				InvitationCode = '';
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
			//提交表单
			var registerSilde = JSON.parse(localStorage.getItem("registerSilde"));
			var dataJson = {'username':registerMobileLocal,'password':passMD5,'yqm':InvitationCode,'platform':$mainServices.flagPlatform(),smscode:registerSms,csessionid:registerSilde.csessionid,sig:registerSilde.sig,token:registerSilde.token,scene:registerSilde.scene};
			$mainServices.postNew(domain2+"user/register.do",dataJson,false).success(function (subRetJson) {
				var code = subRetJson.code;
				var message = subRetJson.message;
				if(code == '200' || code == 200){
					setTimeout(function () {
						$("#tipRegSucc").show();
					}, 500);
					localStorage.removeItem("registerSms");//删除短信验证码
					localStorage.removeItem("registerMobileLocal");//删除手机号码
					localStorage.removeItem("registerSmsTimeLocal");//删除验证码发送时的毫秒数
					localStorage.removeItem("registerSilde");// 删除滑动验证码
				} else {
					alert(message);
				}
			});
			
        }
    	
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$timeout'];
    return ctrl;  
      
}); 