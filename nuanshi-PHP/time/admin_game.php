<?php
//游戏列表
if($do=='game_list'){
	check_permissions('game_read');
	$game_list=array();
	
	$sql="SELECT * FROM ".$db_prefix."game";
	$page_size=30;
	$page_current=isset($_GET['page'])?intval($_GET['page']):1;
	$count=$GLOBALS['db']->getcount($sql);
	$res=$GLOBALS['db']->getall($sql." order by game_id desc limit ".(($page_current-1)*$page_size).",".$page_size);
	if($count>0){
			$no=$count-(($page_current-1)*$page_size);
			foreach($res as $row){
				$game_list[$row['game_id']]['id']=$row['game_id'];
				$game_list[$row['game_id']]['no']=$row['game_no'];
				$game_list[$row['game_id']]['name']=$row['game_name'];
				$no--;
			}
			$pagebar=pagebar(get_self(),"action=game&do=game_list&",$page_current,$page_size,$count);
	}else{
			$pagebar="";
	}

	$smarty=new smarty();smarty_header();
	$smarty->assign('game_list',$game_list);
	$smarty->assign('pagebar',$pagebar);
	$smarty->display('game_list.html');
}
//添加
if($do=='game_add'){
	check_permissions('game_write');
	$game=array();
	$game['game_id']=0;
	$game['game_type']=0;
	$game['game_no']='';
	$game['game_name']='';
	$game['game_logo']='';
	$game['game_logo2']='';
	$game['game_logo3']='';
	$game['game_logo4']='';
	$game['game_logo5']='';
	$game['game_logo6']='';
	$game['game_logo7']='';
	$game['game_logo8']='';
	$game['game_logo9']='';
	$game['game_depict']='';
	$game['game_website']='';
	$game['game_bbs']='';
	$game['game_freshman']='';
	$game['game_is_show']=1;
	$game['game_is_focus']=0;
	$game['game_is_best']=0;
	$game['game_is_hot']=0;
	$game['game_sort']=0;
	$game['game_money_per']=10;
	$game['game_money_name']='元宝';
	$game['game_pay_role']=0;
	$game['game_login_gateway']='';
	$game['game_pay_gateway']='';
	$game['game_port_config1']='';
	$game['game_port_config2']='';
	$game['game_port_config3']='';
	$game['game_port_config4']='';
	$game['game_port_config5']='';
	$game['game_port_s1']='';
	$game['game_port_s2']='';
	$game['game_port_s3']='';
	$game['game_port_s4']='';
	$game['game_port_s5']='';
	
	$smarty=new smarty();smarty_header();
	$smarty->assign('game',$game);
	$smarty->assign('mode','insert');
	$smarty->display('game_info.html');
}
//9qwan采集入库
if($do=='game_cjinsert'){
check_permissions('game_write');
$arr= get_game_list();

foreach($arr as $key=>$value)
{

    if(is_array($value))
    {
        foreach($value as $mainkey=>$mainvalue)
        {
		//$in_value_arr[]=$mainvalue;
		//echo $mainvalue['id'].">".$mainvalue['no'].">".$mainvalue['name']."><br />";
	$insert=array();
	$insert['game_id']=$mainvalue['id'];
	$insert['game_type']='0';
	$insert['game_no']=$mainvalue['no'];
	$insert['game_name']=$mainvalue['name'];
	$insert['game_logo']='';
	$insert['game_logo2']='';
	$insert['game_logo3']='';
	$insert['game_logo4']='';
	$insert['game_logo5']='';
	$insert['game_logo6']='';
	$insert['game_logo7']='';
	$insert['game_logo8']='';
	$insert['game_logo9']='';
	$insert['game_depict']='';
	$insert['game_website']='http://'.$mainvalue['no'].'.920wan.com';
	$insert['game_bbs']='http://'.$mainvalue['no'].'.920wan.com';
	$insert['game_freshman']='http://'.$mainvalue['no'].'.920wan.com';
	$insert['game_is_show']=$mainvalue['is_new'];
	$insert['game_is_focus']='1';
	$insert['game_is_best']='1';
	$insert['game_is_hot']='1';
	
	$insert['game_sort']='0';
	$insert['game_money_per']=$mainvalue['money_per'];
	$insert['game_money_name']=$mainvalue['money_name'];
	$insert['game_pay_role']='0';
	$insert['game_login_gateway']='';
	$insert['game_pay_gateway']='';
	$insert['game_port_config1']='';
	$insert['game_port_config2']='';
	$insert['game_port_config3']='';
	$insert['game_port_config4']='';
	$insert['game_port_config5']='';
	$insert['game_port_s1']='';
	$insert['game_port_s2']='';
	$insert['game_port_s3']='';
	$insert['game_port_s4']='';
	$insert['game_port_s5']='';
	$count=$db->getcount("SELECT * FROM ".$db_prefix."game WHERE game_id='".$mainvalue['id']."'");
	if($count>0){
	
		//$cjarr= "已有".$count."条数据已存在";
		
	}else{
	
		$db->insert($db_prefix."game",$insert);
	    //$game_id=$db->insert_id();
		//var_dump($db->insert($db_prefix."game",$insert));die();
		
        }
		}
		
		}
		}
		
	message(array('text'=>'采集游戏成功！','link'=>'?action=game&do=game_list'));
}
//采集游戏服务器
if($do=='server_cj'){
check_permissions('server_write');
$game_id=empty($_GET['game_id'])?0:intval($_GET['game_id']);
$severarr= get_server_list($game_id);
		foreach($severarr as $skey=>$svalue)
{

    if(is_array($svalue))
    {
        foreach($svalue as $smainkey=>$smainvalue)
        {
		//var_dump($smainvalue);
		$insert=array();
		$insert['server_id']=$smainvalue['id'];
	$insert['game_id']=$smainvalue['game_id'];
	$insert['server_no']=$smainvalue['no'];
	$insert['server_name']=$smainvalue['name'];
	$insert['server_logo']='';
	$insert['server_logo2']='';
	$insert['server_logo3']='';
	$insert['server_depict']='';
	$insert['server_line']='';
	$insert['server_state']=$smainvalue['state'];
	$insert['server_trunon_date']=$smainvalue['trunon_date'];
	$insert['server_trunon_hour']=$smainvalue['trunon_hour'];
	$insert['server_is_show']=$smainvalue['is_new'];
	$insert['server_is_best']='0';
	$insert['server_is_pay']='1';
	$insert['server_sort']='1';
	$insert['server_login_gateway']='';
	$insert['server_pay_gateway']='';
	$count=$db->getcount("SELECT * FROM ".$db_prefix."server WHERE server_no='".$smainvalue['id']."'");
	if($count>0){
		
	}else{
	
		$db->insert($db_prefix."server",$insert);
	    //$server_id=$db->insert_id();
		//var_dump($db->insert($db_prefix."server",$insert));die();
        }
	
		
		}
		}
		}
	message(array('text'=>'采集服务器成功！','link'=>'?action=game&do=server_list&game_id='.$game_id));	
}




