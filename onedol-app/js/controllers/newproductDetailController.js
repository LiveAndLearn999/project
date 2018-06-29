define(function () {  
    'use strict';  
    function ctrl($scope,$rootScope,$controller,$mainServices,$timeout,$ionicScrollDelegate,$ionicTabsDelegate,$ionicHistory,$location,$q,$interval) {
    	$scope.leftAn = parseInt(window.screen.availWidth)*0.88;
    	$scope.badgeShow = false;
    	$scope.temporary = ""; // 防止加入购物车重复提交
    	var curInterval; // 倒计时对象
    	var base = $controller('baseController', { $scope: $scope });
    	var type,pid,pterm;

		// 获取购物车被勾选数量
		function getCardNum(){
		    var u = localStorage.getItem("uid_local");
		    if(u != null && u != ''){
			    var dataJson = {'u': u};
			    var url = basePath + "getCartNum.jsp";
			    //异步加载数据。。。。。。。。
		      	$mainServices.post(url,dataJson,false).success(function(num){
			        var reg = /^[0-9]*$/;
			        if (!reg.test(num)) {
			          	if(num == 0){
			            	$scope.badgeShow = false;
			            	$rootScope.cartNumber = 0;
			          	} else {
				            $scope.badgeShow = true;
				            $scope.cartNum = num;
				            $rootScope.cartNumber = num;
				        }
			
			        }
		    	});
		    }
		
		}
    	
    	// 初始操作
		$scope.init = function() {
		    type = $mainServices.getQueryString('type');
		    pid = $mainServices.getQueryString('pid');
		    pterm = $mainServices.getQueryString('pterm');
		    $scope.temporary = "";
		    if(pid == ""){
		      	type = $rootScope.pdetail.type;
		     	pid = $rootScope.pdetail.pid;
		      	pterm = $rootScope.pdetail.pterm;
		    } else {
		      	$rootScope.pdetail = {};
		      	$rootScope.pdetail.type = type;
		      	$rootScope.pdetail.pid = pid;
		      	$rootScope.pdetail.pterm = pterm;
		    }
		    $scope.random = pid+"_"+pterm;
		
		    $scope.visible = false; //是否显示倒计时
		    $scope.dqqishu = {pid:"",pterm:"",host:$scope.host};//期数选择
		    $scope.daojishi = {mm:"00",ss:"00",s_m_100:"00"};
		    $scope.bottomData = {detailUrl:"",now_term:""};
		    $scope.proData = {}; //产品详情
		    $scope.proPtermLast = {url:"",headpic:"",nickname:"",publictime:"",intime:"",luckynumber:"",winner_renci:""}; //上一期中奖人信息
		    $scope.orderShare = {}; // 晒单分享
		    $scope.showPrevPterm = false; //是否显示上一期获得者
			$interval.cancel(curInterval);
		    getCardNum();
		    if(type == "1"){
		      	$scope.current = true;
		    } else {
		      	$scope.current = false;
		      	pterm = parseInt(pterm);
		    }
		    $scope.pid = pid;
		    if(type == "1"){
		      	productDetail(true,pid,pterm); // 正在购买中
		    } else {
		      	productDetailTerm(true,pid,pterm);
		    }
		}
		
		// 正在购买中
		function productDetail(t,pid,pterm,oprFlage){
		    if(pid != null && pid != ""){
		      	var url = basePath + "getProduct_detail_v1.jsp?t="+new Date();
		      	var dataJson = {'pid':pid,'pterm':pterm};
				$scope.jinduData = {};
		      	// 异步加载数据 
		      	$mainServices.post(url, dataJson, t).success(function(jsonObj) {
		        	if(jsonObj != null) {
		          		var proInfo = jsonObj.proInfo;
		          		var now_term = parseInt(proInfo.now_term);// 当前期数
		          		var total_time = proInfo.total_time;
				        var finish_time = proInfo.finish_time;
//				        var ptype = proInfo.ptype;
//				        var purchase_limit_time = parseInt(proInfo.purchase_limit_time);
				        var price = proInfo.price;
				        var premark = proInfo.premark;
				        var pic = $mainServices.getHttpOrlocalProPic(proInfo.pic);
				        var ptitle = proInfo.ptitle;
				        var shengyu_time = parseInt(total_time) - parseInt(finish_time);
				        var baifenbi = parseFloat(finish_time / total_time);
				        baifenbi = baifenbi.toFixed(2) * 100 + "%";
		          
			          	if(pterm == null || pterm == "") {
			            	pterm = now_term;
			          	}
						var remark = proInfo.remark;
//		          		var limitP = "";
//			          	if (ptype == "2" && purchase_limit_time > 0) {
//			            	// 限购产品
//			            	limitP = "限购<span style='color:#ff9801'>" + purchase_limit_time + "</span>人次";
//			          	}
		          		// 产品基本信息
		          		$scope.proData={pic:pic,ptitle:ptitle,price:price,premark:premark,remark:remark};
						// 是否显示上一期获得者
		          		if(pterm > 1) {
				            // 查询上一期获得者
				            var proPtermLast = jsonObj.proPtermLast;
				            if (proPtermLast != null) {
				              	var publictime = proPtermLast.publictime; // 揭晓时间
				              	var nowTime = parseInt(proInfo.pdintime); // 服务器当前时间
				              	// 判断产品是否正在倒计时
								var publicParse = new Date(Date.parse($mainServices.getTimeNo_0(publictime).replace(/-/g,"/")));
								var pubTime =  Date.UTC(publicParse.getFullYear(),publicParse.getMonth() ,publicParse.getDate(),publicParse.getHours(),publicParse.getMinutes(),publicParse.getSeconds())-3600000*8; //转换成毫秒数
				              	if (publictime == "" || publictime == null || nowTime < pubTime) {
				                	// 正在倒计时
				                	$scope.showPrevPterm = false; //是否显示上一期获得者
				                	$scope.bottomData = {detailUrl:"#/"+ $scope.host +"/newproductdetail?type=1&pid="+pid+"&pterm="+now_term,now_term:now_term};
				              	} else {
				                	var winnerid = proPtermLast.winnerid;
				                	var luckynumber = proPtermLast.luckynumber;
				                	var intime = proPtermLast.intime;
				                	var nickname = proPtermLast.nickname;
									var winner_renci = proPtermLast.winner_renci;
				                	var headpic = $mainServices.getHttpOrlocalHeadPic(proPtermLast.headpic);
					                if (nickname == "") {
					                  	nickname = proPtermLast.username;
					                }
				
				                	$scope.proPtermLast = {url:"#/" + $scope.host + "/userIndex/" + winnerid,headpic:headpic,nickname:nickname,publictime:$mainServices.getTimeNo_0(publictime),intime:$mainServices.getTimeNo_0(intime),luckynumber:luckynumber,winner_renci:winner_renci};
				                	$scope.bottomData = {detailUrl:"#/"+ $scope.host +"/newproductdetail?type=1&pid="+pid+"&pterm="+now_term,now_term:now_term};
				
				                	$scope.showPrevPterm = true;
				              	}
				            } else {
				              	$scope.showPrevPterm = false;
				            }
				        } else {
				            $scope.showPrevPterm = false;
				        }
				
		          		// 查询产品晒单
		          		var share_num = parseInt(proInfo.share_num);
		          		if(share_num < 0) {
		            		share_num = 0;
		          		}
		          		$scope.orderShare={url:"#/" + $scope.host + "/productorderdetailshare/" + pid+"/",share_num:share_num};
		
		          		// 判断产品是否正在倒计时
		          		var publictimelast = $mainServices.getTimeNo_0(proInfo.publictime); // 揭晓时间
		          		var nowTime = parseInt(proInfo.pdintime); // 服务器当前时间
						var publicParse = new Date(Date.parse(publictimelast.replace(/-/g, "/")));
						var pubTime =  Date.UTC(publicParse.getFullYear(),publicParse.getMonth() ,publicParse.getDate(),publicParse.getHours(),publicParse.getMinutes(),publicParse.getSeconds())-3600000*8; //转换成毫秒数
		          		if(publictimelast != "" && nowTime < pubTime) {
			            	// 正在倒计时
				            $scope.visible = true; // 显示倒计时
				            // curInterval = $timeout(function(){
				              GetRTimeMobilePD(publictimelast,pid,pterm,nowTime);
				            // },10);
				            // 产品当前期正在进行中
				            baifenbi = '100%';
				            finish_time = total_time;
				            shengyu_time = 0;
		          		} else if(now_term > pterm && nowTime >= pubTime) {
				          	$scope.visible = false; // 隐藏倒计时
							$interval.cancel(curInterval); // 关闭倒计时
				            $scope.reload("#/"+$scope.host+"/newproductdetail?type=2&pid="+pid+"&pterm="+pterm);
		          		}
		
		          		// 购买进度
		          		$scope.jinduData = {baifenbi:baifenbi,finish_time:finish_time,total_time:total_time,shengyu_time:shengyu_time};

		        	}
					$ionicScrollDelegate.resize();
		        	$scope.dqqishu.pid = pid; //期数选择
		        	$scope.dqqishu.pterm = pterm;
					if(oprFlage == "refresh"){
						$scope.$broadcast('scroll.refreshComplete');
					}
		      	});
		    }
		};
		// 倒计时
		function GetRTimeMobilePD(public_time,pid,pterm,nowTime) {
	    	var EndTime = new Date(Date.parse(public_time.replace(/-/g,"/"))); //转换成Data();
			var EndTime2 =  Date.UTC(EndTime.getFullYear(),EndTime.getMonth() ,EndTime.getDate(),EndTime.getHours(),EndTime.getMinutes(),EndTime.getSeconds())-3600000*8; //转换成毫秒数
	    	var t = EndTime2 - nowTime;
			curInterval = $interval(function(){
				if(t > 0){
					$scope.daojishi.mm = Math.floor(t / 1000 / 60 % 60)+"";
					$scope.daojishi.ss = Math.floor(t / 1000 % 60)+"";
					$scope.daojishi.s_m_100 = t+"";
					$scope.daojishi.s_m_100 =  $scope.daojishi.s_m_100.substr( $scope.daojishi.s_m_100.length - 3, 2); //截取毫秒前两位
					if($scope.daojishi.mm.length == 1){
						$scope.daojishi.mm = "0" + $scope.daojishi.mm;
					}
					if($scope.daojishi.ss.length == 1){
						$scope.daojishi.ss = "0" + $scope.daojishi.ss;
					}
					t -= 30;
				} else {
					$interval.cancel(curInterval);
					$scope.reload("#/"+$scope.host+"/newproductdetail?type=2&pid="+pid+"&pterm="+pterm);
				}
			},30);
	  	};
	  	
	  	// 查询产品期数详细
	   	function productDetailTerm(t,pid,pterm,oprFlage) {
	        if (pid != null && pid != "") {
	            var url = basePath + "getProduct_detail_pterm_v1.jsp";
	            var dataJson = {'pid': pid, 'pterm': pterm};
	
	            // 异步加载数据
	            $scope.bottomData = {};
	            $scope.productData = {};
	            $scope.jinduData = {};
	            $scope.huodezheData = {};
	            $scope.otherData = []; //获得者本期参与次数
	            // $scope.proDetail = "";
	            // $scope.buyRecords = [];
	            $scope.orderShare = {};
	            $mainServices.post(url, dataJson, t).success(function (jsonObj) {
	                if (jsonObj != null) {
	                    var proInfo = jsonObj.proInfo;
	                    var now_term = parseInt(proInfo.now_term); //当前期数
	                    var total_time = proInfo.total_time;
	                    var finish_time = proInfo.finish_time;
	                    var price = proInfo.price;
	                    var pic = $mainServices.getHttpOrlocalProPic(proInfo.pic);
	                    var ptitle = proInfo.ptitle;
						var remark = proInfo.remark;

	                    $scope.productData = {pic:pic,ptitle:ptitle,price:price,remark:remark};
	
	                    // 查询当期获得者
	                    var proPtermLast = jsonObj.proPtermLast;
	                    if (proPtermLast != null) {
	                        var winnerid = proPtermLast.winnerid;
	                        var luckynumber = proPtermLast.luckynumber;
	                        var intime = proPtermLast.intime;
	                        var publictime = proPtermLast.publictime;
	                        var nickname = proPtermLast.nickname;
	                        var headpic = $mainServices.getHttpOrlocalHeadPic(proPtermLast.headpic);
	                        var winner_renci = proPtermLast.winner_renci;
	                        if (nickname == "") {
	                            nickname = proPtermLast.username;
	                        }
	
	                        $scope.huodezheData = {uurl:"#/" + $scope.host + "/userIndex/" + winnerid,headpic:headpic,nickname:nickname,publictime:$mainServices.getTimeNo_0(publictime),intime:$mainServices.getTimeNo_0(intime),luckynumber:luckynumber};
	
	                        // 购买进度
	                        $scope.jinduData = {baifenbi:"100%",total_time:total_time,winner_renci:winner_renci};
	
	                        // 获得者本期参与次数
	                        var JSON_list_winner_shopnumber = proPtermLast.shopnumbers;
	                        if (JSON_list_winner_shopnumber != null && JSON_list_winner_shopnumber.length > 0) {
//	                            var tmpAry = [];
	                            for (var i = 0;i < JSON_list_winner_shopnumber.length;i++) {
//	                                var intime = "";
//	                                if (i == 0) {
//	                                    intime = JSON_list_winner_shopnumber[i].intime;
//	                                    $scope.winner_intime = intime;
//	                                }
	                                var shopnumber = JSON_list_winner_shopnumber[i].shopnumber;
//	                                var winnerstatus = JSON_list_winner_shopnumber[i].winnerstatus;
	                                var tmpjson = {shopnumber:shopnumber,state:""};
	                                $scope.otherData.push(tmpjson);
	                            }
//	                            $scope.otherData = tmpAry;
	                        }
	
	                        $scope.shopNumber = function(){
	                        	skip('#/'+$scope.host+'/shopnumber?pid='+pid+''+'&pterm='+pterm+'&u='+winnerid);
	                        }
	                    }
	
	                    //计算详情
	                    $scope.orderShare={url:"#/" + $scope.host + "/productJisuan/"+pid+"/"+pterm};
	
	                }
	                $scope.dqqishu.pid = pid;
	                $scope.dqqishu.pterm = pterm;
	                $scope.bottomData = {qishuUrl:"#/"+ $scope.host +"/productQishu?pid="+pid+"&pterm="+pterm,pterm:pterm,pid:pid,detailUrl:"#/"+ $scope.host +"/newproductdetail?type=1&pid="+pid+"&pterm="+now_term,now_term:now_term};
					if(oprFlage == "refresh"){
						$scope.$broadcast('scroll.refreshComplete');
					}
	            });
	        }
	    };

		// 初始化
		$scope.init(); 
		// 下拉刷新
		$scope.doRefresh=function(){
		    // $scope.recordDataJson.toPage = 0;
		    // $scope.buyRecords = [];//购买记录
		    // $scope.showTipAry = ["filter-cur",""];
		    // $scope.showTip = true;
		    $scope.temporary = "";
		    if($rootScope.pdetail.type == "1"){
				$interval.cancel(curInterval);
			    productDetail(false,pid,pterm,"refresh");
		    } else {
		        productDetailTerm(false,pid,pterm,"refresh");
		    }
		    //$scope.$broadcast('scroll.refreshComplete');
	   	};
		$scope.$on("$destroy",function(){
			$interval.cancel(curInterval);
	   	});
		
		// 重载页面
		$scope.reload = function(param){
	   		skip(param);
		   	type = $mainServices.getUrlString(param,'type');
		 	pid = $mainServices.getUrlString(param,'pid');
		    pterm = $mainServices.getUrlString(param,'pterm');
		    $scope.random = pid+"_"+pterm;
	        $scope.temporary = "";
		    if(pid == ""){
		    	type = $rootScope.pdetail.type;
	            pid = $rootScope.pdetail.pid;
				pterm = $rootScope.pdetail.pterm;
			} else {
				$rootScope.pdetail = {};
				$rootScope.pdetail.type = type;
				$rootScope.pdetail.pid = pid;
				$rootScope.pdetail.pterm = pterm;
			}
			if(type == "1"){
				$interval.cancel(curInterval);
		    	$scope.current = true;
		    } else {
		    	$scope.current = false;
		    	pterm = parseInt(pterm);
			    // $scope.canLoadRecord = false;
			    // $scope.showTip2 = false;
			    // $scope.recordDataJson = {pid:pid,pterm:pterm,toPage:0};
		    }
		    $scope.visible = false; //是否显示倒计时
			$scope.dqqishu = {pid:"",pterm:"",host:$scope.host};
			// $scope.showTip = true;
			// $scope.showTipAry = ["filter-cur",""];
			$scope.daojishi = {mm:"00",ss:"00",s_m_100:"00"};
			$scope.bottomData = {detailUrl:"",now_term:""};
			$scope.proData = {};//产品详情
		    $scope.proPtermLast = {url:"",headpic:"",nickname:"",publictime:"",intime:"",luckynumber:"",winner_renci:""};//上一期中奖人信息
		    $scope.orderShare = {};//晒单分享
		    // $scope.buyRecords = [];//购买记录
		    $scope.showPrevPterm = false;//是否展示上一期中奖人
		    // $scope.proDetail = "";//详细介绍
	        $scope.pid = pid;
	    	if(type == "1"){
		      	productDetail(true,pid,pterm);
		    } else {
		    	productDetailTerm(true,pid,pterm);
		    }
	    };
	    
	    $scope.toCart = function(){
	      	$rootScope.hideTabs ="";
	      	$ionicTabsDelegate.select(3);
	   	};
	   	
	   	// 添加到购物车
	   	$scope.addCart=function(pid,num,selected,buy,iscart,tiao_cart){
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
	     	var obj = angular.element(".cp_xq"+ $scope.random).find('.cp_xq_tp img');
	     	var src = obj.attr("src")
	     	var flyer = angular.element('<img class="u-flyer" src="'+src+'">');
	
	     	if(tiao_cart == "1"){
	       		$mainServices.post(url, dataJson, true).success(function (jsonObj) {
	         		if(jsonObj != null && jsonObj != undefined ||  jsonObj != ""){
	           			if(jsonObj.judge != "ok"){
	             			alert("操作失败，请稍后重试");
	           			} else {
	             			if(tiao_cart == "1"){
			                	$rootScope.hideTabs = ' ';
			                	$ionicTabsDelegate.select(3);
	             			} else {
	               				if(buy == 1){
		                 			// 立即购买
		                 			$rootScope.hideTabs = '';
		                 			$ionicTabsDelegate.select(3);
	               				} else {
		                 			if(iscart != 1){
		                   				getCardNum();
		                 			}
	               				}
	            			}
	           			}
	         		}
	       		});
	     	} else {
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
	           			left: $scope.leftAn,
	           			top: $scope.top,
	           			width: 0,
	           			height: 0
	         		},
	         		onEnd: function(){
	           			this.destory();
	           			d1.resolve();
			        }
	       		});
	       		if($scope.temporary != pid){
	       			$mainServices.post(url, dataJson, false).success(function (jsonObj) {
			            if(jsonObj != null && jsonObj != undefined ||  jsonObj != ""){
			               	if(jsonObj.judge != "ok"){
			                 	alert("操作失败，请稍后重试");
			                 	d2.reject();
			               	} else {
			               		d2.resolve();
			               	}	
			            }
			        });
			    }
			    $q.all([promise1,promise2]).then(function (v) {
				    if(tiao_cart == "1"){
			            $rootScope.hideTabs = ' ';
			            $ionicTabsDelegate.select(3);
			        } else {
			            if(buy == 1){
			                // 立即购买
			                $rootScope.hideTabs = '';
			                $ionicTabsDelegate.select(3);
			            } else {
			                if(iscart != 1){
			                    $scope.temporary = pid;
			                    getCardNum();
			                }
			            }
			        }
				});       
	     	}
	
	
	  	};
	  
    }  
  
    ctrl.$inject = ['$scope','$rootScope', '$controller','$mainServices','$timeout','$ionicScrollDelegate','$ionicTabsDelegate','$ionicHistory','$location','$q','$interval'];
    return ctrl;  
      
}); 