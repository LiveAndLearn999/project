<?php exit;?>a:3:{s:8:"template";a:11:{i:0;s:49:"C:/VirtualHost/maanwh010/templates/ali/index.html";i:1;s:47:"C:/VirtualHost/maanwh010/templates/ali/top.html";i:2;s:50:"C:/VirtualHost/maanwh010/templates/ali/header.html";i:3;s:59:"C:/VirtualHost/maanwh010/templates/ali/part_game_slide.html";i:4;s:54:"C:/VirtualHost/maanwh010/templates/ali/part_login.html";i:5;s:58:"C:/VirtualHost/maanwh010/templates/ali/part_game_best.html";i:6;s:57:"C:/VirtualHost/maanwh010/templates/ali/part_game_hot.html";i:7;s:57:"C:/VirtualHost/maanwh010/templates/ali/part_game_new.html";i:8;s:53:"C:/VirtualHost/maanwh010/templates/ali/part_news.html";i:9;s:58:"C:/VirtualHost/maanwh010/templates/ali/part_game_news.html";i:10;s:50:"C:/VirtualHost/maanwh010/templates/ali/footer.html";}s:7:"expires";i:1486632904;s:8:"maketime";i:1486629304;}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>玛岸游戏- 手游平台</title>
<meta name="keywords" content="游戏,手机游戏,">
<meta name="description" content="游戏,手机游戏,">
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
<link href="/favicon.ico" rel="bookmark" />
<link type="text/css" rel="stylesheet" href="/templates/ali/style/global.css" />
<link type="text/css" rel="stylesheet" href="/templates/ali/style/layout.css" />
<link type="text/css" rel="stylesheet" href="/templates/ali/style/pop.css" />
<link type="text/css" rel="stylesheet" href="/templates/ali/style/home.css" />
<script type="text/javascript" src="/templates/ali/js/jquery.js"></script>
<script type="text/javascript" src="/templates/ali/js/jquery.xdomainajax.js"></script>
<script type="text/javascript" src="/templates/ali/js/city.js"></script>
<script type="text/javascript" src="/templates/ali/js/jquery.tabswitch.min.js"></script>
<script type="text/javascript" src="/templates/ali/js/J7711.Common.js"></script>
<!--[if IE 6]>
<script type="text/javascript" src="/templates/ali/js/fixPNG.js"></script>
<script>
  DD_belatedPNG.fix('*');
