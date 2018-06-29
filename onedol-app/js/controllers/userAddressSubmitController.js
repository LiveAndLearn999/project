define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$ionicHistory) {
    	$scope.user= {name:'',mobile:'',phone:'',provinceId:'0',cityId:'0',districtId:'0',townId:'0',address:''};
        $scope.province = [{value:'0',name:'请选择所在省'}];
        $scope.city = [{value:'0',name:'请选择所在市'}];
        $scope.district = [{value:'0',name:'请选择所在区'}];
        $scope.town = [{value:'0',name:'请选择所在乡镇'}];
    	var base = $controller('baseController', { $scope: $scope });
        var name = '', mobile = '', phone = '', sheng = '0', shi = '0', qu = '0', town = '0', address = '', isdefault = 'isdefault';
        
        // 查询省列表
        $scope.selectProvince = function(provinceId_) {
            $scope.province= [{value:'0',name:'请选择所在省'}];
            var url = basePath + "userAddressUtil.jsp";
            var dataJson = {type_: 1, provinceId_: provinceId_};
            $mainServices.post(url,dataJson,true).success(function(JSON_list){
                if (JSON_list.length > 0) {
                    for (var i = 0; i < JSON_list.length; i++) {
                        $scope.province.push({value:JSON_list[i].serialId,name:JSON_list[i].provinceName});
                    }
                    if(provinceId_ == null){
                        provinceId_ = '0';
                    }
                    $scope.user.provinceId  = provinceId_;
                }
            });

        }

        // 查询对应省下面的市列表
        $scope.selectCity= function(provinceId_, cityId_) {
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
                        }
                        if(cityId_ == null){
                            cityId_ = '0';
                        }
                        $scope.user.cityId  = cityId_;
                    }
                });

            }
        }

        // 查询对应市下面的区列表
        $scope.selectDistrict = function(cityId_, districtId_) {
            $scope.district = [{value:'0',name:'请选择所在区'}];
            if(cityId_ == null && districtId_ == null){
                return;
            }
            if (cityId_ != null && cityId_ != "") {
                var url = basePath + "userAddressUtil.jsp";
                var dataJson = {type_: 3, cityId_: cityId_, districtId_: districtId_};
                $mainServices.post(url,dataJson,true).success(function(JSON_list){
                    if (JSON_list.length > 0) {
                        for (var i = 0; i < JSON_list.length; i++) {
                            $scope.district.push({value:JSON_list[i].serialId,name:JSON_list[i].districtName});
                        }
                        if(districtId_ == null){
                            districtId_ = '0';
                        }
                        $scope.user.districtId  = districtId_;
                    }
                });

            }
        }

        // 查询对应市、区下面的乡镇列表
        $scope.selectTown = function(cityId_, districtId_, townId_) {
            $scope.town = [{value:'0',name:'请选择所在乡镇'}];
            if(cityId_ == null && districtId_ == null && townId_ == null){
                return;
            }
            if (cityId_ != null && cityId_ != "") {
                var url = basePath + "userAddressUtil.jsp";
                var dataJson = {type_: 4, cityId_: cityId_, districtId_: districtId_, townId_: townId_};
                $mainServices.post(url,dataJson,true).success(function(JSON_list){
                    if (JSON_list.length > 0) {
                        for (var i = 0; i < JSON_list.length; i++) {
                            $scope.town.push({value:JSON_list[i].serialId,name:JSON_list[i].TownName});
                        }
                        if(townId_ == null){
                            townId_ = '0';
                        }
                        $scope.user.townId  = townId_;
                    }
                });

            }
        }

        $scope.provinceChange = function () {
            $scope.selectCity($scope.user.provinceId);
            $scope.selectDistrict();
            $scope.user.cityId = '0';
            $scope.user.districtId = '0';
            $scope.user.townId = '0';
        }
        $scope.cityChange = function () {
            $scope.selectDistrict($scope.user.cityId);
            $scope.user.districtId = '0';
            $scope.user.townId = '0';
        }
        $scope.districtChange = function () {
            $scope.selectTown($scope.user.cityId, $scope.user.districtId);
            $scope.user.townId = '0';
        }
        
        $scope.add_modAdd = function () {
            // 获取参数
            var name = $scope.user.name;
            var mobile = $scope.user.mobile;
            var phone = $scope.user.phone;
            var provinceId = $scope.user.provinceId;
            var cityId = $scope.user.cityId;
            var districtId = $scope.user.districtId;
            var townId = $scope.user.townId;
            var address = $scope.user.address;
            //验证参数合法性
            if (name == "") {
                alert("请输入收货人姓名。");
                return;
            }
            if (!$mainServices.yzPhone(mobile)) {
                alert("请输入有效的手机号码。");
                return;
            }
            if (phone != "") {
                if (!$mainServices.yzTelPhone(phone)) {
                    alert("请输入有效的固定电话。");
                    return;
                }
            }
            if (provinceId == "" || provinceId == "0") {
                alert("请选择省。");
                return;
            }
            if (cityId == "" || cityId == "0") {
                alert("请选择市。");
                return;
            }
            if (districtId == "" || districtId == "0") {
                alert("请选择区。");
                return;
            }
            if (townId == "" || townId == "0") {
                alert("请选择乡镇。");
                return;
            }
            if (address == "") {
                alert("请输入详细地址。");
                return;
            }

            var isdefault = "0";

            var isdefaultC = $("#isdefault").attr("checked");
            if (isdefaultC == "checked") {
                isdefault = "1";
            }

            // 修改时
            var subType = "1";
            var aid = $mainServices.getQueryString("aid");
            if (aid != null && aid != "") {
                subType = "2";
            }
            var u = localStorage.getItem("uid_local"); // 本地存储
            var url = basePath + "userAddressSubmit.jsp";
            var dataJson = {u: u, type_: subType, aid: aid, name: name, mobile: mobile, phone: phone, provinceId: provinceId, cityId: cityId, districtId: districtId, townId: townId, address: address, isdefault: isdefault};
            $mainServices.post(url,dataJson,true).success(function(dataJsonRet){
                var code = dataJsonRet.code;
	            var message = dataJsonRet.message;
	            alert(message);
	            if (code == 200) {
                    $ionicHistory.goBack(-1);
	                // skip("#/" + $scope.host + "/userAddress");
	            }
            });
        }
        
	    // 查询地址栏的aid，存在则表示是修改
        var aid = $mainServices.getQueryString("aid");
        if (aid != null && aid != "") {
            var u = localStorage.getItem("uid_local");
            // 查询当前地址信息，并赋值文本框
            var url = basePath + "userAddress.jsp";
            var dataJson = {aid:aid,u:u};
            $mainServices.post(url,dataJson,true).success(function(JSON_list){
                if (JSON_list.length > 0) {
                    for (var i = 0; i < JSON_list.length; i++) {
                        name = JSON_list[i].name;
                        mobile = JSON_list[i].mobile;
                        phone = JSON_list[i].phone;
                        sheng = JSON_list[i].provinceId;
                        shi = JSON_list[i].cityId;
                        qu = JSON_list[i].districtId;
                        town = JSON_list[i].townId;
                        address = JSON_list[i].address;
                        isdefault = JSON_list[i].isdefault;
                    }
                }
                $scope.user.name = name;
                $scope.user.mobile = mobile;
                $scope.user.phone = phone;
                $scope.user.address = address;

                if (isdefault == "1") {
                    $("#isdefault").attr("checked", "checked");
                }
                $scope.selectProvince(sheng);
                $scope.selectCity(sheng, shi);
                $scope.selectDistrict(shi, qu);
                $scope.selectTown(shi, qu, town);
            });

        } else {
            $scope.selectProvince();
        }
        
        
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$ionicHistory'];
    return ctrl;  
      
}); 