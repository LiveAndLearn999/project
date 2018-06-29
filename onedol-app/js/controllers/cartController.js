define(function () {  
    'use strict';  
    function ctrl($scope,$ionicHistory,$mainServices,$factoryServices,$controller,$rootScope,$ionicScrollDelegate,$location,$ionicTabsDelegate,$q) {
    	$scope.carts = [];
		$scope.rqtjList = [];
	    $scope.summoney = 0;// 总价
	    $scope.cart_length = 0;// 购物车商品数量
	    $scope.choose = ["","on"]; // 是否全选样式
	    $scope.cartNoneSpan = '购物车是空的呦~'; // 购物车为空的文字
	    $scope.cartNoneA = '去逛逛'; // 购物车为空的链接文字
    	var base = $controller('baseController', { $scope: $scope });

    	// 购物车页面
	    $scope.getCart = function() {
	        $scope.choose = ["","on"];
	        $scope.summoney = 0;// 总价
	        $scope.carts = [];
	        $scope.cart_length = 0;//购物车商品数量
	        var u = localStorage.getItem("uid_local");
	        if (u == null || u == '') {
	        	$scope.cartNoneSpan = '您还没有登录';
	        	$scope.cartNoneA = '去登录';
	            localStorage.setItem("backUrlLogin", "#/" + $scope.host + "/cart");
	            $scope.toBuy = function () {
	                $location.path("/" + $scope.host + "/log");
	            }
	            $rootScope.cartNumber = 0;
				$scope.getHotProduct();
	            return;
	        } else {
	            $scope.toBuy = function () {
	                $ionicTabsDelegate.select(0);
	            } 
	        }
	
	        var sel_all = true;//全选状态
	        var url = basePath + "getCart.jsp";
	        var dataJson = {'u': u};
	        $mainServices.post(url, dataJson, true).success(function (JSONObj) {
	            if(JSONObj == null || JSONObj == undefined || JSONObj == ""){
	            	return;
	            };
	            var JSON_list = JSONObj.cart_list;
	            var cartL = JSON_list.length;
	            if (cartL > 0) {
	                $scope.carts = [];
	                for (var i = 0; i < cartL; i++) {
	                    var pid = JSON_list[i].pid;
	                    var num = parseInt(JSON_list[i].num);
	                    var selected = JSON_list[i].selected;
	                    var now_term = JSON_list[i].now_term;
	                    var total_time = JSON_list[i].total_time;
	                    var finish_time = JSON_list[i].finish_time;
	                    var ptype = JSON_list[i].ptype;
	                    var purchase_limit_time = JSON_list[i].purchase_limit_time;
	                    var renciBuy = parseInt(JSON_list[i].renciBuy); //已购买人次
	                    var shengyu_time = parseInt(total_time) - parseInt(finish_time);
	
	                    if (shengyu_time <= 0) {
	                        continue;
	                    }
	                    var shengyu_xiangou = "剩余" + shengyu_time + "人次";
//	                    var max_buy = shengyu_time;//购买最大值
//	                    if (ptype == '2') {
//	                        shengyu_xiangou = shengyu_xiangou + "/限购" + purchase_limit_time + "人次(已购" + renciBuy + "人次)";
//	                        if (shengyu_time > (purchase_limit_time - renciBuy)) {
//	                            max_buy = purchase_limit_time - renciBuy;
//	                        }
//	                    }
//	                    if (max_buy <= 0) {
//	                        continue;
//	                    }
	                    if (num > shengyu_time) {
	                        num = shengyu_time;
	                    }
	                    var pic = JSON_list[i].pic;
	                    pic = $mainServices.getHttpOrlocalProPic(pic);
	                    var ptitle = JSON_list[i].ptitle;
	                    var sel = ""; // 单个选中状态
	                    ptitle = "(第" + now_term + "期)" + ptitle;
	                    if (selected == 1) {
	                        $scope.cart_length++;
	                        $scope.summoney += num;
	                        sel = " on";
	                    } else {
	                        sel_all = false;
	                    }
	                    var url = "#/" + $scope.host + "/newproductdetail?type=1&pid=" + pid;
	                    var cart = {pid: pid, selected: selected, sel: sel, host: $scope.host, pic: pic, ptitle: ptitle, shengyu_xiangou: shengyu_xiangou, max_buy: shengyu_time, num: num, url: url};
	                    $scope.carts.push(cart);
	                }
	                $rootScope.cartNumber = $scope.cart_length;
	            } else {
	                sel_all = false;
					$scope.cartNoneSpan = '购物车是空的呦~';
	        		$scope.cartNoneA = '去逛逛';
	                $rootScope.cartNumber = 0;
					$scope.getHotProduct();
	            }
	            if (sel_all) {
	                $scope.choose = ["on",""];
	                $scope.chkAll = 0;
	            } else {
	                $scope.choose = ["","on"];
	                $scope.chkAll = 1;
	            }
	        });
	    }

		$scope.getHotProduct = function(){
			$mainServices.postNew(domain2+"product/hotProductAction.do",{},true).success(function(JSONObjRet) {
				if(JSONObjRet.ret == "success"){
					var JSON_list = JSONObjRet.list;
					$scope.rqtjList = [];
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
						$scope.rqtjList.push({flag:1,pid:pid,pic:pic,price:price,baifenbi:baifenbi,finish_time:finish_time,total_time:total_time,shengyu_time:shengyu_time,now_term:now_term,ptitle:ptitle});
					}
				}
			});
		}

		// 添加到购物车
		$scope.addCart=function(pid,num,src,event,index){
			event.preventDefault();
			var u = localStorage.getItem("uid_local");
			if(u == null || u == ''){
				localStorage.setItem("backUrlLogin","#" + $ionicHistory.currentView().url);
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
			var imgobj = angular.element(event).parent().parent().parent().find('.m-tj-pic img');
			var d1 = $q.defer();
			var promise1 = d1.promise;
			var d2 = $q.defer();
			var promise2 = d2.promise;
			flyer.fly({
				start: {
					left: imgobj.offset().left,
					top: imgobj.offset().top
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
			if($scope.rqtjList[index].flag == 1 || $scope.rqtjList[index].flag == '1'){
				$mainServices.post(url, dataJson, false).success(function (jsonObj) {
					if(jsonObj != null && jsonObj != undefined ||  jsonObj != ""){
						if(jsonObj.judge != "ok"){
							alert("操作失败，请稍后重试");
							d2.reject();
						} else {
							$scope.rqtjList[index].flag = 2;
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
					} else{
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
				$scope.getCart();
			});
		};
	    // 是否勾选购物车
	    function isSelCart(selected,index,num) {
	        var sel = "";
	        if (selected == 1) {
	            sel = " on";
	            $scope.cart_length++;
	            $scope.summoney += parseInt(num);
	        } else {
	            $scope.cart_length--;
	            $scope.summoney -= parseInt(num);
	        }
	        $scope.carts[index].sel = sel;
	        $rootScope.cartNumber =  $scope.cart_length;
	        var selAll = true;
	        for(var i=0;i<$scope.carts.length;i++){
	            if($scope.carts[i].sel == ""){
	                selAll = false;
	            }
	        }
	        if(selAll) {
	            $scope.choose = ["on",""];
	            $scope.chkAll = 0;
	        } else {
	            $scope.choose = ["","on"];
	            $scope.chkAll = 1;
	        }
	    }
	    //单个选择
	    $scope.selCartPro = function (pid,selected,index) {
	        var selected = 0;
	        if ($scope.carts[index].sel == " on") {
	            selected = 0;
	        } else {
	            selected = 1;
	        }
	        var num = angular.element("#num_pro_" + pid).val();
	        isSelCart(selected,index,num);
	    };
	    // 全选
	    $scope.selCartProAll = function ($event) {
	        $scope.summoney = 0;
	        var len = 0;
	        $scope.cart_length = 0;
	        if($scope.choose[0] == 'on'){
	            $scope.choose = ["","on"];
	            len = $scope.carts.length;
	            for(var i=0;i<len;i++){
	                $scope.carts[i].sel = "";
	            };
	        } else {
	            $scope.choose = ["on",""];
	            len = $scope.carts.length;
	            for(var i=0;i<len;i++){
	                $scope.summoney += parseInt(angular.element("#num_pro_" + $scope.carts[i].pid).val());
	                $scope.carts[i].sel = " on";
	            }
	            $scope.cart_length = len;
	        }
	        $rootScope.cartNumber = $scope.cart_length;
	
	    };
	    
	    // 删除
	    $scope.delCartPro = function (pid,idx) {
	        var u = localStorage.getItem("uid_local");
	        var url = basePath + "delCart.jsp";
	        var dataJson = {'pid': pid, 'u': u };
	        $mainServices.post(url, dataJson, true).success(function (data) {
	            if (data) {
	                // 成功
	                $scope.carts.splice(idx,1);
	                if($scope.carts.length > 0){
	                    $scope.footerShow = true;
	                    $ionicScrollDelegate.resize();
	                    $scope.summoney = 0;
	                    $scope.cart_length = 0;
	                    for(var i=0;i<$scope.carts.length;i++){
	                        if($scope.carts[i].sel == " on"){
	                            $scope.cart_length++;
	                            $scope.summoney += parseInt(angular.element("#num_pro_" + $scope.carts[i].pid).val());
	                        }
	                    }
	                } else {
	                    $scope.choose = ["","on"];
	                    $scope.chkAll = 1;
	                    $scope.summoney = 0;
	                    $scope.cartNoneSpan = '购物车是空的呦~'; // 购物车为空的文字
	    				$scope.cartNoneA = '去逛逛'; // 购物车为空的链接文字
	                    $scope.cart_length = 0;
						$scope.getHotProduct();
	                }
	                $rootScope.cartNumber = $scope.cart_length;
	
	            } else {
	                alert("操作失败，请稍后重试。");
	            }
	        });
	    };
	    
	    // 操作数量
	    function operateNum(selected,index,status) {
	        if (selected == 1) {
	            if(status == 'add'){
	                $scope.summoney++;
	            } else if(status == 'decrease'){
	                $scope.summoney--;
	            } else if(status == 'update'){
	                $scope.summoney = 0;
	                for(var i=0;i<$scope.carts.length;i++){
	                    if($scope.carts[i].sel == " on"){
	                        $scope.summoney += parseInt(angular.element("#num_pro_" + $scope.carts[i].pid).val());
	                    }
	                }
	            }
	        }
	    }
	    
	    $scope.numAdd = function (pid, selected, max_buy,index,flag) {
	        var num = parseInt(angular.element("#num_pro_" + pid).val());
	        var selected = 0;
	        var status = 'init';
	        if ( $scope.carts[index].sel == " on") {
	            selected = 1;
	        } else {
	            selected = 0;
	        }
	        max_buy = parseInt(max_buy);
	        if (num < max_buy) {
	            num = num + 1;
	            status = 'add';
	        }
	        if(flag == "all"){
	            num = max_buy;
	            status = 'update';
	        }
	        angular.element("#num_pro_" + pid).val(num);
	        angular.element("#price_pro_" + pid).html(num);
	        $scope.carts[index].num = num;
	        operateNum(selected,index,status);
	    };
	    
	    $scope.numDecrease = function (pid, selected,index) {
	        var num = parseInt(angular.element("#num_pro_" + pid).val());
	        var selected = 0;
	        var status = 'init';
	        if ($scope.carts[index].sel == " on") {
	            selected = 1;
	        } else {
	            selected = 0;
	        }
	        if (num > 1) {
	            num = num - 1;
	            status = 'decrease';
	        }
	       	angular.element("#num_pro_" + pid).val(num);
	        angular.element("#price_pro_" + pid).html(num);
	        $scope.carts[index].num = num;
	        operateNum(selected,index,status);
	    };
	    
	    $scope.numChange = function ($event,index) {
	        var dom = $event.srcElement;
	        var pid = angular.element(dom).attr("pid");
	        var max =  parseInt(angular.element(dom).attr("max"));
	        var selected = 0;
	        if ($scope.carts[index].sel == " on") {
	            selected = 1;
	        } else {
	            selected = 0;
	        }
	        var num = angular.element(dom).val();
	        if (num != "" && !isNaN(num)) {
	            num = parseInt(num);
	            if (num > max) {
	                num = max;
	            } else if (num <= 0) {
	                num = 1;
	            }
	        } else {
	            num = 1;
	        }
	        angular.element(dom).val(num);
	        angular.element("#price_pro_" + pid).html(num);
	        $scope.carts[index].num = num;
	        $scope.summoney = 0;
	        for(var i=0;i<$scope.carts.length;i++){
	            if($scope.carts[i].sel == " on"){
	                $scope.summoney += parseInt(angular.element("#num_pro_" + $scope.carts[i].pid).val());
	            }
	        }
	    }
	    //结算
	    $scope.jiesuan = function (pid) {
	        //判断是否有选中产品
	        var u = localStorage.getItem("uid_local");
	        if (u == null || u == '') {
	            alert("请先登录。");
	            return;
	        }
	        var len = $scope.carts.length;
	        var listAry = [];
	        var num = 0;// 计算勾选的数量
	        if(len == 0){
	            alert("请购买商品。");
	            return;
	        }

	        for(var i=0;i<len;i++){
	            var selected = 0;
	            if( $scope.carts[i].sel == " on"){
	                selected = 1;
	                num++;
	            }
				if($scope.carts[i].num == undefined){
					$scope.carts[i].num = $scope.carts[i].max_buy;
				};
	            listAry.push({'pid':$scope.carts[i].pid, 'num':$scope.carts[i].num,'selected': selected});
	        }

	        if(num <= 0){
	            alert("请勾选要结算的商品。");
	        } else {
	            var url = basePath + "getUserShoppingRecord.jsp";
	            var dataJson = {'platform': 2,'u': u,'list':JSON.stringify(listAry)};
	            $mainServices.post(url, dataJson, true).success(function (jsonObj) {
	                if(jsonObj != null && jsonObj != undefined ||  jsonObj != ""){
	                    if(jsonObj.judge != "ok"){
	                        $scope.carts = [];
	                        $scope.summoney = 0;// 总价
							$scope.cart_length = 0;//购物车商品数量
							$scope.getCart();
	                        alert("您勾选的商品剩余次数不足。");
							$factoryServices.getCardNum();
	                    } else {
	                        skip('#/' + $scope.host + '/orderForm');
	                    }
	                }
	            });
	        }
	    };
	    
	    // 初始化
	    $scope.getCart();

		$scope.tabPoint(); // 打红点
	    var isFirst = 1; // 标志位 暂时用来防止重复绑定$ionicView.beforeEnter事件
	    $scope.$on("$stateChangeSuccess",function(){
	        if(isFirst == 1){
	            isFirst = 2;
	            $scope.$on("$ionicView.beforeEnter", function () {
	                $scope.getCart();
					$scope.tabPoint(); // 打红点
					base = $controller('baseController', { $scope: $scope });
	            });
	        }
	        if($location.path() != '/cart/cart'){
	            var u = localStorage.getItem("uid_local");
	            if (u == null || u == '') {
	                return;
	            }
	            if($location.path() == "/cart/orderForm"){
	                return;
	            }
	            var len = $scope.carts.length;
	            var listAry = [];
	            if(len > 0){
	                for(var i=0;i<len;i++){
	                    var selected = 0;
	                    if( $scope.carts[i].sel == " on"){
	                        selected = 1;
	                    }
	                    listAry.push({'pid':$scope.carts[i].pid, 'num':$scope.carts[i].num,'selected': selected});
	                }
	                var url = basePath + "getUserShoppingRecord.jsp";
	                var dataJson = {'platform': 2,'u': u,'list':JSON.stringify(listAry)};
	                $mainServices.post(url, dataJson, false).success(function (jsonObj) {
	                    $factoryServices.getCardNum();
	                });
	            }
	        }
	
	
	    });
    }  
  
    ctrl.$inject = ['$scope', '$ionicHistory','$mainServices','$factoryServices','$controller','$rootScope','$ionicScrollDelegate','$location','$ionicTabsDelegate','$q'];
    return ctrl;  
      
}); 