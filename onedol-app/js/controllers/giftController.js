define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$ionicScrollDelegate,$rootScope,$ionicTabsDelegate) {
		$scope.tab = [{tabClass:'cur',isShow:true},{tabClass:'',isShow:false},{tabClass:'',isShow:false}];
		$scope.canLoadRecordUse = {code:false,nowPageMore:0}; // 可使用
		$scope.canLoadRecordDisuse = {code:false,nowPageMore:0}; // 已使用
		$scope.canLoadRecordOverdue = {code:false,nowPageMore:0}; // 已过期
		$scope.useRecords = [];
		$scope.disuseRecords = [];
		$scope.overdueRecords = [];
		var base = $controller('baseController', { $scope: $scope });
		var u = localStorage.getItem("uid_local");

		$scope.returnIndex = function () {
			$rootScope.hideTabs = '';
			$ionicTabsDelegate.select(1);
		}
		
		// 明细切换
		$scope.tabAc = function(t){
			if(t == 0){
				$scope.tab = [{tabClass:'cur',isShow:true},{tabClass:'',isShow:false},{tabClass:'',isShow:false}];
				if($scope.useRecords.length == 0){
					$scope.recordUseLoad();
				}

			} else if(t == 1){
				$scope.tab = [{tabClass:'',isShow:false},{tabClass:'cur',isShow:true},{tabClass:'',isShow:false}];
				if($scope.disuseRecords.length == 0){
					$scope.recordDisuseLoad();
				}
			} else if(t == 2){
				$scope.tab = [{tabClass:'',isShow:false},{tabClass:'',isShow:false},{tabClass:'cur',isShow:true}];
				if($scope.overdueRecords.length == 0){
					$scope.recordOverdueLoad();
				}
			}
		}

		$scope.seeRule = function (event){
			event = event.toElement;
			var obj = angular.element(event).parent();
			if(obj.hasClass('show-more')){
				obj.removeClass('show-more');
				obj.parent().parent().next('.tb-bottom').hide();
			} else {
				obj.addClass('show-more');
				obj.parent().parent().next('.tb-bottom').show();
			}
		}

		$scope.buyProduct = function () {
			skip('#/product/productlist');
		}
		$scope.dealTime = function (time) {
			var date = new Date(time);
			var year = date.getFullYear();
			var mon = date.getMonth()+1+'';
			if(mon.length == 1){
				mon = '0'+mon;
			}
			var day = date.getDate()+'';
			if(day.length == 1){
				day = '0'+day;
			}
			return year+'.'+mon+'.'+day;
		}
		// 可使用
		$scope.recordUseLoad = function(par){
			var isShow = false;
			var nowPageMore = $scope.canLoadRecordUse.nowPageMore;
			if(par == "first"){
				isShow = true;
			}
			if (par != "more") {
				nowPageMore = 1;
				$scope.myText = "";
			} else {
				nowPageMore++;
			}
			var url = domain2+"vouchers/checkVouchersInfo.do";
			var dataJson = {user:{userID:u,sh:1},page:{currentPage:nowPageMore,pageNumber:10}};
			$mainServices.postNew(url,dataJson,isShow).success(function(JSONObjRet){
				if(JSONObjRet.ret == "success"){
					var pageCount = JSONObjRet.page.totalPage;
					var showPage = JSONObjRet.page.currentPage;
					$scope.canLoadRecordUse.nowPageMore = showPage;
					var JSON_list = JSONObjRet.obtainRecords;
					if (JSONObjRet.page.totalNumber <= 0) {
						$scope.canLoadRecordUse.code = false;
					}
					if(JSON_list != null && JSON_list.length > 0){
						for (var i = 0; i < JSON_list.length; i++) {
							var money = JSON_list[i].money;
							var limitMoney = JSON_list[i].limitMoney;
							var explain = JSON_list[i].explain;
							if(limitMoney > 0){
								var moneyLimitFlag = true;
							} else {
								var moneyLimitFlag = false;
							}
							var catalogueName = JSON_list[i].catalogueName;
							var typesName = JSON_list[i].typesName;
							var startTime = JSON_list[i].startTime;
							startTime = $scope.dealTime(startTime);
							var finishTime = JSON_list[i].finishTime;
							finishTime = $scope.dealTime(finishTime);
							$scope.useRecords.push({money:money,limitMoney:limitMoney,moneyLimitFlag:moneyLimitFlag,catalogueName:catalogueName,typesName:typesName,startTime:startTime,finishTime:finishTime,explain:explain});
						}
					}
					$ionicScrollDelegate.resize();

					if(pageCount <= showPage || JSONObjRet.page.totalNumber <= 0){
						$scope.canLoadRecordUse.code = false;
					}else {
						$scope.canLoadRecordUse.code = true;
					}
					if(par == "more"){
						$scope.$broadcast('scroll.infiniteScrollComplete');
					}
				} else {
					alert(JSONObjRet.message);
				}
			});
		}
		// 已使用
		$scope.recordDisuseLoad = function(par){
			var isShow = false;
			var nowPageMore = $scope.canLoadRecordDisuse.nowPageMore;
			if(par == "first"){
				isShow = true;
			}
			if (par != "more") {
				nowPageMore = 1;
				$scope.myText = "";
			} else {
				nowPageMore++;
			}
			var url = domain2+"vouchers/checkVouchersInfo.do";
			var dataJson = {user:{userID:u,sh:2},page:{currentPage:nowPageMore,pageNumber:10}};
			$mainServices.postNew(url,dataJson,isShow).success(function(JSONObjRet){
				if(JSONObjRet.ret == "success"){
					var pageCount = JSONObjRet.page.totalPage;
					var showPage = JSONObjRet.page.currentPage;
					$scope.canLoadRecordDisuse.nowPageMore = showPage;
					var JSON_list = JSONObjRet.obtainRecords;
					if (JSONObjRet.page.totalNumber <= 0) {
						$scope.canLoadRecordDisuse.code = false;
					}
					if(JSON_list != null && JSON_list.length > 0){
						for (var i = 0; i < JSON_list.length; i++) {
							var money = JSON_list[i].money;
							var limitMoney = JSON_list[i].limitMoney;
							var explain = JSON_list[i].explain;
							if(limitMoney > 0){
								var moneyLimitFlag = true;
							} else {
								var moneyLimitFlag = false;
							}
							var catalogueName = JSON_list[i].catalogueName;
							var typesName = JSON_list[i].typesName;
							var startTime = JSON_list[i].startTime;
							startTime = $scope.dealTime(startTime);
							var finishTime = JSON_list[i].finishTime;
							finishTime = $scope.dealTime(finishTime);
							$scope.disuseRecords.push({money:money,limitMoney:limitMoney,moneyLimitFlag:moneyLimitFlag,catalogueName:catalogueName,typesName:typesName,startTime:startTime,finishTime:finishTime,explain:explain});
						}
					}
					$ionicScrollDelegate.resize();

					if(pageCount <= showPage || JSONObjRet.page.totalNumber <= 0){
						$scope.canLoadRecordDisuse.code = false;
					}else {
						$scope.canLoadRecordDisuse.code = true;
					}
					if(par == "more"){
						$scope.$broadcast('scroll.infiniteScrollComplete');
					}
				} else {
					alert(JSONObjRet.message);
				}
			});
		}
		// 已过期
		$scope.recordOverdueLoad = function (par) {
			var isShow = false;
			var nowPageMore = $scope.canLoadRecordOverdue.nowPageMore;
			if(par == "first"){
				isShow = true;
			}
			if (par != "more") {
				nowPageMore = 1;
				$scope.myText = "";
			} else {
				nowPageMore++;
			}
			var url = domain2+"vouchers/checkVouchersInfo.do";
			var dataJson = {user:{userID:u,sh:3},page:{currentPage:nowPageMore,pageNumber:10}};
			$mainServices.postNew(url,dataJson,isShow).success(function(JSONObjRet){
				if(JSONObjRet.ret == "success"){
					var pageCount = JSONObjRet.page.totalPage;
					var showPage = JSONObjRet.page.currentPage;
					$scope.canLoadRecordOverdue.nowPageMore = showPage;
					var JSON_list = JSONObjRet.obtainRecords;
					if (JSONObjRet.page.totalNumber <= 0) {
						$scope.canLoadRecordOverdue.code = false;
					}
					if(JSON_list != null && JSON_list.length > 0){
						for (var i = 0; i < JSON_list.length; i++) {
							var money = JSON_list[i].money;
							var limitMoney = JSON_list[i].limitMoney;
							var explain = JSON_list[i].explain;
							if(limitMoney > 0){
								var moneyLimitFlag = true;
							} else {
								var moneyLimitFlag = false;
							}
							var catalogueName = JSON_list[i].catalogueName;
							var typesName = JSON_list[i].typesName;
							var startTime = JSON_list[i].startTime;
							startTime = $scope.dealTime(startTime);
							var finishTime = JSON_list[i].finishTime;
							finishTime = $scope.dealTime(finishTime);
							$scope.overdueRecords.push({money:money,limitMoney:limitMoney,moneyLimitFlag:moneyLimitFlag,catalogueName:catalogueName,typesName:typesName,startTime:startTime,finishTime:finishTime,explain:explain});
						}
					}
					$ionicScrollDelegate.resize();

					if(pageCount <= showPage || JSONObjRet.page.totalNumber <= 0){
						$scope.canLoadRecordOverdue.code = false;
					}else {
						$scope.canLoadRecordOverdue.code = true;
					}
					if(par == "more"){
						$scope.$broadcast('scroll.infiniteScrollComplete');
					}
				} else {
					alert(JSONObjRet.message);
				}
			});
		}
		
		if (u == null || u == "" || typeof(u) == "undefined") {
			alert("请先登录。");
			return;
		} else {
			$scope.recordUseLoad("first");
		}

		$scope.useLoadMore = function () {
			$scope.recordUseLoad('more');
		}
		$scope.disuseLoadMore = function () {
			$scope.recordDisuseLoad('more');
		}
		$scope.overdueLoadMore = function () {
			$scope.recordOverdueLoad('more');
		}
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$ionicScrollDelegate','$rootScope','$ionicTabsDelegate'];
    return ctrl;  
      
}); 