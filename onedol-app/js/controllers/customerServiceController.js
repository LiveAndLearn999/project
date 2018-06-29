define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices) {
        $scope.list = [false,false,false,false,false,false,false];
        $scope.style = ["","","","","","",""];
		var base = $controller('baseController', { $scope: $scope });

        $scope.exchange = function(index){
            var len = $scope.list.length;
            if($scope.list[index] == true){
                for(var i=0;i<len;i++){
                    $scope.list[i] = false;
                    $scope.style[i] = "";
                }
            } else {
                for(var i=0;i<len;i++){
                    $scope.list[i] = false;
                    $scope.style[i] = "";
                }
                $scope.list[index] = true;
                $scope.style[index] = "rotate-180";
            }

        }
        
        
		var u = localStorage.getItem("uid_local");
        if (u) {
            var url = "https://api.592huiyi.com/game/account/balance";
            var dataJson = {'userID':u};
            // 异步加载数据。
            $mainServices.postNew(url, dataJson, false).success(function (JSON_list) {
            	console.log(JSON_list)
                if(JSON_list.ret == "success"){
                    if(JSON_list.data.serviceData != null){
                        var dataObj = JSON_list.data.serviceData;
                        $scope.qimoClientId = {userId:u, nickName:dataObj.userName};
                    }

                }
            });
        } else {
            $scope.qimoClientId = {};
        }

        $scope.customerService = function(){
        	
            /*if(isiOS){*/
                if (u){
                	//location.href="https://www.592huiyi.com/customerService.html"
                	//location.href="https://www.592huiyi.com/customerService.html?userId="+u+"&nickName="+$scope.qimoClientId.nickName+""
                   $mainServices.iosBrowerPay('https://www.592huiyi.com/customerService.html?userId='+u+'&nickName='+$scope.qimoClientId.nickName);
                } else {
                	location.href="https://www.592huiyi.com/customerService.html"
                    //$mainServices.iosBrowerPay('https://www.592huiyi.com/customerService.html');
                }
           /* } else {
                qimoChatClick();
            }*/

        }
    } 
  
    ctrl.$inject = ['$scope', '$controller','$mainServices'];
    return ctrl;  
      
}); 