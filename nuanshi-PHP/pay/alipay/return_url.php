<?php
require_once("alipay.config.php");
require_once("alipay_notify.class.php");

//计算得出通知验证结果
$alipayNotify = new AlipayNotify($aliapy_config);
$verify_result = $alipayNotify->verifyReturn();
if($verify_result) {
	//验证成功
	$html="支付成功";
}
else {
    //验证失败
	$html="支付失败";
}
?>
<html>
<head>
<title>充值中心</title>
</head>
<body>
	<?php echo $html; ?>
</body>
</html>
