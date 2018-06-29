<?php
require_once'includes/global.php';
require_once(ROOT_PATH.'languages/'.$config['site_language'].'/front.php');
require_once'includes/front.php';

if($id="get_server"){
 $game_id=empty($_GET['game_id'])?0:intval($_GET['game_id']);
 $server_list=server_array_list('server_is_pay=1 and game_id='.$game_id,'4');
 foreach($server_list as $server){
		echo '<li class="clearfix"><a target="_blank" href="game.php?action=play&game_id='.$server['game_id'].'&server_id='.$server['server_id'].'">'.$server['server_name'].'</a></li>';
	}

	exit;
}





?>