<?php
require_once("alipay.config.php");
require_once("alipay_notify.class.php");

//计算得出通知验证结果
$alipayNotify = new AlipayNotify($aliapy_config);
$verify_result = $alipayNotify->verifyNotify();

if($verify_result) {
	//验证成功
    //获取支付宝的通知返回参数，可参考技术文档中服务器异步通知参数列表
    $out_trade_no	= $_POST['out_trade_no'];
    $trade_no		= $_POST['trade_no'];
    $total_fee		= $_POST['total_fee'];
	
	//游戏订单处理
	require_once('/hi_ports/charge_gateway.php');
	game_charge_gateway($out_trade_no);

    if($_POST['trade_status'] == 'TRADE_FINISHED') {
		//注意：
		//该种交易状态只在两种情况下出现
		//1、开通了普通即时到账，买家付款成功后。
		//2、开通了高级即时到账，从该笔交易成功时间算起，过了签约时的可退款时限（如：三个月以内可退款、一年以内可退款等）后。
    }
    else if ($_POST['trade_status'] == 'TRADE_SUCCESS') {
		//注意：
		//该种交易状态只在一种情况下出现——开通了高级即时到账，买家付款成功后。
    }
	echo "success";
}
else {
    //验证失败
    echo "fail";
}
?>