</script>
<![endif]--><link rel="shortcut icon" href="/favicon.ico" />
<script type="text/javascript" src="/templates/ali/js/city.js"></script>
<script type="text/javascript" src="/templates/ali/js/jquery.tabswitch.min.js"></script>
<style type="text/css">
<!--
.STYLE1 {font-size: 12px}
-->
</style>
<meta property="qc:admins" content="661647121761207166375" />
</head>
<body>
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
                 <var><img src="/templates/ali/images/avata.jpg" /></var>
                 <em>4f62c4718c80e165225fget_login_name|a:1:{s:4:"name";s:14:"get_login_name";}4f62c4718c80e165225f</em>
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
var login_samllstate=4f62c4718c80e165225fget_login_state|a:1:{s:4:"name";s:15:"get_login_state";}4f62c4718c80e165225f;
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
<div class="bg01">
    
    <div class="wrap">
           <div class="logo"><a href="/" title="玛岸游戏- 手游平台">玛岸游戏- 手游平台</a></div>
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
        <div class="nav clearfix">
       <ul>
          <li class="clearfix">
		  <A class="a1 current " href="/" >��ҳ</A>
    	    		<A class="a2 " href="game.php" >��Ϸ����</A>
    	    		<A class="a3 " href="news.php" >��Ϸ��̬</A>
    	    		<A class="a6 " href="user.php" >�û�����</A>
    	    		<A class="a4 " href="pay.php" >��ֵ����</A>
    	    		<A class="a5 " href="card.php" >�������</A>
        </ul>
    </div>		   <div class="bannerBox clearfix">
           <!--首页幻灯片{{{-->
           <div class="bT fl">
              <div class="scrollBanner">
                   
                   <div class="banner">
                       <div class="show">
                           <div class="show_container">
                                                               <div class="banner_item">
                                   <a href="game.php?action=server_list&game_id=2" target='_blank'><img src="uploads/20170118140107_ucdckt.jpg" title=""/></a>
                                   <div class="caption">
                                       <h3>
                                          北极冒险滑雪                                                                                      <span>
                                                                                              <a target="_blank" href="game.php?action=server_list&game_id=2">进入游戏</a>
                                                                                              <a target="_blank" href="card.php?game_id=2" class="baggift">>新手卡</a>
                                                                                              <a target="_blank" href="/content.php?id=18">进入官网</a>
																							   <a href="/download/bjhxys.apk" target="_blank">下载</a>                                                                                         </span>
                                                                                  </h3>
                                   </div>
                               </div>
							   </div>
							    <ul class="pagination">                                                               <li class="current"><a href="javascript:;">1</a></li>
															                                                                
                                                          </ul>                                           </div>
                   </div>
                   
              </div>
              <div class="bB"></div>
          </div>
                        <div class="ucCenter fr">
            <!--begin:unlogin{{{-->
        
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
			alert('用户名不能为空！');
			return false;
		}
		if ($.trim(member_password)==''){
			alert('密码不能为空！');
			return false;
		}
		if (member_password.length<6&&member_password.length>20){
			alert('密码由6-20个字符组成，建议使用英文字母加数字或符号的组合密码。');
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
               <a href="user.php?action=setuser"><img src="/templates/ali/images/avata.jpg" /></a>
               <strong>亲爱的，欢迎登录！</strong>
               <em>4f62c4718c80e165225fget_login_name|a:1:{s:4:"name";s:14:"get_login_name";}4f62c4718c80e165225f</em>
            </div>
            <dl>
			
								
			
                <dt>上次登录：<em>4f62c4718c80e165225fget_last_time|a:1:{s:4:"name";s:13:"get_last_time";}4f62c4718c80e165225f</em></dt>
				
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
var login_state=4f62c4718c80e165225fget_login_state|a:1:{s:4:"name";s:15:"get_login_state";}4f62c4718c80e165225f;
if(login_state==1){
	$("#Tab1").hide();
	$("#Tab2").show();
}
</script>        
        
 
</div>
           
       </div>
       
       <div class="main clearfix">
           <!--begin:left左侧栏{{{-->
           <div class="col1 fl">
               <div class="box">
                                          <!--begin:box1热游排行{{{-->
        <h3 class="hotTh"><span>热游排行</span></h3>
    <div class="cBox c1">
       
       <div id="gInfo">
                     
		   
 <a onclick="getServer(4)" id="i1"  class="tabs" href="javascript:void(0)"><span>萝莉保卫军团</span></a>
           <div class="tabcon" style="height:136px">
              <ul id="server_id4">
			
										
              </ul>
           </div>
 <a onclick="getServer(2)" id="i2"  class="tabs" href="javascript:void(0)"><span>北极冒险滑雪</span></a>
           <div class="tabcon" style="height:136px">
              <ul id="server_id2">
			
										
              </ul>
           </div>		   <script type="text/javascript">
		   function getServer(id){
		
		$.ajax({
			url:'gameajax.php',
			data:"id=get_server&game_id="+id,
			type:'get',
			dataType:'text',
			success:function(result){
				//alert(result);
				$("#server_id"+id).empty();
				$("#server_id"+id).append(result);
			}
		});
	}
	</script>                  </div>
      
    </div>
        
                                    
                                       <h3 class="problemTh">
   <span>常见问题</span><a class="more" href="/news.php?id=4" target="_blank">更多</a> 
</h3>
<div class="cBox c3">
   
   <div class="gProblem">
      <ul class="clearfix">
         <li class="clearfix">
		             <a title="用户信息和隐私保护政策" href="content.php?id=22" target="_blank"><span style="color:">用户信息和隐私保护政策</span></a> 
			            <a title="18岁防沉迷系统" href="content.php?id=21" target="_blank"><span style="color:">18岁防沉迷系统</span></a> 
			            <a title="服务协议" href="content.php?id=14" target="_blank"><span style="color:">服务协议</span></a> 
			            <a title="关于我们" href="content.php?id=13" target="_blank"><span style="color:">关于我们</span></a> 
			            <a title="联系我们" href="content.php?id=12" target="_blank"><span style="color:">联系我们</span></a> 
			                     </li>
      </ul>
  </div>
  
</div>                                      <h3 class="csTh"><span>客服中心</span></h3>
<div class="cBox c4">
   
   <div class="gClient">
      <ul class="clearfix">
         <li>客服QQ：<em>68131546</em></li>
         <li>服务邮箱：<span class="STYLE1">68131546@qq.com</span></li>
         <li>投诉邮箱：<span class="STYLE1">445444419@qq.com</span></li>
      </ul>
      <a class="csbtn" href="service.php" target="_blank">在线咨询</a>
  </div>
  
</div>               </div>
           </div>
           
           <!--begin:center中间区域{{{-->
           <div class="col3 fl">
             <div class="box1">
                <!--begin:jptj精品推荐{{{-->
                <h3 class="jpth">
                   <span>精品推荐</span><a class="more" href="game.php" target="_blank">更多</a>
                </h3>
                 <div class="cBox jptj">
                                          <dl class="d101 clearfix">
                         <dt><a href="game.php?action=server_list&game_id=4" alt="萝莉保卫军团"><img alt="萝莉保卫军团" title="" src="uploads/20170118135010_tkubsn.png" /></a></dt>
                         <dd>
                             <div class="clearfix">
                                 <strong>萝莉保卫军团</strong>
                                 <span class="clearfix">
                                     <a class="gw" href="/content.php?id=20" target="_blank">介绍</a> 
                                     <a class="bbs" href="/download/llbwjt.apk" target="_blank">下载</a> 
                                     <a class="ksbtn" href="game.php?action=server_list&game_id=4" target="_blank">开始游戏</a> 
                                 </span>
                             </div>
                             <p>萝莉保卫军团是一款非常经典的射击游戏。玩家可以轻松上手，方便掌握，锻炼你的技巧和眼力，消除尽可能多的泡泡赢得高分。前方的泡泡还有很多，前方的路还有很长，运用你熟练的双手，在屏幕上飞舞，击落他们！</p>
                             <ul class="clearfix">
                                                                                                   <li onmouseout="this.className='clearfix'" onmousemove="this.className='clearfix on'" class="clearfix">
                                     
                                 </li>
                                                                  <li onmouseout="this.className='clearfix'" onmousemove="this.className='clearfix on'" class="clearfix">
                                     
                                 </li>
                                                                                               </ul>
                         </dd>
                     </dl> <dl class="d101 clearfix">
                         <dt><a href="game.php?action=server_list&game_id=2" alt="北极冒险滑雪"><img alt="北极冒险滑雪" title="" src="uploads/20170118135752_piudvn.png" /></a></dt>
                         <dd>
                             <div class="clearfix">
                                 <strong>北极冒险滑雪</strong>
                                 <span class="clearfix">
                                     <a class="gw" href="/content.php?id=18" target="_blank">介绍</a> 
                                     <a class="bbs" href="/download/bjhxys.apk" target="_blank">下载</a> 
                                     <a class="ksbtn" href="game.php?action=server_list&game_id=2" target="_blank">开始游戏</a> 
                                 </span>
                             </div>
                             <p>在雪山中有一项极限运动叫做滑雪，从山的最高头开始向下滑行，欣赏沿途的风景。游戏的同时，你还要躲避障碍物，或者是跳跃突起的山脉和地形，获取路上的金币，相应的金币可以在游戏商城里购买你想要的道具。你想体会...</p>
                             <ul class="clearfix">
                                                                                                   <li onmouseout="this.className='clearfix'" onmousemove="this.className='clearfix on'" class="clearfix">
                                     
                                 </li>
                                                                  <li onmouseout="this.className='clearfix'" onmousemove="this.className='clearfix on'" class="clearfix">
                                     
                                 </li>
                                                                                               </ul>
                         </dd>
                     </dl>                                         
                                      </div>
                 
                <!--begin:rmtj热门推荐{{{-->
                <h3 class="rmth">
                   <span>热门推荐</span>
                </h3>
                 <div class="cBox rmtj">
                   
                   <div class="tjGame clearfix">
                       <ul class="clearfix">
					     <li class="clearfix no">
                                <a href="game.php?action=server_list&game_id=4" target="_blank"><img title="" src="uploads/20170118135142_bxnuxr.jpg"></a>
                                <div><a class="mask" href="game.php?action=server_list&game_id=4" target="_blank">点击查看</a></div>
                            </li>
							  <li class="clearfix no">
                                <a href="game.php?action=server_list&game_id=2" target="_blank"><img title="" src="uploads/20170118135752_lldtev.jpg"></a>
                                <div><a class="mask" href="game.php?action=server_list&game_id=2" target="_blank">点击查看</a></div>
                            </li>
							                                                      
                                                       
                                                 </ul>
                    </div>               
                   
                 </div>
                 
             </div>
           </div>
           
           <!--begin:right右侧栏{{{-->
           <div class="col2 fr">
              <div class="box3">
                                  
<h3 class="acTh">
    <span>最新活动</span><a class="more" href="/news.php?id=4" target="_blank">更多</a>
</h3>
<div class="cBox newActive">
    <span class="day"></span>
   
   <div class="newContents">
       <div id="scrollDiv">
         <ul>
		   <li>
             <dl class="clearfix">
                     <dt><img src="/uploads/zxxmbe.png" width="47" height="47" /></dt>
                     <dd>
                         <span class="clearfix">
                             <strong>【萝莉保卫军团】</strong>
                            <var>08/24</var> 
                         </span>
                         <p><a href="content.php?id=20" target="_blank"><span style="color:"></span></a></p>
                     </dd>
   </dl>
              </li> <li>
             <dl class="clearfix">
                     <dt><img src="/uploads/zxxmbe.png" width="47" height="47" /></dt>
                     <dd>
                         <span class="clearfix">
                             <strong>【北极冒险之滑雪勇士】</strong>
                            <var>08/24</var> 
                         </span>
                         <p><a href="content.php?id=18" target="_blank"><span style="color:"></span></a></p>
                     </dd>
   </dl>
              </li> <li>
             <dl class="clearfix">
                     <dt><img src="/uploads/zxxmbe.png" width="47" height="47" /></dt>
                     <dd>
                         <span class="clearfix">
                             <strong>【平台测试中】</strong>
                            <var>05/06</var> 
                         </span>
                         <p><a href="content.php?id=4" target="_blank"><span style="color:"></span></a></p>
                     </dd>
   </dl>
              </li>          
                       </ul>
       </div>
       <button id="btn1">上滚</button>
       <button id="btn2">下滚</button>
   </div>
   
   <script type="text/javascript">
       (function ($) {
           $.fn.extend({
               Scroll: function (opt, callback) {
                   if (!opt) var opt = {};
                   var _btnUp   = $("#" + opt.up);                 //Shawphy:向上按钮
                   var _btnDown = $("#" + opt.down);               //Shawphy:向下按钮
                   var _this    = this.eq(0).find("ul:first");
                   var lineH    = _this.find("li:first").outerHeight(); //获取行高
                   var line     = opt.line ? parseInt(opt.line, 10) : parseInt(this.height() / lineH, 10); //每次滚动的行数，默认为一屏，即父容器高度 
                   var speed    = opt.speed ? parseInt(opt.speed, 10) : 600;  //卷动速度，数值越大，速度越慢（毫秒） 
                   var m        = line;                                       //用于计算的变量
                   var count    = _this.find("li").length;                    //总共的<li>元素的个数 
                   var upHeight = 55;
                   function scrollUp() {
                       if (!_this.is(":animated")) { //判断元素是否正处于动画，如果不处于动画状态，则追加动画。 
                           if (m < count) { //判断 m 是否小于总的个数
                               m++;
                               _this.animate({marginTop: "-=" + upHeight + "px"}, speed);
                           }
                       }
                   }
                   function scrollDown() {
                       if (!_this.is(":animated")) {
                           if (m > line) { //判断m 是否大于一屏个数
                               m--;
                               _this.animate({marginTop: "+=" + upHeight + "px"}, speed);
                           }
                       }
                   }
                   _btnUp.bind("click", scrollUp);
                   _btnDown.bind("click", scrollDown);
               }
           });
       })(jQuery);
       $(function () {
           // 取当前日历
           var tdate = new Date();
           var year = tdate.getFullYear();
           var month = tdate.getMonth()+1;
           var date = tdate.getDate();
           var day = tdate.getDay();
           var week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
           var dayStr = year + '&nbsp;&nbsp;今日&nbsp;&nbsp;' + month + '月' + date + '日&nbsp;' + week[day];
           $('.newActive .day').html(dayStr);
           $("#scrollDiv").Scroll({line: 3, speed: 500, up: "btn2", down: "btn1"});
       });
   </script>
</div>
                                  
<h3 class="serTh">
    <span>最新更新</span>
</h3>
<div class="cBox newSer">
   <ul class="list clearfix">
     <li class="title">
        <span class="sort">游戏名称</span> 
        <span class="serName">游戏版本</span> 
        <span class="date">日期</span> 
     </li>
	  <li>
         <span class="sort"><a target="_blank" href="game.php?action=server_list&game_id=2">北极冒险滑雪</a></span>
         <span class="serName"><a target="_blank" href="game.php?action=server_list&game_id=2">最新更新</a></span>
         <span class="date">05-06-14</span>
     </li>
	          
                 </ul>
</div>
                                      
                   </div>
           </div>
           
          
                               
                                </li>
            </ul>
        </div>
    </div>
    
   </div>
   
   
   <div id="footer">
    <p>  <a href="content.php?id=13" >关于我们</a>
  ┊	  <a href="content.php?id=12" >联系我们</a>
  ┊	  <a href="content.php?id=11" >家长监护</a>
  ┊	  <a href="content.php?id=8" >纠纷处理</a>
  ┊	  <a href="content.php?id=21" >18岁防沉迷系统</a>
  ┊	  <a href="content.php?id=22" >用户信息和隐私保护政策</a>
  	<br></p>
   <div>
     <div id="div">
<P>
  Copyright@2016 玛岸游戏——南京玛岸网络科技有限公司 All rights reserved ┊ 苏ICP备16041951号-1  </P>
   <P>
  地址：南京市雨花经济开发区凤华路18号8幢405室  联系电话：025-52359970
    </P>
	   <P>
   健康游戏忠告:抵制不良游戏,拒绝盗版游戏。注意自我保护,谨防受骗上当。适度游戏益脑,沉迷游戏伤身。合理安排时间,享受健康生活。
    </P>     </div>
   </div>
   </div>
  
</div>
</div>
<!--[if lt IE 7]>
<style type="text/css">
#bwdh{
    position: absolute;
    bottom: auto;
    clear: both;
    left:42px;
    z-index:9999;
    top:expression(eval(document.compatMode &&
     document.compatMode=='CSS1Compat') ?
     documentElement.scrollTop
     +(documentElement.clientHeight-this.clientHeight) - 10
     : document.body.scrollTop
     +(document.body.clientHeight-this.clientHeight) - 10);
}
</style>
<![endif]-->
<script type="text/javascript">
    $(document).ready(function(){
        J7711.Common.init();
        $('.scrollBanner .show').tabswitch({
            triggerType: 'click',
            contentCls : 'show_container',
            navCls     : 'pagination',
            activeTriggerCls: 'current',
            effect     : 'scrollx',
            delay      : 5000
        });
        $('.fillcity').each(function(){
            var val = $(this).attr('data-value');
            if (val && val.length == 4) {
                var pv = val.substring(0,2);
                var cv = val.substring(2,4);
                var pv_name = city.provinces[pv];
                var cv_name = city.city[pv][cv];
                $(this).html(pv_name+cv_name);
            }
        });
        $('.bellelist .tabSwitch').tabswitch({
            triggerType: 'click',
            effect: 'scrolly',
            delay: 12000
        });
        $('.bellelist .tabSwitch .tab1,.bellelist .tabSwitch .tab2').tabswitch({
            navCls: 'featureNav',
            contentCls: 'featureUL',
            effect: 'scrollx',
            prevBtnCls: 'prev',
            nextBtnCls: 'next',
            circular: 2,
            autoplay: true,
            viewSize: [226,0],
            screen: [680,0]
        });
        $('.sendflower').click(function(){
            var ppid = $(this).attr('ppid');
            $.ajax({
                type: "POST",
                url: '/pretty_index/op/sendflower/',
                data: 'id='+ppid,
                success: function(result){
                    if (result) {
                        var notice ="";
                        switch(result) {
                            case "unlogin":
                                alert('请先登陆！');
                                break;
                            default:
                                alert(result);
                                break;
                        }
                    }
                    return false;
                }
            });
        });
        $('.tjGame ul li').hover(
            function(){
                $(this).children('a').addClass('hover');
                $(this).find("div").slideDown("fast");
            },
            function(){
                $(this).children('a').removeClass('hover');
                $(this).find("div").slideUp("fast");
            }
        );
    });
</script>
</body>
</html>
