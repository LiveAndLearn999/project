define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$stateParams) {
    	$scope.data = [];
        var retype = $stateParams.type+''; //来源
    	var base = $controller('baseController', { $scope: $scope });
    	var u = localStorage.getItem("uid_local");
        if (u == null || u == '') {
            alert("请先登录。");
            return;
        }
		
		//异步加载数据 。
        $mainServices.post(basePath + "userAddress.jsp", {'u':u}, true).success(function (JSON_list) {
            if (JSON_list.length > 0) {
                for (var i = 0; i < JSON_list.length; i++) {
                    var aid = JSON_list[i].aid;
                    var name = JSON_list[i].name;
                    var mobile = JSON_list[i].mobile;
                    var sheng = JSON_list[i].provinceId;
                    var shi = JSON_list[i].cityId;
                    var qu = JSON_list[i].districtId;
                    var address = JSON_list[i].address;
                    var isdefault = JSON_list[i].isdefault;

                    var add = sheng + " " + shi + " " + qu + " " + address;

                    var tmp_def = "";
                    if (isdefault == 1 && retype != "1") {
                        tmp_def = '<img src="img/icon_xzdh1.png">';
                    }
                    $scope.data.push({tmp_def:tmp_def,aid:aid,name:name,mobile:mobile,add:add});
                }
            }
        });
        
        $scope.toAddSubmit = function (aid) {
            skip("#/" + $scope.host + "/userAddressSubmit?aid=" + aid);
        }
        
        $scope.delAdd = function (aid) {
            var u = localStorage.getItem("uid_local");
            showTankuang('确认删除吗？');
            $("#querenBtnRollback").click(function () {
                $("#tankuangIdDiv").remove();
                $(".reveal-modal-bg").remove();
                var url = basePath + "userAddressSubmit.jsp";
                var dataJson = {type_:3,aid:aid,u:u};
                $mainServices.post(url,dataJson, true).success(function (dataJsonRet) {
		            var code = dataJsonRet.code;
	                var message = dataJsonRet.message;
	                alert(message);
	                if (code == 200) {
	                    for (var i = 0; i < $scope.data.length; i++) {
	                        if ($scope.data[i].aid == aid) {
	                            $scope.data.splice(i, 1);
//	                            $scope.$apply();
	                        }
	                    }
	                }
		        });
                
            });
        }
	    
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$stateParams'];
    return ctrl;  
      
}); 