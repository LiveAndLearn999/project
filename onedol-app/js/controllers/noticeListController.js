define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$ionicScrollDelegate) {
		$scope.noticeArr = [];
		$scope.noticeFlag = true;
		$scope.canLoadMoreList = {code:false,nowPageMore:0};
      	var base = $controller('baseController', { $scope: $scope });


		$scope.loadPage = function (t){
			var nowPageMore = $scope.canLoadMoreList.nowPageMore;
			if (t != "more") {
				nowPageMore = 1;
				$scope.noticeArr = [];
			} else {
				nowPageMore++;
			}
			// 是否显示请求loading
			var isHide = false;
			if(t == "first"){
				isHide = true;
			}
			var url = domain2 + "news/gainNews.do";
			var dataJson = {page:{currentPage:nowPageMore,pageNumber:10}};
			$mainServices.postNew(url,dataJson,isHide).success(function(JSONObj) {
				if(JSONObj.ret == "success"){
					var pageCount = JSONObj.page.totalPage;
					var showPage = JSONObj.page.currentPage;
					$scope.canLoadMoreList.nowPageMore = showPage;
					var JSON_list = JSONObj.newList;
					if (JSONObj.page.totalNumber <= 0) {
						$scope.noticeFlag = false;
						$scope.canLoadMoreList.code = false;
					} else {
						$scope.noticeFlag = true;
					}
					if(JSON_list != null && JSON_list.length > 0){
						for (var i = 0; i < JSON_list.length; i++){
							var intime = $mainServices.getTimeNo_0(JSON_list[i].intime);
							$scope.noticeArr.push({nid:JSON_list[i].nid,intime:intime,ntitle:JSON_list[i].ntitle});
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
					}
				} else {
					alert(JSONObj.message);
				}
			});
		}
		$scope.loadPage("first");
		$scope.showDetail = function (id){
			skip('#/'+$scope.host+'/noticeDetail/'+id);
		}
		$scope.loadListMore = function () {
			$scope.loadPage('more');
		}
    }  
  
    ctrl.$inject = ['$scope','$controller','$mainServices','$ionicScrollDelegate'];
    return ctrl;  
      
}); 