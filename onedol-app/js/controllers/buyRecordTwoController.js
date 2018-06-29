define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$ionicScrollDelegate,$ionicPopup,$timeout,$stateParams) {  
    	$scope.isbuyRecordShow = true;
        $scope.myText = "";
        $scope.user = {title: "购买记录"};
        $scope.shareArr = [];
    	var base = $controller('baseController', { $scope: $scope });
    	var hd = $mainServices.getQueryString('hd'); //获得商品
    	var u = localStorage.getItem("uid_local");
  		if (hd == '1') {
            $scope.user.title = "获得的商品";
       	} else {
       		hd = '0';
       	}
        var gIndex;
  		 // 获得的商品分享回调
  		window.shareCallBackFn = function(type){// type 0微信好友 1微信朋友圈 2新浪微博
        	var url_share = domain2+"shareRecord/insertShareRecord.do";
            var dataJson_share =  {productId:$scope.shareArr[gIndex].pid,productTerm:$scope.shareArr[gIndex].pterm,userId:u,productName:$scope.shareArr[gIndex].pname,platform:2,shareResource:type};
            showTankuangOneBtn('分享成功！');
            $("#querenBtnRollback").click(function () {
                $("#tankuangIdDiv").remove();
                $(".reveal-modal-bg").remove();
            });
            $mainServices.postNew(url_share,dataJson_share,false).success(function(JSON_list){});
        }
  		
  		// 完善地址/确认发货
        $scope.setAdd = function (pid,pterm,source) {
            // localStorage.setItem("backFaHuoAddress", "buyRecord,"+hd+",two");
            if(source == "1" || source == 1){
                skip('#/' + $scope.host + '/userVirtualAddrSubmit/' + pid + '/' + pterm);
            } else {
                skip('#/' + $scope.host + '/userAddressSel/' + pid + '/' + pterm);
            }
        }
        // 商品转让
        $scope.setHuigou = function (pid,pterm,radid) {
            showTankuang('确认转让吗，操作后不可更改。');
            $("#querenBtnRollback").click(function () {
                $("#tankuangIdDiv").remove();
                $(".reveal-modal-bg").remove();
                var u = localStorage.getItem("uid_local");
                var url = basePath + "setHuigou.jsp";
                var dataJson = {'pid':pid,'pterm':pterm,'u':u,'platform':2};
                $mainServices.post(url,dataJson,true).success(function(JSONObjRet){
	                var code = JSONObjRet.code;
	                var message = JSONObjRet.message;
	                alert(message);
	                if (code == 200) {
	                	$('#'+radid).find('a:lt(2)').remove();
	                }
	            });
            });
        }
        
        // 去晒单
        $scope.setShaidan = function (pid,pterm) {
            skip('#/' + $scope.host + '/shaidan?pid=' + pid + '&pterm=' + pterm);
        }
        
        // 查看物流
        $scope.seeLogistics = function (pid,pterm) {
            skip('#/' + $scope.host + '/logistics/' + pid + '/' + pterm);
        }
        
        // 确认收货
        $scope.setShouhuo = function (pid,pterm,radid) {
            showTankuang('确认收货吗，操作后不可更改。');
            $("#querenBtnRollback").click(function () {
                $("#tankuangIdDiv").remove();
                $(".reveal-modal-bg").remove();
                var u = localStorage.getItem("uid_local");
                var url = basePath + "setShouhuo.jsp";
                var dataJson = {'pid': pid, 'pterm': pterm, 'u': u, 'platform': 2};
                $mainServices.post(url,dataJson,true).success(function(JSONObjRet){
	                var code = JSONObjRet.code;
	                var message = JSONObjRet.message;
	                alert(message);
	                if (code == 200) {
	                	$('#'+radid).find('a').eq(0).remove();
                        // $('#'+radid).find('a').eq(0).show();
	                }
	            });
                
            });
        }
        
        $scope.share = function (index) {
            var myPopup = $ionicPopup.show({
                templateUrl: 'templates/mine/shareGoodsTemplate.html',
                scope: $scope,
                title: '分享给好友',
                buttons: [
                    {text: '关闭'}
                ]
            });
            myPopup.then(function (res) {
            });

            $scope.WeixinAppShare = function (type) {
                gIndex = index;
                $mainServices.goodsWeixinShare(type,JSON.stringify($scope.shareArr[index]));
                $timeout(function () {
                    myPopup.close();
                }, 1000);
            }
        }
        
  		// 获取购买列表
  		function getBuyRecord(more) {
            var nowPageMore = $scope.canLoadMore.nowPageMore;
            //加载更多
            if (more != "more") {
                nowPageMore = 1;
                $scope.myText = "";
            } else {
                nowPageMore++;
            }
            
            // 是否显示请求loading
			var isHide = false;
			if(more == "first"){
				isHide = true;
			}
			 
            var url = basePath + "buyRecord.jsp";
            var dataJson = {'toPage':nowPageMore,'u':u,'hd':hd};
            // 异步加载数据
            $mainServices.post(url, dataJson, isHide).success(function (JSONObjRet) {
                var JSON_list = JSONObjRet.odlist;
                var pageCount = parseInt(JSONObjRet.pageCount);
                var recount =  parseInt(JSONObjRet.recount);
                var showPage = parseInt(JSONObjRet.showPage);
                $scope.canLoadMore.nowPageMore = showPage;
				
                var num = 0;
                if (recount <= 0) {
                    $scope.isbuyRecordShow = false;
                    $scope.canLoadMore.code = false;
                } else {
                    $scope.isbuyRecordShow = true;
                }

                if(JSON_list.length > 0) {
                    for (var i = 0; i <JSON_list.length;i++) {
                        var pid = JSON_list[i].pid;
                        var pterm = JSON_list[i].pterm;
                        var renci = JSON_list[i].renci;
                        var publictime = JSON_list[i].publictime;
                        var winnerid = JSON_list[i].winnerid;
                        var nickname_huodezhe = JSON_list[i].winnernickname;
                        var winnerusername = JSON_list[i].winnerusername;
                        if (nickname_huodezhe == "") {
                            nickname_huodezhe = $mainServices.substringPhone(winnerusername);
                        }
                        var now_term = JSON_list[i].now_term;
                        var total_time = JSON_list[i].total_time;
                        var finish_time = JSON_list[i].finish_time;
                        var ptitle = JSON_list[i].ptitle;
                        var totitle = ptitle;
                        var price = JSON_list[i].price;
                        var pic = JSON_list[i].pic;
                        pic = $mainServices.getHttpOrlocalProPic(pic);
                        var shengyu_time = parseInt(total_time) - parseInt(finish_time);
                        var baifenbi = parseFloat(finish_time / total_time);
                        baifenbi = baifenbi.toFixed(2) * 100 + "%";
                        ptitle = "(第" + pterm + "期)" + $mainServices.subStringTitle(ptitle, 20);
                        
                        var iswinnerid = JSON_list[i].iswinnerid; //是否是中奖者 ""/"0"不是"1"是

                        // 获得的商品必须是已经揭晓的
                        if (publictime != null && publictime != "") {
                            //判断产品是否正在倒计时
                            var publicParse = new Date(Date.parse($mainServices.getTimeNo_0(publictime).replace(/-/g,"/")));
                            var pubTime =  Date.UTC(publicParse.getFullYear(),publicParse.getMonth() ,publicParse.getDate(),publicParse.getHours(),publicParse.getMinutes(),publicParse.getSeconds())-3600000*8; //转换成毫秒数
                            var nowTime = JSONObjRet.presentTime;
                            if (nowTime < pubTime) {
                                // 正在揭晓
		                        var tmp2 =
		                            '<div class="borderbottom1 shadowless pad0  disable-user-behavior"> <a href="javascript:skip(\'#/' + $scope.host + '/buyRecordDetail/' + pid + '/' + pterm + '\')">' +
		                            '<div class="gmjl">' +
		                            '<div style="float:left;position:relative"> <img class="imgwh" src="' + pic + '" />' +
		                            '<p style="left:0;bottom:0;border-radius:0 0 5px 5px"  class="yjx">正在揭晓</p>' +
		                            '</div>' +
		                            '<div class="gmjl_jt">' +
		                            '<p class="orange1"><em class="fontsize16 ng-binding xbt">' + ptitle + '</em></p>' +
		                            '<div class="pRate">' +
		                            '<div class="Progress-bar" id="29422">' +
		                            '<p class="jz">价值：￥' + price + '</p>' +
		                            '<p style="margin-bottom: 0;line-height:20px;color:#9b9b9b;">您已参与：<em class="ng-binding">' + renci + '人次</em></p>' +
		                            '<p class="u-progress"><span class="pgbar" style="width:100%;"><span class="pging"></span></span></p>' +
		                            '<ul class="Pro-bar-li">' +
		                            '<li class="P-bar01"><em>' + total_time + '</em>已参与</li>' +
		                            '<li class="P-bar02"><em>' + total_time + '</em>总需人次</li>' +
		                            '<li class="P-bar03"><em>' + 0 + '</em>剩余</li>' +
		                            '</ul></div>' +
		                            '<a class="add " codeid="29422" href="javascript:;"><s></s></a></div></div></div></a> </div>';
                                
                                if (hd == "1") {
                                    continue;
                                }
                                $scope.myText += tmp2;
                            } else {

                                // 已经揭晓
		                        var tmp3 =
		                            '<div class="borderbottom1 shadowless pad0  disable-user-behavior"> <a href="javascript:skip(\'#/' + $scope.host + '/buyRecordDetail/' + pid + '/' + pterm + '\')">' +
		                            '<div class="gmjl">' +
		                            '<div style="float:left;position:relative"> <img class="imgwh" src="' + pic + '" />' +
		                            '<p style="left:0;bottom:0;border-radius:0 0 5px 5px"  class="yjx">已揭晓</p>' +
		                            '</div>' +
		                            '<div class="gmjl_jt">' +
		                            '<p class="orange1"><em class="fontsize16 ng-binding xbt">' + ptitle + '</em></p>' +
		                            '<div style="color:#666666; font-size:12px;">' +
		                            '<p style="margin-bottom: 0;line-height:20px">您已参与：<em class="ng-binding">' + renci + '人次</em></p>' +
		                            '<p style="margin-bottom: 0;line-height:20px">获得者：<em class="ng-binding hdz">' + nickname_huodezhe + '</em></p>' +
		                            '<p style="margin-bottom: 0;line-height:20px">揭晓时间：<em class="ng-binding">' + $mainServices.getTimeNo_0(publictime) + '</em></p>' +
		                            '</div></div></div></a>';
		                        
		                        if (iswinnerid == '1'){
		                        	var ostatus = JSON_list[i].ostatus; // 1 待发货 2 已发货 3商品已转让 4 已收货
		                        	var addressstatus = JSON_list[i].addressstatus;
		                        	var share_status = JSON_list[i].share_status; // 0未晒单
               						var logisticsStatus = JSON_list[i].logisticsStatus; // 是否显示物流信息 0无 1有
                                    var source = JSON_list[i].source;// 是否是虚拟产品  0非虚拟 1虚拟产品
               						$scope.shareArr.push({pid:pid,pterm:pterm,u:u,num:renci,pname:totitle,pic:pic}); //分享的对象
               						var ranid = 'win_'+pid+'_'+pterm+'_'+parseInt(Math.random()*100);
               						var linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="setAdd('+pid+','+pterm+','+source+')">确认发货</a><a ng-click="setHuigou('+pid+','+pterm+',\''+ranid+'\')">转让</a><a ng-click="setShaidan('+pid+','+pterm+')">去晒单</a><a ng-click="share('+($scope.shareArr.length-1)+')">分享</a></div>';

                                    if(share_status == '1'){
                                        linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="setAdd('+pid+','+pterm+','+source+')">确认发货</a><a ng-click="setHuigou('+pid+','+pterm+',\''+ranid+'\')">转让</a><a ng-click="share('+($scope.shareArr.length-1)+')">分享</a></div>';
                                    }

                                    if (ostatus == '3') { // 商品已转让
                                        linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="setShaidan('+pid+','+pterm+')">去晒单</a><a ng-click="share('+($scope.shareArr.length-1)+')">分享</a></div>';
                                        if(share_status == '1'){
                                            linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="share('+($scope.shareArr.length-1)+')">分享</a></div>';
                                        }
                                    }
                                    if (addressstatus == '1') {
                                        if (ostatus == '1') { // 待发货
                                            linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="setShaidan('+pid+','+pterm+')">去晒单</a><a ng-click="share('+($scope.shareArr.length-1)+')">分享</a></div>';
                                            if(share_status == '1'){
                                                linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="share('+($scope.shareArr.length-1)+')">分享</a></div>';
                                            }
                                        }
                                        if (ostatus == '2') { // 已发货确认收货
                                            if(logisticsStatus == "0"){
                                                linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="setShouhuo('+pid+','+pterm+',\''+ranid+'\')">确认收货</a><a ng-click="setShaidan('+pid+','+pterm+')">去晒单</a><a ng-click="share('+($scope.shareArr.length-1)+')">分享</a></div>';
                                                if(share_status == '1'){
                                                    linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="setShouhuo('+pid+','+pterm+',\''+ranid+'\')">确认收货</a><a ng-click="share('+($scope.shareArr.length-1)+')">分享</a></div>';
                                                }
                                            } else {
                                                linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="setShouhuo('+pid+','+pterm+',\''+ranid+'\')">确认收货</a><a ng-click="setShaidan('+pid+','+pterm+')">去晒单</a><a ng-click="seeLogistics('+pid+','+pterm+')">查看物流</a><a ng-click="share('+($scope.shareArr.length-1)+')">分享</a></div>';
                                                if(share_status == '1'){
                                                    linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="setShouhuo('+pid+','+pterm+',\''+ranid+'\')">确认收货</a><a ng-click="seeLogistics('+pid+','+pterm+')">查看物流</a><a ng-click="share('+($scope.shareArr.length-1)+')">分享</a></div>';
                                                }
                                            }
                                        }
                                        if (ostatus == '4') { // 确认收货
                                            // 查看物流
                                            if(logisticsStatus == "0"){
                                                linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="setShaidan('+pid+','+pterm+')">去晒单</a><a ng-click="share('+($scope.shareArr.length-1)+')">分享</a></div>';
                                                if(share_status == '1'){
                                                    linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="share('+($scope.shareArr.length-1)+')">分享</a></div>';
                                                }
                                            } else {
                                                linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="setShaidan('+pid+','+pterm+')">去晒单</a><a ng-click="seeLogistics('+pid+','+pterm+')">查看物流</a><a ng-click="share('+($scope.shareArr.length-1)+')">分享</a></div>';
                                                if(share_status == '1'){
                                                    linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="seeLogistics('+pid+','+pterm+')">查看物流</a><a ng-click="share('+($scope.shareArr.length-1)+')">分享</a></div>';
                                                }
                                            }
                                        }
                                    }
               						tmp3 += linkStr;
		                        };
		                        tmp3 += ' </div>';
                                $scope.myText += tmp3;
                            }
                        } else {
                            // 未揭晓
	                        var tmp1 =
	                            '<div class="borderbottom1 shadowless pad0  disable-user-behavior"> <a href="javascript:skip(\'#/' + $scope.host + '/buyRecordDetail/' + pid + '/' + pterm + '\')">' +
	                            '<div class="gmjl">' +
	                            '<div style="float:left;position:relative"> <img class="imgwh" src="' + pic + '" />' +
	                            '<p style="left:0;bottom:0;border-radius:0 0 5px 5px" class="yjx">未揭晓</p>' +
	                            '</div>' +
	                            '<div class="gmjl_jt">' +
	                            '<p class="orange1"><em class="fontsize16 ng-binding xbt">' + ptitle + '</em></p>' +
	                            '<div class="pRate">' +
	                            '<div class="Progress-bar" id="29422">' +
	                            '<p class="jz">价值：￥' + price + '</p>' +
	                            '<p style="margin-bottom: 0;line-height:20px;color:#9b9b9b;">您已参与：<em class="ng-binding">' + renci + '人次</em></p>' +
	                            '<p class="u-progress"><span class="pgbar" style="width:' + baifenbi + ';"><span class="pging"></span></span></p>' +
	                            '<ul class="Pro-bar-li">' +
	                            '<li class="P-bar01"><em>' + finish_time + '</em>已参与</li>' +
	                            '<li class="P-bar02"><em>' + total_time + '</em>总需人次</li>' +
	                            '<li class="P-bar03"><em>' + shengyu_time + '</em>剩余</li>' +
	                            '</ul></div>' +
	                            '<a class="add " codeid="29422" href="javascript:;"><s></s></a></div></div></div></a> </div>';
	                        
                            if (hd == "1") {
                                continue;
                            }
                            $scope.myText += tmp1;
                        }
                        num++;
                    }
                    
                }
                
                $ionicScrollDelegate.resize();
                    
	            if (showPage >= pageCount || recount <= 0) {
	                $scope.canLoadMore.code = false;
	            } else {
	                $scope.canLoadMore.code = true;
	            }
	            if(more == "more"){
					$scope.$broadcast('scroll.infiniteScrollComplete');
				} else if(more != "first"){
					$scope.$broadcast('scroll.refreshComplete');
				}
                
            });
        }
  		
  		// 初始化
  		getBuyRecord('first');
  		
  		$scope.loadMore = function () {
            getBuyRecord('more');
        }
  		
  		$scope.doRefresh = function () {
            getBuyRecord();
        }
  		
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$ionicScrollDelegate','$ionicPopup','$timeout','$stateParams'];  
    return ctrl;  
      
}); 