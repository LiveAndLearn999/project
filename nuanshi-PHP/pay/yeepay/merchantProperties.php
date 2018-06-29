<?php
#商户编号p1_MerId,以及密钥merchantKey 需要从易宝支付平台获得
$p1_MerId		= "10001126856";
$merchantKey	= "69cl522AV6q613Ii4W6u8K6XuW8vM1N6bFgyv769220IuYe9u37N4y7rI4Pl";

#接收支付成功数据的地址
$callbackUrl	= "http://127.0.0.1:8080/pay/yeepay/callback.php";

#日志文件
$logName		= "YeePay_HTML.log";

#产品通用接口正式请求地址
#$reqURL_onLine = "https://www.yeepay.com/app-merchant-proxy/node";
#产品通用接口测试请求地址
$reqURL_onLine = "http://tech.yeepay.com:8080/robot/debug.action";

#业务类型
$p0_Cmd = "Buy";

#送货地址
$p9_SAF = "0";
?> 