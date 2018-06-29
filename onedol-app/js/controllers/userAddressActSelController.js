define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$stateParams,$state,$ionicHistory,$timeout) {
    	$scope.addressList = [];
    	var base = $controller('baseController', { $scope: $scope });
    	var gaid;
    	// 查询用户地址列表
        function selectAddressSel() {
            var u = localStorage.getItem("uid_local");
            if (u == null || u == '') {
                alert("请先登录。");
                return;
            }
            var url = basePath + "userAddress.jsp";
            // 异步加载数据
            $mainServices.post(url, {'u': u}, true).success(function (JSON_list) {
                if (JSON_list.length > 0) {
                    for (var i = 0; i < JSON_list.length; i++) {
                        var aid = JSON_list[i].aid;
                        var name = JSON_list[i].name;
                        var phone = JSON_list[i].mobile;
                        var sheng = JSON_list[i].provinceId;
                        var shi = JSON_list[i].cityId;
                        var qu = JSON_list[i].districtId;
                        var address = JSON_list[i].address;
                        var isdefault = JSON_list[i].isdefault;

                        var add = sheng + " " + shi + " " + qu + " " + address;

                        var tmp_def = "";
                        if (isdefault == 1) {
                        	gaid = aid;
                            tmp_def = 'img/icon_xzdh1.png';
                        }
                        
                        $scope.addressList.push({aid:aid,name:name,phone:phone,sheng:sheng,shi:shi,qu:qu,address:address,addr:add,tmp_def:tmp_def});
                    }
                }
            });
			
        }
        
        $scope.selectAdd = function (aid,index) {
            gaid = aid;
            for(var t=0;t<$scope.addressList.length;t++){
                if(t == index)
                    $scope.addressList[t].tmp_def = 'img/icon_xzdh1.png';
                else
                    $scope.addressList[t].tmp_def = '';
            }
        }
        
        // 确认选择
        $scope.addSelQueren = function () {
            if (gaid == "" || gaid == null) {
                alert("请选择收货地址。");
                return;
            }

            showTankuang('确认完善地址吗，操作后不可更改。');

            $("#querenBtnRollback").click(function () {
                $("#tankuangIdDiv").remove();
                $(".reveal-modal-bg").remove();
                var id = $stateParams.id;
                var u = localStorage.getItem("uid_local");
                var url = domain2 + "draw/confirmAddress.do";
                var dataJson = {'id':id,'winnerid':u,'platform':1,'aid': gaid};
                $mainServices.postNew(url,dataJson,true).success(function(JSONObjRet){
                    var message = JSONObjRet.message;
                    alert(message);
                    if(JSONObjRet.ret == "success"){
                        $timeout(function () {
                            $ionicHistory.goBack(-1);
                        }, 1000);
                    }
                });

            });
        }
        
        // 初始化
        selectAddressSel();
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$stateParams','$state','$ionicHistory','$timeout'];
    return ctrl;  
      
}); 