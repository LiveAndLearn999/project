<?php
require_once'../includes/class_file.php';

//模板列表
if($do=='template_list'){
	check_permissions('template_read');
	$path=empty($_GET['path'])?'':addslashes(trim($_GET['path']));
	if($path==''){
		$path="../templates/ali/";
	}else{
		if(substr($path,10,4)!='kele'){
			message(array('text'=>'您没有权限操作此目录！','link'=>''));
			exit;
		}
		$path.="/";
	}
	
	$fo=new fileoperate();
	$dir_list=array();
	$dir_list=$fo->list_file($path,2);
	$file_list=array();
	$file_list=$fo->list_file($path,3);
	
	$smarty=new smarty();smarty_header();
	$smarty->assign('path',$path);
	$smarty->assign('dir_list',$dir_list);
	$smarty->assign('file_list',$file_list);
	$smarty->display('template_list.html');
}

//编辑模板
if($do=='template_edit'){
	check_permissions('template_write');
	$path=empty($_GET['path'])?'':addslashes(trim($_GET['path']));
	if($path==''){
		exit;
	}
	$ext=get_ext($path);
	if(!check_ext($ext,'htm,html,css,js,xml')){
		message(array('text'=>'文件类型不支持在线编辑！','link'=>''));
		exit;
	}
	
	$fo=new fileoperate();
	$content=$fo->read_file($path);
	
	$smarty=new smarty();smarty_header();
	$smarty->assign('path',$path);
	$smarty->assign('content',$content);
	$smarty->display('template_info.html');
}
//保存
if($do=='template_update'){
	check_permissions('template_write');
	$path=empty($_POST['path'])?'':addslashes(trim($_POST['path']));
	$content=empty($_POST['content'])?'':trim($_POST['content']);
	if($path==''){
		exit;
	}
	
	$fo=new fileoperate();
	$fo->write_file($path, $content);
	
	admin_log('update','template',$path);
	message(array('text'=>'编辑模板成功！','link'=>'?action=template&do=template_list'));
}
?>