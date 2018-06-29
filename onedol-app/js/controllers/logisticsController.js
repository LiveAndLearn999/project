define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$stateParams) {
        $scope.expr = {expressFlag:false,express:'',expressNo:''};
    	var pid = $stateParams.pid;
        var pterm = $stateParams.pterm;
        $scope.dataList = [];
		var base = $controller('baseController', { $scope: $scope });
		
		var url = basePath + "shouLogisticsInfor.jsp";
        var dataJson = {pid:pid,pterm:pterm};
        $mainServices.post(url, dataJson, true).success(function (JSON_list) {
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
        });

		
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$stateParams'];  
    return ctrl;  
      
}); 