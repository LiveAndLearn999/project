define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$interval,$http,$sce,$timeout) {
    	$scope.data = {canNext: true, canSend: true};
    	$scope.mobileSmsLi = '';
		$scope.mobileSilde = '';
    	$scope.smsBtn ="获取验证码";
    	$scope.user = {mobileCode:''};
		$scope.showSilde = false;
    	$scope.styleBtn = ['orangeBtn','orangeBtn'];// 按钮样式
    	var base = $controller('baseController', { $scope: $scope });
    	var registerMobileLocal = localStorage.getItem("registerMobileLocal");
        if (registerMobileLocal != null && registerMobileLocal.length == 11) {
			$scope.mobileSilde = $sce.trustAsHtml('<span style="color:#f00">请先滑动验证后，</span>验证码将发送至' + $mainServices.substringPhone(registerMobileLocal));
            $scope.mobileSmsLi = $sce.trustAsHtml('验证码将发送至' + $mainServices.substringPhone(registerMobileLocal));
        }

       	// 验证码倒计时
       	$scope.daojishiReg = function () {
            var step = 120;
            $scope.styleBtn = ['orangeBtn','grayBtn'];
            $scope.smsBtn = "重新发送("+ step+"S)";
            var _res = $interval(function () {
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
       	
        $scope.getSmscode = function () {
            // 获取参数
            if (!$scope.data.canSend) {
                return;
            }
			$scope.showSilde = true;
			$timeout(function (){
				var nc_appkey =  '4SIJ'; // 应用标识,不可更改
				var nc_scene = 'register_h5';  //场景,不可更改
				var nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');
				var nc_option = {
					renderTo: '#dom_id',//渲染到该DOM ID指定的Div位置
					appkey: nc_appkey,
					scene: nc_scene,
					token: nc_token,
					callback: function (data) {// 校验成功回调
						if(data.csessionid == ""){
							alert("请进行滑动验证。");
							return;
						}
						$scope.showSilde = false;
						$scope.data.canSend = false;
						$scope.data.canNext = true;
						try {
							var registerMobileLocal = localStorage.getItem("registerMobileLocal");
							if (registerMobileLocal != null) {
								// 验证手机号是否存在
								$mainServices.post(basePath+"userUniqueCheck.jsp",{'username':registerMobileLocal}, true).success(function (yzRetJson) {
									var codeYz = yzRetJson.code;
									if (codeYz != 200) {
										var message = yzRetJson.message;
										alert(message);
										$scope.data.canSend = true;
										return;
									}
									// 发送短信验证码
									$mainServices.post(basePath+"getSMS.jsp",{'username':registerMobileLocal}, true).success(function (smsRet) {
										var smsRetCode = smsRet.code;
										var message = smsRet.message;
										if (smsRetCode == 200) {
											$scope.mobileSmsLi = "验证码将发送至" + $mainServices.substringPhone(registerMobileLocal) + "，如未收到验证短信，请在120秒后点击重新发送";
											localStorage.setItem("registerSmsTimeLocal", smsRet.date);
											$scope.daojishiReg();
											localStorage.setItem("registerSilde",JSON.stringify({csessionid:data.csessionid,sig:data.sig,token:nc_token,scene:nc_scene}));
										} else {
											alert(message);
											$scope.data.canSend = true;
										}
									});
								});
							} else {
								alert("参数丢失");
								setTimeout(function () {
									skip('#/' + $scope.host + '/register');
								}, 3000);
								return;
							}
						} catch (e) {
							$scope.data.canSend = true;
						}
						// $http.get(domain2+"validate/slider?csessionid="+data.csessionid+"&sig="+data.sig+"&token="+nc_token+"&scene="+nc_scene).success(function (result) {
						// 	if (result.ret == "success" && result.data == true) {
						// 		$scope.data.canSend = true;
						// 		$scope.showSilde = true;
						// 		$scope.getSmscode();
						// 	}
						// });
					},
					error: function (s) {},
					verifycallback: function (data) {
						if (data.code == "200") {}
					}
				};
				NoCaptcha.init(nc_option);
				NoCaptcha.setEnabled(true);
			});

        }
        
        // 提交
        $scope.register = function () {
            if($scope.data.canNext) {
               	var registerMobileLocal = localStorage.getItem("registerMobileLocal");
                if (registerMobileLocal == null) {
                    alert("参数丢失,请返回上一步重新输入手机号。");
                    return;
                }
                
               	// 验证短信验证码
                var mobileCode = $scope.user.mobileCode;
			    if(mobileCode == ""){
			      	alert("请输入短信验证码。");
			      	return;
			    }
			
			    // 判断验证码是否一致
			    var registerSmsTimeLocal = localStorage.getItem("registerSmsTimeLocal");

				var nowTime = $mainServices.getServerTimeMilliseconds(); // 服务器时间毫秒数
			    if(((nowTime - registerSmsTimeLocal)/1000/60) > 5){
			      	alert("验证码已经过期。");
			      	return;
			    }

			    localStorage.setItem("registerSms",mobileCode); //短信验证码
			    skip("#/"+$scope.host+"/registerStepThree");
            }
        }

		// 当我们用完模型时，清除它
		$scope.$on('$destroy', function() {
			$(".nc-h5-overlay .stage.stage2").remove();
			$(".nc-h5-overlay._nc").hide();
		});
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$interval','$http','$sce','$timeout'];
    return ctrl;  
      
}); 