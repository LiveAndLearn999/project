<?php
header("Content-type:image/png");
$border = 1; //是否要边框 1要:0不要
$how = 4; //验证码位数
$w = $how*16; //图片宽度
$h = 24; //图片高度
$fontsize = 12; //字体大小
$alpha = "abcdefghijkmnopqrstuvwxyz"; //验证码内容1:字母
$number = "023456789"; //验证码内容2:数字
$randcode = ""; //验证码字符串初始化
srand((double)microtime()*1000000); //初始化随机数种子
$im = imagecreate($w, $h); //创建验证图片
$bgcolor = imagecolorallocate($im, 255, 255, 255); //设置背景颜色
imagefill($im, 0, 0, $bgcolor); //填充背景色
if($border){
	$black = imagecolorallocate($im, 180, 180, 180); //设置边框颜色
	imagerectangle($im, 0, 0, $w-1, $h-1, $black);//绘制边框
}
for($i=0; $i<$how; $i++){ //逐位产生随机字符  
	$alpha_or_number = mt_rand(0, 1); //字母还是数字
	$str = $alpha_or_number ? $alpha : $number;
	$which = mt_rand(0, strlen($str)-1); //取哪个字符
	$code = substr($str, $which, 1); //取字符
	$j = !$i ? 4 : $j+15; //绘字符位置
	$color3 = imagecolorallocate($im, mt_rand(0,150), mt_rand(0,100), mt_rand(0,140)); //字符随即颜色
	imagechar($im, $fontsize, $j, 3, $code, $color3); //绘字符
	$randcode .= $code; //逐位加入验证码字符串
}
session_start();
$_SESSION['authcode']=$randcode;
for($i=0; $i<5; $i++){//绘背景干扰线
	$color1 = imagecolorallocate($im, mt_rand(0,255), mt_rand(0,255), mt_rand(0,255)); //干扰线颜色
	imagearc($im, mt_rand(-5,$w), mt_rand(-5,$h), mt_rand(20,300), mt_rand(20,200), 55, 44, $color1); //干扰线
}   
for($i=0; $i<$how*20; $i++){//绘背景干扰点
	$color2 = imagecolorallocate($im, mt_rand(0,255), mt_rand(0,255), mt_rand(0,255)); //干扰点颜色 
	imagesetpixel($im, mt_rand(0,$w), mt_rand(0,$h), $color2); //干扰点
}
imagepng($im);
imagedestroy($im);
?>