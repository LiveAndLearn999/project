<?php
require_once('includes/global.php');
require_once(ROOT_PATH.'languages/'.$config['site_language'].'/front.php');
require_once('includes/front.php');
if (empty($_GET['id'])){
	//exit();
	$channel_id=1;
}else{
	$channel_id=intval($_GET['id']);
}

//获取频道信息
$channel_info=get_channel_info($channel_id);
//检查是否锁定
if($channel_info['state']==0){
	message(array('text'=>$language['channel_is_lock'],'link'=>''));
}
//检查频道权限
if(!check_permissions($channel_info['read_permissions'])){
	message(array('text'=>$language['permissions_is_not_enough'],'link'=>''));
}

$smarty=new smarty();smarty_header($channel_info['cache']!=1?false:true);
$parameters=array();
$parameters['id']=$channel_id;
$online=online();

$smarty->assign('online',$online);
$smarty->assign('here',here('channel',$parameters));
$smarty->assign('channel_info',$channel_info);
$smarty->assign('channel_content',get_channel_list());

$smarty->assign('login',get_login());
$smarty->assign('faq',content_array_list(2,5));
$smarty->display('news.html');

//获取频道内容列表
function get_channel_list(){
	$content_list=array();
	if (empty($_GET['id'])){
	$sql="select * from ".$GLOBALS['db_prefix']."content where content_state=1 and content_is_best=0 ";
}else{
	$sql="select * from ".$GLOBALS['db_prefix']."content where content_state=1 and content_is_best=0 and channel_id='".$GLOBALS['channel_id']."'";
}
	
	if($category_id!=''){
		$sql.=" and ".create_sql_in(category_id_list($category_id,$GLOBALS['channel_id']),'category_id');
	}
	$page_size=20;
	$page_current=isset($_GET['page'])?intval($_GET['page']):1;
	$count=$GLOBALS['db']->getcount($sql);
	$res=$GLOBALS['db']->getall($sql." order by content_id desc limit ".(($page_current-1)*$page_size).",".$page_size);
	if($count>0){
			$no=$count-(($page_current-1)*$page_size);
			foreach($res as $row){
				$content_list[$row['content_id']]['no']=$no;
				$content_list[$row['content_id']]['id']=$row['content_id'];
				$content_list[$row['content_id']]['channel_id']=$row['channel_id'];
				
				$content_list[$row['content_id']]['category_id']=$row['category_id'];
				$content_list[$row['content_id']]['channel_name']=get_channel_name($row['channel_id']);
				$content_list[$row['content_id']]['nickname']=get_member_nickname($row['member_id']);
				$content_list[$row['content_id']]['title']=$row['content_title'];
				$content_list[$row['content_id']]['color']=$row['color'];
				$content_list[$row['content_id']]['time']=date("Y-m-d H:i:s",$row['content_time']);
				$content_list[$row['content_id']]['click_count']=$row['content_click_count'];
				$content_list[$row['content_id']]['comment_count']=$row['content_comment_count'];
				$content_list[$row['content_id']]['thumb']=$row['content_thumb'];
				if(substr($row['content_thumb'],0,4)=='http'){
					$content_list[$row['content_id']]['thumb_http']=true;
				}else{
					$content_list[$row['content_id']]['thumb_http']=false;
				}
				$content_list[$row['content_id']]['text']=$row['content_text'];
				$content_list[$row['content_id']]['content_description']=$row['content_description'];
				$content_list[$row['content_id']]['short_text']=truncate(strip_tags($row['content_text']),100);
				$content_list[$row['content_id']]['password']=$row['content_password'];
				$content_list[$row['content_id']]['is_new']=date("Ymd",$row['content_time'])==date("Ymd")?true:false;
				$content_list[$row['content_id']]['member_id']=$row['member_id'];
				$content_list[$row['content_id']]['url']=create_uri('content',array('id'=>$row['content_id']));
				if(empty($row['content_url'])){
					$content_list[$row['content_id']]['url']=create_uri('content',array('id'=>$row['content_id']));
					$content_list[$row['content_id']]['target']=false;
				}else{
					$content_list[$row['content_id']]['url']=$row['content_url'];
					$content_list[$row['content_id']]['target']=true;
				}
				$content_list[$row['content_id']]['category_url']=create_uri('channel',array('id'=>$row['channel_id'],'category_id'=>$row['category_id']));
				$no--;
			}
			$parameters="id=".$GLOBALS['channel_id']."&";
			if(!empty($GLOBALS['category_id'])){
				$parameters.="category_id=".$GLOBALS['category_id']."&";
			}
			$pagebar=pagebar("news",$parameters,$page_current,$page_size,$count);
	}else{
			$pagebar="";
	}
	$member_id=get_user('userid');
	$GLOBALS['smarty']->assign('game_news',server_array_list('',9));
	$GLOBALS['smarty']->assign('member',get_user_info($member_id));
	$GLOBALS['smarty']->assign('content_list',$content_list);
	$GLOBALS['smarty']->assign('pagebar',$pagebar);
	$GLOBALS['smarty']->assign('game_best',game_array_list('game_is_best=1',3));
}
?>