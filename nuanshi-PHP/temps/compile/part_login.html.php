<form id="login_form" name="login_form" method="post" action="user.php?action=login_ok">
        <div class="login" id="Tab1">
            <h3>用户登录中心</h3>
            <p>
                <label>账号：</label>
                <input type="text" id="member_username" name="member_username" title="邮箱/用户名" value="邮箱/用户名" onfocus="if(value=='邮箱/用户名') {value=''}" onblur="if(value=='') {value='邮箱/用户名'}" />
            </p>
            <p>
                <label>密码：</label>
                <input type="password" id="member_password" name="member_password" title="请输入您的密码" value="请输入您的密码"  onfocus="if(value=='请输入您的密码') {value=''}" onblur="if(value=='') {value='请输入您的密码'}" />
            </p>
            <p class="check">
                <input type="checkbox" name="keeplive" value="1" id="rem" checked="checked" />
                <label>记住账号</label>
            </p>
            <div class="b2 clearfix">
			<input name="post_mode" type="hidden" value="withtml5">
                <input type="submit" value="登录" id="login_submit" name="" class="suBtn doLoginSubmit">
                <a class="regBtn" target="_blank" href="reg.php">注册</a>
            </div>
           
        </div>
        </form>
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
		return true;
	};
	$("#login_form").submit(function(){
		return logins();
	});
</script>
		
		
		<div class="logon" id="Tab2" style="display:none;">
            <h3>用户登录中心</h3>
            <div class="uname clearfix">
               <a href="user.php?action=setuser"><?php if ($this->_var['member']['photo']): ?><img src="/uploads/<?php echo $this->_var['member']['photo']; ?>" alt="" align="absmiddle" /><?php else: ?><img src="/templates/ali/images/avata.jpg" /><?php endif; ?></a>
               <strong>亲爱的，欢迎登录！</strong>
               <em><?php 
$k = array (
  'name' => 'get_login_name',
);
echo $this->_hash . $k['name'] . '|' . serialize($k) . $this->_hash;
?></em>
            </div>
            <dl>
			
								
			
                <dt>上次登录：<em><?php 
$k = array (
  'name' => 'get_last_time',
);
echo $this->_hash . $k['name'] . '|' . serialize($k) . $this->_hash;
?></em></dt>
				
                                <dd>挑选喜欢的游戏:<a href="game.php">游戏中心</a></dd>
                            </dl>
            <ul>
                <li class="clearfix">
                    <a class="u1" title="用户中心" href="user.php">用户中心</a>
                    <a class="u2" title="游戏大厅" href="game.php">游戏大厅</a>
                    <a class="u3" title="充值中心" href="pay.php" target="_blank">充值中心</a>
                    <a class="u4" title="安全退出" href="user.php?action=logout">安全退出</a>
                </li>
            </ul>
            <div class="b3">
                <a onclick="stat.visit('qcum1100');" href="/shortcut.php" id="shortcut icon"></a>
                <span>点击保存，下次访问更快捷 O(∩_∩)O</span>
            </div>
        </div>
		<script type="text/javascript">
var login_state=<?php 
$k = array (
  'name' => 'get_login_state',
);
echo $this->_hash . $k['name'] . '|' . serialize($k) . $this->_hash;
?>;
if(login_state==1){
	$("#Tab1").hide();
	$("#Tab2").show();
}
</script>