//插入
if($do=='game_insert'){
	check_permissions('game_write');
	$game_type=empty($_POST['game_type'])?0:intval($_POST['game_type']);
	$game_no=empty($_POST['game_no'])?'':addslashes(trim($_POST['game_no']));
	$game_name=empty($_POST['game_name'])?'':addslashes(trim($_POST['game_name']));
	$game_logo=upload($_FILES['game_logo']);
	$game_logo2=upload($_FILES['game_logo2']);
	$game_logo3=upload($_FILES['game_logo3']);
	$game_logo4=upload($_FILES['game_logo4']);
	$game_logo5=upload($_FILES['game_logo5']);
	$game_logo6=upload($_FILES['game_logo6']);
	$game_logo7=upload($_FILES['game_logo7']);
	$game_logo8=upload($_FILES['game_logo8']);
	$game_logo9=upload($_FILES['game_logo9']);
	$game_depict=empty($_POST['game_depict'])?'':addslashes(trim($_POST['game_depict']));
	$game_website=empty($_POST['game_website'])?'':addslashes(trim($_POST['game_website']));
	$game_bbs=empty($_POST['game_bbs'])?'':addslashes(trim($_POST['game_bbs']));
	$game_freshman=empty($_POST['game_freshman'])?'':addslashes(trim($_POST['game_freshman']));
	$game_is_show=empty($_POST['game_is_show'])?0:intval($_POST['game_is_show']);
	$game_is_focus=empty($_POST['game_is_focus'])?0:intval($_POST['game_is_focus']);
	$game_is_best=empty($_POST['game_is_best'])?0:intval($_POST['game_is_best']);
	$game_is_hot=empty($_POST['game_is_hot'])?0:intval($_POST['game_is_hot']);
	$game_sort=empty($_POST['game_sort'])?0:intval($_POST['game_sort']);
	$game_money_per=empty($_POST['game_money_per'])?0:intval($_POST['game_money_per']);
	$game_money_name=empty($_POST['game_money_name'])?'':addslashes(trim($_POST['game_money_name']));
	$game_pay_role=empty($_POST['game_pay_role'])?0:intval($_POST['game_pay_role']);
	$game_login_gateway=empty($_POST['game_login_gateway'])?'':addslashes(trim($_POST['game_login_gateway']));
	$game_pay_gateway=empty($_POST['game_pay_gateway'])?'':addslashes(trim($_POST['game_pay_gateway']));
	$game_port_config1=empty($_POST['game_port_config1'])?'':addslashes(trim($_POST['game_port_config1']));
	$game_port_config2=empty($_POST['game_port_config2'])?'':addslashes(trim($_POST['game_port_config2']));
	$game_port_config3=empty($_POST['game_port_config3'])?'':addslashes(trim($_POST['game_port_config3']));
	$game_port_config4=empty($_POST['game_port_config4'])?'':addslashes(trim($_POST['game_port_config4']));
	$game_port_config5=empty($_POST['game_port_config5'])?'':addslashes(trim($_POST['game_port_config5']));
	$game_port_s1=empty($_POST['game_port_s1'])?'':addslashes(trim($_POST['game_port_s1']));
	$game_port_s2=empty($_POST['game_port_s2'])?'':addslashes(trim($_POST['game_port_s2']));
	$game_port_s3=empty($_POST['game_port_s3'])?'':addslashes(trim($_POST['game_port_s3']));
	$game_port_s4=empty($_POST['game_port_s4'])?'':addslashes(trim($_POST['game_port_s4']));
	$game_port_s5=empty($_POST['game_port_s5'])?'':addslashes(trim($_POST['game_port_s5']));

	if(empty($game_no)){
		message(array('text'=>'游戏编号不能为空','link'=>''));
	}
	if(empty($game_name)){
		message(array('text'=>'游戏名称不能为空','link'=>''));
	}
	
	$count=$db->getcount("SELECT * FROM ".$db_prefix."game WHERE game_no='".$game_no."'");
	if($count>0){
		message(array('text'=>'游戏编号已存在','link'=>''));
	}

	$insert=array();
	$insert['game_type']=$game_type;
	$insert['game_no']=$game_no;
	$insert['game_name']=$game_name;
	$insert['game_logo']=$game_logo;
	$insert['game_logo2']=$game_logo2;
	$insert['game_logo3']=$game_logo3;
	$insert['game_logo4']=$game_logo4;
	$insert['game_logo5']=$game_logo5;
	$insert['game_logo6']=$game_logo6;
	$insert['game_logo7']=$game_logo7;
	$insert['game_logo8']=$game_logo8;
	$insert['game_logo9']=$game_logo9;
	$insert['game_depict']=$game_depict;
	$insert['game_website']=$game_website;
	$insert['game_bbs']=$game_bbs;
	$insert['game_freshman']=$game_freshman;
	$insert['game_is_show']=$game_is_show;
	$insert['game_is_focus']=$game_is_focus;
	$insert['game_is_best']=$game_is_best;
	$insert['game_is_hot']=$game_is_hot;
	$insert['game_sort']=$game_sort;
	$insert['game_money_per']=$game_money_per;
	$insert['game_money_name']=$game_money_name;
	$insert['game_pay_role']=$game_pay_role;
	$insert['game_login_gateway']=$game_login_gateway;
	$insert['game_pay_gateway']=$game_pay_gateway;
	$insert['game_port_config1']=$game_port_config1;
	$insert['game_port_config2']=$game_port_config2;
	$insert['game_port_config3']=$game_port_config3;
	$insert['game_port_config4']=$game_port_config4;
	$insert['game_port_config5']=$game_port_config5;
	$insert['game_port_s1']=$game_port_s1;
	$insert['game_port_s2']=$game_port_s2;
	$insert['game_port_s3']=$game_port_s3;
	$insert['game_port_s4']=$game_port_s4;
	$insert['game_port_s5']=$game_port_s5;
	
	$db->insert($db_prefix."game",$insert);
	$game_id=$db->insert_id();
	admin_log('insert','game',$game_name);
	clear_cache();
	message(array('text'=>'添加游戏成功！','link'=>'?action=game&do=game_list'));
}
//编辑
if($do=='game_edit'){
	check_permissions('game_write');
	$game_id=empty($_GET['game_id'])?0:intval($_GET['game_id']);
	$row=$db->getone("SELECT * FROM ".$db_prefix."game WHERE game_id=$game_id");
	
	$game=array();
	$game['game_id']=$row['game_id'];
	$game['game_type']=$row['game_type'];
	$game['game_no']=$row['game_no'];
	$game['game_name']=$row['game_name'];
	$game['game_logo']=$row['game_logo'];
	$game['game_logo2']=$row['game_logo2'];
	$game['game_logo3']=$row['game_logo3'];
	$game['game_logo4']=$row['game_logo4'];
	$game['game_logo5']=$row['game_logo5'];
	$game['game_logo6']=$row['game_logo6'];
	$game['game_logo7']=$row['game_logo7'];
	$game['game_logo8']=$row['game_logo8'];
	$game['game_logo9']=$row['game_logo9'];
	$game['game_depict']=$row['game_depict'];
	$game['game_website']=$row['game_website'];
	$game['game_bbs']=$row['game_bbs'];
	$game['game_freshman']=$row['game_freshman'];
	$game['game_is_show']=$row['game_is_show'];
	$game['game_is_focus']=$row['game_is_focus'];
	$game['game_is_best']=$row['game_is_best'];
	$game['game_is_hot']=$row['game_is_hot'];
	$game['game_sort']=$row['game_sort'];
	$game['game_money_per']=$row['game_money_per'];
	$game['game_money_name']=$row['game_money_name'];
	$game['game_pay_role']=$row['game_pay_role'];
	$game['game_login_gateway']=$row['game_login_gateway'];
	$game['game_pay_gateway']=$row['game_pay_gateway'];
	$game['game_port_config1']=$row['game_port_config1'];
	$game['game_port_config2']=$row['game_port_config2'];
	$game['game_port_config3']=$row['game_port_config3'];
	$game['game_port_config4']=$row['game_port_config4'];
	$game['game_port_config5']=$row['game_port_config5'];
	$game['game_port_s1']=$row['game_port_s1'];
	$game['game_port_s2']=$row['game_port_s2'];
	$game['game_port_s3']=$row['game_port_s3'];
	$game['game_port_s4']=$row['game_port_s4'];
	$game['game_port_s5']=$row['game_port_s5'];
	$smarty=new smarty();smarty_header();
	$smarty->assign('game',$game);
	$smarty->assign('mode','update');
	$smarty->display('game_info.html');
}
//更新
if($do=='game_update'){
	check_permissions('game_write');
	$game_id=empty($_POST['game_id'])?0:intval($_POST['game_id']);
	$game_type=empty($_POST['game_type'])?0:intval($_POST['game_type']);
	$game_no=empty($_POST['game_no'])?'':addslashes(trim($_POST['game_no']));
	$game_name=empty($_POST['game_name'])?'':addslashes(trim($_POST['game_name']));
	$game_logo=upload($_FILES['game_logo']);
	$game_logo2=upload($_FILES['game_logo2']);
	$game_logo3=upload($_FILES['game_logo3']);
	$game_logo4=upload($_FILES['game_logo4']);
	$game_logo5=upload($_FILES['game_logo5']);
	$game_logo6=upload($_FILES['game_logo6']);
	$game_logo7=upload($_FILES['game_logo7']);
	$game_logo8=upload($_FILES['game_logo8']);
	$game_logo9=upload($_FILES['game_logo9']);
	$game_depict=empty($_POST['game_depict'])?'':addslashes(trim($_POST['game_depict']));
	$game_website=empty($_POST['game_website'])?'':addslashes(trim($_POST['game_website']));
	$game_bbs=empty($_POST['game_bbs'])?'':addslashes(trim($_POST['game_bbs']));
	$game_freshman=empty($_POST['game_freshman'])?'':addslashes(trim($_POST['game_freshman']));
	$game_is_show=empty($_POST['game_is_show'])?0:intval($_POST['game_is_show']);
	$game_is_focus=empty($_POST['game_is_focus'])?0:intval($_POST['game_is_focus']);
	$game_is_best=empty($_POST['game_is_best'])?0:intval($_POST['game_is_best']);
	$game_is_hot=empty($_POST['game_is_hot'])?0:intval($_POST['game_is_hot']);
	$game_sort=empty($_POST['game_sort'])?0:intval($_POST['game_sort']);
	$game_money_per=empty($_POST['game_money_per'])?0:intval($_POST['game_money_per']);
	$game_money_name=empty($_POST['game_money_name'])?'':addslashes(trim($_POST['game_money_name']));
	$game_pay_role=empty($_POST['game_pay_role'])?0:intval($_POST['game_pay_role']);
	$game_login_gateway=empty($_POST['game_login_gateway'])?'':addslashes(trim($_POST['game_login_gateway']));
	$game_pay_gateway=empty($_POST['game_pay_gateway'])?'':addslashes(trim($_POST['game_pay_gateway']));
	$game_port_config1=empty($_POST['game_port_config1'])?'':addslashes(trim($_POST['game_port_config1']));
	$game_port_config2=empty($_POST['game_port_config2'])?'':addslashes(trim($_POST['game_port_config2']));
	$game_port_config3=empty($_POST['game_port_config3'])?'':addslashes(trim($_POST['game_port_config3']));
	$game_port_config4=empty($_POST['game_port_config4'])?'':addslashes(trim($_POST['game_port_config4']));
	$game_port_config5=empty($_POST['game_port_config5'])?'':addslashes(trim($_POST['game_port_config5']));
	$game_port_s1=empty($_POST['game_port_s1'])?'':addslashes(trim($_POST['game_port_s1']));
	$game_port_s2=empty($_POST['game_port_s2'])?'':addslashes(trim($_POST['game_port_s2']));
	$game_port_s3=empty($_POST['game_port_s3'])?'':addslashes(trim($_POST['game_port_s3']));
	$game_port_s4=empty($_POST['game_port_s4'])?'':addslashes(trim($_POST['game_port_s4']));
	$game_port_s5=empty($_POST['game_port_s5'])?'':addslashes(trim($_POST['game_port_s5']));
	
	if(empty($game_no)){
		message(array('text'=>'游戏编号不能为空','link'=>''));
	}
	if(empty($game_name)){
		message(array('text'=>'游戏名称不能为空','link'=>''));
	}
	
	$update=array();
	$update['game_type']=$game_type;
	$update['game_no']=$game_no;
	$update['game_name']=$game_name;
	if(!empty($game_logo)){
		$update['game_logo']=$game_logo;
	}
	if(!empty($game_logo2)){
		$update['game_logo2']=$game_logo2;
	}
	if(!empty($game_logo3)){
		$update['game_logo3']=$game_logo3;
	}
	if(!empty($game_logo4)){
		$update['game_logo4']=$game_logo4;
	}
	if(!empty($game_logo5)){
		$update['game_logo5']=$game_logo5;
	}
	if(!empty($game_logo6)){
		$update['game_logo6']=$game_logo6;
	}
	if(!empty($game_logo7)){
		$update['game_logo7']=$game_logo7;
	}
	if(!empty($game_logo8)){
		$update['game_logo8']=$game_logo8;
	}
	if(!empty($game_logo9)){
		$update['game_logo9']=$game_logo9;
	}
	$update['game_depict']=$game_depict;
	$update['game_website']=$game_website;
	$update['game_bbs']=$game_bbs;
	$update['game_freshman']=$game_freshman;
	$update['game_is_show']=$game_is_show;
	$update['game_is_focus']=$game_is_focus;
	$update['game_is_best']=$game_is_best;
	$update['game_is_hot']=$game_is_hot;
	$update['game_sort']=$game_sort;
	$update['game_money_per']=$game_money_per;
	$update['game_money_name']=$game_money_name;
	$update['game_pay_role']=$game_pay_role;
	$update['game_login_gateway']=$game_login_gateway;
	$update['game_pay_gateway']=$game_pay_gateway;
	$update['game_port_config1']=$game_port_config1;
	$update['game_port_config2']=$game_port_config2;
	$update['game_port_config3']=$game_port_config3;
	$update['game_port_config4']=$game_port_config4;
	$update['game_port_config5']=$game_port_config5;
	$update['game_port_s1']=$game_port_s1;
	$update['game_port_s2']=$game_port_s2;
	$update['game_port_s3']=$game_port_s3;
	$update['game_port_s4']=$game_port_s4;
	$update['game_port_s5']=$game_port_s5;
	
	$db->update($db_prefix."game",$update,"game_id=$game_id");
	admin_log('update','game',$game_name);
	clear_cache();
	message(array('text'=>'更新游戏成功！','link'=>'?action=game&do=game_list'));
}
//删除
if($do=='game_delete'){
	check_permissions('game_delete');
	$game_id=empty($_GET['game_id'])?0:intval($_GET['game_id']);
	
	//删除服务器
	$db->delete($db_prefix."server","game_id=$game_id");
	//删除游戏
	$db->delete($db_prefix."game","game_id=$game_id");
	
	admin_log('delete','game',$game_id);
	clear_cache();
	message(array('text'=>'删除游戏成功！','link'=>'?action=game&do=game_list'));
}

