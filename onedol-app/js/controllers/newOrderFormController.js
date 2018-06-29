define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$factoryServices,$timeout,$state,$ionicModal,$ionicScrollDelegate,$stateParams) {
    	$scope.getPayList = []; //支付方式
        $scope.getPayListFlag = false; //支付方式是否为空
    	$scope.order = {top:'',integral:0,balanceAll:0,balance:0,summoney_pay_other:0,reactMoney:0}; // 订单对象
        $scope.summoney = $stateParams.num;
    	var base = $controller('baseController', { $scope: $scope });
		$factoryServices.hideOrShowAppContent();

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
            $mainServices.post(url, {sysVersion:str1,resVersion:str2,platform:$mainServices.flagPlatform(),type:'pay',u:localStorage.getItem("uid_local")}, true).success(function (dataJson) {
                if(dataJson == null || dataJson == undefined || dataJson.length == 0){
                    return;
                }
                var len = dataJson.mode.length;
                if(len > 0){
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
                    $scope.getPayListFlag = false;
                } else {
                    $scope.getPayListFlag = true;
                }
            });
        };
        // setAppVersion('2.6.4','');
        $mainServices.getAppVersion();// 获取当前版本号

		// 点击账户余额
		$scope.userBalance = function($event){
			var dom = angular.element($event.srcElement);
			var shiyongyueCheck = dom.attr("checked");
            var paymoney = $scope.summoney;//网银支付金额
            if(shiyongyueCheck == "checked") {
                if($scope.order.balance < 1) {
                    alert("您的余额不足。");
                    dom.removeAttr("checked");
                } else {
                    paymoney = paymoney - $scope.order.balance;
                }
            }
            if(paymoney < 0) {
                paymoney = 0;
            }
            $scope.order.summoney_pay_other = paymoney;
		}

        // 获取订单页面
        $scope.getCartOrder = function () {
        	$scope.order.top = '';
            var u = localStorage.getItem("uid_local");
            var url = basePath + "getProduct_detail_v1.jsp";
            $mainServices.post(url,{'pid':$stateParams.pid},true).success(function (dataJson) {
                if(dataJson == null || dataJson == undefined || dataJson.length == 0){
                    return;
                }

                var proInfo = dataJson.proInfo;
                var now_term = parseInt(proInfo.now_term);// 当前期数
                var pic = $mainServices.getHttpOrlocalProPic(proInfo.pic);
                var ptitle = proInfo.ptitle;
                ptitle = "(第" + now_term + "期)" + ptitle;
                var shengyu = parseInt(proInfo.total_time) - parseInt(proInfo.finish_time);
                if($scope.summoney > shengyu){
                    $scope.summoney = shengyu;
                }
                var num =  $scope.summoney;
                var tmp = '<div class="js_spjt"><div class="js_spjt_img">' +
                    '<img src="' + pic + '" /></div><div class="js_spjt_wz">' +
                    '<p class="ellipsis1">' + ptitle + '</p>' +
                    '<p class="js_spjt_sl"><span style="color:#ff5000">￥1.00/次</span><span style="float:right;color:#ff5000">	&times;' + num + '</span></p>' +
                    '</div></div>';
                $scope.order.top += tmp;

                // 查询用户账户余额、积分
                $mainServices.post(basePath + "getUser.jsp",{t:4,u:u},true).success(function(JSON_list){
		        	if (JSON_list.length > 0) {
                        $scope.order.balanceAll = parseFloat(JSON_list[0].balance); // 账号余额
                        $scope.order.balance = parseInt($scope.order.balanceAll); // 账号余额可用
						$scope.order.summoney_pay_other = $scope.summoney;
                        $scope.order.reactMoney = $scope.summoney;
	                }
		      	})

                var old = null; //用来保存原来的对象
                $("input[name='paystyle']").each(function () {//循环绑定事件
                    if (this.checked) {
                        old = this; //如果当前对象选中，保存该对象
                    }
                    this.onclick = function () {
                        if (this == old) {//如果点击的对象原来是选中的，取消选中
                            this.checked = false;
                            old = null;
                        } else {
                            old = this;
                        }
                    }
                });

            });

        }

		// 初始化
		$scope.getCartOrder();

        // 订单提交
        $scope.orderFormSubmit = function () {
            var u = localStorage.getItem("uid_local");
            var paystyle = $("[name='paystyle']:checked").val(); //支付方式
            var paymoney = $scope.order.summoney_pay_other; //网银支付金额
            var shiyongyueHidden = "0";

            if($("#shiyongyue").attr("checked") == "checked"){
            	shiyongyueHidden = "1";
            }
            //判断是否使用余额
            if(shiyongyueHidden == "1") {
                // 使用余额
                if (paymoney > 0) {
                    if (typeof(paystyle) == "undefined" || paystyle == null || paystyle == "") {
                        alert("请选择支付方式。");
                        return;
                    }
                }
            } else {
                //不使用余额
                if (typeof(paystyle) == "undefined" || paystyle == null || paystyle == "") {
                    alert("请选择支付方式。");
                    return;
                }
            }

            showTankuang('确认提交并支付吗？');

            $("#quxiaoBtn").click(function () {
                $("#tankuangIdDiv").remove();
                $(".reveal-modal-bg").remove();
            });
            $("#querenBtnRollback").click(function () {
                $("#tankuangIdDiv").remove();
                $(".reveal-modal-bg").remove();

                var html_loading = "<div class='onLoadingDiv-class' id='onLoadingDiv'><div id='loadingBg'><div id='loadingtext' class='zjz'><p>数据提交中...</p></div></div></div>";
                $("html").append(html_loading);

                $timeout(function(){
                    // 生成购物订单
                    var url = basePath + "sprogPayForm.jsp";
                    var dataJson = {u:u,paystyle:paystyle,platform:$mainServices.flagPlatform(),shiyongyueHidden:shiyongyueHidden,pid:$stateParams.pid,num:$scope.summoney};
                   	$mainServices.post(url,dataJson,false).success(function(dataJsonRet){
			        	var code = dataJsonRet.code;
                    	if (code == 200) {
	                        $(".onLoadingDiv-class").remove();
	                        var onumber_db = dataJsonRet.onumber;
                            var paymoney_db = dataJsonRet.paymoney;
                            var paystyle_db = dataJsonRet.paystyle;
                            paymoney_db = parseFloat(paymoney_db);
	
	                        var skipUrl_db = dataJsonRet.redirectUrl; //支付完成跳转页面
	
	                        localStorage.setItem("local-o", onumber_db);
	                        if (paymoney_db <= 0) {
	                            // 全部余额支付
	                            alert("支付成功。");
	                            $timeout(function () {
	                                $state.go($scope.host+".payFinish", {});
	                            }, 1500);
	                        } else {
								//提交成功发起支付
								if(paystyle_db != ""){
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
	                                $(".onLoadingDiv-class").remove();
	                                alert("提交失败。");
                                }
	                        }
	                    } else {
	                        $(".onLoadingDiv-class").remove();
	                        if(code == 100){
	                            alert("下手慢了，已退至账户余额。");
	                        } else{
	                            alert(dataJsonRet.message);
	                        }
	
	                    }
			        }).error(function () {
                        $(".onLoadingDiv-class").remove();
                        alert("数据提交失败，请重新提交订单！");
                    });
                }, 1000);
            });
        }

    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$factoryServices','$timeout','$state','$ionicModal','$ionicScrollDelegate','$stateParams'];
    return ctrl;  
      
}); 