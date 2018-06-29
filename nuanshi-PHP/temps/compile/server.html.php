
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php echo $this->_var['config']['site_name']; ?></title>
<meta name="keywords" content="<?php echo htmlspecialchars($this->_var['config']['site_keywords']); ?>">
<meta name="description" content="<?php echo htmlspecialchars($this->_var['config']['site_description']); ?>">
<link href="/favicon.ico" rel="bookmark" />
<link type="text/css" rel="stylesheet" href="/templates/ali/style/global.css" />
<link type="text/css" rel="stylesheet" href="/templates/ali/style/layout.css" />
<link type="text/css" rel="stylesheet" href="/templates/ali/style/pop.css" />
<link type="text/css" rel="stylesheet" href="/templates/ali/style/page.css" />
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
<![endif]--></head>

<body>

<?php echo $this->fetch('top.html'); ?>


<div class="sbg01">
    
    <div class="swrap">
              <?php echo $this->fetch('header.html'); ?>
    
        
        <div class="main clearfix">
            
            <div class="col3 fl">
                <div class="boxMain">
                    
                    <h3 class="gameHall clearfix">
                        <span>游戏大厅</span>
                        <div class="breadcrumb clearfix">
                            <a href="/">首页</a>&nbsp;&gt;&nbsp;<a href="/game.php">游戏大厅</a>&nbsp;&gt;&nbsp;<a href="javascript:;"><?php echo $this->_var['game_name']; ?></a>
                        </div>
                    </h3>
 <?php $_from = $this->_var['game_fst']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'game');if (count($_from)):
    foreach ($_from AS $this->_var['game']):
?>
                    <div class="cBox gameBox clearfix">
                        <img src="uploads/<?php echo $this->_var['game']['game_logo4']; ?>" />
                                                <div class="sLink clearfix">
                            <ul>
                                <li>
                                   <?php echo $this->_var['game']['game_name']; ?>
                                                                            
                                                                    </li>
                            </ul>

                            <span>
                                <a href="<?php echo $this->_var['game']['game_website']; ?>" target="_blank">官网</a>|
                                <a href="<?php echo $this->_var['game']['game_bbs']; ?>" target="_blank">下载</a>|
                                <a href="card.php?game_id=<?php echo $this->_var['game']['game_id']; ?>" target="_blank">新手卡</a>
                            </span>
                        </div>
						<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                                            </div>
                    

                    
                    <div class="servers">
                        <div class="serTitle">
						
                                                                                                <div align="center">《
                                                                                                  <?php echo $this->_var['game_name']; ?>
                                                                                                  》<a href="<?php echo $this->_var['game']['game_bbs']; ?>" target="_blank">下载</a>
                                                                                                </div>
                        </div>
<div class="box">
	<div class="picbox">
		<ul class="piclist mainlist">
		<?php $_from = $this->_var['game_log']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'log');if (count($_from)):
    foreach ($_from AS $this->_var['log']):
?>
			<li><a href="uploads/<?php echo $this->_var['log']['game_logo6']; ?>" target="_blank"><img src="uploads/<?php echo $this->_var['log']['game_logo6']; ?>" width="160" height="105" /></a></li>
			<li><a href="uploads/<?php echo $this->_var['log']['game_logo7']; ?>" target="_blank"><img src="uploads/<?php echo $this->_var['log']['game_logo7']; ?>" width="160" height="105"/></a></li>
			<li><a href="uploads/<?php echo $this->_var['log']['game_logo8']; ?>" target="_blank"><img src="uploads/<?php echo $this->_var['log']['game_logo8']; ?>" width="160" height="105"/></a></li>
			<li><a href="uploads/<?php echo $this->_var['log']['game_logo9']; ?>" target="_blank"><img src="uploads/<?php echo $this->_var['log']['game_logo9']; ?>" width="160" height="105"/></a></li>
			<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
		</ul>
        <ul class="piclist swaplist"></ul>
	</div>
	<div class="og_prev"></div>
	<div class="og_next"></div>
</div>
                        
                        <div class="sTab clearfix">
 
                                                                  </ul>
                                </dd>
                          </dl>
                        </div>
                    </div>
                    
                </div>
            </div>
            

            
            <div class="col2 fr">
                <div class="box3">

                                        
                     <h3 class="zTh">
                        <span>周边资讯</span>
                        <a class="more" href="/news.php" target="_blank">更多</a> 
                     </h3>
                     <div class="cBox newZixun">
                        <div class="zxContent">
                           <ul class="clearfix">
                              <li class="clearfix">
							                               <?php $_from = $this->_var['news']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'news_0_33318900_1486609967');if (count($_from)):
    foreach ($_from AS $this->_var['news_0_33318900_1486609967']):
?>
							   <a href="<?php echo $this->_var['news_0_33318900_1486609967']['url']; ?>" target="_blank"><span style="color:<?php echo $this->_var['news_0_33318900_1486609967']['color']; ?>"><?php echo $this->_var['news_0_33318900_1486609967']['content_title']; ?></span></a>
							   <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
							                                </li>
                           </ul>
                       </div>
                     </div>
               

                    
                    <div class="xsCard">
                        <a href="card.php" target="_blank"><img src="/images/xscard.jpg" /></a>
                    </div>
                    

                                        

                                        <h3 class="csTh"><span>客服中心</span></h3>
<div class="cBox c4">
   
   <div class="gClient">
      <ul class="clearfix">
          <li>客服QQ： <em>445444419</em></li>
          <li>服务邮箱：<span class="STYLE1">445444419@qq.com</span></li>
         <li>投诉邮箱：<span class="STYLE1">445444419@qq.com</span></li>
      </ul>
      <a class="csbtn" href="service.php" target="_blank">在线咨询</a>
  </div>
  
</div>                </div>
            </div>
            
        </div>
        
    </div>
    
    
 <?php echo $this->fetch('footer.html'); ?>


</div>
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
