<?php
$Shortcut = "[InternetShortcut]
URL=http://www.0514jiajiao.com/
IDList=
IconFile=http://www.0514jiajiao.com/favicon.ico
IconIndex=1
[{000214A0-0000-0000-C000-000000000046}]
Prop3=19,2";
Header("Content-type: application/octet-stream"); 
header("Content-Disposition: attachment; filename=我的游戏平台.url;"); 
echo $Shortcut; 
?>




