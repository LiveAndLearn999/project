define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$ionicScrollDelegate) {  
    	$scope.listGoods = []; // 商品列表
  		$scope.isGoodsShow = true;
    	var base = $controller('baseController', { $scope: $scope });
    	
    	// 获得新品列表
		function getProduct(t,obj){
//		    var xp = $mainServices.getQueryString("xp");
		    var nowPageMore =  $scope.canLoadMore.nowPageMore;
		
		    // 加载更多
		    if(t == "more"){
		    	nowPageMore = nowPageMore + 1;
		    }else{
		      nowPageMore = 1;
		      $scope.listGoods = [];
		    }
		
			var isHide = false;
		    if(t == "first"){
		        isHide = true;
		    }
		    
		    var url = basePath + "getProduct.jsp";
		    var dataJson = {'toPage':nowPageMore,'xp':1};
		    // 筛选条件
//		    if(xp == "1"){
//		      	dataJson['xp'] = xp;
//		      	$scope.showDropSearch = false;
//		    }
		    // 异步加载数据
		    $mainServices.post(url,dataJson,isHide).success(function(JSONObjRet){
		      	var JSON_list = JSONObjRet.prolist;
		      	var pageCount = parseInt(JSONObjRet.pageCount);
		      	var recount = parseInt(JSONObjRet.recount);
		      	var showPage = parseInt(JSONObjRet.showPage);
		      	$scope.canLoadMore.nowPageMore = showPage;
		
		      	if(recount <= 0){
		        	$scope.isGoodsShow = false;
		        	$scope.canLoadMore.code = false;
		        	return;
		      	} else {
		        	$scope.isGoodsShow = true;
		      	}
		      	if(JSON_list.length > 0){
		        	for(var i=0;i<JSON_list.length;i++){
		          		var pid = JSON_list[i].pid;
			          	var ptitle = JSON_list[i].ptitle;
			          	var pic = JSON_list[i].pic;
			          	var price = JSON_list[i].price;
			          	var total_time = JSON_list[i].total_time;
			          	var finish_time = JSON_list[i].finish_time;
			          	pic = $mainServices.getHttpOrlocalProPic(pic);
			          	var now_term = JSON_list[i].now_term;
			          	ptitle = "(第"+now_term+"期)" + ptitle;
		
		          		var shengyu_time = parseInt(total_time) - parseInt(finish_time);
		          		var baifenbi = parseFloat(finish_time/total_time);
		          		baifenbi = baifenbi.toFixed(2) * 100 + "%";
		          		$scope.listGoods.push({purl:"#/" + $scope.host + "/newproductdetail?type=1&pid=" + pid,pic:pic,ptitle:$mainServices.subStringTitle(ptitle,25),price:price,baifenbi:baifenbi,finish_time:finish_time,total_time:total_time,shengyu_time:shengyu_time});
		        	}
		      	}
		
		      	$ionicScrollDelegate.resize();
		      	if(showPage == pageCount || recount <= 0){
		        	$scope.canLoadMore.code = false;
		      	} else {
		        	$scope.canLoadMore.code = true;
		      	}
		      	if(t == "more"){
		        	$scope.$broadcast('scroll.infiniteScrollComplete');
		      	} else if(t == null){
		        	$scope.$broadcast('scroll.refreshComplete');
		      	}
		    });
		}
    	
    	// 初始化
    	getProduct('first'); // 获取商品列表
    	
    	$scope.loadMore = function(){
		    getProduct('more');
		}
    	
    	$scope.doRefresh = function(){
		    $scope.canLoadMore.nowPageMore = 1;
		    getProduct();
		}
    	
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$ionicScrollDelegate'];  
    return ctrl;  
      
}); 