define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$ionicScrollDelegate,$ionicPopup,$timeout,$stateParams) {
    	$scope.isbuyRecordShow = true; // 购买获得商品是否为空
        $scope.myText = ""; // 购买获得商品是否为空
        $scope.shareArr = []; // 购买获得商品分享
        $scope.isLuckDrawShow = true; // 活动获得商品是否为空
        $scope.myActText = ""; // 活动获得商品是否为空
        $scope.shareLuckArr = []; // 活动获得商品分享
        $scope.tab = [{tabClass:'czmx',isShow:true},{tabClass:'',isShow:false}];
        $scope.canLoadRecordBuy = {code:false,nowPageMore:0}; // 购买获得商品
        $scope.canLoadRecordAct = {code:false,nowPageMore:0}; // 活动获得商品
    	var base = $controller('baseController', { $scope: $scope });
    	var hd = $stateParams.hd+''; //获得商品标志 1购买获得商品 2活动获得商品
    	var u = localStorage.getItem("uid_local");
  		var gIndex;
        var winGoodsType = localStorage.getItem("winGoodsType");
        if(winGoodsType == null){
            localStorage.setItem("winGoodsType",hd);
            winGoodsType = hd;
        }

  		 // 获得的商品分享回调
  		window.shareCallBackFn = function(type){// type 0微信好友 1微信朋友圈 2新浪微博
            showTankuangOneBtn('分享成功！');
            $("#querenBtnRollback").click(function () {
                $("#tankuangIdDiv").remove();
                $(".reveal-modal-bg").remove();
            });
        }

        // 明细切换
        $scope.tabAc = function(t){
            if(t == 0){
                $scope.tab = [{tabClass:'czmx',isShow:true},{tabClass:'',isShow:false}];
                localStorage.setItem("winGoodsType",1);
                $scope.canLoadRecordBuy.code = false;
                $scope.getBuyRecord();
            } else if(t == 1){
                $scope.tab = [{tabClass:'',isShow:false},{tabClass:'czmx',isShow:true}];
                localStorage.setItem("winGoodsType",2);
                $scope.canLoadRecordAct.code = false;
                $scope.getDrawRecord();
            }
        }

  		// 完善地址/确认发货 购买获得商品
        $scope.setAdd = function (pid,pterm,source) {
            // localStorage.setItem("backFaHuoAddress", "winGoods,"+hd);
            if(source == "1" || source == 1){
                skip('#/' + $scope.host + '/userVirtualAddrSubmit/' + pid + '/' + pterm);
            } else {
                skip('#/' + $scope.host + '/userAddressSel/' + pid + '/' + pterm);
            }
        }
        // 商品转让 购买获得商品
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
        // 去晒单 购买获得商品
        $scope.setShaidan = function (pid,pterm) {
            skip('#/' + $scope.host + '/shaidan?pid=' + pid + '&pterm=' + pterm);
        }
        // 查看物流 购买获得商品
        $scope.seeLogistics = function (pid,pterm) {
            skip('#/' + $scope.host + '/logistics/' + pid + '/' + pterm);
        }
        // 确认收货 购买获得商品
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
        // 分享 购买获得商品
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


        // 完善地址/确认发货 活动获得商品
        $scope.setAddAct = function (id,source) {
            if(source == "1" || source == 1){
                skip('#/' + $scope.host + '/userVirtualAddrActSubmit/' + id);
            } else {
                skip('#/' + $scope.host + '/userAddressActSel/' + id);
            }
        }
        // 商品转让 活动获得商品
        $scope.setHuigouAct = function (id,radid) {
            showTankuang('确认转让吗，操作后不可更改。');
            $("#querenBtnRollback").click(function () {
                $("#tankuangIdDiv").remove();
                $(".reveal-modal-bg").remove();
                var u = localStorage.getItem("uid_local");
                var url = domain2 + "draw/drawWinnerGoodsAssignment.do";
                var dataJson = {'id':id,'winnerid':u,'platform':1};
                $mainServices.postNew(url,dataJson,true).success(function(JSONObjRet){
                    var message = JSONObjRet.message;
                    alert(message);
                    if(JSONObjRet.ret == "success"){
                        $('#'+radid).find('a:lt(2)').remove();
                    }
                });
            });
        }
        // 去晒单 活动获得商品
        $scope.setShaidanAct = function (id) {
            skip('#/' + $scope.host + '/shaidanAct/' + id);
        }
        // 查看物流 活动获得商品
        $scope.seeLogisticsAct = function (id) {
            skip('#/' + $scope.host + '/logisticsAct/' + id);
        }
        // 确认收货 活动获得商品
        $scope.setShouhuoAct = function (id,radid) {
            showTankuang('确认收货吗，操作后不可更改。');
            $("#querenBtnRollback").click(function () {
                $("#tankuangIdDiv").remove();
                $(".reveal-modal-bg").remove();
                var u = localStorage.getItem("uid_local");
                // var url = basePath + "setShouhuo.jsp";
                var url = domain2 + "draw/confirmReceipt.do";
                var dataJson = {'id':id,'winnerid':u,'platform':1};
                $mainServices.postNew(url,dataJson,true).success(function(JSONObjRet){
                    var message = JSONObjRet.message;
                    alert(message);
                    if(JSONObjRet.ret == "success"){
                        $('#'+radid).find('a').eq(0).remove();
                    }
                });
            });
        }
        // 分享 活动获得商品
        $scope.shareAct = function (index) {
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
                $mainServices.goodsActWeixinShare(type,JSON.stringify($scope.shareLuckArr[index]));
                $timeout(function () {
                    myPopup.close();
                }, 1000);
            }
        }


  		// 获取购买获得商品
        $scope.getBuyRecord = function(more)  {
            var nowPageMore = $scope.canLoadRecordBuy.nowPageMore;
            // 加载更多
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
                $scope.canLoadRecordBuy.nowPageMore = showPage;
				
                var num = 0;
                if (recount <= 0) {
                    $scope.isbuyRecordShow = false;
                    $scope.canLoadRecordBuy.code = false;
                } else {
                    $scope.isbuyRecordShow = true;
                }
                if(JSON_list.length > 0) {
                    for (var i = 0; i < JSON_list.length; i++) {
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
                        var price = JSON_list[i].price;
                        var pic = JSON_list[i].pic;
                        pic = $mainServices.getHttpOrlocalProPic(pic);
                        var shengyu_time = parseInt(total_time) - parseInt(finish_time);
                        var baifenbi = parseFloat(finish_time / total_time);
                        baifenbi = baifenbi.toFixed(2) * 100 + "%";
                        var totitle = ptitle;
                        ptitle = "(第" + pterm + "期)" + $mainServices.subStringTitle(ptitle, 20);
                        
                        var iswinnerid = JSON_list[i].iswinnerid; //是否是中奖者 ""/"0"不是"1"是
                        
                        // 获得的商品必须是已经揭晓的
                        if (publictime != null && publictime != "") {
                            //判断产品是否正在倒计时
                            var publicParse = new Date(Date.parse($mainServices.getTimeNo_0(publictime).replace(/-/g,"/")));
                            var pubTime =  Date.UTC(publicParse.getFullYear(),publicParse.getMonth() ,publicParse.getDate(),publicParse.getHours(),publicParse.getMinutes(),publicParse.getSeconds())-3600000*8; //转换成毫秒数
                            var nowTime = JSONObjRet.presentTime; // 本地时间毫秒数
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
                                var luckynumber = JSON_list[i].luckynumber;
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
                                    '<p style="margin-bottom: 0;line-height:20px">幸运元行码：<em class="ng-binding hdz">' + luckynumber + '</em></p>' +
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
	                $scope.canLoadRecordBuy.code = false;
	            } else {
	                $scope.canLoadRecordBuy.code = true;
	            }
                if(more == "more"){
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            });
        }

        // 获取活动获得商品
        $scope.getDrawRecord = function(t){
            var nowPageMore = $scope.canLoadRecordAct.nowPageMore;
            // 加载更多
            if (t != "more") {
                nowPageMore = 1;
                $scope.myActText = "";
            } else {
                nowPageMore++;
            }
            // 是否显示请求loading
            var isHide = false;
            if(t == "first"){
                isHide = true;
            }
            var url = domain2 + "draw/checkDrawWinnerRecord.do";
            var dataJson = {user:{userID:u,platform:1},page:{currentPage:nowPageMore,pageNumber:10}};
            $mainServices.postNew(url,dataJson,isHide).success(function(JSONObj){
                if(JSONObj.ret == "success"){
                    var pageCount = JSONObj.page.totalPage;
                    var showPage = JSONObj.page.currentPage;
                    $scope.canLoadRecordAct.nowPageMore = showPage;
                    var JSON_list = JSONObj.drawWinnerRecord;
                    if (JSONObj.page.totalNumber <= 0) {
                        $scope.isLuckDrawShow = false;
                        $scope.canLoadRecordAct.code = false;
                    } else {
                        $scope.isLuckDrawShow = true;
                    }
                    if(JSON_list != null && JSON_list.length > 0){
                        for (var i = 0; i < JSON_list.length; i++) {
                            var ptitle = JSON_list[i].ptitle;
                            var totitle = ptitle;
                            ptitle = $mainServices.subStringTitle(ptitle, 40);
                            var pic = JSON_list[i].pic;
                            var id = JSON_list[i].id;
                            var intime = JSON_list[i].intime;
                            pic = $mainServices.getHttpOrlocalProPic(pic);
                            var ostatus = JSON_list[i].status; // 1 待发货 2 已发货 3商品已转让 4 已收货
                            var addressstatus = JSON_list[i].aid;
                            var ptype = JSON_list[i].type;
                            var share_status = JSON_list[i].shareStatus; // 0未晒单
                            var logisticsStatus = '0'; // 是否显示物流信息 0无 1有
                            var courierNumber =JSON_list[i].courierNumber;
                            var source = 0;// 是否是虚拟产品  0非虚拟 1虚拟产品
                            var laiyuan = JSON_list[i].laiyuan;
                            var costprice = JSON_list[i].costprice;
                            // if(laiyuan == "虚拟" && costprice < 500){
                            //     source = 1;
                            // }
                            if(courierNumber != null && ostatus == '2' ) {
                                if (laiyuan == "苏宁" && courierNumber.indexOf("sd") == -1) {
                                    logisticsStatus = '1';
                                } else if(courierNumber.indexOf("sd") != -1){
                                    logisticsStatus = '1';
                                }
                            }

                            $scope.shareLuckArr.push({id:id,u:u,pname:totitle,pic:pic}); //分享的对象

                            var tmp3 =
                                '<div class="borderbottom1 shadowless pad0  disable-user-behavior"> <a href="javascript:skip(\'#/' + $scope.host + '/winGoodsDetail/' + id + '\')">' +
                                '<div class="gmjl">' +
                                '<div style="float:left;position:relative"> <img class="imgwh" src="' + pic + '" />' +
                                '</div>' +
                                '<div class="gmjl_jt">' +
                                '<p class="orange1"><em class="fontsize16 ng-binding xbt">' + ptitle + '</em></p>' +
                                '<div style="color:#666666; font-size:12px;">' +
                                '<p style="margin-bottom: 0;line-height:20px">获得时间：<em>' + $mainServices.getTimeNo_0(intime) + '</em></p>' +
                                '<p style="margin-bottom: 0;line-height:20px">获得途径：<em style="color:#de0000">'+ptype+'</em></p>' +
                                '</div></div></div></a>';
                            var ranid = 'winAct_'+id+'_'+parseInt(Math.random()*100);
                            var linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="setAddAct('+id+','+source+')">确认发货</a><a ng-click="setHuigouAct('+id+',\''+ranid+'\')">转让</a><a ng-click="setShaidanAct('+id+')">去晒单</a><a ng-click="shareAct('+($scope.shareLuckArr.length-1)+')">分享</a></div>';

                            if(share_status == '1'){
                                linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="setAddAct('+id+','+source+')">确认发货</a><a ng-click="setHuigouAct('+id+',\''+ranid+'\')">转让</a><a ng-click="shareAct('+($scope.shareLuckArr.length-1)+')">分享</a></div>';
                            }

                            if (ostatus == '3') { // 商品已转让
                                linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="setShaidanAct('+id+')">去晒单</a><a ng-click="shareAct('+($scope.shareLuckArr.length-1)+')">分享</a></div>';
                                if(share_status == '1'){
                                    linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="shareAct('+($scope.shareLuckArr.length-1)+')">分享</a></div>';
                                }
                            }
                            if (addressstatus != null && addressstatus != '0') {
                                if (ostatus == '1') { // 待发货
                                    linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="setShaidanAct('+id+')">去晒单</a><a ng-click="shareAct('+($scope.shareLuckArr.length-1)+')">分享</a></div>';
                                    if(share_status == '1'){
                                        linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="shareAct('+($scope.shareLuckArr.length-1)+')">分享</a></div>';
                                    }
                                }
                                if (ostatus == '2') { // 已发货确认收货
                                    if(logisticsStatus == '0'){
                                        linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="setShouhuoAct('+id+',\''+ranid+'\')">确认收货</a><a ng-click="setShaidanAct('+id+')">去晒单</a><a ng-click="shareAct('+($scope.shareLuckArr.length-1)+')">分享</a></div>';
                                        if(share_status == '1'){
                                            linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="setShouhuoAct('+id+',\''+ranid+'\')">确认收货</a><a ng-click="shareAct('+($scope.shareLuckArr.length-1)+')">分享</a></div>';
                                        }
                                    } else {
                                        linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="setShouhuoAct('+id+',\''+ranid+'\')">确认收货</a><a ng-click="setShaidanAct('+id+')">去晒单</a><a ng-click="seeLogisticsAct('+id+')">查看物流</a><a ng-click="shareAct('+($scope.shareLuckArr.length-1)+')">分享</a></div>';
                                        if(share_status == '1'){
                                            linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="setShouhuoAct('+id+',\''+ranid+'\')">确认收货</a><a ng-click="seeLogisticsAct('+id+')">查看物流</a><a ng-click="shareAct('+($scope.shareLuckArr.length-1)+')">分享</a></div>';
                                        }
                                    }
                                }
                                if (ostatus == '4') { // 确认收货
                                    // 查看物流
                                    if(logisticsStatus == '0'){
                                        linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="setShaidanAct('+id+')">去晒单</a><a ng-click="shareAct('+($scope.shareLuckArr.length-1)+')">分享</a></div>';
                                        if(share_status == '1'){
                                            linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="shareAct('+($scope.shareLuckArr.length-1)+')">分享</a></div>';
                                        }
                                    } else {
                                        linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="setShaidanAct('+id+')">去晒单</a><a ng-click="seeLogisticsAct('+id+')">查看物流</a><a ng-click="shareAct('+($scope.shareLuckArr.length-1)+')">分享</a></div>';
                                        if(share_status == '1'){
                                            linkStr = '<div id='+ranid+' class="clearfix link-box"><a ng-click="seeLogisticsAct('+id+')">查看物流</a><a ng-click="shareAct('+($scope.shareLuckArr.length-1)+')">分享</a></div>';
                                        }
                                    }
                                }
                            }
                            tmp3 += linkStr;
                            tmp3 += ' </div>';
                            $scope.myActText += tmp3;
                        }

                    }
                    $ionicScrollDelegate.resize();

                    if(pageCount <= showPage || JSONObj.page.totalNumber <= 0){
                        $scope.canLoadRecordAct.code = false;
                    }else {
                        $scope.canLoadRecordAct.code = true;
                    }
                    if(t == "more"){
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }
                } else {
                    alert(JSONObj.message);
                }
            });
        }

        if(winGoodsType == '1'){
            // 初始化
            $scope.tab = [{tabClass:'czmx',isShow:true},{tabClass:'',isShow:false}];
            $scope.getBuyRecord('first');
        } else {
            $scope.tab = [{tabClass:'',isShow:false},{tabClass:'czmx',isShow:true}];
            $scope.getDrawRecord('first');
        }
  		
  		$scope.loadBuyMore = function () {
            $scope.getBuyRecord('more');
        }
  		$scope.loadLuckMore = function () {
            $scope.getDrawRecord('more');
        }
  		
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$ionicScrollDelegate','$ionicPopup','$timeout','$stateParams'];
    return ctrl;  
      
}); 