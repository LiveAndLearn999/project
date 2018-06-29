define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices) {  
    	$scope.user = {nickname: ""};
        var base = $controller('baseController', { $scope: $scope });
        var u = localStorage.getItem("uid_local");
        
        // 获取昵称
        $scope.getNickname = function () {
            var url_user =  basePath + "getUser.jsp";
            var dataJson_user =  {t: 2, u: u};
            $mainServices.post(url_user,dataJson_user,true).success(function(JSON_list_user){
                var nickname = "";
                if (JSON_list_user.length > 0) {
                    nickname = JSON_list_user[0].nickname + "";
                }
                $scope.user.nickname = nickname;
            });
        }
        
        // 修改昵称
        $scope.setNickname = function () {
            var nickname = $mainServices.trim($scope.user.nickname);
            //验证参数
            if (nickname.length < 2) {
                alert("昵称不能小于2个字符");
                return;
            }
            if (nickname.length > 10) {
                alert("昵称不能大于10个字符");
                return;
            }
            if (!$mainServices.yzChinaOrEnglish(nickname)) {
                alert("请输入您的合法中英文昵称");
                return;
            }
            var url = basePath + "seting.jsp";
            var dataJson = {'u': u, 't': 1, 'nickname': nickname};
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
        $scope.getNickname();
        
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices'];  
    return ctrl;  
      
}); 