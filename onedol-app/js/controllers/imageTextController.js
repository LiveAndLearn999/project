define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$stateParams) {
    	$scope.proDetail = "";
    	var pid = $stateParams.pid;
      	var base = $controller('baseController', { $scope: $scope });

		var url = basePath + "getProduct_detail_v1.jsp";
		var dataJson = {'pid':pid,'pterm':''};
		$mainServices.post(url,dataJson,true).success(function(jsonObj) {
			if(jsonObj != null) {
				var proInfo = jsonObj.proInfo;
				var content = proInfo.content;
				$scope.proDetail = content;
			}
		});

    }  
  
    ctrl.$inject = ['$scope','$controller','$mainServices','$stateParams'];
    return ctrl;  
      
}); 