<?php
require_once'../includes/global.php';
require_once'../languages/'.$config['site_language'].'/admin.php';
$action	=empty($_GET['action'])?'':trim($_GET['action']);
$do=empty($_GET['do'])?'':trim($_GET['do']);
if($action==''){
	include'admin_default.php';
	exit;
}
if($action=='start'){
	include'admin_start.php';
	exit;
}
if($action=='config'){
	include'admin_config.php';
	exit;
}
if($action=='content'){
	include'admin_content.php';
	exit;
}
if($action=='game'){
	include'admin_game.php';
	exit;
}
if($action=='member'){
	include'admin_member.php';
	exit;
}
if($action=='template'){
	include'admin_template.php';
	exit;
}
if($action=='other'){
	include'admin_other.php';
	exit;
}
if($action=='plugin'){
	include'admin_plugin.php';
	exit;
}
if($action=='gameweb'){
	include'admin_gameweb.php';
	exit;
}
if($action=='upload'){
	$attachment=upload($_FILES['filedata']);
	echo"{'err':'','msg':'uploads/".$attachment."'}";
	exit;
}
function smarty_header(){
	$GLOBALS['smarty']->template_dir	=ROOT_PATH.'templates/admin';
	$GLOBALS['smarty']->cache_dir		=ROOT_PATH.'temps/cache';
	$GLOBALS['smarty']->compile_dir	=ROOT_PATH.'temps/compile';
	$GLOBALS['smarty']->assign('language',$GLOBALS['language']);
	$GLOBALS['smarty']->assign('config',$GLOBALS['config']);
}
function message($message=array()){
	$smarty=new smarty();
	$smarty->template_dir	=ROOT_PATH.'templates/'.$GLOBALS['config']['site_template'];
	$smarty->cache_dir		=ROOT_PATH.'temps/cache';
	$smarty->compile_dir	=ROOT_PATH.'temps/compile';
	$smarty->assign('language',$GLOBALS['language']);
	$smarty->assign('config',$GLOBALS['config']);
	$smarty->assign('message',$message);
	$smarty->display('message.html');
	exit;
}