//服务器列表
if($do=='server_list'){
	check_permissions('server_read');
	$game_id=empty($_GET['game_id'])?0:intval($_GET['game_id']);
	$server_list=array();
	
	$sql="SELECT * FROM ".$db_prefix."server";
	if($game_id>0){
		$sql.=" WHERE game_id=$game_id";
	}
	$page_size=30;
	$page_current=isset($_GET['page'])?intval($_GET['page']):1;
	$count=$GLOBALS['db']->getcount($sql);
	$res=$GLOBALS['db']->getall($sql." order by server_id desc limit ".(($page_current-1)*$page_size).",".$page_size);
	if($count>0){
			$no=$count-(($page_current-1)*$page_size);
			foreach($res as $row){
				$server_list[$row['server_id']]['game_id']=$row['game_id'];
				$server_list[$row['server_id']]['game_name']=get_game_name($row['game_id']);
				$server_list[$row['server_id']]['id']=$row['server_id'];
				$server_list[$row['server_id']]['no']=$row['server_no'];
				$server_list[$row['server_id']]['name']=$row['server_name'];
				$no--;
			}
			$pagebar=pagebar(get_self(),"action=game&do=server_list&",$page_current,$page_size,$count);
	}else{
			$pagebar="";
	}

	$smarty=new smarty();smarty_header();
	$smarty->assign('game_id',$game_id);
	$smarty->assign('server_list',$server_list);
	$smarty->assign('pagebar',$pagebar);
	$smarty->display('server_list.html');
}
//添加
if($do=='server_add'){
	check_permissions('server_write');
	$game_id=empty($_GET['game_id'])?0:intval($_GET['game_id']);
	
	$server=array();
	$server['server_id']=0;
	$server['game_id']=$game_id;
	$server['server_no']='';
	$server['server_name']='';
	$server['server_logo']='';
	$server['server_logo2']='';
	$server['server_logo3']='';
	$server['server_depict']='';
	$server['server_line']='双线';
	$server['server_state']=3;
	$server['server_trunon_date']=date('Y-m-j');
	$server['server_trunon_hour']=14;
	$server['server_is_show']=1;
	$server['server_is_best']=1;
	$server['server_is_pay']=1;
	$server['server_sort']=0;
	$server['server_login_gateway']='';
	$server['server_pay_gateway']='';
	
	$hours=array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23);
	$game=game_array_list();
	
	$smarty=new smarty();smarty_header();
	$smarty->assign('hours',$hours);
	$smarty->assign('game',$game);
	$smarty->assign('server',$server);
	$smarty->assign('mode','insert');
	$smarty->display('server_info.html');
}
//插入
if($do=='server_insert'){
	check_permissions('server_write');
	$game_id=empty($_POST['game_id'])?0:intval($_POST['game_id']);
	$server_no=empty($_POST['server_no'])?'':addslashes(trim($_POST['server_no']));
	$server_name=empty($_POST['server_name'])?'':addslashes(trim($_POST['server_name']));
	$server_logo=upload($_FILES['server_logo']);
	$server_logo2='';
	$server_logo3='';
	$server_depict=empty($_POST['server_depict'])?'':addslashes(trim($_POST['server_depict']));
	$server_line=empty($_POST['server_line'])?'':addslashes(trim($_POST['server_line']));
	$server_state=empty($_POST['server_state'])?0:intval($_POST['server_state']);
	$server_trunon_date=empty($_POST['server_trunon_date'])?'':addslashes(trim($_POST['server_trunon_date']));
	$server_trunon_hour=empty($_POST['server_trunon_hour'])?0:intval($_POST['server_trunon_hour']);
	$server_is_show=empty($_POST['server_is_show'])?0:intval($_POST['server_is_show']);
	$server_is_best=empty($_POST['server_is_best'])?0:intval($_POST['server_is_best']);
	$server_is_pay=empty($_POST['server_is_pay'])?0:intval($_POST['server_is_pay']);
	$server_sort=empty($_POST['server_sort'])?0:intval($_POST['server_sort']);
	$server_login_gateway=empty($_POST['server_login_gateway'])?'':addslashes(trim($_POST['server_login_gateway']));
	$server_pay_gateway=empty($_POST['server_pay_gateway'])?'':addslashes(trim($_POST['server_pay_gateway']));

	if(empty($server_no)){
		message(array('text'=>'服务器编号不能为空','link'=>''));
	}
	if(empty($server_name)){
		message(array('text'=>'服务器名称不能为空','link'=>''));
	}

	$insert=array();
	$insert['game_id']=$game_id;
	$insert['server_no']=$server_no;
	$insert['server_name']=$server_name;
	$insert['server_logo']=$server_logo;
	$insert['server_logo2']=$server_logo2;
	$insert['server_logo3']=$server_logo3;
	$insert['server_depict']=$server_depict;
	$insert['server_line']=$server_line;
	$insert['server_state']=$server_state;
	$insert['server_trunon_date']=$server_trunon_date;
	$insert['server_trunon_hour']=$server_trunon_hour;
	$insert['server_is_show']=$server_is_show;
	$insert['server_is_best']=$server_is_best;
	$insert['server_is_pay']=$server_is_pay;
	$insert['server_sort']=$server_sort;
	$insert['server_login_gateway']=$server_login_gateway;
	$insert['server_pay_gateway']=$server_pay_gateway;
	
	$db->insert($db_prefix."server",$insert);
	$server_id=$db->insert_id();
	admin_log('insert','server',$server_name);
	clear_cache();
	message(array('text'=>'添加服务器成功！','link'=>'?action=game&do=server_list&game_id='.$game_id));
}
//编辑
if($do=='server_edit'){
	check_permissions('server_write');
	$server_id=empty($_GET['server_id'])?0:intval($_GET['server_id']);
	$row=$db->getone("SELECT * FROM ".$db_prefix."server WHERE server_id='$server_id'");
	
	$server=array();
	$server['server_id']=$row['server_id'];
	$server['game_id']=$row['game_id'];
	$server['server_no']=$row['server_no'];
	$server['server_name']=$row['server_name'];
	$server['server_logo']=$row['server_logo'];
	$server['server_logo2']=$row['server_logo2'];
	$server['server_logo3']=$row['server_logo3'];
	$server['server_depict']=$row['server_depict'];
	$server['server_line']=$row['server_line'];
	$server['server_state']=$row['server_state'];
	$server['server_trunon_date']=$row['server_trunon_date'];
	$server['server_trunon_hour']=$row['server_trunon_hour'];
	$server['server_is_show']=$row['server_is_show'];
	$server['server_is_best']=$row['server_is_best'];
	$server['server_is_pay']=$row['server_is_pay'];
	$server['server_sort']=$row['server_sort'];
	$server['server_login_gateway']=$row['server_login_gateway'];
	$server['server_pay_gateway']=$row['server_pay_gateway'];
	
	$hours=array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23);
	$game=game_array_list();
	
	$smarty=new smarty();smarty_header();
	$smarty->assign('hours',$hours);
	$smarty->assign('game',$game);
	$smarty->assign('server',$server);
	$smarty->assign('mode','update');
	$smarty->display('server_info.html');
}
//更新
if($do=='server_update'){
	check_permissions('server_write');
	$server_id=empty($_POST['server_id'])?0:intval($_POST['server_id']);
	$game_id=empty($_POST['server_id'])?0:intval($_POST['game_id']);
	$server_no=empty($_POST['server_no'])?'':addslashes(trim($_POST['server_no']));
	$server_name=empty($_POST['server_name'])?'':addslashes(trim($_POST['server_name']));
	$server_logo=upload($_FILES['server_logo']);
	$server_logo2='';
	$server_logo3='';
	$server_depict=empty($_POST['server_depict'])?'':addslashes(trim($_POST['server_depict']));
	$server_line=empty($_POST['server_line'])?'':addslashes(trim($_POST['server_line']));
	$server_state=empty($_POST['server_state'])?0:intval($_POST['server_state']);
	$server_trunon_date=empty($_POST['server_trunon_date'])?'':addslashes(trim($_POST['server_trunon_date']));
	$server_trunon_hour=empty($_POST['server_trunon_hour'])?0:intval($_POST['server_trunon_hour']);
	$server_is_show=empty($_POST['server_is_show'])?0:intval($_POST['server_is_show']);
	$server_is_best=empty($_POST['server_is_best'])?0:intval($_POST['server_is_best']);
	$server_is_pay=empty($_POST['server_is_pay'])?0:intval($_POST['server_is_pay']);
	$server_sort=empty($_POST['server_sort'])?0:intval($_POST['server_sort']);
	$server_login_gateway=empty($_POST['server_login_gateway'])?'':addslashes(trim($_POST['server_login_gateway']));
	$server_pay_gateway=empty($_POST['server_pay_gateway'])?'':addslashes(trim($_POST['server_pay_gateway']));
	
	if(empty($server_no)){
		message(array('text'=>'服务器编号不能为空','link'=>''));
	}
	if(empty($server_name)){
		message(array('text'=>'服务器名称不能为空','link'=>''));
	}
	
	$update=array();
	$update['game_id']=$game_id;
	$update['server_no']=$server_no;
	$update['server_name']=$server_name;
	if(!empty($server_logo)){
		$update['server_logo']=$server_logo;
	}
	if(!empty($server_logo2)){
		$update['server_logo2']=$server_logo2;
	}
	if(!empty($server_logo3)){
		$update['server_logo3']=$server_logo3;
	}
	$update['server_depict']=$server_depict;
	$update['server_line']=$server_line;
	$update['server_state']=$server_state;
	$update['server_trunon_date']=$server_trunon_date;
	$update['server_trunon_hour']=$server_trunon_hour;
	$update['server_is_show']=$server_is_show;
	$update['server_is_best']=$server_is_best;
	$update['server_is_pay']=$server_is_pay;
	$update['server_sort']=$server_sort;
	$update['server_login_gateway']=$server_login_gateway;
	$update['server_pay_gateway']=$server_pay_gateway;
	
	$db->update($db_prefix."server",$update,"server_id=$server_id");
	admin_log('update','server',$server_name);
	clear_cache();
	message(array('text'=>'更新游戏成功！','link'=>'?action=game&do=server_list&game_id='.$game_id));
}
//删除
if($do=='server_delete'){
	check_permissions('server_delete');
	$server_id=empty($_GET['server_id'])?0:intval($_GET['server_id']);
	
	//删除服务器
	$db->delete($db_prefix."server","server_id=$server_id");
	
	admin_log('delete','server',$server_id);
	clear_cache();
	message(array('text'=>'删除服务器成功！','link'=>'?action=game&do=server_list&game_id='.$game_id));
}

