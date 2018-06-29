<?php
/**
 *游戏登陆接口类
*/
function game_login_gateway($userid, $username, $serverinfo, $extra){
	//游戏信息
	
	$gameinfo=get_game_info($serverinfo['game_id']);
	$login_url=$serverinfo['login_gateway'];
	
	//登陆接口
	switch ($gameinfo['game_no']){
	case 'MJL'://这个就是名剑录
		$server_id=$serverinfo['server_id'];
		$game_url=MJL_login($username,$serverinfo);
		break;
		case 'WDQK':
		$server_id=$serverinfo['server_id'];
		$game_url=WDQK_login($username,$serverinfo);
		break;
		case 'WSD':
		$server_id=$serverinfo['server_id'];
		$game_url=WSD_login($username,$serverinfo);
		break;
		case 'DJH':
		$server_id=$serverinfo['server_id'];
		$game_url=DJH_login($username,$serverinfo);
		break;
		case 'LIEMO':
		$server_id=$serverinfo['server_id'];
		$game_url=LIEMO_login($username,$serverinfo);
		break;
		case 'WZ':
		$server_id=$serverinfo['server_id'];
		$game_url=WZ_login($username,$serverinfo);
		break;
		case 'LIEYAN':
		$server_id=$serverinfo['server_id'];
		$game_url=LIEYAN_login($username,$serverinfo);
		break;
		case 'JLC':
		$server_id=$serverinfo['server_id'];
		$game_url=JLC_login($username,$serverinfo);
		break;
		case 'RXSG2':
		$server_id=$serverinfo['server_id'];
		$game_url=RXSG2_login($username,$serverinfo);
		break;
		case 'TIANJIE':
		$server_id=$serverinfo['server_id'];
		$game_url=TIANJIE_login($username,$serverinfo);
		break;
		case 'DXZ':
		$server_id=$serverinfo['server_id'];
		$game_url=DXZ_login($username,$serverinfo);
		break;
		case 'ZW':
		$server_id=$serverinfo['server_id'];
		$game_url=ZW_login($username,$serverinfo);
		break;
		case 'RXHZW':
		$server_id=$serverinfo['server_id'];
		$game_url=RXHZW_login($username,$serverinfo);
		break;
		case 'NS':
		$server_id=$serverinfo['server_id'];
		$game_url=NS_login($username,$serverinfo);
		break;
		case 'SQ':
		$server_id=$serverinfo['server_id'];
		$game_url=SQ_login($username,$serverinfo);
		break;
		case 'SSSG':
		$server_id=$serverinfo['server_id'];
		$game_url=SSSG_login($username,$serverinfo);
		break;
		
	
	}
	
	if(empty($game_url)){
		exit("err");
	}
	$game_info=array();
	$game_info['title']=$gameinfo['game_name']."-".$serverinfo['server_name'];
	$game_info['game_url']=$gameinfo['game_website'];
	$game_info['card_url']="card.php?game_id=".$gameinfo['game_id'];
	$game_info['pay_url']="pay.php?game_id=".$gameinfo['game_id']."&server_id=".$serverinfo['server_id'];
	$game_info['bbs_url']=$gameinfo['game_bbs'];
	$gameuser=$username;
	$smarty=new smarty();
	$smarty->assign('gameuser',$gameuser);
	$smarty->assign('game_url',$game_url);
	$smarty->assign('game_info',$game_info);
	$smarty->display('game_login.html');
	exit;
}

//MJL 	名剑录
function MJL_login($username, $serverinfo){
	$arr= pai_login_game_url($username,$serverinfo['server_id'],$serverinfo['game_id']);
    $game_url=$arr['url'];
	return $game_url;
}
//WDQK 	武斗乾坤
function WDQK_login($username, $serverinfo){
	$arr= pai_login_game_url($username,$serverinfo['server_id'],$serverinfo['game_id']);
    $game_url=$arr['url'];
	return $game_url;
}
//WSD 	无上道
function WSD_login($username, $serverinfo){
	$arr= pai_login_game_url($username,$serverinfo['server_id'],$serverinfo['game_id']);
    $game_url=$arr['url'];
	return $game_url;
}
//DJH 	斗将魂
function DJH_login($username, $serverinfo){
	$arr= pai_login_game_url($username,$serverinfo['server_id'],$serverinfo['game_id']);
    $game_url=$arr['url'];
	return $game_url;
}
//LIEMO 	猎魔
function LIEMO_login($username, $serverinfo){
	$arr= pai_login_game_url($username,$serverinfo['server_id'],$serverinfo['game_id']);
    $game_url=$arr['url'];
	return $game_url;
}
//WZ 	武尊
function WZ_login($username, $serverinfo){
	$arr= pai_login_game_url($username,$serverinfo['server_id'],$serverinfo['game_id']);
    $game_url=$arr['url'];
	return $game_url;
}
//LIEYAN 	烈焰
function LIEYAN_login($username, $serverinfo){
	$arr= pai_login_game_url($username,$serverinfo['server_id'],$serverinfo['game_id']);
    $game_url=$arr['url'];
	return $game_url;
}
//JLC 	九龙朝
function JLC_login($username, $serverinfo){
	$arr= pai_login_game_url($username,$serverinfo['server_id'],$serverinfo['game_id']);
    $game_url=$arr['url'];
	return $game_url;
}
//RXSG2 	热血三国2
function RXSG2_login($username, $serverinfo){
	$arr= pai_login_game_url($username,$serverinfo['server_id'],$serverinfo['game_id']);
    $game_url=$arr['url'];
	return $game_url;
}
//TIANJIE 	天界
function TIANJIE_login($username, $serverinfo){
	$arr= pai_login_game_url($username,$serverinfo['server_id'],$serverinfo['game_id']);
    $game_url=$arr['url'];
	return $game_url;
}
//DXZ 	大侠传
function DXZ_login($username, $serverinfo){
	$arr= pai_login_game_url($username,$serverinfo['server_id'],$serverinfo['game_id']);
    $game_url=$arr['url'];
	return $game_url;
}
//ZW 	真武.世家传说
function ZW_login($username, $serverinfo){
	$arr= pai_login_game_url($username,$serverinfo['server_id'],$serverinfo['game_id']);
    $game_url=$arr['url'];
	return $game_url;
}
//RXHZW 	热血海贼王
function RXHZW_login($username, $serverinfo){
	$arr= pai_login_game_url($username,$serverinfo['server_id'],$serverinfo['game_id']);
    $game_url=$arr['url'];
	return $game_url;
}
//NS 	逆神
function NS_login($username, $serverinfo){
	$arr= pai_login_game_url($username,$serverinfo['server_id'],$serverinfo['game_id']);
    $game_url=$arr['url'];
	return $game_url;
}
//SQ 	神曲
function SQ_login($username, $serverinfo){
	$arr= pai_login_game_url($username,$serverinfo['server_id'],$serverinfo['game_id']);
    $game_url=$arr['url'];
	return $game_url;
}
//SSSG 	盛世三国
function SSSG_login($username, $serverinfo){
	$arr= pai_login_game_url($username,$serverinfo['server_id'],$serverinfo['game_id']);
    $game_url=$arr['url'];
	return $game_url;
}

?>