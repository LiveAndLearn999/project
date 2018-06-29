define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$stateParams) {
        $scope.expr = {expressFlag:false,express:'',expressNo:''};
    	var id = $stateParams.id;
        $scope.dataList = [];
		var base = $controller('baseController', { $scope: $scope });

        var dataJson = {id:id};
        $mainServices.postNew(domain2+"draw/logistics.do",dataJson,true).success(function(JSONObjRet) {
            if(JSONObjRet.ret == "success"){
                var JSON_list = JSON.parse(JSONObjRet.logistics);
                if(JSON_list== "null" || JSON_list == null){
                    $scope.dataList.push({operateTime:'',operateState:"订单已提交，请等待发货！"});
                    return;
                }
                if (JSON_list.length > 0) {
                    for(var i= JSON_list.length-1;i>=0;i--){
                        if(JSON_list[i].operateState != "null" && JSON_list[i].operateState != null){
                            $scope.dataList.push({operateTime:JSON_list[i].operateTime,operateState:JSON_list[i].operateState});
                        }
                        if(JSON_list[i].expressNo != null && JSON_list[i].expressNo != ''){
                            $scope.expr = {expressFlag:true,express:JSON_list[i].express,expressNo:JSON_list[i].expressNo};
                        }
                    }
                }
            } else {
                alert(JSONObjRet.message);
            }
        });
		
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$stateParams'];  
    return ctrl;  
      
}); 