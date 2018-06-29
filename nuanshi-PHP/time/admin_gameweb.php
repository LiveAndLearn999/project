<?php

//游戏官网列表
if($do=='gameweblist'){
    check_permissions('gameweb_read');
	$gameweb_list=array();
	$sql="SELECT * FROM ".$db_prefix."gameweb";
	$page_size=30;
	$page_current=isset($_GET['page'])?intval($_GET['page']):1;
	$count=$GLOBALS['db']->getcount($sql);
	$res=$GLOBALS['db']->getall($sql." order by id desc limit ".(($page_current-1)*$page_size).",".$page_size);
	if($count>0){
			$no=$count-(($page_current-1)*$page_size);
			foreach($res as $row){
				$gameweb_list[$row['id']]['id']=$row['id'];
				$gameweb_list[$row['id']]['title']=$row['title'];
				$gameweb_list[$row['id']]['gametemp']=$row['gametemp'];
				$gameweb_list[$row['id']]['domain']=$row['domain'];
				$no--;
			}
			$pagebar=pagebar(get_self(),"action=gameweb&do=gameweblist&",$page_current,$page_size,$count);
	}else{
			$pagebar="";
	}
	
$smarty=new smarty();smarty_header();
$smarty->assign('gameweb_list',$gameweb_list);
$smarty->assign('pagebar',$pagebar);
$smarty->display('gameweb_list.htm');
}
//添加
if($do=='gameweb_add'){
	check_permissions('gameweb_write');
	$gameweb=array();
	$gameweb['title']='';
	$gameweb['keywords']='';
	$gameweb['description']='';
	$gameweb['gameid']='';
	$gameweb['gametemp']='';
	$gameweb['domain']='';
	$game=game_array_list();
	$smarty=new smarty();smarty_header();
	$smarty->assign('game',$game);
	$smarty->assign('gameweb',$gameweb);
	$smarty->assign('mode','insert');
	$smarty->display('gameweb_info.html');
}
if($do=='gameweb_insert'){
	check_permissions('gameweb_write');
	$gameweb_title=empty($_POST['title'])?'':addslashes(trim($_POST['title']));
	$gameweb_gameid=empty($_POST['gameid'])?0:intval($_POST['gameid']);
	$gameweb_keywords=empty($_POST['keywords'])?'':addslashes(trim($_POST['keywords']));
	$gameweb_description=empty($_POST['description'])?'':addslashes(trim($_POST['description']));
	$gameweb_domain=empty($_POST['domain'])?'':addslashes(trim($_POST['domain']));
	$gameweb_gametemp=empty($_POST['gametemp'])?0:intval($_POST['gametemp']);
	

	if(empty($gameweb_title)){
		message(array('text'=>'网站名称不能为空','link'=>''));
	}

	$insert=array();
	$insert['title']=$gameweb_title;
	$insert['gameid']=$gameweb_gameid;
	$insert['keywords']=$gameweb_keywords;
	$insert['description']=$gameweb_description;
	$insert['domain']=$gameweb_domain;
	$insert['gametemp']=$gameweb_gametemp;
	
	
	$db->insert($db_prefix."gameweb",$insert);
	$card_id=$db->insert_id();
	admin_log('insert','gameweb',$gameweb_title);
	clear_cache();
	message(array('text'=>'添加官网成功！','link'=>'?action=gameweb&do=gameweblist'));
}
//编辑
if($do=='gameweb_edit'){
	check_permissions('gameweb_write');
	$gameweb_id=empty($_GET['gameweb_id'])?0:intval($_GET['gameweb_id']);
	$row=$db->getone("SELECT * FROM ".$db_prefix."gameweb WHERE id=$gameweb_id");
	
	$gameweb=array();
	$gameweb['id']=$row['id'];
	$gameweb['title']=$row['title'];
	$gameweb['gameid']=$row['gameid'];
	$gameweb['keywords']=$row['keywords'];
	$gameweb['description']=$row['description'];
	$gameweb['domain']=$row['domain'];
	$gameweb['gametemp']=$row['gametemp'];
	
	
	$game=game_array_list();
	
	$smarty=new smarty();smarty_header();
	$smarty->assign('game',$game);
	$smarty->assign('gameweb',$gameweb);
	$smarty->assign('mode','update');
	$smarty->display('gameweb_info.html');
}
//更新
if($do=='gameweb_update'){

	check_permissions('gameweb_write');
	$gameweb_id=empty($_POST['id'])?0:intval($_POST['id']);
	$gameweb_title=empty($_POST['title'])?'':addslashes(trim($_POST['title']));
	$gameweb_gameid=empty($_POST['gameid'])?0:intval($_POST['gameid']);
	$gameweb_keywords=empty($_POST['keywords'])?'':addslashes(trim($_POST['keywords']));
	$gameweb_description=empty($_POST['description'])?'':addslashes(trim($_POST['description']));
	$gameweb_domain=empty($_POST['domain'])?'':addslashes(trim($_POST['domain']));
	$gameweb_gametemp=empty($_POST['gametemp'])?0:intval($_POST['gametemp']);
	
	if(empty($gameweb_title)){
		message(array('text'=>'网站名称不能为空','link'=>''));
	}
	
	$update=array();
	$update['title']=$gameweb_title;
	
	$update['gameid']=$gameweb_gameid;
	$update['keywords']=$gameweb_keywordsgameweb_keywords;
	$update['description']=$gameweb_description;
	$update['domain']=$gameweb_domain;
	$update['gametemp']=$gameweb_gametemp;
	
	
	$db->update($db_prefix."gameweb",$update,"id=$gameweb_id");
	admin_log('update','gameweb',$gameweb_title);
	clear_cache();
	message(array('text'=>'更新网站成功！','link'=>'?action=gameweb&do=gameweblist'));
}
//删除
if($do=='gameweb_delete'){
	check_permissions('gameweb_delete');
	$gameweb_id=empty($_GET['gameweb_id'])?0:intval($_GET['gameweb_id']);
	
	
	
	$db->delete($db_prefix."gameweb","id=$gameweb_id");
	
	admin_log('delete','gameweb',$id);
	clear_cache();
	message(array('text'=>'删除网站成功！','link'=>'?action=gameweb&do=gameweblist'));
}
?>
