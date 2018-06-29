<div class="top">
   <div class="topbar"> 
       <ul class="t1 clearfix">
           <li class="addUs"><a class="addFavorite" href="javascript:void(0);" onclick="addFavorite();return false;" >添加收藏</a></li>
           <li class="setHome"><a class="addPageHome" href="javascript:void(0);" onclick="addPageHome(this);return false;">设为首页</a></li>
       </ul>
       <ul class="t2 clearfix">
           <li class="game"><a href="game.php">游戏</a></li>
           <li class="cs"><a href="/service.php" target="_blank">客服</a></li>
           <li class="pay"><a href="/pay.php" target="_blank">充值</a></li>
       </ul>
              <div class="unLogin clearfix" id="st1">
           <a class="lbtn ajax_login" href="/login.php">登录</a>
           <a class="rbtn" href="/reg.php" target="_blank">注册</a>
       </div>
	   <div class="aLogin clearfix" id="st2" style="display:none;">
          <div class="secBox">
             <strong id="mostrar" class="off">
                 <var><?php if ($this->_var['member']['photo']): ?><img src="/uploads/<?php echo $this->_var['member']['photo']; ?>" /><?php else: ?><img src="/templates/ali/images/avata.jpg" /><?php endif; ?></var>
                 <em><?php 
$k = array (
  'name' => 'get_login_name',
);
echo $this->_hash . $k['name'] . '|' . serialize($k) . $this->_hash;
?></em>
             </strong>
             <div class="ucSec">
                 <span class="u1"><a href="user.php"><var></var>用户中心</a></span>
                 <span class="u2"><a href="game.php"><var></var>我的游戏&nbsp;</a></span>
                 <span class="u3"><a href="pay.php"><var></var>充值中心</a></span>
                 <span class="u4"><a href="user.php?action=logout"><var></var>退 出</a></span>
             </div>
          </div>
       </div>
	   
	   
	   
          </div>
</div>
<script type="text/javascript">
var login_samllstate=<?php 
$k = array (
  'name' => 'get_login_state',
);
echo $this->_hash . $k['name'] . '|' . serialize($k) . $this->_hash;
?>;
if(login_samllstate==1){
	$("#st1").hide();
	$("#st2").show();
}
</script>
<script type="text/javascript">
    function addFavorite()
    {
        if (document.all) window.external.addFavorite('http://www.920wan.com', '920wan网页游戏平台');
        else if (window.sidebar) window.sidebar.addPanel('920wan网页游戏平台', 'http://www.920wan.com', "");
    }

    function addPageHome(dom)
    {
        if(document.all){
            dom.style.behavior='url(#default#homepage)';
            dom.setHomePage('http://www.920wan.com');
        }
    }
</script>
