<?php
require_once('includes/global.php');
require_once(ROOT_PATH.'languages/'.$config['site_language'].'/front.php');
require_once('includes/front.php');

$smarty=new smarty();smarty_header();
$online=online();
$member_id=get_user('userid');

$smarty->assign('member',get_user_info($member_id));
$smarty->assign('game_news',server_array_list('',9));
$smarty->assign('online',$online);
$smarty->assign('login',get_login());
$smarty->assign('faq',content_array_list(2,8));
$smarty->display('service.html');
?>