define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices) {
    	$scope.data = {result: "", default: ""};
        var base = $controller('baseController', { $scope: $scope });

        var u = localStorage.getItem("uid_local");
        if (u != null && u != "") {
            var birthday = "";
            var url_user = basePath + "getUser.jsp";
            var dataJson_user = {t:11,u:u};

            $mainServices.post(url_user,dataJson_user,true).success(function(JSON_list_user){
                var birthday = "";
                if(JSON_list_user.length > 0){
                    birthday = JSON_list_user[0].birthday + "";
                }
                if (birthday == null || birthday == "" || birthday.indexOf("-") == -1) {
                    $scope.data.default = "1990-01-01";
                } else {
                    $scope.data.default = birthday;
                }
            });
        }


        $scope.setBirthday = function () {
            var beginTime = $scope.data.result.substr(0, 10);
            beginTime = $mainServices.trim(beginTime);
            if (beginTime == ""){
                alert("请选择您的生日");
                return;
            }
            if(new Date(beginTime).getTime() > new Date().getTime()){
                alert("您选择的日期不能大于今天");
                return;
            }
            showTankuang('一年后才能再次修改，确定保存吗');
            $("#querenBtnRollback").click(function () {
                $("#tankuangIdDiv").remove();
                $(".reveal-modal-bg").remove();
                var url = basePath + "setBirtyday.jsp";
                var dataJson = {'u': u, 'birthday': beginTime};
                $mainServices.post(url,dataJson,true).success(function(jsonRet){
                    if (jsonRet != null) {
                        var code = jsonRet.code;
                        if (code == 200) {
                            skip('#/' + $scope.host + '/myInfo');
                        } else if (code == 209) {
                            alert("生日一年只能修改一次");
                        } else {
                            alert("服务器正忙，请稍后重试");
                        }
                    }
                });

            });
        }

        
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices'];
    return ctrl;  
      
}); 