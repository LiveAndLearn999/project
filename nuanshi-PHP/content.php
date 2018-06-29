<?php
require_once('includes/global.php');
require_once(ROOT_PATH.'languages/'.$config['site_language'].'/front.php');
require_once('includes/front.php');
if (isset($_GET['id'])){
    $content_id=intval($_GET['id']);
}else{
	exit();
}
$content_info=get_content_info($content_id);
if(count($content_info)==0){
	message(array('text'=>$language['content_is_not_exist'],'link'=>''));
}
if($content_info['state']==0){
	message(array('text'=>$language['content_is_lock'],'link'=>''));
}
$channel_info=get_channel_info($content_info['channel_id']);
if(!check_permissions($channel_info['read_permissions'])){
	message(array('text'=>$language['permissions_is_not_enough'],'link'=>''));
}
$db->query("UPDATE ".$db_prefix."content SET content_click_count=content_click_count+1 WHERE content_id='".$content_id."'");
//set_online(create_uri("content",array('id'=>$content_id)));
$smarty=new smarty();smarty_header($channel_info['cache']!=1?false:true);
$parameters=array();
$parameters['id']=$content_id;
$smarty->assign('here',here('content',$parameters));
$online=online();
$member_id=get_user('userid');

$smarty->assign('member',get_user_info($member_id));
$smarty->assign('online',$online);
$smarty->assign('channel_info',$channel_info);
$smarty->assign('content_info',$content_info);
$smarty->assign('content',get_content());
$smarty->assign('login',get_login());
$smarty->assign('faq',content_array_list(2,5));
$smarty->assign('game_best',game_array_list('game_is_best=1',3));
$smarty->assign('game_news',server_array_list('',9));
$smarty->display('content.html');

function get_content(){
	$GLOBALS['smarty']->assign('content_info',$GLOBALS['content_info']);
	$GLOBALS['smarty']->assign('prev',prev_content($GLOBALS['content_info']['id'],$GLOBALS['content_info']['channel_id']));
	$GLOBALS['smarty']->assign('next',next_content($GLOBALS['content_info']['id'],$GLOBALS['content_info']['channel_id']));
}
function prev_content($content_id,$channel_id){
	$row=$GLOBALS['db']->getone("select content_id,content_title,content_url from ".$GLOBALS['db_prefix']."content WHERE content_id>".$content_id." and content_state!=0 and channel_id='".$channel_id."' ORDER BY content_id ASC LIMIT 0,1");
	if($row){
		return array(
			'id'=>$row['content_id'],
			'title'=>$row['content_title'],
			'url'=>!empty($row['content_url'])?$row['content_url']:create_uri("content",array('id'=>$row['content_id'])),
			'target'=>empty($row['content_url'])?true:false
			);
	}else{
		return "";
	}
}
function next_content($content_id,$channel_id){
	$row=$GLOBALS['db']->getone("select content_id,content_title,content_url from ".$GLOBALS['db_prefix']."content WHERE content_id<".$content_id." and content_state!=0 and channel_id='".$channel_id."' ORDER BY content_id DESC LIMIT 0,1");
	if($row){
		return array(
			'id'=>$row['content_id'],
			'title'=>$row['content_title'],
			'url'=>empty($row['content_url'])?create_uri("content",array('id'=>$row['content_id'])):$row['content_url'],
			'target'=>empty($row['content_url'])?true:false
			);
	}else{
		return "";
	}
}
?>