
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
                <div class="rTop">
                    <div class="rMid">
                        <div class="rBottom">
                            <ul class="backPic clearfix">
							<?php $_from = $this->_var['game_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'game');if (count($_from)):
    foreach ($_from AS $this->_var['game']):
?>
                                                                <li class="gmidb">
                                   <p class="gf1">
								  
                                       <a href="card.php?action=card_list&id=<?php echo $this->_var['game']['game_id']; ?>&name=<?php echo $this->_var['game']['game_name']; ?>" target="_blank"><img src="uploads/<?php echo $this->_var['game']['game_logo']; ?>" /></a>
                                   </p>
								   
                                   <p class="gf2">
                                      <strong><?php echo $this->_var['game']['game_name']; ?>：</strong>
                                      <a class="s" href="game.php?action=server_list&game_id=<?php echo $this->_var['game']['game_id']; ?>" target="_blank">开始游戏</a>|
                                      <a href="<?php echo $this->_var['game']['game_website']; ?>" target="_blank">官网</a>|
                                      <a href="pay.php?game_id=<?php echo $this->_var['game']['game_id']; ?>" target="_blank">充值</a>
                                   </p>
                                   <p class="gf3">
								
								   
								  
                                      <a class="gfBtn" href="card.php?action=card_list&id=<?php echo $this->_var['game']['game_id']; ?>&name=<?php echo $this->_var['game']['game_name']; ?>" target="_blank">领取礼包</a>
                                   </p>
                                </li>
                                     <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>                          
															   
                                                            </ul>
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
