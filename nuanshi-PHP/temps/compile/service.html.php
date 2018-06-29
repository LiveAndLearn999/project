
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
                    
                    <h3 class="csHall clearfix">
                        <span>客服中心</span>
                        <div class="breadcrumb clearfix">
                            <a href="/">首页</a>&nbsp;&gt;&nbsp;<a href="service.php">客服中心</a>
                        </div>
                    </h3>
                    <div class="cBox csList clearfix">
                        
                        <div class="csContent">
                            
                                       
                            
                           
                            

                            <div class="tab_div"  id="div_l1">
                                <ul class="clearfix">
                                                                    <li class="clearfix">
																	<a href=http://wpa.qq.com/msgrd?v=3&amp;uin=445444419&amp;site=qq&amp;menu=yes target=blank ><img SRC="uploads/zaixianzixun.jpg" alt="" width="209" height="35" border="0"></a>
                                        <span class="time">密码问题</span>                                    </li>
                                                                     <li class="clearfix">
																	<a href=http://wpa.qq.com/msgrd?v=3&amp;uin=445444419&amp;site=qq&amp;menu=yes target=blank ><img SRC="uploads/zaixianzixun.jpg" alt="" width="209" height="35" border="0"></a>
                                        <span class="time">充值问题</span></li>
                                </ul>
                            </div>
                        </div>

                        
                        
                            <div class="pagnation clearfix">
                               
                            </div>
                       
                        

                    </div>
                    
                </div>
            </div>
            

            
            <div class="col2 fr">
                <div class="box3">
                    
                    <div class="userWay">
                         <ul>
                            <li>
                               <a class="w1" href="/user.php?action=forget" target="_blank">
                                  <strong>找回密码</strong>
                                  <p>如果您忘记了登陆密码，请点击这里找回密码</p>
                               </a>
                               
                               <a class="w2" href="/user.php?action=setcer" target="_blank">
                                  <strong>账号绑定</strong>
                                  <p>可以使您的账号更安全，请点击</p>
                               </a>
                               
                               <a class="w3" href="/user.php?action=setsec" target="_blank">
                                  <strong>重置密保</strong>
                                  <p>如果密码找回功能无法找回账号，请点击这里</p>
                               </a>
                            </li>    
                         </ul>
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
