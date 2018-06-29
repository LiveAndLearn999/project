define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$rootScope,$ionicTabsDelegate) {  
    	$scope.userkeylist = [];// 用户搜索列表
		$scope.gjkeylist = [];// 热门搜索列表
		$scope.index = {key:""};// 搜索框的值
		$scope.isDelDiv = false;
		var base = $controller('baseController', { $scope: $scope });
		
		function getSearch(){
		    var uid = localStorage.getItem("uid_local");
		    if(uid == null){
		       return;
		    }
		    var url = basePath + "getSearch.jsp";
		    var dataJson = {'u':uid};
		    $scope.showTipAry = ["ss_on",""];
		    $scope.showDiv = ["","hide"];
		    // 异步加载数据
		    $mainServices.post(url, dataJson,true).success(function(JSONObjRet){
		      	var JSON_list_u = JSONObjRet.user_search;
		      	var JSON_list_hot = JSONObjRet.hot_search;
		      	// 用户搜索
		      	if(JSON_list_u.length > 0){
		        	for(var i=0;i<JSON_list_u.length;i++){
		          		var key = JSON_list_u[i].key;
		         	 	$scope.userkeylist.push({key:key});
		          		$scope.isDelDiv = true;
		        	}
		      	}

		      	// 热门搜索
		      	if(JSON_list_hot.length > 0){
		        	for(var i=0;i<JSON_list_hot.length;i++){
		          		var key = JSON_list_hot[i].key;
		          		$scope.gjkeylist.push({key:key});
		        	}
		      	}
		    });
		}
		
		// 初始化
		getSearch();
		
		// 最近-热门 切换
		$scope.searchTab = function(t){
		    if(t == 1){
		      	$scope.showDiv=["","hide"];
		      	if($scope.userkeylist.length > 0){
		        	$scope.isDelDiv = true;
		      	}
		      	$scope.showTipAry = ["ss_on",""];
		    } else if(t == 2){
		      	$scope.showDiv = ["hide",""];
		      	$scope.isDelDiv = false;
		      	$scope.showTipAry = ["","ss_on"];
		    }
		}
		// 产品搜索
		$scope.search = function(key_click){
		    var key = "";
		    if(key_click != null && key_click != ""){
		       key = key_click;
		    }else{
		       key = $scope.index.key;
		    }
		    localStorage.setItem("serarch_key",key);//本地存储
		    // 搜索记录插入
		    var uid = localStorage.getItem("uid_local");
		    if(uid != null && uid != null){
		       	var url = basePath + "setSearch.jsp";
		       	var dataJson = {'u':uid,'key':key};
		       	// 异步加载数据
		        $mainServices.post(url, dataJson, true).success(function (JSONObjRet){
					
		        });
		    }
		    $rootScope.hideTabs = "";
		    $ionicTabsDelegate.select(1);
		
		}
		// 清空搜索
		$scope.delSearch = function(){
		    var uid = localStorage.getItem("uid_local");
		    if(uid != null && uid != null){
		      	var url = basePath + "delSearch.jsp";
		      	var dataJson = {'u':uid};
		      	$mainServices.post(url, dataJson,true).success(function(JSONObjRet){
			      	if(JSONObjRet.code == "200" || JSONObjRet.code == 200){
			      		$scope.userkeylist = [];
					    $scope.showDiv = ["","hide"];
					    $scope.isDelDiv = false;
			      	} else {
			      		alert("清空记录失败");
			      	}
			    });	
		    }
		    
		}
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$rootScope','$ionicTabsDelegate'];  
    return ctrl;  
      
}); 