define(function () {  
    'use strict';  
    function ctrl($scope,$controller,$mainServices,$timeout,$ionicHistory,$stateParams) {
    	
    	var base = $controller('baseController', { $scope: $scope });
    	var clickFlag = false;
    	
    	$scope.shaidanSubmit = function() {
    		if(clickFlag){
    			return;
    		}
            var id = $stateParams.id;
            $("#sdid").val(id);

            var u = localStorage.getItem("uid_local");
            if (u != null || u != "" || typeof(u) != "undefined") {
                $("#sdu").val(u);
                var title = $("#sdtitle").val();
                var content = $("#sdcontent").val();

                var pics_length = form_pics.length; //已选择上传图片数量 
                if (title == "") {
                    alert("请输入标题。");
                    return;
                }
                if (title.length > 20) {
                    alert("标题输入过长。");
                    return;
                }

                if (content == "") {
                    alert("请输入内容。");
                    return;
                }
                if (content.length > 100) {
                    alert("内容输入过长。");
                    return;
                }

                if (pics_length == 0) {
                    alert("请选择图片");
                    return;
                }
                $mainServices.showLoading();
                $("#sdbtnSub").html("提交中...");
                clickFlag = true;
                var url = basePath + "drawshare.jsp";
                var formData = new FormData($("#shaidanForm")[0]);
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
                        var jsonRet = data; // 成功
                        if (jsonRet != null) {
                            var code = jsonRet.code;
                            if (code == 200) {
                                alert("提交成功。");
                                $timeout(function () {
                                	$ionicHistory.goBack(-1);
                                }, 2000);
                            } else {
                                if(code == 900){
                                    alert(jsonRet.message);
                                } else if(code == 403){
                                    alert("您的晒单正在审核中,请勿重复提交。");
                                }else{
                                    alert("提交失败，请稍后重试。");
                                }
                                clickFlag = false;
                                $("#sdbtnSub").html("提交");
                            }
                        }
                        $mainServices.hideLoading();
                        clickFlag = false;
                        $("#sdbtnSub").html("提交");
                    },
                    error:function(){
                        $mainServices.hideLoading();
                        clickFlag = false;
                        $("#sdbtnSub").html("提交");
                    }
                });


            }
        }
    	
    	$scope.$on("$destroy",function(){
            form_pics.length = 0;
        });
    }  
  
    ctrl.$inject = ['$scope', '$controller','$mainServices','$timeout','$ionicHistory','$stateParams'];
    return ctrl;  
      
}); 