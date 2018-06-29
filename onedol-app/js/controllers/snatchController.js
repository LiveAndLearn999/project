define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$interval,$state,$ionicPopup,$timeout) {
    	$scope.case = {case1:false,case2:false,case3:false,case4:false};
        $scope.case1 = {startTime:''};
        $scope.case2 = {timeRub:'',flag:0};
        $scope.case3 = {isRep:true,moneyLimitFlag:true};
        $scope.case4 = {startTime:''};
        $scope.explain = '';
		var base = $controller('baseController', { $scope: $scope });

        $scope.dealTime = function (time) {
            var time = $mainServices.getTimeNo_0(time);
            var month = parseInt(time.substr(5,2));
            var day =  parseInt(time.substr(8,2));
            var hour =  parseInt(time.substr(11,2));
            var minute =  parseInt(time.substr(14,2));
            if(minute == 0){
                return  month+'月'+day+'日'+hour+'点';
            } else {
                return  month+'月'+day+'日'+hour+'点'+minute+'分';
            }
        }
        $scope.calcDay = function (time1,time2) {
            var date = time2-time1;
            var days = Math.floor(date/(24*3600*1000));
            if(days == 0){
                var leave = date%(24*3600*1000);
                var hours = Math.floor(leave/(3600*1000));
                if(hours == 0){
                    return '即将后';
                } else {
                    return hours+'小时后';
                }
            } else {
                return days+'天后';
            }

        }
        $scope.returnIndex = function () {
            var url = $state.current.name;
            if(url.indexOf('index.') == 0){
                skip('#/index/index');
            } else if (url.indexOf('product.') == 0){
                skip('#/product/productlist');
            } else if (url.indexOf('activite.') == 0){
                skip('#/activite/newPublishList');
            } else if (url.indexOf('cart.') == 0){
                skip('#/cart/cart');
            } else if (url.indexOf('mine.') == 0){
                skip('#/mine/myIndex');
            }
        }
        
        $scope.loadPage = function (){
            $mainServices.postNew(domain2+"vouchers/checkVouchers.do",{userID:localStorage.getItem("uid_local")},true).success(function(jsonObj){
                $scope.explain = jsonObj.rule;
                if(jsonObj.status == 1){
                    $scope.case = {case1:true,case2:false,case3:false,case4:false};
                    if(jsonObj.todayVouchers != null){
                        $scope.case1.startTime = $scope.dealTime(jsonObj.todayVouchers.startTime);
                    } else if(jsonObj.predictVouchers != null) {
                        $scope.case1.startTime = $scope.dealTime(jsonObj.predictVouchers.startTime);
                    } else {
                        $scope.case1.startTime = '下一轮暂未开启';
                    }
                } else if(jsonObj.status == 2){
                    $scope.case = {case1:false,case2:true,case3:false,case4:false};
                    getRTime(jsonObj.timeRub);
                } else if(jsonObj.status == 3){
                    $scope.case = {case1:false,case2:false,case3:true,case4:false};
                    $scope.case3.isRep = true;
                    $scope.case3.money = jsonObj.obtainRecord.money;
                    $scope.case3.typesName = jsonObj.obtainRecord.typesName;
                    $scope.case3.limitMoney = jsonObj.obtainRecord.limitMoney;
                    $scope.case3.catalogueName = jsonObj.obtainRecord.catalogueName;
                    if($scope.case3.limitMoney == 0){
                        $scope.case3.moneyLimitFlag = false;
                    } else {
                        $scope.case3.moneyLimitFlag = true;
                    }
                    $scope.case3.validity = $scope.calcDay(jsonObj.obtainRecord.startTime,jsonObj.obtainRecord.finishTime);
                } else if(jsonObj.status == 4){
                    $scope.case = {case1:false,case2:false,case3:false,case4:true};
                    if(jsonObj.predictVouchers != null){
                        $scope.case4.startTime = $scope.dealTime(jsonObj.predictVouchers.startTime);
                    } else {
                        $scope.case4.startTime = '下一轮暂未开启';
                    }
                }
            });
        }
        $scope.loadPage();
        $scope.snatch = function () {
            if($scope.case2.flag == 2){
                var uid = localStorage.getItem("uid_local");
                if(uid  == null){
                    skip('#/'+$scope.host+'/log');
                } else {
                    $mainServices.postNew(domain2+"vouchers/extractVouchers.do",{userID:uid},true).success(function(jsonObj){
                        $scope.case = {case1:false,case2:false,case3:true,case4:false};
                        if(jsonObj.code == 203){
                            $scope.case3.isRep = true;
                        } else {
                            $scope.case3.isRep = false;
                        }
                        $scope.case3.money = jsonObj.obtainRecord.money;
                        $scope.case3.typesName = jsonObj.obtainRecord.typesName;
                        $scope.case3.limitMoney = jsonObj.obtainRecord.limitMoney;
                        $scope.case3.catalogueName = jsonObj.obtainRecord.catalogueName;
                        if($scope.case3.limitMoney == 0){
                            $scope.case3.moneyLimitFlag = false;
                        } else {
                            $scope.case3.moneyLimitFlag = true;
                        }
                        $scope.case3.validity = $scope.calcDay(jsonObj.obtainRecord.startTime,jsonObj.obtainRecord.finishTime);
                    });
                }
            } else {
                alert('抢红包时间还未开始,请耐心等待！');
            }
        }
        // 倒计时控制
        function getRTime(t) {
            var time = 60;
            $scope.daojishi = $interval(function () {
                if (t > 0) {
                    var mm = Math.floor(t / 1000 / 60) + "";
                    var ss = Math.floor(t / 1000 % 60) + "";
                    var s_m_100 = t+"";
                    s_m_100 = s_m_100.substr(s_m_100.length - 3, 2);
                    if (mm.length == 1) {
                        mm = "0" + mm;
                    }
                    if (ss.length == 1) {
                        ss = "0" + ss;
                    }
                    $scope.case2.timeRub = mm+":"+ss+":"+s_m_100;
                    $scope.case2.flag = 1;
                    t -= time;
                } else {
                    $scope.case2.timeRub = "正在开抢中。。。";
                    $interval.cancel($scope.daojishi);
                    $scope.case2.flag = 2;
                }
            },time);

        };
        // 分享
        var myPopup = '';
        $scope.showPopup = function(money,typesName,catalogueName) {
            myPopup = $ionicPopup.show({
                templateUrl:'templates/index/shareTemplate.html',
                title: '分享给好友',
                scope: $scope,
                buttons: [
                    { text: '取消' }
                ]
            });
            myPopup.then(function(res) {});

            $scope.WeixinShare=function(type){
                $mainServices.snatchShare(type,money,typesName,catalogueName);
                $timeout(function(){
                    myPopup.close();
                },1000);
            }
        };

        $scope.$on('$destroy', function() {
            if(myPopup != ''){
                myPopup.close();
            }
        });
		
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$interval','$state','$ionicPopup','$timeout'];
    return ctrl;  
      
}); 