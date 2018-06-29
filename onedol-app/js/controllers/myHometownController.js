define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices) {  
    	$scope.homeTitle = '我的家乡';
    	$scope.addArray = [];
    	$scope.province = [{value:'0',name:'请选择所在省'}];
        $scope.city = [{value:'0',name:'请选择所在市'}];
        $scope.user= {provinceId:'0',cityId:'0'};
        var base = $controller('baseController', { $scope: $scope });
        
        var id = $mainServices.getQueryString("id");
       	if (id == '2') {
            $scope.homeTitle = '我的地址';
        } else {
            id = "1";
        }
        
        // 查询省列表
        $scope.selectProvince = function(provinceId_,provinceName) {
        	provinceId_ += "";
            $scope.province= [{value:'0',name:'请选择所在省'}];
            var url = basePath + "userAddressUtil.jsp";
            var dataJson = {type_: 1, provinceId_: provinceId_};
            $mainServices.post(url,dataJson,true).success(function(JSON_list){
                if (JSON_list.length > 0) {
                    for (var i = 0; i < JSON_list.length; i++) {
                        $scope.province.push({value:JSON_list[i].serialId,name:JSON_list[i].provinceName});
                        if(provinceName != null && provinceName != undefined && provinceName != "" && provinceName == JSON_list[i].provinceName){
                        	provinceId_  = JSON_list[i].serialId;
                        }
                    }
                    if(provinceId_ == null){
                        provinceId_ = '0';
                    }
                    $scope.user.provinceId  = provinceId_;
                    if(provinceName != null && provinceName != ""){
                        $scope.selectCity(provinceId_,0,$scope.addArray[1])
                    }
                }
            });

        }
        
        // 查询对应省下面的市列表
        $scope.selectCity= function(provinceId_, cityId_,cityName_) {
        	provinceId_ += "";
            $scope.city = [{value:'0',name:'请选择所在市'}];
            if(provinceId_ == null && cityId_ == null){
                return;
            }
            if (provinceId_ != null && provinceId_ != "") {
                var url = basePath + "userAddressUtil.jsp";
                var dataJson = {type_: 2, provinceId_: provinceId_, cityId_: cityId_};
                $mainServices.post(url,dataJson,true).success(function(JSON_list){
                    if (JSON_list.length > 0) {
                        for (var i = 0; i < JSON_list.length; i++) {
                            $scope.city.push({value:JSON_list[i].serialId,name:JSON_list[i].cityName});
                            if(cityName_ != null && cityName_ != undefined && cityName_ != "" && cityName_ == JSON_list[i].cityName){
	                        	cityId_  = JSON_list[i].serialId;
	                        }
                        }
                        if(cityId_ == null){
                            cityId_ = '0';
                        }
                        $scope.user.cityId  = cityId_;
                    }
                });

            }
        }

		$scope.provinceChange = function () {
            $scope.selectCity($scope.user.provinceId);
            $scope.user.cityId = '0';
        }
        
		var u = localStorage.getItem("uid_local");
		if (u != null && u != "") {
            if (id == "1") {
                $mainServices.post(basePath + "getUser.jsp",{t:8,u:u},true).success(function(JSON_list_user){
	                var hometown = "";
					if(JSON_list_user.length > 0){
					    hometown = JSON_list_user[0].hometown + "";
					}
					if (hometown != null && hometown != '') {
		                $scope.addArray = $mainServices.splitStr(hometown, ",");
		            }
					$scope.selectProvince(0, $scope.addArray[0]);
	            });
            } else if (id == "2") {
               $mainServices.post(basePath + "getUser.jsp",{t:9,u:u},true).success(function(JSON_list_user){
	                var address = "";
					if(JSON_list_user.length > 0){
					    address = JSON_list_user[0].address + "";
					}
					if (address != null && address != '') {
		                $scope.addArray = $mainServices.splitStr(address, ",");
		            }
					$scope.selectProvince(0, $scope.addArray[0]);
	            });
            }
   
        }
		
		$scope.setHomeTown = function () {
			var u = localStorage.getItem("uid_local");
			var provinceName = $scope.user.provinceId;
			var cityName = $scope.user.cityId;
		
			if(provinceName == "" || provinceName == "0" ){
				alert("请选择省。");
				return;
			}
			if(cityName == "" || cityName == "0" ){
				alert("请选择市。");
				return;
			}
			for(var i=0;i<$scope.province.length;i++){
				if(provinceName == $scope.province[i].value){
					provinceName = $scope.province[i].name;
					break;
				}
			}
			for(var i=0;i<$scope.city.length;i++){
				if(cityName == $scope.city[i].value){
					cityName = $scope.city[i].name;
					break;
				}
			}
			var hometown = provinceName + "," + cityName;
			var url = basePath + "seting.jsp";
			var dataJson = {'u':u,'t':5,'hometown':hometown};
		
			if(id == "2"){
				dataJson = {'u':u,'t':6,'address':hometown};
			}
			$mainServices.post(url,dataJson,true).success(function(jsonRet){
	        	if(jsonRet != null){
					var code = jsonRet.code;
					if(code == 200){
						skip('#/'+$scope.host+'/myInfo');
					}else{
						alert("网络异常，请稍后重试");
					}
				}
	        });
			
        }
        
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices'];  
    return ctrl;  
      
}); 