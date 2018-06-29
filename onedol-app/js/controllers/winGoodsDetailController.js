define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$stateParams,$ionicPopup,$timeout) {  
    	var id = $stateParams.id;
		$scope.buy = {buyRecordDetail:'',huigou:0,bottom:''};
    	var base = $controller('baseController', { $scope: $scope });
    	
    	var u = localStorage.getItem("uid_local");
  		var uid = "";
		var url = domain2 + "draw/drawWinnerGoodsDetails.do";
        var dataJson = {'id':id,'winnerid':u,'platform':1};
        $scope.shareObj = {id:id,u:u,pname:'',pic:''}; //分享的对象
  		
  		$mainServices.postNew(url, dataJson, true).success(function (JSONObjRet) {
           	if (JSONObjRet != null && JSONObjRet != "") {
           		var drawWinnerRecord = JSONObjRet.drawWinnerRecord;
				var pid = drawWinnerRecord.pid;
				var ptitle = drawWinnerRecord.ptitle;
				$scope.shareObj.pname = ptitle;
				var pic = drawWinnerRecord.pic;
				var id = drawWinnerRecord.id;
				var intime = drawWinnerRecord.intime;
				pic = $mainServices.getHttpOrlocalProPic(pic);
				$scope.shareObj.pic = pic;
				var ostatus = drawWinnerRecord.status; // 1 待发货 2 已发货 3商品已转让 4 已收货
				var addressstatus = drawWinnerRecord.aid;
				var ptype = drawWinnerRecord.type;
				var share_status = drawWinnerRecord.shareStatus; // 0未晒单
				var logisticsStatus = '0'; // 是否显示物流信息 0无 1有
				var courierNumber = drawWinnerRecord.courierNumber;
				var source = 0;// 是否是虚拟产品  0非虚拟 1虚拟产品
				var laiyuan = drawWinnerRecord.laiyuan;
				var costprice = drawWinnerRecord.costprice;
				var price_huigou = drawWinnerRecord.priceHuigou;
				var now_term = drawWinnerRecord.nowTerm
				if(courierNumber != null && ostatus == '2' ) {
					if (laiyuan == "苏宁" && courierNumber.indexOf("sd") == -1) {
						logisticsStatus = '1';
					} else if(courierNumber.indexOf("sd") != -1){
						logisticsStatus = '1';
					}
				}
				var purl = "#/" + $scope.host + "/newproductdetail?type=1&pid=" + pid;

             	var buyRecordDetailhtml =
               		'<div class="item item-avatar padleft bigpadtb">' +
               		'<img class="imgwh" src="' + pic + '" onclick="skip(\'' + purl + '\')" />' +
               		'<p class="orange1"><em class="fontsize16 ng-binding xbt" onclick="skip(\'' + purl + '\')" >' + ptitle + '</em></p>' +
               		'<div style="padding-bottom:5px;color:#999999">' +
               		'<p style="margin-bottom: 0;line-height:20px">获得时间：<em class="ng-binding">' + $mainServices.getTimeNo_0(intime) + '</em></p>' +
					'<p style="margin-bottom: 0;line-height:20px">获得途径：<em>'+ptype+'</em></p>' +
               		'</div>' +
               		'<div class="zzjx">' +
               		'<a href="javascript:skip(\'#/' + $scope.host + '/newproductdetail?type=1&pid=' + pid + '\')" style="display:block;width:100%;height:100%;">第' + now_term + '期 正在进行</a></div></div>';



             	$scope.buy.buyRecordDetail = buyRecordDetailhtml;
				$scope.buy.huigou = price_huigou;
				$scope.buy.bottom = '<input style="width:30%;margin-right:2.5%;" type="button" value="确认发货" class="wsdz" ng-click="setAdd('+source+')" /><input style="width:30%;margin-right:2.5%;" type="button" value="商品转让" class="sphg" ng-click="setHuigou()" /><input style="width:30%;margin-right:0%;" type="button" value="去晒单" class="wsdz" ng-click="setShaidan()" />';

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
				if (addressstatus != null && addressstatus != '0') {
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
							$scope.buy.bottom = "已发货，<a onclick='setShouhuo();' style='color:#ff6600'>确认收货</a><a ng-click='setShaidan();' style='margin-left:10px;padding:0 5px;color:#ff6600'>去晒单</a><a href='#/"+$scope.host+"/logisticsAct/"+id+"' style='margin-left:10px;padding:0 5px;color:#ff6600'>查看物流信息</a>";
							if (share_status == '1'){
								$scope.buy.bottom = "已发货，<a onclick='setShouhuo();' style='color:#ff6600'>确认收货</a><a href='#/"+$scope.host+"/logisticsAct/"+id+"' style='margin-left:10px;padding:0 5px;color:#ff6600'>查看物流信息</a>";
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
							$scope.buy.bottom = "已收货，<a ng-click='setShaidan();' style='color:#ff6600'>去晒单</a><a href='#/"+$scope.host+"/logisticsAct/"+id+"' style='margin-left:10px;padding:0 5px;color:#ff6600'>查看物流信息</a>";
							if (share_status == '1'){
								$scope.buy.bottom = "已确认收货。<a href='#/"+$scope.host+"/logisticsAct/"+id+"' style='margin-left:10px;padding:0 5px;color:#ff6600'>查看物流信息</a>";
							}
						}
					}
				}

           	}
        });
        
        // 完善地址/确认发货
		$scope.setAdd = function (source) {
			if(source == "1" || source == 1){
				skip('#/' + $scope.host + '/userVirtualAddrActSubmit/' + id);
			} else {
				skip('#/' + $scope.host + '/userAddressActSel/' + id);
			}
		}
        // 商品转让
        $scope.setHuigou = function () {
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
						$scope.buy.bottom = '商品已转让。';
						var share_status = JSONObjRet.share;
						if(share_status == '0'){
							$scope.buy.bottom = '商品已转让，<a ng-click="setShaidan();" style="color:#ff6600">去晒单</a>';
						}
					}
				});
            });
        }
        // 去晒单
        $scope.setShaidan = function () {
			skip('#/' + $scope.host + '/shaidanAct/' + id);
        }
        // 确认收货
        $scope.setShouhuo = function () {
            showTankuang('确认收货吗，操作后不可更改。');
            $("#querenBtnRollback").click(function () {
                $("#tankuangIdDiv").remove();
                $(".reveal-modal-bg").remove();
				var u = localStorage.getItem("uid_local");
				var url = domain2 + "draw/confirmReceipt.do";
				var dataJson = {'id':id,'winnerid':u,'platform':1};
				$mainServices.postNew(url,dataJson,true).success(function(JSONObjRet){
					var message = JSONObjRet.message;
					alert(message);
					if(JSONObjRet.ret == "success"){
						$scope.buy.bottom = "已确认收货";
						var share_status = JSONObjRet.share;
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
                $mainServices.goodsActWeixinShare(type,JSON.stringify($scope.shareObj));
                $timeout(function () {
                    myPopup.close();
                }, 1000);
            }
        }
        
        // 获得的商品回调
        window.shareCallBackFn = function(type){// type 0微信好友 1微信朋友圈 2新浪微博
            // var url_share = domain2+"shareRecord/insertShareRecord.do";
            // var dataJson_share = {productId:pid,productTerm:pterm,userId:u,productName:$scope.shareObj.pname,platform:2,shareResource:type};
            showTankuangOneBtn('分享成功！');
            $("#querenBtnRollback").click(function () {
                $("#tankuangIdDiv").remove();
                $(".reveal-modal-bg").remove();
            });
            // $mainServices.postNew(url_share,dataJson_share,false).success(function(JSON_list){});
        }
        
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$stateParams','$ionicPopup','$timeout'];  
    return ctrl;  
      
}); 