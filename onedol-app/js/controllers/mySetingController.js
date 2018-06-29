define(function () {  
    'use strict';  
    function ctrl($scope,$rootScope,$controller,$mainServices,$factoryServices,$state,$ionicTabsDelegate) {  
    	$scope.yyversion = ""; // 应用版本号
        $scope.zyversion = ""; // 资源版本号
        $scope.isShowLog = false; // 是否显示退出登录
        var base = $controller('baseController', { $scope: $scope });

        //  判断是否显示退出登录
        var u = localStorage.getItem("uid_local"); //本地存储------------------------
        if (u != null && u != "" && typeof(u) != "undefined") {
            $scope.isShowLog = true;
        }

        window.setAppVersion = function(str1,str2){
            if(str1 != null){
                $scope.yyversion = str1;
            }
            if(str2 != null){
                $scope.zyversion = str2;
            }
        };
        $mainServices.getAppVersion();// 获取当前版本号

        //  意见反馈
        $scope.proposal = function () {
            $factoryServices.checkLogin("#/mine/myIndex",'#/'+$scope.host+'/log', '#/'+$scope.host+'/ly');
        };
        // 用户退出登录
        $scope.userLogOut = function () {
            if(u != null && u != "" && typeof(u) != "undefined") {
                localStorage.removeItem("uid_local");
                $mainServices.userLogout(u.substring(u.indexOf('_')+1,u.indexOf('.')));
                localStorage.removeItem("clientTime");
            }
            $rootScope.cartNumber = 0;
            $rootScope.hideTabs = '';
            localStorage.removeItem("invitationCode");
            $ionicTabsDelegate.select(4);
        }
        // 安全设置
        $scope.mySetingSafe = function () {
            if (u != null && u != "" && typeof(u) != "undefined") {
                $state.go("mine.mySetingSafe", {});
            } else {
                $state.go("mine.log", {});
            }
        }
        // 隐私设置
        $scope.mySetingSecret = function () {
            if (u != null && u != "" && typeof(u) != "undefined") {
                $state.go("mine.mySetingSecret", {});
            } else {
                $state.go("mine.log", {});
            }
        }
    }  
  
    ctrl.$inject = ['$scope','$rootScope', '$controller','$mainServices','$factoryServices','$state','$ionicTabsDelegate'];  
    return ctrl;  
      
}); 