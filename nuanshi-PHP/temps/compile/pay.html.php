
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php echo $this->_var['config']['site_name']; ?></title>
<meta name="keywords" content="<?php echo htmlspecialchars($this->_var['config']['site_keywords']); ?>">
<meta name="description" content="<?php echo htmlspecialchars($this->_var['config']['site_description']); ?>">
<link href="/favicon.ico" rel="shortcut icon" />
<link href="/favicon.ico" rel="bookmark" />
<link type="text/css" rel="stylesheet" href="/templates/ali/style/global.css" />
<link type="text/css" rel="stylesheet" href="/templates/ali/style/layout.css" />
<link type="text/css" rel="stylesheet" href="/templates/ali/style/pop.css" />
<link type="text/css" rel="stylesheet" href="/templates/ali/style/pay.css" />
<script type="text/javascript" src="/templates/ali/js/jquery.js"></script>
<script type="text/javascript" src="/templates/ali/js/jquery.xdomainajax.js?domain=.7711.com"></script>
<script type="text/javascript" src="/templates/ali/js/J7711.Common.js"></script>
<!--[if IE 6]>
<script type="text/javascript" src="/templates/ali/js/fixPNG.js"></script>
<script>
  DD_belatedPNG.fix('.png');
</script>
<![endif]-->
<script type="text/javascript">
var mode_id=0;
var mode_name="";
var mode_depict="";
var mode_per=100;
var mode_no="";
var gold_name="玛岸币";
var gold_per=10;
</script></head>

<body>

<?php echo $this->fetch('top.html'); ?>


