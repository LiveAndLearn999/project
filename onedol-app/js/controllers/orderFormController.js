define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$factoryServices,$timeout,$state,$ionicModal,$ionicScrollDelegate) {
    	$scope.getPayList = []; //支付方式
        $scope.getPayListFlag = false; //支付方式是否为空
        $scope.couponStyle = "";
    	$scope.order = {top:'',integralAll:0,integral:0,balanceAll:0,balance:0,summoney_pay_other:0,couponName:'',couponLen:0,reactMoney:0}; // 订单对象
        $scope.coupon = {id:'',money:0};
        $scope.integralRule = {style:'',flag:false,content:''};
    	var base = $controller('baseController', { $scope: $scope });
		$factoryServices.hideOrShowAppContent();

        // 获取当前版本号的回调
        window.setAppVersion = function(str1,str2){
            if(str1 == null){
                str1 = '';
            }
            if(str2 == null){
                str2 = '';
            }
            // 获取支付方式
            var url = basePath + "getPayMode.jsp";
            $mainServices.post(url, {sysVersion:str1,resVersion:str2,platform:$mainServices.flagPlatform(),type:'pay',u:localStorage.getItem("uid_local")}, true).success(function (dataJson) {
                if(dataJson == null || dataJson == undefined || dataJson.length == 0){
                    return;
                }
                var len = dataJson.mode.length;
                if(len > 0){
                    for(var i=0;i<len;i++){
                        if(isiOS){
                            if(dataJson.mode[i].show != "0"){
                                $scope.getPayList.push(dataJson.mode[i]);
                            };
                        } else if(isAndroid){
                            if(dataJson.mode[i].show != "1"){
                                $scope.getPayList.push(dataJson.mode[i]);
                            };
                        }
                    }
                    $scope.getPayListFlag = false;
                } else {
                    $scope.getPayListFlag = true;
                }

            });
        };
        // setAppVersion('2.6.4','201708311705');
        $mainServices.getAppVersion();// 获取当前版本号


        var jifenMaxMoney; //积分抵扣钱最大值
		// 点击可用积分
		$scope.userIntegral = function($event){
			var dom = angular.element($event.srcElement);
			var shiyongjifenCheck = dom.attr("checked");
            var paymoney = $scope.summoney;//网银支付金额
            if (shiyongjifenCheck == "checked") {
                if($scope.coupon.money > 0){
                    alert("使用积分时，不能选择使用红包。");
                    dom.removeAttr("checked");
                } else if($scope.order.integral < 100 || jifenMaxMoney < 1) {
                    alert("您的积分不足。");
                    dom.removeAttr("checked");
                } else {
                    paymoney = paymoney - jifenMaxMoney;
                }
            }
            // 判断是否使用余额
            if($("#shiyongyue").attr("checked") == "checked" && $scope.order.balance >= 1){
                paymoney = paymoney - $scope.order.balance;
            }
            // 判断是否使用可用优惠券
            paymoney = paymoney - $scope.coupon.money;
            if (paymoney < 0) {
                paymoney = 0;
            }
            $scope.order.summoney_pay_other = paymoney;
		}
		// 点击账户余额
		$scope.userBalance = function($event){
			var dom = angular.element($event.srcElement);
			var shiyongyueCheck = dom.attr("checked");
            var paymoney = $scope.summoney;//网银支付金额
            if(shiyongyueCheck == "checked") {
                if($scope.order.balance < 1) {
                    alert("您的余额不足。");
                    dom.removeAttr("checked");
                } else {
                    paymoney = paymoney - $scope.order.balance;
                }
            }
            // 判断是否使用积分
            if($("#shiyongjifen").attr("checked") == "checked" && jifenMaxMoney >= 1){
                paymoney = paymoney - jifenMaxMoney;
            }
            // 判断是否使用可用优惠券
            paymoney = paymoney - $scope.coupon.money;
            if(paymoney < 0) {
                paymoney = 0;
            }
            $scope.order.summoney_pay_other = paymoney;
		}

        // 获取订单页面
        $scope.getCartOrder = function () {
        	$scope.order.top = '';
            var u = localStorage.getItem("uid_local");
            var sel_all = true; //全选状态
            $scope.summoney = 0;
            var url = basePath + "getCartSel.jsp";
            $mainServices.post(url,{'u':u},true).success(function (dataJson) {
                if(dataJson == null || dataJson == undefined || dataJson.length == 0){
                    return;
                }
                var JSON_list = dataJson.cart_list;
                $scope.integralRule.content = dataJson.integralRule;
                if(JSON_list.length > 0) {
                    for(var i = 0; i < JSON_list.length; i++) {
                        var pid = JSON_list[i].pid;
                        var num = parseInt(JSON_list[i].num);
                        var selected = JSON_list[i].selected;
                        var now_term = JSON_list[i].now_term;
                        var total_time = JSON_list[i].total_time;
                        var finish_time = JSON_list[i].finish_time;
                        var purchase_limit_time = JSON_list[i].purchase_limit_time;
                        var shengyu_time = parseInt(total_time) - parseInt(finish_time);
                        if (shengyu_time <= 0) {
                            continue;
                        }

                        if (num > shengyu_time) {
                            num = shengyu_time;
                        }

                        var pic = JSON_list[i].pic;
                        pic = $mainServices.getHttpOrlocalProPic(pic);
                        var ptitle = JSON_list[i].ptitle;
                        var sel = ""; //单个选中状态
                        ptitle = "(第" + now_term + "期)" + ptitle;
                        if (selected == 1) {
                            $scope.summoney = $scope.summoney + num;
                            sel = " on";
                        } else {
                            sel_all = false;
                        }

                        var tmp =
                            '<div class="js_spjt">' +
                            '<div class="js_spjt_img">' +
                            '<img src="' + pic + '" />' +
                            '</div>' +
                            '<div class="js_spjt_wz">' +
                            '<p class="ellipsis1">' + ptitle + '</p>' +
                            '<p class="js_spjt_sl"><span style="color:#ff5000">￥1.00/次</span><span style="float:right;color:#ff5000">	&times;' + num + '</span></p>' +
                            '</div></div>';
                        $scope.order.top += tmp; 
                    }


                    // 查询用户账户余额、积分
                    $mainServices.post(basePath + "getUser.jsp",{t:4,u:u},true).success(function(user_list){
                        if (user_list.length > 0) {
                            $scope.order.integralAll = parseFloat(user_list[0].integral); // 账号积分
                            $scope.order.integral =  dataJson.usableIntegral < $scope.order.integralAll ? dataJson.usableIntegral:$scope.order.integralAll;
                            $scope.order.balanceAll = parseFloat(user_list[0].balance); // 账号余额
                            $scope.order.balance = parseInt($scope.order.balanceAll); // 账号余额可用
                            jifenMaxMoney = parseInt($scope.order.integral / 100);//积分抵扣钱最大值
                            $scope.order.jifenMaxMoney = jifenMaxMoney;
                            $scope.order.summoney_pay_other = $scope.summoney -  $scope.coupon.money;
                            $scope.order.reactMoney = $scope.summoney -  $scope.coupon.money;
                        }
                    })

                    // 获取可用优惠券
                    if(domain.indexOf('ios.1yuanxing') == -1){
                        var dataReq = {user:{userID:u,sh:5},page:{currentPage:1,pageNumber:10}};
                        $mainServices.postNew(domain2+"vouchers/checkVouchersInfo.do",dataReq,true).success(function(JSONObj){
                            if(JSONObj.ret == "success"){
                                var coupon_list = JSONObj.obtainRecords;
                                if(coupon_list.length > 0){
                                    $scope.order.couponLen = coupon_list.length;
                                    $scope.order.couponName = $scope.order.couponLen+"个满足本次订单条件的可用红包";
                                    $scope.couponStyle = "orangeColor";
                                } else {
                                    $scope.order.couponName = "无满足条件红包";
                                    $scope.couponStyle = "grayColor";
                                }
                            } else {
                                alert("请求失败，请重新刷新页面");
                            }
                        });
                    }

                } else {
                    skip('#/index/index');
                }

                var old = null; //用来保存原来的对象
                $("input[name='paystyle']").each(function () {//循环绑定事件
                    if (this.checked) {
                        old = this; //如果当前对象选中，保存该对象
                    }
                    this.onclick = function () {
                        if (this == old) {//如果点击的对象原来是选中的，取消选中
                            this.checked = false;
                            old = null;
                        } else {
                            old = this;
                        }
                    }
                });

            });

        }

		// 初始化
		$scope.getCartOrder();

        $scope.showIntegralRule = function () {
            if($scope.integralRule.style == ''){
                $scope.integralRule.style = 'rotate-180';
                $scope.integralRule.flag = true;
            } else {
                $scope.integralRule.style = '';
                $scope.integralRule.flag = false;
            }

        }

        $scope.tab = [{tabClass:'cur',isShow:true},{tabClass:'',isShow:false},{tabClass:'',isShow:false}];
        $scope.canLoadRecordSatisfy = {code:false,nowPageMore:0}; // 满足条件红包
        $scope.canLoadRecordDissatisfy = {code:false,nowPageMore:0}; // 不满足条件红包
        $scope.canLoadRecordDisuse = {code:false,nowPageMore:0}; // 已使用/已过期
        $scope.satisfyRecords = [];
        $scope.dissatisfyRecords = [];
        $scope.disuseRecords = [];

        $ionicModal.fromTemplateUrl('templates/mine/giftModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            if($("#shiyongjifen").attr("checked") == "checked"){
                alert("使用红包时，不能勾选使用积分。");
            } else {
                $scope.modal.show();
                $scope.recordSatisfyLoad('first');
            }
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        // 红包明细切换
        $scope.tabAc = function(t){
            if(t == 0){
                $scope.tab = [{tabClass:'cur',isShow:true},{tabClass:'',isShow:false}];
                if($scope.satisfyRecords.length == 0){
                    $scope.recordSatisfyLoad();
                }

            } else if(t == 1){
                $scope.tab = [{tabClass:'',isShow:false},{tabClass:'cur',isShow:true},{tabClass:'',isShow:false}];
                if($scope.dissatisfyRecords.length == 0){
                    $scope.recordDissatisfyLoad();
                }
            } else if(t == 2){
                $scope.tab = [{tabClass:'',isShow:false},{tabClass:'',isShow:false},{tabClass:'cur',isShow:true}];
                if($scope.disuseRecords.length == 0){
                    $scope.recordDisuseLoad();
                }
            }
        }
        $scope.seeRule = function (event){
            event.stopPropagation();
            event = event.toElement;
            var obj = angular.element(event).parent();
            if(obj.hasClass('show-more')){
                obj.removeClass('show-more');
                obj.parent().parent().next('.tb-bottom').hide();
            } else {
                obj.addClass('show-more');
                obj.parent().parent().next('.tb-bottom').show();
            }
        }
        $scope.dealTime = function (time) {
            var date = new Date(time);
            var year = date.getFullYear();
            var mon = date.getMonth()+1+'';
            if(mon.length == 1){
                mon = '0'+mon;
            }
            var day = date.getDate()+'';
            if(day.length == 1){
                day = '0'+day;
            }
            return year+'.'+mon+'.'+day;
        }
        // 满足条件红包
        $scope.recordSatisfyLoad = function(par){
            var isShow = false;
            if(par == "first"){
                isShow = true;
                if($scope.satisfyRecords.length > 0){
                    return;
                }
            }
            var nowPageMore = $scope.canLoadRecordSatisfy.nowPageMore;
            if (par != "more") {
                nowPageMore = 1;
            } else {
                nowPageMore++;
            }
            var u = localStorage.getItem("uid_local");
            var dataJson = {user:{userID:u,sh:5},page:{currentPage:nowPageMore,pageNumber:10}};
            $mainServices.postNew(domain2+"vouchers/checkVouchersInfo.do",dataJson,isShow).success(function(JSONObjRet){
                if(JSONObjRet.ret == "success"){
                    var pageCount = JSONObjRet.page.totalPage;
                    var showPage = JSONObjRet.page.currentPage;
                    $scope.canLoadRecordSatisfy.nowPageMore = showPage;
                    var JSON_list = JSONObjRet.obtainRecords;
                    if (JSONObjRet.page.totalNumber <= 0) {
                        $scope.canLoadRecordSatisfy.code = false;
                    }
                    if(JSON_list != null && JSON_list.length > 0){
                        for (var i = 0; i < JSON_list.length; i++) {
                            var money = JSON_list[i].money;
                            var limitMoney = JSON_list[i].limitMoney;
                            var explain = JSON_list[i].explain;
                            if(limitMoney > 0){
                                var moneyLimitFlag = true;
                            } else {
                                var moneyLimitFlag = false;
                            }
                            var catalogueName = JSON_list[i].catalogueName;
                            var typesName = JSON_list[i].typesName;
                            var startTime = JSON_list[i].startTime;
                            startTime = $scope.dealTime(startTime);
                            var finishTime = JSON_list[i].finishTime;
                            finishTime = $scope.dealTime(finishTime);
                            var id = JSON_list[i].id;
                            $scope.satisfyRecords.push({money:money,limitMoney:limitMoney,moneyLimitFlag:moneyLimitFlag,catalogueName:catalogueName,typesName:typesName,startTime:startTime,finishTime:finishTime,explain:explain,id:id});
                        }
                    }
                    $ionicScrollDelegate.resize();
                    if(par == "first" && JSON_list.length > 0){
                        $timeout(function (){
                            $('#couponList0').addClass('cur');
                        },500);
                        $scope.coupon = {id:$scope.satisfyRecords[0].id,money:$scope.satisfyRecords[0].money};
                        $scope.order.couponName = '已选择'+$scope.satisfyRecords[0].money+'元'+$scope.satisfyRecords[0].typesName+'"'+$scope.satisfyRecords[0].catalogueName+'"';
                        var paymoney = $scope.summoney;// 网银支付金额
                        paymoney = paymoney - $scope.satisfyRecords[0].money;
                        if(paymoney < 0) {
                            $scope.order.reactMoney = 0;
                        } else {
                            $scope.order.reactMoney = paymoney;
                        }
                        // 判断是否使用积分
                        if($("#shiyongjifen").attr("checked") == "checked" && jifenMaxMoney >= 1){
                            paymoney = paymoney - jifenMaxMoney;
                        }
                        // 判断是否使用余额
                        if($("#shiyongyue").attr("checked") == "checked" && $scope.order.balance >= 1){
                            paymoney = paymoney - $scope.order.balance;
                        }
                        if(paymoney < 0) {
                            paymoney = 0;
                        }
                        $scope.order.summoney_pay_other = paymoney;
                    }

                    if(pageCount <= showPage || JSONObjRet.page.totalNumber <= 0){
                        $scope.canLoadRecordSatisfy.code = false;
                    }else {
                        $scope.canLoadRecordSatisfy.code = true;
                    }
                    if(par == "more"){
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }

                } else {
                    alert(JSONObjRet.message);
                }
            });
        }
        // 不满足条件红包
        $scope.recordDissatisfyLoad = function(par){
            var isShow = false;
            if(par == "first"){
                isShow = true;
                if($scope.dissatisfyRecords.length > 0){
                    return;
                }
            }
            var nowPageMore = $scope.canLoadRecordDissatisfy.nowPageMore;
            if (par != "more") {
                nowPageMore = 1;
            } else {
                nowPageMore++;
            }
            var u = localStorage.getItem("uid_local");
            var dataJson = {user:{userID:u,sh:6},page:{currentPage:nowPageMore,pageNumber:10}};
            $mainServices.postNew(domain2+"vouchers/checkVouchersInfo.do",dataJson,isShow).success(function(JSONObjRet){
                if(JSONObjRet.ret == "success"){
                    var pageCount = JSONObjRet.page.totalPage;
                    var showPage = JSONObjRet.page.currentPage;
                    $scope.canLoadRecordDissatisfy.nowPageMore = showPage;
                    var JSON_list = JSONObjRet.obtainRecords;
                    if (JSONObjRet.page.totalNumber <= 0) {
                        $scope.canLoadRecordDissatisfy.code = false;
                    }
                    if(JSON_list != null && JSON_list.length > 0){
                        for (var i = 0; i < JSON_list.length; i++) {
                            var money = JSON_list[i].money;
                            var limitMoney = JSON_list[i].limitMoney;
                            var explain = JSON_list[i].explain;
                            if(limitMoney > 0){
                                var moneyLimitFlag = true;
                            } else {
                                var moneyLimitFlag = false;
                            }
                            var catalogueName = JSON_list[i].catalogueName;
                            var typesName = JSON_list[i].typesName;
                            var startTime = JSON_list[i].startTime;
                            startTime = $scope.dealTime(startTime);
                            var finishTime = JSON_list[i].finishTime;
                            finishTime = $scope.dealTime(finishTime);
                            var id = JSON_list[i].id;
                            $scope.dissatisfyRecords.push({money:money,limitMoney:limitMoney,moneyLimitFlag:moneyLimitFlag,catalogueName:catalogueName,typesName:typesName,startTime:startTime,finishTime:finishTime,explain:explain,id:id});
                        }
                    }
                    $ionicScrollDelegate.resize();

                    if(pageCount <= showPage || JSONObjRet.page.totalNumber <= 0){
                        $scope.canLoadRecordDissatisfy.code = false;
                    }else {
                        $scope.canLoadRecordDissatisfy.code = true;
                    }
                    if(par == "more"){
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }

                } else {
                    alert(JSONObjRet.message);
                }
            });
        }
        // 已使用/已过期
        $scope.recordDisuseLoad = function(par){
            var isShow = false;
            if(par == "first"){
                isShow = true;
                if($scope.disuseRecords.length > 0){
                    return;
                }
            }
            var nowPageMore = $scope.canLoadRecordDisuse.nowPageMore;
            if (par != "more") {
                nowPageMore = 1;
            } else {
                nowPageMore++;
            }
            var u = localStorage.getItem("uid_local");
            var dataJson = {user:{userID:u,sh:4},page:{currentPage:nowPageMore,pageNumber:10}};
            $mainServices.postNew(domain2+"vouchers/checkVouchersInfo.do",dataJson,isShow).success(function(JSONObjRet){
                if(JSONObjRet.ret == "success"){
                    var pageCount = JSONObjRet.page.totalPage;
                    var showPage = JSONObjRet.page.currentPage;
                    $scope.canLoadRecordDisuse.nowPageMore = showPage;
                    var JSON_list = JSONObjRet.obtainRecords;
                    if (JSONObjRet.page.totalNumber <= 0) {
                        $scope.canLoadRecordDisuse.code = false;
                    }
                    if(JSON_list != null && JSON_list.length > 0){
                        for (var i = 0; i < JSON_list.length; i++) {
                            var money = JSON_list[i].money;
                            var limitMoney = JSON_list[i].limitMoney;
                            var explain = JSON_list[i].explain;
                            if(limitMoney > 0){
                                var moneyLimitFlag = true;
                            } else {
                                var moneyLimitFlag = false;
                            }
                            var catalogueName = JSON_list[i].catalogueName;
                            var typesName = JSON_list[i].typesName;
                            var startTime = JSON_list[i].startTime;
                            startTime = $scope.dealTime(startTime);
                            var finishTime = JSON_list[i].finishTime;
                            finishTime = $scope.dealTime(finishTime);
                            var isValid = JSON_list[i].status; //1已过期2已使用
                            $scope.disuseRecords.push({money:money,limitMoney:limitMoney,moneyLimitFlag:moneyLimitFlag,catalogueName:catalogueName,typesName:typesName,startTime:startTime,finishTime:finishTime,explain:explain,isValid:isValid});
                        }
                    }
                    $ionicScrollDelegate.resize();

                    if(pageCount <= showPage || JSONObjRet.page.totalNumber <= 0){
                        $scope.canLoadRecordDisuse.code = false;
                    }else {
                        $scope.canLoadRecordDisuse.code = true;
                    }
                    if(par == "more"){
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }
                } else {
                    alert(JSONObjRet.message);
                }
            });
        }
        // 选择可使用红包
        $scope.chooseCoupon =function (index,id,money,typesName,name) {
            var paymoney = $scope.summoney;//网银支付金额
            if($('#'+index).hasClass('cur')){
                $('#'+index).removeClass('cur');
                $scope.coupon = {id:'',money:0};
                $scope.order.couponName = $scope.order.couponLen+"个满足本次订单条件的可用红包";
                $scope.order.reactMoney = paymoney;
                // 判断是否使用积分
                if($("#shiyongjifen").attr("checked") == "checked" && jifenMaxMoney >= 1){
                    paymoney = paymoney - jifenMaxMoney;
                }
                // 判断是否使用余额
                if($("#shiyongyue").attr("checked") == "checked" && $scope.order.balance >= 1){
                    paymoney = paymoney - $scope.order.balance;
                }
                if(paymoney < 0) {
                    paymoney = 0;
                }
                $scope.order.summoney_pay_other = paymoney;
            } else {
                $('#'+index).addClass('cur').siblings().removeClass('cur');
                $scope.coupon = {id:id,money:money};
                $scope.order.couponName = '已选择'+money+'元'+typesName+'"'+name+'"';
                paymoney = paymoney - money;
                if(paymoney < 0) {
                    $scope.order.reactMoney = 0;
                } else {
                    $scope.order.reactMoney = paymoney;
                }
                // 判断是否使用积分
                if($("#shiyongjifen").attr("checked") == "checked" && jifenMaxMoney >= 1){
                    paymoney = paymoney - jifenMaxMoney;
                }
                // 判断是否使用余额
                if($("#shiyongyue").attr("checked") == "checked" && $scope.order.balance >= 1){
                    paymoney = paymoney - $scope.order.balance;
                }
                if(paymoney < 0) {
                    paymoney = 0;
                }
                $scope.order.summoney_pay_other = paymoney;
            }

        }
        // 订单提交
        $scope.orderFormSubmit = function () {
            var u = localStorage.getItem("uid_local");
            var paystyle = $("[name='paystyle']:checked").val(); //支付方式
            var paymoney = $scope.order.summoney_pay_other; //网银支付金额
            var shiyongyueHidden = "0";
            var shiyongjifenHidden = "0";
            var coumoney = $scope.coupon.money;
            var obtainId = $scope.coupon.id;

            if($("#shiyongyue").attr("checked") == "checked"){
            	shiyongyueHidden = "1";
            }
            if($("#shiyongjifen").attr("checked") == "checked"){
            	shiyongjifenHidden = "1";
            }
            //判断是否使用余额
            if(shiyongyueHidden == "1" || shiyongjifenHidden == "1" || coumoney > 0) {
                // 使用余额
                if (paymoney > 0) {
                    if (typeof(paystyle) == "undefined" || paystyle == null || paystyle == "") {
                        alert("请选择支付方式。");
                        return;
                    }
                }
            } else {
                //不使用余额
                if (typeof(paystyle) == "undefined" || paystyle == null || paystyle == "") {
                    alert("请选择支付方式。");
                    return;
                }
            }

            showTankuang('确认提交并支付吗？');

            $("#quxiaoBtn").click(function () {
                $("#tankuangIdDiv").remove();
                $(".reveal-modal-bg").remove();
            });
            $("#querenBtnRollback").click(function () {
                $("#tankuangIdDiv").remove();
                $(".reveal-modal-bg").remove();

                var html_loading = "<div class='onLoadingDiv-class' id='onLoadingDiv'><div id='loadingBg'><div id='loadingtext' class='zjz'><p>数据提交中...</p></div></div></div>";
                $("html").append(html_loading);

                $timeout(function(){
                    // 生成购物订单
                    var url = basePath + "payForm.jsp";
                    var dataJson = {u:u,paystyle:paystyle,platform:$mainServices.flagPlatform(),shiyongyueHidden:shiyongyueHidden,shiyongjifenHidden:shiyongjifenHidden,obtainId:obtainId};
                   	$mainServices.post(url,dataJson,false).success(function(dataJsonRet){
			        	var code = dataJsonRet.code;
                    	if (code == 200) {
	                        $(".onLoadingDiv-class").remove();
	                        var onumber_db = dataJsonRet.onumber;
                            var paymoney_db = dataJsonRet.paymoney;
                            var paystyle_db = dataJsonRet.paystyle;
                            paymoney_db = parseFloat(paymoney_db);
	
	                        var skipUrl_db = dataJsonRet.redirectUrl; //支付完成跳转页面
	
	                        localStorage.setItem("local-o", onumber_db);
	                        if (paymoney_db <= 0) {
	                            // 全部余额支付
	                            alert("支付成功。");
	                            $timeout(function () {
	                                $state.go("cart.payFinish", {});
	                            }, 1500);
	                        } else {
								//提交成功发起支付
								if(paystyle_db != ""){
								    if(skipUrl_db != ""){
                                        $mainServices.iosBrowerPay(skipUrl_db);
                                        setTimeout(function () {
                                            showTankuang("是否完成支付？");
                                            $("#querenBtnRollback").attr("id", "querenBtnRollback222");
                                            $("#querenBtnRollback222").attr("onclick", "closeTankuang();skip('#/" + $scope.host + "/payFinish')");
                                        }, 2000);
                                    } else {
                                        var isNativePay = $("[name='paystyle']:checked").attr("attr-type"); //是否是原生支付
                                        if(isNativePay == 1 || isNativePay == '1'){
                                            if(paystyle_db == 9 || paystyle_db == '9'){
                                                // 京东原生支付
                                                var signDataStr = "merchant="+dataJsonRet.merchant+"&orderId="+dataJsonRet.orderId+"&key=pDvdkozMmDiwKvxz3KejPjip1OgWlyRI";
                                                var signData = hex_md5(signDataStr).toLowerCase();
                                                var content = JSON.stringify({orderId:dataJsonRet.orderId,appId:dataJsonRet.appId,signData:signData,merchant:dataJsonRet.merchant});
                                            } else if(paystyle_db == 10 || paystyle_db == '10'){
                                                // 微信原生支付
                                                var content = dataJsonRet.token_id;
                                            }
                                            setTimeout(function () {
                                                showTankuang("是否完成支付？");
                                                $("#querenBtnRollback").attr("id", "querenBtnRollback222");
                                                $("#querenBtnRollback222").attr("onclick", "closeTankuang();skip('#/" + $scope.host + "/payFinish')");
                                            }, 3000);
                                            $mainServices.nativePay(paystyle_db,content);
                                        } else {
                                            alert(dataJsonRet.message);
                                        }
                                    }

                                } else {
	                                $(".onLoadingDiv-class").remove();
	                                alert("提交失败。");
                                }
	                        }
	                    } else {
	                        $(".onLoadingDiv-class").remove();
	                        if(code == 100){
	                            alert("下手慢了，已退至账户余额。");
	                        } else{
	                            alert(dataJsonRet.message);
	                        }
	
	                    }
			        }).error(function () {
                        $(".onLoadingDiv-class").remove();
                        alert("数据提交失败，请重新提交订单！");
                    });
                }, 1000);
            });
        }

        $scope.satisfyLoadMore = function () {
            $scope.recordSatisfyLoad('more');
        }
        $scope.dissatisfyLoadMore = function () {
            $scope.recordDissatisfyLoad('more');
        }
        $scope.disuseLoadMore = function () {
            $scope.recordDisuseLoad('more');
        }
        // 当我们用完模型时，清除它
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$factoryServices','$timeout','$state','$ionicModal','$ionicScrollDelegate'];
    return ctrl;  
      
}); 