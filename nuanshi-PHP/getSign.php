<?php
	$authorKey = '559c0b3cd130df1e8eb4bab6fec2026';
	$time = time();
	$key = $_POST['user'] . $_POST['payway'] . $_POST['money'] . $_POST['gid'] . $_POST['sid'] . $authorKey . $time;
	$sign = md5($key);
	echo json_encode(array('sign'=>$sign,'time'=>$time));
	
	exit;

//End_php
?>