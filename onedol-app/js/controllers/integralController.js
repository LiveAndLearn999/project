define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$timeout,$q,$ionicScrollDelegate,$rootScope,$ionicTabsDelegate) {
    	$scope.signInfo = {signCount:0,continuationCount:0,amount:0,summony:0,integration:0,integral:0,url:''};
		$scope.diaResult = false;
		$scope.dia = {signCount:0,integration:0,flag:0};
     	$scope.myText = '';
    	var base = $controller('baseController', { $scope: $scope });
    	var result = {};
	    var index = 0,           //当前亮区位置
	        prevIndex = 0,          //前一位置
	        Speed = 300,           //初始速度
	        Time,            //定义对象
	        arr = getSide(3,3),         //初始化数组
	        EndIndex = 0,           //决定在哪一格变慢
	        tb = $('.tb')[0],     //获取tb对象
	        cycle = 0,           //转动圈数
	        EndCycle = 0,           //计算圈数
	        flag = false,           //结束转动标志
	        quick = 0,           //加速
	        pnum;
  		var playFlag = true; // 打卡是否可以点击
     	var getFlag = true; // 领券状态
     	var u = localStorage.getItem("uid_local");

  		$mainServices.postNew(domain2+"sign/welcome.do",{userID:u},true).success(function(JSONObjRet) {
	        if(JSONObjRet.ret == "success"){
	           	var str = '';
	           	var len = JSONObjRet.data.signIntegrationInfo.length;
	           	var num = -1;
	           	for(var i=0;i<len;i++){
	             	var j = 7-i;
	             	num ++;
	             	if(num%3 == 0){
	               		if( i == 0){
	                 		str += '<tr>';
	               		} else {
	                 		str += '</tr><tr>';
	               		}
	               		str += '<td><img class="init-show" src="'+domain2+JSONObjRet.data.signIntegrationInfo[j].img+'"/><img class="load-show" src="'+domain2+JSONObjRet.data.signIntegrationInfo[j].imgSelected+'"/><p>'+JSONObjRet.data.signIntegrationInfo[j].name+'</p></td>';
	             	} else {
	               		if( i == 4 ){
	                 		if(JSONObjRet.signStatus == 1){
	                   			str += '<td class="tb-btn btn-gray">已打卡</td>';
	                   			playFlag = false;
	                 		} else {
	                   			str += '<td class="tb-btn" ng-click="play()">点我打卡</td>';
	                   			playFlag = true;
	                 		}
	                 		num ++;
	               		}
	               		str += '<td><img class="init-show" src="'+domain2+JSONObjRet.data.signIntegrationInfo[j].img+'"/><img class="load-show" src="'+domain2+JSONObjRet.data.signIntegrationInfo[j].imgSelected+'"/><p>'+JSONObjRet.data.signIntegrationInfo[j].name+'</p></td>';
	             	}
	           	}
	           	$scope.myText = str;
	           	if(JSONObjRet.data.signInfo != ""){
	             	$scope.signInfo.signCount = JSONObjRet.data.signInfo.signCount;
	             	$scope.signInfo.continuationCount = JSONObjRet.data.signInfo.continuationCount;
	             	$scope.signInfo.amount = JSONObjRet.data.signInfo.amount;
	          	}
	           	$scope.signInfo.integral = JSONObjRet.integral;
				$ionicScrollDelegate.resize();
	           	// 获取可领取积分
	           	$mainServices.postNew(domain2+"signRecord/signRecordAction.do",{userID:u},true).success(function(JSONObjRet) {
	             	if(JSONObjRet.ret == "success"){
	               		$scope.signInfo.summony = JSONObjRet.data.summony;
	               		if(JSONObjRet.data.imgsrc != "" && JSONObjRet.data.imgsrc != null){
		                 	$scope.signInfo.url = domain2+JSONObjRet.data.imgsrc;
		                 	angular.element(".img-voucher img").css("width","100%");
		               	}
		               	if(JSONObjRet.data.isok == 1){
		                 	$scope.signInfo.integration = JSONObjRet.data.integration;
		                 	angular.element('#updateFont').html("已");
		                 	getFlag = false;
		               	} else if(JSONObjRet.data.isok == 2){
		                 	angular.element('#isGetJf').html(JSONObjRet.data.message);
		                 	getFlag = false;
		               	} else {
		                 	$scope.signInfo.integration = JSONObjRet.data.integration;
		                 	getFlag = true;
		               	};
						$ionicScrollDelegate.resize();
	             	} else {
	               		alert("请求失败，请重新刷新页面");
	             	}
	           	});
	        } else {
	           	alert("请求失败，请重新刷新页面");
	        }
	    });
  		
  		$scope.$on('$destroy', function() {
       		// closeTankuang();
			$scope.diaResult = false;
     	});

		$scope.goIndex = function (){
			$rootScope.hideTabs = "";
			$ionicTabsDelegate.select(0);
		}
		$scope.closeTankuang = function (){
			$scope.diaResult = false;
		}

  		$scope.play = function () {
	       	if(playFlag == true){
	         	playGame();
	       	}
     	}
  		var d1,promise1,d2,promise2;
  		$scope.clickRece = function() {
	       	if(getFlag == true){
	         	getFlag = false;
	         	// 点击领取券
	         	$mainServices.postNew(domain2+"signRecord/pullSignAction.do",{userID:u},false).success(function(JSONObjRet) {
	           		if(JSONObjRet.ret == "success"){
	             		if(JSONObjRet.data.message == "success"){
		               		alert("领取成功！");
		               		angular.element('#updateFont').html("已");
		               		angular.element('.img-voucher img').attr("src",domain2+JSONObjRet.data.imgSrc);
		             	} else {
		               		alert("当月已领取，请下月再来。")
		             	}
	           		} else {
	             		getFlag = true;
	             		alert("请求失败，请重新领取！");
	           		}
	         	});
	       	}
	    }
  		// 点击打卡
  		function playGame() {  	
       		angular.element(".tb .tb-btn").addClass("btn-gray");
       		playFlag = false;
       		$mainServices.postNew(domain2+"sign/signAction.do",{userID:u},false).success(function(JSONObjRet) {
         		result = JSONObjRet.data;
         		if(JSONObjRet.ret == "success"){
           			cycle = 0;
           			flag = false;
           			EndIndex = Math.floor(Math.random()*8+1);
           			EndCycle = 1;
           			d1 = $q.defer();
			      	promise1 = d1.promise;
			      	d2 = $q.defer();
			      	promise2 = d2.promise;
           			Time = setInterval(Star,Speed);
           			setTimeout(function(){
             			flag = true;
             			pnum = dealNumber(JSONObjRet.data.sortNo);
           			},3000);
           			// 转完回调并展示弹框
		         	$mainServices.postNew(domain2+"sign/signCallBack.do",{userID:u},false).success(function(JSONObjRet) {
		           		if(JSONObjRet.ret == "success"){
		           			d2.resolve(JSONObjRet);
		           		} else {
		             		alert("请求失败，请重新请求");
		             		d2.reject();
		           		}
		         	});
		         	$q.all([promise1,promise2]).then(function (v) {
		         		var JSONObjRet = v[1];
					    $scope.signInfo.signCount = JSONObjRet.data.signCount;
		             	$scope.signInfo.continuationCount = JSONObjRet.data.continuationCount;
		             	$scope.signInfo.amount = JSONObjRet.data.amount;
		             	$scope.signInfo.integral = JSONObjRet.integral;
		             	angular.element(".tb .tb-btn p").html('已打卡');
						$scope.diaResult = true;
		             	if(result.integration == 0){
							$scope.dia = {signCount:JSONObjRet.data.signCount,integration:result.integration,flag:0};
		               		// showResultTankuang(0,JSONObjRet.data.signCount,result.integration);
		             	} else {
							$scope.dia = {signCount:JSONObjRet.data.signCount,integration:result.integration,flag:1};
		               		// showResultTankuang(1,JSONObjRet.data.signCount,result.integration);
		             	}
						$timeout(function (){
							$('#signResult').css('top',(parseInt(window.screen.availHeight)-$('#signResult').height())/2);
						})

					});
         		} else {
           			angular.element(".tb .tb-btn").removeClass("btn-gray");
		            playFlag = false;
		            alert("请求失败，请重新请求");
         		}
       		});
     	}
  		function Star(){
	        //跑马灯变速
	        if(flag == false){
	         	// 走五格开始加速
	         	if(quick == 5){
	           		clearInterval(Time);
	           		Speed = 50;
	           		Time = setInterval(Star,Speed);
	         	}
	         	// 跑N圈减速
	         	if(cycle == EndCycle+1 && index == EndIndex){
	           		clearInterval(Time);
	           		Speed = 300;
	           		Time=setInterval(Star,Speed);
	         	}
	       	};
	
	       	if(index >= arr.length){
	         	index=0;
	         	cycle++;
	       	};
	
	       	// 结束转动并选中号码
	       	if(flag == true && index == parseInt(pnum-1)){
	         	quick=0;
	         	clearInterval(Time);
	         	d1.resolve();
	       	}
	
	       	$(tb.rows[arr[index][0]].cells[arr[index][1]]).addClass('add');
	       	if(index>0){
	         	prevIndex=index-1;
	       	} else {
	         	prevIndex=arr.length-1;
	       	}
	       	$(tb.rows[arr[prevIndex][0]].cells[arr[prevIndex][1]]).removeClass('add');
	       	index++;
	       	quick++;
	
	    }
  		
  		function getSide(m,n){
       		// 初始化数组
       		var arr = [];
       		for(var i=0;i<m;i++){
         		arr.push([]);
         		for(var j=0;j<n;j++){
           			arr[i][j]=i*n+j;
         		}
       		}
       		// 获取数组最外圈
       		var resultArr = [];
       		var tempX = 0,tempY = 0,direction = "Along",count = 0;
       		while(tempX >= 0 && tempX < n && tempY >= 0 && tempY < m && count < m*n){
         		count++;
         		resultArr.push([tempY,tempX]);
         		if(direction == "Along"){
           			if(tempX == n-1){
            			tempY++;
           			} else{
             			tempX++;
           			}
           			if(tempX == n-1 && tempY == m-1){
             			direction="Inverse"
           			};
         		} else {
           			if(tempX == 0){
             			tempY--;
           			} else{
             			tempX--;
           			}
           			if(tempX==0&&tempY==0){
             			break;
           			}
         		}
       		}
       		return resultArr;
     	};
     	function dealNumber(count){
       		count = parseInt(count);
       		if(count == 1){
         		count = 5;
       		} else if(count == 2){
         		count = 6;
       		} else if(count == 3){
         		count = 7;
       		} else if(count == 5){
         		count = 8;
       		} else if(count > 5){
         		count = 9-count;
       		}
       		return count;
     	}
  		
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$timeout','$q','$ionicScrollDelegate','$rootScope','$ionicTabsDelegate'];
    return ctrl;  
      
}); 