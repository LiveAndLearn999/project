<?php
/**
 * 前台公用
*/
function smarty_header($cache=false){
	$GLOBALS['smarty']->template_dir	=ROOT_PATH.'templates/'.$GLOBALS['config']['site_template'];
	$GLOBALS['smarty']->cache_dir		=ROOT_PATH.'temps/cache';
	$GLOBALS['smarty']->compile_dir	=ROOT_PATH.'temps/compile';
	if($cache){
		$GLOBALS['smarty']->caching=true;
	}
	$GLOBALS['smarty']->assign('language',$GLOBALS['language']);
	$GLOBALS['smarty']->assign('config',$GLOBALS['config']);
	$GLOBALS['smarty']->assign('top_menu',get_menu(0));
	$GLOBALS['smarty']->assign('bottom_menu',get_menu(1));
	
	/*$sql ="SELECT * FROM ".$GLOBALS['db_prefix']."ad WHERE ad_state=1 ORDER BY ad_id ASC";
	$res = $GLOBALS['db']->getAll($sql);
	foreach ($res AS $row){
		if($row['ad_start']<=time()&&$row['ad_end']>=time()){
			$GLOBALS['smarty']->assign('ad_'.$row['ad_id'],$row['ad_content']);
		}
	}*/
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
function insert_get_login_state(){
	if(check_login()){
		return '1';
	}
	else{
		return '0';
	}
}
function insert_get_login_name(){
	if(check_login()){
	return $_SESSION['member_username'];
	}
	else{
		return '';
	}
}
function insert_get_last_time(){
	if(check_login()){
	$namesit=$_SESSION['member_username'];
	$row=$GLOBALS['db']->getone("SELECT * FROM ".$GLOBALS['db_prefix']."member WHERE member_username='".$namesit."'");
	$lasttime=date('Y年m月d日 H:s',$row['member_last_time']);
	return $lasttime;
	}
	else{
		return '';
	}
}
function insert_get_last_ip(){
	if(check_login()){
	$namesit=$_SESSION['member_username'];
	$row=$GLOBALS['db']->getone("SELECT * FROM ".$GLOBALS['db_prefix']."member WHERE member_username='".$namesit."'");
	$lastip = $row['member_last_ip'];
	
	return $lastip;
	}
	else{
		return '';
	}
}
function insert_get_mail(){
	if(check_login()){
	$namesit=$_SESSION['member_username'];
	$row=$GLOBALS['db']->getone("SELECT * FROM ".$GLOBALS['db_prefix']."member WHERE member_username='".$namesit."'");
	$safemail = $row['member_mail'];
	if(!empty($safemail)){
	
	return '已绑定';
	}else{
	return '未绑定';
	}
	}
	else{
		return '';
	}
}
function insert_get_phone(){
	if(check_login()){
	$namesit=$_SESSION['member_username'];
	$row=$GLOBALS['db']->getone("SELECT * FROM ".$GLOBALS['db_prefix']."member WHERE member_username='".$namesit."'");
	$safephone = $row['member_phone'];
	if(!empty($safephone)){
	
	return '已绑定';
	}else{
	return '未绑定';
	}
	}
	else{
		return '';
	}
}
function insert_get_card(){
	if(check_login()){
	$namesit=$_SESSION['member_username'];
	$row=$GLOBALS['db']->getone("SELECT * FROM ".$GLOBALS['db_prefix']."member WHERE member_username='".$namesit."'");
	$safecard = $row['member_card'];
	if(!empty($safecard)){
	
	return '已绑定';
	}else{
	return '未绑定';
	}
	}
	else{
		return '';
	}
}

function insert_get_safe(){
	if(check_login()){
	$namesit=$_SESSION['member_username'];
	$row=$GLOBALS['db']->getone("SELECT * FROM ".$GLOBALS['db_prefix']."member WHERE member_username='".$namesit."'");
	$safecode = $row['member_safecode'];
	$safemail = $row['member_mail'];
	$safephone = $row['member_phone'];
	$safecard = $row['member_card'];
	if (!empty($safecode)){
	$codelev=20;
	}else{
	$codelev =0;
	}
	if(!empty($safemail)){
	$maillev=20;
	}else{
	$maillev=0;
	}
	if(!empty($safephone)){
	$phonelev=20;
	}else{
	$phonelev=0;
	}
	if(!empty($safecard)){
	$cardlev=20;
	}else{
	$cardlev=0;
	}	
	$leve=$codelev+$maillev+$phonelev+$cardlev+20;
	
	return $leve;
	}
	else{
		return '';
	}
}

function redirect($url){
	/*$html='<script type="text/javascript">';
	$html.='window.setTimeout(function(){location.href="'.$url.'";},1000);';
	$html.='</script>';
	echo $html;*/
	header('Location:'.$url);
	exit;
}
function webclient($url){
	$ch = curl_init(); 
	curl_setopt($ch, CURLOPT_URL, $url); 
	curl_setopt($ch, CURLOPT_HEADER, false); 
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$ret = curl_exec($ch);
	return $ret;
}
function get_diy_content($channel_id,$category_id=0,$limit=20){
	$channel_info=get_channel_info($channel_id);
    $sql = "SELECT * FROM ".$GLOBALS['db_prefix']."content WHERE content_state=1 and channel_id='".$channel_id."'";
	if($category_id>0){
		$sql .= " AND category_id=$category_id	";
	}
	$sql .= "ORDER BY content_id DESC LIMIT 0,$limit";
    $res = $GLOBALS['db']->getall($sql);
	$array=array();
	if(count($res)>0){
		foreach($res as $row){
			$array[$row['content_id']]['id']=$row['content_id'];
			$array[$row['content_id']]['title']=truncate($row['content_title'],$channel_info['index_truncate']);
			$array[$row['content_id']]['text']=truncate(strip_tags($row['content_text']),40);
			$array[$row['content_id']]['thumb']=$row['content_thumb'];
			if(substr($row['content_thumb'],0,4)=='http'){
				$array[$row['content_id']]['thumb_http']=true;
			}else{
				$array[$row['content_id']]['thumb_http']=false;
			}
			$array[$row['content_id']]['time']=date("Y-m-d",$row['content_time']);
			$array[$row['content_id']]['member_photo']=get_member_photo($row['member_id']);
			if(empty($row['content_url'])){
				$array[$row['content_id']]['url']=create_uri('content',array('id'=>$row['content_id']));
				$array[$row['content_id']]['target']=false;
			}else{
				$array[$row['content_id']]['url']=$row['content_url'];
				$array[$row['content_id']]['target']=true;
			}
			$array[$row['content_id']]['category_id']=$row['category_id'];
			$array[$row['content_id']]['category_name']=get_category_name($row['category_id']);
			$array[$row['content_id']]['links']=get_content_link_list($row['content_id']);
			$array[$row['content_id']]['comment_count']=$row['content_comment_count'];
		}
	}
	return $array;
}
function get_content_comment($channel_id=0){
	$array=array();

	if($channel_id>0){
		$res=$GLOBALS['db']->getall("SELECT * FROM ".$GLOBALS['db_prefix']."content_comment AS a LEFT JOIN ".$GLOBALS['db_prefix']."content as b on a.content_id=b.content_id AND b.channel_id=1 AND a.parent_id=0 WHERE  a.comment_state=1  ORDER BY a.comment_id DESC limit 0,".$GLOBALS['config']['index_comment_size']);
	}else{
		$res=$GLOBALS['db']->getall("SELECT * FROM ".$GLOBALS['db_prefix']."content_comment WHERE parent_id=0 AND comment_state=1 ORDER BY comment_id DESC limit 0,".$GLOBALS['config']['index_comment_size']);
	}
	if($res){
		foreach($res as $row){
			$array[$row['comment_id']]['id']=$row['comment_id'];
			$array[$row['comment_id']]['content']=filter_badwords(encode_comment(truncate($row['comment_content'],$GLOBALS['config']['index_comment_content_size'])),$GLOBALS['config']['site_badwords']);
			$array[$row['comment_id']]['reply']=$row['comment_reply'];
			$array[$row['comment_id']]['time']=date("Y-m-d H:i:s",$row['comment_time']);
			$array[$row['comment_id']]['member_id']=$row['member_id'];
			$array[$row['comment_id']]['member_photo']=get_member_photo($row['member_id']);
			$array[$row['comment_id']]['content_id']=$row['content_id'];
			$array[$row['comment_id']]['url']=create_uri('content',array('id'=>$row['content_id']));
		}
	}
	return $array;
}
function get_hot_content($channel_id=0){
	$is_channel=$channel_id>0?'AND channel_id='.$channel_id:'';
    $sql ="SELECT * FROM ".$GLOBALS['db_prefix']."content WHERE content_state=1 ";
	$sql.=" AND channel_id in (SELECT channel_id FROM ".$GLOBALS['db_prefix']."content_channel WHERE channel_list_style!=5 ".$is_channel.")";
	$sql.=" ORDER BY content_click_count DESC limit 0,".$GLOBALS['config']['content_hot_size'];
    $res = $GLOBALS['db']->getall($sql);
	$array=array();
	$no=1;
    foreach ($res AS $row){
		$array[$row['content_id']]['no']=$no;
		$array[$row['content_id']]['id']=$row['content_id'];
		$array[$row['content_id']]['title']=truncate($row['content_title'],$GLOBALS['config']['content_hot_title_size']);
		$array[$row['content_id']]['thumb']=$row['content_thumb'];
		if(empty($row['content_url'])){
			$array[$row['content_id']]['url']=create_uri('content',array('id'=>$row['content_id']));
			$array[$row['content_id']]['target']=false;
		}else{
			$array[$row['content_id']]['url']=$row['content_url'];
			$array[$row['content_id']]['target']=true;
		}
		$no++;
    }
    return $array;
}
function get_best_content($channel_id=0){
	$is_channel=$channel_id>0?'AND channel_id='.$channel_id:'';
    $sql ="SELECT * FROM ".$GLOBALS['db_prefix']."content WHERE content_state=1 AND  content_is_best=1";
	$sql.=" AND channel_id in (SELECT channel_id FROM ".$GLOBALS['db_prefix']."content_channel WHERE channel_list_style!=5 ".$is_channel.")";
	$sql .=" ORDER BY content_id DESC limit 0,".$GLOBALS['config']['content_best_size'];
    $res = $GLOBALS['db']->getall($sql);
	$array=array();
	$no=1;
    foreach ($res AS $row){
		$array[$row['content_id']]['no']=$no;
		$array[$row['content_id']]['id']=$row['content_id'];
		$array[$row['content_id']]['title']=truncate($row['content_title'],$GLOBALS['config']['content_best_title_size']);
		$array[$row['content_id']]['thumb']=$row['content_thumb'];
		if(empty($row['content_url'])){
			$array[$row['content_id']]['url']=create_uri('content',array('id'=>$row['content_id']));
			$array[$row['content_id']]['target']=false;
		}else{
			$array[$row['content_id']]['url']=$row['content_url'];
			$array[$row['content_id']]['target']=true;
		}
		$no++;
    }
    return $array;
}
function check_login(){
	if(isset($_SESSION['member_id'])&&$_SESSION['member_id']>0){
		return true;
	}else{
		return false;

	}
}
function get_member_nickname($member_id){
	if($member_id=='')return'';
	if($member_id>0){
		$row=$GLOBALS['db']->getone("SELECT member_nickname FROM ".$GLOBALS['db_prefix']."member WHERE member_id='".$member_id."'");
		$member_nickname=$row['member_nickname'];
	}else{
		$member_nickname='';
	}
	return $member_nickname;
}
function get_member_photo($member_id){
	if($member_id=='')return'';
	if($member_id>0){
		$row=$GLOBALS['db']->getone("SELECT member_photo FROM ".$GLOBALS['db_prefix']."member WHERE member_id='".$member_id."'");
		$member_photo=$row['member_photo'];
	}else{
		$member_photo='';
	}
	return $member_photo;
}
function get_menu($mode){
	$array=array();
	$res=$GLOBALS['db']->getall("SELECT * FROM ".$GLOBALS['db_prefix']."menu WHERE menu_mode=".$mode." and menu_state=1 and parent_id=0 ORDER BY menu_sort ASC,menu_id ASC");
	if($res){
		$URI=substr(strrchr($_SERVER['REQUEST_URI'],'/'),1);
		$n=1;
		foreach($res as $row){
			$array[$row['menu_id']]['id']=$row['menu_id'];
			$array[$row['menu_id']]['name']=$row['menu_name'];
			$array[$row['menu_id']]['link']=$row['menu_link'];
			$array[$row['menu_id']]['target']=$row['menu_target'];
			$array[$row['menu_id']]['children']=get_menu_children($row['menu_id']);
			if(empty($URI)){
				if($n==1||$row['menu_link']=="./"){
					$array[$row['menu_id']]['active']=true;
				}
			}else{
				if($URI==$row['menu_link']){
					$array[$row['menu_id']]['active']=true;
				}
				if(substr($URI,0,7)=='content'){
					$content_id=empty($_GET['id'])?'':intval($_GET['id']);
					$content_row=$GLOBALS['db']->getone("SELECT channel_id FROM ".$GLOBALS['db_prefix']."content WHERE content_id='$content_id'");
					if($content_row){
						$rewrite=$GLOBALS['config']['rewrite_state'];
						if($rewrite=='yes'){
							preg_match('/channel\-(.*)\.html/',$row['menu_link'],$matches);
							if(!empty($matches)){
								if($matches[1]==$content_row['channel_id']){
									$array[$row['menu_id']]['active']=true;
								}
							}
						}else{
							preg_match('/channel\.php\?id\=(.*)/',$row['menu_link'],$matches);
							if(!empty($matches)){
								if($matches[1]==$content_row['channel_id']){
									$array[$row['menu_id']]['active']=true;
								}
							}
						}
					}
				}
			}
			$n++;
		}
	}
	return $array;
}
function get_menu_children($parent_id){
	$array=array();
	$res=$GLOBALS['db']->getall("SELECT * FROM ".$GLOBALS['db_prefix']."menu WHERE parent_id=$parent_id and menu_state=1 ORDER BY menu_sort ASC,menu_id ASC");
	if($res){
		foreach($res as $row){
			$array[$row['menu_id']]['id']=$row['menu_id'];
			$array[$row['menu_id']]['name']=$row['menu_name'];
			$array[$row['menu_id']]['link']=$row['menu_link'];
			$array[$row['menu_id']]['target']=$row['menu_target'];
		}
	}
	return $array;
}
function get_member_info($member_id){
	if(empty($member_id)){
		return array();
	}
	$row=$GLOBALS['db']->getone("SELECT * FROM ".$GLOBALS['db_prefix']."member WHERE member_id='".$member_id."'");
	$array=array();
	$array['id']			=$row['member_id'];
	$array['mail']			=$row['member_mail'];
	$array['nickname']		=$row['member_nickname'];
	$array['name']			=$row['member_name'];
	$array['sex']			=$row['member_sex'];
	$array['birthday']		=date("Y-m-d",$row['member_birthday']);
	$array['phone']			=$row['member_phone'];
	$array['photo']			=$row['member_photo'];
	$array['from']			=$row['member_from'];
	$array['other']			=$row['member_other'];
	return $array;
}
function create_uri($app,$params=''){
	if(!empty($params)){
		extract($params);
	}
	$rewrite=$GLOBALS['config']['rewrite_state'];
	$ext='html';
	if($app=='index'){
		if($rewrite=='yes'){
			$uri=$app;
		}else{
			$uri=$app.'.php';
		}
	}elseif($app=='content'){
		if($rewrite=='yes'){
			$uri=$app.'-'.$id;
			if(!empty($page)){
				$uri.='-'.$page;
			}
		}else{
			$uri=$app.'.php?id='.$id;
			if(!empty($page)){
				$uri.='&amp;page='.$page;
			}
		}
	}elseif($app=='channel'){
		if($rewrite=='yes'){
			$uri=$app.'-'.$id;
			if(!empty($category_id)){
				$uri.='-'.$category_id;
			}
			if(!empty($page)){
				$uri.='-p'.$page;
			}
		}else{
			$uri=$app.'.php?id='.$id;
			if(!empty($category_id)){
				$uri.='&amp;category_id='.$category_id;
			}
			if(!empty($page)){
				$uri.='&amp;page='.$page;
			}
		}
	}elseif($app=='page'){
		if($rewrite=='yes'){
			$uri=$app.'-'.$id;
		}else{
			$uri=$app.'.php?id='.$id;
		}
	}elseif($app=='feedback'){
		if($rewrite=='yes'){
			$uri=$app;
			if(!empty($page)){
				$uri.='-'.$page;
			}
		}else{
			$uri=$app.'.php';
			if(!empty($page)){
				$uri.='?page='.$page;
			}
		}
	}
	if($rewrite=='yes'){
		$uri.='.'.$ext;
	}
	return $uri;
}
function here($page,$parameters=array()){
	$html='';
	if($page=='index'){
		$html.=$GLOBALS['config']['site_notice'];
	}else if($page=='page'){
		$page_id=empty($parameters['id'])?'':intval($parameters['id']);
		$row=$GLOBALS['db']->getone("SELECT page_title FROM ".$GLOBALS['db_prefix']."page WHERE page_id='$page_id'");
		if($row){
			$html.="<a href=\"./\">".$GLOBALS['language']['position_index']."</a>&nbsp;&raquo;&nbsp;".$row['page_title'];
		}
	}else if($page=='search'){
		$html.=$GLOBALS['language']['position_index']."&nbsp;&raquo;&nbsp;".$GLOBALS['language']['search_result'];
	}else if($page=='channel'){
		$channel_id=empty($parameters['id'])?'':intval($parameters['id']);
		$category_id=empty($parameters['category_id'])?'':intval($parameters['category_id']);
		$row=$GLOBALS['db']->getone("SELECT channel_id,channel_name FROM ".$GLOBALS['db_prefix']."content_channel WHERE channel_id='$channel_id'");
		if($row){
			$html.="<a href=\"./\">".$GLOBALS['language']['position_index']."</a>&nbsp;&raquo;&nbsp;<a href=\"".create_uri('channel',array('id'=>$row['channel_id']))."\">".$row['channel_name']."</a>";
		}
		$row=$GLOBALS['db']->getone("SELECT channel_id,category_id,category_name FROM ".$GLOBALS['db_prefix']."content_category WHERE category_id='$category_id'");
		if($row){
			$html.="&nbsp;&raquo;&nbsp;<a href=\"".create_uri('channel',array('id'=>$row['channel_id'],'category_id'=>$row['category_id']))."\">".$row['category_name']."</a>";
		}
	}else if($page=='content'){
		$content_id=empty($parameters['id'])?'':intval($parameters['id']);
		$content_info=get_content_info($content_id);
		$channel_id=$content_info['channel_id'];
		$category_id=$content_info['category_id'];
		$row=$GLOBALS['db']->getone("SELECT channel_id,channel_name FROM ".$GLOBALS['db_prefix']."content_channel WHERE channel_id='$channel_id'");
		if($row){
			$html.="<a href=\"./\">".$GLOBALS['language']['position_index']."</a>&nbsp;&raquo;&nbsp;<a href=\"".create_uri('channel',array('id'=>$row['channel_id']))."\">".$row['channel_name']."</a>";
		}
		$row=$GLOBALS['db']->getone("SELECT channel_id,category_id,category_name FROM ".$GLOBALS['db_prefix']."content_category WHERE category_id='$category_id'");
		if($row){
			$html.="&nbsp;&raquo;&nbsp;<a href=\"".create_uri('channel',array('id'=>$row['channel_id'],'category_id'=>$row['category_id']))."\">".$row['category_name']."</a>";
		}
	}else if($page=='member_edit'){
		$html.="<a href=\"./\">".$GLOBALS['language']['position_index']."</a>&nbsp;&raquo;&nbsp;".$GLOBALS['language']['member_modify']."";
	}else if($page=='member_comment_list'){
		$html.="<a href=\"./\">".$GLOBALS['language']['position_index']."</a>&nbsp;&raquo;&nbsp;".$GLOBALS['language']['member_comment_list']."";
	}else if($page=='member_content_list'){
		$html.="<a href=\"./\">".$GLOBALS['language']['position_index']."</a>&nbsp;&raquo;&nbsp;".$GLOBALS['language']['member_content_list']."";
	}else if($page=='member_content'){
		$channel_id=empty($parameters['id'])?'':intval($parameters['id']);
		$mode=empty($parameters['mode'])?'':trim($parameters['mode']);
		$row=$GLOBALS['db']->getone("SELECT channel_id,channel_name FROM ".$GLOBALS['db_prefix']."content_channel WHERE channel_id='$channel_id'");
		if($row){
			$html.="<a href=\"./\">".$GLOBALS['language']['position_index']."</a>&nbsp;&raquo;&nbsp;<a href=\"".create_uri('channel',array('id'=>$row['channel_id']))."\">".$row['channel_name']."</a>";
		}
		$html.="&nbsp;&raquo;&nbsp;";
		if($mode=='insert'){
			$html.=$GLOBALS['language']['content_add'];
		}else{
			$html.=$GLOBALS['language']['content_edit'];
		}
	}else if($page=='feedback'){
		$html.="<a href=\"./\">".$GLOBALS['language']['position_index']."</a>&nbsp;&raquo;&nbsp;<a href=\"".create_uri('feedback')."\">".$GLOBALS['language']['position_feedback']."</a>";
	}
	return $html;
}
function pagebar($page_name,$page_parameters='',$page_current,$page_size,$count){
	$rewrite=$GLOBALS['config']['rewrite_state'];
	$rewrite_parameters=array();
	parse_str($page_parameters);
	if($page_name=='channel'){
			if(!empty($id)){
				$rewrite_parameters['id']=$id;
			}
			if(!empty($category_id)){
				$rewrite_parameters['category_id']=$category_id;
			}
	}
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
	//$html.="<span class=\"total\">".$count."</span>";
	$html.="<span class=\"info\">".$page_current." / ".$page_count."</span>";

	if($page_current!=1){
		if($rewrite=='yes'){
			$rewrite_parameters['page']=1;
			$html.="<a class=\"a1\" href='".create_uri($page_name,$rewrite_parameters)."'>上一页</a>";
		}else{
			$html.="<a class=\"a1\" href='".$page_name.".php?".$page_parameters."page=1'>上一页</a>";
		}
	}
	for($i=$page_start;$i<=$page_end;$i++){
		if($i==$page_current){
			$html.="<span class=\"current\">".$i."</span>";
		}else{
			if($rewrite=='yes'){
				$rewrite_parameters['page']=$i;
				$html.="<a class=\"a1\" href='".create_uri($page_name,$rewrite_parameters)."'>".$i."</a>";
			}else{
				$html.="<a class=\"a1\" href='".$page_name.".php?".$page_parameters."page=".$i."'>".$i."</a>";
			}
		}
	}
	if($page_current!=$page_count){
		if($rewrite=='yes'){
			$rewrite_parameters['page']=$page_count;
			$html.="<a class=\"a1\" href='".create_uri($page_name,$rewrite_parameters)."'>下一页</a>";
		}else{
			$html.="<a class=\"a1\" href='".$page_name.".php?".$page_parameters."page=".$page_count."'>下一页</a>";
		}
	}

	$html.="</div>";
	return $html;
}
function get_vote($place_id){
	$array=array();
	$res=$GLOBALS['db']->getall("SELECT * FROM ".$GLOBALS['db_prefix']."vote WHERE (vote_place=$place_id OR vote_place=0)  AND vote_state=1 ORDER BY vote_id DESC");
	if($res){
		foreach($res as $row){
			if($row['vote_start']<=time()&&$row['vote_end']>=time()){
			$array[$row['vote_id']]['id']=$row['vote_id'];
			$array[$row['vote_id']]['title']=$row['vote_title'];
			$array[$row['vote_id']]['mode']=$row['vote_mode'];
			$array[$row['vote_id']]['items']=get_vote_items($row['vote_id']);
			}
		}
	}
	return $array;
}
function get_vote_items($vote_id){
	$array=array();
	$res=$GLOBALS['db']->getall("SELECT * FROM ".$GLOBALS['db_prefix']."vote_item WHERE vote_id=".$vote_id." ORDER BY vote_id ASC");
	if($res){
		foreach($res as $row){
			$array[$row['item_id']]['id']=$row['item_id'];
			$array[$row['item_id']]['title']=$row['item_title'];
			$array[$row['item_id']]['count']=$row['item_count'];
		}
	}
	return $array;
}
function set_online($url){
	if($GLOBALS['db']->getcount("select * from ".$GLOBALS['db_prefix']."online where online_ip='".get_ip()."'")>0){
		$sql="update ".$GLOBALS['db_prefix']."online set online_time='".$_SERVER['REQUEST_TIME']."',online_url='".$url."',online_agent='".get_os()."/".get_bs()."' where online_ip='".get_ip()."'";
	}else{
		$sql="insert into ".$GLOBALS['db_prefix']."online(online_time,online_ip,online_url,online_agent) values('".$_SERVER['REQUEST_TIME']."','".get_ip()."','".$url."','".get_os()."/".get_bs()."');";
	}
	$GLOBALS['db']->query($sql);
	$GLOBALS['db']->delete($GLOBALS['db_prefix']."online","online_time<UNIX_TIMESTAMP(NOW())-(60*".$GLOBALS['config']['online_time'].")");
}
function online(){
 
 $count=$GLOBALS['db']->getcount("select * from ".$GLOBALS['db_prefix']."online");
 $xncount=rand(90000,100000);
 $zcount=$count*24+$xncount;
 return $zcount;
}

function check_permissions($permissions){
	$state=false;
	if($permissions==-1){//当权限是游客
		$state=true;
	}elseif($permissions==0){//当权限是注册用户
		if(check_login()){
			$state=true;
		}
	}elseif($permissions>0){//当权限是用户组设定的级别
		if(check_login()){
			$row=$GLOBALS['db']->getone("SELECT group_id FROM ".$GLOBALS['db_prefix']."member WHERE member_id='".$_SESSION['member_id']."'");
			if($row){
				if($row['group_id']>=$permissions){
					$state=true;
				}
			}
		}
	}
	return $state;
}
function get_category($channel_id,$category_id=0){
	$children_count= $GLOBALS['db']->getcount("SELECT * FROM ".$GLOBALS['db_prefix']."content_category WHERE parent_id='$category_id' and channel_id=$channel_id AND category_state = 1");
	if($children_count==0){
        $row=$GLOBALS['db']->getone("SELECT parent_id FROM ".$GLOBALS['db_prefix']."content_category WHERE category_id='$category_id' and channel_id=$channel_id AND category_state = 1");
		$category_id=$row['parent_id'];
	}
    if ($category_id > 0){
        $row=$GLOBALS['db']->getone("SELECT parent_id FROM ".$GLOBALS['db_prefix']."content_category WHERE category_id='$category_id' and channel_id=$channel_id AND category_state = 1");
        $parent_id=$row['parent_id'];

    }else{
        $parent_id=0;
    }
	$res = $GLOBALS['db']->getall("SELECT category_id,category_name,category_deep,parent_id,category_state FROM ".$GLOBALS['db_prefix']."content_category WHERE parent_id = '$parent_id' AND category_state = 1 AND channel_id=$channel_id ORDER BY category_sort ASC, category_id ASC");
	$array=array();
	foreach ($res AS $row){
		$array[$row['category_id']]['id']   = $row['category_id'];
		$array[$row['category_id']]['name'] = $row['category_name'];
		$array[$row['category_id']]['deep'] = $row['category_deep'];
		$array[$row['category_id']]['children'] = get_category_children($channel_id,$row['category_id']);
		$array[$row['category_id']]['url']   = create_uri("channel",array('id'=>$channel_id,'category_id'=>$row['category_id']));
	}
	return $array;
}
function get_category_children($channel_id,$category_id=0){
    $array = array();
	$res = $GLOBALS['db']->getall("SELECT category_id,category_name,category_deep,parent_id FROM ".$GLOBALS['db_prefix']."content_category WHERE parent_id = '$category_id' AND category_state = 1 AND channel_id=$channel_id ORDER BY category_sort ASC, category_id ASC");
	foreach ($res AS $row){
		$array[$row['category_id']]['id']=$row['category_id'];
		$array[$row['category_id']]['name']=$row['category_name'];
		$array[$row['category_id']]['deep']=$row['category_deep'];
		$array[$row['category_id']]['url']=create_uri("channel",array('id'=>$channel_id,'category_id'=>$row['category_id']));
	}
    return $array;
}
function content_page($content,$content_id){
	$page_tag='#page#';//设定分页标签
	if(strpos($content,$page_tag)){
		$explode=explode($page_tag,$content);
		$page_count=count($explode);
		$page_current=isset($_GET['page'])?intval($_GET['page']):1;
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
		$html=$explode[$page_current-1];
		$html.="<div class=\"pagebar\" style='text-align:center'>";
		if($page_current!=1){
				$html.="<a href='".create_uri('content',array('id'=>$content_id,'page'=>1))."'>&laquo;</a>";
		}
		for($i=$page_start;$i<=$page_end;$i++){
			if($i==$page_current){
				$html.="<span class=\"current\">".$i."</span>";
			}else{
				$html.="<a href='".create_uri('content',array('id'=>$content_id,'page'=>$i))."'>".$i."</a>";
			}
		}
		if($page_current!=$page_count){
			$html.="<a href='".create_uri('content',array('id'=>$content_id,'page'=>$page_count))."'>&raquo;</a>";
		}
		$html.="</div>";
		return $html;
	}else{
		return $content;
	}
}
function get_content_comment_children($comment_id){
	$array=array();
	$res=$GLOBALS['db']->getall("SELECT * FROM ".$GLOBALS['db_prefix']."content_comment WHERE parent_id=".$comment_id." and comment_state=1 ORDER BY comment_id ASC");
	if($res){
		$no=1;
		foreach($res as $row){
			$array[$row['comment_id']]['no']=$no;
			$array[$row['comment_id']]['id']=$row['comment_id'];
			$array[$row['comment_id']]['content']=encode_comment(filter_badwords($row['comment_content'],$GLOBALS['config']['site_badwords']));
			$array[$row['comment_id']]['reply']=encode_comment(filter_badwords($row['comment_reply'],$GLOBALS['config']['site_badwords']));
			$array[$row['comment_id']]['time']=date("Y-m-d H:i:s",$row['comment_time']);
			$array[$row['comment_id']]['ip']=$row['comment_ip'];
			$array[$row['comment_id']]['ip_address']=get_ip_address($row['comment_ip']);
			$array[$row['comment_id']]['content_id']=$row['content_id'];
			$array[$row['comment_id']]['nickname']=get_member_nickname($row['member_id']);
			$array[$row['comment_id']]['member_id']=$row['member_id'];
			$array[$row['comment_id']]['photo']=get_member_photo($row['member_id']);
			$no++;
		}
	}
	return $array;
}
if($GLOBALS['config']['site_state']=='no'){
	exit($GLOBALS['config']['site_close_text']);
}
$site_ip=explode("\n",$GLOBALS['config']['site_ip']);
if(count($site_ip)>0){
	$my_ip=get_ip();
	foreach($site_ip as $value){
		if(!empty($value)){
			if($my_ip==$value){
				exit($language['ip_stop']);
				break;
			}
		}
		if(strpos($value,'*')){
			$a=explode('.',$value);
			$b=explode('.',$my_ip);
			$c=$b[0].".".$b[1].".".$b[2];
			$d=$a[0].".".$a[1].".".$a[2];
			if($c==$d){
				exit($language['ip_stop']);
				break;
			}
		}
	}
}

function checksfznum($sfznum, $len = 'both'){
  if (strlen ( $sfznum ) == 15 && $len == 'both') { //当$len不等于'both'时，15位号码无效
   $truenum = substr ( $sfznum, 0, 6 ) . '19' . substr ( $sfznum, 6 ); //为返回18位号码作准备。
   $preg = "/^[\\d]{8}((0[1-9])|(1[0-2]))((0[1-9])|([12][\\d])|(3[01]))[\\d]{3}$/";
  } elseif (strlen ( $sfznum ) == 18) {
   $truenum = substr ( $sfznum, 0, 17 );
   $preg = "/^[\\d]{6}((19[\\d]{2})|(200[0-8]))((0[1-9])|(1[0-2]))((0[1-9])|([12][\\d])|(3[01]))[\\d]{3}[0-9xX]$/";
  } else {
   return false;
  }
  if (! preg_match ( $preg, $sfznum )) {
   return false; //完成正则表达式检测
  }
  
  /*-----------以下计算第18位验证码-------------*/
  $nsum = substr ( $truenum, 0, 1 ) * 7;
  $nsum = $nsum + substr ( $truenum, 1, 1 ) * 9;
  $nsum = $nsum + substr ( $truenum, 2, 1 ) * 10;
  $nsum = $nsum + substr ( $truenum, 3, 1 ) * 5;
  $nsum = $nsum + substr ( $truenum, 4, 1 ) * 8;
  $nsum = $nsum + substr ( $truenum, 5, 1 ) * 4;
  $nsum = $nsum + substr ( $truenum, 6, 1 ) * 2;
  $nsum = $nsum + substr ( $truenum, 7, 1 ) * 1;
  $nsum = $nsum + substr ( $truenum, 8, 1 ) * 6;
  $nsum = $nsum + substr ( $truenum, 9, 1 ) * 3;
  $nsum = $nsum + substr ( $truenum, 10, 1 ) * 7;
  $nsum = $nsum + substr ( $truenum, 11, 1 ) * 9;
  $nsum = $nsum + substr ( $truenum, 12, 1 ) * 10;
  $nsum = $nsum + substr ( $truenum, 13, 1 ) * 5;
  $nsum = $nsum + substr ( $truenum, 14, 1 ) * 8;
  $nsum = $nsum + substr ( $truenum, 15, 1 ) * 4;
  $nsum = $nsum + substr ( $truenum, 16, 1 ) * 2;

  $yzm = 12 - $nsum % 11;
  
  if ($yzm == 10){
   $yzm = 'x';
  } elseif ($yzm == 12) {
   $yzm = '1';
  } elseif ($yzm == 11) {
   $yzm = '0';
  }
   /*----------18位验证码计算完成-------------*/
  if (strlen ( $sfznum ) == 18) {
   if (strtolower(substr($sfznum, 17, 1)) != $yzm)
    return false;
  }
  return true;
}
function get_channel_name($channel_id){
	if(empty($channel_id))return'';
	$row=$GLOBALS['db']->getone("SELECT channel_name FROM ".$GLOBALS['db_prefix']."content_channel WHERE channel_id='".$channel_id."'");
	return $row[0];
	
	}
?>