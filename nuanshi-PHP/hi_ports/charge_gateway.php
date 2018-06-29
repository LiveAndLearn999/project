<?php
/**
 *游戏充值接口类
*/
function game_charge_gateway($game_id,$server_id,$game_user,$order_no,$money){
	//payport
    $pid='30';
	$gid=$game_id;
	$sid=$server_id;
	$uid=$game_user;
	$order=$order_no;
	$amount=$money;
	$time=time();
	$chargeKey='c9f8a9197e60492fa994b5a552e31400';
	$str = implode( '&', array( $pid, $gid, $sid, $uid, $order, $amount, $time, $chargeKey ) );
	$sign = MD5($str);
	$url='http://www.zifugame.com:8008/api/charge/?pid='.$pid.'&gid='.$gid.'&sid='.$sid.'&uid='.$uid.'&order='.$order.'&amount='.$amount.'&time='.$time.'&sign='.$sign;
	//payportend
	$back=file_get_contents($url);
	var_dump($back);
}
?>