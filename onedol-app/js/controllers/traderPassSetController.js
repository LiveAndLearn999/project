define(function () {  
    'use strict';  
    function ctrl($scope,$rootScope,$controller,$mainServices,$ionicHistory,$timeout,$interval) {  
    	$scope.data = {canNext: false, canSend: true};
    	$scope.smsBtn = "获取验证码";
    	$scope.styleBtn = ['orangeBtn','orangeBtn']; // 按钮样式
    	$scope.user = {mobileCode:'',txtMobile:'',txtPassword:'',txtPasswordConfirm:'',linkedMobile:''};
    	var base = $controller('baseController', { $scope: $scope });
    	var u = localStorage.getItem("uid_local");
    	
    	$mainServices.post(basePath + "getUser.jsp",{t:1,u:u},true).success(function(JSON_list_user){
	        if(JSON_list_user.length > 0){
	          	var txtMobile = JSON_list_user[0].username + "";
	          	$scope.user.txtMobile = txtMobile;
	          	$scope.user.linkedMobile = "   验证手机号：" + $mainServices.substringPhone(txtMobile);
	        }
	    });
    	var _res;
		// 验证码倒计时
    	$scope.daojishiReg = function (){
            var step = 120;
            $scope.styleBtn = ['orangeBtn','grayBtn'];
            $scope.smsBtn = "重新发送("+ step+"S)";
            _res = $interval(function () {
                step -= 1;
                $scope.smsBtn = "重新发送("+ step+"S)";
                if(step <= 0) {
                	$scope.smsBtn ="重新发送";
                	$scope.styleBtn = ['orangeBtn','orangeBtn'];
                    $interval.cancel(_res);
                    $scope.data.canNext = true;
                    $scope.data.canSend = true;
                }
            },1000);
        }
		// 获取验证码
    	$scope.getSmscodeBackPass = function () {
            // 获取参数
            if (!$scope.data.canSend) {
                return;
            }
            $scope.data.canSend = false;
            $scope.data.canNext = true;
            try {
            	var txtMobile = $scope.user.txtMobile;
	            if (!$mainServices.yzPhone(txtMobile)) {
	                alert("手机号有误。");
	                $scope.data.canSend = true;
	                return;
	            }
                // 验证手机号是否有效
                $mainServices.post(basePath+"userValidCheck.jsp",{'username':txtMobile}, true).success(function (yzRetJson) {
		            var codeYz = yzRetJson.code;
					if (codeYz != 200) {
	                    var message = yzRetJson.message;
	                    alert(message);
	                    $scope.data.canSend = true;
	                    return;
	                }
					// 发送短信验证码
					$mainServices.post(basePath+"getSMS.jsp",{'username':txtMobile}, true).success(function (smsRet) {
			            var smsRetCode = smsRet.code;
		                var message = smsRet.message;
		                if (smsRetCode == 200) {
							localStorage.setItem("backPassSmsTimeLocal", smsRet.date);
		                    $scope.daojishiReg();
		                } else {
		                    alert(message);
		                    $scope.data.canSend = true;
		                }
			        });
		        });
                
            } catch (e) {
                $scope.data.canSend = true;
            }
        }
		// 提交
    	$scope.traderPassBackSubmit = function (){
    		if(u == null || u == ""){
          		alert("参数丢失，请重新登录。");
          		return;
       		}
    		var txtMobile = $scope.user.txtMobile;
			var mobileCode = $scope.user.mobileCode;
			if (mobileCode == "" || mobileCode.length != 6) {
				alert("请输入有效的短信验证码");
				return;
			}
    		//验证短信
            var backPassSmsTimeLocal = localStorage.getItem("backPassSmsTimeLocal");
            var nowTime = $mainServices.getServerTimeMilliseconds();//服务器时间毫秒数
	
	        if (((nowTime - backPassSmsTimeLocal) / 1000 / 60) > 5) {
	            alert("验证码已经过期");
	            return;
	        }
	            
	        var password = $scope.user.txtPassword;
			if(!$mainServices.yzNumber(password) || password.length != 6){
	          	alert("请输入6位数字密码。");
	          	return;
	        }
			var passwordconfirm = $scope.user.txtPasswordConfirm;
			if(passwordconfirm == ""){
			    lert("请确认交易密码。");
			    return;
			}
			
			if(password != passwordconfirm){
			    alert("两次密码不一致。");
			    return;
			}
			
			var passMD5 = hex_md5(password);
			// 重置交易密码
        	var url = basePath + "setUser.jsp";
        	var dataJson = {'t':3,'username':txtMobile,'p':passMD5,'u':u,code:mobileCode};
        	$mainServices.post(url,dataJson, true).success(function (subRetJson) {
	            var code = subRetJson.code;
				if(code == 200){
	                localStorage.removeItem("backPassSmsTimeLocal");//删除验证码发送时的毫秒数
	                alert("设置成功");
				    $timeout(function () {
				    	$interval.cancel(_res);
//	                    $rootScope.hideTabs = "";
	                    $ionicHistory.goBack(-1);
	                }, 2000);
				} else {
		            var message = subRetJson.message;
		            alert(message);
		        }
	        });
        	
    	}
    	
    }  
  
    ctrl.$inject = ['$scope','$rootScope', '$controller','$mainServices','$ionicHistory','$timeout','$interval'];  
    return ctrl;  
      
}); 