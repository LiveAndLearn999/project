<?php
//后台默认首页
if($do==''){
	check_login();
	$system_info=array();
	$system_info['SERVER_TIME']=date("Y-m-d H:i:s",$_SERVER['REQUEST_TIME']);
	$system_info['SERVER_PORT']=$_SERVER['SERVER_PORT'];
	$system_info['PHP_OS']=@PHP_OS;
	$system_info['SERVER_NAME']=$_SERVER['SERVER_NAME'];
	$system_info['SERVER_SOFTWARE']=$_SERVER['SERVER_SOFTWARE'];
	$system_info['DB_VERSION']=$db->version();
	$system_info['DOCUMENT_ROOT']=$_SERVER['DOCUMENT_ROOT'];
	$system_info['UPLOAD_MAX_FILESIZE']=@ini_get('upload_max_filesize');
	$hysql="SELECT * FROM ".$db_prefix."member";
	$hyres=$GLOBALS['db']->getcount($hysql);
	$tj['hysj']=$hyres;
	$tj['cz']=0;
	$czsql="SELECT sum(pay_money) as total FROM ".$db_prefix."pay WHERE `pay_state`=1";
	$czres=$GLOBALS['db']->getone($czsql);
	if($czres){
		$tj['cz']=$czres[0];
	}
	
	
	
	$yxsql="SELECT * FROM ".$db_prefix."game";
	$yxres=$GLOBALS['db']->getcount($yxsql);
	$tj['yx']=$yxres;
	$tgsql="SELECT * FROM ".$db_prefix."member WHERE `group_id`=1";
	$tgres=$GLOBALS['db']->getcount($tgsql);
	$tj['tg']=$tgres;
	$smarty=new smarty();smarty_header();
	$smarty->assign('tj',$tj);
	$smarty->assign('system_info',$system_info);
	$smarty->display('start.htm');
}
//操作日志列表
if($do=='log_list'){
	//check_login();
	check_permissions('all');
	$log_list=array();
	$sql="SELECT * FROM ".$db_prefix."admin_log";
	$page_size=30;
	$page_current=isset($_GET['page'])?intval($_GET['page']):1;
	$count=$GLOBALS['db']->getcount($sql);
	$res=$GLOBALS['db']->getall($sql." order by log_time desc limit ".(($page_current-1)*$page_size).",".$page_size);
	if($count>0){
			$no=$count-(($page_current-1)*$page_size);
			foreach($res as $row){
				$log_list[$no]['no']=$no;
				$log_list[$no]['time']=date("Y-m-d H:i:s",$row['log_time']);
				$log_list[$no]['info']=$row['log_info'];
				$log_list[$no]['ip']=$row['log_ip'];
				$log_list[$no]['address']=get_ip_address($row['log_ip']);
				$log_list[$no]['agent']=get_os($row['log_agent'])."/".get_bs($row['log_agent']);
				$log_list[$no]['admin']=get_admin_name($row['admin_id']);
				$no--;
			}
			$pagebar=pagebar(get_self(),"action=start&do=log_list&",$page_current,$page_size,$count);
	}else{
			$pagebar="";
	}
	$smarty=new smarty();smarty_header();
	$smarty->assign('log_list',$log_list);
	$smarty->assign('pagebar',$pagebar);
	$smarty->display('log_list.htm');
}
//清空操作日志
if($do=='log_clear'){
	check_permissions('all');
	$db->delete($db_prefix."admin_log","log_time<UNIX_TIMESTAMP(NOW())-259200");
	admin_log('clear','log','');
	message(array('text'=>$language['log_clear_is_success'],'link'=>'?action=start&do=log_list'));
}
//清空缓存
if($do=='clear_cache'){
	check_login();
	clear_cache();
	admin_log('clear','cache','');
	message(array('text'=>$language['clear_cache_is_succes'],'link'=>'?action=start'));
}
//在线用户
if($do=='online_list'){
	check_login();
	$online_list=array();
	$sql="SELECT * FROM ".$db_prefix."online";
	$page_size=30;
	$page_current=isset($_GET['page'])?intval($_GET['page']):1;
	$count=$GLOBALS['db']->getcount($sql);
	$res=$GLOBALS['db']->getall($sql." order by online_time desc limit ".(($page_current-1)*$page_size).",".$page_size);
	if($count>0){
			$no=$count-(($page_current-1)*$page_size);
			foreach($res as $row){
				$online_list[$no]['no']=$no;
				$online_list[$no]['time']=date("Y-m-d H:i:s",$row['online_time']);
				$online_list[$no]['url']=$row['online_url'];
				$online_list[$no]['ip']=$row['online_ip'];
				$online_list[$no]['address']=get_ip_address($row['online_ip']);
				$online_list[$no]['agent']=$row['online_agent'];
				$no--;
			}
			$pagebar=pagebar(get_self(),"action=start&do=online_list&",$page_current,$page_size,$count);
	}else{
			$pagebar="";
	}
	$smarty=new smarty();smarty_header();
	$smarty->assign('online_list',$online_list);
	$smarty->assign('pagebar',$pagebar);
	$smarty->display('online_list.htm');
}
//备份数据库
if($do=='bakup'){
	check_login();
	$content=$db->getdata();
	header("Cache-Control:public");
	header("Pragma:public");
	header("Content-type:application/octet-stream");
	header("Content-Disposition:attachment;filename=".date('Y-m-d').".sql");
	header("Content-Length:". strlen($content));
	echo $content;
	exit;
}
//留言列表
if($do=='feedback_list'){
	check_permissions('feedback_read');
	$feedback_list=array();
	$sql="SELECT * FROM ".$db_prefix."feedback";
	$page_size=30;
	$page_current=isset($_GET['page'])?intval($_GET['page']):1;
	$count=$GLOBALS['db']->getcount($sql);
	$res=$GLOBALS['db']->getall($sql." order by feedback_id desc limit ".(($page_current-1)*$page_size).",".$page_size);
	if($count>0){
			$no=$count-(($page_current-1)*$page_size);
			foreach($res as $row){
				$feedback_list[$row['feedback_id']]['no']=$no;
				$feedback_list[$row['feedback_id']]['id']=$row['feedback_id'];
				$feedback_list[$row['feedback_id']]['time']=date("Y-m-d H:i:s",$row['feedback_time']);
				$feedback_list[$row['feedback_id']]['name']=$row['feedback_name'];
				$feedback_list[$row['feedback_id']]['ip']=$row['feedback_ip'];
				$feedback_list[$row['feedback_id']]['address']=get_ip_address($row['feedback_ip']);
				$feedback_list[$row['feedback_id']]['content']=htmlspecialchars($row['feedback_content']);
				$feedback_list[$row['feedback_id']]['reply']=htmlspecialchars($row['feedback_reply']);
				$feedback_list[$row['feedback_id']]['state']=$row['feedback_state'];
				$no--;
			}
			$pagebar=pagebar(get_self(),"action=start&do=feedback_list&",$page_current,$page_size,$count);
	}else{
			$pagebar="";
	}
	$smarty=new smarty();smarty_header();
	$smarty->assign('feedback_list',$feedback_list);
	$smarty->assign('pagebar',$pagebar);
	$smarty->display('feedback_list.htm');
}
//留言编辑
if($do=='feedback_edit'){
	check_permissions('feedback_write');
	$feedback_id=empty($_GET['feedback_id'])?'':intval($_GET['feedback_id']);
	$row=$db->getone("SELECT * FROM ".$db_prefix."feedback WHERE feedback_id='$feedback_id'");
	$feedback=array();
	$feedback['id']=$row['feedback_id'];
	$feedback['name']=$row['feedback_name'];
	$feedback['content']=$row['feedback_content'];
	$feedback['reply']=$row['feedback_reply'];
	$feedback['state']=$row['feedback_state'];
	$smarty=new smarty();smarty_header();
	$smarty->assign('feedback',$feedback);
	$smarty->assign('mode','update');
	$smarty->display('feedback_info.htm');
}
//留言更新
if($do=='feedback_update'){
	check_permissions('feedback_write');
	$feedback_id=empty($_POST['feedback_id'])?'':intval($_POST['feedback_id']);
	$feedback_name=empty($_POST['feedback_name'])?'':addslashes(trim($_POST['feedback_name']));
	$feedback_content=empty($_POST['feedback_content'])?'':addslashes(trim($_POST['feedback_content']));
	$feedback_reply=empty($_POST['feedback_reply'])?'':addslashes(trim($_POST['feedback_reply']));
	$feedback_state=empty($_POST['feedback_state'])?0:intval($_POST['feedback_state']);
	$update=array();
	$update['feedback_name']=$feedback_name;
	$update['feedback_content']=$feedback_content;
	$update['feedback_reply']=$feedback_reply;
	$update['feedback_state']=$feedback_state;
	if(!empty($feedback_reply)){
		$update['feedback_reply_time']=$_SERVER['REQUEST_TIME'];
	}
	$db->update($db_prefix."feedback",$update,"feedback_id=$feedback_id");
	admin_log('update','feedback',$feedback_name);
	clear_cache();
	message(array('text'=>$language['feedback_update_is_success'],'link'=>'?action=start&do=feedback_list'));
}
//删除留言
if($do=='feedback_delete'){
	check_permissions('feedback_delete');
	$feedback_id=empty($_GET['feedback_id'])?'':intval($_GET['feedback_id']);
	$db->delete($db_prefix."feedback","feedback_id=$feedback_id");
	admin_log('delete','feedback','');
	clear_cache();
	message(array('text'=>$language['feedback_delete_is_success'],'link'=>'?action=start&do=feedback_list'));
}
?>