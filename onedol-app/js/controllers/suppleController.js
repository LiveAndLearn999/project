define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$timeout,$rootScope,$ionicTabsDelegate,$ionicScrollDelegate) {
        $scope.infoTips = '补单不成功，请联系客服QQ：<a style="color:#de0000;font-size:15px" href="mqqwpa://im/chat?chat_type=crm&amp;uin=938176645&amp;version=1&amp;src_type=web&amp;web_src=http:://www.1yuanxing.com">4006818100</a>';
        $scope.user = {balance:'',onumber:''};

        var base = $controller('baseController', { $scope: $scope });
        var u = localStorage.getItem("uid_local");
        if (u == null || u == "" || typeof(u) == "undefined") {
            alert("请先登录。");
            return;
        }

		var clickFlag = false;
        // 提交
       	$scope.subCardBtn = function (){
       		if(clickFlag){
       			return;
       		}
			var balance = $scope.user.balance;
			var onumber = $scope.user.onumber;
			if (balance == "") {
				alert("请输入充值的金额");
				return;
			}
			if(!$mainServices.yzPositiveNumber(balance)){
				alert("请输入大于零的数字");
				return;
			}
			if (onumber == "") {
				alert("请输入充值交易号");
				return;
			}
			showTankuang("确认提交补单吗？");
			$("#querenBtnRollback").click(function () {
				$("#tankuangIdDiv").remove();
				$(".reveal-modal-bg").remove();
				var url = domain2 + "pay/aliPay/reOrder";
				var dataJson = {uid:u,balance:balance,onumber:onumber,platform:2};
				$mainServices.post(url,dataJson,true).success(function(dataJsonRet){
					var code = dataJsonRet.code;
					var message = dataJsonRet.msg;
					if (code == 200) {
						clickFlag = true; //防止重复提交
						alert(message);
						$timeout(function () {
							$rootScope.hideTabs = "";
							$ionicTabsDelegate.select(4);
						}, 2000);
					} else {
						alert(message);
					}
				});

			});
            

			
            
      	};
        
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$timeout','$rootScope','$ionicTabsDelegate','$ionicScrollDelegate'];  
    return ctrl;  
      
}); 