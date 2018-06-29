<?php
require_once('includes/global.php');
require_once(ROOT_PATH.'languages/'.$config['site_language'].'/front.php');
require_once('includes/front.php');

$action=isset($_GET['action'])?$_GET['action']:'';
$game_id=empty($_GET['game_id'])?0:intval($_GET['game_id']);
if($game_id>0){
	redirect('card.php?action=card_list&id='.$game_id);
	exit;
}

$smarty=new smarty();smarty_header();

if($action=='card_list'){
	$game_id=empty($_GET['id'])?0:intval($_GET['id']);
	$game_name=empty($_GET['name'])?'':addslashes(trim($_GET['name']));
	 $res = $GLOBALS['db']->getall("SELECT  * FROM ".$GLOBALS['db_prefix']."card WHERE card_state=1 AND card_game_id=$game_id ORDER BY card_id DESC");
	$card_list=array();
    if($res){
	foreach($res as $row){
		$card_list[$row['card_id']]['id']=$row['card_id'];
		$card_list[$row['card_id']]['name']=$row['card_name'];
		$card_list[$row['card_id']]['card_time']=time();
		$card_list[$row['card_id']]['user_name']=get_user('username');
		$card_list[$row['card_id']]['card_game_no']=$row['card_no'];
		$card_list[$row['card_id']]['card_sid']=$row['card_sid'];
		$card_list[$row['card_id']]['card_sign']=md5(get_user('username').$row['card_key'].time());
		$card_list[$row['card_id']]['card_depict']=$row['card_depict'];
		$card_list[$row['card_id']]['card_fs']=$row['card_fs'];
		$card_list[$row['card_id']]['link']=$row['card_link'];
		$card_list[$row['card_id']]['count']=get_card_count($row['card_id'],'');
		$card_list[$row['card_id']]['frees']=get_card_count($row['card_id'],'number_state=0');
	}
	}else{
	
	$arr=get_card_list($game_id);
	
	foreach($arr as $key=>$value)
{
if(is_array($value))
    {
        foreach($value as $mainkey=>$mainvalue)
        {
		
		$card_list[]=$mainvalue;
		
		
		}
		}
}
	}
	
	$online=online();
$smarty->assign('online',$online);
$member_id=get_user('userid');
$smarty->assign('game_news',server_array_list('','9'));
$smarty->assign('member',get_user_info($member_id));
$smarty->assign('game_id',$game_id);
	$smarty->assign('login',get_login());
	$smarty->assign('faq',content_array_list(2,5));
	$smarty->assign('game_name',$game_name);
	$smarty->assign('card_list',$card_list);
	$smarty->display('card_show.html');
	exit;
}
if($action=='get_card'){
	login_passed();	
	$card_id=empty($_GET['id'])?0:intval($_GET['id']);
	print_r($card_id);
	$member_username=get_user('username');	
	$row=$GLOBALS['db']->getone("SELECT * FROM ".$GLOBALS['db_prefix']."card WHERE card_id=$card_id");
	$lqcard=get_card($member_username, $card_id);
	$cardno=$lqcard['no'];
	//print_r($lqcard);
	if(!$lqcard['ret']=1){
	 message(array('text'=>'<p><span><var>错误！</var>领取失败！</span></p>','link'=>''));
	}else{
	$insert=array();
	 $insert['card_id']=$card_id;
	 $insert['card_number']=$cardno;
	 $insert['number_state']=1;
	 $insert['number_add_time']=date("Y-m-d H:i:s");
	 $insert['number_get_time']=date("Y-m-d H:i:s");
	 $insert['number_get_user']=$member_username;
	 $db->insert($db_prefix."card_number",$insert);
	 message(array('text'=>'<h4>恭喜您领取成功，请妥善保管！</h4><p>卡号：<em>'.$cardno."</em><br>我们还将该激活码以系统消息的方式发送到您的新手卡箱，如有遗忘，<br>请到用户中心-<a href=/user.php?action=card>短信箱</a>查收</p>",'link'=>'','jump'=>'0'));
	}
	
	
	
	

	exit;
}
if($action=='get_card_ajax'){
	login_passed();	
	$card_id=empty($_GET['id'])?0:intval($_GET['id']);
	print_r($card_id);
	$member_username=get_user('username');	
	$row=$GLOBALS['db']->getone("SELECT * FROM ".$GLOBALS['db_prefix']."card WHERE card_id=$card_id");
	$lqcard=get_card($member_username, $card_id);
	$cardno=$lqcard['no'];
	//print_r($lqcard);
	if(!$lqcard['ret']=1){
	 message(array('text'=>'<p><span><var>错误！</var>领取失败！</span></p>','link'=>''));
	}else{
	$insert=array();
	 $insert['card_id']=$card_id;
	 $insert['card_number']=$cardno;
	 $insert['number_state']=1;
	 $insert['number_add_time']=date("Y-m-d H:i:s");
	 $insert['number_get_time']=date("Y-m-d H:i:s");
	 $insert['number_get_user']=$member_username;
	 $db->insert($db_prefix."card_number",$insert);
	 echo $cardno;
	
	}
	
	
	
	

	exit;
}
$online=online();
$smarty->assign('online',$online);
//card
$member_id=get_user('userid');

$smarty->assign('game_news',server_array_list('','9'));
$smarty->assign('member',get_user_info($member_id));
$smarty->assign('login',get_login());
$smarty->assign('faq',content_array_list(2,5));
$smarty->assign('game_list',game_array_list('',''));
$smarty->display('card.html');
?>