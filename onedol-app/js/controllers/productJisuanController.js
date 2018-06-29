define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$stateParams) {  
    	$scope.isNew = false;
    	$scope.data = {top:'',tbody:'',bottom:''};
		$scope.number = {};
    	var base = $controller('baseController', { $scope: $scope });
    	var pid = $stateParams.pid;
	    var pterm = $stateParams.pterm;
	    var url = basePath + "productJisuan.jsp";
	    var dataJson = {'pid':pid,'pterm':pterm};
		$mainServices.post(url,dataJson,true).success(function(JSON_Obj) {
	        if(JSON_Obj != null) {
	            var JSON_list4 = JSON_Obj.dblist; //全站50条购买记录
	            var html_top_div = JSON_Obj.html_top_div; //计算详情头部
	            var html_jisuan_div = JSON_Obj.html_jisuan_div; //计算详情底部
	            var html_jisuan_flag = JSON_Obj.status;
	            if(html_jisuan_flag == "0"){
	                $scope.isNew = false;
	            } else {
	                $scope.isNew = true;
					$scope.number.jisuantimetotal = JSON_Obj.jisuantimetotal;
					$scope.number.jisuantPterm = JSON_Obj.jisuantPterm;
					$scope.number.jisuanSums = JSON_Obj.jisuanSums;
					$scope.number.fucaicode = JSON_Obj.fucaicode;
					$scope.number.total_time = JSON_Obj.total_time;
					$scope.number.luckynumber = JSON_Obj.luckynumber;
	            }
	            if(JSON_list4 != null && JSON_list4.length >= 50) {
	                for(var i = 0; i < JSON_list4.length; i++) {
	                    var intimestamp = JSON_list4[i].intimestamp;
	                    var intime = JSON_list4[i].intime;
	                    var nickname_buy = JSON_list4[i].nickname;
	                    var nums = JSON_list4[i].nums;
	                    var pterms = JSON_list4[i].pterms;
	                    if(html_jisuan_flag == "0") {
	                        var html_od =
	                            '<tr>' +
	                            '<td width="46%" class="th-jisuan">' + intime + '</td>' +
	                            '<td width="27%" class="td-jisuan">' + intimestamp + '</td>' +
	                            '<td width="27%" class="th-jisuan">' + nickname_buy + '</td>' +
	                            '</tr>';
	                    } else {
	                        var html_od =
	                            '<tr>' +
	                            '<td width="36%" class="th-jisuan th-sm">' + intime + '</td>' +
	                            '<td width="20%" class="td-jisuan th-sm">' + intimestamp + '</td>' +
	                            '<td width="20%" class="th-jisuan th-sm">' + nickname_buy + '</td>' +
	                            '<td width="12%" class="td-jisuan th-sm">' + nums + '</td>' +
	                            '<td width="12%" class="th-jisuan th-sm">' + pterms + '</td>' +
	                            '</tr>';
	                    }
						$scope.data.tbody += html_od;
	                }
					if(html_jisuan_flag != "0"){
						var str ='<tr style="color:#f00"><td width="36%" class="th-jisuan th-sm">合计</td><td width="20%" class="td-jisuan th-sm">' + $scope.number.jisuantimetotal + '</td>' +
							'<td width="20%" class="th-jisuan th-sm"></td>' +
							'<td width="12%" class="td-jisuan th-sm">' + $scope.number.jisuanSums + '</td>' +
							'<td width="12%" class="th-jisuan th-sm">' + $scope.number.jisuantPterm + '</td>' +
							'</tr>';
						$scope.data.tbody += str;
					}
	                $scope.data.top = html_top_div;
	                $scope.data.bottom = html_jisuan_div;
	            }
	        }
	    });
	
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$stateParams'];  
    return ctrl;  
      
}); 