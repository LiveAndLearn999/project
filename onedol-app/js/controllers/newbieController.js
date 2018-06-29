define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$stateParams) {
        $scope.newbieList = [];
        $scope.newbie = {animation:'',myVal:''};
      	var base = $controller('baseController', { $scope: $scope });

        $scope.getNewbieList = function(){
            $mainServices.postNew(domain2+"product/selectSprogProduct.do",{},true).success(function(JSONObjRet) {
                if(JSONObjRet.ret == "success"){
                    var JSON_list = JSONObjRet.list;
                    $scope.newbieList = [];
                    $scope.newbie.myVal = JSONObjRet.rule;
                    for(var i=0;i<JSON_list.length;i++){
                        var pid = JSON_list[i].productID;
                        var pic = JSON_list[i].pic;
                        var price = JSON_list[i].price;
                        var total_time = JSON_list[i].totalTime;
                        var finish_time = JSON_list[i].finishTime;
                        var now_term = JSON_list[i].nowTerm;
                        var ptitle = JSON_list[i].pTitle;
                        pic = $mainServices.getHttpOrlocalProPic(pic);
                        var shengyu_time = parseInt(total_time) - parseInt(finish_time);
                        var baifenbi = parseFloat(finish_time/total_time);
                        baifenbi = baifenbi.toFixed(2) * 100 + "%";
                        $scope.newbieList.push({pid:pid,pic:pic,price:price,baifenbi:baifenbi,finish_time:finish_time,total_time:total_time,shengyu_time:shengyu_time,now_term:now_term,ptitle:ptitle});
                    }
                }
            });
        }

        $scope.getNewbieList();

        $scope.rule = function (){
            $scope.newbie.animation = 'moveToRight';
        }
        $scope.closeRule = function (){
            $scope.newbie.animation = '';
        }
    }  
  
    ctrl.$inject = ['$scope','$controller','$mainServices','$stateParams'];
    return ctrl;  
      
}); 