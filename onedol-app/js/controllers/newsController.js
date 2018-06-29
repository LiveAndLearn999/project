define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices) {  
		$scope.news = "";
		$scope.list = [];
		var base = $controller('baseController', { $scope: $scope });
		
		// 获取帮助问题
	    $mainServices.post(basePath + "getNews.jsp",{},true).success(function(JSON_list){
	      	if(JSON_list.length > 0){
	      		$scope.news = "";
	        	for(var i=0;i<JSON_list.length;i++){
	          		var ntitle = JSON_list[i].ntitle;
	          		var content = JSON_list[i].content;
	          		var contentPathBasc = basePath + "attached"
	          		content = content.replace(/\/attached/g,contentPathBasc); //编辑器图片路径处理
					if(i == 0){
						$scope.list.push("block");
					} else {
						$scope.list.push("none");
					}
	          		var tmp = "<dl><dt ng-click='exchange("+i+")'><i></i>"+ntitle+"</dt><dd style='display:{{list["+i+"]}}'><i></i>"+content+"</dd></dl>";
	          		$scope.news += tmp;
	       	 	}
	      	}
	    });
		
		$scope.exchange = function(index){
			var len = $scope.list.length;
			if($scope.list[index] == "block"){
				for(var i=0;i<len;i++){
					$scope.list[i] = "none";
				}
			} else {
				for(var i=0;i<len;i++){
					$scope.list[i] = "none";
				}
				$scope.list[index] = "block";
			}
		}
		
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices'];  
    return ctrl;  
      
}); 