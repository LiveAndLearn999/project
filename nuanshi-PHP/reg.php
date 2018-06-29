<?php
require_once('includes/global.php');
require_once(ROOT_PATH.'languages/'.$config['site_language'].'/front.php');
require_once('includes/front.php');

//推广
$sp=empty($_GET['sp'])?'':trim(addslashes($_GET['sp']));
if(!empty($sp)){
	setcookie("sp", $sp, time()+600);
}

if(empty($_SESSION['oauth_id'])||empty($_SESSION['oauth_account'])){
	unset($_SESSION['oauth_id'],$_SESSION['oauth_account']);
}
$oauth_id=$_SESSION['oauth_id'];
$oauth_account=$_SESSION['oauth_account'];

$smarty=new smarty();smarty_header();
$smarty->assign('sp',$sp);
$smarty->assign('oauth_id',$oauth_id);
$smarty->assign('oauth_account',$oauth_account);
$smarty->display('reg.html');
?>