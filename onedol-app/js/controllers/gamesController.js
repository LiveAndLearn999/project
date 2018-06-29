define(function () {  
    'use strict';  
    function ctrl($scope,$rootScope,$controller,$mainServices) {
        $scope.list = [false,false,false,false,false,false,false];
        $scope.style = ["","","","","","",""];
		var base = $controller('baseController', { $scope: $scope });
     
    	var u = localStorage.getItem("uid_local");
        if (u != null && u != "" && typeof(u) != "undefined") {
            var url = "https://api.592huiyi.com/game/account/balance";
            var dataJson = {'userID':u};
            // 异步加载数据。
            $mainServices.postNew(url, dataJson, false).success(function (JSON_list) {
                if(JSON_list.ret == "success"){
                    if(JSON_list.data.serviceData != null){
                        var dataObj = JSON_list.data.serviceData;
                        console.log(dataObj)
                        var qimoClientId = {userId:u, nickName:dataObj.userName};
    					$scope.myUrl='http://www.592huiyi.com/yuanxingQQ.html?userId='+u+'&nickName='+qimoClientId.nickName+'';
                    $('.zlif').attr({'src':$scope.myUrl})
                    }

                }
            });
        } else {
            var qimoClientId = {};
            $scope.myUrl = 'http://www.592huiyi.com/yuanxingQQ.html'
            $('.zlif').attr({'src':$scope.myUrl})
        }
        
    }
    ctrl.$inject = ['$scope','$rootScope','$controller','$mainServices'];
    return ctrl;  
      
}); 