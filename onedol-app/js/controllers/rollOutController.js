define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$timeout,$rootScope,$ionicTabsDelegate,$ionicScrollDelegate) {  
        $scope.user = {sum:'',traderpassword:''};
		$scope.isSet = false;
		$scope.isForget = false;
        var base = $controller('baseController', { $scope: $scope });
        // 查询用户余额
        var u = localStorage.getItem("uid_local");
        if (u == null || u == "" || typeof(u) == "undefined") {
            alert("请先登录。");
            return;
        }
		$mainServices.post( basePath + "getUsercommission.jsp",{uid:u},true).success(function(JSON_list){
			$scope.balance = JSON_list.yongjin;
			if(JSON_list.iszfmm == 0){
				$scope.isSet = true;
			} else {
				$scope.isForget = true;
			}
	   	});
	   	
		var clickFlag = false;
        // 提交
       	$scope.subCardBtn = function (){
       		if(clickFlag){
       			return;
       		}
       		var sum = $scope.user.sum;
            // 判断可提现余额
            var balance = parseFloat($scope.balance);
            if (balance < 1) {
                alert("佣金余额不足1元。");
                return;
            }
            if($mainServices.isNull(sum)) {
                alert("请输入转出金额");
                return;
            }
            if(parseFloat(sum) < 1 || !$mainServices.yzNumber(parseFloat(sum))) {
	            alert("请输入正确的转出金额。");
	            return;
	        }
            if (parseFloat(sum) > balance) {
                alert("转出金额必须小于等于佣金余额。");
                return;
            }
	        var traderpassword = $scope.user.traderpassword;
	        if (traderpassword == "") {
	            alert("请输入交易密码。");
	            return;
	        }
            var passMD5 = hex_md5(traderpassword);
	        var url = basePath + "commissionCash.jsp";
	        var dataJson = {uid: u,sum:sum,traderpassword:passMD5,platform: 2};
	        $mainServices.post(url,dataJson,true).success(function(dataJsonRet){
		        var code = dataJsonRet.code;
			    var message = dataJsonRet.message;
			    if (code == 200) {
			        clickFlag = true; //防止重复提交
			        alert("转出成功。");
			        $timeout(function () {
			            skip('#/' + $scope.host + '/commission');
			        }, 1500);
			    } else {
			        alert(message);
			    }
		    });	
            
      	};
        
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$timeout','$rootScope','$ionicTabsDelegate','$ionicScrollDelegate'];  
    return ctrl;  
      
}); 