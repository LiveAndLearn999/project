<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>无标题文档</title>
</head>
<body>
<form id="registerForm"  method="post" name="registerForm" action="user.php?action=register_ok">
  <table border="0" cellSpacing="4" cellPadding="4" align="center">
    <tr>
      <td align="right">用户名：</td>
      <td><input id="username" name="member_username" type="text"></td>
    </tr>
    <tr>
      <td align="right">密码：</td>
      <td><input id="password" name="member_password" type="password"></td>
    </tr>
    <tr>
      <td align="right">重复密码：</td>
      <td><input id="repassword" name="member_password_confirm" type="password"></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>
	    <input id="registerBtn" value="注  册" type="submit">
        <input type="hidden" value="withtml5" name="post_mode">
        <input type="hidden" value="" name="sp">
        <input type="hidden" value="" name="gameId">
        <input type="hidden" value="" name="serverId">
		
		<input type="hidden" value="pceggs" name="spid">
		<input type="hidden" value="<?php echo empty($_GET['pcid'])?'':trim($_GET['pcid']); ?>" name="sparams">
		</td>
    </tr>
  </table>
</form>
</body>
</html>
