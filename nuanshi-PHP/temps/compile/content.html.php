
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
<![endif]-->
<style type="text/css">
<!--
.STYLE1 {font-size: 12px}
-->
</style>
</head>
<body>

<?php echo $this->fetch('top.html'); ?>


<div class="sbg01">
    
    <div class="swrap">
           <?php echo $this->fetch('header.html'); ?>
                 
           <div class="main clearfix">

			
               <div class="col3 fl">
                 <div class="boxMain">
                    
                     <h3 class="newsHall clearfix">
                         <span><?php echo $this->_var['channel_info']['name']; ?></span>
                         <div class="breadcrumb clearfix">
                             <a href="/">首页</a>&nbsp;&gt;&nbsp;<?php echo $this->_var['channel_info']['name']; ?>   
                         </div>                        
                     </h3>

					 <div class="cBox gameList clearfix">
                        
                        <div class="gameContent">
							<h4 class="newsTh clearfix">
                              <a class="a1  current" href='/news.php' id="a_l1">综合</a>
									<a class="a2 " href="/news.php?id=1" id="a_l2">新闻</a>
									<a class="a3 " href="/news.php?id=3" id="a_l3">公告</a>
									<a class="a4 " href="/news.php?id=4" id="a_l4">活动</a>
                            </h4>

							
                            <div class="tabContent"  id="div_l1">
                            
                                <div class="gintro">
                                   <h1>
                                      <strong><span style="color:<?php echo $this->_var['content_info']['color']; ?>"><?php echo $this->_var['content_info']['title']; ?></span></strong>
                                      <span class="time">2013-05-06 11:11</span>
                                   </h1>
                                </div>
								<div class="contents"><?php echo $this->_var['content_info']['text']; ?></div> 
								
				
								
								        
                               <div class="share1 clearfix">
                                        <div id="ckepop">
                                                <span class="jiathis_txt">分享到：</span>
												
	<a class="jiathis_button_qzone">QQ空间</a>
	<a class="jiathis_button_tsina">新浪微博</a>
	<a class="jiathis_button_tqq">腾讯微博</a>
	<a class="jiathis_button_weixin">微信</a>
	<a href="http://www.jiathis.com/share" class="jiathis jiathis_txt jiathis_separator jtico jtico_jiathis" target="_blank">更多</a>
	<a class="jiathis_counter_style"></a>
                                       </div><div style="position:absolute;width:0px;height:0px;">
                                       <script type="text/javascript" src="http://v3.jiathis.com/code_mini/jia.js?uid=1367813380873579" charset="utf-8"></script>
                                       </div>
                                </div>    
                                
                                   
                                <ul class="updown clearfix">
								<?php if ($this->_var['prev'] != ''): ?>
                                    <li class="pa"><strong>上一篇：</strong><a href="<?php echo $this->_var['prev']['url']; ?>" <?php if ($this->_var['content']['target']): ?>target="_blank"<?php endif; ?>><?php echo $this->_var['prev']['title']; ?></a></li>
                                    <?php endif; ?>
<?php if ($this->_var['next'] != ''): ?><li class="pb"><strong>下一篇：</strong><a href="<?php echo $this->_var['next']['url']; ?>" <?php if ($this->_var['content']['target']): ?>target="_blank"<?php endif; ?>><?php echo $this->_var['next']['title']; ?></a></li><?php endif; ?>
                                </ul> 
                                 
                            
                            </div>
                            
                            
                        </div>
                        
                     
                     </div>
                    
                    
                    
                 </div>
               </div>
               
               
               
               <div class="col2 fr">
                  <div class="box3">
                  
                     
                         <!--begin:box1热游排行{{{-->
        <h3 class="hotTh"><span>热游排行</span></h3>
    <div class="cBox c1">
       
       <div id="gInfo">
                       <?php echo $this->fetch('part_game_best.html'); ?>
                  </div>
      
    </div>
        
                     
                  
                                              
    <h3 class="bTh">
       <span>论坛热贴</span><a class="more" href="http://www.920wan.com/" target="_blank">更多</a>
    </h3>
    <div class="cBox hotBbs">
       <div class="bbsContent">
          <ul class="clearfix">
             <li class="clearfix">
                 <span class="auto_bbspost" num="5"><script type="text/javascript" src="http://www.920wan.com/api.php?mod=js&bid=14"></script></span>                 <!--<span class="auto_bbspost" num="3"></span>-->
             </li>
          </ul>
      </div>
    </div>
    
   
                     
                     <h3 class="csTh"><span>客服中心</span></h3>
<div class="cBox c4">
   
   <div class="gClient">
       <ul class="clearfix">
          <li>客服QQ：<em>445444419</em></li>
         <li>服务邮箱：<span class="STYLE1">445444419@qq.com</span></li>
         <li>投诉邮箱：<span class="STYLE1">445444419@qq.com</span></li>
      </ul>
      <a class="csbtn" href="service.php" target="_blank">在线咨询</a>
  </div>
  
</div>                     
                     
                     
                     
                   </div>
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
