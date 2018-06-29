define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$stateParams,$timeout,$state,$ionicHistory) {
    	$scope.user= {count:''};
        $scope.placeholder = "";
        var getInfoData = {};
    	var base = $controller('baseController', { $scope: $scope });
        var id = $stateParams.id+'';
        //首次进入获取信息
        $mainServices.postNew(domain2+"orderDetailPeople/selectProductInfo.do",{productID:id},true).success(function(dataJsonRet){
            if(dataJsonRet.ret == "success"){
                getInfoData = dataJsonRet.data;
                $scope.placeholder ="请输入充值的"+dataJsonRet.data.type;
            } else {
                alert("获取商品信息失败");
            }
        });


        // 提交
        $scope.submit = function () {
            // 获取参数
            var account = $scope.user.count+"";
            //验证参数合法性
            if (account == "") {
                alert("请输入"+getInfoData.type);
                return;
            }
            showVirtualSubmitTankuang(getInfoData.type,getInfoData.costPrice,account);
            $("#querenBtnRollback").click(function () {
                $("#tankuangIdDiv").remove();
                $(".reveal-modal-bg").remove();
                var u = localStorage.getItem("uid_local"); // 本地存储
                var mob = u.substring(u.indexOf("_")+1,u.indexOf("."));
                var bz = hex_md5(hex_md5(account+pid+pterm+mob));
                var dataJson = {bz:bz,pid:pid,pterm:pterm,ptitle:account};

                $mainServices.postNew(domain2+"validate/getInsertVirtualCurrency.do",dataJson,true).success(function(dataJsonRet){
                    if(dataJsonRet.ret == "success"){
                        $mainServices.get(domain2+"recharge/product/"+pid+"/term/"+pterm,true).success(function(dataJson){
                            var code = dataJson.errorCode;
                            var message = dataJson.errorMsg;
                            alert(message);
                            if (code == "00") {
                                setTimeout(function () {
                                    $ionicHistory.goBack(-1);
                                },1000);
                            }
                        });
                    } else {
                        alert(dataJsonRet.message);
                    }
                });

            });

        }

    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$stateParams','$timeout','$state','$ionicHistory'];
    return ctrl;  
      
}); 