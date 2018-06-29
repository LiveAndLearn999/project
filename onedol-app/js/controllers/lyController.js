define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$rootScope,$ionicTabsDelegate) {  
		// $scope.user = {type:'1',nickname:'',phone:'',email:'',content:''};
		$scope.user = {type:'1',phone:'',content:''};
		var base = $controller('baseController', { $scope: $scope });
		
		$scope.setLy=function(){
	      	var u = localStorage.getItem("uid_local");
			var type = $scope.user.type;
		    // var nickname = $scope.user.nickname;
		    var phone = $scope.user.phone;
		    // var email = $scope.user.email;
		    var content = $scope.user.content;
	      	// 验证参数
	      	// if(!$mainServices.yzChina(nickname)){
	        	// alert("请输入您的中文昵称。");
	        	// return;
	      	// }
	      	if(!$mainServices.yzPhone(phone) && !$mainServices.yzTelPhone(phone)){
	        	alert("请输入正确的联系方式。");
	        	return;
	      	}
	      	// if(!$mainServices.yzEmail(email)){
	        	// alert("请输入正确的邮箱地址。");
	        	// return;
	      	// }
	      	if(content == "" || content.length < 10){
	        	alert("请输入10个字符以上内容。");
	        	return;
	      	}
	      	var url = basePath + "setLy.jsp";
	      	var dataJson = {'u':u,'type':type,'phone':phone,'content':content};
	      	$mainServices.post(url,dataJson,true).success(function(jsonRet){
	        	if(jsonRet != null){
	          		var code = jsonRet.code;
	          		if(code == 200){
	            		alert("提交成功。");
	            		// $scope.user.nickname = "";
	            		$scope.user.phone = "";
	            		// $scope.user.email = "";
	            		$scope.user.content = "";
						skip('#/' + $scope.host + '/mySeting');
	          		} else {
	            		alert(jsonRet.message);
	          		}
	        	}
	      	});
	    }
		
		
		
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$rootScope','$ionicTabsDelegate'];  
    return ctrl;  
      
}); 