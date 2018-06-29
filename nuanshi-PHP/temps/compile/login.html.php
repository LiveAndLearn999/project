
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php echo $this->_var['config']['site_name']; ?></title>
<meta name="keywords" content="<?php echo htmlspecialchars($this->_var['config']['site_keywords']); ?>">
<meta name="description" content="<?php echo htmlspecialchars($this->_var['config']['site_description']); ?>">
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
<link href="/favicon.ico" rel="bookmark" />
<link type="text/css" rel="stylesheet" href="/templates/ali/style/global.css" />
<link type="text/css" rel="stylesheet" href="/templates/ali/style/layout.css" />
<link type="text/css" rel="stylesheet" href="/templates/ali/style/pop.css" />
<link type="text/css" rel="stylesheet" href="/templates/ali/style/reg.css" />
<script type="text/javascript" src="/templates/ali/js/jquery.js"></script>
<script type="text/javascript" src="/templates/ali/js/jquery.xdomainajax.js?domain=.7711.com"></script>

<script type="text/javascript" src="/templates/ali/js/J7711.Common.js"></script>
<!--[if IE 6]>
<script type="text/javascript" src="/templates/ali/js/fixPNG.js"></script>
<script>
  DD_belatedPNG.fix('*');
</script>
<![endif]--><script type="text/javascript" src="/js/md5.js"></script>
<!--[if IE 6]>
<script type="text/javascript" src="/templates/ali/js/fixPNG.js"></script>
<script>
  DD_belatedPNG.fix('*');
</script>
<![endif]-->
</head>

<body>

<?php echo $this->fetch('top.html'); ?>

<div class="rbg01" id="page_login"><div class="rbg02">
    <div class="rwrap">
                    <div class="logo"><a href="/" title="网页游戏平台">logo</a></div>
    <div class="swf">
        <object width="706" height="96" align="middle" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" id="undefined">
            <param value="always" name="allowScriptAccess">
            <param value="/templates/ali/swf/swf.swf" name="movie">
            <param value="high" name="quality">
            <param value="#FFFFFF" name="bgcolor">
            <param value="transparent" name="wmode">
            <param value="false" name="menu">
            <embed width="706" height="96" align="middle" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" allowscriptaccess="always" name="undefined" menu="false" quality="high" src="/templates/ali/swf/swf.swf" />
        </object>
    </div>
              
        <div class="login clearfix">
            <img src="/templates/ali/style/img/lpic0.jpg" />
            <img src="/templates/ali/style/img/lpic1.jpg" />
            <img src="/templates/ali/style/img/lpic2.jpg" />
            <div class="userLogin">
                 <form id="login_form" name="login_form" method="post" action="user.php?action=login_ok">
                    <ul class="clearfix">
                        <li>
                            <label class="fl" for="">账　号：</label>
                           <input id="member_username" name="member_username" type="text"  />
                        </li>
                        <li>
                            <label class="fl" for="">密　码：</label>
                             <input id="member_password" name="member_password" type="password"  />
                        </li>
						  <li>
                            <label class="fl" for="">验证码：</label>
                             <input id="authcode" name="authcode" type="text" class="pi_input2" />
								<img src="authcode.php" alt="" align="absmiddle" onclick="this.src+='?'+Math.random()"/>
                        </li>
                    </ul>
                    <div class="rember clearfix">
                        <input type="checkbox" checked="checked" id="rem" value="1" name="keeplive">
                        <a class="r1" onclick="document.getElementById('rem').checked=!document.getElementById('rem').checked;return false;" onfocus="this.blur();" href="javascript:void(0);">记住登录账号</a>
                        <a class="r2" title="找回密码" href="/user.php?action=forget">忘记密码？</a>
                    </div>
                    <div class="btnLogin clearfix">
                        <input type="submit" id="login_submit" class="cur0 doLoginSubmit" value="立即登录">
                        <a class="cur1" href="reg.php" target="_blank">注册</a>
                    </div>
                </form>
            </div>
        </div>
		<script type="text/javascript">
	var logins=function(){
		var member_username=$('#member_username').val();
		var member_password=$('#member_password').val();
		if ($.trim(member_username)==''){
			alert('<?php echo $this->_var['language']['username_is_empty']; ?>');
			return false;
		}
		if ($.trim(member_password)==''){
			alert('<?php echo $this->_var['language']['password_is_empty']; ?>');
			return false;
		}
		if (member_password.length<6&&member_password.length>20){
			alert('<?php echo $this->_var['language']['member_password_text']; ?>');
			return false;
		}
		
		$("#login_form").submit();
		
		/*$.ajax({
			type:"GET",
			url:"user.php?action=login_ok&member_username="+encodeURI(member_username)+"&member_password="+encodeURI(member_password)+"&r="+Math.random(), 
			dataType:"text",
			async:false,
			success:function(e){
				if(e=='error:username_is_empty'){
					alert('<?php echo $this->_var['language']['username_is_empty']; ?>');
					return false;
				}else if(e=='error:password_is_empty'){
					alert('<?php echo $this->_var['language']['password_is_empty']; ?>');
					return false;
				}else if(e=='error:account_is_not_activate'){
					alert('<?php echo $this->_var['language']['account_is_not_activate']; ?>');
					return false;
				}else if(e=='error:account_is_lock'){
					alert('<?php echo $this->_var['language']['account_is_lock']; ?>');
					return false;
				}else if(e=='error:login_failed'){
					alert('<?php echo $this->_var['language']['login_failed']; ?>');
					return false;
				}
			}
		});*/
	};
	$("#login_submit").click(function(){
		logins();
	});
</script>
        
    </div>
    
  <?php echo $this->fetch('footer.html'); ?>
</div></div>

</body>
</html>