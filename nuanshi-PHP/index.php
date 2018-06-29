<?php
require_once'includes/global.php';
require_once(ROOT_PATH.'languages/'.$config['site_language'].'/front.php');
require_once'includes/front.php';
set_online(create_uri("index"));

$smarty=new smarty();smarty_header(true);
$cache_id = sprintf('%X', crc32(ROOT_PATH));
if (!$smarty->is_cached('index.html',$cache_id)){
	$smarty->assign('here',here('index'));
	$smarty->assign('login',get_login());
	$smarty->assign('game_focus',get_game_focus());
	$smarty->assign('game_best',get_game_best());
	$smarty->assign('game_hot',get_game_hot());
	$smarty->assign('game_list',game_array_list('',5));
	$smarty->assign('game_new',get_game_new());
	$smarty->assign('game_news',get_game_news());
	$smarty->assign('game_show',get_game_show());
	$smarty->assign('news',get_news());
	$smarty->assign('ggnews',get_ggnews());
	$smarty->assign('xwnews',get_xwnews());
	$smarty->assign('wtnews',get_wtnews());
	$smarty->assign('faq',content_array_list(2,5));
	$smarty->assign('link',get_link());
    
	
	$member_id=get_user('userid');
	$smarty->assign('member',get_user_info($member_id));
	$smarty->assign('gamelog',get_gamelog($member_id));
	
}
//ƹ

//var_dump($member_id);
$sp=empty($_GET['sp'])?'':trim(addslashes($_GET['sp']));
if(!empty($sp)){
	setcookie("sp", $sp, time()+600);
}
$online=online();


$smarty->assign('online',$online);
$smarty->display('index.html',$cache_id);

function get_game_focus(){
    return game_array_list('game_is_focus=1',6);
}
function get_game_best(){
    return game_array_list('game_is_best=1',3);
}
function get_game_hot(){
    return game_array_list('game_is_hot=1',3);
}
function get_game_new(){
    return game_array_list('game_is_hot=1',8);
}
function get_game_news(){
    return server_array_list('','9');
}
function get_ggnews(){
    return content_array_list(3,10);
}
function get_xwnews(){
    return content_array_list(1,6);
}
function get_wtnews(){
    return content_array_list(2,6);
}
function get_game_show(){
    return game_array_list('game_is_show=1',10);
}
function get_news(){
    return content_array_list(4,10);
}
function get_link(){
	$array=array();
	$res=$GLOBALS['db']->getall("SELECT * FROM ".$GLOBALS['db_prefix']."link WHERE link_state=1 ORDER BY link_sort ASC,link_id ASC");
	if($res){
		foreach($res as $row){
			$array[$row['link_id']]['id']=$row['link_id'];
			$array[$row['link_id']]['name']=$row['link_name'];
			$array[$row['link_id']]['logo']=$row['link_logo'];
			$array[$row['link_id']]['text']=$row['link_text'];
			$array[$row['link_id']]['url']=$row['link_url'];
		}
	}
	return $array;
}
?>