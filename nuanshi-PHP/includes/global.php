<?php
/**
 * 系统初始化
*/
error_reporting(0);
if(file_exists("install.php"))@header("location:install.php");

@session_start();
@header("content-type:text/html;charset=utf-8");
if(ereg('gzip',$_SERVER['HTTP_ACCEPT_ENCODING']))@ob_start("ob_gzhandler");
if(version_compare(PHP_VERSION,'5.0.0','<')){
	exit('PHP>5.0.0');
}
@set_magic_quotes_runtime(0);
if(@get_magic_quotes_gpc()){
	function rs($s){
		if(is_array($s)){
			foreach ($s as $k=>$v)$s[$k]=rs($v);
		}else{
			$s=stripslashes($s);
		}
		return $s;
	}
    $_GET=rs($_GET);$_POST=rs($_POST);$_COOKIE=rs($_COOKIE);
}
if (!function_exists('json_encode')) {
     function format_json_value(&$value){
        if(is_bool($value)) {
            $value = $value?'true':'false';
        }elseif(is_int($value)) {
            $value = intval($value);
        }elseif(is_float($value)) {
            $value = floatval($value);
        }elseif(defined($value) && $value === null) {
            $value = strval(constant($value));
        }elseif(is_string($value)) {
            $value = '"'.addslashes($value).'"';
        }
        return $value;
    }
    function json_encode($data){
        if(is_object($data)) {
            //对象转换成数组
            $data = get_object_vars($data);
        }else if(!is_array($data)) {
            // 普通格式直接输出
            return format_json_value($data);
        }
        // 判断是否关联数组
        if(empty($data) || is_numeric(implode('',array_keys($data)))) {
            $assoc  =  false;
        }else {
            $assoc  =  true;
        }
        // 组装 Json字符串
        $json = $assoc ? '{' : '[' ;
        foreach($data as $key=>$val) {
            if(!is_null($val)) {
                if($assoc) {
                    $json .= "\"$key\":".json_encode($val).",";
                }else {
                    $json .= json_encode($val).",";
                }
            }
        }
        if(strlen($json)>1) {// 加上判断 防止空数组
            $json  = substr($json,0,-1);
        }
        $json .= $assoc ? '}' : ']' ;
        return $json;
    }
}
if (!function_exists('json_decode')) {
    function json_decode($json,$assoc=false){
        // 目前不支持二维数组或对象
        $begin  =  substr($json,0,1) ;
        if(!in_array($begin,array('{','[')))
            // 不是对象或者数组直接返回
            return $json;
        $parse = substr($json,1,-1);
        $data  = explode(',',$parse);
        if($flag = $begin =='{' ) {
            // 转换成PHP对象
            $result   = new stdClass();
            foreach($data as $val) {
                $item    = explode(':',$val);
                $key =  substr($item[0],1,-1);
                $result->$key = json_decode($item[1],$assoc);
            }
            if($assoc)
                $result   = get_object_vars($result);
        }else {
            $result   = array();
            foreach($data as $val)
                $result[]  =  json_decode($val,$assoc);
        }
        return $result;
    }
}
define('ROOT_PATH',str_replace('includes/global.php','',str_replace('\\', '/', __FILE__)));
require_once(ROOT_PATH.'includes/config.php');
require_once(ROOT_PATH.'includes/function.php');

require_once(ROOT_PATH.'includes/share.php');
require_once(ROOT_PATH.'includes/class_db.php');
require_once(ROOT_PATH.'includes/class_smarty.php');
require_once(ROOT_PATH.'includes/class_api.php');
require_once(ROOT_PATH.'includes/config_api.php');
$db=new db($db_host,$db_user,$db_password,$db_name);
$config=load_config();
$language=array();
@date_default_timezone_set('PRC');

//论坛同步开关
define('uc_bbs', 0);
?>