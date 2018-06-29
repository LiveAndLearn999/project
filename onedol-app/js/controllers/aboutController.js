define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices) {  
		$scope.ntitle = "";
    	$scope.myText = "";
    	var id = $mainServices.getQueryString('id');
		var base = $controller('baseController', { $scope: $scope });
		
		if(id == '1'){
      		$scope.ntitle = "关于我们";
    	} else if(id == '9'){
      		$scope.ntitle = "客服热线";
    	} else if(id == '10'){
      		$scope.ntitle = "服务协议";
    	}
		
		if(id != null && id != "" && typeof(id) != "undefined"){
      		var url =  basePath + "getAbout.jsp";
      		var dataJson = {'id':id};
      		$mainServices.post(url,dataJson,true).success(function(JSON_list){
        		if(JSON_list.length > 0){
			        var content = JSON_list[0].content;
			        var contentPathBasc = basePath + "attached"
			        content = content.replace(/\/attached/g,contentPathBasc);//编辑器图片路径处理
			        $scope.myText = content;
        		}
      		});
    	}
		
		
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices'];  
    return ctrl;  
      
}); 