define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices) {  
    	$scope.user = {Sex: ""};
        var base = $controller('baseController', { $scope: $scope });
        var u = localStorage.getItem("uid_local");
        
        //获取性别
        $scope.getSex = function () {
            var url_user = basePath + "getUser.jsp";
            var dataJson_user = {t: 5, u: u};
            $mainServices.post(url_user,dataJson_user,true).success(function(JSON_list_user){
                var sex = "";
                if (JSON_list_user.length > 0) {
                    sex = JSON_list_user[0].sex + "";
                }
                $scope.user.Sex = sex;
            });
        }
        
        //修改性别
        $scope.setSex = function () {
            var sex = $scope.user.Sex;
            var url = basePath + "seting.jsp";
            var dataJson = {'u': u, 't': 2, 'sex': sex};
            $mainServices.post(url,dataJson,true).success(function(jsonRet){
                if (jsonRet != null) {
                    var code = jsonRet.code;
                    if (code == 200) {
                        skip('#/' + $scope.host + '/myInfo');
                    } else {
                        alert("网络异常，请稍后重试");
                    }
                }
            });
        }

        
        // 初始化
        $scope.getSex();
        
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices'];  
    return ctrl;  
      
}); 