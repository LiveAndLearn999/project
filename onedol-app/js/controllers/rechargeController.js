define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$rootScope,$ionicTabsDelegate,$timeout) {  
    	$scope.getPayList = []; // 支付方式列表
		$scope.wxzz = true;
    	$scope.user = {balance:'',summoney:''}; // 账户余额、输入金额
		var base = $controller('baseController', { $scope: $scope });
		
		var u = localStorage.getItem("uid_local");
        if($mainServices.isNull(u)){
            alert("请先登录。");
            return;
        }
		// 获取账户余额
        var url_user = basePath + "getUser.jsp";
        var dataJson_user = {t:14,u:u};
        $mainServices.post(url_user, dataJson_user, true).success(function (JSON_list_user) {
            var balance = "";
            if(JSON_list_user.length > 0){
                balance = JSON_list_user[0].balance + "";
            }
            $scope.user.balance = balance;
        });

		// 获取当前版本号的回调
		window.setAppVersion = function(str1,str2){
			if(str1 == null){
				str1 = '';
			}
			if(str2 == null){
				str2 = '';
			}
			// 获取支付方式
			var url = basePath + "getPayMode.jsp";
			$mainServices.post(url, {sysVersion:str1,resVersion:str2,platform:$mainServices.flagPlatform(),type:'recharge',u:localStorage.getItem("uid_local")}, true).success(function (dataJson) {
				if($mainServices.isNull(dataJson)){
					return;
				}
				var len = dataJson.mode.length;
				for(var i=0;i<len;i++){
					if(isiOS){
						if(dataJson.mode[i].show != "0"){
							$scope.getPayList.push(dataJson.mode[i]);
						};
					} else if(isAndroid){
						if(dataJson.mode[i].show != "1"){
							$scope.getPayList.push(dataJson.mode[i]);
						};
					}
				}
			});
		};
		// setAppVersion('2.6.4','201708311705');
		$mainServices.getAppVersion();// 获取当前版本号
        
        // 选择金额
        $scope.exchange = function(obj){
        	if(typeof obj != 'undefined'){
		      	obj = obj.toElement;
		    }
        	$(obj).addClass('cur').siblings().removeClass('cur');
			$scope.user.summoney = '';
        }
        $scope.focusInput = function(obj){
        	if(typeof obj != 'undefined'){
		      	obj = obj.srcElement;
		    }
			$(obj).parent().addClass('cur').siblings().removeClass('cur');
        };
//      $scope.payEd = function(val){
//			$("#paystyle").val(val);
//		};
		$scope.changePayStyle = function(val) {
			if(val == '4'){
				$scope.wxzz = false;
				if($('.radios div.cur').length == 0){
					$scope.user.summoney = '';
				}
			} else {
				$scope.wxzz = true;
			};
		};
		// 提交
		$scope.subBtn = function(obj){
            if($mainServices.isNull(u)){
                alert("请先登录。");
                return;
            }
            var summoney = 0;
            var summoneyText = $scope.user.summoney;
            if($('.radios div.cur').length > 0){
            	var index = $('.radios div.cur').index();
            	if(index != 4){
            		summoney = $('.radios div.cur').attr("data-val");
            	} else {
            		if (summoneyText == '' || $mainServices.isNull(summoneyText) || parseFloat(summoneyText) < 1 || !$mainServices.yzNumber(summoneyText)) {
	                    alert("请选择或输入正确的充值金额。");
	                    return;
	                } else {
	                    summoney = summoneyText;
	                }
            	}
            	
            }
			if (summoney == '' || summoney == 0) {
				alert("请选择或输入充值金额。");
				return;
			}
			var paystyle = $("[name='paystyle']:checked").val(); //支付方式
			if (typeof(paystyle) == "undefined" || paystyle == null || paystyle == "") {
                alert("请选择支付方式。");
                return;
            }

			var html_loading = "<div class='onLoadingDiv-class' id='onLoadingDiv'><div id='loadingBg'><div id='loadingtext' class='zjz'><p>数据提交中...</p></div></div></div>";
            $("html").append(html_loading);
            $timeout(function () {
                //生成充值订单
                var url = basePath + "rechargeForm.jsp";
                var dataJson = {u:u,paystyle:paystyle,summoney:summoney,platform:$mainServices.flagPlatform()};
                $mainServices.post(url,dataJson,true).success(function(dataJsonRet){
                	var code = dataJsonRet.code;
	                $(".onLoadingDiv-class").remove();
	                if (code == 200) {
	                    var onumber_db = dataJsonRet.onumber;
	                    var paymoney_db = dataJsonRet.paymoney;
	                    var paystyle_db = dataJsonRet.paystyle;
						var skipUrl_db = dataJsonRet.redirectUrl; //支付完成跳转页面
	                    // 本地存储
	                    localStorage.setItem("local-o", onumber_db);
	                    // 提交成功发起支付
	                    if(paystyle_db != "") {
							if(skipUrl_db != ""){
								$mainServices.iosBrowerPay(skipUrl_db);
								setTimeout(function () {
									showTankuang("是否完成支付？");
									$("#querenBtnRollback").attr("id", "querenBtnRollback222");
									$("#querenBtnRollback222").attr("onclick", "closeTankuang();skip('#/" + $scope.host + "/payFinish')");
								}, 2000);
							} else {
								var isNativePay = $("[name='paystyle']:checked").attr("attr-type"); //是否是原生支付
								if(isNativePay == 1 || isNativePay == '1'){
									if(paystyle_db == 9 || paystyle_db == '9'){
										// 京东原生支付
										var signDataStr = "merchant="+dataJsonRet.merchant+"&orderId="+dataJsonRet.orderId+"&key=pDvdkozMmDiwKvxz3KejPjip1OgWlyRI";
										var signData = hex_md5(signDataStr).toLowerCase();
										var content = JSON.stringify({orderId:dataJsonRet.orderId,appId:dataJsonRet.appId,signData:signData,merchant:dataJsonRet.merchant});
									} else if(paystyle_db == 10 || paystyle_db == '10'){
										// 微信原生支付
										var content = dataJsonRet.token_id;
									}
									setTimeout(function () {
										showTankuang("是否完成支付？");
										$("#querenBtnRollback").attr("id", "querenBtnRollback222");
										$("#querenBtnRollback222").attr("onclick", "closeTankuang();skip('#/" + $scope.host + "/payFinish')");
									}, 3000);
									$mainServices.nativePay(paystyle_db,content);
								} else {
									alert(dataJsonRet.message);
								}
							}
	                    } else {
	                        alert("提交失败。");
	                    }
	                } else {
	                    alert(dataJsonRet.message);
	                }
                }).error(function () {
					$(".onLoadingDiv-class").remove();
					alert("数据提交失败，请重新充值！");
				});
                
            },1000);

        };
		
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$rootScope','$ionicTabsDelegate','$timeout'];  
    return ctrl;  
      
}); 