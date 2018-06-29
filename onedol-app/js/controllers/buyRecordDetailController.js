define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$stateParams,$ionicPopup,$timeout) {  
    	var pid = $stateParams.pid;
        var pterm = $stateParams.pterm;
        $scope.wsdz_div = false; // 是否是中奖人(显示分享和收货信息)
		$scope.buy = {shopnumberDiv:'',buyRecordDetail:'',huigou:0,tip:false,bottom:''};
    	var base = $controller('baseController', { $scope: $scope });
    	
    	var u = localStorage.getItem("uid_local");
  		var uid = "";
  		var url = basePath + "buyRecordDetail.jsp";
        var dataJson = {'pid': pid, 'pterm': pterm, 'u': u};
        $scope.shareObj = {pid:pid,pterm:pterm,u:u,num:0,pname:''}; //分享的对象
  		
  		$mainServices.post(url, dataJson, true).success(function (JSONObjRet) {
           	if (JSONObjRet != null && JSONObjRet != "") {
             	var pid = JSONObjRet.pid;
               	var pterm = JSONObjRet.pterm;
               	var renci = JSONObjRet.renci;
               	$scope.shareObj.num = renci;
               	var publictime = JSONObjRet.publictime;
               	var iswinnerid = JSONObjRet.iswinnerid; //是否是中奖者 "0"不是"1"是
               	var luckynumber = JSONObjRet.luckynumber;
               	var nickname_huodezhe = JSONObjRet.winnernickname;
               	var winnerusername = JSONObjRet.winnerusername;
               	var share_status = JSONObjRet.share_status; // 0未晒单
               	var logisticsStatus = JSONObjRet.logisticsStatus; // 是否显示物流信息 0无 1有
				var source = JSONObjRet.source;// 是否是虚拟产品  0非虚拟 1虚拟产品
				var ptype = JSONObjRet.ptype;// 区分1原来商品还是2新手专区商品
             	if (nickname_huodezhe == "") {
               		nickname_huodezhe = $mainServices.substringPhone(winnerusername);
             	}
             	var now_term = JSONObjRet.now_term;
             	var total_time = JSONObjRet.total_time;
             	var finish_time = JSONObjRet.finish_time;
             	var ptitle = JSONObjRet.ptitle;
             	$scope.shareObj.pname = ptitle;
             	var price = JSONObjRet.price;
             	var price_huigou = JSONObjRet.price_huigou;
             	var pic = JSONObjRet.pic;
             	pic = $mainServices.getHttpOrlocalProPic(pic);
             	$scope.shareObj.pic = pic;
             	var shengyu_time = parseInt(total_time) - parseInt(finish_time);
             	var baifenbi = parseFloat(finish_time / total_time);
             	baifenbi = baifenbi.toFixed(2) * 100 + "%";
             	ptitle = "(第" + pterm + "期)" + $mainServices.subStringTitle(ptitle, 20);
             	var jsonArrayShopnumbers = JSONObjRet.jsonArrayShopnumbers; // 购买元行码
             	var ostatus = JSONObjRet.ostatus; // 1 待发货 2 已发货 3商品已转让 4 已收货
             	var addressstatus = JSONObjRet.addressstatus;
             	var jiexiaoStatus = 1; //1未揭晓 2正在揭晓 3已揭晓
				if(ptype == '2'){
					var purl = "#/" + $scope.host + "/newbieDetail?type=1&pid=" + pid + "&pterm=" + now_term;
				} else {
					var purl = "#/" + $scope.host + "/newproductdetail?type=1&pid=" + pid + "&pterm=" + now_term;
				}

             	if (publictime != null && publictime != "") {
               		//判断产品是否正在倒计时
					var publicParse = new Date(Date.parse($mainServices.getTimeNo_0(publictime).replace(/-/g,"/")));
					var pubTime =  Date.UTC(publicParse.getFullYear(),publicParse.getMonth() ,publicParse.getDate(),publicParse.getHours(),publicParse.getMinutes(),publicParse.getSeconds())-3600000*8; //转换成毫秒数
               		var nowTime = JSONObjRet.milliseconds; //服务器当前时间毫秒数
               		if (nowTime < pubTime) {
                 		jiexiaoStatus = 2; // 正在揭晓
               		} else {
                 		jiexiaoStatus = 3; // 已揭晓
						if(ptype == '2'){
							purl = "#/" + $scope.host + "/newbieDetail?type=2&pid=" + pid + "&pterm=" + pterm;
						} else {
							purl = "#/" + $scope.host + "/newproductdetail?type=2&pid=" + pid + "&pterm=" + pterm;
						}

               		}
             	}
             	// 已揭晓
             	var buyRecordDetailhtml3 =
               		'<div class="item item-avatar padleft bigpadtb">' +
               		'<img style="margin-top:10px;" class="imgwh" src="' + pic + '" onclick="skip(\'' + purl + '\')" />' +
               		'<p class="orange1"><em class="fontsize16 ng-binding xbt" onclick="skip(\'' + purl + '\')" >' + ptitle + '</em></p>' +
               		'<div style="padding-bottom:5px;padding-top:5px; color:#999999">' +
               		'<p style="margin-bottom: 0;line-height:20px">您已参与：<em class="ng-binding">' + renci + '人次</em></p>' +
               		'<p style="margin-bottom: 0;line-height:20px">获得者：<em class="ng-binding hdz">' + nickname_huodezhe + '</em></p>' +
					'<p style="margin-bottom: 0;line-height:20px">幸运元行码：<em class="ng-binding hdz">' + luckynumber + '</em></p>' +
               		'<p style="margin-bottom: 0;line-height:20px">揭晓时间：<em class="ng-binding">' + $mainServices.getTimeNo_0(publictime) + '</em></p>' +
               		'</div>' +
               		'<div class="zzjx">';
				if(nickname_huodezhe == '' && luckynumber == ''){
					var buyRecordDetailhtml3 =
						'<div class="item item-avatar padleft bigpadtb">' +
						'<img style="margin-top:10px;" class="imgwh" src="' + pic + '" />' +
						'<p class="orange1"><em class="fontsize16 ng-binding xbt" >' + ptitle + '</em></p>' +
						'<div style="padding-bottom:5px;padding-top:5px; color:#999999">' +
						'<p style="margin-bottom: 0;line-height:20px">您已参与：<em class="ng-binding">' + renci + '人次</em></p>' +
						'<p style="margin-bottom: 0;line-height:20px">揭晓时间：<em class="ng-binding">' + $mainServices.getTimeNo_0(publictime) + '</em></p>' +
						'</div>' +
						'<div class="zzjx">';
				}
				if(ptype == '2'){
					buyRecordDetailhtml3 += '<a href="javascript:skip(\'#/' + $scope.host + '/newbieDetail?type=1&pid=' + pid + '&pterm=' + now_term + '\')" style="display:block;width:100%;height:100%;">第' + now_term + '期 正在进行</a></div></div>';
				} else {
					buyRecordDetailhtml3 += '<a href="javascript:skip(\'#/' + $scope.host + '/newproductdetail?type=1&pid=' + pid + '&pterm=' + now_term + '\')" style="display:block;width:100%;height:100%;">第' + now_term + '期 正在进行</a></div></div>';
				}

             	if (jiexiaoStatus == 2) {
               		finish_time = total_time;
               		shengyu_time = 0;
               		baifenbi = "100%";
             	}
             	// 未揭晓、正在揭晓
             	var buyRecordDetailhtml12 =
               		'<div class="item item-avatar padleft bigpadtb" style=" height:159px;">' +
               		'<img class="imgwh" src="' + pic + '" onclick="skip(\'' + purl + '\')" />' +
               		'<p class="orange1"><em class="fontsize16 ng-binding xbt" onclick="skip(\'' + purl + '\')" >' + ptitle + '</em></p>' +
               		'<div class="pRate">' +
               		'<div class="Progress-bar" id="29422">' +
               		'<p class="jz">价值：￥' + price + '</p>' +
               		'<p style="margin-bottom: 0;line-height:20px">您已参与：<em class="ng-binding">' + renci + '人次</em></p>' +
               		'<p class="u-progress"><span class="pgbar" style="width:' + baifenbi + ';"><span class="pging"></span></span></p>' +
               		'<ul class="Pro-bar-li">' +
               		'<li class="P-bar01"><em>' + finish_time + '</em>已参与</li>' +
               		'<li class="P-bar02"><em>' + total_time + '</em>总需人次</li>' +
               		'<li class="P-bar03"><em>' + shengyu_time + '</em>剩余</li>' +
               		'</ul></div>' +
               		'<a class="add " codeid="29422" href="javascript:;"><s></s></a></div></div>';
             	
             	if (jsonArrayShopnumbers.length > 0) {
               		for (var i = 0; i < jsonArrayShopnumbers.length; i++) {
                 		var intime = jsonArrayShopnumbers[i].intime;
                 		var renci_od = jsonArrayShopnumbers[i].renci;
                 		var shopnumbers = jsonArrayShopnumbers[i].shopnumbers;
                 		var shopnumberhtml = "<p style='color:#ff6600;clear:both;padding-left:10px;'>" + $mainServices.getTimeNo_0(intime) + " (" + renci_od + "人次) </p><a class='clearfix' href='javascript:void(0)' style='display:block;color:#999;'>";
                 		if (shopnumbers.length > 0) {
                   			for(var j = 0; j < shopnumbers.length; j++) {
                     			var shopnumber = shopnumbers[j].shopnumber;
                     			if (luckynumber == shopnumber && jiexiaoStatus == 3) {
                       				shopnumberhtml += "<span style='float:left;width:25%;line-height:30px;text-align:center;color:#ff6600;'>" + shopnumber + "</span> ";
                     			} else {
                     				shopnumberhtml += "<span style='float:left;width:25%;line-height:30px;text-align:center;'>" + shopnumber + "</span> ";
                     			}
                     		
                   			}
                 		}
                 		shopnumberhtml += "</a>";
                 		$scope.buy.shopnumberDiv += shopnumberhtml;
               		}
             	}
             	// 已揭晓
             	if (jiexiaoStatus == 3) {
             		$scope.buy.buyRecordDetail = buyRecordDetailhtml3;
             		$scope.buy.huigou = price_huigou;
             		$scope.buy.tip = true;
					$scope.buy.bottom = '<input style="width:30%;margin-right:2.5%;" type="button" value="确认发货" class="wsdz" ng-click="setAdd('+source+')" /><input style="width:30%;margin-right:2.5%;" type="button" value="商品转让" class="sphg" ng-click="setHuigou()" /><input style="width:30%;margin-right:0%;" type="button" value="去晒单" class="wsdz" ng-click="setShaidan()" />';
               		if (iswinnerid == 1) {
                 		// 展示
                 		$scope.wsdz_div = true;
						if (share_status == '1'){
							$scope.buy.bottom = '<input style="width:30%;margin-right:2.5%;" type="button" value="确认发货" class="wsdz" ng-click="setAdd('+source+')" /><input style="width:30%;margin-right:2.5%;" type="button" value="商品转让" class="sphg" ng-click="setHuigou()" />';
						}
                 		if (ostatus == '3'){
                 			$scope.buy.bottom = '商品已转让，<a ng-click="setShaidan();" style="color:#ff6600">去晒单</a>';
							if (share_status == '1'){
								$scope.buy.bottom = '商品已转让';
							}
                   			return;
                 		}
                 		if (addressstatus == '1') {
                   			if (ostatus == '1') { // 待发货
                   				$scope.buy.bottom = '地址已完善，等待发货，<a ng-click="setShaidan();" style="color:#ff6600">去晒单</a>';
								if (share_status == '1'){
									$scope.buy.bottom = '地址已完善，等待发货';
								}
                     			return;
                   			}
                   			if (ostatus == '2') { // 已发货
                       			if(logisticsStatus == "0"){
                       				$scope.buy.bottom = '已发货，<a ng-click="setShouhuo();" style="color:#ff6600">确认收货</a><a ng-click="setShaidan();" style="margin-left:10px;padding:0 5px;color:#ff6600">去晒单</a>';
									if (share_status == '1'){
										$scope.buy.bottom = '已发货，<a ng-click="setShouhuo();" style="color:#ff6600">确认收货</a>';
									}
                       			} else {
                       				$scope.buy.bottom = "已发货，<a onclick='setShouhuo();' style='color:#ff6600'>确认收货</a><a ng-click='setShaidan();' style='margin-left:10px;padding:0 5px;color:#ff6600'>去晒单</a><a href='#/"+$scope.host+"/logistics/"+pid+"/"+pterm+"' style='margin-left:10px;padding:0 5px;color:#ff6600'>查看物流信息</a>";
									if (share_status == '1'){
										$scope.buy.bottom = "已发货，<a onclick='setShouhuo();' style='color:#ff6600'>确认收货</a><a href='#/"+$scope.host+"/logistics/"+pid+"/"+pterm+"' style='margin-left:10px;padding:0 5px;color:#ff6600'>查看物流信息</a>";
									}
                       			}
                     			return;
                   			}
                   			if (ostatus == '4') { // 确认收货
                       			if(logisticsStatus == "0"){
                       				$scope.buy.bottom = '已收货，<a ng-click="setShaidan();" style="color:#ff6600">去晒单</a>';
									if (share_status == '1'){
										$scope.buy.bottom = '已确认收货';
									}
                       			} else {
                       				$scope.buy.bottom = "已收货，<a ng-click='setShaidan();' style='color:#ff6600'>去晒单</a><a href='#/"+$scope.host+"/logistics/"+pid+"/"+pterm+"' style='margin-left:10px;padding:0 5px;color:#ff6600'>查看物流信息</a>";
									if (share_status == '1'){
										$scope.buy.bottom = "已确认收货。<a href='#/"+$scope.host+"/logistics/"+pid+"/"+pterm+"' style='margin-left:10px;padding:0 5px;color:#ff6600'>查看物流信息</a>";
									}
                       			}
                   			}
                 		}
               		} else {
                 		// 不展示
                 		$scope.wsdz_div = false;
               		}
             	} else {
             		// 未揭晓、正在揭晓
             		$scope.buy.buyRecordDetail = buyRecordDetailhtml12;
             	}
           	}
        });
        
        // 完善地址/确认发货
		$scope.setAdd = function (source) {
			// localStorage.setItem("backFaHuoAddress", "buyRecordDetail");
			if(source == "1" || source == 1){
				skip('#/' + $scope.host + '/userVirtualAddrSubmit/' + pid + '/' + pterm);
			} else {
				skip('#/' + $scope.host + '/userAddressSel/' + pid + '/' + pterm);
			}
		}
        // 商品转让
        $scope.setHuigou = function () {
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
	                	$scope.buy.bottom = '商品已转让。';
						var share_status = JSONObjRet.share_status;
						if(share_status == '0'){
							$scope.buy.bottom = '商品已转让，<a ng-click="setShaidan();" style="color:#ff6600">去晒单</a>';
						}
	                }
	            });
            });
        }
        // 去晒单
        $scope.setShaidan = function () {
            skip('#/' + $scope.host + '/shaidan?pid=' + pid + '&pterm=' + pterm);
        }
        // 确认收货
        $scope.setShouhuo = function () {
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
	                	$scope.buy.bottom = "已确认收货";
						var share_status = JSONObjRet.share_status;
						if(share_status == '0'){
							$scope.buy.bottom = '已收货，<a ng-click="setShaidan();" style="color:#ff6600">去晒单</a>';
						}
	                }
	            });
                
            });
        }
        $scope.share = function () {
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
                $mainServices.goodsWeixinShare(type,JSON.stringify($scope.shareObj));
                $timeout(function () {
                    myPopup.close();
                }, 1000);
            }
        }
        
        // 获得的商品回调
        window.shareCallBackFn = function(type){// type 0微信好友 1微信朋友圈 2新浪微博
        	var url_share = domain2+"shareRecord/insertShareRecord.do";
            var dataJson_share = {productId:pid,productTerm:pterm,userId:u,productName:$scope.shareObj.pname,platform:2,shareResource:type};
            showTankuangOneBtn('分享成功！');
            $("#querenBtnRollback").click(function () {
                $("#tankuangIdDiv").remove();
                $(".reveal-modal-bg").remove();
            });
            $mainServices.postNew(url_share,dataJson_share,false).success(function(JSON_list){});
        }
        
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$stateParams','$ionicPopup','$timeout'];  
    return ctrl;  
      
}); 