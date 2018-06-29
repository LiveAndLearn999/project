define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$rootScope,$ionicTabsDelegate) {  
    	var u = $mainServices.getQueryString('u');
    	$scope.data = {};
    	var base = $controller('baseController', { $scope: $scope });
    	if(u == null || u == ""){
		    u = localStorage.getItem("uid_local");
		    if(u == null || u == ""){
			    alert("参数丢失");
			    return;
			}
		}
		
		if(u != null || u != "" || typeof(u) != "undefined"){
		    var url = basePath + "getUser.jsp";
		    var dataJson = {'u':u,'t':6};
		    // 异步加载数据
		    $mainServices.post(url,dataJson,true).success(function(JSON_list){
		      	if(JSON_list.length > 0){
			        var headpic = JSON_list[0].headpic;
			        var username = JSON_list[0].username;
			        var nickname = JSON_list[0].nickname;
			        var sex = JSON_list[0].sex;
			        var address = JSON_list[0].address;
					if(address == ''){
						address = '这家伙很懒，什么都没写。'
					};
			        var hometown = JSON_list[0].hometown;
					if(hometown == ''){
						hometown = '这家伙很懒，什么都没写。'
					};
			        var signature = JSON_list[0].signature;
					if(signature == ''){
						signature = '这家伙很懒，什么都没写。'
					};
			        var experience = JSON_list[0].experience;
			        headpic = $mainServices.getHttpOrlocalHeadPic(headpic);
			
			        $scope.data={headpic:headpic,nickname:nickname,username:$mainServices.substringPhone(username),sex:$mainServices.getSexStr(sex),address:address,hometown:hometown,signature:signature,experience:experience};
			    }
		    });
		}
    	
    	$scope.gotoHome=function(){
		    $rootScope.hideTabs = '';
		    $ionicTabsDelegate.select(0);
		}
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$rootScope','$ionicTabsDelegate'];  
    return ctrl;  
      
}); 