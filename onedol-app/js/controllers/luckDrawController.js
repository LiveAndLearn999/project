define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$timeout,$q,$ionicScrollDelegate) {
    	$scope.drawInfo = {hasBeenUsedCount:0,unusedCount:0,alreadyConsumed:0,stillNeedSthConsumption:0,imgurl:''};
		$scope.drawResult = {title:'',imgurl:''};//抽奖结果弹框
     	$scope.luckRule = ''; //活动规则
		$scope.isShowResult = false; //结构弹框
    	var base = $controller('baseController', { $scope: $scope });
    	var result = {};
		var rotateFlag = false;
		var timer;
     	var u = localStorage.getItem("uid_local");
  		$mainServices.postNew(domain2+"draw/checkDrawCompute.do",{userID:u,platform:1},true).success(function(JSONObjRet) {
	        if(JSONObjRet.ret == "success"){
				$scope.luckRule = JSONObjRet.description;
				$scope.drawInfo.imgurl = JSONObjRet.picUrl;
				$scope.drawInfo.hasBeenUsedCount = JSONObjRet.hasBeenUsedCount;//本月已抽奖次数
				$scope.drawInfo.unusedCount = JSONObjRet.unusedCount;//本月剩余抽奖次数
				$scope.drawInfo.alreadyConsumed = JSONObjRet.drawCompute.alreadyConsumed;//本月已消费元
				$scope.drawInfo.stillNeedSthConsumption = JSONObjRet.stillNeedSthConsumption;//本月还需消费元抽奖
				var slide = $('#luckLoop')[0],
					delta = 0,//当前滚动的位置
					speed = 100,
					wd = ($(slide).find('p').width())/2+50;
				var rolling = function(){
					delta <= -wd ? delta = 0 : delta = delta-2;
					slide.style.left = delta + "px";
				}
				timer = setInterval(rolling,speed);//设置定时器
	        } else {
	           	alert(JSONObjRet.message);
	        }
	    });


		// 点击抽奖
		$scope.rotate = function () {
			if($scope.luckRule != ''){
				if($scope.drawInfo.unusedCount == 0){
					alert('本月剩余抽奖还剩0次');
					return;
				}
				if(rotateFlag){
					return;
				}
				rotateFlag = true;
				$mainServices.postNew(domain2+"draw/drawAction.do",{userID:u,platform:1},true).success(function(JSONObjRet) {
					if(JSONObjRet.ret == "success"){
						$(".outer").rotate({
							duration: 5000,//转动时间
							angle: 0,//起始角度
							animateTo: 1440 + JSONObjRet.drawGoods.angle,//1080是三圈加上a角度
							easing: $.easing.easeInOutQuad,
							callback: function () {
								$scope.drawInfo.hasBeenUsedCount++;
								if($scope.drawInfo.unusedCount > 0){
									$scope.drawInfo.unusedCount--;
								}
								$scope.drawResult.title = JSONObjRet.drawGoods.goodsName;
								$scope.drawResult.imgurl = $mainServices.getHttpOrlocalProPic(JSONObjRet.drawGoods.pic);
								$timeout(function (){
									$scope.isShowResult = true;
									rotateFlag = false;
									var ImgObj = new Image(); //判断图片是否存在
									ImgObj.src = $scope.drawResult.imgurl;
									ImgObj.onload = function() {
										if($scope.height - $('#dialogLuck').height() < 0){
											$('#dialogLuck').css('margin-top','-10px');
										} else {
											var mt = ($scope.height - $('#dialogLuck').height())/2;
											$('#dialogLuck').css('margin-top',mt+'px');
										}

									};
								})


							}
						});
						$(".bg-cont").rotate({
							duration: 5000,//转动时间
							angle: 0,//起始角度
							animateTo: -(1440 + JSONObjRet.drawGoods.angle),//1080是三圈加上a角度
							easing: $.easing.easeInOutQuad
						});
					} else {
						alert(JSONObjRet.message);
						rotateFlag = false;
					}
				});
			}
		}

		$scope.closeDialog = function (){
			$scope.isShowResult = false;
		}

		$scope.$on('$destroy', function() {
			$scope.isShowResult = false;
			clearInterval(timer);
		});

    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$timeout','$q','$ionicScrollDelegate'];
    return ctrl;  
      
}); 