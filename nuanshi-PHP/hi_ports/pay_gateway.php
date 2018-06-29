<?php
/**
 *支付接口处理类
*/
function pay_gateway($mode_id, $order_no, $money, $channel){
	//debug
	/*if(true){
		require_once('charge_gateway.php');
		game_charge_gateway($order_no);
		exit;
	}*/
	
	//支付方式
	$modeinfo=get_paymode_info($mode_id);
	
	//支付接口
	switch ($modeinfo['no'])
	{
	case 'YEEPAY':
		$typeId="";
		$typeCode=$channel;
		yeepay($order_no,$money,$typeId,$typeCode);
		break;
	case 'YEEPAY-SZX':
		$typeId='SZX-NET';
		$typeCode=$channel;
		yeepay($order_no,$money,$typeId,$typeCode);
		break;
	case 'YEEPAY-UNICOM':
		$typeId='UNICOM-NET';
		$typeCode=$channel;
		yeepay($order_no,$money,$typeId,$typeCode);
		break;
	case 'YEEPAY-TELECOM':
		$typeId='TELECOM-NET';
		$typeCode=$channel;
		yeepay($order_no,$money,$typeId,$typeCode);
		break;
	case 'YEEPAY-SNDACARD':
		$typeId='SNDACARD-NET';
		$typeCode=$channel;
		yeepay($order_no,$money,$typeId,$typeCode);
		break;
	}
}

//易宝
function yeepay($order_no, $money, $typeId, $typeCode){
	require_once(ROOT_PATH."/pay/yeepay/yeepayCommon.php");
	
	$p2_Order		= $order_no;
	$p3_Amt			= $money;
	$p4_Cur			= "CNY";
	$p5_Pid			= "GAME";
	$p6_Pcat		= "";
	$p7_Pdesc		= "";
	$p8_Url			= $callbackUrl;
	$pa_MP			= "";
	$pd_FrpId		= $typeId;
	$pr_NeedResponse= "1";
	
	//调用签名函数生成签名串
	$hmac = getReqHmacString($p2_Order,$p3_Amt,$p4_Cur,$p5_Pid,$p6_Pcat,$p7_Pdesc,$p8_Url,$pa_MP,$pd_FrpId,$pr_NeedResponse);
	$html_text = '';
	$html_text.='<html>';
	$html_text.='<head><title>pay</title></head>';
	$html_text.='<body onLoad="document.pay.submit();">';
	$html_text.='<form name="pay" action="'.$reqURL_onLine.'" method="post">';
	$html_text.='<input type="hidden" name="p0_Cmd" value="'.$p0_Cmd.'">';
	$html_text.='<input type="hidden" name="p1_MerId" value="'.$p1_MerId.'">';
	$html_text.='<input type="hidden" name="p2_Order" value="'.$p2_Order.'">';
	$html_text.='<input type="hidden" name="p3_Amt" value="'.$p3_Amt.'">';
	$html_text.='<input type="hidden" name="p4_Cur" value="'.$p4_Cur.'">';
	$html_text.='<input type="hidden" name="p5_Pid" value="'.$p5_Pid.'">';
	$html_text.='<input type="hidden" name="p6_Pcat" value="'.$p6_Pcat.'">';
	$html_text.='<input type="hidden" name="p7_Pdesc" value="'.$p7_Pdesc.'">';
	$html_text.='<input type="hidden" name="p8_Url" value="'.$p8_Url.'">';
	$html_text.='<input type="hidden" name="p9_SAF" value="'.$p9_SAF.'">';
	$html_text.='<input type="hidden" name="pa_MP" value="'.$pa_MP.'">';
	$html_text.='<input type="hidden" name="pd_FrpId" value="'.$pd_FrpId.'">';
	$html_text.='<input type="hidden" name="pr_NeedResponse" value="'.$pr_NeedResponse.'">';
	$html_text.='<input type="hidden" name="hmac" value="'.$hmac.'">';
	$html_text.='</form>';
	$html_text.='</body>';
	$html_text.='</html>';
	echo $html_text;
	exit;
}
?>