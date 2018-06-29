define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$rootScope,$ionicTabsDelegate,$timeout) {
        $scope.myVal = "";
		var base = $controller('baseController', { $scope: $scope });

        var url = basePath + "getRule.jsp";
        var dataJson = {type:1};
        $mainServices.post(url,dataJson,true).success(function(jsonObj) {
            if(jsonObj != null) {
                $scope.myVal = jsonObj.rule;
            }
        });
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$rootScope','$ionicTabsDelegate','$timeout'];  
    return ctrl;  
      
}); 