define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$timeout,$ionicHistory) {
    	$scope.user = {zyygjl:'',zyhdsp:'',zysd:''};
		$scope.record = ['','',''];
		$scope.goods = ['','',''];
		$scope.orderdetail = ['','',''];
		var base = $controller('baseController', { $scope: $scope });
		var u = localStorage.getItem("uid_local");

		$mainServices.postNew(domain2+"user/userAuthority.do",{userID:u,zyygjl:'',zyhdsp:'',zysd:'',reserve:1},true).success(function(subRetJson){
			if(subRetJson.ret == "success"){
				$scope.record[parseInt(subRetJson.user.zyygjl)] = 'cur';
				$scope.goods[parseInt(subRetJson.user.zyhdsp)] = 'cur';
				$scope.orderdetail[parseInt(subRetJson.user.zysd)] = 'cur';
				$scope.user = {zyygjl:subRetJson.user.zyygjl,zyhdsp:subRetJson.user.zyhdsp,zysd:subRetJson.user.zysd};
			} else {
				alert($scope.message);
			}
		});


		$scope.exchange = function(num,obj){
			if(typeof obj != 'undefined'){
				obj = obj.toElement;
			}
			// $(obj).addClass('cur').siblings().removeClass('cur');
			var index = $(obj).parent().find('div').index($(obj));
			if(num == 1){
				$scope.user.zyygjl = $(obj).attr("data-val");
				$scope.record = ['','',''];
				$scope.record[index] = 'cur';
			} else if(num == 2){
				$scope.user.zyhdsp = $(obj).attr("data-val");
				$scope.goods = ['','',''];
				$scope.goods[index] = 'cur';
			} else if(num == 3){
				$scope.user.zysd = $(obj).attr("data-val");
				$scope.orderdetail = ['','',''];
				$scope.orderdetail[index] = 'cur';
			}
		}

		$scope.setSecret = function () {
			$mainServices.postNew(domain2+"user/userAuthority.do",{userID:u,zyygjl:$scope.user.zyygjl,zyhdsp:$scope.user.zyhdsp,zysd:$scope.user.zysd,reserve:2},true).success(function(subRetJson){
				alert(subRetJson.message);
				$timeout(function () {
					$ionicHistory.goBack();
				},1500);
			});
		}
		
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$timeout','$ionicHistory'];
    return ctrl;  
      
}); 