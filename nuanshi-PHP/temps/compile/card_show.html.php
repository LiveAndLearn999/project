
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
            
        <div class="main gamePacks clearfix">
            <div class="banner"><img src="/images/backPic.jpg" /></div>
            <div class="cBox">
                <div class="gTop"></div>
                
                <div class="gMid">
                    <div class="subMain">
                        <div class="title clearfix">
                            <div class="s1">名称</div>
                            <div class="t1">发放数</div>
                            <div class="t1">剩余</div>
                            <div class="t2">领取时段</div>
                            <div class="s2">操作</div>
                            <div class="bottom">点击领取</div>
                        </div>
                        <ul class="detail clearfix">
						<?php if ($this->_var['card_list']): ?>
						<?php $_from = $this->_var['card_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'card');if (count($_from)):
    foreach ($_from AS $this->_var['card']):
?>
                                                    <li>
                                <span class="s1"><?php echo $this->_var['card']['name']; ?></span>
                                <span class="t1">1000</span>
                                <span class="t1"><?php echo $this->_var['card']['free']; ?></span>
                                <span class="t2">无限制</span>
                                <span class="s2"><a href="javascript:;" onClick="disp_cc();" class="showDetail" data-id="48">查看详情</a></span>
                                <span class="s07">
								
								                                 <?php if ($this->_var['card']['link'] != ''): ?>
							<a href="<?php echo $this->_var['card']['link']; ?>" class="bottom doDrawCode" target="_blank">我要领取</a>
						
							<?php else: ?>
							<a href="card.php?action=get_card&id=<?php echo $this->_var['card']['id']; ?>" class="bottom doDrawCode"></a>
							<?php endif; ?>
						
                                                                                                           
                                                                                                    </span>
                                <div id="info48" class="deTail" style="display: none;">
                                    <div class="detail_div">
                                        <h3><?php echo $this->_var['card']['name']; ?><a href="javascript:;" onclick="info48.style.display='none'" class="detailClose">close</a></h3>
                                        <p><strong style="color:#f00;font-weight:bold;">礼包内含：</strong></br><?php echo $this->_var['card']['card_depict']; ?></br>
<strong style="color:#090;font-weight:bold;"> 领取方式：</strong></br>
<?php echo $this->_var['card']['card_fs']; ?></strong></p>
                                    </div>
                                </div>
                            </li>
								<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
								<?php endif; ?>
                                                </ul>
                    </div>
                </div>
                
                <div class="gBot"><a href="card.php" class="back">返回礼包列表</a></div>
            </div>
        </div>
        
    </div>
    

    
<?php echo $this->fetch('footer.html'); ?>

<script type="text/javascript">
function gets_id(objName){
if(document.getElementById){
return eval('document.getElementById("' + objName + '")');
}else if(document.layers){
return eval("document.layers['" + objName +"']");
}else{
return eval('document.all.' + objName);
}
}
//打开DIV层
function disp_cc()
{
if(gets_id('info48').style.display=='none')
{
gets_id('info48').style.display='';
}
else
{
gets_id('info48').style.display='none';
}
}
//赋值
function gets_value(str)
{
gets_id('class').value=str;
gets_id('info48').style.display='none';
}
</script>  
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
