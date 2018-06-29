define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$stateParams) {
    	$scope.userData = {};
		var base = $controller('baseController', { $scope: $scope });
		
		var u = localStorage.getItem("uid_local");
        if (u == null || u == "" || typeof(u) == "undefined") {
            localStorage.setItem("backUrlLogin", "#/index/index");
        }
		
		$scope.init = function() {
            // 查询会员基本信息
            var u = localStorage.getItem("uid_local");
            if (u != null || u != "" || typeof(u) != "undefined") {
                $("#u").val(u);
                var url = basePath + "getUser.jsp";
                var dataJson = {'u': u, 't': 6};
                // 异步加载数据
               	$mainServices.post(url, dataJson, true).success(function (JSON_list) {
                    if (JSON_list.length > 0) {
                        var headpic = JSON_list[0].headpic;
                        var username = JSON_list[0].username;
                        var nickname = JSON_list[0].nickname;
                        var sex = JSON_list[0].sex;
                        var birthday = JSON_list[0].birthday;
                        var leval = JSON_list[0].leval;
                        var qq = JSON_list[0].qq;
                        var address = JSON_list[0].address;
                        var hometown = JSON_list[0].hometown;
                        var signature = JSON_list[0].signature;
                        var invitationCode = JSON_list[0].yqm; //邀请码
                        headpic = $mainServices.getHttpOrlocalHeadPic(headpic);

                        if (qq != "" && qq.length > 5) {
                            qq = "****" + qq.substring(qq.length - 5, qq.length);
                        }
                        
                        $scope.userData = {headpic:headpic,nickname:nickname,username:$mainServices.substringPhone(username),sex:$mainServices.getSexStr(sex),birthday:birthday,qq:qq,address:address,hometown:hometown,signature:$mainServices.subStringTitle(signature, 10),invitationCode:invitationCode,leval:leval};
                    }
                });
                
            }

            // 修改头像
            $("[name=headpicInput]").change(function () {
                var u = localStorage.getItem("uid_local");
                if (u != null || u != "" || typeof(u) != "undefined") {
                    var f = $("[name='headpicInput']").val();
                    if (f != null && f != "") {
                        var url = basePath + "setMyLogo.jsp";
                        var formData = new FormData($("#headpicForm")[0]);
                        $mainServices.showLoading();
                        $.ajax({
                            url: url ,
                            type: 'POST',
                            data: formData,
                            async: true,//异步执行
                            cache: false,
                            contentType: false,
                            processData: false,
                            dataType: "json",
                            success: function(data) {
                                var jsonRet = data; 
                                if (jsonRet != null) {
                                    var code = jsonRet.code;
                                    if (code == 200) {
                                        var headpic = jsonRet.headpic;
                                        if (headpic != "") {
                                            headpic = $mainServices.getHttpOrlocalHeadPic(headpic);
                                        }
                                        $scope.userData.headpic = headpic;
                                        alert("头像修改成功");
                                    } else {
                                        alert("修改失败，请稍后重试。");
                                    }
                                }
                                $mainServices.hideLoading();
                            },
                            error:function(){
                                $mainServices.hideLoading();
                            }
                        });
                    }
                }
            });
        }
		
		// 初始化
		$scope.init();
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$stateParams'];  
    return ctrl;  
      
}); 