//充值列表
if($do=='pay_list'){
	check_permissions('pay_read');
	
	$search=array();
	$search['mode_id']=empty($_POST['mode_id'])?0:intval($_POST['mode_id']);
	$search['game_id']=empty($_POST['game_id'])?0:intval($_POST['game_id']);
	$search['server_id']=empty($_POST['server_id'])?0:intval($_POST['server_id']);
	$search['pay_state']=empty($_POST['pay_state'])?0:intval($_POST['pay_state']);
	$search['stime']=empty($_POST['stime'])?'':addslashes(trim($_POST['stime']));
	$search['etime']=empty($_POST['etime'])?'':addslashes(trim($_POST['etime']));
	$search['order_no']=empty($_POST['order_no'])?'':addslashes(trim($_POST['order_no']));
	$search['game_user']=empty($_POST['game_user'])?'':addslashes(trim($_POST['game_user']));
	
	$pay_list=array();
	$sql="SELECT * FROM ".$db_prefix."pay where pay_id>0";
	$sql_total="SELECT sum(pay_money) as total FROM ".$db_prefix."pay where pay_id>0";
	$sql_search="";
	if($search['mode_id']>0){
		$sql_search.=" and pay_mode_id=".$search['mode_id'];
	}
	if($search['game_id']>0){
		$sql_search.=" and pay_game_id=".$search['game_id'];
	}
	if($search['server_id']>0){
		$sql_search.=" and pay_server_id=".$search['server_id'];
	}
	if($search['pay_state']==1){
		$sql_search.=" and pay_state=1";
		$str_search.="&pay_state=1";
	}
	if($search['pay_state']==2){
		$sql_search.=" and pay_state=2";
		$str_search.="&pay_state=2";
	}
	if($search['pay_state']==3){
		$sql_search.=" and pay_state=0";
		$str_search.="&pay_state=3";
	}
	if($search['order_no']!=''){
		$sql_search.=" and pay_order_no='".$search['order_no']."'";
	}
	if($search['game_user']!=''){
		$sql_search.=" and pay_game_user='".$search['game_user']."'";
	}
	if($search['stime']!=''){
		$sql_search.=" and pay_time>=".strtotime($search['stime']);
	}
	if($search['etime']!=''){
		$sql_search.=" and pay_time<=".strtotime($search['etime']);
	}
	$sql.=$sql_search;
	$sql_total.=$sql_search;
	
	$total=0;
	$row=$GLOBALS['db']->getone($sql_total);
	if($row){
		$total=$row[0];
	}
	
	$page_size=30;
	$page_current=isset($_GET['page'])?intval($_GET['page']):1;
	$count=$GLOBALS['db']->getcount($sql);
	$res=$GLOBALS['db']->getall($sql." order by pay_id desc limit ".(($page_current-1)*$page_size).",".$page_size);
	if($count>0){
			$no=$count-(($page_current-1)*$page_size);
			foreach($res as $row){
				$pay_list[$row['pay_id']]['id']=$row['pay_id'];
				$pay_list[$row['pay_id']]['order_no']=$row['pay_order_no'];
				$pay_list[$row['pay_id']]['mode_id']=get_paymode_name($row['pay_mode_id']);
				$pay_list[$row['pay_id']]['state']=$row['pay_state'];
				$pay_list[$row['pay_id']]['state_str']=get_paystate_name($row['pay_state']);
				$pay_list[$row['pay_id']]['game_id']=get_game_name($row['pay_game_id']);
				$pay_list[$row['pay_id']]['server_id']=get_server_name($row['pay_server_id']);
				$pay_list[$row['pay_id']]['game_user']=$row['pay_game_user'];
				$pay_list[$row['pay_id']]['game_role']=$row['pay_game_role'];
				$pay_list[$row['pay_id']]['tel']=$row['pay_tel'];
				$pay_list[$row['pay_id']]['money']=$row['pay_money'];
				$pay_list[$row['pay_id']]['time']=date("Y-m-d H:i:s",$row['pay_time']);
				$pay_list[$row['pay_id']]['ip']=$row['pay_ip'];
				$no--;
			}
			$pagebar=pagebar(get_self(),"action=game&do=pay_list&",$page_current,$page_size,$count);
	}else{
			$pagebar="";
	}
	
	$paymode_list=array();
	$game_list=array();
	$server_list=array();
	
	$paymode_list=paymode_array_list();
	$game_list=game_array_list('','');

	$smarty=new smarty();smarty_header();
	$smarty->assign('paymode_list',$paymode_list);
	$smarty->assign('game_list',$game_list);
	$smarty->assign('server_list',$server_list);
	$smarty->assign('pay_list',$pay_list);
	$smarty->assign('total',$total);
	$smarty->assign('pagebar',$pagebar);
	$smarty->assign('search',$search);
	$smarty->display('pay_list.html');
}
//手动处理
if($do=='pay_rehash'){
	check_permissions('pay_write');
	$order_no=empty($_GET['order_no'])?'':addslashes($_GET['order_no']);
	if(empty($order_no)){
		exit;
	}
	//游戏订单处理
	require_once(ROOT_PATH.'hi_ports/charge_gateway.php');
	$ret=game_charge_gateway($order_no);
	
	if($ret==1){
		$update=array();
		$update['pay_state']=1;
		$db->update($db_prefix."pay",$update,"pay_order_no='".$order_no."'");

		message(array('text'=>'手动处理订单成功！','link'=>'?action=game&do=pay_list'));
	}
	else{
		message(array('text'=>'手动处理订单失败('.$ret.')！','link'=>'?action=game&do=pay_list'));
	}
}
//更改状态
if($do=='pay_modify'){
	check_permissions('pay_write');
	$pay_id=empty($_GET['pay_id'])?0:intval($_GET['pay_id']);
	$pay_state=empty($_GET['state'])?0:intval($_GET['state']);
	if($pay_state==0){
		$pay_state=1;
	}
	else{
		$pay_state=0;
	}
	
	$update=array();
	$update['pay_state']=$pay_state;
	$db->update($db_prefix."pay",$update,"pay_id=$pay_id");
	admin_log('update','pay',$pay_id);
	clear_cache();
	message(array('text'=>'更新充值订单成功！','link'=>'?action=game&do=pay_list'));
}
//删除
if($do=='pay_delete'){
	check_permissions('pay_delete');
	$pay_id=empty($_GET['pay_id'])?0:intval($_GET['pay_id']);
	$db->delete($db_prefix."pay","pay_id=$pay_id");
	admin_log('delete','pay',$pay_id);
	clear_cache();
	message(array('text'=>'删除充值订单成功！','link'=>'?action=game&do=pay_list'));
}

