define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$stateParams,$timeout,$state,$ionicHistory) {
    	$scope.user= {count:''};
        $scope.placeholder = "";
        var getInfoData = {};
    	var base = $controller('baseController', { $scope: $scope });
        var pid = $stateParams.pid+'';
        var pterm = $stateParams.pterm+'';
        // var pid = $mainServices.getQueryString('pid');
        // var pterm = $mainServices.getQueryString('pterm');
        //首次进入获取信息
        $mainServices.postNew(domain2+"orderDetailPeople/selectProductInfo.do",{productID:pid},true).success(function(dataJsonRet){
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
                                    $ionicHistory.goBack();
                                    // var backAddress = localStorage.getItem("backFaHuoAddress");
                                    // var strs= backAddress.split(",");
                                    // localStorage.removeItem("backFaHuoAddress");
                                    // if(strs.length == 3){
                                    //     skip('#/'+$scope.host+'/'+strs[0]+'?hd='+parseInt(strs[1]));
                                    // } else if(strs.length == 2){
                                    //     $state.go($scope.host+"."+strs[0],{hd:parseInt(strs[1])},{reload:true});
                                    // } else {
                                    //     $state.go($scope.host+"."+strs[0],{pid:pid,pterm:pterm},{reload:true});
                                    // }
                                },2000);
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