<div class="sbg01">
    
    <div class="swrap">
                   <?php echo $this->fetch('header.html'); ?>
            
        <div class="main clearfix">
            <!--begin:left左侧内容区域{{{-->
            <div class="col3 fl">
                <div class="boxMain">
                    
                    <h3 class="payHall clearfix">
                        <span>充值中心</span>
                        <div class="breadcrumb clearfix">
                            <a href="/">首页</a>&nbsp;&gt;&nbsp;<a href="pay.php">充值中心</a>
                        </div>
                    </h3>
                    <div class="cBox clearfix">
                        <div class="payContent">
                            <div class="step clearfix">
                                <img src="/templates/ali/style/img/step.gif" />
                            </div>

                            
                            <div class="payTop">
                                <!--begin:nav充值网银列表{{{-->
								<form id="pay_form" name="pay_form" method="post" action="?action=pay_ok" onsubmit="return check_form()">
								 
                                <div class="payNav fl">
                                    <h3>请选择充值方式</h3>
                                    <ul>
                                        <li>
										<?php $_from = $this->_var['paymode_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'paymode');if (count($_from)):
    foreach ($_from AS $this->_var['paymode']):
?>
										<a href="javascript:void(0);" onclick="setPaymode(<?php echo $this->_var['paymode']['mode_id']; ?>,'<?php echo $this->_var['paymode']['mode_name']; ?>','<?php echo $this->_var['paymode']['mode_depict']; ?>',<?php echo $this->_var['paymode']['mode_money_per']; ?>,'<?php echo $this->_var['paymode']['mode_no']; ?>')" id="mode<?php echo $this->_var['paymode']['mode_id']; ?>"><?php echo $this->_var['paymode']['mode_name']; ?></a>
										<?php if ($this->_var['paymode']['mode_is_default'] == 1): ?>
					<script type="text/javascript">
						mode_id=<?php echo $this->_var['paymode']['mode_id']; ?>;
						mode_name='<?php echo $this->_var['paymode']['mode_name']; ?>';
						mode_depict='<?php echo $this->_var['paymode']['mode_depict']; ?>';
						mode_per=<?php echo $this->_var['paymode']['mode_money_per']; ?>;
						mode_no='<?php echo $this->_var['paymode']['mode_no']; ?>';
					</script>
				<?php endif; ?>
			<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
										
                                        </li>
                                    </ul>
                                </div>
                                

                                
                                <div class="payMain fr">
                              
                                    
                                    <div class="step1"><a name="step1"></a>
                                        <div class="tip_t"></div>
                                        <div class="tip_b">
                                            <h4>您当前选择的是“<strong id="mode_name" class="c_o"></strong>”支付方式</h4>
											<input type="hidden" id="mode_id" name="mode_id" value="0" />
											
                        <p id="pay_type_content">
                            获得玛岸币比例为 1:10，即1元人民币等于10个玛岸币，建议您充值时填写当前使用的手机号码，以便在遇到问题时我们能及时与您沟通。<br />
<span id="mode_depict" class="c_o2"></span></p>
                                            
                                        </div>
                                    </div>
                                    

                                    
                                    <div class="step2"><a name="step2"></a>
                                        <h3>请选择您要充值到哪里</h3>
                                        <div id="div_game" class="step2_div">
                                            <p class="selectGame">
											<select id="game_id" name="game_id" onchange="changeGame(this.options[selectedIndex].value)" class="select_t">
                              <label for=""> <option value="0">请选择游戏</option></label>
							  <?php $_from = $this->_var['game_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'game');if (count($_from)):
    foreach ($_from AS $this->_var['game']):
?>
							  <option value="<?php echo $this->_var['game']['game_id']; ?>" <?php if ($this->_var['game_id'] == $this->_var['game']['game_id']): ?>selected<?php endif; ?>><?php echo $this->_var['game']['game_name']; ?></option>
							  <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                            </select>
										
											<span id="sp_game"></span>
											
                            
							<span id="sp_server"></span>
                                            </p>
                                            <!--begin:popup游戏列表弹窗{{{-->
                                          
                                            
                                            
                                            
                                            <!--begin:popup服务器列表弹窗{{{-->
                                            
                                            
                                        </div>
                                    </div>
                                    
                                    
                                    <div class="step3">
                                        <h3>请填写并确认账号信息</h3>
                                        <div class="step3_div">
                                            <p>
                                                <label for="">充值账号：</label>
                                                <var class=""><input type="text" class="i" id="game_user" name="game_user" value="<?php echo $this->_var['login']['username']; ?>" onblur="check_user()"></var>
                                                <em>*</em>
                                                <span id="sp_user">请填写您的目标账号</span>
                                            </p>
                                            <p>
                                                <label for="">确认账号：</label>
                                                <var class=""><input type="text" class="i" id="game_user2" name="game_user2" value="<?php echo $this->_var['login']['username']; ?>" onblur="check_user2()"></var>
                                                <em>*</em>
                                                <span id="sp_user2">请确认您充值的账号</span>
                                            </p>
                                            <p class="elV">
                                                <label for="">游戏角色：</label>
                                                <var class=""><input type="text" class="i" id="game_role" name="game_role" value="" onblur="check_role()"></var>
												<span id="sp_role">游戏角色名</span>
                                            </p>
											<p class="elV">
                                                <label for="">手机号码：</label>
                                                <var class=""><input type="text" class="i" id="tel" name="tel"></var>
                                   
                                        </div>
                                        <div  class="step3_div" style="display:none;">
                                            <div class="cardDiv">
                                               <label for="">选择银行：</label>
							<select id="bankId" name="tobank">
								<option value="CCB">建设银行</option>
								<option value="BCOM">交通银行</option>
								<option value="ABC">农业银行</option>
								<option value="ICBC">工商银行</option>
								<option value="CMB">招商银行</option>
								<option value="POST">邮政储蓄</option>
								<option value="CMBC">民生银行</option>
								<option value="BOC">中国银行</option>
								<option value="CZB">浙商银行</option>
								<option value="SPDB">上海浦东发展银行</option>
								
							</select>
                                            </div>
                                            <p class="yu"><a href="#" target="_blank">点击查看卡内余额</a><var id="qyinfo"></var></p>
                                        </div>
                                    </div>
                                    
                                    
                                    <div class="step4">
                                        <h3><strong></strong>请选择金额</h3>
                                        <div class="step4_div">
                                            <p>
                                                <label for="">选择充值套餐：</label>
                                                <select id="money" name="money" onchange="setGold(this.options[selectedIndex].value)">
								<option value="1">1</option>
								<option value="10">10</option>
								<option value="20">20</option>
								<option value="30">30</option>
								<option value="40">40</option>
								<option value="50">50</option>
								<option value="100" selected="selected">100</option>
								<option value="150">150</option>
								<option value="200">200</option>
								<option value="250">250</option>
								<option value="300">300</option>
								<option value="500">500</option>
								<option value="800">800</option>
								<option value="1000">1000</option>
								<option value="1500">1500</option>
								<option value="2000">2000</option>
								<option value="3000">3000</option>
								<option value="5000">5000</option>
								<option value="10000">10000</option>
							</select>
                                            </p>
                                            <p>
                                                <label for="">获得游戏货币：</label>
                                                <em id="gold_cnt">1000</em>
                            <em id="gold_str">玛岸币</em> 
                                            </p>
                                            
                                        </div>
                                    </div>
                                    
									<input type="hidden" name="time" value=""/>
    <input type="hidden" name="sign" value=""/>
                                    <button type="submit" id="btnPay" class="next">确定下一步</button>
                                    <p class="kp"><a target="_blank" href="#">开票流程说明&gt;&gt;</a></p>
                                </form>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
            

            <!--begin:right右侧区域{{{-->
            <div class="col2 fr">
                <div class="box3">
                    
                    <h3 class="tutorialTh">
                        <span>充值教程</span>
                    </h3>
                    <div class="cBox c3">
                        <div class="tutorPic">
                            <img src="/images/tPic.jpg" />
                            <a class="tBtn" href="#" target="_blank">点击查看</a>
                        </div>
                    </div>
                    
                                        <div id="site_faq"></div>
                                   <h3 class="csTh"><span>客服中心</span></h3>
<div class="cBox c4">
   
   <div class="gClient">
      <ul class="clearfix">
          <li>客服QQ： <em>68131546</em></li>
          <li>服务邮箱：<span class="STYLE1">68131546@qq.com</span></li>
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
	//默认方式
	setPaymode(mode_id,mode_name,mode_depict,mode_per,mode_no);
	
	//默认游戏
	<?php if ($this->_var['game_id'] > 0): ?>
		changeGame(<?php echo $this->_var['game_id']; ?>);
	<?php endif; ?>

	function setPaymode(id,name,depict,per,payway){
		//样式
		old_id=$("#mode_id")[0].value;
		if(old_id>0){
			$("#mode"+old_id).removeClass("current");
		}
		$("#mode"+id).addClass("current");
	
		$("#mode_id").val(id);
		$("#mode_name").html(name);
		$("#mode_depict").html(mode_depict);
		$("#mode_per").html(per+'%');
		$("#mode_no").val(payway);
		
		
		//gold
		mode_per=per;
		setGold($("#money")[0].value);
		
		//bank
		if(id==1){
			$("#bank").show();
		}
		else{
			$("#bank").hide();
		}
	}
	function setGold(money){
		gold=money*gold_per*(mode_per/100);
		$("#gold_cnt").html(gold);
		$("#gold_str").html(gold_name);
	}
	function changeGame(id){
		//服务器列表
		getServer(id);
		
		//游戏信息
		$.ajax({
			url:'pay.php',
			data:"action=get_gameinfo&game_id="+id,
			type:'get',
			dataType:'json',
			success:function(result){
				//alert(result.name);
				if(result.role=='1'){
					$("#for_role").show();
				}else{
					$("#for_role").hide();
				}
				gold_name=result.name;
				gold_per=result.per;
				
				//gold
				setGold($("#money")[0].value);
			}
		});
	}
	function getServer(id){
		var sid=<?php echo $this->_var['server_id']; ?>;
		$.ajax({
			url:'pay.php',
			data:"action=get_server&game_id="+id+"&server_id="+sid,
			type:'get',
			dataType:'text',
			success:function(result){
				//alert(result);
				$("#server_id").empty();
				$("#server_id").append('<option value="0">请选择服务器</option>');
				$("#server_id").append(result);
			}
		});
	}

	//ajax
	function check_user(){
		var user=$("#game_user")[0].value;
		if(user==""){
			$("#sp_user").html("<em>*</em>请输入充值帐号");
			return false;
		}
		$.ajax({
			type:"GET",
			url:"user.php?action=check_member_username&member_username="+encodeURI(user)+"&r="+Math.random(), dataType:"text",async:false,success:function (e){
			if (e==1) {
				$("#sp_user").html("");
			}else{
				$("#sp_user").html("<em>*</em>充值帐号不存在");
			}
		}});
	}
	function check_user2(){
		if($("#game_user")[0].value!=$("#game_user2")[0].value){
			$("#sp_user2").html("<em>*</em>两次充值帐号不一样");
			return false;
		}
		$("#sp_user2").html("");
	}
	
	function check_form(){
		if($("#game_id")[0].value==0){
			$("#sp_game").html("<em>*</em>请选择充值游戏");
			return false;
		}
		if($("#server_id")[0].value==0){
			$("#sp_server").html("<em>*</em>请选择充值服务器");
			return false;
		}
		if($("#game_user")[0].value==""){
			$("#sp_user").html("<em>*</em>请输入充值帐号");
			return false;
		}
		if($("#game_user")[0].value!=$("#game_user2")[0].value){
			$("#sp_user2").html("<em>*</em>两次充值帐号不一样");
			return false;
		}
		return true;
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