function get_group_list(){
	$array=array();
	$res=$GLOBALS['db']->getall("SELECT * FROM ".$GLOBALS['db_prefix']."member_group ORDER BY group_id ASC");
	foreach($res as $row){
		$array[$row['group_id']]=$row['group_id'];
		$array[$row['group_id']]=$row['group_name'];
	}
	return $array;
}
function get_channel_name($channel_id){
	if(empty($channel_id))return'';
	$row=$GLOBALS['db']->getone("SELECT channel_name FROM ".$GLOBALS['db_prefix']."content_channel WHERE channel_id='$channel_id'");
	return $row[0];
}
function get_content_title($content_id){
	if(empty($content_id))return'';
	$row=$GLOBALS['db']->getone("SELECT content_title FROM ".$GLOBALS['db_prefix']."content WHERE content_id='$content_id'");
	return $row[0];
}
function get_group_name($group_id){
	if(empty($group_id))return'';
	$row=$GLOBALS['db']->getone("SELECT group_name FROM ".$GLOBALS['db_prefix']."member_group WHERE group_id='$group_id'");
	return $row[0];
}
function get_menu_name($menu_id){
	if(empty($menu_id))return'';
	$row=$GLOBALS['db']->getone("SELECT menu_name FROM ".$GLOBALS['db_prefix']."menu WHERE menu_id='$menu_id'");
	return $row[0];
}
function get_admin_name($admin_id){
	if(empty($admin_id))return'';
	$row=$GLOBALS['db']->getone("SELECT admin_name FROM ".$GLOBALS['db_prefix']."admin WHERE admin_id='$admin_id'");
	return $row[0];
}
function get_ad_name($ad_id){
	if(empty($ad_id))return'';
	$row=$GLOBALS['db']->getone("SELECT ad_name FROM ".$GLOBALS['db_prefix']."ad WHERE ad_id='$ad_id'");
	return $row[0];
}
function get_vote_title($vote_id){
	if(empty($vote_id))return'';
	$row=$GLOBALS['db']->getone("SELECT vote_title FROM ".$GLOBALS['db_prefix']."vote WHERE vote_id='$vote_id'");
	return $row[0];
}
function get_link_name($link_id){
	if(empty($link_id))return'';
	$row=$GLOBALS['db']->getone("SELECT link_name FROM ".$GLOBALS['db_prefix']."link WHERE link_id='$link_id'");
	return $row[0];
}
function get_link_logo($link_id){
	if(empty($link_id))return'';
	$row=$GLOBALS['db']->getone("SELECT link_logo FROM ".$GLOBALS['db_prefix']."link WHERE link_id='$link_id'");
	return $row[0];
}
function admin_log($action,$do,$text){
	$info=$GLOBALS['language']['log_action'][$action].$GLOBALS['language']['log_do'][$do].(empty($text)?'':':'.$text);
	$insert=array();
	$insert['log_time']=$_SERVER['REQUEST_TIME'];
	$insert['log_info']=$info;
	$insert['log_ip']=get_ip();
	$insert['log_agent']=$_SERVER['HTTP_USER_AGENT'];
	$insert['admin_id']=$_SESSION['admin_id'];
	$GLOBALS['db']->insert($GLOBALS['db_prefix']."admin_log",$insert);
}
function get_vote_children($vote_id){
	$array=array();
	$res=$GLOBALS['db']->getall("SELECT * FROM ".$GLOBALS['db_prefix']."vote_item WHERE vote_id='".$vote_id."' ORDER BY item_id ASC");
	foreach($res as $row){
		$array[$row['item_id']]['id']=$row['item_id'];
		$array[$row['item_id']]['title']=$row['item_title'];
		$array[$row['item_id']]['count']=$row['item_count'];
	}
	return $array;
}
function get_menu_list(){
	$array=array();
	$res=$GLOBALS['db']->getall("SELECT * FROM ".$GLOBALS['db_prefix']."menu WHERE parent_id=0 ORDER BY menu_id ASC");
	foreach($res as $row){
		$array[$row['menu_id']]=$row['menu_id'];
		$array[$row['menu_id']]=$row['menu_name'];
	}
	return $array;
}
function get_page_list(){
	$array=array();
	$res=$GLOBALS['db']->getall("SELECT * FROM ".$GLOBALS['db_prefix']."page WHERE parent_id=0 ORDER BY page_id ASC");
	foreach($res as $row){
		$array[$row['page_id']]=$row['page_id'];
		$array[$row['page_id']]=$row['page_title'];
	}
	return $array;
}
function get_page_title($page_id){
	if(empty($page_id))return'';
	$row=$GLOBALS['db']->getone("SELECT page_title FROM ".$GLOBALS['db_prefix']."page WHERE page_id='$page_id'");
	return $row[0];
}
function check_repeat($table,$field,$field_value){
	if(empty($table)||empty($field))return false;
	$count=$GLOBALS['db']->getcount("SELECT * FROM ".$GLOBALS['db_prefix'].$table." WHERE ".$field."='".$field_value."'");
	if($count>0){
		return false;
	}else{
		return true;
	}
}
function check_login(){
	if(empty($_SESSION['admin_id'])||$_SESSION['admin_id']<1){
		message(array('text'=>$GLOBALS['language']['please_login'],'link'=>get_self()));
	}
}
function check_permissions($permissions){
	check_login();
	$admin_permissions=$_SESSION['admin_permissions'];
	if($admin_permissions!='all'){
		$admin_permissions_state=false;
		$admin_permissions_explode=explode(",",$admin_permissions);
		foreach($admin_permissions_explode as $value){
			if($value==$permissions){
				$admin_permissions_state=true;
			}
		}
		if($admin_permissions_state==false){
			$REFERER=$_SERVER['HTTP_REFERER'];
			if(!empty($REFERER)){
				message(array('text'=>$GLOBALS['language']['permissions_not_enough'],'link'=>$REFERER));
			}else{
				message(array('text'=>$GLOBALS['language']['permissions_not_enough'],'link'=>get_self()));
			}

		}
	}
}
function pagebar($page_name,$page_parameters='',$page_current,$page_size,$count){
	parse_str($page_parameters);
	$page_count		=ceil($count/$page_size);
	$page_start		=$page_current-4;
	$page_end		=$page_current+4;
	if($page_current<5){
		$page_start	=1;
		$page_end	=5;
	}
	if($page_current>$page_count-4){
		$page_start	=$page_count-8;
		$page_end	=$page_count;
	}
	if($page_start<1)$page_start=1;
	if($page_end>$page_count)$page_end=$page_count;
	$html="";
	$html.="<div class=\"pagebar\">";
	$html.="<span class=\"info\">".$page_current." / ".$page_count."</span>";
	if($page_current!=1){
			$html.="<a href='".$page_name."?".$page_parameters."page=1'>&laquo;</a>";
	}
	for($i=$page_start;$i<=$page_end;$i++){
		if($i==$page_current){
			$html.="<span class=\"current\">".$i."</span>";
		}else{
			$html.="<a href='".$page_name."?".$page_parameters."page=".$i."'>".$i."</a>";
		}
	}
	if($page_current!=$page_count){
			$html.="<a href='".$page_name."?".$page_parameters."page=".$page_count."'>&raquo;</a>";
	}
	$html.="</div>";
	return $html;
}
?>