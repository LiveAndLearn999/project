define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$stateParams,$ionicScrollDelegate,$timeout,$ionicPopup,$ionicModal) {  
    	$scope.curJson = {};
    	$scope.datas = []; // 评论信息数组
    	$scope.postData = {content:""}; // 评论文本框
		$scope.isBuyGet = true; // 判断是否是购买还是活动晒单
		$scope.isAuditedShow = false; // 判断是否显示分享评论一栏
      	var base = $controller('baseController', { $scope: $scope });
      	$scope.canLoadMore.comment = false;
      	$scope.canLoadMore.commPageMore = 0;
      	
      	// 分享回调
        window.shareCallBackFn = function(type){
        	showTankuangOneBtn('分享成功！');
            $("#querenBtnRollback").click(function () {
                $("#tankuangIdDiv").remove();
                $(".reveal-modal-bg").remove();
            });
        }
      	
      	// 获取晒单详情
		function getShareOrderDetail(){
			var id = $stateParams.id+'';
		    if(id == null || id == "" || typeof(id) == "undefined"){
		    	return;
		    }
		    var u = localStorage.getItem("uid_local");
		    var dataJson = {'uid':u,'id':id};
		    // 异步加载数据
		    $mainServices.post(basePath + "getShareOrderDetail.jsp",dataJson,true).success(function(jsonObj){
				if(jsonObj!=null && jsonObj!="" && typeof(jsonObj) != "undefined"){
					var uid = jsonObj.uid;
					var pid = jsonObj.pid;
					var pterm = jsonObj.pterm;
					var ptitle = jsonObj.ptitle; //商品名称
					var title = jsonObj.title; // 晒单标题
					var pics = jsonObj.pics;
					var picsArray = $mainServices.splitStr(pics,",");
					var pic0 = basePath + picsArray[0];
					var content = jsonObj.content;
					var intime = jsonObj.intime;
					intime = intime.substring(0,16);
					var headpic = jsonObj.headpic;
					headpic = $mainServices.getHttpOrlocalHeadPic(headpic);
					var nickname = jsonObj.nickname;

					var auditing = jsonObj.auditing; // 0待审核 1审核通过
					if(auditing == '0'){
						$scope.isAuditedShow = false;
					} else {
						$scope.isAuditedShow = true;
					}
					var num_clicklike = jsonObj.num_clicklike;
					var num_comment = jsonObj.num_comment;
					var num = jsonObj.num;
					var typename = jsonObj.typename;

					var shareIntegral = jsonObj.vouchers; // 晒单赠送的红包
					if(shareIntegral == ''|| shareIntegral == '0' || auditing == '0'){
						var shareIntegralFlag = false;
					} else {
						var shareIntegralFlag = true;
					}

					// 查询是否已点赞
					var src = "img/icon_dz.png";
			        var recount_share = jsonObj.recount_share;
					if(recount_share > 0){
						src = "img/icon_dz_on.png";
					}
			        var href_mp = "#/"+ $scope.host +"/userIndex/"+uid;//用户详细
			        var tmp_pic = '';
			        for(var i=0;i<picsArray.length;i++){
			            tmp_pic += '<img src="'+domain3 + picsArray[i]+'" />';
			        }
			        if(pterm != ''){
						$scope.isBuyGet = true;
						$scope.curJson={id:id,remark:"一元行真的就花了"+num+"块钱，快来膜拜一下！",pic0:pic0,content:content,headpic:headpic,href_mp:href_mp,nickname:nickname,num:num,pterm:pterm,ptitle:ptitle,title:title,intime:intime,num_comment:num_comment,num_clickline:num_clicklike,plurl:'#/'+ $scope.host +'/comment?id='+id,shareSrc:src,tmp_pic:tmp_pic,shareIntegralFlag:shareIntegralFlag,shareIntegral:shareIntegral};
					} else {
						$scope.isBuyGet = false;
						$scope.curJson={id:id,remark:"一元行"+typename+"活动中啦，快来膜拜一下！",typename:typename,pic0:pic0,content:content,headpic:headpic,href_mp:href_mp,nickname:nickname,num:num,pterm:pterm,ptitle:ptitle,title:title,intime:intime,num_comment:num_comment,num_clickline:num_clicklike,plurl:'#/'+ $scope.host +'/comment?id='+id,shareSrc:src,tmp_pic:tmp_pic,shareIntegralFlag:shareIntegralFlag,shareIntegral:shareIntegral};
					}

				
				}
		    });
		
		}
		
		// 点赞
	    $scope.dianzan = function(id){
	      	var u = localStorage.getItem("uid_local");
	      	if(u == null || u == ""){
	        	alert("请先登录");
	        	return;
	      	}
	      	var src = angular.element("#dianzan").attr("src");
	      	if(src == "img/icon_dz_on.png"){
	        	alert("不能重复点赞");
	        	return;
	      	}
	      	var num_clicklike = angular.element("#num_clicklike").html();
		    var num_clicklike_int = parseInt(num_clicklike);
		    var url = basePath + "setDianzan.jsp";
		    var dataJson = {'u':u,'id':id};
		    $mainServices.post(url,dataJson,false).success(function(jsonRet){
		        if(jsonRet != null){
		          	var code = jsonRet.code;
		          	if(code == 200){
		            	angular.element("#num_clicklike").html(num_clicklike_int+1);
		            	angular.element("#dianzan").attr("src","img/icon_dz_on.png");
		          	} else {
		            	alert("网络异常，请稍后重试");
		          	}
		        }
		    });
	    };
		
		// 分享
		var myPopup = '';
	    $scope.showPopup = function(remark,content) {
	      	myPopup = $ionicPopup.show({
	        	templateUrl:'templates/index/shareTemplate.html',
	        	title: '分享给好友',
	        	scope: $scope,
	        	buttons: [
	          		{ text: '取消' }
	        	]
	      	});
	      	myPopup.then(function(res) {

	      	});
	
	      	$scope.WeixinShare=function(type){
	        	$mainServices.WeixinShare(type,remark,content);
	        	$timeout(function(){
	          		myPopup.close();
	        	},1000);
	      	}
	    };
	    
		// 初始化
		getShareOrderDetail();// 获取晒单详情
		
	    // 评论
	    $scope.toComment = function(id) {
	      	$scope.datas = [];
	      	$scope.commentid = id;
	      	$scope.postData.content = "";
	      	pl("first",id);//获取评论列表
	      	$scope.modal.show();
	    };
	    // 获取评论信息
	    function pl(more,id){
	      	var nowPageMore = $scope.canLoadMore.commPageMore;
	      	var toPage = 1;
	      	if(more == 'more'){
	        	toPage = (nowPageMore + 1);
	      	}
	      	var isHide = false;
		  	if(more == "first"){
		    	var isHide = true;
		  	}  
		  
	      	var url = basePath + "pl.jsp";
	      	var dataJson = {'toPage':toPage,'id':id};
	      	// 异步加载数据
	        $mainServices.post(url,dataJson,isHide).success(function(JSONObjRet){
	        	if(JSONObjRet == null || JSONObjRet == undefined || JSONObjRet == ""){
	        		return;
	        	}
	        	var JSON_list = JSONObjRet.prolist;
	        	var pageCount = parseInt(JSONObjRet.pageCount);
	        	var recount = parseInt(JSONObjRet.recount);
	        	$scope.canLoadMore.commPageMore = parseInt(JSONObjRet.showPage);
	
	        	if(recount <= 0){
	          		$scope.canLoadMore.comment = false;
	        	}
	        	if(JSON_list.length > 0){
	          		for(var i=0;i<JSON_list.length;i++){
			            var id = JSON_list[i].id;
			            var uid = JSON_list[i].uid;
			            var content = JSON_list[i].content;
			            var intime = JSON_list[i].intime;
			            intime = intime.substring(5,16);
			            // 查询会员信息
			            var headpic = JSON_list[i].headpic;
			            var nickname = JSON_list[i].nickname;
			            headpic = $mainServices.getHttpOrlocalHeadPic(headpic);
			            
			            var json = {uid:uid,headpic:headpic,nickname:nickname,content:content,intime:intime,userUrl:'#/'+$scope.host+'/userIndex/'+uid};
			            $scope.datas.push(json);
			        }
	        	}	
	        	if($scope.canLoadMore.commPageMore == pageCount || recount <= 0){
	          		$scope.canLoadMore.comment = false;
	        	} else {
	          		$ionicScrollDelegate.resize();
	          		$timeout(function(){
	            		$scope.canLoadMore.comment=true;
	          		},500);
	        	}
	        	if(more == "more"){
	        		$scope.$broadcast('scroll.infiniteScrollComplete');
	        	} else if(more != "first"){
	        		$scope.$broadcast('scroll.refreshComplete');
	        	}
	      	});
	    }
	    
	    // 提交评论
	    $scope.plSubmit = function(id){
	      	var u = localStorage.getItem("uid_local");
	      	if(u == null || u == ""){
	        	alert("请先登录");
	        	return;
	      	}
	
	      	// 验证参数
	      	if($scope.postData.content == ""){
	        	alert("内容不能为空");
	        	return;
	      	}
	      	var url = basePath + "plSubmit.jsp";
	      	var dataJson = {'u':u,'id':id,'pl_content':$scope.postData.content};
	      	$mainServices.post(url,dataJson,true).success(function(jsonRet){
	        	if(jsonRet != null){
	          		var code = jsonRet.code;
	          		if(code == 200){
	            		// 清空内容
	            		$scope.postData.content = "";
	            		// 重新加载pl内容
	            		$scope.datas = [];
	            		pl("",id);
	            		// 修改评论
	            		$scope.curJson.num_comment++;
	          		} else {
	            		alert(jsonRet.message);
	          		}
	        	}
	      	});
	    };
	    
	    $ionicModal.fromTemplateUrl('templates/index/comment.html', {
	      	scope: $scope,
	      	animation: 'slide-in-up'
	    }).then(function(modal) {
	      	$scope.modal = modal;
	    });
	    
	    $scope.closeModal = function() {
	      	$scope.modal.hide();
	    };
	    
	    $scope.doRefreshComment=function(){
	      	$scope.datas = [];
	      	pl("",$scope.commentid); //获取评论列表
	    };
	    $scope.loadMoreComment=function(){
      		pl("more",$scope.commentid); //获取评论列表
    	};
    	
    	// 当我们用完模型时，清除它
	    $scope.$on('$destroy', function() {
	      	$scope.modal.remove();
	      	if(myPopup != ''){
	        	myPopup.close();
	      	}
	    });
	    
    }  
  	
    ctrl.$inject = ['$scope','$controller','$mainServices','$stateParams','$ionicScrollDelegate','$timeout','$ionicPopup','$ionicModal'];  
    return ctrl;  
      
}); 