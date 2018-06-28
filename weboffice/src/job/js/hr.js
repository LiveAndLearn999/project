$(function(){
	var Fun = {
		init : function(){
			var regFlag = false, findFlag = false;
			
			//鎵嬫満鍙风爜楠岃瘉(娉ㄥ唽鏃�)
		    $(".checkRegPhoneNum").on("blur",function(){
		    	var phoneNum = $.trim($(this).val());
		    	if( isNaN(phoneNum) || phoneNum.length < 11 ){
		    		Fun.msgFun("#phoneNumMsg","璇疯緭鍏�11浣嶆墜鏈哄彿鐮�");
		    	}else{
		    		$.ajax({
		    			url : "http://my.7road.com/website7road/user/checkPhoneNum.action",
		    			type : "GET",
		    			dataType : "jsonp",
		    			data : {"phoneNum":phoneNum},
		    			success : function(data){
			    			if(data.msg.code == 200){
			    				$("#phoneNumMsg").html("");
			    				regFlag = true;
			    			}else{
				            	Fun.msgFun("#phoneNumMsg",data.msg.message);
				            	regFlag = false;
				            }
			        	}
			        });
		    	}
		    });

		    //鎵嬫満鍙风爜楠岃瘉(鎵惧洖瀵嗙爜鏃�)
		    $(".checkFindPasswordPhoneNum").on("blur",function(){
		    	var phoneNum = $.trim($(this).val());
		    	if( isNaN(phoneNum) || phoneNum.length < 11 ){
		    		Fun.msgFun("#phoneNumMsg","璇疯緭鍏�11浣嶆墜鏈哄彿鐮�");
		    	}else{
		    		$.ajax({
		    			url : "http://my.7road.com/website7road/user/checkPhoneNum.action",
		    			type : "GET",
		    			dataType : "jsonp",
		    			data : {"phoneNum":phoneNum},
		    			success : function(data){
			    			if(data.msg.code == 200){
			    				Fun.msgFun("#phoneNumMsg","璇ユ墜鏈哄彿鐮佽繕鏈敞鍐�");
			    				findFlag = false;
			    			}else{
				            	$("#phoneNumMsg").html("");
				            	findFlag = true;
				            }
			        	}
			        });
		    	}
		    });

		    //鍥剧墖楠岃瘉鐮侀獙璇�
		    $("#validCode").on("blur",function(){
		    	var validCode = $.trim($("#validCode").val());
		    	if( validCode.length < 4 ){
		    		Fun.msgFun("#validCodeMsg","璇疯緭鍏�4浣嶅浘鐗囬獙璇佺爜");
		    	}else{
		    		$("#validCodeMsg").html("");
		    	}
		    });

		    //鍥剧墖楠岃瘉鐮佹洿鏂�
		    $(".img-valid-code").on("click",function(){
			    $("#imgValidCode").attr("src","http://my.7road.com/website7road/captcha.do?t=" + new Date().getTime());
			});

		    //鑾峰彇鐭俊楠岃瘉鐮�
		    $("#getPhoneVerificationCode").live("click",function(){
		    	var phoneNum = $.trim($("#phoneNum").val()), validCode = $.trim($("#validCode").val()), sendCodeType = $(this).attr("sendCodeType");
		    	if( isNaN(phoneNum) || phoneNum.length < 11 ){
		    		Fun.msgFun("#phoneNumMsg","璇疯緭鍏�11浣嶆墜鏈哄彿鐮�");
		    	}else if( sendCodeType == "register" && regFlag == false ){
		    		Fun.msgFun("#phoneNumMsg","鎵嬫満鍙风爜宸茬粡琚敞鍐岃繃鎴栬緭鍏ヤ笉姝ｇ‘");
		    	}else if( sendCodeType == "findPass" && findFlag == false ){
		    		Fun.msgFun("#phoneNumMsg","鎵嬫満鍙风爜杩樻湭琚敞鍐�");
		    	}else if( validCode.length < 4 ){
		    		Fun.msgFun("#validCodeMsg","璇疯緭鍏�4浣嶅浘鐗囬獙璇佺爜");
		    	}else{
		    		$(this).html("姝ｅ湪鍙戦€佺煭淇￠獙璇佺爜");
				    $.ajax({
				    	url : "http://my.7road.com/website7road/user/sendPhoneCode.action",
				    	type : "GET",
		    			dataType : "jsonp",
		    			data : {"phoneNum":phoneNum,"validCode":validCode,"sendCodeType":sendCodeType},
		    			success : function(data){
		    				if(data.msg.code == 200){
								$("#validCodeMsg").html("");
								Fun.againGetPhoneVerificationCode(120);
							}else{
				            	Fun.msgFun("#validCodeMsg",data.msg.message);
				            	$("#getPhoneVerificationCode").html("鑾峰彇鐭俊楠岃瘉鐮�");
				            	$(".img-valid-code").click();
				            }

		    			}
				    });
			    }
			});

			//鐭俊楠岃瘉鐮侀獙璇�
		    $("#phoneCode").on("blur",function(){
		    	var phoneCode = $.trim($("#phoneCode").val());
		    	if( isNaN(phoneCode) || phoneCode.length < 4 ){
		    		Fun.msgFun("#phoneCodeMsg","璇疯緭鍏�4浣嶆暟瀛楃煭淇￠獙璇佺爜");
		    	}else{
		    		$("#phoneCodeMsg").html("");
		    	}
		    });

			//娉ㄥ唽瀵嗙爜楠岃瘉
		    $("#password").on("blur",function(){
		    	var password = $.trim($("#password").val());
		    	if( password.length < 6 ){
		    		Fun.msgFun("#passwordMsg","瀵嗙爜涓嶈兘灏戜簬6涓瓧绗�");
		    	}else{
		    		$("#passwordMsg").html("");
		    	}
		    });

		    //娉ㄥ唽纭瀵嗙爜楠岃瘉
		    $("#confirmPassword").on("blur",function(){
		    	var password = $.trim($("#password").val()), confirmPassword = $.trim($("#confirmPassword").val());
		    	if( confirmPassword != password ){
		    		Fun.msgFun("#confirmPasswordMsg","涓ゆ杈撳叆瀵嗙爜涓嶄竴鑷�");
		    	}else{
		    		$("#confirmPasswordMsg").html("");
		    	}
		    });

		    //娉ㄥ唽纭瀵嗙爜缁戝畾鍥炶溅
		    $("#confirmPassword").on("keyup",function(e){
		    	if( e.keyCode == 13 ){
					$("#regBtn").click();
				}
		    });

		    //娉ㄥ唽
		    $("#regBtn").on("click",function(){
		    	var phoneNum = $.trim($("#phoneNum").val()), phoneCode = $.trim($("#phoneCode").val()), 
		    		password = $.trim($("#password").val()), confirmPassword = $.trim($("#confirmPassword").val());
		    	if( isNaN(phoneNum) || phoneNum.length < 11 ){
		    		Fun.msgFun("#phoneNumMsg","璇疯緭鍏�11浣嶆墜鏈哄彿鐮�");
		    	}else if( isNaN(phoneCode) || phoneCode.length < 4 ){
		    		Fun.msgFun("#phoneCodeMsg","璇疯緭鍏�4浣嶆暟瀛楃煭淇￠獙璇佺爜");
		    	}else if( password.length < 6 ){
		    		Fun.msgFun("#passwordMsg","瀵嗙爜涓嶈兘灏戜簬6涓瓧绗�");
		    	}else if( confirmPassword != password ){
		    		Fun.msgFun("#confirmPasswordMsg","涓ゆ杈撳叆瀵嗙爜涓嶄竴鑷�");
		    	}else{
		    		if( regFlag ){
					    $.ajax({
					        url : "http://my.7road.com/website7road/user/register.action",
					        type : "GET",
			    			dataType : "jsonp",
			    			data : { "phoneNum" : phoneNum, "phoneCode" : phoneCode, "password" : password },
			    			success : function(data){
			    				if(data.msg.code == 200){
						        	window.location.href = "http://hr.7road.com/center/reg2.html";
						        }else{
						        	Fun.msgFun("#phoneCodeMsg",data.msg.message);
						        }
			    			}
					        
					    });
				    }
			    }
			});

			//娉ㄩ攢
			$(".logout").on("click",function(){
				Fun.logout();
			});

			//鐧诲綍鎵嬫満鍙风爜楠岃瘉
			$("#loginPhoneNum").on("blur",function(){
				var loginPhoneNum = $.trim($("#loginPhoneNum").val());
				if( isNaN(loginPhoneNum) || loginPhoneNum.length < 11 ){
		    		Fun.msgFun("#loginPhoneNumMsg","璇疯緭鍏�11浣嶆墜鏈哄彿鐮�");
		    	}else{
		    		$("#loginPhoneNumMsg").html("");
		    	}
			});

			//鐧诲綍Tab鍒囨崲閿�
			$("#loginPhoneNum").on("keyup",function(event){
				if( event.keyCode == 9 ){
					$("#loginPassword").focus();
				}
			});

			//鐧诲綍瀵嗙爜妗嗙粦瀹氬洖杞︾櫥褰�
			$("#loginPassword").on("keyup",function(e){
				if( e.keyCode == 13 ){
					$("#loginBtn").click();
				}
			});

			//鐧诲綍瀵嗙爜楠岃瘉
			$("#loginPassword").on("blur",function(){
				var loginPassword = $.trim($("#loginPassword").val());
				if( loginPassword.length < 6 ){
		    		Fun.msgFun("#loginPasswordMsg","瀵嗙爜涓嶈兘灏戜簬6涓瓧绗�");
		    	}else{
		    		$("#loginPasswordMsg").html("");
		    	}
			});

			//鐧诲綍
			$("#loginBtn").on("click",function(){
				var loginPhoneNum = $.trim($("#loginPhoneNum").val()), loginPassword = $.trim($("#loginPassword").val());
				if( isNaN(loginPhoneNum) || loginPhoneNum.length < 11 ){
		    		Fun.msgFun("#loginPhoneNumMsg","璇疯緭鍏�11浣嶆墜鏈哄彿鐮�");
		    	}else if( loginPassword.length < 6 ){
		    		Fun.msgFun("#loginPasswordMsg","瀵嗙爜涓嶈兘灏戜簬6涓瓧绗�");
		    	}else{
					Fun.login();
				}
			});

		    //鍙戦€佹柊瀵嗙爜鍒版墜鏈轰笂
			$("#getPasswordBtn").on("click",function(){
				var phoneNum = $.trim($("#phoneNum").val()), phoneCode = $.trim($("#phoneCode").val());
				if( isNaN(phoneNum) || phoneNum.length < 11 ){
		    		Fun.msgFun("#phoneNumMsg","璇疯緭鍏�11浣嶆墜鏈哄彿鐮�");
		    	}else if( isNaN(phoneCode) || phoneCode.length < 4 ){
		    		Fun.msgFun("#phoneCodeMsg","璇疯緭鍏�4浣嶆暟瀛楃煭淇￠獙璇佺爜");
		    	}else if( findFlag ){
			    	Fun.getPassWord( phoneNum, phoneCode );
			    }
			});

			//鎵嬫満鍙风爜楠岃瘉(閲嶇疆瀵嗙爜)
			$("#resetPhoneNum").on("blur",function(){
				var resetPhoneNum = $.trim($("#resetPhoneNum").val());
				if( isNaN(resetPhoneNum) || resetPhoneNum.length < 11 ){
		    		Fun.msgFun("#resetPhoneNumMsg","璇疯緭鍏�11浣嶆墜鏈哄彿鐮�");
		    	}else{
		    		$("#resetPhoneNumMsg").html("");
		    	}
			});

			//褰撳墠瀵嗙爜楠岃瘉(閲嶇疆瀵嗙爜)
			$("#resetPassword").on("blur",function(){
				var resetPassword = $.trim($("#resetPassword").val());
				if( resetPassword.length < 6 ){
		    		Fun.msgFun("#resetPasswordMsg","褰撳墠瀵嗙爜涓嶈兘灏戜簬6涓瓧绗�");
		    	}else{
		    		$("#resetPasswordMsg").html("");
		    	}
			});

			//鏂板瘑鐮侀獙璇�(閲嶇疆瀵嗙爜)
			$("#resetNewPassword").on("blur",function(){
				var resetNewPassword = $.trim($("#resetNewPassword").val());
				if( resetNewPassword.length < 6 ){
		    		Fun.msgFun("#resetNewPasswordMsg","鏂板瘑鐮佷笉鑳藉皯浜�6涓瓧绗�");
		    	}else{
		    		$("#resetNewPasswordMsg").html("");
		    	}
			});

			//鏂板瘑鐮佺‘璁ら獙璇�(閲嶇疆瀵嗙爜)
			$("#resetConfirmNewPassword").on("blur",function(){
				var resetNewPassword = $.trim($("#resetNewPassword").val()), resetConfirmNewPassword = $.trim($("#resetConfirmNewPassword").val());
				if( resetNewPassword != resetConfirmNewPassword ){
		    		Fun.msgFun("#resetConfirmNewPasswordMsg","涓ゆ杈撳叆瀵嗙爜涓嶄竴鑷�");
		    	}else{
		    		$("#resetConfirmNewPasswordMsg").html("");
		    	}
			});

			//閲嶇疆瀵嗙爜
			$("#resetPasswordBtn").on("click",function(){
				var resetPhoneNum = $.trim($("#resetPhoneNum").val()), resetPassword = $.trim($("#resetPassword").val()),
					resetNewPassword = $.trim($("#resetNewPassword").val()), resetConfirmNewPassword = $.trim($("#resetConfirmNewPassword").val());
				if( isNaN(resetPhoneNum) || resetPhoneNum.length < 11 ){
		    		Fun.msgFun("#resetPhoneNumMsg","璇疯緭鍏�11浣嶆墜鏈哄彿鐮�");
		    	}else if( resetPassword.length < 6 ){
		    		Fun.msgFun("#resetPasswordMsg","褰撳墠瀵嗙爜涓嶈兘灏戜簬6涓瓧绗�");
		    	}else if( resetNewPassword.length < 6 ){
		    		Fun.msgFun("#resetNewPasswordMsg","鏂板瘑鐮佷笉鑳藉皯浜�6涓瓧绗�");
		    	}else if(resetNewPassword != resetConfirmNewPassword){
		    		Fun.msgFun("#resetConfirmNewPasswordMsg","涓ゆ杈撳叆瀵嗙爜涓嶄竴鑷�");
		    	}else{
			    	Fun.resetPassWord( resetPhoneNum, resetPassword, resetNewPassword );
			    }
			});

			//閲嶇疆瀵嗙爜妗嗙粦瀹氬洖杞�
			$("#resetConfirmNewPassword").on("keyup",function(e){
				if(e.keyCode == 13){
					$("#resetPasswordBtn").click();
				}
			});

			//淇濆瓨鍩烘湰淇℃伅
			$(".basic-info-save-btn").on("click",function(){
				var realNameTest = /^[\u4e00-\u9fa5]+$/i;
				var emailTest = /\w+[@]{1}\w+[.]\w+/;
				var realName = $.trim($("#modifyRealName").val()), gender = $("input[name='modifySex']:checked").val(), phoneNum = $("#modifyUsername").val(),
					educationDegree = $("#modifyEducation").val(), schoolName = $.trim($("#modifySchool").val()), emailAddr = $.trim($("#modifyEmail").val()), 
					marryStatu = $("#modifyMarry").val(), englishDegree = $("#modifyEnglishDegree").val(), workYear = $("#modifyWorkYear").val(), 
					majorName = $.trim($("#modifyProfessional").val()), briefIntroduction = $("#modifyProfile").val();
				var len = encodeURI(realName+gender+phoneNum+educationDegree+schoolName+emailAddr+marryStatu+englishDegree+workYear+majorName+briefIntroduction).length + 310;
				/*encodeURI("http://my.7road.com/website7road/user/saveResume.action?callback=info&resume.realName=&resume.gender=&resume.phoneNum=
				&resume.educationDegree=&resume.schoolName=&resume.emailAddr=&resume.marryStatu=&resume.englishDegree=&resume.workYear=&resume.majorName=
				&resume.briefIntroduction=&type=info&_=1414743008071").length = 308*/
				if( !realName || !realNameTest.test(realName) || realName.length < 2 ){
					alert("濮撳悕涓�2-8涓眽瀛�");
				}else if( !educationDegree || educationDegree == "select" ){
					alert("璇烽€夋嫨瀛﹀巻");
				}else if( !schoolName ){
					alert("璇峰～鍐欐瘯涓氶櫌鏍�");
				}else if( !emailAddr ){
					alert("璇峰～鍐橢mail");
				}else if( !emailTest.test(emailAddr) ){
					alert("Email杈撳叆涓嶆纭�");
				}else if( !marryStatu || marryStatu == "select" ){
					alert("璇烽€夋嫨濠氬Щ鐘跺喌");
				}else if( !englishDegree || englishDegree == "select" ){
					alert("璇烽€夋嫨鑻辫绛夌骇");
				}else if( !workYear || workYear == "select" ){
					alert("璇烽€夋嫨宸ヤ綔骞撮檺");
				}else if( !majorName ){
					alert("璇峰～鍐欎笓涓�");
				}else if( !$.trim(briefIntroduction) ){
					alert("璇峰～鍐欎釜浜虹畝浠�");
				}else{
					Fun.submitInfo( realName, gender, phoneNum, educationDegree, schoolName, emailAddr, marryStatu, englishDegree, workYear, majorName, briefIntroduction );
				}
			});

			//淇敼鍩烘湰淇℃伅
	        $(".basic-info-modify-btn").on("click",function(){
	            $(".basic-info-show").hide();
	            $(".basic-info-modify").show();
	        });
	        

	        //鍙栨秷娣诲姞宸ヤ綔缁忛獙
	        $("#cancelAddWork").live("click",function(){
	        	$(this).parent().parent().parent().remove();
	        	$(".add-work").parent().show();
	        });
	        //鍙栨秷娣诲姞椤圭洰缁忛獙
	        $("#cancelAddProject").live("click",function(){
	        	$(this).parent().parent().parent().remove();
	        	$(".add-project").parent().show();
	        });

	        //娣诲姞宸ヤ綔缁忛獙
	        $(".add-work").on("click",function(){
	        	$(this).parent().hide();
	        	appendBox('.work-list', $(".work-box").html());
	        });

	        //娣诲姞椤圭洰缁忛獙
	        $(".add-project").on("click",function(){
	        	$(this).parent().hide();
	        	appendBox('.project-list', $(".project-box").html());
	        });

	        var appendBox = function(container, tags){ 
	            $(container).append(tags);
	        }
	        
			//鍒犻櫎宸ヤ綔缁忛獙銆侀」鐩粡楠�
			$(".remove").live("click",function(){
                Fun.remove($(this).attr("id"),$(this).attr("type"));
            });
            //鏄剧ず淇敼椤圭洰缁忛獙
            $(".project-modify-btn").live("click",function(){
            	$(this).parents(".project-show-box").hide();
            	var id = $(this).attr("id");
            	var startDate = $(this).parents(".project-show-box").find(".startDate").html();
            	var endDate = $(this).parents(".project-show-box").find(".endDate").html();
            	var startDateYear = startDate.split("-")[0];
            	var startDateMonth = startDate.split("-")[1];
            	var endDateYear = endDate.split("-")[0];
            	var endDateMonth = endDate.split("-")[1];
            	var projectName = $(this).parents(".project-show-box").find(".showProjectName").html();
            	var projectPosition = $(this).parents(".project-show-box").find(".showProjectPosition").html();
            	var expContent = $(this).parents(".project-show-box").find(".showExpContent").attr("content");
            	$(this).parents(".project-show-box").next(".project-modify-box").append(
                    "<form id='project_" + id + "'>" +
                    	"<div class='remove-btn'><span class='remove' id='" + id + "' type='project'>鍒犻櫎</span></div>" +
                        "<table class='table-box' cellpadding='0' cellspacing='0'>" +
                            "<tr>" +
                                "<td class='w4'><span class='red'>*</span>鏃堕棿锛�</td>" +
                                "<td>" +
                                	"<select class='fromYear'>" +
                                        "<option value=''>骞�</option>" +
                                    "</select>" +
                                    "<select class='fromMonth'>" +
                                        "<option value=''>鏈�</option>" +
                                    "</select>" +
                                    "鍒�" +
                                    "<select class='toYear'>" +
                                        "<option value=''>骞�</option>" +
                                    "</select>" +
                                    "<select class='toMonth'>" +
                                        "<option value=''>鏈�</option>" +
                                    "</select>" +
                                "</td>" +
                                "<td align='right'><span class='btn-box project-save-btn' id='" + id + "'>淇濆瓨</span></td>" +
                            "</tr>" +
                        "</table>" +
                        "<table class='table-box' cellpadding='0' cellspacing='0'>" +
                            "<tr>" +
                                "<td class='w4'><span class='red'>*</span>椤圭洰鍚嶇О锛�</td>" +
                                "<td class='w5'>" +
                                    "<input class='input4 projectName' type='text' maxlength='30' value='" + projectName + "'>" +
                                "</td>" +
                                "<td class='w4'><span class='red'>*</span>椤圭洰鑱岃矗锛�</td>" +
                                "<td>" +
                                    "<input class='input4 projectPosition' type='text' maxlength='30' value='" + projectPosition + "'>" +
                                "</td>" +
                            "</tr>" +
                        "</table>" +
	                    "<table class='table-box' cellpadding='0' cellspacing='0'>" +
                            "<tr>" +
                                "<td class='w4'><span class='red'>*</span>椤圭洰鎻忚堪锛�</td>" +
                                "<td>" +
                                    "<textarea class='user-textarea expContent' maxlength='800'>" + expContent + "</textarea>" +
                                "</td>" +
                            "</tr>" +
                        "</table>" +
                        "<div class='line'></div>" +
                    "</form>"
            	);
				Fun.yearMonth(id,"project");
				$("#project_" + id).find(".fromYear").val(startDateYear);
				$("#project_" + id).find(".fromMonth").val(startDateMonth);
				$("#project_" + id).find(".toYear").val(endDateYear);
				$("#project_" + id).find(".toMonth").val(endDateMonth);
            });
            //鏄剧ず淇敼宸ヤ綔缁忛獙
            $(".work-modify-btn").live("click",function(){
            	$(this).parents(".work-show-box").hide();
            	var id = $(this).attr("id");
            	var startDate = $(this).parents(".work-show-box").find(".startDate").html();
            	var endDate = $(this).parents(".work-show-box").find(".endDate").html();
            	var startDateYear = startDate.split("-")[0];
            	var startDateMonth = startDate.split("-")[1];
            	var endDateYear = endDate.split("-")[0];
            	var endDateMonth = endDate.split("-")[1];
            	var companyName = $(this).parents(".work-show-box").find(".showCompanyName").html();
            	var workPosition = $(this).parents(".work-show-box").find(".showWorkPosition").html();
            	var expContent = $(this).parents(".work-show-box").find(".showExpContent").attr("content");
            	$(this).parents(".work-show-box").next(".work-modify-box").append(
                	"<form id='work_" + id + "'>" +
	                	"<div class='remove-btn'><span class='remove' id='" + id + "' type='work'>鍒犻櫎</span></div>" +
	                    "<table class='table-box' cellpadding='0' cellspacing='0'>" +
	                        "<tr>" +
	                            "<td class='w4'><span class='red'>*</span>鏃堕棿锛�</td>" +
	                            "<td>" +
	                            	"<select class='fromYear'>" +
	                                    "<option value=''>骞�</option>" +
	                                "</select>" +
	                                "<select class='fromMonth'>" +
	                                    "<option value=''>鏈�</option>" +
	                                "</select>" +
	                                "鍒�" +
	                                "<select class='toYear'>" +
	                                    "<option value=''>骞�</option>" +
	                                "</select>" +
	                                "<select class='toMonth'>" +
	                                    "<option value=''>鏈�</option>" +
	                                "</select>" +
	                            "</td>" +
	                            "<td align='right'><span class='btn-box work-save-btn' id='" + id + "'>淇濆瓨</span></td>" +
	                        "</tr>" +
	                    "</table>" +
	                    "<table class='table-box' cellpadding='0' cellspacing='0'>" +
	                        "<tr>" +
	                            "<td class='w4'><span class='red'>*</span>鍏徃鍚嶇О锛�</td>" +
	                            "<td class='w5'>" +
	                                "<input class='input4 companyName' type='text' maxlength='30' value='" + companyName + "'>" +
	                            "</td>" +
	                            "<td class='w4'><span class='red'>*</span>鑱屼綅锛�</td>" +
	                            "<td>" +
	                                "<input class='input4 workPosition' type='text' maxlength='30' value='" + workPosition + "'>" +
	                            "</td>" +
	                        "</tr>" +
	                    "</table>" +
	                    "<table class='table-box' cellpadding='0' cellspacing='0'>" +
	                        "<tr>" +
	                            "<td class='w4'><span class='red'>*</span>宸ヤ綔鎻忚堪锛�</td>" +
	                            "<td>" +
	                                "<textarea class='user-textarea workContent' maxlength='800'>" + expContent + "</textarea>" +
	                            "</td>" +
	                        "</tr>" +
	                    "</table>" +
	                    "<div class='line'></div>" +
                    "</form>"
            	);
				Fun.yearMonth(id,"work");
				$("#work_" + id).find(".fromYear").val(startDateYear);
				$("#work_" + id).find(".fromMonth").val(startDateMonth);
				$("#work_" + id).find(".toYear").val(endDateYear);
				$("#work_" + id).find(".toMonth").val(endDateMonth);
            });

            //淇濆瓨宸ヤ綔缁忛獙
			$(".work-save-btn").live("click",function(){
				var id = $(this).attr("id"),
					companyName = $.trim($("#work_" + id +" .companyName").val()), 
					workContent = $("#work_" + id +" .workContent").val(),
			    	workPosition = $.trim($("#work_" + id +" .workPosition").val()),
			    	startDateYear = $("#work_" + id +" .fromYear").val(),
			        startDateMonth = $("#work_" + id +" .fromMonth").val(),
			        endDateYear = $("#work_" + id +" .toYear").val();
			        endDateMonth = $("#work_" + id +" .toMonth").val(),

			        startDate = startDateYear + "-" + startDateMonth + "-1",
					endDate = endDateYear + "-" + endDateMonth + "-1";

				var len = encodeURI(id+startDate+endDate+companyName+workPosition+workContent).length + 181;
				/*encodeURI("http://my.7road.com/website7road/exp/save.action?callback=work&exp.expType=work&exp.id=
					&exp.expName=&exp.expContent=&exp.workPosition=&exp.startDate=&exp.endDate=&_=1414747409886").length = 179*/

			    if(!startDateYear){
			    	alert("璇峰～鍐欏紑濮嬪勾浠�");
			    }else if(!startDateMonth){
			    	alert("璇峰～鍐欏紑濮嬫湀浠�");
			    }else if(!endDateYear){
			    	alert("璇峰～鍐欑粨鏉熷勾浠�");
			    }else if(!endDateMonth){
			    	alert("璇峰～鍐欑粨鏉熸湀浠�");
			    }else if(!companyName){
			    	alert("璇峰～鍐欏叕鍙稿悕绉�");
			    }else if(!workPosition){
			    	alert("璇峰～鍐欒亴浣�");
			    }else if( !$.trim(workContent) ){
			    	alert("璇峰～鍐欏伐浣滄弿杩�");
			    }else{
			    	Fun.saveWork(id, startDate, endDate, companyName, workPosition, workContent);
			    }
			});

			//淇濆瓨椤圭洰缁忛獙
			$(".project-save-btn").live("click",function(){
				var id = $(this).attr("id"),
					projectName = $.trim($("#project_" + id +" .projectName").val()),
					projectPosition = $.trim($("#project_" + id +" .projectPosition").val()),
			        expContent = $("#project_" + id +" .expContent").val(),
			        startDateYear = $("#project_" + id + " .fromYear").val(),
			        startDateMonth = $("#project_" + id + " .fromMonth").val(),
			        endDateYear = $("#project_" + id + " .toYear").val(),
			        endDateMonth = $("#project_" + id + " .toMonth").val(),

			        startDate = startDateYear + "-" + startDateMonth + "-1",
					endDate = endDateYear + "-" + endDateMonth + "-1";

				var len = encodeURI(id+startDate+endDate+projectName+projectPosition+expContent).length + 187;
				/*encodeURI("http://my.7road.com/website7road/exp/save.action?callback=project&exp.expType=project&exp.id=
					&exp.expName=&exp.workPosition=&exp.expContent=&exp.startDate=&exp.endDate=&_=1414748304103").length = 185*/

			    if(!startDateYear){
			    	alert("璇峰～鍐欏紑濮嬪勾浠�");
			    }else if(!startDateMonth){
			    	alert("璇峰～鍐欏紑濮嬫湀浠�");
			    }else if(!endDateYear){
			    	alert("璇峰～鍐欑粨鏉熷勾浠�");
			    }else if(!endDateMonth){
			    	alert("璇峰～鍐欑粨鏉熸湀浠�");
			    }else if(!projectName){
			    	alert("璇峰～鍐欓」鐩悕绉�");
			    }else if(!projectPosition){
			    	alert("璇峰～鍐欓」鐩亴璐�");
			    }else if(!$.trim(expContent)){
			    	alert("璇峰～鍐欓」鐩弿杩�");
			    }else{
			    	Fun.saveProject(id, startDate, endDate, projectName, projectPosition, expContent);
			    }
			});

			//鎾ゆ秷鐢宠銆佹敹钘忚亴浣�
			$(".canceled").live("click",function(){
				Fun.removeApplyCollect($(this).attr("id"), $(this).attr("type"));
			});

			//鐢宠鑱屼綅
			$(".apply").live("click",function(){
				Fun.applyJobs($(this).attr("id"));
			});

			//鏀惰棌鑱屼綅
			$(".collect").live("click",function(){
				Fun.collectJobs($(this).attr("id"));
			});

			//浜哄湪涓冮亾鍚戜笅鎸夐挳
			$(".down").on("click",function(){
				var h = $(".work-environment-title h2").offset().top;
				$("html,body").animate({scrollTop: h}, 500);
			});

			//宸ヤ綔缁忛獙銆侀」鐩粡楠屾弿杩板瓧鏁伴檺鍒�
			$(".workContent,.expContent").live("keyup",function(){
				if( $(this).html().length > 800 ){
					$(this).html($(this).html().substring(0,799));
				}
			});

			//涓汉绠€浠嬪瓧鏁伴檺鍒�
			$("#modifyProfile").live("keyup",function(){
				if( $(this).html().length > 400 ){
					$(this).html($(this).html().substring(0,399));
				}
			});

		},
		//鐧诲綍楠岃瘉
		checkLogin : function(){
	        $.ajax({
	        	url : "http://my.7road.com/website7road/user/checkLogin.action",
	        	type : "GET",
    			dataType : "jsonp",
    			success : function(data){
    				var pathname = window.location.pathname;
		            if(data.msg.success){
		                if(window.location.href.indexOf("url") > -1){
		                	window.location.href = window.location.href.split("url=")[1];
		                }else if(pathname == "/center/login.html" || pathname == "/center/reg.html" || pathname == "/center/reg1.html"){
		                	window.location.href = "http://hr.7road.com/center/resume.html";
		                }
		                //鑾峰彇绠€鍘嗗熀鏈俊鎭�
		                if( pathname == "/center/resume.html" || pathname == "/center/reg2.html" ){
		                	Fun.getResume();//鍩烘湰淇℃伅
		                	Fun.initTableList("work");//宸ヤ綔缁忛獙
							Fun.initTableList("project");//椤圭洰缁忛獙
		                }else if( pathname == "/center/applyRecord.html" ){
							Fun.getApplyCollect("apply");//鐢宠鑱屼綅璁板綍
						}else if( pathname == "/center/collectRecord.html" ){
							Fun.getApplyCollect("collect");//鏀惰棌鑱屼綅璁板綍
						}else if( pathname == "/center/resetPassword.html" ){
							$("#resetPhoneNum").val(data.msg.obj);
						}
		                
		            	$(".logout-status").hide();
		                $(".login-status").show().find(".username").html(data.msg.obj);
		            }else{
		            	if(pathname == "/center/resume.html" || pathname == "/center/applyRecord.html" || pathname == "/center/resetPassword.html" || pathname == "/center/collectRecord.html"){
		                	window.location.href = "http://hr.7road.com/center/login.html";
		                }
		                $(".login-status").hide().find(".username").html("");
		                $(".logout-status").show();
		            }
    			}
	        });
		},
		//娉ㄩ攢
		logout : function(){
			$.ajax({
				url : "http://my.7road.com/website7road/user/logout.action",
				type : "GET",
    			dataType : "jsonp",
    			success : function(data){
    				if(data.msg.code == 200){
						$(".login-status").hide().find(".username").html("");
		                $(".logout-status").show();
		                window.location.href = "http://hr.7road.com/center/login.html";
					}
    			}
	        });
		},
		//鐧诲綍
		login : function(){
		    $.ajax({
		    	url : "http://my.7road.com/website7road/user/login.action",
		    	type : "GET",
    			dataType : "jsonp",
    			data : {"phoneNum":$('#loginPhoneNum').val(),"password":$("#loginPassword").val()},
    			success : function(data){
    				if(data.msg.code == 200){
			    		Fun.checkLogin();
			    	}else{
			    		Fun.msgFun("#loginPasswordMsg",data.msg.message);
			    	}
    			}
		    });
		},
		//閿欒鎻愮ず
		msgFun : function(id,msgText){
			$(id).html("<span>" + msgText + "</span>");
		},
		//鎵惧洖瀵嗙爜
		getPassWord : function(phoneNum, phoneCode){
			$.ajax({
				url : "http://my.7road.com/website7road/user/sendPass.action",
				type : "GET",
    			dataType : "jsonp",
    			data : { "phoneNum" : phoneNum, "phoneCode" : phoneCode },
    			success : function(data){
    				if(data.msg.code == 200){
				    	$("#phoneCodeMsg").html("");
				    	alert(data.msg.message);
				    	window.location.href = "http://hr.7road.com/center/login.html";
				    }else{
				    	Fun.msgFun("#phoneCodeMsg",data.msg.message);
				    }
    			}
			});
		},
		//閲嶇疆瀵嗙爜
		resetPassWord : function( resetPhoneNum, resetPassword, resetNewPassword ){
			$.ajax({
				url : "http://my.7road.com/website7road/user/resetPassword.action",
				type : "GET",
    			dataType : "jsonp",
    			data : { "phoneNum" : resetPhoneNum, "password" : resetPassword, "newPassword" : resetNewPassword },
    			success : function(data){
    				if(data.msg.code == 200){
				    	alert(data.msg.message);
				    	Fun.logout();
				    }else{
				    	if(data.msg.message == "鍘熷瘑鐮侀敊璇�"){
				    		Fun.msgFun("#resetPasswordMsg",data.msg.message)
				    	}else{
				    		Fun.msgFun("#resetConfirmNewPasswordMsg",data.msg.message);
				    	}
				    }
    			}
			});
		},
		//鑾峰彇鍩烘湰淇℃伅
		getResume : function(){
			$.ajax({
				url : "http://my.7road.com/website7road/user/createResume.action",
				type : "GET",
    			dataType : "jsonp",
    			success : function(data){
			        if(data.message.success){
			        	//绠€鍘嗗睍绀�
			            $("#showUsername").html(data.message.obj.phoneNum);//鐢ㄦ埛鍚嶏紙鎵嬫満鍙风爜锛�
			            $("#showRealName").html(data.message.obj.realName);//濮撳悕
			            $("#showEmail").html(data.message.obj.emailAddr);//Email
			            $("#showSex").html(data.message.obj.genderName);//鎬у埆
			            if( data.message.obj.marryStatuName != "璇烽€夋嫨" ){
			            	$("#showMarry").html(data.message.obj.marryStatuName);//濠氬Щ鐘跺喌
			            }
			            $("#showProfessional").html(data.message.obj.majorName);//涓撲笟
			            if( data.message.obj.educationDegreeName != "璇烽€夋嫨" ){
			            	$("#showEducation").html(data.message.obj.educationDegreeName);//瀛﹀巻
			            }
			            $("#showSchool").html(data.message.obj.schoolName);//姣曚笟闄㈡牎
			            if( data.message.obj.workYearName != "璇烽€夋嫨" ){
			            	$("#showWorkYear").html(data.message.obj.workYearName);//宸ヤ綔骞撮檺
			            }
			            if( data.message.obj.englishDegreeName != "璇烽€夋嫨" ){
			            	$("#showEnglishDegree").html(data.message.obj.englishDegreeName);//鑻辫绛夌骇
			            }
			            if(data.message.obj.briefIntroduction){
			            	$("#showProfile").html(data.message.obj.briefIntroduction.replace(/\n/g,"<br>").replace(/\s/g,"&nbsp;"));//涓汉绠€浠�
			            }

			            //绠€鍘嗕慨鏀�
			            $("#modifyUsername").val(data.message.obj.phoneNum);//鐢ㄦ埛鍚嶏紙鎵嬫満鍙风爜锛�
			            $("#modifyRealName").val(data.message.obj.realName);//濮撳悕
			            $("#modifyEmail").val(data.message.obj.emailAddr);//Email
			            $("input[name='modifySex']").each(function(){//鎬у埆
			                if($(this).val() == data.message.obj.gender) {
			                    $(this).attr("checked", "checked");
			                }
			            });
			            $("#modifyMarry option").each(function(){//濠氬Щ鐘跺喌
			                if($(this).val() == data.message.obj.marryStatu){
			                    $(this).attr("selected", "selected");
			                }
			            });
			            $("#modifyProfessional").val(data.message.obj.majorName);//涓撲笟
			            $("#modifyEducation option").each(function(){//瀛﹀巻
			                if($(this).val() == data.message.obj.educationDegree){
			                    $(this).attr("selected", "selected");
			                }
			            });
			            $("#modifySchool").val(data.message.obj.schoolName);//姣曚笟闄㈡牎
			            $("#modifyWorkYear option").each(function(){//宸ヤ綔骞撮檺
			                if($(this).val() == data.message.obj.workYear){
			                    $(this).attr("selected", "selected");
			                }
			            });
			            $("#modifyEnglishDegree option").each(function(){//鑻辫绛夌骇
			                if($(this).val() == data.message.obj.englishDegree){
			                    $(this).attr("selected", "selected");
			                }
			            });
			            $("#modifyProfile").html(data.message.obj.briefIntroduction);//涓汉绠€浠�
			        }else{
			            window.location.href = "http://hr.7road.com/center/login.html";
			        }
		        }
		    });
		},
		//鍒犻櫎宸ヤ綔缁忛獙銆侀」鐩粡楠�
		remove : function(id, type){
		    $.ajax({
		    	url : "http://my.7road.com/website7road/exp/remove.action",
		    	type : "GET",
		    	dataType : "jsonp",
		    	data : {"exp.id": id},
		    	success : function(data){
		    		alert(data.message.message);
		    		if (data.message.success){
			            Fun.initTableList(type);
			        }
		    	}
		    });
		},
		//淇濆瓨鍩烘湰淇℃伅
		submitInfo : function( realName, gender, phoneNum, educationDegree, schoolName, emailAddr, marryStatu, englishDegree, workYear, majorName, briefIntroduction ){
			$.ajax({
				url : "http://hr.7road.com/website7road/user/saveResume.action",
				type : "POST",
				data : {
						'resume.realName':realName,'resume.gender':gender,'resume.phoneNum':phoneNum,
						'resume.educationDegree':educationDegree,'resume.schoolName':schoolName,'resume.emailAddr':emailAddr,
						'resume.marryStatu':marryStatu,'resume.englishDegree':englishDegree,'resume.workYear':workYear,
						'resume.majorName':majorName,'resume.briefIntroduction':briefIntroduction,'type':'info'
				},
				success : function(data){
					if(data.message.code == 200){
						$(".basic-info-modify").hide();
            			$(".basic-info-show").show();
						$("#showUsername").html(data.message.obj.phoneNum);//鐢ㄦ埛鍚嶏紙鎵嬫満鍙风爜锛�
			            $("#showRealName").html(data.message.obj.realName);//濮撳悕
			            $("#showEmail").html(data.message.obj.emailAddr);//Email
			            $("#showSex").html(data.message.obj.genderName);//鎬у埆
			            $("#showMarry").html(data.message.obj.marryStatuName);//濠氬Щ鐘跺喌
			            $("#showProfessional").html(data.message.obj.majorName);//涓撲笟
			            $("#showEducation").html(data.message.obj.educationDegreeName);//瀛﹀巻
			            $("#showSchool").html(data.message.obj.schoolName);//姣曚笟闄㈡牎
			            $("#showWorkYear").html(data.message.obj.workYearName);//宸ヤ綔骞撮檺
			            $("#showEnglishDegree").html(data.message.obj.englishDegreeName);//鑻辫绛夌骇
			            $("#showProfile").html(data.message.obj.briefIntroduction.replace(/\n/g,"<br>").replace(/\s/g,"&nbsp;"));//涓汉绠€浠�
					}
				}
			});
		},
		//鑾峰彇宸ヤ綔缁忛獙銆侀」鐩粡楠�
		initTableList : function(type){
		    $.ajax({
		    	url : "http://my.7road.com/website7road/exp/list.action",
		    	type : "GET",
		    	dataType : "jsonp",
		    	data : {"exp.expType": type},
		    	success : function(data){
			        if(data.message.obj == null || data.message.obj.length < 1) {
			        	if(type == 'work'){
			        		$(".work-list").empty().append("<div class='nothing-box'>杩樻病濉啓宸ヤ綔缁忛獙</div>");
			        		$(".add-work").text("娣诲姞宸ヤ綔缁忛獙");
			        	}else if(type == 'project'){
			        		$(".project-list").empty().append("<div class='nothing-box'>杩樻病濉啓椤圭洰缁忛獙</div>");
			        		$(".add-project").text("娣诲姞椤圭洰缁忛獙");
			        	}
			        }else{
			            if(type == 'work'){
			            	$(".work-list").empty();
			                $.each(data.message.obj, function (index, item){
			                	var startDate = item.startDate.split("-")[0] + "-" + item.startDate.split("-")[1],
			                		endDate = item.endDate.split("-")[0] + "-" + item.endDate.split("-")[1];
			                    $(".work-list").append(
			                    	"<div class='work-show-box'>"+
				                    	"<table class='table-box' cellpadding='0' cellspacing='0'>"+
		                                    "<tr>" +
		                                        "<td class='w4'>鏃堕棿锛�</td>" +
		                                        "<td><span class='startDate'>" + startDate + "</span> 鍒� <span class='endDate'>" + endDate + "</span></td>" +
		                                        "<td align='right'><span class='btn-box work-modify-btn' id='" + item.id + "'>淇敼</span></td>" +
		                                    "</tr>" +
			                            "</table>" +
			                            "<table class='table-box' cellpadding='0' cellspacing='0'>" +
		                                    "<tr>" +
		                                        "<td class='w4'>鍏徃鍚嶇О锛�</td>" +
		                                        "<td class='w5 showCompanyName'>" + item.expName + "</td>" +
		                                        "<td class='w4'>鑱屼綅锛�</td>" +
		                                        "<td class='showWorkPosition'>" + item.workPosition + "</td>" +
		                                    "</tr>" +
		                                "</table>" +
	                    				"<table class='table-box' cellpadding='0' cellspacing='0'>" +
		                                    "<tr>" +
		                                        "<td class='w4'>宸ヤ綔鎻忚堪锛�</td>" +
		                                        "<td class='showExpContent' content='" + item.expContent + "'>" + 
		                                        	item.expContent.replace(/\n/g,"<br>").replace(/\s/g,"&nbsp;") + 
		                                        "</td>" +
		                                    "</tr>" +
			                            "</table>" +
			                            "<div class='line'></div>" +
			                        "</div>" + 
			                        "<div class='work-modify-box'></div>"
			                    );
			                });
							$(".add-work").text("缁х画娣诲姞");
			            }else if(type == 'project'){
			            	$(".project-list").empty();
			                $.each(data.message.obj, function (index, item){
			                	var startDate = item.startDate.split("-")[0] + "-" + item.startDate.split("-")[1],
			                		endDate = item.endDate.split("-")[0] + "-" + item.endDate.split("-")[1];
			                    $(".project-list").append(
			                    	"<div class='project-show-box'>"+
				                    	"<table class='table-box' cellpadding='0' cellspacing='0'>" +
		                                    "<tr>" +
		                                        "<td class='w4'>椤圭洰鏃堕棿锛�</td>" +
		                                        "<td><span class='startDate'>" + startDate + "</span> 鍒� <span class='endDate'>" + endDate + "</span></td>" +
		                                        "<td align='right'><span class='btn-box project-modify-btn' id='" + item.id + "'>淇敼</span></td>" +
		                                    "</tr>" +
		                                "</table>" +
		                                "<table class='table-box' cellpadding='0' cellspacing='0'>"+
		                                    "<tr>" +
		                                        "<td class='w4'>椤圭洰鍚嶇О锛�</td>" +
		                                        "<td class='w5 showProjectName'>" + item.expName + "</td>" +
		                                        "<td class='w4'>椤圭洰鑱岃矗锛�</td>" +
		                                        "<td class='showProjectPosition'>" + item.workPosition + "</td>" +
		                                    "</tr>" +
		                                "</table>" +
	                    				"<table class='table-box' cellpadding='0' cellspacing='0'>" +
		                                    "<tr>" +
		                                        "<td class='w4'>椤圭洰鎻忚堪锛�</td>" +
		                                        "<td class='showExpContent' content='" + item.expContent + "'>" + 
		                                        	item.expContent.replace(/\n/g,"<br>").replace(/\s/g,"&nbsp;") + 
		                                        "</td>" +
		                                    "</tr>" +
			                            "</table>" +
			                            "<div class='line'></div>" +
			                        "</div>" +
			                        "<div class='project-modify-box'></div>"
			                    );
			                });
							$(".add-project").text("缁х画娣诲姞");
			            }
			            
			        }
			        

		        }
		    });
		},
		//淇濆瓨宸ヤ綔缁忛獙
		saveWork : function(id, startDate, endDate, companyName, workPosition, workContent){
			$.ajax({
			    url : "http://hr.7road.com/website7road/exp/save.action", 
			    type : "POST",
			    data : {
			    	"exp.expType": 'work',
			        "exp.id": id,
			        "exp.expName": companyName,
			        "exp.expContent": workContent,
			        "exp.workPosition": workPosition,
			        "exp.startDate": startDate,
			        "exp.endDate": endDate
			    },
			    success : function(data){
			        alert(data.message.message);
			        if(data.message.code == 200){
			        	Fun.initTableList("work");
			        	$(".add-work").parent().show();
			        }
			    }

			});
		},
		//淇濆瓨椤圭洰缁忛獙
		saveProject : function(id, startDate, endDate, projectName, projectPosition, expContent){
			
			$.ajax({
			    url : "http://hr.7road.com/website7road/exp/save.action",
			    type : "POST",
			    data : {
			    	"exp.expType": 'project',
			        "exp.id": id,
			        "exp.expName": projectName,
			        "exp.workPosition": projectPosition,
			        "exp.expContent": expContent,
			        "exp.startDate": startDate,
			        "exp.endDate": endDate
			    },
			    success : function(data){
			        alert(data.message.message);
			        if(data.message.code == 200){
			        	Fun.initTableList("project");
			        	$(".add-project").parent().show();
			        }
			    }
			});
		},
		//鑾峰彇宸茬粡鐢宠鏀惰棌鐨勮亴浣�
		getApplyCollect : function(type){
			$.ajax({
				url : "http://my.7road.com/website7road/job/list.action",
				type : "GET",
				dataType : "jsonp",
				data : {"jobApply.applyType":type},
				success : function(data){
					if(type == "apply"){
						$("#apply-jobs-list").empty();
						if(data.msg.code == 200){
			                $.each(data.msg.obj, function (index, item) {
			                	var trClass = "odd";
			                	if(index % 2 == 0){
			                		trClass = "even";
			                	}
			                    $("#apply-jobs-list").append(
			                    	"<tr class='" + trClass + "'>" +
		                                "<td class='l'><a href='http://hr.7road.com/hr/page/" + item.id + ".html' target='_blank'>" + item.positionName + "</a></td>" +
		                                "<td>" + item.positionTypeName + "</td>" +
		                                "<td>" + item.positionPlace + "</td>" +
		                                "<td>" + item.applyDate + "</td>" +
		                                "<td class='s'>" + item.statusName + "</td>" +
		                                "<td class='blue'><span class='canceled' type='apply' id='" + item.id +"'>鎾ら攢</span></td>" +
		                            "</tr>"
			                    );
			                });
			            }else{
		                	$("#apply-jobs-list").append(
		                    	"<tr>" +
	                                "<td colspan='6'><div class='no-record'>娌℃湁鐢宠璁板綍</div></td>" +
	                            "</tr>"
			                );
		                }
		            }else if(type == "collect"){
		            	$("#collect-jobs-list").empty();
		            	if(data.msg.code == 200){
		            		$.each(data.msg.obj, function (index, item) {
			                	var trClass = "odd";
			                	if(index % 2 == 0){
			                		trClass = "even";
			                	}
			                    $("#collect-jobs-list").append(
			                    	"<tr class='" + trClass + "'>" +
		                                "<td class='l'><a href='http://hr.7road.com/hr/page/" + item.id + ".html' target='_blank'>" + item.positionName + "</a></td>" +
		                                "<td>" + item.positionTypeName + "</td>" +
		                                "<td>" + item.positionPlace + "</td>" +
		                                "<td>" + item.applyDate + "</td>" +
		                                "<td class='s'>" + item.statusName + "</td>" +
		                                "<td class='blue'><span class='canceled' type='collect' id='" + item.id +"'>鎾ら攢</span></td>" +
		                            "</tr>"
			                    );
			                });
		            	}else{
		                	$("#collect-jobs-list").append(
		                    	"<tr>" +
	                                "<td colspan='6'><div class='no-record'>娌℃湁鏀惰棌璁板綍</div></td>" +
	                            "</tr>"
			                );
		                }
		            }
				}
	        });
		},
		//鎾ゆ秷宸茬粡鐢宠鏀惰棌鐨勮亴浣�
		removeApplyCollect : function(id, type){
			$.ajax({
				url : "http://my.7road.com/website7road/job/remove.action",
				type : "GET",
				dataType : "jsonp",
				data : {"jobApply.jobId":id,"jobApply.applyType":type},
				success : function(data){
					alert("鎾ゆ秷鎴愬姛");
					if(type == "apply"){
						Fun.getApplyCollect("apply");
					}else if(type == "collect"){
						Fun.getApplyCollect("collect");
					}
				}
		    });
		},
		//鐢宠鑱屼綅
		applyJobs : function(id){
			$.ajax({
				url : "http://my.7road.com/website7road/job/apply.action",
				type : "GET",
				dataType : "jsonp",
				data : {"jobApply.jobId":id,"jobApply.applyType":"apply"},
                success : function(data){
                    alert(data.msg.message);
                    if( data.msg.code == 200 ){
                    	window.location.href = "http://hr.7road.com/center/applyRecord.html";
                    }else if( data.msg.code == 201 ){
                    	window.location.href = "http://hr.7road.com/center/login.html?url=" + window.location.href;
                    }else if( data.msg.code == 204 ){
                    	window.location.href = "http://hr.7road.com/center/resume.html";
                    }
                }
            });
		},
		//鏀惰棌鑱屼綅
		collectJobs : function(id){
			$.ajax({
				url : "http://my.7road.com/website7road/job/collect.action",
				type : "GET",
				dataType : "jsonp",
				data : {"jobApply.jobId":id,"jobApply.applyType":"collect"},
                success : function(data){
                    alert(data.msg.message);
                    if( data.msg.code == 200 ){
                    	window.location.href = "http://hr.7road.com/center/collectRecord.html";
                    }else if( data.msg.code == 201 ){
                    	window.location.href = "http://hr.7road.com/center/login.html?url=" + window.location.href;
                    }else if( data.msg.code == 204 ){
                    	window.location.href = "http://hr.7road.com/center/resume.html";
                    }
                }
            });
		},
		//鍒涘缓骞翠唤鍜屾湀浠�
		yearMonth : function(id,type){
            //骞翠唤
            var y = new Date().getFullYear();
            $("#" + type + "_" + id).find(".fromYear,.toYear").empty().append("<option value=''>骞�</option>");
            $("#" + type + "_" + id).find(".fromMonth,.toMonth").empty().append("<option value=''>鏈�</option>");
            for(var i=y; i>(y-40); i--){
                $("#" + type + "_" + id).find(".fromYear,.toYear").append("<option value=" + i +">" + i + "</option>");
            }
            //鏈堜唤
            for(var i=1; i<13; i++){
            	if(i < 10){
            		i = "0" + i;
            	}
                $("#" + type + "_" + id).find(".fromMonth,.toMonth").append("<option value=" + i +">" + i + "</option>");
            }
        },
        //閲嶆柊鑾峰彇鐭俊楠岃瘉鐮�
        againGetPhoneVerificationCode : function(time){
        	if( time > 0 ){
        		$(".get-phone-verification-code").attr({"id":"","disabled":"disabled"}).html("鐭俊楠岃瘉鐮佸凡鍙戦€�(" + time + ")");
        		time--;
        	}else{
        		$(".get-phone-verification-code").attr("id","getPhoneVerificationCode").removeAttr("disabled").html("鑾峰彇鐭俊楠岃瘉鐮�");
        		return false;
        	}
        	setTimeout(function(){
            	Fun.againGetPhoneVerificationCode(time);
            },
            1000);
        }


	};



	//鍒濆鍖�
	Fun.init();
	Fun.checkLogin();	
	Fun.yearMonth(0,"work");
	Fun.yearMonth(0,"project");
	

});