//充值方式列表
if($do=='paymode_list'){
	check_permissions('pay_read');
	$mode_list=array();
	$res=$GLOBALS['db']->getall("SELECT * FROM ".$db_prefix."paymode order by mode_id asc");
	if($res){
		foreach($res as $row){
			$mode_list[$row['mode_id']]['id']=$row['mode_id'];
			$mode_list[$row['mode_id']]['no']=$row['mode_no'];
			$mode_list[$row['mode_id']]['name']=$row['mode_name'];
		}
	}
	$smarty=new smarty();smarty_header();
	$smarty->assign('mode_list',$mode_list);
	$smarty->display('paymode_list.html');
}
//添加
if($do=='paymode_add'){
	check_permissions('pay_write');
	$paymode=array();
	$paymode['mode_id']=0;
	$paymode['mode_no']='';
	$paymode['mode_name']='';
	$paymode['mode_logo']='';
	$paymode['mode_depict']='';
	$paymode['mode_state']=1;
	$paymode['mode_is_default']=0;
	$paymode['mode_sort']=0;
	$paymode['mode_money_per']=100;
	$paymode['mode_port_config1']='';
	$paymode['mode_port_config2']='';
	$paymode['mode_port_config3']='';
	$paymode['mode_port_config4']='';
	$paymode['mode_port_config5']='';
	$paymode['mode_port_config6']='';
	$paymode['mode_port_config7']='';
	$paymode['mode_port_s1']='';
	$paymode['mode_port_s2']='';
	$paymode['mode_port_s3']='';
	$paymode['mode_port_s4']='';
	$paymode['mode_port_s5']='';
	$paymode['mode_port_s6']='';
	$paymode['mode_port_s7']='';
	
	$smarty=new smarty();smarty_header();
	$smarty->assign('paymode',$paymode);
	$smarty->assign('mode','insert');
	$smarty->display('paymode_info.html');
}
//插入
if($do=='paymode_insert'){
	check_permissions('pay_write');
	$mode_no=empty($_POST['mode_no'])?'':addslashes(trim($_POST['mode_no']));
	$mode_name=empty($_POST['mode_name'])?'':addslashes(trim($_POST['mode_name']));
	$mode_logo=upload($_FILES['mode_logo']);
	$mode_depict=empty($_POST['mode_depict'])?'':addslashes(trim($_POST['mode_depict']));
	$mode_state=empty($_POST['mode_state'])?0:intval($_POST['mode_state']);
	$mode_is_default=empty($_POST['mode_is_default'])?0:intval($_POST['mode_is_default']);
	$mode_sort=empty($_POST['mode_sort'])?0:intval($_POST['mode_sort']);
	$mode_money_per=empty($_POST['mode_money_per'])?0:intval($_POST['mode_money_per']);
	$mode_port_config1=empty($_POST['mode_port_config1'])?'':addslashes(trim($_POST['mode_port_config1']));
	$mode_port_config2=empty($_POST['mode_port_config2'])?'':addslashes(trim($_POST['mode_port_config2']));
	$mode_port_config3=empty($_POST['mode_port_config3'])?'':addslashes(trim($_POST['mode_port_config3']));
	$mode_port_config4=empty($_POST['mode_port_config4'])?'':addslashes(trim($_POST['mode_port_config4']));
	$mode_port_config5=empty($_POST['mode_port_config5'])?'':addslashes(trim($_POST['mode_port_config5']));
	$mode_port_config6=empty($_POST['mode_port_config6'])?'':addslashes(trim($_POST['mode_port_config6']));
	$mode_port_config7=empty($_POST['mode_port_config7'])?'':addslashes(trim($_POST['mode_port_config7']));
	$mode_port_s1=empty($_POST['mode_port_s1'])?'':addslashes(trim($_POST['mode_port_s1']));
	$mode_port_s2=empty($_POST['mode_port_s2'])?'':addslashes(trim($_POST['mode_port_s2']));
	$mode_port_s3=empty($_POST['mode_port_s3'])?'':addslashes(trim($_POST['mode_port_s3']));
	$mode_port_s4=empty($_POST['mode_port_s4'])?'':addslashes(trim($_POST['mode_port_s4']));
	$mode_port_s5=empty($_POST['mode_port_s5'])?'':addslashes(trim($_POST['mode_port_s5']));
	$mode_port_s6=empty($_POST['mode_port_s6'])?'':addslashes(trim($_POST['mode_port_s6']));
	$mode_port_s7=empty($_POST['mode_port_s7'])?'':addslashes(trim($_POST['mode_port_s7']));

	if(empty($mode_no)){
		message(array('text'=>'充值方式编号不能为空','link'=>''));
	}
	if(empty($mode_name)){
		message(array('text'=>'充值方式名称不能为空','link'=>''));
	}
	
	$count=$db->getcount("SELECT * FROM ".$db_prefix."paymode WHERE mode_no='".$mode_no."'");
	if($count>0){
		message(array('text'=>'充值方式编号已存在','link'=>''));
	}

	$insert=array();
	$insert['mode_no']=$mode_no;
	$insert['mode_name']=$mode_name;
	$insert['mode_logo']=$mode_logo;
	$insert['mode_depict']=$mode_depict;
	$insert['mode_state']=$mode_state;
	$insert['mode_is_default']=$mode_is_default;
	$insert['mode_sort']=$mode_sort;
	$insert['mode_money_per']=$mode_money_per;
	$insert['mode_port_config1']=$mode_port_config1;
	$insert['mode_port_config2']=$mode_port_config2;
	$insert['mode_port_config3']=$mode_port_config3;
	$insert['mode_port_config4']=$mode_port_config4;
	$insert['mode_port_config5']=$mode_port_config5;
	$insert['mode_port_config6']=$mode_port_config6;
	$insert['mode_port_config7']=$mode_port_config7;
	$insert['mode_port_s1']=$mode_port_s1;
	$insert['mode_port_s2']=$mode_port_s2;
	$insert['mode_port_s3']=$mode_port_s3;
	$insert['mode_port_s4']=$mode_port_s4;
	$insert['mode_port_s5']=$mode_port_s5;
	$insert['mode_port_s6']=$mode_port_s6;
	$insert['mode_port_s7']=$mode_port_s7;
	
	$db->insert($db_prefix."paymode",$insert);
	$game_id=$db->insert_id();
	
	//生成配置文件
	payConfig($mode_no,$mode_port_config1,$mode_port_config2,$mode_port_config3,$mode_port_config4,$mode_port_config5,$mode_port_config6,$mode_port_config7);
	
	admin_log('insert','pay',$mode_name);
	clear_cache();
	message(array('text'=>'添加充值方式成功！','link'=>'?action=game&do=paymode_list'));
}
//编辑
if($do=='paymode_edit'){
	check_permissions('pay_write');
	$mode_id=empty($_GET['mode_id'])?0:intval($_GET['mode_id']);
	$row=$db->getone("SELECT * FROM ".$db_prefix."paymode WHERE mode_id=$mode_id");
	
	$paymode=array();
	$paymode['mode_id']=$row['mode_id'];
	$paymode['mode_no']=$row['mode_no'];
	$paymode['mode_name']=$row['mode_name'];
	$paymode['mode_logo']=$row['mode_logo'];
	$paymode['mode_depict']=$row['mode_depict'];
	$paymode['mode_state']=$row['mode_state'];
	$paymode['mode_is_default']=$row['mode_is_default'];
	$paymode['mode_sort']=$row['mode_sort'];
	$paymode['mode_money_per']=$row['mode_money_per'];
	$paymode['mode_port_config1']=$row['mode_port_config1'];
	$paymode['mode_port_config2']=$row['mode_port_config2'];
	$paymode['mode_port_config3']=$row['mode_port_config3'];
	$paymode['mode_port_config4']=$row['mode_port_config4'];
	$paymode['mode_port_config5']=$row['mode_port_config5'];
	$paymode['mode_port_config6']=$row['mode_port_config6'];
	$paymode['mode_port_config7']=$row['mode_port_config7'];
	$paymode['mode_port_s1']=$row['mode_port_s1'];
	$paymode['mode_port_s2']=$row['mode_port_s2'];
	$paymode['mode_port_s3']=$row['mode_port_s3'];
	$paymode['mode_port_s4']=$row['mode_port_s4'];
	$paymode['mode_port_s5']=$row['mode_port_s5'];
	$paymode['mode_port_s6']=$row['mode_port_s6'];
	$paymode['mode_port_s7']=$row['mode_port_s7'];
	
	$smarty=new smarty();smarty_header();
	$smarty->assign('paymode',$paymode);
	$smarty->assign('mode','update');
	$smarty->display('paymode_info.html');
}
//更新
if($do=='paymode_update'){
	check_permissions('pay_write');
	$mode_id=empty($_POST['mode_id'])?0:intval($_POST['mode_id']);
	$mode_no=empty($_POST['mode_no'])?'':addslashes(trim($_POST['mode_no']));
	$mode_name=empty($_POST['mode_name'])?'':addslashes(trim($_POST['mode_name']));
	$mode_logo=upload($_FILES['mode_logo']);
	$mode_depict=empty($_POST['mode_depict'])?'':addslashes(trim($_POST['mode_depict']));
	$mode_state=empty($_POST['mode_state'])?0:intval($_POST['mode_state']);
	$mode_is_default=empty($_POST['mode_is_default'])?0:intval($_POST['mode_is_default']);
	$mode_sort=empty($_POST['mode_sort'])?0:intval($_POST['mode_sort']);
	$mode_money_per=empty($_POST['mode_money_per'])?0:intval($_POST['mode_money_per']);
	$mode_port_config1=empty($_POST['mode_port_config1'])?'':addslashes(trim($_POST['mode_port_config1']));
	$mode_port_config2=empty($_POST['mode_port_config2'])?'':addslashes(trim($_POST['mode_port_config2']));
	$mode_port_config3=empty($_POST['mode_port_config3'])?'':addslashes(trim($_POST['mode_port_config3']));
	$mode_port_config4=empty($_POST['mode_port_config4'])?'':addslashes(trim($_POST['mode_port_config4']));
	$mode_port_config5=empty($_POST['mode_port_config5'])?'':addslashes(trim($_POST['mode_port_config5']));
	$mode_port_config6=empty($_POST['mode_port_config6'])?'':addslashes(trim($_POST['mode_port_config6']));
	$mode_port_config7=empty($_POST['mode_port_config7'])?'':addslashes(trim($_POST['mode_port_config7']));
	$mode_port_s1=empty($_POST['mode_port_s1'])?'':addslashes(trim($_POST['mode_port_s1']));
	$mode_port_s2=empty($_POST['mode_port_s2'])?'':addslashes(trim($_POST['mode_port_s2']));
	$mode_port_s3=empty($_POST['mode_port_s3'])?'':addslashes(trim($_POST['mode_port_s3']));
	$mode_port_s4=empty($_POST['mode_port_s4'])?'':addslashes(trim($_POST['mode_port_s4']));
	$mode_port_s5=empty($_POST['mode_port_s5'])?'':addslashes(trim($_POST['mode_port_s5']));
	$mode_port_s6=empty($_POST['mode_port_s6'])?'':addslashes(trim($_POST['mode_port_s6']));
	$mode_port_s7=empty($_POST['mode_port_s7'])?'':addslashes(trim($_POST['mode_port_s7']));
	
	if(empty($mode_no)){
		message(array('text'=>'充值方式编号不能为空','link'=>''));
	}
	if(empty($mode_name)){
		message(array('text'=>'充值方式名称不能为空','link'=>''));
	}
	
	$update=array();
	$update['mode_no']=$mode_no;
	$update['mode_name']=$mode_name;
	if(!empty($mode_logo)){
		$update['mode_logo']=$mode_logo;
	}
	$update['mode_depict']=$mode_depict;
	$update['mode_state']=$mode_state;
	$update['mode_is_default']=$mode_is_default;
	$update['mode_sort']=$mode_sort;
	$update['mode_money_per']=$mode_money_per;
	$update['mode_port_config1']=$mode_port_config1;
	$update['mode_port_config2']=$mode_port_config2;
	$update['mode_port_config3']=$mode_port_config3;
	$update['mode_port_config4']=$mode_port_config4;
	$update['mode_port_config5']=$mode_port_config5;
	$update['mode_port_config6']=$mode_port_config6;
	$update['mode_port_config7']=$mode_port_config7;
	$update['mode_port_s1']=$mode_port_s1;
	$update['mode_port_s2']=$mode_port_s2;
	$update['mode_port_s3']=$mode_port_s3;
	$update['mode_port_s4']=$mode_port_s4;
	$update['mode_port_s5']=$mode_port_s5;
	$update['mode_port_s6']=$mode_port_s6;
	$update['mode_port_s7']=$mode_port_s7;
	
	$db->update($db_prefix."paymode",$update,"mode_id=$mode_id");
	
	//生成配置文件
	//payConfig($mode_no,$mode_port_config1,$mode_port_config2,$mode_port_config3,$mode_port_config4,$mode_port_config5,$mode_port_config6,$mode_port_config7);
	
	admin_log('update','pay',$mode_name);
	clear_cache();
	message(array('text'=>'更新充值方式成功！','link'=>'?action=game&do=paymode_list'));
}
//删除
if($do=='paymode_delete'){
	check_permissions('pay_delete');
	$mode_id=empty($_GET['mode_id'])?0:intval($_GET['mode_id']);
	$db->delete($db_prefix."paymode","mode_id=$mode_id");
	admin_log('delete','pay',$mode_id);
	clear_cache();
	message(array('text'=>'删除充值方式成功！','link'=>'?action=game&do=paymode_list'));
}

