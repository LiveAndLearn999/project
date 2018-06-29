define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$ionicScrollDelegate,$stateParams) {
        $scope.canLoadMoreList = {code:false,nowPageMore:0};
        $scope.gainerList = [];
    	var base = $controller('baseController', { $scope: $scope });
    	var pid = $stateParams.pid+'';

        $scope.getList = function(t){
            var nowPageMore = $scope.canLoadMoreList.nowPageMore;
            // 加载更多
            if (t != "more") {
                nowPageMore = 1;
                $scope.gainerList = [];
            } else {
                nowPageMore++;
            }
            // 是否显示请求loading
            var isHide = false;
            if(t == "first"){
                isHide = true;
            }
            var url = domain2 + "productTerm/prizeInfo";
            var dataJson = {productTerm:{pid:pid},page:{currentPage:nowPageMore,pageNumber:10}};
            $mainServices.postNew(url,dataJson,isHide).success(function(data){
                if(data.ret == "success"){
                    var JSONObj = data.data;
                    var pageCount = JSONObj.page.totalPage;
                    var showPage = JSONObj.page.currentPage;
                    $scope.canLoadMoreList.nowPageMore = showPage;
                    var JSON_list = JSONObj.drawComputeList;
                    if (JSONObj.page.totalNumber <= 0) {
                        $scope.canLoadMoreList.code = false;
                    }
                    if(JSON_list != null && JSON_list.length > 0){
                        for (var i = 0; i < JSON_list.length; i++) {
                            var headpic = JSON_list[i].headpic;
                            var pid = JSON_list[i].pid;
                            var pterm = JSON_list[i].pterm;
                            var intime = JSON_list[i].intime;
                            headpic = $mainServices.getHttpOrlocalProPic(headpic);
                            var nickname = JSON_list[i].nickname;
                            var total_time = JSON_list[i].total_time;
                            var winner_renci = JSON_list[i].winner_renci;
                            var winnerid = JSON_list[i].winnerid;
                            var luckynumber = JSON_list[i].luckynumber;
                            var publictime = JSON_list[i].publictime;
                            var url = "#/" + $scope.host + "/userIndex/" + winnerid;
                            $scope.gainerList.push({headpic:headpic,pid:pid,pterm:pterm,intime:intime,nickname:nickname,total_time:total_time,winner_renci:winner_renci,winnerid:winnerid,publictime:publictime,luckynumber:luckynumber,url:url})
                        }

                    }
                    $ionicScrollDelegate.resize();

                    if(pageCount <= showPage || JSONObj.page.totalNumber <= 0){
                        $scope.canLoadMoreList.code = false;
                    }else {
                        $scope.canLoadMoreList.code = true;
                    }
                    if(t == "more"){
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    } else  if(t == "refresh"){
                        $scope.$broadcast('scroll.refreshComplete');
                    }
                } else {
                    alert(data.message);
                }
            });
        }

        $scope.getList('first');
  		$scope.doRefresh = function () {
            $scope.getList('refresh');
        }
  		$scope.loadListMore = function () {
            $scope.getList('more');
        }
  		
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$ionicScrollDelegate','$stateParams'];
    return ctrl;  
      
}); 