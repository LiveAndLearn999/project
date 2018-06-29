define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices) {  
		$scope.sign = {signCount:0,signDays:0,signNum:0,signMonth:'',signList:'',month:''};
    	var base = $controller('baseController', { $scope: $scope });
    	var user_id = localStorage.getItem("uid_local");
    	var prevVal = "";
    	
  		$mainServices.postNew(domain2+"sign/showSignHistory.do",{userID:user_id,month:""},true).success(function(JSONObjRet) {
	      	if(JSONObjRet.ret == "success"){
	        	if(JSONObjRet.data.signInfo.continuationCount != null){
	        		$scope.sign.signDays = JSONObjRet.data.signInfo.continuationCount;
	        	}
	        	if(JSONObjRet.data.signInfo.amount != null){
	        		$scope.sign.signNum = JSONObjRet.data.signInfo.amount;
	        	}
	        	if(JSONObjRet.data.signInfo.signCount != null){
	        		$scope.sign.signCount = JSONObjRet.data.signInfo.signCount;
	        	}
	        	var mon = JSONObjRet.data.signInfo.month;
	        	prevVal = mon;
	        	var signRelative = [];
	        	var len = JSONObjRet.data.signRelative.length;
	        	if(len > 0){
	          		for(var i=0;i<len;i++){
	            		var signDay = JSONObjRet.data.signRelative[i].updateTime.substring(8,10);
	            		signRelative.push(parseInt(signDay));
	          		}
	        	}
	        	signFun(addDay(mon),signRelative);
	        	prevFiveMonth(mon);
	      	} else {
	        	alert("请求失败！");
	      	}
	    });
  		
  		$scope.undatePage = function() {
  			var curMon = $scope.sign.month;
	      	$mainServices.postNew(domain2+"sign/showSignHistory.do",{userID:user_id,month:curMon},false).success(function(JSONObjRet) {
	        	if(JSONObjRet.ret == "success" && JSONObjRet.data.signInfo != "null" && JSONObjRet.data.signInfo != null){
	          		prevVal = $scope.sign.month;
	          		if(JSONObjRet.data.signInfo.continuationCount != null){
	          			$scope.sign.signDays = JSONObjRet.data.signInfo.continuationCount;
	          		}
	          		if(JSONObjRet.data.signInfo.amount != null){
	            		$scope.sign.signNum = JSONObjRet.data.signInfo.amount;
	          		}
	          		if(JSONObjRet.data.signInfo.signCount != null){
	            		$scope.sign.signCount = JSONObjRet.data.signInfo.signCount;
	          		}
	          		var mon = JSONObjRet.data.signInfo.month;
	          		var signRelative = [];
	          		var len = JSONObjRet.data.signRelative.length;
	          		if(len > 0){
	            		for(var i=0;i<len;i++){
		              		var signDay = JSONObjRet.data.signRelative[i].updateTime.substring(8,10);
		              		signRelative.push(parseInt(signDay));
		            	}
	          		}
	          		signFun(addDay(curMon),signRelative);
	        	} else {
	        		$scope.sign.month = prevVal;
	          		alert("请求失败，请重新选择");
	        	}
	      	});
	    }
  		
		function prevFiveMonth(date) {
	      	var year = parseInt(date.substring(0,4));
	      	var month = parseInt(date.substring(5,7));
	      	var str = '';
	      	for(var i=0;i<5;i++){
	        	if(month < 10){
	          		var monStr = '0'+ month;
	        	} else {
	          		var monStr = month;
	        	};
	        	if(i == 0){
	          		str += '<option value="'+year+'-'+monStr+'" selected="">'+year+'年'+month+'月打卡记录</option>';
	        		$scope.sign.month = year+'-'+monStr;
	        	} else {
	          		str += '<option value="'+year+'-'+monStr+'">'+year+'年'+month+'月打卡记录</option>';
	        	}
	
	        	if(month == 1){
	          		month = 12;
	          		year--;
	        	} else {
	          		month--;
	        	}
	        	if(month == 10 && year == 2016){
	          		break;
	        	}
	      	}
	      	$scope.sign.signMonth = str;
	    }
  		function addDay(date) {
	      	if(date.length <= 7){
	        	date += "-01";
	      	}
	      	return date;
	    }
  		function signFun(curDate,dateArray) {
	      	// curDate当前日期（月） dateArray已经签到的数组
	        var _html = '',
	         	_handle = true,
	          	myDate = new Date(curDate);
	        $scope.sign.signList = '';
	      	var monthFirst = new Date(myDate.getFullYear(), parseInt(myDate.getMonth()), 1).getDay();
	      	var d = new Date(myDate.getFullYear(), parseInt(myDate.getMonth() + 1), 0);
	      	var totalDay = d.getDate(); // 获取当前月的天数
	      	for (var i = 0; i < 42; i++) {
				var conFlag = true; 
				if(dateArray.length > 0){
					for (var j = 0; j < dateArray.length; j++) {
		      			if(i >= monthFirst && (i-monthFirst) < totalDay){
		      				if(dateArray[j] == (i-monthFirst+1)){
		      					_html += ' <li><div class="sign-num sign-in"><img class="sign-icon" src="img/icon_sign_gou.png"/><p>'+(i-monthFirst+1)+'<p></li>';
		      					conFlag = false;
		      					break;
		      				}
			      		}
			        }
				}
	      		if(!conFlag){
	      			continue;
	      		}
	      		if(i >= monthFirst && (i-monthFirst) < totalDay){
	      			_html += ' <li><div class="sign-num"><img class="sign-icon" src="img/icon_sign_gou.png"/><p>'+(i-monthFirst+1)+'<p></li>'
	      		} else {
	      			if(monthFirst+totalDay <= 35 && i == 35){
	      				break;
	      			}
	      			_html += ' <li><div class="sign-num"><img class="sign-icon" src="img/icon_sign_gou.png"/></li>'
	      		}
	      	}
	      	
			$scope.sign.signList = _html;
	    };
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices'];  
    return ctrl;  
      
}); 