//新手卡列表
if($do=='card_list'){
	check_permissions('card_read');
	$card_list=array();
	
	$sql="SELECT * FROM ".$db_prefix."card";
	$page_size=30;
	$page_current=isset($_GET['page'])?intval($_GET['page']):1;
	$count=$GLOBALS['db']->getcount($sql);
	$res=$GLOBALS['db']->getall($sql." order by card_id desc limit ".(($page_current-1)*$page_size).",".$page_size);
	if($count>0){
			$no=$count-(($page_current-1)*$page_size);
			foreach($res as $row){
				$card_list[$row['card_id']]['id']=$row['card_id'];
				$card_list[$row['card_id']]['name']=$row['card_name'];
				$card_list[$row['card_id']]['count']=get_card_count($row['card_id'],'');
				$card_list[$row['card_id']]['frees']=get_card_count($row['card_id'],'number_state=0');
				$no--;
			}
			$pagebar=pagebar(get_self(),"action=game&do=card_list&",$page_current,$page_size,$count);
	}else{
			$pagebar="";
	}

	$smarty=new smarty();smarty_header();
	$smarty->assign('card_list',$card_list);
	$smarty->assign('pagebar',$pagebar);
	$smarty->display('card_list.html');
}
//使用记录
if($do=='card_log'){
	check_permissions('card_read');
	
	$card_id=empty($_GET['card_id'])?0:intval($_GET['card_id']);
	$card_log=array();
	
	$res=$GLOBALS['db']->getall("SELECT * FROM ".$db_prefix."card_number where number_state=1 and card_id=".$card_id." order by number_get_time desc");
	if($res){
		foreach($res as $row){
			$card_log[$row['number_id']]['id']=$row['number_id'];
			$card_log[$row['number_id']]['get_user']=$row['number_get_user'];
			$card_log[$row['number_id']]['get_time']=$row['number_get_time'];
		}
	}

	$smarty=new smarty();smarty_header();
	$smarty->assign('card_log',$card_log);
	$smarty->display('card_log.html');
}
//添加
if($do=='card_add'){
	check_permissions('card_write');
	$card=array();
	$card['card_id']=0;
	$card['card_name']='';
	$card['card_logo']='';
	$card['card_depict']='';
	$card['card_fs']='';
	$card['card_link']='';
	$card['card_state']=1;
	$card['card_game_id']=0;
	$card['card_server_id']=0;
	
	
	
	$game=game_array_list();
	
	$smarty=new smarty();smarty_header();
	$smarty->assign('game',$game);
	$smarty->assign('card',$card);
	$smarty->assign('mode','insert');
	$smarty->display('card_info.html');
}
//插入
if($do=='card_insert'){
	check_permissions('card_write');
	$card_name=empty($_POST['card_name'])?'':addslashes(trim($_POST['card_name']));
	$card_logo=upload($_FILES['card_logo']);
	$card_depict=empty($_POST['card_depict'])?'':addslashes(trim($_POST['card_depict']));
	$card_fs=empty($_POST['card_fs'])?'':addslashes(trim($_POST['card_fs']));
	$card_link=empty($_POST['card_link'])?'':addslashes(trim($_POST['card_link']));
	$card_state=empty($_POST['card_state'])?0:intval($_POST['card_state']);
	$card_game_id=empty($_POST['card_game_id'])?0:intval($_POST['card_game_id']);
	$card_server_id=empty($_POST['card_server_id'])?0:intval($_POST['card_server_id']);
	

	if(empty($card_name)){
		message(array('text'=>'新手卡名称不能为空','link'=>''));
	}

	$insert=array();
	$insert['card_name']=$card_name;
	$insert['card_logo']=$card_logo;
	$insert['card_depict']=$card_depict;
	$insert['card_fs']=$card_fs;
	$insert['card_link']=$card_link;
	$insert['card_state']=$card_state;
	$insert['card_game_id']=$card_game_id;
	$insert['card_server_id']=$card_server_id;
	
	
	$db->insert($db_prefix."card",$insert);
	$card_id=$db->insert_id();
	admin_log('insert','card',$card_name);
	clear_cache();
	message(array('text'=>'添加新手卡成功！','link'=>'?action=game&do=card_list'));
}
//编辑
if($do=='card_edit'){
	check_permissions('card_write');
	$card_id=empty($_GET['card_id'])?0:intval($_GET['card_id']);
	$row=$db->getone("SELECT * FROM ".$db_prefix."card WHERE card_id=$card_id");
	
	$card=array();
	$card['card_id']=$row['card_id'];
	$card['card_name']=$row['card_name'];
	$card['card_logo']=$row['card_logo'];
	$card['card_depict']=$row['card_depict'];
	$card['card_fs']=$row['card_fs'];
	$card['card_link']=$row['card_link'];
	$card['card_state']=$row['card_state'];
	$card['card_game_id']=$row['card_game_id'];
	$card['card_server_id']=$row['card_server_id'];
	
	
	$game=game_array_list();
	
	$smarty=new smarty();smarty_header();
	$smarty->assign('game',$game);
	$smarty->assign('card',$card);
	$smarty->assign('mode','update');
	$smarty->display('card_info.html');
}
//更新
if($do=='card_update'){

	check_permissions('card_write');
	$card_id=empty($_POST['card_id'])?0:intval($_POST['card_id']);
	$card_name=empty($_POST['card_name'])?'':addslashes(trim($_POST['card_name']));
	$card_logo=upload($_FILES['card_logo']);
	$card_depict=empty($_POST['card_depict'])?'':addslashes(trim($_POST['card_depict']));
	$card_fs=empty($_POST['card_fs'])?'':addslashes(trim($_POST['card_fs']));
	$card_link=empty($_POST['card_link'])?'':addslashes(trim($_POST['card_link']));
	$card_state=empty($_POST['card_state'])?0:intval($_POST['card_state']);
	$card_game_id=empty($_POST['card_game_id'])?0:intval($_POST['card_game_id']);
	$card_server_id=empty($_POST['card_server_id'])?0:intval($_POST['card_server_id']);

	
	
	if(empty($card_name)){
		message(array('text'=>'新手卡名称不能为空','link'=>''));
	}
	
	$update=array();
	$update['card_name']=$card_name;
	if(!empty($card_logo)){
		$update['card_logo']=$card_logo;
	}
	$update['card_depict']=$card_depict;
	$update['card_fs']=$card_fs;
	$update['card_link']=$card_link;
	$update['card_state']=$card_state;
	$update['card_game_id']=$card_game_id;
	$update['card_server_id']=$card_server_id;

	$db->update($db_prefix."card",$update,"card_id=$card_id");
	admin_log('update','card',$card_name);
	clear_cache();
	message(array('text'=>'更新新手卡成功！','link'=>'?action=game&do=card_list'));
}
//删除
if($do=='card_delete'){
	check_permissions('card_delete');
	$card_id=empty($_GET['card_id'])?0:intval($_GET['card_id']);
	
	//删除卡号
	$db->delete($db_prefix."card_number","card_id=$card_id");
	$db->delete($db_prefix."card","card_id=$card_id");
	
	admin_log('delete','card',$card_id);
	clear_cache();
	message(array('text'=>'删除新手卡成功！','link'=>'?action=game&do=card_list'));
}
//导入卡号
if($do=='card_batch'){
	check_permissions('card_write');
	$card_id=empty($_GET['card_id'])?0:intval($_GET['card_id']);
	
	$smarty=new smarty();smarty_header();
	$smarty->assign('card_id',$card_id);
	$smarty->display('card_batch.html');
}
//导入处理
if($do=='card_batch_ok'){
	check_permissions('card_write');
	$card_id=empty($_POST['card_id'])?0:intval($_POST['card_id']);
	$card_text=empty($_POST['card_text'])?'':addslashes(trim($_POST['card_text']));
	
	if(empty($card_text)){
		message(array('text'=>'卡号不能为空','link'=>''));
	}
	
	if(!empty($card_text)){
		$list=array();
		$list=preg_split("/\n/", $card_text);
		foreach($list as $text){
			if(!empty($text)){
				$insert=array();
				$insert['card_id']=$card_id;
				$insert['card_number']=$text;
				$insert['number_state']=0;
				$insert['number_add_time']=date("Y-m-d H:i:s");
				$db->insert($db_prefix."card_number",$insert);
			}
		}
	}
	clear_cache();
	message(array('text'=>'导入新手卡成功！','link'=>'?action=game&do=card_list'));
}

