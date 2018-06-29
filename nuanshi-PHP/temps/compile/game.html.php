
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
<script type="text/javascript" src="/templates/ali/js/city.js"></script>
<script type="text/javascript" src="/templates/ali/js/jquery.tabswitch.min.js"></script>
<style type="text/css">
<!--
.STYLE2 {font-size: 12px}
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
                    
                    <h3 class="gameHall clearfix">
                        <span>游戏大厅</span>
                        <div class="breadcrumb clearfix">
                            <a href="/">首页</a>&nbsp;&gt;&nbsp;<a href="/game.php">游戏大厅</a>
                        </div>
                    </h3>
                    <?php $_from = $this->_var['game_fst']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'game');if (count($_from)):
    foreach ($_from AS $this->_var['game']):
?>
                     <div class="cBox gameBox clearfix">
                        <img src="uploads/<?php echo $this->_var['game']['game_logo4']; ?>" />
                        <div class="gInfo">
                           <strong><?php echo $this->_var['game']['server_name']; ?></strong>
                           <p><?php echo $this->_var['game']['game_depict']; ?>...</p>
                           <ul>
                              <li>
                                 <a href="<?php echo $this->_var['game']['game_website']; ?>" target="_blank">游戏介绍</a><var>|</var>
                                 <a href="<?php echo $this->_var['game']['game_bbs']; ?>" target="_blank">下载</a><var>|</var>
                                 <a href="pay.php?game_id=<?php echo $this->_var['game']['game_id']; ?>" target="_blank"></a>
                              </li>
                           </ul>
                        </div>
                     </div>
               <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                    

                    
                    <h3 class="gameTh clearfix">
                        <span>全部游戏</span>
                        <ul>
                            <li class="clearfix doSqlSort">
                                <a href="javascript:;" data-field="frequency" class="desc">火爆游戏</a>
                                <a href="javascript:;" data-field="add_date" class="">最新游戏</a>
                                <a href="javascript:;" data-field="servernum" class="">精品推荐</a>
                            </li>
                        </ul>
                    </h3>
                    <div class="cBox gamePic clearfix"> 
                        <ul class="clearfix">
                                                      <?php $_from = $this->_var['game_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'game');if (count($_from)):
    foreach ($_from AS $this->_var['game']):
?>

													    <li>
                                <p class="p01">
                                    <a href="<?php echo $this->_var['game']['game_website']; ?>" target="_blank"><img src="uploads/<?php echo $this->_var['game']['game_logo']; ?>"></a>
                                </p>
                                <p class="p02 clearfix">
                                    <a class="i1" target="_blank" href="<?php echo $this->_var['game']['game_website']; ?>">游戏介绍</a>|
                                    <a class="i2" target="_blank" href="<?php echo $this->_var['game']['game_bbs']; ?>">下载</a>|
                                    <a class="i3" target="_blank" href="pay.php?game_id=<?php echo $this->_var['game']['game_id']; ?>"></a>									
                                    <a class="btn" target="_blank" href="game.php?action=server_list&game_id=<?php echo $this->_var['game']['game_id']; ?>">进入游戏</a>
                                </p>
                            </li>
							<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                                          </ul>
                        <div class="pagnation clearfix">
                       <?php echo $this->_var['pagebar']; ?>
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
							   <?php $_from = $this->_var['allnews']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'news_0_55803600_1486559295');if (count($_from)):
    foreach ($_from AS $this->_var['news_0_55803600_1486559295']):
?>
							   <a href="<?php echo $this->_var['news_0_55803600_1486559295']['url']; ?>" target="_blank"><span style="color:<?php echo $this->_var['news_0_55803600_1486559295']['color']; ?>"><?php echo $this->_var['news_0_55803600_1486559295']['content_title']; ?></span></a>
							   <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
							                               
							                                </li>
                           </ul>
                       </div>
                     </div>
               

                                        
<h3 class="acTh">
    <span>最新活动</span><a class="more" href="/news.php?id=4" target="_blank">更多</a>
</h3>
<div class="cBox newActive">
    <span class="day"></span>
   
   <div class="newContents">
       <div id="scrollDiv">
         <ul>
                          <?php echo $this->fetch('part_news.html'); ?>
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
    <span>最新开服</span>
</h3>
<div class="cBox newSer">
   <ul class="list clearfix">
     <li class="title">
        <span class="sort">游戏名称</span> 
        <span class="serName">服务器名称</span> 
        <span class="date">日期</span> 
     </li>
          <?php echo $this->fetch('part_game_news.html'); ?>
        </ul>
</div>



                                        <h3 class="problemTh">
   <span>常见问题</span><a class="more" href="news.php?id=2" target="_blank">更多</a> 
</h3>
<div class="cBox c3">
   
   <div class="gProblem">
      <ul class="clearfix">
         <li class="clearfix">
		  <?php echo $this->fetch('part_faq.html'); ?>        </li>
      </ul>
  </div>
  
</div>
                                        <h3 class="csTh"><span>客服中心</span></h3>
<div class="cBox c4">
   
   <div class="gClient">
      <ul class="clearfix">
         <li>客服QQ：<a href="445444419">68131546</a></li>
         <li>服务邮箱：<span class="STYLE2">68131546@qq.com</span></li>
         <li>投诉邮箱：<span class="STYLE2">445444419@qq.com</span></li>
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
