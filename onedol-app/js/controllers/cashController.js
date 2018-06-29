define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$timeout,$rootScope,$ionicTabsDelegate,$ionicScrollDelegate) {  
    	$scope.showTipAry = ["czmx",""];
        $scope.transfer = {};
        $scope.showTips = false;
        $scope.showTipYHK = false;
        $scope.showTipWX = false;
        $scope.isWithdraw = false; // 是否显示可以提现
        $scope.user = {sum:'',city:'',name:'',idcard:'',bankcard:'',bank:'',bankDeName:'',traderpassword:''};
		$scope.userwx = {sum:'',name:'',idcard:'',traderpassword:''};
		$scope.isSet = false;
		$scope.isForget = false;
        var base = $controller('baseController', { $scope: $scope });
        var redeem;
        var indexYHK = 0,indexWX = 0;
        var u = localStorage.getItem("uid_local");
        if (u == null || u == "" || typeof(u) == "undefined") {
            alert("请先登录。");
            return;
        }
		// 查询用户余额
        var balance = "";
		$mainServices.post(basePath + "getUser.jsp",{t:14,u:u},true).success(function(JSON_list_user){
			if(JSON_list_user.length > 0){
			    balance = JSON_list_user[0].balance + "";
			}
			$scope.balance = "￥" + balance;
	   	});
		$mainServices.post( basePath + "getUsercommission.jsp",{uid:u},true).success(function(JSON_list){
			if(JSON_list.iszfmm == 0){
				// 未设置交易密码
				$scope.isSet = true;
			} else {
				// 忘记交易密码
				$scope.isForget = true;
				$mainServices.post( basePath + "getCash.jsp",{u:u},false).success(function(dataJsonRet){
					if(dataJsonRet.bankcard == null || dataJsonRet.bankcard == undefined){
						return;
					}
					$scope.user.city = dataJsonRet.city;
					$scope.user.name  = dataJsonRet.name;
					$scope.user.idcard = dataJsonRet.idcard;
					$scope.user.bankcard = dataJsonRet.bankcard;
					$scope.user.bank = dataJsonRet.bank;
					$scope.user.bankDeName = dataJsonRet.bankname;
				});
			}
		});
		// 加载提现方式
        $mainServices.post(basePath + "getRedeemInfo.jsp",{},false).success(function(dataJsonRet){
        	if(dataJsonRet == null || dataJsonRet == undefined || dataJsonRet == ""){
        		$scope.isWithdraw = true;
				$scope.isWithdrawInfo = '温馨提示：当前无法提现！';
        		return;
        	}
        	redeem = dataJsonRet.redeem;
        	if(redeem.length == 0){
        		$scope.isWithdraw = true;
				$scope.isWithdrawInfo = dataJsonRet.message.message;
        	} else if(redeem.length == 1){
        		if(redeem[0].id == "1"){
        			// 提现到银行卡
        			indexYHK = 0;
        			$scope.showTipYHK = true;
        			$scope.transfer.infoYHK = redeem[0].desc;
        		} else {
        			// 提现到微信
        			indexWX = 0;
        			$scope.showTipWX = true;
        			$scope.transfer.infoWX = redeem[0].desc;
        		}
        	} else{
        		indexYHK = 0;
        		indexWX = 1;
        		$scope.showTips = true;
        		$scope.showTipYHK = true;
        		$scope.txTypes = [{i:0,index:1,name:redeem[0].name,width:'50%'},{i:1,index:2,name:redeem[1].name,width:'50%'}];
        		$scope.transfer.infoYHK = redeem[0].desc;
        		$scope.transfer.infoWX = redeem[1].desc;
        	}
 
        });
        
        $scope.tabAc=function(val){
          	if(val == 1){
            	$scope.showTipAry = ["czmx",""];
            	$scope.showTipYHK = true;
        		$scope.showTipWX = false;
          	} else {
            	$scope.showTipAry =	["","czmx"];
            	$scope.showTipYHK =	false;
        		$scope.showTipWX = true;
          	}
          	$ionicScrollDelegate.resize();
        }
        var clickFlag = false;
        // 提交
       	$scope.subCardBtn = function (val){
       		if(clickFlag){
       			return;
       		}
       		if(val == 0){
       			var sum = $scope.user.sum;
            	// 判断可提现余额
            	balance = parseFloat(balance);
            	if (balance < 100) {
                	alert("可提现金额不足100元");
                	return;
            	}
            	if (sum == "") {
                	alert("请输入提现金额");
                	return;
            	}
            	sum = parseFloat(sum);
            
            	if (sum < 100) {
                	alert("最低提现100元");
                	return;
            	}
            	if (sum % 100 != 0) {
                	alert("必须是100的整数倍");
                	return;
            	}
            	if (sum > balance) {
                	alert("余额不足");
                	return;
            	}
            	// 验证银行信息
            	var city = $scope.user.city;
            	var name = $scope.user.name;
	            var idcard = $scope.user.idcard;
	            var bankcard = $scope.user.bankcard;
	            var bank = $scope.user.bank;
	            var bankDeName = $scope.user.bankDeName;
	            var traderpassword = $scope.user.traderpassword;
            	if (city == "") {
                	alert("请输入所在城市名称。");
                	return;
            	}
            	if (name == "") {
	                alert("请输入开户人姓名。");
	                return;
	            }
	            if (!$mainServices.yzIdCard(idcard)) {
	                alert("请输入有效的身份证号。");
	                return;
	            }
	            if (bankcard == "") {
	                alert("请输入银行卡号。");
	                return;
	            }
	            if (bankcard.length < 15 || bankcard.length > 19) {
	                alert("银行卡号在15至19位之间。");
	                return;
	            }
	            if (bank == "") {
	                alert("请输入银行名称。");
	                return;
	            }
	            if (bankDeName == "") {
	                alert("请输入开户银行。");
	                return;
	            }
	            if (traderpassword == "") {
	                alert("请输入交易密码。");
	                return;
	            }
            	var tax = parseFloat(redeem[indexYHK].tax);
            	var passMD5 = hex_md5(traderpassword);
            	showInfoTankuang(redeem[indexYHK].name,sum,tax+"%",sum*(100-tax)/100);
		       	$("#querenBtnRollback").click(function () {
                  	$("#tankuangIdDiv").remove();
		          	$(".reveal-modal-bg").remove();
		          	// 生成提现申请记录
	            	var url = basePath + "cashnew.jsp";
	            	var dataJson = {u: u, sum: sum,city:city, name: name, idcard: idcard, bankcard: bankcard, bankname: bank, bank: bankDeName,traderpassword: passMD5,txtype:1, platform: 2};
	            	$mainServices.post(url,dataJson,true).success(function(dataJsonRet){
	            		var code = dataJsonRet.code;
		            	var message = dataJsonRet.message;
		            	if (code == 200) {
		            		clickFlag = true; //防止重复提交
		                	alert("提交成功。");
		                	$timeout(function () {
		                    	$rootScope.hideTabs = "";
		                   		$ionicTabsDelegate.select(4);
		                	}, 2000);
		            	} else {
		                	alert(message);
		           		}
	            	});
		
		        });
            
       		} else if(val == 1){
       			var sum = $scope.userwx.sum;
		        // 判断可提现余额
		        balance = parseFloat(balance);
		        if (balance < 100) {
		            alert("可提现金额不足100元。");
		            return;
		        }
		        if (sum == "") {
		            alert("请输入提现金额");
		            return;
		        }
		        sum = parseFloat(sum);
            
		        if (sum < 100) {
		            alert("最低提现100元");
		            return;
		        }
		        if (sum % 100 != 0) {
		            alert("必须是100的整数倍。");
		            return;
		        }
		        if (sum > balance) {
		           	alert("余额不足。");
		            return;
		        }
            
		        var name = $scope.userwx.name;
		        var idcard = $scope.userwx.idcard;
		        var traderpassword = $scope.userwx.traderpassword;
		        if (name == "") {
		            alert("请输入开户人姓名。");
		            return;
		        }
		        if (!$mainServices.yzIdCard(idcard)) {
		            alert("请输入有效的身份证号。");
		            return;
		        }
		        if (traderpassword == "") {
		            alert("请输入交易密码。");
		            return;
		        }
		        var tax = parseFloat(redeem[indexWX].tax);
		        showInfoTankuang(redeem[indexWX].name,sum,tax+"%",sum*(100-tax)/100);
		        var passMD5 = hex_md5(traderpassword);
            	$("#querenBtnRollback").click(function () {
                    $("#tankuangIdDiv").remove();
		          	$(".reveal-modal-bg").remove();
		          	// 生成提现申请记录
			        var url = basePath + "cashnew.jsp";
			        var dataJson = {u: u, sum: sum,city:"", name: name, idcard: idcard, bankcard:"", bankname:"", bank:"",traderpassword: passMD5,txtype:2, platform: 2};
	            	$mainServices.post(url,dataJson,true).success(function(dataJsonRet){
	            		var code = dataJsonRet.code;
		            	var message = dataJsonRet.message;
		            	if (code == 200) {
		                	clickFlag = true; //防止重复提交
		                	alert("提交成功。");
		                	$timeout(function () {
		                    	$rootScope.hideTabs = " ";
		                    	$ionicTabsDelegate.select(4);
		                	}, 2000);
		            	} else {
		                	alert(message);
		            	}
	            	});
		        });
            
       		}
			
            
      	};
        
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$timeout','$rootScope','$ionicTabsDelegate','$ionicScrollDelegate'];  
    return ctrl;  
      
}); 