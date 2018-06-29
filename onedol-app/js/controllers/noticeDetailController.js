define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$stateParams) {
		$scope.ntitle = "";
    	$scope.proDetail = "";
    	var nid = $stateParams.nid;
      	var base = $controller('baseController', { $scope: $scope });

		var url = domain2 + "news/gainNewsInfo.do";
		var dataJson = {'nid':nid};
		$mainServices.postNew(url,dataJson,true).success(function(JSONObj) {
			if(JSONObj.ret == "success") {
				var news = JSONObj.news;
				var content = news.content;
				$scope.ntitle = news.ntitle;
				$scope.proDetail = content;
			} else {
				alert(JSONObj.message);
			}
		});

    }  
  
    ctrl.$inject = ['$scope','$controller','$mainServices','$stateParams'];
    return ctrl;  
      
}); 