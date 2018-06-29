define(function () {  
    'use strict';  
    function ctrl($scope,$rootScope,$controller,$mainServices,$timeout,$ionicScrollDelegate,$ionicTabsDelegate,$ionicHistory,$location,$q,$interval) {
    	var curInterval; // 倒计时对象
    	var base = $controller('baseController', { $scope: $scope });
    	var type,pid,pterm;

		$scope.numAdd = function (pid, max) {
			var num = $scope.proData.num;
			if (num < max) {
				num = num + 1;
			}
			$scope.proData.num = num;
		};

		$scope.numDecrease = function (pid) {
			var num = $scope.proData.num;
			if (num > 1) {
				num = num - 1;
			}
			$scope.proData.num = num;
		};

		$scope.numChange = function (max) {
			var num = $scope.proData.num;
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
			$scope.proData.num = num;
		}

    	// 初始操作
		$scope.init = function() {
		    type = $mainServices.getQueryString('type');
		    pid = $mainServices.getQueryString('pid');
		    pterm = $mainServices.getQueryString('pterm');
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
		      	var url = basePath + "getProduct_detail_v1.jsp?t="+new Date().getTime();
		      	var dataJson = {'pid':pid,'pterm':pterm};
				$scope.jinduData = {};
		      	// 异步加载数据 
		      	$mainServices.post(url, dataJson, t).success(function(jsonObj) {
		        	if(jsonObj != null) {
		          		var proInfo = jsonObj.proInfo;
		          		var now_term = parseInt(proInfo.now_term);// 当前期数
		          		var total_time = proInfo.total_time;
				        var finish_time = proInfo.finish_time;
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
		          		// 产品基本信息
		          		$scope.proData={pic:pic,ptitle:ptitle,price:price,premark:premark,remark:remark,shengyu_time:shengyu_time,num:1};
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
				                	$scope.bottomData = {detailUrl:"#/"+ $scope.host +"/newbieDetail?type=1&pid="+pid+"&pterm="+now_term,now_term:now_term};
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
				
				                	$scope.proPtermLast = {url:"#/" + $scope.host + "/userIndex/" + winnerid,headpic:headpic,nickname:nickname,publictime:publictime,intime:$mainServices.getTimeNo_0(intime),luckynumber:luckynumber,winner_renci:winner_renci};
				                	$scope.bottomData = {detailUrl:"#/"+ $scope.host +"/newbieDetail?type=1&pid="+pid+"&pterm="+now_term,now_term:now_term};
				
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
				            $scope.reload("#/"+$scope.host+"/newbieDetail?type=2&pid="+pid+"&pterm="+pterm);
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
					$scope.reload("#/"+$scope.host+"/newbieDetail?type=2&pid="+pid+"&pterm="+pterm);
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
	                            for (var i = 0;i < JSON_list_winner_shopnumber.length;i++) {
	                                var shopnumber = JSON_list_winner_shopnumber[i].shopnumber;
	                                var tmpjson = {shopnumber:shopnumber,state:""};
	                                $scope.otherData.push(tmpjson);
	                            }
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
	                $scope.bottomData = {qishuUrl:"#/"+ $scope.host +"/productQishu?pid="+pid+"&pterm="+pterm,pterm:pterm,pid:pid,detailUrl:"#/"+ $scope.host +"/newbieDetail?type=1&pid="+pid+"&pterm="+now_term,now_term:now_term};
					if(oprFlage == "refresh"){
						$scope.$broadcast('scroll.refreshComplete');
					}
	            });
	        }
	    };

		// 初始化
		$scope.init(); 
		// 下拉刷新
		$scope.doRefresh = function(){
			$scope.visible = false; //是否显示倒计时
			$scope.dqqishu = {pid:"",pterm:"",host:$scope.host};
			$scope.daojishi = {mm:"00",ss:"00",s_m_100:"00"};
			$scope.bottomData = {detailUrl:"",now_term:""};
			$scope.proData = {};//产品详情
			$scope.proPtermLast = {url:"",headpic:"",nickname:"",publictime:"",intime:"",luckynumber:"",winner_renci:""};//上一期中奖人信息
			$scope.orderShare = {};//晒单分享
			$scope.showPrevPterm = false;//是否展示上一期中奖人
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
		    }
		    $scope.visible = false; //是否显示倒计时
			$scope.dqqishu = {pid:"",pterm:"",host:$scope.host};
			$scope.daojishi = {mm:"00",ss:"00",s_m_100:"00"};
			$scope.bottomData = {detailUrl:"",now_term:""};
			$scope.proData = {};//产品详情
		    $scope.proPtermLast = {url:"",headpic:"",nickname:"",publictime:"",intime:"",luckynumber:"",winner_renci:""};//上一期中奖人信息
		    $scope.orderShare = {};//晒单分享
		    $scope.showPrevPterm = false;//是否展示上一期中奖人
	        $scope.pid = pid;
	    	if(type == "1"){
		      	productDetail(true,pid,pterm);
		    } else {
		    	productDetailTerm(true,pid,pterm);
		    }
	    };

		$scope.orderBuy = function (){
			var u = localStorage.getItem("uid_local");
			if (u == null || u == "" || typeof(u) == "undefined") {
				localStorage.setItem("backUrlLogin", "#" + $ionicHistory.currentView().url);
				$location.path("/" + $scope.host + "/log");
				return;
			} else {
				if($scope.proData.num >= $scope.proData.shengyu_time){
					$scope.proData.num = $scope.proData.shengyu_time;
				}
				$mainServices.postNew(domain2+"orderDetailPeople/selectSprogSeniority",{user:{userID:u},orderdetailPeople:{pid:$scope.dqqishu.pid,num:$scope.proData.num,pterm:$scope.dqqishu.pterm}},true).success(function(JSONObjRet) {
					if(JSONObjRet.ret == "success"){
						skip('#/'+$scope.host+'/newOrderForm/'+$scope.dqqishu.pid+'/'+$scope.proData.num);
					} else {
						alert(JSONObjRet.message);
						if(JSONObjRet.message.indexOf('剩余购买次数') != -1){
							$scope.doRefresh();
						}
					}
				});
			}

		}
    }  
  
    ctrl.$inject = ['$scope','$rootScope', '$controller','$mainServices','$timeout','$ionicScrollDelegate','$ionicTabsDelegate','$ionicHistory','$location','$q','$interval'];
    return ctrl;  
      
}); 