define(function () {  
    'use strict';  
    function ctrl($scope,$rootScope,$ionicHistory,$mainServices,$controller,$factoryServices,$ionicTabsDelegate,$http) {
    	$scope.user = {'password':'','username':''};
    	$scope.dataJson = {'sub_': 1,'username':'','passMD5':'','platform':2,'version':''};
    	var base = $controller('baseController', { $scope: $scope });
    	$factoryServices.hideOrShowAppContent();

    	window.setAppVersion = function(str1,str2){
            if(str2 != null){
                $scope.dataJson.version = str2;
            }
        };
        $mainServices.getAppVersion();// 获取当前版本号

        if(domain.indexOf('ios.1yuanxing') == -1){
            var nc_appkey =  '4SIJ'; // 应用标识,不可更改
            var nc_scene = 'login_h5';  //场景,不可更改
            var nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');
            var nc_option = {
                renderTo: '#dom_id',//渲染到该DOM ID指定的Div位置
                appkey: nc_appkey,
                scene: nc_scene,
                token: nc_token,
                callback: function (data) {// 校验成功回调
                    document.getElementById('csessionid').value = data.csessionid;
                    document.getElementById('sig').value = data.sig;
                    document.getElementById('token').value = nc_token;
                    document.getElementById('scene').value = nc_scene;
                },
                error: function (s) {
                },
                verifycallback: function (data) {
                    if (data.code == "200") {

                    }
                }
            };
            NoCaptcha.init(nc_option);
            NoCaptcha.setEnabled(true);
        }

        
        //用户登录
        $scope.userLoginSubmit = function () {
            if(domain.indexOf('ios.1yuanxing') == -1){
                // 验证参数合法
                var csessionid = document.getElementById('csessionid').value;
                var sig = document.getElementById('sig').value;
                var token = document.getElementById('token').value;
                var scene = document.getElementById('scene').value;
                if(csessionid == ""){
                    alert("请进行滑动验证。");
                    return;
                }
                if($scope.user.username.indexOf('****') == -1){
                    if(!$mainServices.yzPhone($scope.user.username) && !$mainServices.yzEmail($scope.user.username) ) {
                        alert("请输入有效的手机号或邮箱地址");
                        document.getElementById('csessionid').value = "";
                        document.getElementById('sig').value = "";
                        document.getElementById('token').value = "";
                        document.getElementById('scene').value = "";
                        NoCaptcha.init(nc_option);
                        NoCaptcha.setEnabled(true);
                        return;
                    }
                }
                if (!$mainServices.yzLogPass($scope.user.password)) {
                    alert("登录密码输入有误");
                    document.getElementById('csessionid').value = "";
                    document.getElementById('sig').value = "";
                    document.getElementById('token').value = "";
                    document.getElementById('scene').value = "";
                    NoCaptcha.init(nc_option);
                    NoCaptcha.setEnabled(true);
                    return;
                }

                $http.get(domain2+"validate/slider?csessionid="+csessionid+"&sig="+sig+"&token="+token+"&scene="+scene).success(function (result) {
                    if (result.ret == "success" && result.data == true) {
                        $scope.dataJson.username = $scope.user.username;
                        $scope.dataJson.passMD5 = hex_md5($scope.user.password);
                        var url = basePath + "log.jsp";
                        $mainServices.post(url, $scope.dataJson, true).success(function (subRetJson) {
                            var code = subRetJson.code;
                            var message = subRetJson.message;
                            if (code == 200) {
                                var uid = subRetJson.uid;
                                localStorage.setItem("uid_local", uid); //本地存储

                                $mainServices.userLogin(uid.substring(uid.indexOf('_')+1,uid.indexOf('.')));
                                var backUrl = "#/mine/myIndex";
                                var backUrlLogin = localStorage.getItem("backUrlLogin");//本地存储
                                if (backUrlLogin != null && backUrlLogin != "" && typeof(backUrlLogin) != "undefined") {
                                    backUrl = backUrlLogin;
                                    localStorage.removeItem("backUrlLogin");//本地存储
                                }
                                if(backUrl == "#/index/index"){
                                    $rootScope.hideTabs = "";
                                    $ionicTabsDelegate.select(0);
                                } else {
                                    skip(backUrl);
                                };
                                $factoryServices.getCardNum();
                            } else {
                                alert(message);
                                document.getElementById('csessionid').value = "";
                                document.getElementById('sig').value = "";
                                document.getElementById('token').value = "";
                                document.getElementById('scene').value = "";
                                NoCaptcha.init(nc_option);
                                NoCaptcha.setEnabled(true);
                            }
                        });

                    } else {
                        alert("请重新进行滑动验证。");
                        document.getElementById('csessionid').value = "";
                        document.getElementById('sig').value = "";
                        document.getElementById('token').value = "";
                        document.getElementById('scene').value = "";
                        NoCaptcha.init(nc_option);
                        NoCaptcha.setEnabled(true);
                    }
                });
            } else {
                if($scope.user.username.indexOf('****') == -1){
                    if(!$mainServices.yzPhone($scope.user.username) && !$mainServices.yzEmail($scope.user.username) ) {
                        alert("请输入有效的手机号或邮箱地址");
                        return;
                    }
                }
                if (!$mainServices.yzLogPass($scope.user.password)) {
                    alert("登录密码输入有误");
                    return;
                }

                $scope.dataJson.username = $scope.user.username;
                $scope.dataJson.passMD5 = hex_md5($scope.user.password);
                var url = basePath + "log.jsp";
                $mainServices.post(url, $scope.dataJson, true).success(function (subRetJson) {
                    var code = subRetJson.code;
                    var message = subRetJson.message;
                    if (code == 200) {
                        var uid = subRetJson.uid;
                        localStorage.setItem("uid_local", uid); //本地存储

                        $mainServices.userLogin(uid.substring(uid.indexOf('_')+1,uid.indexOf('.')));
                        var backUrl = "#/mine/myIndex";
                        var backUrlLogin = localStorage.getItem("backUrlLogin");//本地存储
                        if (backUrlLogin != null && backUrlLogin != "" && typeof(backUrlLogin) != "undefined") {
                            backUrl = backUrlLogin;
                            localStorage.removeItem("backUrlLogin");//本地存储
                        }
                        if(backUrl == "#/index/index"){
                            $rootScope.hideTabs = "";
                            $ionicTabsDelegate.select(0);
                        } else {
                            skip(backUrl);
                        };
                        $factoryServices.getCardNum();
                    } else {
                        alert(message);
                    }
                });


            }


        };
        
        // 第三方回调登录调用wap方法传输json数据
        window.thirdPartyLogins = function (jsonRet, type) { //1表示qq登录  2表示微信登录
            if (jsonRet != null && jsonRet != "" && typeof(jsonRet) != "undefined") {
                var openid = jsonRet.openid;
                if(isAndroid){
                    var nickname = jsonRet.screen_name;
                } else {
                    var nickname = jsonRet.nickname;
                }
                var headimgurl = jsonRet.headimgurl;
                if (headimgurl == null || headimgurl == "" || typeof(headimgurl) == "undefined") {
                    headimgurl = jsonRet.figureurl_qq_2;
                }
                if(isAndroid){
                    headimgurl = jsonRet.profile_image_url;
                }
                if(openid == null || openid == "null"|| openid == "(null)"){
                    openid = "";
                    alert("授权登录失败，请重试！");
                    return;
                }
                if(nickname == null || nickname == "null"){
                    nickname = "";
                }
                if(headimgurl == null || headimgurl == "null"){
                    headimgurl = "";
                }
                var url = basePath + "thirdPartyLogins.jsp";
                var dataJson = {'sub': '1', 'type': type, 'openid': openid, 'nickname': nickname, 'headimgurl': headimgurl, 'platform': '2'};
                $mainServices.post(url, dataJson, true).success(function (loggingStatus) {
                    var code = loggingStatus.code;
                    if (code == 201) {
                        // 登录操作
                        var uid = loggingStatus.uid;
                        var username = loggingStatus.username;
                        localStorage.setItem("uid_local", uid);// 本地存储
                        $mainServices.userLogin(uid.substring(uid.indexOf('_')+1,uid.indexOf('.')));
                        var backUrl = "#/mine/myIndex";
                        var backUrlLogin = localStorage.getItem("backUrlLogin");//本地存储------------------------
                        if (backUrlLogin != null && backUrlLogin != "" && typeof(backUrlLogin) != "undefined") {
                            backUrl = backUrlLogin;
                            localStorage.removeItem("backUrlLogin");//本地存储
                            if (backUrl == "#/mine/myIndex") {
                                $rootScope.hideTabs = '';
                                $ionicTabsDelegate.select(4);
                            } else {
                                skip(backUrl);
                            }
                        } else {
                            $rootScope.hideTabs = '';
                            $ionicTabsDelegate.select(4);
                        }
                        $factoryServices.getCardNum();
                    } else if (code == 200) {
                    	// 首次登录进行绑定
                        var openid = loggingStatus.openid;
                        var type = loggingStatus.type;
                        localStorage.setItem("openid", openid);//本地存储
                        localStorage.setItem("type", type);//本地存储
                        skip("#/" + $scope.host + "/binding");
                    } else{
                        alert("操作失败！");
                    }
                });
            }
        }

        // 当我们用完模型时，清除它
        $scope.$on('$destroy', function() {
            $(".nc-h5-overlay .stage.stage2").remove();
            $(".nc-h5-overlay._nc").hide();
        });
    }  
  
    ctrl.$inject = ['$scope','$rootScope', '$ionicHistory','$mainServices','$controller','$factoryServices','$ionicTabsDelegate','$http'];
    return ctrl;  
      
}); 