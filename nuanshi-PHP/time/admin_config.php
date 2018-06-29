<?php
//系统配置
if($do==''||$do=='config'){
	check_permissions('config');
	$tempdate_dir=$language_dir=array();
	if($handle=opendir("../templates")){
		$i=1;
		while(false!==($dir=readdir($handle))){
			if ($dir!="."&&$dir!=".."&&$dir!="admin"){
				if(is_dir("../templates/".$dir)){
					$tempdate_dir[$i]['no']=$i;
					$tempdate_dir[$i]['folder']=$dir;
					$tempdate_dir[$i]['thumb']="../templates/".$dir."/thumb.png";
					$tempdate_dir[$i]['info']=file_get_contents("../templates/".$dir."/info.txt");
					$i++;
				}
			}

		}
		closedir($handle);
	}
	if($handle=opendir("../languages")){
		$i=1;
		while(false!==($dir=readdir($handle))){
			if ($dir!="."&&$dir!=".."){
				if(is_dir("../languages/".$dir)){
					$language_dir[$i]['no']=$i;
					$language_dir[$i]['folder']=$dir;
					$language_dir[$i]['info']=file_get_contents("../languages/".$dir."/info.txt");
					$i++;
				}
			}
		}
		closedir($handle);
	}
	$smarty=new smarty();smarty_header();
	$smarty->assign("config",$config);
	$smarty->assign("template_dir",$tempdate_dir);
	$smarty->assign("language_dir",$language_dir);
	$smarty->display('config.htm');
}
//更新系统配置处理
if($do=='config_update'){
	check_permissions('config');
	$site_name=empty($_POST['site_name'])?'':trim($_POST['site_name']);
	$update=array();
	//基本设置
	$update['site_name']=$site_name;
	$update['site_icp']=empty($_POST['site_icp'])?'':trim($_POST['site_icp']);
	$update['site_keywords']=empty($_POST['site_keywords'])?'':addslashes(trim($_POST['site_keywords']));
	$update['site_description']=empty($_POST['site_description'])?'':addslashes(trim($_POST['site_description']));
	$update['site_notice']=empty($_POST['site_notice'])?'':trim($_POST['site_notice']);
	$update['site_state']=empty($_POST['site_state'])?'no':trim($_POST['site_state']);
	$update['site_close_text']=empty($_POST['site_close_text'])?'':trim($_POST['site_close_text']);
	$update['site_ip']=empty($_POST['site_ip'])?'':trim($_POST['site_ip']);
	$update['site_badwords']=empty($_POST['site_badwords'])?'':trim($_POST['site_badwords']);
	$update['site_language']=empty($_POST['site_language'])?'chinese':$_POST['site_language'];
	$update['site_template']=empty($_POST['site_template'])?'default':$_POST['site_template'];
	//控制设置
	$update['online_time']=empty($_POST['online_time'])?30:intval($_POST['online_time']);
	$update['rewrite_state']=empty($_POST['rewrite_state'])?'no':trim($_POST['rewrite_state']);
	$update['feedback_state']=empty($_POST['feedback_state'])?'no':trim($_POST['feedback_state']);
	$update['feedback_size']=empty($_POST['feedback_size'])?'no':trim($_POST['feedback_size']);
	$update['comment_state']=empty($_POST['comment_state'])?'no':trim($_POST['comment_state']);
	$update['member_state']=empty($_POST['member_state'])?'no':trim($_POST['member_state']);
	$update['member_validation_state']=empty($_POST['member_validation_state'])?'no':$_POST['member_validation_state'];
	//显示设置
	$update['index_comment_size']=empty($_POST['index_comment_size'])?10:intval($_POST['index_comment_size']);
	$update['index_comment_content_size']=empty($_POST['index_comment_content_size'])?18:intval($_POST['index_comment_content_size']);	$update['content_hot_size']=empty($_POST['content_hot_size'])?10:intval($_POST['content_hot_size']);
	$update['content_hot_title_size']=empty($_POST['content_hot_title_size'])?18:intval($_POST['content_hot_title_size']);
	$update['content_best_size']=empty($_POST['content_best_size'])?10:intval($_POST['content_best_size']);
	$update['content_best_title_size']=empty($_POST['content_best_title_size'])?18:intval($_POST['content_best_title_size']);
	$update['comment_size']=empty($_POST['comment_size'])?10:intval($_POST['comment_size']);
	$update['search_size']=empty($_POST['search_size'])?10:intval($_POST['search_size']);

	//邮件服务器设置
	$update['smtp_server']=empty($_POST['smtp_server'])?'':addslashes(trim($_POST['smtp_server']));
	$update['smtp_port']=empty($_POST['smtp_port'])?'':addslashes(trim($_POST['smtp_port']));
	$update['smtp_user']=empty($_POST['smtp_user'])?'':addslashes(trim($_POST['smtp_user']));
	$update['smtp_password']=empty($_POST['smtp_password'])?'':addslashes(trim($_POST['smtp_password']));
	//水印缩图设置
	$update['image_thumb_open']=empty($_POST['image_thumb_open'])?'no':addslashes(trim($_POST['image_thumb_open']));
	$update['image_thumb_width']=empty($_POST['image_thumb_width'])?100:intval($_POST['image_thumb_width']);
	$update['image_thumb_height']=empty($_POST['image_thumb_height'])?100:intval($_POST['image_thumb_height']);
	$update['image_text_open']=empty($_POST['image_text_open'])?'no':addslashes(trim($_POST['image_text_open']));
	$update['image_pos']=empty($_POST['image_pos'])?1:intval($_POST['image_pos']);
	if($update['rewrite_state']=='yes'){
		if(strpos(strtolower($_SERVER['SERVER_SOFTWARE']),'microsoft-iis/7')){
			$rewrite='<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="index">
                    <match url="^index.html$" />
                    <action type="Rewrite" url="index.php" />
                </rule>
                <rule name="index">
                    <match url="^sitemap.xml$" />
                    <action type="Rewrite" url="sitemap.php" />
                </rule>
                <rule name="content">
                    <match url="^content-([0-9]+).html$" />
                    <action type="Rewrite" url="content.php?id={R:1}" />
                </rule>
                <rule name="content-page">
                    <match url="^content-([0-9]+)-([0-9]+).html$" />
                    <action type="Rewrite" url="content.php?id={R:1}&amp;page={R:2}" />
                </rule>
                <rule name="page">
                    <match url="^page-([0-9]+).html$" />
                    <action type="Rewrite" url="page.php?id={R:1}" />
                </rule>
                <rule name="channel">
                    <match url="^channel-([0-9]+).html$" />
                    <action type="Rewrite" url="channel.php?id={R:1}" />
                </rule>
                <rule name="channel-page">
                    <match url="^channel-([0-9]+)-p([0-9]+).html$" />
                    <action type="Rewrite" url="channel.php?id={R:1}&amp;page={R:2}" />
                </rule>
                <rule name="channel-category">
                    <match url="^channel-([0-9]+)-([0-9]+).html$" />
                    <action type="Rewrite" url="channel.php?id={R:1}&amp;category_id={R:2}" />
                </rule>
                <rule name="channel-category-page">
                    <match url="^channel-([0-9]+)-([0-9]+)-p([0-9]+).html$" />
                    <action type="Rewrite" url="channel.php?id={R:1}&amp;category_id={R:2}&amp;page={R:3}" />
                </rule>
                <rule name="feedback">
                    <match url="^feedback.html$" />
                    <action type="Rewrite" url="feedback.php" />
                </rule>
                <rule name="feedback-page">
                    <match url="^feedback-([0-9]+).html$" />
                    <action type="Rewrite" url="feedbackphp?page={R:1}" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>';
		@file_put_contents('../web.config',$rewrite);
		}else{
			if(!file_exists('.htaccess')){
				$rewrite="RewriteEngine On\n";
				/*$rewrite.="RewriteRule ^sitemap.xml\$ sitemap.php\n";
				$rewrite.="RewriteRule ^index.html\$ index.php\n";
				$rewrite.="RewriteRule ^content-([0-9]+).html\$ content.php?id=\$1\n";
				$rewrite.="RewriteRule ^content-([0-9]+)-([0-9]+).html\$ content.php?id=\$1&page=$2\n";
				$rewrite.="RewriteRule ^page-([0-9]+).html\$ page.php?id=\$1\n";
				$rewrite.="RewriteRule ^channel-([0-9]+).html\$ channel.php?id=\$1\n";
				$rewrite.="RewriteRule ^channel-([0-9]+)-p([0-9]+).html\$ channel.php?id=\$1&page=\$2\n";
				$rewrite.="RewriteRule ^channel-([0-9]+)-([0-9]+).html\$ channel.php?id=\$1&category_id=\$2\n";
				$rewrite.="RewriteRule ^channel-([0-9]+)-([0-9]+)-p([0-9]+)\.html\$ channel.php?id=\$1&category_id=\$2&page=\$3\n";
				$rewrite.="RewriteRule ^feedback.html\$ feedback.php\n";
				$rewrite.="RewriteRule ^feedback-([0-9]+).html\$ feedback.php?page=\$1";*/
				
				$rewrite.="RewriteRule ^index.html\$ index.php\n";
				$rewrite.="RewriteRule ^game.html\$ game.php\n";
				$rewrite.="RewriteRule ^news-([0-9]+).html\$ news.php?id=\$1\n";
				$rewrite.="RewriteRule ^news-([0-9]+)-p([0-9]+).html\$ news.php?id=\$1&page=\$2\n";
				$rewrite.="RewriteRule ^content-([0-9]+).html\$ content.php?id=\$1\n";
				$rewrite.="RewriteRule ^content-([0-9]+)-([0-9]+).html\$ content.php?id=\$1&page=$2\n";
				$rewrite.="RewriteRule ^user.html\$ user.php\n";
				$rewrite.="RewriteRule ^pay.html\$ pay.php\n";
				$rewrite.="RewriteRule ^card.html\$ card.php\n";
				$rewrite.="RewriteRule ^reg.html\$ reg.php\n";
				$rewrite.="RewriteRule ^login.html\$ login.php";
				@file_put_contents('./.htaccess',$rewrite);
				@chmod('../.htaccess',0644);
			}
		}
	}else{
		if(file_exists('.htaccess')){
			@unlink("../.htaccess");
		}
	}
	$config_value=base64_encode(serialize($update));
	$db->update($db_prefix."config",array('config_value'=>$config_value),"config_type='config'");
	clear_cache();
	admin_log('update','config','');
	message(array('text'=>$language['config_update_is_success'],'link'=>'?action=config&do=config'));
}
//菜单列表
if($do=='menu_list'){
	check_permissions('menu_read');
	$menu_list=array();
	$res=$GLOBALS['db']->getall("SELECT * FROM ".$db_prefix."menu WHERE parent_id=0 ORDER BY menu_id ASC");
	if($res){
		foreach($res as $row){
			$menu_list[$row['menu_id']]['id']=$row['menu_id'];
			$menu_list[$row['menu_id']]['name']=$row['menu_name'];
			$menu_list[$row['menu_id']]['link']=$row['menu_link'];
			$menu_list[$row['menu_id']]['mode']=$row['menu_mode'];
			$menu_list[$row['menu_id']]['target']=$row['menu_target'];
			$menu_list[$row['menu_id']]['state']=$row['menu_state'];
			$children=array();
			$children_res=$GLOBALS['db']->getall("SELECT * FROM ".$db_prefix."menu WHERE parent_id=".$row['menu_id']." ORDER BY menu_id ASC");
			if($children_res){
				foreach($children_res as $child){
					$children[$child['menu_id']]['id']=$child['menu_id'];
					$children[$child['menu_id']]['name']=$child['menu_name'];
					$children[$child['menu_id']]['link']=$child['menu_link'];
					$children[$child['menu_id']]['mode']=$child['menu_mode'];
					$children[$child['menu_id']]['target']=$child['menu_target'];
					$children[$child['menu_id']]['state']=$child['menu_state'];
				}
			}
			$menu_list[$row['menu_id']]['children']=$children;
		}
	}
	$smarty=new smarty();smarty_header();
	$smarty->assign('menu_list',$menu_list);
	$smarty->display('menu_list.htm');
}
//菜单添加
if($do=='menu_add'){
	check_permissions('menu_write');
	$menu=array();
	$menu['id']=0;
	$menu['name']='';
	$menu['link']='';
	$menu['target']=0;
	$menu['mode']=0;
	$menu['sort']=1;
	$menu['state']=1;
	$menu['parent_id']=0;
	$smarty=new smarty();smarty_header();
	$smarty->assign('menu_list',get_menu_list());
	$smarty->assign('menu',$menu);
	$smarty->assign('mode','insert');
	$smarty->display('menu_info.htm');
}
if($do=='menu_insert'){
	check_permissions('menu_write');
	$menu_name=empty($_POST['menu_name'])?'':addslashes(trim($_POST['menu_name']));
	$menu_link=empty($_POST['menu_link'])?'':addslashes(trim($_POST['menu_link']));
	$menu_target=intval($_POST['menu_target'])==0?0:1;
	$menu_mode=intval($_POST['menu_mode'])==0?0:1;
	$menu_sort=empty($_POST['menu_sort'])?0:intval($_POST['menu_sort']);
	$menu_state=empty($_POST['menu_state'])?0:intval($_POST['menu_state']);
	$parent_id=empty($_POST['parent_id'])?0:intval($_POST['parent_id']);
	$insert=array();
	$insert['menu_name']=$menu_name;
	$insert['menu_link']=$menu_link;
	$insert['menu_target']=$menu_target;
	$insert['menu_mode']=$menu_mode;
	$insert['menu_sort']=$menu_sort;
	$insert['menu_state']=$menu_state;
	$insert['parent_id']=$parent_id;
	$db->insert($db_prefix."menu",$insert);
	admin_log('insert','menu',$menu_name);
	clear_cache();
	message(array('text'=>$language['menu_insert_is_success'],'link'=>'?action=config&do=menu_list'));
}
//菜单编辑
if($do=='menu_edit'){
	check_permissions('menu_write');
	$menu_id=empty($_GET['menu_id'])?'':intval($_GET['menu_id']);
	$row=$db->getone("SELECT * FROM ".$db_prefix."menu WHERE menu_id='$menu_id'");
	$menu=array();
	$menu['id']=$row['menu_id'];
	$menu['name']=$row['menu_name'];
	$menu['link']=$row['menu_link'];
	$menu['target']=$row['menu_target'];
	$menu['mode']=$row['menu_mode'];
	$menu['sort']=$row['menu_sort'];
	$menu['state']=$row['menu_state'];
	$menu['parent_id']=$row['parent_id'];
	$smarty=new smarty();smarty_header();
	$smarty->assign('menu_list',get_menu_list());
	$smarty->assign('menu',$menu);
	$smarty->assign('mode','update');
	$smarty->display('menu_info.htm');
}
//菜单更新
if($do=='menu_update'){
	check_permissions('menu_write');
	$menu_id=empty($_POST['menu_id'])?'':intval($_POST['menu_id']);
	$menu_name=empty($_POST['menu_name'])?'':addslashes(trim($_POST['menu_name']));
	$menu_link=empty($_POST['menu_link'])?'':addslashes(trim($_POST['menu_link']));

	$menu_target=intval($_POST['menu_target'])==0?0:1;
	$menu_mode=intval($_POST['menu_mode'])==0?0:1;

	$menu_sort=empty($_POST['menu_sort'])?0:intval($_POST['menu_sort']);
	$menu_state=empty($_POST['menu_state'])?0:intval($_POST['menu_state']);
	$parent_id=empty($_POST['parent_id'])?0:intval($_POST['parent_id']);
	$update=array();
	$update['menu_name']=$menu_name;
	$update['menu_link']=$menu_link;
	$update['menu_target']=$menu_target;
	$update['menu_mode']=$menu_mode;
	$update['menu_sort']=$menu_sort;
	$update['menu_state']=$menu_state;
	$update['parent_id']=$parent_id;
	$db->update($db_prefix."menu",$update,"menu_id=$menu_id");
	admin_log('update','menu',$menu_name);
	clear_cache();
	message(array('text'=>$language['menu_update_is_success'],'link'=>'?action=config&do=menu_list'));
}
//菜单删除
if($do=='menu_delete'){
	check_permissions('menu_delete');
	$menu_id=empty($_GET['menu_id'])?'':intval($_GET['menu_id']);
	$menu_name=get_menu_name($menu_id);
	$db->delete($db_prefix."menu","menu_id=$menu_id");
	admin_log('delete','menu',$menu_name);
	clear_cache();
	message(array('text'=>$language['menu_delete_is_success'],'link'=>'?action=config&do=menu_list'));
}
//管理员列表
if($do=='admin_list'){
	check_permissions('all');
	$admin_list=array();
	$res=$GLOBALS['db']->getall("SELECT * FROM ".$db_prefix."admin ORDER BY admin_id ASC");
	if($res){
		foreach($res as $row){
			$admin_list[$row['admin_id']]['id']=$row['admin_id'];
			$admin_list[$row['admin_id']]['name']=$row['admin_name'];
			$admin_list[$row['admin_id']]['password']=$row['admin_password'];
			$admin_list[$row['admin_id']]['state']=$row['admin_state'];
		}
	}
	$smarty=new smarty();smarty_header();
	$smarty->assign('admin_list',$admin_list);
	$smarty->display('admin_list.htm');
}
//管理员添加
if($do=='admin_add'){
	check_permissions('all');
	$admin=array();
	$admin['id']=0;
	$admin['name']='';
	$admin['password']='';
	$admin['permissions']='';
	$admin['state']=1;
	$smarty=new smarty();smarty_header();
	$smarty->assign('admin',$admin);
	$smarty->assign('mode','insert');
	$smarty->display('admin_info.htm');
}
//管理员插入
if($do=='admin_insert'){
	check_permissions('all');
	$admin_name=empty($_POST['admin_name'])?'':addslashes(trim($_POST['admin_name']));
	$admin_password=empty($_POST['admin_password'])?'':addslashes(trim($_POST['admin_password']));
	$admin_permissions=empty($_POST['admin_permissions'])?'':addslashes(trim($_POST['admin_permissions']));
	$admin_state=empty($_POST['admin_state'])?0:intval($_POST['admin_state']);
	if(!check_repeat('admin','admin_name',$admin_name)){
		message(array('text'=>$language['admin_name_is_repeat'],'link'=>''));
	}
	$insert=array();
	$insert['admin_name']=$admin_name;
	$insert['admin_password']=password($admin_password);
	$insert['admin_permissions']=$admin_permissions;
	$insert['admin_state']=$admin_state;
	$db->insert($db_prefix."admin",$insert);
	admin_log('insert','admin',$admin_name);
	clear_cache();
	message(array('text'=>$language['admin_insert_is_success'],'link'=>'?action=config&do=admin_list'));
}
//管理员编辑
if($do=='admin_edit'){
	check_login();
	$admin_id=empty($_GET['admin_id'])?'':intval($_GET['admin_id']);
	$row=$db->getone("SELECT * FROM ".$db_prefix."admin WHERE admin_id='$admin_id'");
	$admin=array();
	$admin['id']=$row['admin_id'];
	$admin['name']=$row['admin_name'];
	$admin['password']=$row['admin_password'];
	$admin['permissions']=$row['admin_permissions'];
	$admin['state']=$row['admin_state'];
	$smarty=new smarty();smarty_header();
	$smarty->assign('admin',$admin);
	$smarty->assign('mode','update');
	$smarty->display('admin_info.htm');
}
//管理员更新
if($do=='admin_update'){
	check_login();
	$admin_id=empty($_POST['admin_id'])?'':intval($_POST['admin_id']);
	$admin_name=empty($_POST['admin_name'])?'':addslashes(trim($_POST['admin_name']));
	$admin_password=empty($_POST['admin_password'])?'':addslashes(trim($_POST['admin_password']));
	$admin_permissions=empty($_POST['admin_permissions'])?'':addslashes(trim($_POST['admin_permissions']));
	$admin_state=empty($_POST['admin_state'])?0:intval($_POST['admin_state']);
	$update=array();
	$update['admin_name']=$admin_name;
	if(!empty($admin_password)){
		$update['admin_password']=password($admin_password);
	}
	$update['admin_permissions']=$admin_permissions;
	$update['admin_state']=$admin_state;
	$db->update($db_prefix."admin",$update,"admin_id=$admin_id");
	admin_log('update','admin',$admin_name);
	clear_cache();
	message(array('text'=>$language['admin_update_is_success'],'link'=>'?action=start'));
}
//管理员删除
if($do=='admin_delete'){
	check_permissions('all');
	$admin_id=empty($_GET['admin_id'])?'':intval($_GET['admin_id']);
	$admin_name=get_admin_name($admin_id);
	$db->delete($db_prefix."admin","admin_id=$admin_id");
	admin_log('delete','admin',$admin_name);
	clear_cache();
	message(array('text'=>$language['admin_delete_is_success'],'link'=>'?action=config&do=admin_list'));
}
//代理接口配置
if($do=='dlapi'){
	check_permissions('dlapi');
	$apisite=get_config(ROOT_PATH.'includes/config_api.php',"site");
	$apikey=get_config(ROOT_PATH.'includes/config_api.php','apikey');
	$smarty=new smarty();smarty_header();
	$smarty->assign('site',$apisite);
	$smarty->assign('apikey',$apikey);
	$smarty->display('api_info.htm');
}
if($do=='api_update'){
	check_permissions('api_update');
	$site=empty($_POST['site'])?'':addslashes(trim($_POST['site']));
	$tapikey=empty($_POST['apikey'])?'':addslashes(trim($_POST['apikey']));
	update_config(ROOT_PATH.'includes/config_api.php',"site",$site);
	update_config(ROOT_PATH.'includes/config_api.php',"apikey",$tapikey);
	message(array('text'=>'接口配置修改成功','link'=>'?action=config&do=dlapi'));
}
function get_config($file, $ini, $type="string"){
	if(!file_exists($file)) return false;
	$str = file_get_contents($file);
	if ($type=="int"){
		$config = preg_match("/".preg_quote($ini)."=(.*);/", $str, $res);
		return $res[1];
	}
	else{
		$config = preg_match("/".preg_quote($ini)."=\"(.*)\";/", $str, $res);
		if($res[1]==null){	
			$config = preg_match("/".preg_quote($ini)."='(.*)';/", $str, $res);
		}
		return $res[1];
	}
}

function update_config($file, $ini, $value,$type="string"){
	if(!file_exists($file)) return false;
	$str = file_get_contents($file);
	$str2="";
	if($type=="int"){	
		$str2 = preg_replace("/".preg_quote($ini)."=(.*);/", $ini."=".$value.";",$str);
	}
	else{
		$str2 = preg_replace("/".preg_quote($ini)."=(.*);/",$ini."=\"".$value."\";",$str);
	}
	file_put_contents($file, $str2);
}  

?>