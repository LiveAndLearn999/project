<?php
require_once('includes/global.php');
require_once(ROOT_PATH.'languages/'.$config['site_language'].'/front.php');
require_once('includes/front.php');

$action=isset($_GET['action'])?$_GET['action']:'';
//QQ登陆
if($action=="qq"){
	require_once(ROOT_PATH.'oauth/qq/function.php');
	$sState = md5(date("YmdHis".getip()));
	$_SESSION["state"] = $sState;
	$aScope = array();
	foreach($aConfig["api"] as $key=>$val){
		if($val==1){
			$aScope[] = $key;
		}
	}
	$f=urlencode($_SERVER['HTTP_REFERER']);
	$sUri = "http://".$_SERVER['SERVER_NAME']."/login.php?action=qq_callback&f=".$f;
	$_SESSION["URI"] = $sUri;
	$aParam = array(
		"response_type"    => "code",
		"client_id"        =>    $aConfig["appid"],
		"redirect_uri"    =>    $sUri,
		"scope"            =>    join(",", $aScope),
		//"state"            =>    $sState
	);
	$aGet = array();
	foreach($aParam as $key=>$val){
		$aGet[] = $key."=".urlencode($val);
	}
	$sUrl = "https://graph.qq.com/oauth2.0/authorize?";
	$sUrl .= join("&",$aGet);
	
	//echo($sUrl);exit;
	redirect($sUrl);
}
if($action=="qq_callback"){
	require_once(ROOT_PATH.'oauth/qq/function.php');
	$sUrl = "https://graph.qq.com/oauth2.0/token";
	$aGetParam = array(
		"grant_type"    =>    "authorization_code",
		"client_id"       =>    $aConfig["appid"],
		"client_secret"   =>    $aConfig["appkey"],
		"code"            =>    $_GET["code"],
		"state"           =>    $_GET["state"],
		"redirect_uri"    =>    $_SESSION["URI"]
	);
	unset($_SESSION["state"]);
	unset($_SESSION["URI"]);
	$sContent = get($sUrl,$aGetParam);
	//exit($sContent);
	if($sContent!==FALSE){
		$aTemp = explode("&", $sContent);
		$aParam = array();
		foreach($aTemp as $val){
			$aTemp2 = explode("=", $val);
			$aParam[$aTemp2[0]] = $aTemp2[1];
		}
		//$_SESSION["access_token"] = $aParam["access_token"];
		$sUrl = "https://graph.qq.com/oauth2.0/me";
		$aGetParam = array(
			"access_token"    => $aParam["access_token"]
		);
		$sContent = get($sUrl, $aGetParam);
		//exit($sContent);
		if($sContent!==FALSE){
			$aTemp = array();
			preg_match('/callback\(\s+(.*?)\s+\)/i', $sContent,$aTemp);
			$aResult = json_decode($aTemp[1],true);
			//$_SESSION["openid"] = $aResult["openid"];
			
			$oauth_id="QQ";
			$oauth_account=$aResult["openid"];
			$oauth_account=str_replace('"','',$oauth_account);
			
			$count=$GLOBALS['db']->getcount("SELECT * FROM ".$GLOBALS['db_prefix']."member WHERE oauth_id='".$oauth_id."' AND oauth_account='".$oauth_account."'");
			if($count>0){
				//账号已存在
				$sql="SELECT member_id,member_username FROM ".$GLOBALS['db_prefix']."member WHERE oauth_id='".$oauth_id."' AND oauth_account='".$oauth_account."'";
				$row=$GLOBALS['db']->getone($sql);
				
				$_SESSION['member_id']=$row[0];
				$_SESSION['member_username']=$row[1];
				
				//来源url
				$f=urldecode($_REQUEST['f']);
				if(empty($f)){
					$f=$_SERVER['HTTP_REFERER'];
				}
				if(strpos($f,'login.php')){
					$f="./user.php";
				}
				
				//登陆成功
				message(array('text'=>'登陆成功！','link'=>$f));
			}
			else{
				$_SESSION['oauth_id']=$oauth_id;
				$_SESSION['oauth_account']=$oauth_account;
				
				redirect("./reg.php");
				exit;
			}
		}
	}
	message(array('text'=>'登陆失败！','link'=>''));
}

$smarty=new smarty();smarty_header();
$online=online();
$smarty->assign('online',$online);
$smarty->display('login.html');
?>