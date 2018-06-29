define(function () {
	'use strict';
	function ctrl($scope, $mainServices, $factoryServices, $controller, $ionicSlideBoxDelegate, $timeout, $interval, $ionicScrollDelegate, $ionicPopup, $ionicHistory, $location, $q, $rootScope, $ionicTabsDelegate, $ionicActionSheet) {
		$scope.daojishiDiv = false;
		$scope.daojishi = [{ mm: "00", ss: "00", s_m_100: "00" }, { mm: "00", ss: "00", s_m_100: "00" }, { mm: "00", ss: "00", s_m_100: "00" }, { mm: "00", ss: "00", s_m_100: "00" }];
		$scope.jjjx = [{ producturl: "newproductdetail?type=1", daojishiSpan: false, daojishi: "", ptitle: "", pic: "", pterm_pub: "", pid_pub: "", publictimelast: "", nowtime: '' }, { producturl: "newproductdetail?type=1", daojishiSpan: false, daojishi: "", ptitle: "", pic: "", pterm_pub: "", pid_pub: "", publictimelast: "", nowtime: '' }, { producturl: "newproductdetail?type=1", daojishiSpan: false, daojishi: "", ptitle: "", pic: "", pterm_pub: "", pid_pub: "", publictimelast: "", nowtime: '' }, { producturl: "newproductdetail?type=1", daojishiSpan: false, daojishi: "", ptitle: "", pic: "", pterm_pub: "", pid_pub: "", publictimelast: "", nowtime: '' }];
		$scope.rqtjList = []; //产品排序列表
		$scope.bannerList = []; // banner图列表
		$scope.bannerListFlag = false; // banner图标志
		$scope.prodjslist = []; // 倒计时产品列表
		$scope.app_ewm = ""; // 判断是否获得二维码图片路径
		$scope.navFourLi = ["cur", "", "", ""]; //推荐排序导航
		$scope.arrowPx = ["", ""]; //价格递增递减
		$scope.showToTop = false; //是否显示返回到顶部
		var base = $controller('baseController', { $scope: $scope });
		var dfour = $q.defer();
		var promisefour = dfour.promise;

		// 分享回调
		window.shareCallBackFn = function (type) {
			showTankuangOneBtn('分享成功！');
			$("#querenBtnRollback").click(function () {
				$("#tankuangIdDiv").remove();
				$(".reveal-modal-bg").remove();
			});
		}
		// 引导
		window.ikonw = function () {
			$('#diaIntr,#diaIntr1').hide();
			$rootScope.hideTabs = "";
		}
		function prDefault(e) {
			e.preventDefault();
		}

		$rootScope.closeHuiyiDialog = function () {
			$("#huiyiDialog,#huiyiDialog .outter-dialog").hide();
		}
		$rootScope.closeDialog = function () {
			$("#firstDialog,#firstDialog .outter-dialog").hide();
			var uid_local = localStorage.getItem("uid_local");
			if (!$mainServices.isNull(uid_local)) {
				var newbieArray = localStorage.getItem("newbieArray");
				var newbieFlag = true;//false不符合条件或者做过新手引导 true未做过新手引导
				if (newbieArray != '' && newbieArray != null) {
					newbieArray = JSON.parse(newbieArray);
					for (var i = 0; i < newbieArray.length; i++) {
						if (uid_local == newbieArray[i]) {
							newbieFlag = false;
							break;
						}
					}
				} else {
					newbieArray = [];
				}
				if (newbieFlag) {
					$mainServices.postNew(domain2 + "orderDetailPeople/sprogJudge.do", { userID: uid_local, platform: 2 }, false).success(function (subRetJson) {
						if (subRetJson.result == "success") {
							$timeout(function () {
								newbieArray.push(uid_local);
								localStorage.setItem("newbieArray", JSON.stringify(newbieArray));
								$('#diaIntr,#diaIntr1').show();
								var getTop = $("#iconNewbie")[0].getBoundingClientRect().top;
								if ($scope.width / 709 * 300 < getTop) {
									$('#diaIntr1').css({ 'left': $("#iconNewbie")[0].getBoundingClientRect().left - 25, 'top': getTop - 2 })
								} else {
									$('#diaIntr1').css({ 'left': $("#iconNewbie")[0].getBoundingClientRect().left - 25, 'top': $scope.width / 709 * 300 - 5 + getTop - 2 })
								}

							}, 1000);
						} else {
							newbieArray.push(uid_local);
						}
					});

				}
			}
		}
		/*弹框*/
		$('.zlxss').show();
		if (!localStorage.getItem("uid_local")) {
			$('.img-get').attr({ 'src': 'img/update.jpg' });
			$('.btn-close').show();
		} else {
			$('.img-get').attr({ 'src': 'img/update.jpg' });
			$('.img-get').css({ 'width': '85%' });
			$('.btn-close').hide();
		}
		/*---------*/
		$rootScope.jumpPage = function () {
			if (isiOS) {
				// 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止js其他行为
				var ifr = document.createElement('iframe');
				ifr.src = 'huiyi://';//打开app的协议，有app同事提供
				ifr.style.display = 'none';
				document.body.appendChild(ifr);
				window.setTimeout(function () {
					document.body.removeChild(ifr);
					window.location.href = "https://itunes.apple.com/cn/app/hui-yi-you-xi-wang-you-xi-zi-xun/id1327728984?mt=8";//打开app下载地址，有app同事提供
				}, 2000)
			} else {
				window.jsAndroid.jumpToBrowser("https://resource.592huiyi.com/1yx_h5/archive/592huiyi.apk");
			}
		}
		/*强制跳转下载*/
		$rootScope.forceUploadHuiyi = function () {
			if (isiOS) {
				// 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止js其他行为
				window.location.href = "https://itunes.apple.com/cn/app/hui-yi-you-xi-wang-you-xi-zi-xun/id1327728984?mt=8";//打开app下载地址，有app同事提供
			} else {
				window.jsAndroid.jumpToBrowser("https://resource.592huiyi.com/1yx_h5/archive/592huiyi.apk");
			}
		}
		/*强制跳转回忆*/
		$rootScope.forceGotoHuiyi = function () {
			if (isiOS) {
				// 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止js其他行为
				var ifr = document.createElement('iframe');
				ifr.src = 'huiyi://';//打开app的协议，有app同事提供
				ifr.style.display = 'none';
				document.body.appendChild(ifr);
			} else {
				window.location.href = "huiy://";//打开app下载地址，有app同事提供
			}
		}
		// 进入app如果已登录进行推送通知
		var u = localStorage.getItem("uid_local");
		if (domain.indexOf('ios.1yuanxing') == -1) {
			if (!$mainServices.isNull(u)) {
				$mainServices.userLogin(u.substring(u.indexOf('_') + 1, u.indexOf('.')));
				$mainServices.postNew(domain2 + "giftRelative/selectGiftLink.do", { userID: u, platform: 2 }, false).success(function (subRetJson) {
					if (subRetJson.ret == "success") {
						if (subRetJson.data.image != "" && subRetJson.data != null) {
							if (!u) {
								$rootScope.fDialogImg = domain3 + subRetJson.data.image;
								$rootScope.fDialogUrl = subRetJson.data.link;
							} else {
								$rootScope.fDialogImg = "../../img/fanxianapp.png";
							}
							var ImgObj = new Image(); //判断图片是否存在
							ImgObj.src = $rootScope.fDialogImg;
							ImgObj.onload = function () {
								$("#firstDialog").show();
								$("#firstDialog .outter-dialog").show();
								var ih = parseInt($("#firstDialog").height());
								var gh = parseInt($("#firstDialog .outter-dialog").height());
								$("#firstDialog .outter-dialog").css("margin-top", (ih - gh) / 2);
							}
						}
					} else {
						var newbieArray = localStorage.getItem("newbieArray");
						var newbieFlag = true;//false不符合条件或者做过新手引导 true未做过新手引导
						if (newbieArray != '' && newbieArray != null) {
							newbieArray = JSON.parse(newbieArray);
							for (var i = 0; i < newbieArray.length; i++) {
								if (u == newbieArray[i]) {
									newbieFlag = false;
									break;
								}
							}
						} else {
							newbieArray = [];
						}
						if (newbieFlag) {
							$mainServices.postNew(domain2 + "orderDetailPeople/sprogJudge.do", { userID: u, platform: 2 }, false).success(function (subRetJson) {
								if (subRetJson.result == "success") {
									$timeout(function () {
										newbieArray.push(u);
										localStorage.setItem("newbieArray", JSON.stringify(newbieArray));
										$('#diaIntr,#diaIntr1').show();
										var getTop = $("#iconNewbie")[0].getBoundingClientRect().top;
										if ($scope.width / 709 * 300 < getTop) {
											$('#diaIntr1').css({ 'left': $("#iconNewbie")[0].getBoundingClientRect().left - 25, 'top': getTop - 2 })
										} else {
											$('#diaIntr1').css({ 'left': $("#iconNewbie")[0].getBoundingClientRect().left - 25, 'top': $scope.width / 709 * 300 - 5 + getTop - 2 })
										}

									}, 1000);
								} else {
									newbieArray.push(u);
								}
							});

						}
					}
				});
				if ($mainServices.getNowDate() != localStorage.getItem("getNowDate")) {
					$rootScope.fDialogImg = "../../img/fanxianapp.png";
					var ImgObj = new Image(); //判断图片是否存在
					ImgObj.src = $rootScope.fDialogImg;
					ImgObj.onload = function () {
						$("#firstDialog").show();
						$("#firstDialog .outter-dialog").show();
						var ih = parseInt(window.screen.availHeight);
						var gh = parseInt($("#firstDialog .outter-dialog").height());
						$("#firstDialog .outter-dialog").css("margin-top", (ih - gh) / 2);
					}
					localStorage.setItem("getNowDate", $mainServices.getNowDate());
				}
			} else {
				if ($mainServices.getNowDate() == localStorage.getItem("getNowDate")) {

				} else {
					$mainServices.postNew(domain2 + "giftRelative/selectGiftLink.do", { userID: '', platform: 2 }, false).success(function (subRetJson) {
						if (subRetJson.ret == "success" && subRetJson.data != null) {
							if (subRetJson.data.image != "") {
								if (!u) {
									$rootScope.fDialogImg = domain3 + subRetJson.data.image;
									$rootScope.fDialogUrl = subRetJson.data.link;
								} else {
									$rootScope.fDialogImg = "../../img/fanxianapp.png";

								}
								var ImgObj = new Image(); //判断图片是否存在
								ImgObj.src = $rootScope.fDialogImg;
								ImgObj.onload = function () {
									$("#firstDialog").show();
									$("#firstDialog .outter-dialog").show();
									var ih = parseInt(window.screen.availHeight);
									var gh = parseInt($("#firstDialog .outter-dialog").height());
									$("#firstDialog .outter-dialog").css("margin-top", (ih - gh) / 2);
								}
								localStorage.setItem("getNowDate", $mainServices.getNowDate());
							}
						}
					});
				}
			}
		}

		// 首次进入app先显示历史
		$scope.indexRecord = function () {
			var indexBannerData = localStorage.getItem("indexBannerData");
			if (indexBannerData != null && indexBannerData != "") {
				indexBannerData = JSON.parse(indexBannerData);
				$scope.bannerListFlag = true;
				for (var i = 0; i < indexBannerData.length; i++) {
					var link = indexBannerData[i].linkapp;
					$scope.bannerList.push({ title: '', pic: '', link: link });
				}
				$timeout(function () {
					for (var j = 0; j < indexBannerData.length; j++) {
						var pic = indexBannerData[j].pic;
						var title = indexBannerData[j].title;
						$scope.bannerList[j].title = title;
						$scope.bannerList[j].pic = $mainServices.getHttpOrlocalProPic(pic);
					}
					$ionicSlideBoxDelegate.update();
				}, 500)
			} else {
				$scope.bannerListFlag = false;
			}
			var indexAnnouncementData = localStorage.getItem("indexAnnouncementData");
			if (indexAnnouncementData != null && indexAnnouncementData != "") {
				dfour = $q.defer();
				promisefour = dfour.promise;
				indexAnnouncementData = JSON.parse(indexAnnouncementData);
				$scope.prodjslist = indexAnnouncementData;
				for (var i = 0; i < indexAnnouncementData.length; i++) {
					$scope.jjjx[i].ptitle = indexAnnouncementData[i].ptitle;
					$scope.jjjx[i].pic = indexAnnouncementData[i].pic;
					$scope.jjjx[i].pterm_pub = indexAnnouncementData[i].pterm;
					$scope.jjjx[i].pid_pub = indexAnnouncementData[i].pid;
					$scope.jjjx[i].publictimelast = indexAnnouncementData[i].publictimelast;//倒计时结束时间
					$scope.jjjx[i].nowtime = indexAnnouncementData[i].nowtime;
					if ($scope.jjjx[i].ptype == '2') {
						$scope.jjjx[i].producturl = 'newbieDetail?type=1';
					} else {
						$scope.jjjx[i].producturl = 'newproductdetail?type=1';
					}
				}
				intervalCancel();
				dfour.resolve();
			}
			var indexProListData = localStorage.getItem("indexProListData");
			if (indexProListData != null && indexProListData != "") {
				indexProListData = JSON.parse(indexProListData);
				var JSON_list = indexProListData.prolist;
				var pageCount = parseInt(indexProListData.pageCount);
				var recount = parseInt(indexProListData.recount); // 记录数
				$scope.canLoadMore.nowPageMore = parseInt(indexProListData.showPage);
				$scope.canLoadMore.code = false;
				for (var i = 0; i < JSON_list.length; i++) {
					var pid = JSON_list[i].pid;
					var pic = JSON_list[i].pic;
					var price = JSON_list[i].price;
					var total_time = JSON_list[i].total_time;
					var finish_time = JSON_list[i].finish_time;
					var ptitle = JSON_list[i].ptitle;
					var now_term = JSON_list[i].now_term;
					pic = $mainServices.getHttpOrlocalProPic(pic);
					var shengyu_time = parseInt(total_time) - parseInt(finish_time);
					var baifenbi = parseFloat(finish_time / total_time);
					baifenbi = baifenbi.toFixed(2) * 100 + "%";
					var isRepeat = 0;
					for (var j = 0; j < $scope.rqtjList.length; j++) {
						if ($scope.rqtjList[j].pid == pid) {
							isRepeat = 1;
							$scope.rqtjList[j].baifenbi = baifenbi;
							$scope.rqtjList[j].finish_time = finish_time;
							$scope.rqtjList[j].total_time = total_time;
							$scope.rqtjList[j].shengyu_time = shengyu_time;
							$scope.rqtjList[j].now_term = now_term;
						}
					}
					if (isRepeat == 0) {
						$scope.rqtjList.push({
							flag: 1,
							pid: pid,
							pic: pic,
							price: price,
							baifenbi: baifenbi,
							finish_time: finish_time,
							total_time: total_time,
							shengyu_time: shengyu_time,
							ptitle: ptitle,
							now_term: now_term
						});
					}
				}
				$ionicScrollDelegate.resize();
				if ($scope.canLoadMore.nowPageMore == pageCount || recount <= 0) {
					$scope.canLoadMore.code = false;
				} else {
					$scope.canLoadMore.code = true;
				}
			};
		}
		$scope.indexRecord();

		// 滑动监听
		var lastPos = 0, moveFlag = false, touchInter = null, moveTimer;// 定时器

		$scope.pauseScroll = function (event) {
			if (moveFlag == true) {
				event.preventDefault();
				event.stopPropagation();
				moveFlag = false;
				clearInterval(touchInter);
			}
		};

		function touchStart(event) {
			clearInterval(touchInter);
			$timeout.cancel(moveTimer);
		}
		function touchMove(event) {
			moveFlag = true;
			clearInterval(touchInter);
			$timeout.cancel(moveTimer);
		}
		function touchEnd(event) {
			clearInterval(touchInter);
			if (moveFlag == true) {
				touchInter = setInterval(function () {
					if ($ionicScrollDelegate.getScrollPosition().top > 540) {
						$scope.showToTop = true;
					} else {
						$scope.showToTop = false;
					}
					if (lastPos == $ionicScrollDelegate.getScrollPosition().top) {
						event.preventDefault();
						event.stopPropagation();
						clearInterval(touchInter);
						moveTimer = $timeout(function () {
							moveFlag = false;
						}, 301);

					}
					// console.log(lastPos+"--"+$ionicScrollDelegate.getScrollPosition().top)
					lastPos = $ionicScrollDelegate.getScrollPosition().top;
				}, 100);

			}
		}
		document.addEventListener('touchstart', touchStart, false);
		document.addEventListener('touchmove', touchMove, false);
		document.addEventListener('touchend', touchEnd, false);

		// 调用合并总接口获取信息
		var url = basePath + "getIndex.jsp";
		$mainServices.post(url, { t: 5 }, true).success(function (JSONObjRet) {
			var milliseconds = JSONObjRet.milliseconds; //服务器毫秒数
			var bannerlist = JSONObjRet.bannerlist; //banner图
			$scope.prodjslist = JSONObjRet.prodjslist; //倒计时产品
			var profxpiclist = JSONObjRet.profxpiclist; //分享图片
			// 揭晓倒计时赋值
			function getIndexPublic() {
				// 揭晓倒计时
				if ($scope.prodjslist.length > 0) {
					for (var i = 0; i < $scope.prodjslist.length; i++) {
						$scope.jjjx[i].ptitle = $scope.prodjslist[i].ptitle;
						$scope.jjjx[i].pic = $mainServices.getHttpOrlocalProPic($scope.prodjslist[i].pic);
						$scope.jjjx[i].pterm_pub = $scope.prodjslist[i].pterm;
						$scope.jjjx[i].pid_pub = $scope.prodjslist[i].pid;
						$scope.jjjx[i].publictimelast = $mainServices.getTimeNo_0($scope.prodjslist[i].publictimelast);// 倒计时结束时间
						$scope.jjjx[i].nowtime = milliseconds;
						$scope.jjjx[i].ptype = $scope.prodjslist[i].ptype;
						if ($scope.jjjx[i].ptype == '2') {
							$scope.jjjx[i].producturl = 'newbieDetail?type=1';
						} else {
							$scope.jjjx[i].producturl = 'newproductdetail?type=1';
						}
					}
					$ionicScrollDelegate.resize();
					localStorage.setItem("indexAnnouncementData", JSON.stringify($scope.jjjx));
				}
				intervalCancel();
				dfour.resolve();
			};

			// 获取 banner
			function getIndexBanner() {
				$scope.bannerList = [];
				if (bannerlist.length >= 2) {
					$scope.bannerListFlag = true;
					for (var i = 0; i < bannerlist.length; i++) {
						var link = bannerlist[i].linkapp;
						$scope.bannerList.push({ title: '', pic: '', link: link });
					}
					$timeout(function () {
						for (var j = 0; j < bannerlist.length; j++) {
							var pic = bannerlist[j].pic;
							var title = bannerlist[j].title;
							$scope.bannerList[j].title = title;
							$scope.bannerList[j].pic = $mainServices.getHttpOrlocalProPic(pic);
						}
						$ionicSlideBoxDelegate.update();
						$ionicScrollDelegate.resize();
					}, 500)
					localStorage.setItem("indexBannerData", JSON.stringify(bannerlist));

				} else {
					$scope.bannerListFlag = false;
				}
			};

			// 初始化
			getIndexPublic();// 揭晓倒计时
			$scope.getIndexProTjSx("first");// 推荐产品
			getIndexBanner();// 获取banner
			$scope.app_ewm = profxpiclist[0].content;// 获取app下载二维码
		});

		function intervalCancel() {
			try {
				$interval.cancel($scope.jjjx[0].daojishi);
				$interval.cancel($scope.jjjx[1].daojishi);
				$interval.cancel($scope.jjjx[2].daojishi);
				$interval.cancel($scope.jjjx[3].daojishi);
			} catch (e) { }
			GetRTimeMobilePublicProduct(0, $scope.jjjx[0].publictimelast, $scope.jjjx[0].nowtime);
			GetRTimeMobilePublicProduct(1, $scope.jjjx[1].publictimelast, $scope.jjjx[1].nowtime);
			GetRTimeMobilePublicProduct(2, $scope.jjjx[2].publictimelast, $scope.jjjx[2].nowtime);
			GetRTimeMobilePublicProduct(3, $scope.jjjx[3].publictimelast, $scope.jjjx[3].nowtime);
		}
		// 倒计时控制
		function GetRTimeMobilePublicProduct(i, public_time, nowtime) {
			var publicParse = new Date(Date.parse(public_time.replace(/-/g, "/")));
			var EndTime = Date.UTC(publicParse.getFullYear(), publicParse.getMonth(), publicParse.getDate(), publicParse.getHours(), publicParse.getMinutes(), publicParse.getSeconds()) - 3600000 * 8; //转换成毫秒数
			var t = EndTime - nowtime; // 服务器结束时间 - 服务器当前时间
			var time = 60;
			$scope.jjjx[i].daojishi = $interval(function () {
				if (t > 0) {
					if ($scope.jjjx[i].ptype == '2') {
						$scope.jjjx[i].producturl = 'newbieDetail?type=1';
					} else {
						$scope.jjjx[i].producturl = 'newproductdetail?type=1';
					}
					$scope.jjjx[i].daojishiSpan = false;
					$scope.daojishi[i].mm = Math.floor(t / 1000 / 60 % 60) + "";
					$scope.daojishi[i].ss = Math.floor(t / 1000 % 60) + "";
					$scope.daojishi[i].s_m_100 = t + "";
					$scope.daojishi[i].s_m_100 = $scope.daojishi[i].s_m_100.substr($scope.daojishi[i].s_m_100.length - 3, 2); //截取毫秒前两位

					if ($scope.daojishi[i].mm.length == 1) {
						$scope.daojishi[i].mm = "0" + $scope.daojishi[i].mm;
					}
					if ($scope.daojishi[i].ss.length == 1) {
						$scope.daojishi[i].ss = "0" + $scope.daojishi[i].ss;
					}
					$scope.daojishiDiv = true;
					t -= time;
				} else {
					if ($scope.jjjx[i].ptype == '2') {
						$scope.jjjx[i].producturl = 'newbieDetail?type=2';
					} else {
						$scope.jjjx[i].producturl = 'newproductdetail?type=2';
					}
					$scope.jjjx[i].daojishiSpan = true;
					$scope.daojishi[i].mm = "00";
					$scope.daojishi[i].ss = "00";
					$scope.daojishi[i].s_m_100 = "00";
					$scope.daojishiDiv = true;
					$interval.cancel($scope.jjjx[i].daojishi);
				}
			}, time);
		};

		// 带请求的推荐产品
		$scope.getIndexProTjSx = function (t, obj, val, idx) {
			// t == 点击排序2/上拉加载更多"more"/首次加载"first"
			if (typeof obj != 'undefined') {
				// 用于t == 2的情况，获取当前dom对象
				obj = obj.toElement;
				if (val == 3) {
					obj = obj.parentNode;
				}
			}
			// 是否显示请求loading
			var isHide = false;
			if (t == 2) {
				isHide = true;
			}
			// 加载更多
			if (t != "more") {
				$scope.canLoadMore.nowPageMore = 1;
			} else {
				$scope.canLoadMore.nowPageMore++;
			}
			var url = basePath + "getProduct.jsp";
			var dataJson = { 'toPage': $scope.canLoadMore.nowPageMore };

			// 筛选条件选择
			if (t == 2) {
				$scope.navFourLi = ["", "", "", ""]; //推荐排序导航
				$scope.navFourLi[idx] = "cur";
				if (val == 3) {
					if ($scope.arrowPx[0] == "") {
						$scope.arrowPx = ["imph", ""];
					} else {
						$scope.arrowPx = ["", "imph"];
					}
				} else {
					$scope.arrowPx = ["", ""];
				}
				$scope.canLoadMore.code = false;
			}
			if (t == 2) {
				var px = val;
				if (px == 3 && $scope.arrowPx[1] == "imph") {
					px = 2;
				}
				dataJson['px'] = px;
			} else {
				var px;
				for (var i = 0; i < 4; i++) {
					if ($scope.navFourLi[i] == "cur") {
						px = i;
						break;
					}
				}
				if (px == 2) {
					px = 4;
				} else if (px == 3 && $scope.arrowPx[1] == "imph") {
					px = 2;
				} else if (px == 1) {
					px = 0;
				} else if (px == 0) {
					px = 1;
				}
				dataJson['px'] = px;
			}
			// 异步加载数据。。。。。。。。
			$mainServices.post(url, dataJson, isHide).success(function (JSONObjRet) {
				if (t != "more" || $scope.canLoadMore.nowPageMore == 1) {
					$scope.rqtjList = []; //产品排序列表
				}
				var JSON_list = JSONObjRet.prolist;
				var pageCount = parseInt(JSONObjRet.pageCount);
				var recount = parseInt(JSONObjRet.recount); // 记录数
				$scope.canLoadMore.nowPageMore = parseInt(JSONObjRet.showPage);
				$scope.canLoadMore.code = false;

				if (JSON_list.length > 0) {
					for (var i = 0; i < JSON_list.length; i++) {
						var pid = JSON_list[i].pid;
						var pic = JSON_list[i].pic;
						var price = JSON_list[i].price;
						var total_time = JSON_list[i].total_time;
						var finish_time = JSON_list[i].finish_time;
						var now_term = JSON_list[i].now_term;
						var ptitle = JSON_list[i].ptitle;
						pic = $mainServices.getHttpOrlocalProPic(pic);
						var shengyu_time = parseInt(total_time) - parseInt(finish_time);
						var baifenbi = parseFloat(finish_time / total_time);
						baifenbi = baifenbi.toFixed(2) * 100 + "%";
						var isRepeat = 0;
						for (var j = 0; j < $scope.rqtjList.length; j++) {
							if ($scope.rqtjList[j].pid == pid) {
								isRepeat = 1;
								$scope.rqtjList[j].baifenbi = baifenbi;
								$scope.rqtjList[j].finish_time = finish_time;
								$scope.rqtjList[j].total_time = total_time;
								$scope.rqtjList[j].shengyu_time = shengyu_time;
								$scope.rqtjList[j].now_term = now_term;
							}
						}
						if (isRepeat == 0) {
							$scope.rqtjList.push({ flag: 1, pid: pid, pic: pic, price: price, baifenbi: baifenbi, finish_time: finish_time, total_time: total_time, shengyu_time: shengyu_time, now_term: now_term, ptitle: ptitle });
						}
					}
					if ((t == "refresh" && px == 1) || t == "first" || (t == 2 && px == 1)) {
						localStorage.setItem("indexProListData", JSON.stringify(JSONObjRet));
					};
				}
				$ionicScrollDelegate.resize();
				if ($scope.canLoadMore.nowPageMore == pageCount || recount <= 0) {
					$scope.canLoadMore.code = false;
				} else {
					$scope.canLoadMore.code = true;
				}

				if (t == "more") {
					$scope.$broadcast('scroll.infiniteScrollComplete');
				} else if (t == "refresh") {
					$scope.$broadcast('scroll.refreshComplete');
				}
			});
		}

		// 元行记录
		$scope.buyRecord = function () {
			$factoryServices.checkLogin("#/index/index", "#/index/log", "#/index/buyRecord/0");
		};
		// 账户充值
		$scope.recharge = function () {
			$factoryServices.checkLogin("#/index/index", "#/index/log", "#/index/recharge");
		};
		// 签到送积分
		$scope.sendIntegral = function () {
			$factoryServices.checkLogin("#/index/index", "#/index/log", "#/index/integral");
		};
		// 幸运大转盘
		$scope.luckDraw = function () {
			$factoryServices.checkLogin("#/index/index", "#/index/log", "#/index/luckDraw");
		};
		// 领取回忆红包
		$scope.getVoucher = function () {
			var u = localStorage.getItem("uid_local");
			if (u == null || u == "" || typeof (u) == "undefined") {
				skip("#/index/log");
			} else {
				$mainServices.postNew("https://api.592huiyi.com/vouchers/selectFeedbackVoucher", { userID: u }, true).success(function (JSONObjRet) {
					if (JSONObjRet.ret == "success") {
						$('#huiyiDialog,#huiyiDialog .outter-dialog').show();
						$rootScope.huiyiMessage = JSONObjRet.message;
						$rootScope.huiyiImgList = JSONObjRet.list;
						$rootScope.huiyiRule = JSONObjRet.rule;
						$rootScope.huiyiStatus = JSONObjRet.status;
						var ImgObj = new Image(); //判断图片是否存在
						ImgObj.src = JSONObjRet.list[JSONObjRet.list.length - 1];
						ImgObj.onload = function () {
							var ih = parseInt($("#huiyiDialog").height());
							var gh = parseInt($("#huiyiDialog .outter-dialog").height());
							$("#huiyiDialog .outter-dialog").css("margin-top", (ih - gh) / 2);
						}
					} else {
						alert(JSONObjRet.message);
					}
				});
			}
		};
		$rootScope.goHuiyi = function () {
			$mainServices.iosBrowerPay('https://www.592huiyi.com/openHuiyi.html');
			$rootScope.closeHuiyiDialog();
		}
		$rootScope.uploadHuiyi = function () {
			$mainServices.iosBrowerPay('https://www.592huiyi.com/app_download.html');
			$rootScope.closeHuiyiDialog();
		}
		$scope.toTop = function () {
			$ionicScrollDelegate.scrollTop(0);
			$scope.showToTop = false;
		};

		// banner点击跳转
		$scope.bannerSkip = function (linkapp) {
			if (typeof (linkapp) != "undefined" && linkapp != null && linkapp != "") {
				if (linkapp.indexOf("http://") < 0 && linkapp.indexOf("https://") < 0) {
					if (/^\#.*$/g.test(linkapp)) {
						skip(linkapp);
					}
				} else {
					$mainServices.iosBrowerPay(linkapp);
				}
			};
		};
		// 顶部分享按钮
		$scope.share = function () {
			$scope.invitationCode = localStorage.getItem("invitationCode");
			// if($mainServices.isNull($scope.invitationCode)){
			var u = localStorage.getItem("uid_local");
			if (u != null && u != "" && typeof (u) != "undefined") {
				var url = basePath + "getUserYqm.jsp";
				var dataJson = { 'u': u };
				// 异步加载数据。。。。。。。
				$mainServices.post(url, dataJson, false).success(function (JSON_list) {
					$scope.invitationCode = JSON_list.yqm;
					if ($mainServices.isNull($scope.invitationCode)) {
						$scope.invitationCodeShow = false;
					} else {
						$scope.invitationCodeShow = true;
						localStorage.setItem("invitationCode", $scope.invitationCode);
					}
				});
			} else {
				$scope.invitationCodeShow = false;
			}
			// } else {
			// 	$scope.invitationCodeShow = true;
			// }
			var myPopup = $ionicPopup.show({
				templateUrl: 'templates/mine/shareTemplate.html',
				scope: $scope,
				title: '扫码下载一元行官方app',
				buttons: [
					{ text: '关闭' }
				]
			});
			myPopup.then(function (res) { });

			$scope.WeixinAppShare = function (type) {
				$mainServices.WeixinAppShare(type, $scope.invitationCode);
				$timeout(function () {
					myPopup.close();
				}, 1000);
			}
		}
		// 下拉刷新
		$scope.doRefresh = function () {
			getIndexPublicSx(false); // 揭晓倒计时
			$scope.getIndexProTjSx("refresh"); // 推荐产品
			getIndexBannerSx(false); // 轮播图片
			getShareSx(false); // 分享二维码
			if ($rootScope.checkFlag == 0) {
				$rootScope.checkFlag = $factoryServices.hideOrShowAppContent();
				$factoryServices.firstCheckLogin();
			}
		};
		// 上拉加载更多
		$scope.loadMore = function () {
			$scope.getIndexProTjSx("more");
		};

		$scope.tabPoint(); // 打红点
		var isFirst = 1; // 标志位 暂时用来防止重复绑定$ionicView.beforeEnter事件
		$scope.$on('$stateChangeSuccess', function () {
			if ($location.path() != '/index/index') {
				$q.all([promisefour]).then(function (v) {
					$interval.cancel($scope.jjjx[0].daojishi);
					$interval.cancel($scope.jjjx[1].daojishi);
					$interval.cancel($scope.jjjx[2].daojishi);
					$interval.cancel($scope.jjjx[3].daojishi);
				});
				$interval.cancel(timer);
				$scope.animateFlag = true;
				document.removeEventListener('touchstart', touchStart, false);
				document.removeEventListener('touchmove', touchMove, false);
				document.removeEventListener('touchend', touchEnd, false);
			}
			if (isFirst == 1) {
				isFirst = 2;
				$scope.$on("$ionicView.beforeEnter", function () {
					intervalCancel();
					getIndexPublicSx(false);// 揭晓倒计时
					$scope.getIndexProTjSx("first");// 推荐产品
					getIndexBannerSx(false); // 轮播图片
					getShareSx(false); // 分享二维码
					$timeout(function () {
						$scope.animateFlag = false;
						animate();
					}, 1000);
					document.addEventListener('touchstart', touchStart, false);
					document.addEventListener('touchmove', touchMove, false);
					document.addEventListener('touchend', touchEnd, false);
					if ($rootScope.checkFlag == 0) {
						$rootScope.checkFlag = UserService.hideOrShowAppContent();
						$factoryServices.firstCheckLogin();
					} else {
						$factoryServices.getCardNum();
					}
					$scope.tabPoint(); // 打红点
					base = $controller('baseController', { $scope: $scope });
					var uid_local = localStorage.getItem("uid_local");
					if (!$mainServices.isNull(uid_local)) {
						var newbieArray = localStorage.getItem("newbieArray");
						var newbieFlag = true;//false不符合条件或者做过新手引导 true未做过新手引导
						if (newbieArray != '' && newbieArray != null) {
							newbieArray = JSON.parse(newbieArray);
							for (var i = 0; i < newbieArray.length; i++) {
								if (uid_local == newbieArray[i]) {
									newbieFlag = false;
									break;
								}
							}
						} else {
							newbieArray = [];
						}
						if (newbieFlag) {
							$mainServices.postNew(domain2 + "orderDetailPeople/sprogJudge.do", { userID: uid_local, platform: 2 }, false).success(function (subRetJson) {
								if (subRetJson.result == "success") {
									$timeout(function () {
										newbieArray.push(uid_local);
										localStorage.setItem("newbieArray", JSON.stringify(newbieArray));
										$('#diaIntr,#diaIntr1').show();
										var getTop = $("#iconNewbie")[0].getBoundingClientRect().top;
										if ($scope.width / 709 * 300 < getTop) {
											$('#diaIntr1').css({ 'left': $("#iconNewbie")[0].getBoundingClientRect().left - 25, 'top': getTop - 2 })
										} else {
											$('#diaIntr1').css({ 'left': $("#iconNewbie")[0].getBoundingClientRect().left - 25, 'top': $scope.width / 709 * 300 - 5 + getTop - 2 })
										}

									}, 1000);
								} else {
									newbieArray.push(uid_local);
								}
							});

						}
					}
				});
			}

		});

		// 带请求的揭晓倒计时赋值
		function getIndexPublicSx(isHide) {
			dfour = $q.defer();
			promisefour = dfour.promise;
			// 揭晓倒计时
			var url = basePath + "getProPublic.jsp";
			$mainServices.post(url, {}, isHide).success(function (JSON_list) {
				$scope.prodjslist = JSON_list;
				if ($scope.prodjslist.length > 0) {
					for (var i = 0; i < $scope.prodjslist.length; i++) {
						$scope.jjjx[i].ptitle = $scope.prodjslist[i].ptitle;
						$scope.jjjx[i].pic = $mainServices.getHttpOrlocalProPic($scope.prodjslist[i].pic);
						$scope.jjjx[i].pterm_pub = $scope.prodjslist[i].pterm;
						$scope.jjjx[i].pid_pub = $scope.prodjslist[i].pid;
						$scope.jjjx[i].publictimelast = $mainServices.getTimeNo_0($scope.prodjslist[i].publictimelast);//倒计时结束时间
						$scope.jjjx[i].nowtime = $scope.prodjslist[i].presentTime;
						$scope.jjjx[i].ptype = $scope.prodjslist[i].ptype;
						if ($scope.jjjx[i].ptype == '2') {
							$scope.jjjx[i].producturl = 'newbieDetail?type=1';
						} else {
							$scope.jjjx[i].producturl = 'newproductdetail?type=1';
						}
					}
					localStorage.setItem("indexAnnouncementData", JSON.stringify($scope.jjjx));
				}
				intervalCancel();
				dfour.resolve();
			}).error(function () {
				dfour.resolve();
			});
		}

		// 带请求的轮播图片
		function getIndexBannerSx(isHide) {
			if ($scope.bannerList.length == 0) {
				var url = basePath + "getBanner.jsp";
				$mainServices.post(url, {}, isHide).success(function (JSON_list) {
					if (JSON_list.length >= 2) {
						$scope.bannerListFlag = true;
						for (var i = 0; i < JSON_list.length; i++) {
							var title = JSON_list[i].title;
							var pic = JSON_list[i].pic;
							var link = JSON_list[i].linkapp;
							pic = $mainServices.getHttpOrlocalProPic(pic);
							$scope.bannerList.push({ title: title, pic: pic, link: link });
						}
						$ionicSlideBoxDelegate.update();
						localStorage.setItem("indexBannerData", JSON.stringify(JSON_list));
					} else {
						$scope.bannerListFlag = false;
					}
				});
			}

		}

		// 带请求的分享二维码
		function getShareSx(isHide) {
			if ($scope.app_ewm == "") {
				var url = basePath + "getShareInfo.jsp";
				$mainServices.post(url, { t: 5 }, isHide).success(function (JSON_list) {
					$scope.app_ewm = JSON_list[0].content;
				});
			}
		}

		selectRecentFive('first');
		$scope.arr = [];
		var delta = 0;
		var timer;
		$scope.gobalUrl = '';
		$scope.animateFlag = false;
		$scope.gobalLink = function () {
			if ($scope.gobalUrl != '') {
				skip($scope.gobalUrl);
			}
		}
		var lmW = $('.loop-m').width();
		// 请求小喇叭轮播
		function selectRecentFive(flag) {
			$mainServices.postNew(domain2 + "productTerm/selectRecentFive.do", { userID: u, platform: 2 }, false).success(function (subRetJson) {
				if (subRetJson.ret == "success") {
					for (var i = 0; i < subRetJson.data.length; i++) {
						$scope.arr.push({ pid: subRetJson.data[i].pid, pterm: subRetJson.data[i].pterm, ptitle: subRetJson.data[i].ptitle, num: subRetJson.data[i].num, nickname: subRetJson.data[i].nickname, ptype: subRetJson.data[i].ptype });
					}
					if ($scope.animateFlag) {
						return;
					}
					if (flag == 'first') {
						$timeout(function () {
							loadRecentFive();
						}, 1000);
					} else {
						push();
					}


				}
			}).error(function () {
				$timeout(function () {
					if ($scope.animateFlag) {
						return;
					}
					selectRecentFive(flag);
				}, 3000);
			});
		}
		function loadRecentFive() {
			angular.element('.loop-m').append('<p>恭喜<span>' + $scope.arr[0].nickname + '</span>参与' + $scope.arr[0].num + '人次获得了' + $scope.arr[0].ptitle + '</p>');
			if ($scope.arr[0].ptype == '2') {
				$scope.gobalUrl = '#/index/newbieDetail?type=2&pid=' + $scope.arr[0].pid + '&pterm=' + $scope.arr[0].pterm;
			} else {
				$scope.gobalUrl = '#/index/newproductdetail?type=2&pid=' + $scope.arr[0].pid + '&pterm=' + $scope.arr[0].pterm;
			}

			animate();
		}
		var rolling = function () {
			delta = delta - 2;
			$('.loop-m p').eq(0).css('left', delta);
			if ($('.loop-m p').eq(0).width() + delta < lmW) {
				$interval.cancel(timer);
				push();
			}
		}
		function push() {
			$timeout(function () {
				if ($scope.animateFlag) {
					return;
				}
				if ($scope.arr.length <= 1) {
					selectRecentFive();
					return;
				}
				$('.loop-m').append('<p style="top:24px;">恭喜<span>' + $scope.arr[1].nickname + '</span>参与' + $scope.arr[1].num + '人次获得了' + $scope.arr[1].ptitle + '</p>');
				$('.loop-m p').eq(1).animate({ top: '0px' }, 1000);
				$('.loop-m p').eq(0).animate({ top: '-48px' }, 1000, function () {
					if ($scope.arr[1].ptype == '2') {
						$scope.gobalUrl = '#/index/newbieDetail?type=2&pid=' + $scope.arr[1].pid + '&pterm=' + $scope.arr[1].pterm;
					} else {
						$scope.gobalUrl = '#/index/newproductdetail?type=2&pid=' + $scope.arr[1].pid + '&pterm=' + $scope.arr[1].pterm;
					}
					$('.loop-m p').eq(0).remove();
					$scope.arr.splice(0, 1);
					animate();
				});
			}, 3000);
		}
		function animate() {
			$timeout(function () {
				if ($scope.animateFlag) {
					return;
				}
				$('.loop-m p').eq(0).css('left', '0px');
				delta = 0;
				$timeout(function () {
					if ($('.loop-m p').eq(0).width() > lmW) {
						$interval.cancel(timer);
						timer = $interval(rolling, 80);//设置定时器
					} else {
						push();
					}
				}, 1000);
			}, 3000);
		}
		// 添加到购物车
		$scope.addCart = function (pid, num, src, event, index) {
			event.preventDefault();
			var u = localStorage.getItem("uid_local");
			if (u == null || u == '') {
				localStorage.setItem("backUrlLogin", "#" + $ionicHistory.currentView().url);
				$location.path("/" + $scope.host + "/log");
				return;
			}
			if (num == null || num == '' || num == 0) {
				num = 1;
			}
			var listAry = [{ 'pid': pid, 'num': num, 'selected': 1 }];
			var url = basePath + "getUserShoppingRecord.jsp";
			var dataJson = { 'platform': 2, 'u': u, 'list': JSON.stringify(listAry) };
			var flyer = angular.element('<img class="u-flyer" src="' + src + '">');
			event = event.toElement;
			var imgobj = angular.element(event).parent().parent().parent().find('.m-tj-pic img');
			var d1 = $q.defer();
			var promise1 = d1.promise;
			var d2 = $q.defer();
			var promise2 = d2.promise;
			flyer.fly({
				start: {
					left: imgobj.offset().left,
					top: imgobj.offset().top
				},
				end: {
					left: $scope.left,
					top: $scope.top,
					width: 0,
					height: 0
				},
				onEnd: function () {
					this.destory();
					d1.resolve();
				}
			});
			if ($scope.rqtjList[index].flag == 1 || $scope.rqtjList[index].flag == '1') {
				$mainServices.post(url, dataJson, false).success(function (jsonObj) {
					if (jsonObj != null && jsonObj != undefined || jsonObj != "") {
						if (jsonObj.judge != "ok") {
							alert("操作失败，请稍后重试");
							d2.reject();
						} else {
							$scope.rqtjList[index].flag = 2;
							var u = localStorage.getItem("uid_local");
							if (u != null && u != '') {
								var dataJson = { 'u': u };
								var url = basePath + "getCartNum.jsp";
								// 异步加载数据。。。。。。。。
								$mainServices.post(url, dataJson, false).success(function (num) {
									var reg = /^[0-9]*$/;
									if (!reg.test(num)) {
										d2.resolve(num);
									}
								});
							}
						}
					} else {
						d2.reject();
					}
				});
			}
			$q.all([promise1, promise2]).then(function (v) {
				if (v[1] == 0) {
					$rootScope.cartNumber = 0;
				} else {
					$rootScope.cartNumber = v[1];
				}
			});
		};


	}

	ctrl.$inject = ['$scope', '$mainServices', '$factoryServices', '$controller', '$ionicSlideBoxDelegate', '$timeout', '$interval', '$ionicScrollDelegate', '$ionicPopup', '$ionicHistory', '$location', '$q', '$rootScope', '$ionicTabsDelegate', '$ionicActionSheet'];
	return ctrl;

});