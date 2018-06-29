define(function () {  
    'use strict';  
    function ctrl($scope,$mainServices,$factoryServices,$controller,$ionicScrollDelegate,$ionicHistory,$location,$q,$rootScope,$timeout) {
		$scope.searchKey = ""; // 查询关键字
		$scope.productData = {};
		$scope.listGoods = []; // 商品列表
		$scope.biglist = [];// 商品大类列表
		$scope.isGoodsShow = true;
		$scope.navFourLi = ["cur","","",""]; //推荐排序导航
		$scope.navListLi = ["cur"]; //商品大类导航
		$scope.navListVal = [0]; //商品大类导航val
	    $scope.arrowPx = ["",""]; //价格递增递减
		var base = $controller('baseController', { $scope: $scope });

		// 首次进入列表页先显示历史
		$scope.listRecord = function () {
			var listBigType = localStorage.getItem("listBigTypeData");
			if (listBigType != null && listBigType != ""){
				listBigType = JSON.parse(listBigType);
				$scope.biglist = listBigType;
				var len = $scope.biglist.length;
				for(var i=0;i<len;i++){
					$scope.navListLi.push("");
					$scope.navListVal.push($scope.biglist[i].id);
				}
			}
			var listProListData = localStorage.getItem("listProListData");
			if (listProListData != null && listProListData != ""){
				listProListData = JSON.parse(listProListData);
				var JSON_list = listProListData.prolist;
				var pageCount = parseInt(listProListData.pageCount);
				var recount =  parseInt(listProListData.recount); // 记录数
				$scope.canLoadMore.nowPageMore = parseInt(listProListData.showPage);
				$scope.canLoadMore.code = false;

				if(recount <= 0){
					$scope.isGoodsShow = false;
					$scope.canLoadMore.code = false;
				} else {
					$scope.isGoodsShow = true;
				}

				for(var i=0;i<JSON_list.length;i++){
					var pid = JSON_list[i].pid;
					var ptitle = JSON_list[i].ptitle;
					var pic = JSON_list[i].pic;
					var price = JSON_list[i].price;
					var total_time = JSON_list[i].total_time;
					var finish_time = JSON_list[i].finish_time;
					var now_term = JSON_list[i].now_term;
					ptitle = "(第"+now_term+"期)" + ptitle;

					pic = $mainServices.getHttpOrlocalProPic(pic);

					var shengyu_time = parseInt(total_time) - parseInt(finish_time);
					var baifenbi = parseFloat(finish_time/total_time);
					baifenbi = baifenbi.toFixed(2) * 100 + "%";
					$scope.listGoods.push({purl:"#/" + $scope.host + "/newproductdetail?type=1&pid=" + pid,pic:pic,pid:pid,ptitle:ptitle,flag:1,price:price,baifenbi:baifenbi,finish_time:finish_time,total_time:total_time,shengyu_time:shengyu_time});
				}

				$ionicScrollDelegate.resize();
				if($scope.canLoadMore.nowPageMore == pageCount || recount <= 0){
					$scope.canLoadMore.code = false;
				} else {
					$scope.canLoadMore.code = true;
				}
			}
		}
		$scope.listRecord();

		// 产品页面-获取大类
		$scope.getBig = function(){
		    var url = basePath + "getBig.jsp";
		    // 异步加载数据。。。。。。。。
		    $mainServices.post(url,{},false).success(function(JSONObjRet) {
		      	$scope.biglist = JSONObjRet.big;
		      	var len = $scope.biglist.length;
		      	if(len > 0){
					$scope.navListLi = ["cur"]; //商品大类导航
					$scope.navListVal = [0]; //商品大类导航val
		      		for(var i=0;i<len;i++){
			      		$scope.navListLi.push("");
			      		$scope.navListVal.push($scope.biglist[i].id);
			      	}
					localStorage.setItem("listBigTypeData",JSON.stringify(JSONObjRet.big));
		      	}
		      	// 首次请求所有商品
		      	$scope.getProduct('first');
		    });
		}
		// 获取商品列表商品
		$scope.getProduct = function(t,obj,val,idx){
		    // t == 点击产品分类1/点击排序2/上拉加载更多"more"/首次加载"first"/下拉刷新"refresh"
		    if(typeof obj != 'undefined'){
		      	// 用于t == 1/2的情况，获取当前dom对象
		      	obj = obj.toElement;
		      	if(val == 3 && t == 2){
		        	obj = obj.parentNode;
		      	}
		    }
		    var nowPageMore = parseInt($scope.canLoadMore.nowPageMore);
		
		    // 是否显示请求loading
		    var isHide = false;
		    if( t == 1 || t == 2){
		      	isHide = true;
		    }
		    // 加载更多
		    if(t != "more"){
		      	$scope.canLoadMore.nowPageMore = 1;
		    }else{
		      	$scope.canLoadMore.nowPageMore ++;
		    }
		
		    var url = basePath + "getProduct.jsp";
		    var dataJson = {'toPage':$scope.canLoadMore.nowPageMore};
		
		    // 关键字查询条件
		    var key = localStorage.getItem("serarch_key");// 本地存储
		    var key_flag = 0;
		    if(key != null && key != "" && typeof(key) != "undefined"){
		      	$scope.searchKey = key;
		      	key_flag = 1;
		      	localStorage.removeItem("serarch_key");
		    }
		    if($scope.searchKey != "" && $scope.searchKey.length > 0){
		      	dataJson['key'] = $scope.searchKey;
		      	if(t != 1 && t != 2){
		      		for(var i=0;i<$scope.navListLi.length;i++){
			      		$scope.navListLi[i] = "";
			      	}
		        	if(key_flag == 1){
		        		$scope.navFourLi = ["","","",""];
		        		$scope.arrowPx = ["",""];
		        	}
		      	}
		    }
		    // 分类和揭晓筛选条件隐藏和选中
		    if(t == 1){
		        for(var i=0;i<$scope.navListLi.length;i++){
			      	$scope.navListLi[i] = "";
			    }
		        $scope.navListLi[idx] = "cur";
		        if($scope.navFourLi[0] == "" && $scope.navFourLi[1] == "" && $scope.navFourLi[2] == "" && $scope.navFourLi[3] == ""){
		        	$scope.navFourLi[0] = "cur";
		        	$scope.arrowPx = ["",""];
		        }
		        $ionicScrollDelegate.scrollTop(0);
		        $scope.canLoadMore.code = false;
		        localStorage.removeItem("serarch_key");
		        $scope.searchKey = "";
		        dataJson['key'] = null;
		    } else if(t == 2){
		        $scope.navFourLi = ["","","",""]; //推荐排序导航
	        	$scope.navFourLi[idx] = "cur";
	        	if(val == 3){
	        		if($scope.arrowPx[0] == ""){
	        			$scope.arrowPx = ["imph",""];
	        		} else {
	        			$scope.arrowPx = ["","imph"];
	        		}
	        	} else {
	        		$scope.arrowPx = ["",""];
	        	}
		        $ionicScrollDelegate.scrollTop(0);
		        $scope.canLoadMore.code = false;
		    }
		    // 分类
		    var bid;
		    for(var i=0;i<$scope.navListLi.length;i++){
			    if($scope.navListLi[i] == "cur"){
			    	bid = $scope.navListVal[i];
			    	break;
			    }
			}
		    if(t == null){
		      	if($mainServices.getQueryString('bid') != ""){
		        	bid = parseInt($mainServices.getQueryString('bid'));
		      	}
		    }
			
		    // 从分类页面跳转过来时
		    if(bid != null && bid != ''&& t == null){
		    	for(var i=0;i<$scope.navListLi.length;i++){
			      	$scope.navListLi[i] = "";
			    }
		    	for(var i=0;i<$scope.navListVal.length;i++){
		    		if($scope.navListVal[i] == bid){
		    			$scope.navListLi[i] = "cur";
			      		break;
		    		}
			      	
			    }	
		    }
		
		    // 排序
		    var px;
		    for(var i=0;i<4;i++){
		      	if($scope.navFourLi[i] == "cur"){
		      		px = i;
		      		break;
		      	}
		    }
		    if(px == 2){
		      	px = 4;
		    } else if(px == 3 && $scope.arrowPx[1] == "imph"){
		      	px = 2;
		    }
		    if(bid != null && bid != ""){
		      dataJson['bid'] = bid;
		    }
		    if(px != null && px != ""){
		      dataJson['px'] = px;
		    }
		
		    // 异步加载数据。。。。。。。。
		    $mainServices.post(url,dataJson,isHide).success(function(JSONObjRet) {
		    	if(t != "more" || $scope.canLoadMore.nowPageMore == 1){
		        	$scope.listGoods = [];
		      	}
			    var JSON_list = JSONObjRet.prolist;
			    var pageCount = parseInt(JSONObjRet.pageCount);
			    var recount =  parseInt(JSONObjRet.recount); // 记录数
			    $scope.canLoadMore.nowPageMore = parseInt(JSONObjRet.showPage);
			    $scope.canLoadMore.code = false;
		
		      	if(recount <= 0){
			    	$scope.isGoodsShow = false;
			        $scope.canLoadMore.code = false;
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
				        var now_term = JSON_list[i].now_term;
				        ptitle = "(第"+now_term+"期)" + ptitle;
				
				        pic = $mainServices.getHttpOrlocalProPic(pic);
				
				        var shengyu_time = parseInt(total_time) - parseInt(finish_time);
				        var baifenbi = parseFloat(finish_time/total_time);
				        baifenbi = baifenbi.toFixed(2) * 100 + "%";
				        $scope.listGoods.push({purl:"#/" + $scope.host + "/newproductdetail?type=1&pid=" + pid,pic:pic,pid:pid,ptitle:ptitle,flag:1,price:price,baifenbi:baifenbi,finish_time:finish_time,total_time:total_time,shengyu_time:shengyu_time});
			        }

					if((t == "refresh" && bid == 0 && px == 0) || t == "first" || (t == 2 && bid == 0 && px == 0)|| (t == 1 && bid == 0 && px == 0)){
						localStorage.setItem("listProListData",JSON.stringify(JSONObjRet));
					};
		      	}
		
		      	$ionicScrollDelegate.resize();
		      	if($scope.canLoadMore.nowPageMore == pageCount || recount <= 0){
		        	$scope.canLoadMore.code = false;
		      	} else {
		        	$scope.canLoadMore.code = true;
		      	}
		
		      	if(t == "more"){
		        	$scope.$broadcast('scroll.infiniteScrollComplete');
		      	} else if(t == "refresh"){
		        	$scope.$broadcast('scroll.refreshComplete');
		      	}
		    });
		};
		// 初始化
		$scope.getBig();

		// 滑动监听
		var lastPos = 0,moveFlag = false,touchInter = null,moveTimer;// 定时器

		$scope.pauseScroll = function (event) {
			// alert("productMoveFlag="+moveFlag)
			if(moveFlag == true){
				event.preventDefault();
				event.stopPropagation();
				// lastPos = $ionicScrollDelegate.$getByHandle('navr').getScrollPosition().top;
				// $ionicScrollDelegate.$getByHandle('navr').scrollTo(0,lastPos);
				moveFlag = false;
				clearInterval(touchInter);
			}
		};

		function touchStartList() {
			clearInterval(touchInter);
			$timeout.cancel(moveTimer);
		}
		function touchMoveList() {
			moveFlag = true;
			clearInterval(touchInter);
			$timeout.cancel(moveTimer);
		}
		function touchEndList(event) {
			clearInterval(touchInter);
			if(moveFlag == true) {
				touchInter = setInterval(function () {
					if (lastPos == $ionicScrollDelegate.$getByHandle('navr').getScrollPosition().top) {
						event.preventDefault();
						event.stopPropagation();
						clearInterval(touchInter);
						moveTimer = $timeout(function () {
							moveFlag = false;
						},310);
					}
					// console.log(lastPos + "%%%%" + $ionicScrollDelegate.$getByHandle('navr').getScrollPosition().top)
					lastPos = $ionicScrollDelegate.$getByHandle('navr').getScrollPosition().top;
				}, 100);
			}
		}
		document.addEventListener('touchstart',touchStartList, false);
		document.addEventListener('touchmove',touchMoveList, false);
		document.addEventListener('touchend',touchEndList, false);

		// 下拉刷新
	    $scope.doRefresh = function () {
	      	if($scope.biglist == null || $scope.biglist == ""){
		      	$scope.getBig();
		    } else {
		      	$scope.getProduct('refresh');
		    }
	    };
		// 上拉加载更多
	    $scope.loadMore=function(){
	      	$scope.getProduct('more');
	    };

		$scope.tabPoint(); // 打红点
	    var isFirst = 1; // 标志位 暂时用来防止重复绑定$ionicView.beforeEnter事件
	    $scope.$on('$stateChangeSuccess',function(){
			if($location.path() != '/product/productlist'){
				document.removeEventListener('touchstart',touchStartList, false);
				document.removeEventListener('touchmove',touchMoveList, false);
				document.removeEventListener('touchend',touchEndList, false);
				clearInterval(touchInter);
			}
	      	if(isFirst == 1){
		        isFirst = 2;
		        $scope.$on("$ionicView.beforeEnter", function () {
		          	// $ionicScrollDelegate.scrollTop(0);
				    if($scope.biglist == null || $scope.biglist == ""){
				        $scope.getBig();
				    } else {
				        $scope.getProduct();
				    }
					$scope.tabPoint(); // 打红点
					base = $controller('baseController', { $scope: $scope });
					document.addEventListener('touchstart',touchStartList, false);
					document.addEventListener('touchmove',touchMoveList, false);
					document.addEventListener('touchend',touchEndList, false);
	        	});
	      	}
	
	    });
	    
		// 添加到购物车
		$scope.addCart=function(pid,num,src,event,index){
		  	event.preventDefault();
		    var u = localStorage.getItem("uid_local");
		    if(u == null || u == ''){
		      	localStorage.setItem("backUrlLogin", "#" + $ionicHistory.currentView().url);
		      	$location.path("/" + $scope.host + "/log");
		      	return;
		    }
		    if(num == null || num == '' || num == 0){
		      num = 1;
		    }
		    var listAry = [{'pid':pid, 'num':num,'selected': 1}];
		    var url = basePath + "getUserShoppingRecord.jsp";
		    var dataJson = {'platform': 2,'u': u,'list':JSON.stringify(listAry)};
		    var flyer = angular.element('<img class="u-flyer" src="'+src+'">');
		    event = event.toElement;
		    var obj = angular.element(event).parent().parent().parent().parent().find('.z-Limg');
		    var d1 = $q.defer();
	      	var promise1 = d1.promise;
	      	var d2 = $q.defer();
	      	var promise2 = d2.promise;
		    flyer.fly({
		      	start: {
		        	left: obj.offset().left,
		        	top: obj.offset().top
		      	},
		      	end: {
			        left: $scope.left,
			        top: $scope.top,
			        width: 0,
			        height: 0
		      	},
		      	onEnd: function(){
			        this.destory();
			        d1.resolve();
		        }
		    });
			if($scope.listGoods[index].flag == 1 || $scope.listGoods[index].flag == '1'){
		        $mainServices.post(url, dataJson, false).success(function (jsonObj) {
		            if(jsonObj != null && jsonObj != undefined ||  jsonObj != ""){
		              	if(jsonObj.judge != "ok"){
		                	alert("操作失败，请稍后重试");
		                	d2.reject();
		              	} else {
		                	$scope.listGoods[index].flag = 2;
		                	var u = localStorage.getItem("uid_local");
				            if(u != null && u != ''){
				                var dataJson = {'u': u};
				                var url = basePath + "getCartNum.jsp";
				                // 异步加载数据。。。。。。。。
				                $mainServices.post(url, dataJson, false).success(function (num) {
				                    var reg = /^[0-9]*$/;
				                    if (!reg.test(num)) {
				                    	d2.resolve(num);
				                    }
				                });
				            }
		              	}
		            } else {
		            	d2.reject();
		            }
		        });
		    }
			$q.all([promise1,promise2]).then(function (v) {
			    if(v[1] == 0){
				    $rootScope.cartNumber = 0;
				} else {
				    $rootScope.cartNumber = v[1];
				}
			});
		};
    }  
  
    ctrl.$inject = ['$scope','$mainServices','$factoryServices', '$controller','$ionicScrollDelegate','$ionicHistory','$location','$q','$rootScope','$timeout'];
    return ctrl;  
      
}); 