
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

<?php echo $this->fetch('top.html'); ?>



<div class="bg01">
    
    <div class="wrap">
           <?php echo $this->fetch('header.html'); ?>
		   <div class="bannerBox clearfix">
           <!--首页幻灯片{{{-->
           <div class="bT fl">
              <div class="scrollBanner">
                   
                   <div class="banner">
                       <div class="show">
                           <div class="show_container">
                                                             <?php echo $this->fetch('part_game_slide.html'); ?>
                                           </div>
                   </div>
                   
              </div>
              <div class="bB"></div>
          </div>
                        <div class="ucCenter fr">
            <!--begin:unlogin{{{-->
        
        <?php echo $this->fetch('part_login.html'); ?>
        
        
 
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
                     
		   <?php echo $this->fetch('part_game_best.html'); ?>
                  </div>
      
    </div>
        
                                    


                                       <h3 class="problemTh">
   <span>常见问题</span><a class="more" href="/news.php?id=4" target="_blank">更多</a> 
</h3>
<div class="cBox c3">
   
   <div class="gProblem">
      <ul class="clearfix">
         <li class="clearfix">
		 <?php $_from = $this->_var['faq']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'faq_0_01644400_1486548136');if (count($_from)):
    foreach ($_from AS $this->_var['faq_0_01644400_1486548136']):
?>
            <a title="<?php echo $this->_var['faq_0_01644400_1486548136']['content_title']; ?>" href="<?php echo $this->_var['faq_0_01644400_1486548136']['url']; ?>" target="_blank"><span style="color:<?php echo $this->_var['faq_0_01644400_1486548136']['color']; ?>"><?php echo $this->_var['faq_0_01644400_1486548136']['content_title']; ?></span></a> 
			<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
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
                                         <?php echo $this->fetch('part_game_hot.html'); ?>
                                         
                                      </div>
                 

                <!--begin:rmtj热门推荐{{{-->
                <h3 class="rmth">
                   <span>热门推荐</span>
                </h3>
                 <div class="cBox rmtj">
                   
                   <div class="tjGame clearfix">
                       <ul class="clearfix">
					   <?php echo $this->fetch('part_game_new.html'); ?>
                                                      
                                                       
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
    <span>最新更新</span>
</h3>
<div class="cBox newSer">
   <ul class="list clearfix">
     <li class="title">
        <span class="sort">游戏名称</span> 
        <span class="serName">游戏版本</span> 
        <span class="date">日期</span> 
     </li>
	 <?php echo $this->fetch('part_game_news.html'); ?>
         
                 </ul>
</div>


                                      
                   </div>
           </div>
           

          
                               
                                </li>
            </ul>
        </div>
    </div>
    
   </div>
   
   
   <?php echo $this->fetch('footer.html'); ?>
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

