$(function(){
	//一级菜单
	$('#home').click(function() {
		document.location.href = './home.html';
	});
	$('#guide').click(function() {
		document.location.href = './guide.html';
	});
	$('#tnewscenter').click(function() {
		document.location.href = './newscenter.html';
	});
	$('#bmcp').click(function() {
		document.location.href = './bmcp.html';
	});

	//登录分栏
	// $('.cplogin').click(function() {
	// 	document.location.href = 'https://op.iapppay.com/ccxr/sso.do';
	// });
	// $('.userlogin').click(function() {
	// 	document.location.href = 'https://user.iapppay.com/';
	// });	
	// $('.gamelogin').click(function() {
	// 	document.location.href = 'https://op.iapppay.com/openid-web/account/pclogin';
	// });

	//注册
	// $('.signup').click(function() {
	// 	document.location.href = 'https://op.iapppay.com/ccxr/getRegister.do';
	// });

	//product二级菜单
	$('#product-domc').click(function() {
		document.location.href = './domc.html';
	});
	$('#product-verify').click(function() {
		document.location.href = './verify.html';
	});
	$('#product-h5pay').click(function() {
		document.location.href = './h5pay.html';
	});
	$('#product-qkpay').click(function() {
		document.location.href = './quickpay.html';
	});
	$('#product-open').click(function() {
		document.location.href = './openid.html';
	});
	$('#product-qrcode').click(function() {
		document.location.href = './qrcode.html';
	});
	$('#product-forc').click(function() {
		document.location.href = './forc.html';
	});
	$('#product-o2o').click(function() {
		document.location.href = './o2o.html';
	});
	$('#product-app').click(function() {
		document.location.href = './dev-app.html';
	});
	$('#product-sms').click(function() {
		document.location.href = './sms-pay.html';
	});

	//etc二级菜单
	$('#etc-joinus').click(function() {
		document.location.href = './joinus.html';
	});
	$('#etc-about').click(function() {
		document.location.href = './about.html';
	});
	$('#etc-media').click(function() {
		document.location.href = './media.html';
	});

	//备案
	$('#casenum').click(function() {
		document.location.href = 'http://www.miitbeian.gov.cn/';
	});

	//底部
	$('#about').click(function() {
		document.location.href = './about.html';
	});
	$('#newscenter').click(function() {
		document.location.href = './newscenter.html';
	});
	$('#invite').click(function() {
		document.location.href = './joinus.html';
	});

	// $('.loginsel').click(function() {
	// 	if ($('.lselzone').is(':visible')) {
	// 		$('.lselzone').hide();
	// 	} else {
	// 		$('.lselzone').show();
	// 	}
	// });
	
	$('#product').click(function() {
		$('.etc-ch').hide();

		if ($('.product-ch').is(':visible')) {
			$('.product-ch').hide();
		} else {
			$('.product-ch').show();
		}
	});

	$('#etc').click(function() {
		$('.product-ch').hide();
		
		if ($('.etc-ch').is(':visible')) {
			$('.etc-ch').hide();
		} else {
			$('.etc-ch').show();
		}
	});
	
	//悬停js 
	// $('.head').after('<div class="third-party" onclick="document.location.href=\'b2d.html\'"></div>');

	$('.email').parent().hover(
		function() {
			$('span:first', $(this)).css('margin-left', '-10px');
			$('span:last', $(this)).css('width', '189px');
		},
		function() {
			$('span:first', $(this)).css('margin-left', '30px');
			$('span:last', $(this)).css('width', '111px');
		}
	);

	//接入指南内容
	$('#dlSDK').click(function() {
		document.location.href = './g-dlSDK.html';
	});

	$('#tradepro').click(function() {
		document.location.href = './g-tradepro.html';
	});

	$('#trydemo').click(function() {
		document.location.href = './g-trydemo.html';
	});
	
	$('#g-guide').click(function() {
		document.location.href = './guide.html';
	});

	$('#userguide').click(function() {
		if($('.userguide').is(':visible')){
			$(this).children('.signimg').removeClass('checked');
			$('.userguide').hide(300);
		}else{
			$(this).children('.signimg').addClass('checked');
			$('.userguide').show(300);
		}
	});

	$('#exeguide').click(function() {
		if($('.exeguide').is(':visible')){
			$(this).children('.signimg').removeClass('checked');
			$('.exeguide').hide(300);
		}else{
			$(this).children('.signimg').addClass('checked');
			$('.exeguide').show(300);
		}
	});

	$('#androidpay').click(function() {
		if($('.androidpay').is(':visible')){
			$('.androidpay').hide(300);
		}else{
			$('.androidpay').show(300);
		}
	});

	$('#androidlpay').click(function() {
		if($('.androidlpay').is(':visible')){
			$('.androidlpay').hide(300);
		}else{
			$('.androidlpay').show(300);
		}
	});

	$('#iospay').click(function() {
		if($('.iospay').is(':visible')){
			$('.iospay').hide(300);
		}else{
			$('.iospay').show(300);
		}
	});

	$('#webpay').click(function() {
		if($('.webpay').is(':visible')){
			$('.webpay').hide(300);
		}else{
			$('.webpay').show(300);
		}
	});

	$('#htmluweb').click(function() {
		if($('.htmluweb').is(':visible')){
			$('.htmluweb').hide(300);
		}else{
			$('.htmluweb').show(300);
		}
	});

	$('#htmlweb').click(function() {
		if($('.htmlweb').is(':visible')){
			$('.htmlweb').hide(300);
		}else{
			$('.htmlweb').show(300);
		}
	});

	$('#pcweb').click(function() {
		if($('.pcweb').is(':visible')){
			$('.pcweb').hide(300);
		}else{
			$('.pcweb').show(300);
		}
	});

	$('#apilist').click(function() {
		if($('.apilist').is(':visible')){
			$('.apilist').hide(300);
		}else{
			$('.apilist').show(300);
		}
	});

	$('#serveguide').click(function() {
		if($('.serveguide').is(':visible')){
			$(this).children('.signimg').removeClass('checked');
			$('.serveguide').hide(300);
		}else{
			$(this).children('.signimg').addClass('checked');
			$('.serveguide').show(300);
		}
	});


	$('#createapp').click(function() {
		document.location.href = './g-createapp.html';
	});
	$('#selecttra').click(function() {
		document.location.href = './g-selecttra.html';
	});
	$('#cpadmin').click(function() {
		document.location.href = './g-cpadmin.html';
	});
	$('#autorect').click(function() {
		document.location.href = './g-autorect.html';
	});

	$('#ardsdk').click(function() {
		document.location.href = './g-ardsdk.html';
	});
	$('#ardenv').click(function() {
		document.location.href = './g-ardenv.html';
	});
	$('#arddvp').click(function() {
		document.location.href = './g-arddvp.html';
	});
	$('#ardfaq').click(function() {
		document.location.href = './g-ardfaq.html';
	});

	// $('#ardlenv').click(function() {
	// 	document.location.href = './g-ardlenv.html';
	// });
	// $('#ardlsdk').click(function() {
	// 	document.location.href = './g-ardlsdk.html';
	// });
	// $('#ardlres').click(function() {
	// 	document.location.href = './g-ardlres.html';
	// });
	// $('#ardlatt').click(function() {
	// 	document.location.href = './g-ardlatt.html';
	// });

	$('#iossdk').click(function() {
		document.location.href = './g-iossdk.html';
	});
	$('#iosxcode').click(function() {
		document.location.href = './g-iosxcode.html';
	});
	$('#iosdvp').click(function() {
		document.location.href = './g-iosdvp.html';
	});
	$('#iosfaq').click(function() {
		document.location.href = './g-iosfaq.html';
	});

	$('#webres').click(function() {
		document.location.href = './g-webres.html';
	});
	$('#webdvp').click(function() {
		document.location.href = './g-webdvp.html';
	});

	// $('#h5ures').click(function() {
	// 	document.location.href = './g-h5ures.html';
	// });
	// $('#h5udvp').click(function() {
	// 	document.location.href = './g-h5udvp.html';
	// });
	// $('#h5uopay').click(function() {
	// 	document.location.href = './g-h5uopay.html';
	// });

	// $('#h5vres').click(function() {
	// 	document.location.href = './g-h5vres.html';
	// });
	// $('#h5vdvp').click(function() {
	// 	document.location.href = './g-h5vdvp.html';
	// });
	// $('#h5vopay').click(function() {
	// 	document.location.href = './g-h5vopay.html';
	// });	

	$('#pcwebres').click(function() {
		document.location.href = './g-pcwebres.html';
	});
	$('#pcwebdvp').click(function() {
		document.location.href = './g-pcwebdvp.html';
	});

	$('#introduction').click(function() {
		document.location.href = './g-introduction.html';
	});
	$('#token').click(function() {
		document.location.href = './g-token.html';
	});
	$('#book').click(function() {
		document.location.href = './g-book.html';
	});
	$('#resultmsg').click(function() {
		document.location.href = './g-resultmsg.html';
	});
	$('#findresult').click(function() {
		document.location.href = './g-findresult.html';
	});
	$('#selectdeed').click(function() {
		document.location.href = './g-selectdeed.html';
	});
	$('#deedinfo').click(function() {
		document.location.href = './g-deedinfo.html';
	});	
	$('#deedunsub').click(function() {
		document.location.href = './g-deedunsub.html';
	});	

	$('#chafunc').click(function() {
		document.location.href = './g-chafunc.html';
	});

	$('#quest').click(function() {
		document.location.href = './g-quest.html';
	});

	$('#ecode').click(function() {
		document.location.href = './g-ecode.html';
	});
});