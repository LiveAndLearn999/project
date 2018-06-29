define(function () {  
    'use strict';  
    function ctrl($scope,$ionicHistory,$mainServices,$controller,$interval,$ionicScrollDelegate,$location,$q,$timeout) {
    	$scope.listGoods = []; // 产品列表
		$scope.isGoodsShow = true;
		$scope.jjjx = [];
		var idList = []; // 用于存放倒计时产品的对象信息
		var base = $controller('baseController', { $scope: $scope });
		var d1 = $q.defer();
		var promise1 = d1.promise;

		// 即将揭晓
		$scope.getProductPublic = function(t){
			d1 = $q.defer();
			promise1 = d1.promise;
			// 是否显示请求loading
			var isHide = false;
			if(t == "first"){
				if(localStorage.getItem("latestAnnouncementData") == null ||localStorage.getItem("latestAnnouncementData") == ""){
					isHide = true;
				}
				$scope.canLoadMore.nowPageMore = 0;
			}
			var url = basePath + "getProductPublic.jsp";
			var dataJson = {'toPage':($scope.canLoadMore.nowPageMore + 1)};

		    $mainServices.post(url,dataJson,isHide).success(function(JSONObjRet){
		      	$scope.canLoadMore.code = false;
		      	var JSON_list = JSONObjRet.prolistnew;
		      	var pageCount = parseInt(JSONObjRet.pageCount);
		      	var recount = parseInt(JSONObjRet.recount);
		      	$scope.canLoadMore.nowPageMore = parseInt(JSONObjRet.showPage);
 				// 清除默认显示的缓存
				if(t != "more" && JSON_list.length > 0){
					$scope.listGoods = [];
					var len = idList.length;
					if(len >0){
						for(var i =0;i<len;i++){
							$interval.cancel($scope.jjjx[idList[i].id]);
							$scope.jjjx[idList[i].id] = undefined;
						}
						idList = [];
					}
				}
		       	if(recount <= 0){
		            $scope.isGoodsShow = false;
		            $scope.canLoadMore.code=false;
		            return;
		        }else{
		            $scope.isGoodsShow = true;
		        }
		      	if(JSON_list.length > 0){
		        	var curLen = $scope.listGoods.length;
		        	for(var i=0;i<JSON_list.length;i++){
		          		var id = JSON_list[i].id;
		          		var publictime = JSON_list[i].publictime; // 揭晓时间
		          		var pid = JSON_list[i].pid;
		          		var pterm = JSON_list[i].pterm;
		          		var ptitle = JSON_list[i].ptitle;
		          		var pic = JSON_list[i].pic;
		          		var price = JSON_list[i].price;
		          		ptitle = "(第"+pterm+"期)" + ptitle;
		          		pic = $mainServices.getHttpOrlocalProPic(pic);
		          		var winnerid = JSON_list[i].winnerid;
		          		var nickname = JSON_list[i].nickname;// 获奖者
		          		var num_total = JSON_list[i].renci;// 本期参与总人次
						var publicParse = new Date(Date.parse($mainServices.getTimeNo_0(publictime).replace(/-/g,"/")));
						var pubTime =  Date.UTC(publicParse.getFullYear(),publicParse.getMonth() ,publicParse.getDate(),publicParse.getHours(),publicParse.getMinutes(),publicParse.getSeconds())-3600000*8; //转换成毫秒数
		          		var nowTime = JSONObjRet.presentTime;
		          		var ifRepeat = false;
						var ptype = JSON_list[i].ptype;// 区分1原来商品还是2新手专区商品
		          		for(var a=0;a<curLen;a++ ){
		              		if(id ==  $scope.listGoods[a].id){
		                  		ifRepeat = true;
		                  		break;
		              		}
		          		}
		
		          		if(ifRepeat){
		              		continue;
		          		}
				        if(nowTime < pubTime){
				            // 正在倒计时
							if(ptype == '2'){
								var url1 = "#/" + $scope.host + "/newbieDetail?type=2&pid=" + pid+"&pterm=" + pterm;
								var url2 = "#/" + $scope.host + "/newbieDetail?type=1&pid=" + pid+"&pterm=" + pterm;
							} else {
								var url1 = "#/" + $scope.host + "/newproductdetail?type=2&pid=" + pid+"&pterm=" + pterm;
								var url2 = "#/" + $scope.host + "/newproductdetail?type=1&pid=" + pid+"&pterm=" + pterm;
							}
				            $scope.listGoods.push({type1:"show",type2:"show",show:"none",url1:url1,url2:url2,pid:pid,pterm:pterm,id:id,pic:pic,ptitle1:ptitle,ptitle2:ptitle,nickname:nickname,num_total:num_total,price:price,publictime:$mainServices.getTimeNo_0(publictime)});
				            idList.push({pid:pid,pubTime:pubTime,id:id,nowTime:nowTime});
				            daojishiInt(pid,pubTime,id,nowTime);
				        }else{
				            // 已经揭晓
							if(ptype == '2'){
								var url1 = "#/" + $scope.host + "/newbieDetail?type=2&pid=" + pid+"&pterm=" + pterm;
								var url2 = "#/" + $scope.host + "/newbieDetail?type=1&pid=" + pid+"&pterm=" + pterm;
							} else {
								var url1 = "#/" + $scope.host + "/newproductdetail?type=2&pid=" + pid+"&pterm=" + pterm;
								var url2 = "#/" + $scope.host + "/newproductdetail?type=1&pid=" + pid+"&pterm=" + pterm;
							}
				            $scope.listGoods.push({type1:"show",type2:"",show:"block",url1:url1,url2:url2,pid:pid,pterm:pterm,id:id,pic:pic,ptitle1:ptitle,ptitle2:ptitle,nickname:nickname,num_total:num_total,price:price,publictime:$mainServices.getTimeNo_0(publictime)});
				        }
				
				    }
				    if(t != "more"){
						localStorage.setItem("latestAnnouncementData",JSON.stringify(JSONObjRet));
					}
				}
				d1.resolve();
				$ionicScrollDelegate.resize();

				if($scope.canLoadMore.nowPageMore == pageCount || recount <= 0){
				    $scope.canLoadMore.code = false;
				} else if (pageCount > $scope.canLoadMore.nowPageMore && recount > 0){
				    $scope.canLoadMore.code = true;
				}
				if(t == "more"){
				    $scope.$broadcast('scroll.infiniteScrollComplete');
				} else if(t != "first"){
				    $scope.$broadcast('scroll.refreshComplete');
				}
		    }).error(function () {
				d1.resolve();
			});
		}
		// 启动倒计时
		function daojishiInt(pid,publictime,id,nowTime) {
			$scope.publicProductdaojishi(pid, publictime,id,nowTime);
		}
		// 倒计时判断
		$scope.publicProductdaojishi = function(pid_,public_time,id,nowTime){
		    var t = public_time - nowTime;
			$scope.jjjx[id] =  $interval(function () {
				if(t > 0){
					var m = 0;
					var s = 0;
					var s_m_100 = t + "";

					if(t >= 0) {
						m = Math.floor(t / 1000 / 60 % 60);
						s = Math.floor(t / 1000 % 60);
						s_m_100 = s_m_100.substr(s_m_100.length - 3, 2); //截取毫秒前两位
					}
					m = m + "";
					s = s + "";
					if(m.length == 1){
						m = "0" + m;
					}
					if(s.length == 1){
						s = "0" + s;
					}
					// console.log("id="+id);
					angular.element("#daojishi_span_"+id).html("&nbsp;&nbsp;&nbsp;&nbsp;"+m+":"+s+":"+s_m_100);
					t -= 30;
				}else{
					//删除倒计时状态
					$interval.cancel($scope.jjjx[id]);
					idList.removeById(id);
					$scope.jjjx[id] = undefined;
					angular.element("#daojishi_ul_"+id).remove();
					//显示已经揭晓状态
					angular.element("#yijiexiao_ul_"+id).show();
					$ionicScrollDelegate.resize();
				}
			},30);
		};
		$scope.skip = function(url){
      		skip(url);
  		}

  		// 初始化
		$scope.getProductPublicRecord = function(){
			d1 = $q.defer();
			promise1 = d1.promise;
			var JSONObjRet = localStorage.getItem("latestAnnouncementData");
			if(JSONObjRet == null || JSONObjRet == ""){
				$scope.getProductPublic('first'); // 获取正在倒计时的商品列表
				return;
			}
			JSONObjRet = JSON.parse(JSONObjRet);
			$scope.canLoadMore.code = false;
			var JSON_list = JSONObjRet.prolistnew;
			var pageCount = parseInt(JSONObjRet.pageCount);
			var recount = parseInt(JSONObjRet.recount);
			$scope.canLoadMore.nowPageMore = parseInt(JSONObjRet.showPage);

			if(recount <= 0){
				$scope.isGoodsShow = false;
				$scope.canLoadMore.code=false;
				return;
			}else{
				$scope.isGoodsShow = true;
			}
			if(JSON_list.length > 0){
				for(var i=0;i<JSON_list.length;i++){
					var id = JSON_list[i].id;
					var publictime = JSON_list[i].publictime; // 揭晓时间
					var pid = JSON_list[i].pid;
					var pterm = JSON_list[i].pterm;
					var ptitle = JSON_list[i].ptitle;
					var pic = JSON_list[i].pic;
					var price = JSON_list[i].price;
					ptitle = "(第"+pterm+"期)" + ptitle;
					pic = $mainServices.getHttpOrlocalProPic(pic);
					var winnerid = JSON_list[i].winnerid;
					var nickname = JSON_list[i].nickname;// 获奖者
					var num_total = JSON_list[i].renci;// 本期参与总人次
					var publicParse = new Date(Date.parse($mainServices.getTimeNo_0(publictime).replace(/-/g,"/")));
					var pubTime =  Date.UTC(publicParse.getFullYear(),publicParse.getMonth() ,publicParse.getDate(),publicParse.getHours(),publicParse.getMinutes(),publicParse.getSeconds())-3600000*8; //转换成毫秒数
					var nowTime = JSONObjRet.presentTime;

					if(nowTime < pubTime){
						// 正在倒计时
						$scope.listGoods.push({type1:"show",type2:"show",show:"none",url1:"#/" + $scope.host + "/newproductdetail?type=2&pid=" + pid+"&pterm=" + pterm,url2:"#/" + $scope.host + "/newproductdetail?type=1&pid=" + pid+"&pterm=" + pterm,pid:pid,pterm:pterm,id:id,pic:pic,ptitle1:ptitle,ptitle2:ptitle,nickname:nickname,num_total:num_total,price:price,publictime:$mainServices.getTimeNo_0(publictime)});
						idList.push({pid:pid,pubTime:pubTime,id:id,nowTime:nowTime});
						daojishiInt(pid,pubTime,id,nowTime);
					}else{
						// 已经揭晓
						$scope.listGoods.push({type1:"show",type2:"",show:"block",url1:"#/" + $scope.host + "/newproductdetail?type=2&pid=" + pid+"&pterm=" + pterm,url2:"#/" + $scope.host + "/newproductdetail?type=1&pid=" + pid+"&pterm=" + pterm,pid:pid,pterm:pterm,id:id,pic:pic,ptitle1:ptitle,ptitle2:ptitle,nickname:nickname,num_total:num_total,price:price,publictime:$mainServices.getTimeNo_0(publictime)});
					}

				}
			}
			d1.resolve();
			$ionicScrollDelegate.resize();

			if($scope.canLoadMore.nowPageMore == pageCount || recount <= 0){
				$scope.canLoadMore.code = false;
			} else if (pageCount > $scope.canLoadMore.nowPageMore && recount > 0){
				$scope.canLoadMore.code = true;
			}
			$scope.getProductPublic('first'); // 获取正在倒计时的商品列表
		}
		$scope.getProductPublicRecord(); // 闲显示上次记录

		// 滑动监听
		var lastPos = 0,moveFlag = false,touchInter = null,moveTimer;// 定时器

		$scope.pauseScroll = function (event) {
			// alert("publishMoveFlag="+moveFlag)
			if(moveFlag == true){
				event.preventDefault();
				event.stopPropagation();
				// lastPos = $ionicScrollDelegate.getScrollPosition().top;
				// $ionicScrollDelegate.scrollTo(0,lastPos);
				moveFlag = false;
				clearInterval(touchInter);
			}
		};
		function touchStart() {
			clearInterval(touchInter);
			$timeout.cancel(moveTimer);
		}
		function touchMove() {
			moveFlag = true;
			clearInterval(touchInter);
			$timeout.cancel(moveTimer);
		}
		function touchEnd(event) {
			clearInterval(touchInter);
			if(moveFlag == true) {
				touchInter = setInterval(function () {
					if (lastPos == $ionicScrollDelegate.getScrollPosition().top) {
						event.preventDefault();
						event.stopPropagation();
						clearInterval(touchInter);
						moveTimer = $timeout(function () {
							moveFlag = false;
						},301);
					}
					// console.log(lastPos + "+++++" + $ionicScrollDelegate.getScrollPosition().top)
					lastPos = $ionicScrollDelegate.getScrollPosition().top;
				}, 100);
			}
		}
		document.addEventListener('touchstart',touchStart, false);
		document.addEventListener('touchmove',touchMove, false);
		document.addEventListener('touchend',touchEnd, false);
		
		// 下拉刷新
	    $scope.doRefresh = function () {
	      	$scope.canLoadMore.nowPageMore = 0;
	      	$scope.getProductPublic();
	    };
	    // 上拉加载更多
	    $scope.loadMore=function(){
	      	$scope.getProductPublic('more');
	    };

		$scope.tabPoint(); // 打红点
	    var isFirst = 1; // 标志位 暂时用来防止重复绑定$ionicView.beforeEnter事件
	    $scope.$on('$stateChangeSuccess',function(){
	      	if($location.path() != '/activite/newPublishList'){
				$q.all([promise1]).then(function (v) {
					var len = idList.length;
					if(len >0){
						for(var i =0;i<len;i++){
							$interval.cancel($scope.jjjx[idList[i].id]);
							$scope.jjjx[idList[i].id] = undefined;
						}
					}
				});
				document.removeEventListener('touchstart',touchStart, false);
				document.removeEventListener('touchmove',touchMove, false);
				document.removeEventListener('touchend',touchEnd, false);
	        }

	      	if(isFirst == 1){
		        isFirst = 2;
		        $scope.$on("$ionicView.beforeEnter", function () {
		          	var idLen = idList.length;
	                if(idLen > 0){
	                    for(var i=0;i<idLen;i++){
	                        daojishiInt(idList[i].pid,idList[i].pubTime,idList[i].id,idList[i].nowTime);
	                    }
	                };
	                $scope.canLoadMore.nowPageMore = 0;
	                $ionicScrollDelegate.scrollTop(0);
	                $scope.getProductPublic();
					document.addEventListener('touchstart',touchStart, false);
					document.addEventListener('touchmove',touchMove, false);
					document.addEventListener('touchend',touchEnd, false);
					$scope.tabPoint(); // 打红点
					base = $controller('baseController', { $scope: $scope });
	        	});
	      	}
	
	    });
    }  
  
    ctrl.$inject = ['$scope', '$ionicHistory','$mainServices','$controller','$interval','$ionicScrollDelegate','$location','$q','$timeout'];
    return ctrl;  
      
}); 