$(function(){
	//一级菜单
	$('#home').click(function() {
		document.location.href = '../home.html';
	});
	$('#guide').click(function() {
		document.location.href = '../guide.html';
	});
	$('#tnewscenter').click(function() {
		document.location.href = '../newscenter.html';
	});
	$('#bmcp').click(function() {
		document.location.href = '../bmcp.html';
	});

	//登录分栏
	$('.cplogin').click(function() {
		document.location.href = 'https://op.iapppay.com/ccxr/sso.do';
	});
	$('.userlogin').click(function() {
		document.location.href = 'https://user.iapppay.com/';
	});	
	$('.gamelogin').click(function() {
		document.location.href = 'https://op.iapppay.com/openid-web/account/pclogin';
	});

	//注册
	$('.signup').click(function() {
		document.location.href = 'https://op.iapppay.com/ccxr/getRegister.do';
	});

	//product二级菜单
	$('#product-domc').click(function() {
		document.location.href = '../domc.html';
	});
	$('#product-verify').click(function() {
		document.location.href = '../verify.html';
	});
	$('#product-h5pay').click(function() {
		document.location.href = '../h5pay.html';
	});
	$('#product-qkpay').click(function() {
		document.location.href = '../quickpay.html';
	});
	$('#product-open').click(function() {
		document.location.href = '../openid.html';
	});
	$('#product-qrcode').click(function() {
		document.location.href = '../qrcode.html';
	});
	$('#product-forc').click(function() {
		document.location.href = '../forc.html';
	});
	$('#product-o2o').click(function() {
		document.location.href = '../o2o.html';
	});
	$('#product-app').click(function() {
		document.location.href = '../dev-app.html';
	});
	$('#product-sms').click(function() {
		document.location.href = '../sms-pay.html';
	});

	//etc二级菜单
	$('#etc-joinus').click(function() {
		document.location.href = '../joinus.html';
	});
	$('#etc-about').click(function() {
		document.location.href = '../about.html';
	});
	$('#etc-media').click(function() {
		document.location.href = '../media.html';
	});

	//备案
	$('#casenum').click(function() {
		document.location.href = 'http://www.miitbeian.gov.cn/';
	});
	
	//底部
	$('#about').click(function() {
		document.location.href = '../about.html';
	});
	$('#newscenter').click(function() {
		document.location.href = '../newscenter.html';
	});
	$('#invite').click(function() {
		document.location.href = '../joinus.html';
	});

	//文网文关闭
	// $('#customerserv').click(function() {
	// 	document.location.href = '../customerserv.html';
	// });

	// $('#family').click(function() {
	// 	document.location.href = '../family.html';
	// });
	// $('#acg').click(function() {
	// 	document.location.href = '../acg.html';
	// });	

	$('.loginsel').click(function() {
		if ($('.lselzone').is(':visible')) {
			$('.lselzone').hide();
		} else {
			$('.lselzone').show();
		}
	});
	
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
	$('.head').after('<div class="third-party" onclick="document.location.href=\'b2d.html\'"></div>');

	$('.email').parent().hover(
		function() {
			$('span:first', $(this)).css('margin-left', '5px');
			$('span:last', $(this)).css('width', '159px');
		},
		function() {
			$('span:first', $(this)).css('margin-left', '30px');
			$('span:last', $(this)).css('width', '111px');
		}
	);

});