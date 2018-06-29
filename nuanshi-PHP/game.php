<?php
require_once('includes/global.php');
require_once(ROOT_PATH.'languages/'.$config['site_language'].'/front.php');
require_once('includes/front.php');
$member_id=get_user('userid');
$action=isset($_GET['action'])?$_GET['action']:'';
//play
if($action=='play'){
	login_passed();
	$game_id=empty($_GET['game_id'])?0:intval($_GET['game_id']);
	$server_id=empty($_GET['server_id'])?0:intval($_GET['server_id']);
	$extra=empty($_GET['extra'])?'':trim($_GET['extra']);
	
	if($game_id==0||$server_id==0){
		exit;
	}
	$server_info=get_server_info($server_id);
	if(!$server_info){
		message(array('text'=>'服务器不存在，请重新选择！','link'=>''));
	}
	if($server_info['server_state']==1){
		$trunon=$server_info['server_trunon_date']." ".$server_info['server_trunon_hour'].":00:00";
		if(strtotime($trunon)>time()){
			message(array('text'=>'服务器将在 <span style="color:red;">'.$trunon.'</span> 开启，请稍候！','link'=>''));
		}
		else{
			//开服状态
			$update=array();
			$update['server_state']=3;
			$db->update($db_prefix."server",$update,"server_id=$server_id");
		}
	}
	if($server_info['server_state']==2){
		message(array('text'=>'服务器维护中，请稍候！','link'=>''));
	}
	
	//member
	$member_id=get_user('userid');
	$member_username=get_user('username');
	
	//gamelog
	$count=$GLOBALS['db']->getcount("select * from ".$GLOBALS['db_prefix']."gamelog where log_user_id=$member_id and log_server_id=$server_id");
	if($count==0){
		$insert=array();
		$insert['log_user_id']=$member_id;
		$insert['log_game_id']=$game_id;
		$insert['log_server_id']=$server_id;
		$insert['log_server_name']=$server_info['server_name'];
		$insert['log_time']=time();
		$insert['log_ip']=get_ip();
		$db->insert($db_prefix."gamelog",$insert);
	}
	else{
		$update=array();
		$update['log_time']=time();
		$update['log_ip']=get_ip();
		$db->update($db_prefix."gamelog",$update,"log_user_id=$member_id and log_server_id=$server_id");
	}
	
	//游戏接口处理
	require_once('hi_ports/login_gateway.php');
	game_login_gateway($member_id,$member_username,$server_info,$extra);
	message(array('text'=>'开始进入游戏。。。','link'=>'','jump'=>'0'));
}

$smarty=new smarty();smarty_header(true);

//server_list
if($action=='server_list'){
	if (isset($_GET['game_id'])){
		$game_id=intval($_GET['game_id']);
	}else{
		exit();
	}
	$smarty->assign('member',get_user_info($member_id));
	$smarty->assign('game_id',$game_id);
	$smarty->assign('login',get_login());
	$smarty->assign('faq',content_array_list(2,5));
	$smarty->assign('game_name',get_game_name($game_id));
	$smarty->assign('game_log',get_game_log($game_id));
	$smarty->assign('server_list',server_array_list('game_id='.$game_id,''));
	$smarty->assign('game_list',game_array_list('',''));
	$smarty->assign('game_fst',game_array_list('game_is_hot=1',1));
	$smarty->assign('allnews',content_array_alllist(10));
	$smarty->assign('news',content_array_list('4',10));
	$smarty->assign('game_news',server_array_list('',9));
	$smarty->assign('game_focus',game_array_list('game_is_focus=1',1));
	$smarty->display('server.html');
	exit;
}
//game_list
$game_list=array();
	
	$sql="SELECT * FROM ".$db_prefix."game";
	$page_size=12;
	$page_current=isset($_GET['page'])?intval($_GET['page']):1;
	$count=$GLOBALS['db']->getcount($sql);
	$res=$GLOBALS['db']->getall($sql." order by game_id desc limit ".(($page_current-1)*$page_size).",".$page_size);
	if($count>0){
			$no=$count-(($page_current-1)*$page_size);
			foreach($res as $row){
						
				$game_list[$row['game_id']]['game_id']=$row['game_id'];
			$game_list[$row['game_id']]['game_no']=$row['game_no'];
			$game_list[$row['game_id']]['server_name']=get_server_name($row['game_id']);
			$game_list[$row['game_id']]['server_id']=get_server_id($row['game_id']);
			$game_list[$row['game_id']]['server_trunon_date']=get_server_trunon_date($row['game_id']);
			$game_list[$row['game_id']]['game_name']=$row['game_name'];
			$game_list[$row['game_id']]['game_logo']=$row['game_logo'];
			$game_list[$row['game_id']]['game_logo2']=$row['game_logo2'];
			$game_list[$row['game_id']]['game_logo3']=$row['game_logo3'];
			$game_list[$row['game_id']]['game_logo4']=$row['game_logo4'];
			$game_list[$row['game_id']]['game_logo5']=$row['game_logo5'];
			$game_list[$row['game_id']]['game_logo6']=$row['game_logo6'];
			$game_list[$row['game_id']]['game_logo7']=$row['game_logo7'];
			$game_list[$row['game_id']]['game_logo8']=$row['game_logo8'];
			$game_list[$row['game_id']]['game_logo9']=$row['game_logo9'];
			$game_list[$row['game_id']]['game_depict']=truncate($row['game_depict'],100);
			$game_list[$row['game_id']]['game_website']=$row['game_website'];
			$game_list[$row['game_id']]['game_bbs']=$row['game_bbs'];
			$game_list[$row['game_id']]['game_freshman']=$row['game_freshman'];
			$game_list[$row['game_id']]['port_config1']=$row['game_port_config1'];
				
				
				
				$no--;
			}
			$pagebar=pagebar("game",$parameters,$page_current,$page_size,$count);
			
	}else{
			$pagebar="";
	}



$smarty->assign('member',get_user_info($member_id));
	$smarty->assign('login',get_login());
	$smarty->assign('faq',content_array_list(2,5));
	$smarty->assign('game_list',$game_list);
	$smarty->assign('pagebar',$pagebar);
	$smarty->assign('game_fst',game_array_list('game_is_hot=1',1));
	$smarty->assign('allnews',content_array_alllist(10));
	$smarty->assign('news',content_array_list('4',10));
	$smarty->assign('game_news',server_array_list('',9));
	$smarty->assign('game_focus',game_array_list('game_is_focus=1',6));
    $smarty->assign('news',content_array_list(4,10));
	$smarty->assign('ggnews',content_array_list(3,10));
$online=online();
$smarty->assign('online',$online);
$smarty->display('game.html',$cache_id);

?>