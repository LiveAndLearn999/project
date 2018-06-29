define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$rootScope,$ionicTabsDelegate,$ionicNavBarDelegate) {  
    	var base = $controller('baseController', { $scope: $scope });

        localStorage.setItem("buyRecordType",1);
		var o = localStorage.getItem("local-o");
		if (o != null && o != "") {
            var url = basePath + "getOrderPay.jsp";
            var dataJson = {o:o,host:$scope.host};
            $mainServices.post(url, dataJson,true).success(function(dataText) {
                if (dataText.trim() != "") {
                    $scope.myVal = dataText.trim();
                }
            });
        }
		
		$scope.gotoHome = function (){
            $rootScope.hideTabs = "";
            $ionicTabsDelegate.select(0);
        }
        $ionicNavBarDelegate.showBackButton(false); //隐藏返回按钮

		$scope.$on("$destroy", function(){
         	$ionicNavBarDelegate.showBackButton(true); //显示返回按钮
        });
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$rootScope','$ionicTabsDelegate','$ionicNavBarDelegate'];  
    return ctrl;  
      
}); 