//推广分析
if($do=='sp_data'){
	check_permissions('sp_read');
	
	$sp_list=array();
	$sql="SELECT * FROM ".$db_prefix."member where group_id=1";
	$page_size=30;
	$page_current=isset($_GET['page'])?intval($_GET['page']):1;
	$count=$GLOBALS['db']->getcount($sql);
	$res=$GLOBALS['db']->getall($sql." order by member_id desc limit ".(($page_current-1)*$page_size).",".$page_size);
	if($count>0){
			$no=$count-(($page_current-1)*$page_size);
			foreach($res as $row){
				$sp_list[$row['member_id']]['id']=$row['member_id'];
				$sp_list[$row['member_id']]['name']=$row['member_username'];
				$sp_list[$row['member_id']]['link']="http://".$_SERVER['SERVER_NAME']."/reg.php?sp=".$row['member_id'];
				$no--;
			}
			$pagebar=pagebar(get_self(),"action=game&do=sp_data&",$page_current,$page_size,$count);
	}else{
			$pagebar="";
	}
	
	$smarty=new smarty();smarty_header();
	$smarty->assign('sp_list',$sp_list);
	$smarty->assign('pagebar',$pagebar);
	$smarty->display('sp_data.html');
}
//分析
if($do=='sp_analysis'){
	check_permissions('sp_read');
	$sp_id=empty($_GET['sp_id'])?0:intval($_GET['sp_id']);
	
	$sp_data=array();
	$sp_data['reg_count']=0;
	$sp_data['act_count']=0;
	$sp_data['act_rate']=0;
	$sp_data['pay_count']=0;
	$sp_data['pay_rate']=0;
	$sp_data['pay_money']=0;
	$sp_data['pay_arpu']=0;
	
	//注册用户
	$sql="select count(*) from ".$db_prefix."member where spread_user=$sp_id";
	$row=$GLOBALS['db']->getone($sql);
	if($row){
		$sp_data['reg_count']=$row[0];
	}
	//活跃用户（7天内有游戏记录）
	$sql="select count(*) from ".$db_prefix."member where spread_user=$sp_id and member_id in (select log_user_id from ".$db_prefix."gamelog where log_time>".strtotime('-7 day').")";
	$row=$GLOBALS['db']->getone($sql);
	if($row){
		$sp_data['act_count']=$row[0];
	}
	//活跃率
	if($sp_data['reg_count']>0){
		$sp_data['act_rate']=round(($sp_data['act_count']/$sp_data['reg_count'])*100,2);
	}
	//付费用户
	$sql="select count(*) from ".$db_prefix."member where spread_user=$sp_id and member_username in (select pay_game_user from ".$db_prefix."pay where pay_state=1)";
	$row=$GLOBALS['db']->getone($sql);
	if($row){
		$sp_data['pay_count']=$row[0];
	}
	//付费率
	if($sp_data['reg_count']>0){
		$sp_data['pay_rate']=round(($sp_data['pay_count']/$sp_data['reg_count'])*100,2);
	}
	//总金额
	$sql="select sum(pay_money) from ".$db_prefix."pay where pay_state=1 and pay_game_user in (select member_username from ".$db_prefix."member where spread_user=$sp_id)";
	$row=$GLOBALS['db']->getone($sql);
	if($row){
		$sp_data['pay_money']=$row[0];
	}
	//ARPU值
	if($sp_data['reg_count']>0){
		$sp_data['pay_arpu']=round(($sp_data['pay_money']/$sp_data['reg_count']),2);
	}
	
	$smarty=new smarty();smarty_header();
	$smarty->assign('sp_data',$sp_data);
	$smarty->display('sp_analysis.html');
}
//删除
if($do=='sp_delete'){
	check_permissions('sp_delete');
	$sp_id=empty($_GET['sp_id'])?0:intval($_GET['sp_id']);
	$db->delete($db_prefix."member","member_id=$sp_id");
	admin_log('delete','sp',$sp_id);
	clear_cache();
	message(array('text'=>'删除推广渠道成功！','link'=>'?action=game&do=sp_data'));
}
//提现申请
if($do=='sp_cash'){
	check_permissions('sp_read');
	
	$list=array();
	$sql="SELECT * FROM ".$db_prefix."cashlog";
	$page_size=30;
	$page_current=isset($_GET['page'])?intval($_GET['page']):1;
	$count=$GLOBALS['db']->getcount($sql);
	$res=$GLOBALS['db']->getall($sql." order by log_time desc limit ".(($page_current-1)*$page_size).",".$page_size);
	if($count>0){
			$no=$count-(($page_current-1)*$page_size);
			foreach($res as $row){
				$list[$row['log_id']]['id']=$row['log_id'];
				$list[$row['log_id']]['userid']=$row['userid'];
				$list[$row['log_id']]['username']=$row['username'];
				$list[$row['log_id']]['truename']=$row['truename'];
				$list[$row['log_id']]['idcard']=$row['idcard'];
				$list[$row['log_id']]['bank']=$row['bank'];
				$list[$row['log_id']]['bankno']=$row['bankno'];
				$list[$row['log_id']]['tel']=$row['tel'];
				$list[$row['log_id']]['cash']=$row['cash'];
				$list[$row['log_id']]['state']=$row['log_state'];
				$list[$row['log_id']]['log_ip']=$row['log_ip'];
				$list[$row['log_id']]['log_time']=$row['log_time'];
				$no--;
			}
			$pagebar=pagebar(get_self(),"action=game&do=sp_cash&",$page_current,$page_size,$count);
	}else{
			$pagebar="";
	}
	
	$smarty=new smarty();smarty_header();
	$smarty->assign('list',$list);
	$smarty->assign('pagebar',$pagebar);
	$smarty->display('sp_cash.html');
}
//更改状态
if($do=='cash_modify'){
	check_permissions('sp_write');
	$log_id=empty($_GET['log_id'])?0:intval($_GET['log_id']);
	$log_state=empty($_GET['state'])?0:intval($_GET['state']);
	if($log_state==0){
		$log_state=1;
	}
	else{
		$log_state=0;
	}
	
	$update=array();
	$update['log_state']=$log_state;
	$db->update($db_prefix."cashlog",$update,"log_id=$log_id");
	clear_cache();
	message(array('text'=>'更新提现申请成功！','link'=>'?action=game&do=sp_cash'));
}
//删除
if($do=='cashlog_delete'){
	check_permissions('sp_delete');
	$log_id=empty($_GET['log_id'])?0:intval($_GET['log_id']);
	$db->delete($db_prefix."cashlog","log_id=$log_id");
	clear_cache();
	message(array('text'=>'删除提现申请成功！','link'=>'?action=game&do=sp_cash'));
}

//生成配置文件
function payConfig($no, $config1, $config2, $config3, $config4, $config5, $config6, $config7){
	if($config1!='' && $config2!=''){
		require_once'/includes/class_file.php';
		$path="";
		if($no=='YEEPAY'){
			$path="/pay/yeepay/config.php";
			$content="<?php\r\n";
			$content.="\$p1_MerId='".$config1."';\r\n";
			$content.="\$merchantKey='".$config2."';\r\n";
			$content.="\$callbackUrl='".$config3."';\r\n";
			$content.="\$reqURL_onLine='".$config4."';\r\n";
			$content.="\$logName='YeePay_HTML.log';\r\n";
			$content.="\$p0_Cmd='Buy';\r\n";
			$content.="\$p9_SAF='0';\r\n";
			$content.="?>";
		}
		
		$fo=new fileoperate();
		$fo->write_file($path, $content);
	}
}
?>