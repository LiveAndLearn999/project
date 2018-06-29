define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$stateParams,$ionicScrollDelegate,$timeout) {
    	$scope.buyRecords = []; // 购买记录列表
	    $scope.buyRecordHd = []; // 获得的商品列表
	    $scope.shaidan = []; // 晒单分享列表
	    $scope.curTab = 1;
	    $scope.header = {headpic:'img/head_pic_sys.jpg'};
	    $scope.tabCss = ['xz_on','',''];
	    $scope.buyRecordOne = [false,false,false,false]; // 判断是否是没有购买记录
	    $scope.buyRecordTwo = [false,false,false,false]; // 判断是否是没有获得的商品
	    $scope.buyRecordThree = [false,false,false,false]; // 判断是否是没有晒单记录
    	var base = $controller('baseController', { $scope: $scope });
    	$scope.canLoadMore = [{code:false,showPage:1},{code:false,showPage:1},{code:false,showPage:1}];
    	
    	$scope.uid = $stateParams.u;//获取该用户id
    	if($scope.uid == null || $scope.uid == ""){
	      	$scope.uid = localStorage.getItem("uid_local");
	      	if($scope.uid == null || $scope.uid == ""){
		      	alert("参数丢失。");
		      	return;
		    }
	    }
    	
    	if($scope.uid != null || $scope.uid != "" || typeof($scope.uid) != "undefined"){
	      	var url = basePath + "getUser.jsp";
	      	var dataJson = {'u':$scope.uid,'t':6};
	      	// 异步加载数据
	      	$mainServices.post(url,dataJson,true).success(function(JSON_list){
	        	if(JSON_list.length > 0){
	          		var headpic = JSON_list[0].headpic;
	          		var username = JSON_list[0].username;
	          		var nickname = JSON_list[0].nickname;
	
	          		if(nickname == ""){
	            		nickname= $mainServices.substringPhone(username);
	          		}
	
	          		$scope.header.headpic = $mainServices.getHttpOrlocalHeadPic(headpic);
	          		$scope.header.nickname = nickname;
	          		getBuyRecord(true);// 获取购买记录
	        	}
	      	})
	    }
    	
    	// 获取购买记录
    	function getBuyRecord(isShow){
	      	var u_fwz = localStorage.getItem("uid_local");
	      	if(u_fwz == null){
	          	u_fwz = "";
	      	}
	      	var url = basePath + "buyRecordUserIndex.jsp";
	      	var dataJson = {'u':$scope.uid,u_fwz:u_fwz,toPage:$scope.canLoadMore[0].showPage};
	      	$mainServices.post(url,dataJson,isShow).success(function(JSONObjRet){
	        	var JSON_list = JSONObjRet.odlist;
	        	var pageCount = parseInt(JSONObjRet.pageCount);
	        	var showPage = parseInt(JSONObjRet.showPage);
	        	var isFriend = JSONObjRet.isFriend; // 1是好友 0不是好友
	        	var zy = JSONObjRet.zy; 
	        	if(JSON_list.length > 0){
	          		for(var i=0;i<JSON_list.length;i++){
	            		var pid = JSON_list[i].pid;
	            		var pterm = JSON_list[i].pterm;
			            var renci = JSON_list[i].renci;
			            var publictime = JSON_list[i].publictime;
			            var winnerid = JSON_list[i].winnerid;
			            var now_term = JSON_list[i].now_term;
			            var total_time = JSON_list[i].total_time;
			            var finish_time = JSON_list[i].finish_time;
						var ptype = JSON_list[i].ptype;// 区分1原来商品还是2新手专区商品

			            var shengyu_time = parseInt(total_time) - parseInt(finish_time);
			            var baifenbi = parseFloat(finish_time/total_time);
			            baifenbi = baifenbi.toFixed(2) * 100 + "%";
	
			            var ptitle =  JSON_list[i].ptitle;
			            var pic =  JSON_list[i].pic;
			            pic = $mainServices.getHttpOrlocalProPic(pic);
	
			            var jiexiaoStatus = "进行中";
			            var huodezhe_html = "";
			            var jiexiaoshijian_html = "";
			            var classColor = "gmjl_ztjs";
						if(ptype == '2'){
							var pUrl = "#/"+$scope.host+"/newbieDetail?type=1&pid="+pid+"&pterm="+pterm;
						} else {
							var pUrl = "#/"+$scope.host+"/newproductdetail?type=1&pid="+pid+"&pterm="+pterm;
						}
	            		if(publictime != null && publictime != ""){
	              			// 判断产品是否正在倒计时
							var publicParse = new Date(Date.parse($mainServices.getTimeNo_0(publictime).replace(/-/g,"/")));
							var pubTime =  Date.UTC(publicParse.getFullYear(),publicParse.getMonth() ,publicParse.getDate(),publicParse.getHours(),publicParse.getMinutes(),publicParse.getSeconds())-3600000*8; //转换成毫秒数
							var nowTime = JSONObjRet.presentTime;
			              	if(nowTime < pubTime){
			                	jiexiaoStatus = "正在揭晓";
			              	} else {
			                	jiexiaoStatus = "已揭晓";
								if(ptype == '2'){
									pUrl = "#/"+ $scope.host +"/newbieDetail?type=2&pid="+pid+"&pterm="+pterm;
								} else {
									pUrl = "#/"+ $scope.host +"/newproductdetail?type=2&pid="+pid+"&pterm="+pterm;
								}
			              	}
			              	baifenbi = "100%";
			              	shengyu_time = "0";
			              	classColor = "gmjl_zt";
			            }
	
	            		$scope.buyRecords.push({classColor:classColor,jiexiaoStatus:jiexiaoStatus,pic:pic,pUrl:pUrl,pterm:pterm,ptitle:$mainServices.subStringTitle(ptitle,25),baifenbi:baifenbi,finish_time:finish_time,total_time:total_time,shengyu_time:shengyu_time});
						
	          		}
	          		$ionicScrollDelegate.resize();
	            	$scope.canLoadMore[0].showPage = showPage;
	            	if(pageCount > showPage){
			            $timeout(function(){
			                $scope.canLoadMore[0].code = true;
			            },500);
	            	} else {
			            $scope.canLoadMore[0].code = false;
			        }
	            	$scope.$broadcast('scroll.infiniteScrollComplete');
	        	}
	        	if(zy == '2'){
	        		$scope.buyRecordOne = [true,false,false,false];
	        	} else if (JSON_list.length < 3 && JSON_list.length > 0){
	        		$scope.buyRecordOne = [false,false,false,false];
	        	}  else if (isFriend == 0 && JSON_list.length > 0){
	        		$scope.buyRecordOne = [false,false,false,true];
	        	} else if (isFriend == 0 && JSON_list.length == 0 && zy == '1'){
	        		$scope.buyRecordOne = [false,true,false,false];
	        	} else if(JSON_list.length == 0){
	        		$scope.buyRecordOne = [false,false,true,false];
	        	}
	      	});
	    }
    	// 获得的商品
    	function getBuyRecordHd(isShow){
	        var u_fwz = localStorage.getItem("uid_local");
	        if(u_fwz == null){
	            u_fwz = "";
	        }
	       	var url = basePath + "buyRecordUserIndex.jsp";
	      	var dataJson = {'u':$scope.uid,u_fwz:u_fwz,'hd':1,toPage:$scope.canLoadMore[1].showPage};
	      	$mainServices.post(url,dataJson,isShow).success(function(JSONObjRet){
	        	var JSON_list = JSONObjRet.odlist;
	        	var pageCount = parseInt(JSONObjRet.pageCount);
	        	var showPage = parseInt(JSONObjRet.showPage);
	        	var isFriend = JSONObjRet.isFriend;
	        	var zy = JSONObjRet.zy; 
	        	if(JSON_list.length > 0){
	          		for(var i=0;i<JSON_list.length;i++){
			            var pid = JSON_list[i].pid;
			            var pterm = JSON_list[i].pterm;
			            var renci = JSON_list[i].renci;
			            var publictime = JSON_list[i].publictime;
			            var winnerid = JSON_list[i].winnerid;
			            var luckynumber = JSON_list[i].luckynumber;
						var ptype = JSON_list[i].ptype;// 区分1原来商品还是2新手专区商品

			            var ptitle = JSON_list[i].ptitle;
			            var pic = JSON_list[i].pic;
			            pic = $mainServices.getHttpOrlocalProPic(pic);
			
			            var jiexiaoStatus = "进行中";
			            var huodezhe_html = "";
			            var jiexiaoshijian_html = "";
						if(ptype == '2'){
							var pUrl = "#/"+$scope.host+"/newbieDetail?type=1&pid="+pid+"&pterm="+pterm;
						} else {
							var pUrl = "#/"+$scope.host+"/newproductdetail?type=1&pid="+pid+"&pterm="+pterm;
						}
		            	if(publictime != null && publictime != ""){
		              		// 判断产品是否正在倒计时
							var publicParse = new Date(Date.parse($mainServices.getTimeNo_0(publictime).replace(/-/g,"/")));
							var pubTime =  Date.UTC(publicParse.getFullYear(),publicParse.getMonth() ,publicParse.getDate(),publicParse.getHours(),publicParse.getMinutes(),publicParse.getSeconds())-3600000*8; //转换成毫秒数
							var nowTime = JSONObjRet.presentTime;
		              		if(nowTime < pubTime){
		                		jiexiaoStatus = "正在揭晓";
		                		continue;
		              		} else {
		                		jiexiaoStatus = "已揭晓";
								if(ptype == '2'){
									pUrl = "#/"+ $scope.host +"/newbieDetail?type=2&pid="+pid+"&pterm="+pterm;
								} else {
									pUrl = "#/"+ $scope.host +"/newproductdetail?type=2&pid="+pid+"&pterm="+pterm;
								}
		              		}
		              		var baifenbi = "100%";
		              		var shengyu_time = "0";
		              		var classColor = "gmjl_zt";
		            	} else {
	              			continue;
	            		}
	
	            		$scope.buyRecordHd.push({pic:pic,pUrl:pUrl,pterm:pterm,ptitle:$mainServices.subStringTitle(ptitle,20),luckynumber:luckynumber,publictime:$mainServices.getTimeNo_0(publictime)});
	            		
	          		}
	          		$ionicScrollDelegate.resize();
	            	$scope.canLoadMore[1].showPage=showPage;
	            		
	            	if(pageCount > showPage){
	              		$timeout(function() {
	                		$scope.canLoadMore[1].code = true;
	              		},500);
	            	} else {
	              		$scope.canLoadMore[1].code = false;
	            	}
					$scope.$broadcast('scroll.infiniteScrollComplete');
	        	}
	        	if(zy == '2'){
	        		$scope.buyRecordTwo = [true,false,false,false];
	        	} else if (JSON_list.length < 3 && JSON_list.length > 0){
	        		$scope.buyRecordTwo = [false,false,false,false];
	        	} else if (isFriend == 0 && JSON_list.length > 0){
	        		$scope.buyRecordTwo = [false,false,false,true];
	        	} else if (isFriend == 0 && JSON_list.length == 0 && zy == '1'){
	        		$scope.buyRecordTwo = [false,true,false,false];
	        	} else if(JSON_list.length == 0){
	        		$scope.buyRecordTwo = [false,false,true,false];
	        	}
	      	});
	    }
    	// 晒单分享
    	function getShaidan(isShow){
	        var u_fwz = localStorage.getItem("uid_local");
	        if(u_fwz == null){
	            u_fwz = "";
	        }
	      	var url = basePath + "buyRecordUserIndex.jsp";
	      	var dataJson = {'u':$scope.uid,u_fwz:u_fwz,'sd':1,toPage:$scope.canLoadMore[2].showPage};
	      	$mainServices.post(url,dataJson,isShow).success(function(JSONObjRet){
	        	var JSON_list = JSONObjRet.odlist;
	        	var pageCount = parseInt(JSONObjRet.pageCount);
	        	var showPage = parseInt(JSONObjRet.showPage);
	        	var isFriend = JSONObjRet.isFriend;
	        	var zy = JSONObjRet.zy; 
	        	if(JSON_list.length > 0){
	          		for(var i=0;i<JSON_list.length;i++){
			            var pid = JSON_list[i].pid;
			            var pterm = JSON_list[i].pterm;
			            var renci = JSON_list[i].renci;
			            var publictime = JSON_list[i].publictime;
			            var winnerid = JSON_list[i].winnerid;
			            var luckynumber = JSON_list[i].luckynumber;
						var ptype = JSON_list[i].ptype;// 区分1原来商品还是2新手专区商品

			            var ptitle = JSON_list[i].ptitle;
			            var pic = JSON_list[i].pic;
			            pic = $mainServices.getHttpOrlocalProPic(pic);
			
			            var jiexiaoStatus = "进行中";
			            var huodezhe_html = "";
			            var jiexiaoshijian_html = "";
						if(ptype == '2'){
							var pUrl = "#/"+$scope.host+"/newbieDetail?type=2&pid="+pid+"&pterm="+pterm;
						} else {
							var pUrl = "#/"+$scope.host+"/newproductdetail?type=2&pid="+pid+"&pterm="+pterm;
						}

	            		if(publictime != null && publictime != ""){
	              			//判断产品是否正在倒计时
							var publicParse = new Date(Date.parse($mainServices.getTimeNo_0(publictime).replace(/-/g,"/")));
							var pubTime =  Date.UTC(publicParse.getFullYear(),publicParse.getMonth() ,publicParse.getDate(),publicParse.getHours(),publicParse.getMinutes(),publicParse.getSeconds())-3600000*8; //转换成毫秒数
							var nowTime = JSONObjRet.presentTime;
	              			if(nowTime < pubTime){
	                			jiexiaoStatus = "正在揭晓";
	                			continue;
	              			} else {
	                			jiexiaoStatus = "已揭晓";
	              			}
				            var baifenbi = "100%";
				            var shengyu_time = "0";
				           	var classColor = "gmjl_zt";
	            		} else {
	              			continue;
	            		}
	
	            		$scope.shaidan.push({pUrl:pUrl,pic:pic,pterm:pterm,ptitle:$mainServices.subStringTitle(ptitle,10),luckynumber:luckynumber,publictime:$mainServices.getTimeNo_0(publictime)});
						
	          		}
	          		$ionicScrollDelegate.resize();
	            	$scope.canLoadMore[2].showPage = showPage;
	            	if(pageCount>showPage){
			            $timeout(function() {
			                $scope.canLoadMore[2].code = true;
			            },500);
			        }else{
			            $scope.canLoadMore[2].code = false;
			        }
	            	$scope.$broadcast('scroll.infiniteScrollComplete');
	        	}
	        	if(zy == '2'){
	        		$scope.buyRecordThree = [true,false,false,false];
	        	} else if (JSON_list.length < 3 && JSON_list.length > 0){
	        		$scope.buyRecordThree = [false,false,false,false];
	        	}  else if (isFriend == 0 && JSON_list.length > 0){
	        		$scope.buyRecordThree = [false,false,false,true];
	        	} else if (isFriend == 0 && JSON_list.length == 0 && zy == '1'){
	        		$scope.buyRecordThree = [false,true,false,false];
	        	} else if(JSON_list.length == 0){
	        		$scope.buyRecordThree = [false,false,true,false];
	        	}
	      	});
	    }
    	// 切换
    	$scope.tab = function(t){
    		$scope.curTab = t;
    		$scope.tabCss = ['','',''];
    		$scope.tabCss[t-1] = "xz_on";
	      	$ionicScrollDelegate.resize();
	      
		  	if($scope.buyRecordHd.length==0 && t == 2){
	        	$scope.canLoadMore[1].code = false;
	        	getBuyRecordHd(true);
	      	}
		  	if($scope.shaidan.length==0 && t == 3){
	        	$scope.canLoadMore[2].code = false;
	        	getShaidan(true);
	      	}
	    };
    	
    	$scope.loadMorebuyRecord = function(){
	      	$scope.canLoadMore[0].showPage++;
	      	getBuyRecord(false);
	    };
	    $scope.loadMorebuyRecordHd = function(){
	      	$scope.canLoadMore[1].showPage++;
	      	getBuyRecordHd(false);
	    };
	    $scope.loadMoreshaidan=function(){
	      	$scope.canLoadMore[2].showPage++;
	      	getShaidan(false);
	    };
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$stateParams','$ionicScrollDelegate','$timeout'];  
    return ctrl;  
      
}); 