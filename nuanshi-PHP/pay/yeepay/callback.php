<?php
include('../../includes/global.php');
include('../../languages/'.$config['site_language'].'/front.php');
include('../../includes/front.php');

include 'yeepayCommon.php';	
$return = getCallBackValue($r0_Cmd,$r1_Code,$r2_TrxId,$r3_Amt,$r4_Cur,$r5_Pid,$r6_Order,$r7_Uid,$r8_MP,$r9_BType,$hmac);
$bRet = CheckHmac($r0_Cmd,$r1_Code,$r2_TrxId,$r3_Amt,$r4_Cur,$r5_Pid,$r6_Order,$r7_Uid,$r8_MP,$r9_BType,$hmac);

#校验码正确
if($bRet){
	if($r1_Code=="1"){
		//游戏订单处理
		include('../../hi_ports/charge_gateway.php');
		$ret=game_charge_gateway($r6_Order);
		
		$n=1;
		//处理失败时重复5次
		while($ret!=1 && $n<=5){
			$ret=game_charge_gateway($r6_Order);
			$n++;
		}
		
		//更新订单状态
		if($ret==1){
			$update=array();
			$update['pay_state']=1;
			$db->update($db_prefix."pay",$update,"pay_order_no='".$r6_Order."'");
		}
		
		if($r9_BType=="1"){
			//echo "交易成功";
			//echo  "<br />在线支付页面返回";
		}elseif($r9_BType=="2"){
			echo "success";
			//echo "<br />交易成功";
			//echo  "<br />在线支付服务器返回";      			 
		}
	}
	$html="支付成功";
}else{
	echo "fail";
	$html="支付失败";
}
?>
<html>
<head>
<title>充值中心</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head>
<body>
	<div style="text-align:center; font-size:24px; font-weight:bold;"><?php echo $html; ?></div>
	<div style="text-align:center; font-size:12px; line-height:300%;"><a href="/user.php">返回用户中心</a></div>
</body>
</html>