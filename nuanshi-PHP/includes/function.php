<?php
/**
 * 公用函数库
*/
function download($filename){
	if (file_exists($filename)){
		header('content-description:file transfer');
		header('content-type: interface/octet-stream');
		header('content-disposition:attachment;filename='.basename($filename));
		header('content-transfer-encoding:binary');
		header('expires:0');
		header('cache-control:must-revalidate,post-check=0,pre-check=0');
		header('pragma: public');
		header('content-length:'.filesize($filename));
		ob_clean();
		flush();
		readfile($filename);
		exit;
	}
}
function upload($upload,$mode=false,$ext='jpg,gif,png'){
	if($mode){
		$array=array();
		foreach ($upload["error"] as $key=>$error){
			$check_type=check_type($upload['tmp_name'][$key], $upload['name'][$key],$ext);
			if(!empty($check_type)){
				if (!empty($upload['name'][$key])&&$upload['size'][$key]<2*1024*1024){
					$get_ext=get_ext($upload['name'][$key]);
					if(check_ext($get_ext,$ext)){
						$name = date('YmdHis');
						$name.="_";
						for ($i = 0; $i < 6; $i++){
							$name .= chr(mt_rand(97, 122));
						}
						$name .=".".$get_ext;
						if (upload_move_file($upload['tmp_name'][$key],ROOT_PATH.'/uploads/'.$name)){
							$array[]=$name;
						}
					}
				}
			}
		}
		return $array;
	}else{
		$filename='';
		$check_type=check_type($upload['tmp_name'],$upload['name'],$ext);
		if(!empty($check_type)){
			if (!empty($upload['name'])&&$upload['size']<10*1024*1024){
				$get_ext=get_ext($upload['name']);
				if(check_ext($get_ext,$ext)){
					$name = date('YmdHis');
					$name.="_";
					for ($i = 0; $i < 6; $i++){
						$name .=chr(mt_rand(97, 122));
					}
					$name .=".".$get_ext;
					if (upload_move_file($upload['tmp_name'],ROOT_PATH.'/uploads/'.$name)){
						$filename=$name;
					}
				}
			}
		}
		return $filename;
	}
}
function upload_move_file($from, $target= ''){
    if (function_exists("move_uploaded_file")){
        if (move_uploaded_file($from, $target)){
            @chmod($target,0755);
            return true;
        }else if (copy($from, $target)){
            @chmod($target,0755);
            return true;
        }
    }elseif (copy($from, $target)){
        @chmod($target,0755);
        return true;
    }
    return false;
}
function check_ext($ext,$exts){
	if(empty($ext)||empty($exts)){
		return '';
	}
	$state=false;
	$explode=explode(",",$exts);
	foreach($explode as $value){
		if(!empty($value)){
			if($value==$ext){
				$state=true;
			}
		}
	}
	return $state;
}
function check_type($filename, $realname = '', $limit_ext_types = ''){
    if ($realname){
        $extname = strtolower(substr($realname, strrpos($realname, '.') + 1));
    }else{
        $extname = strtolower(substr($filename, strrpos($filename, '.') + 1));
    }
    if (@stristr($limit_ext_types,(string)$extname) === false){
        return '';
    }
	if('xlsx'==$extname)return 'xlsx';
	if('pptx'==$extname)return 'pptx';
	if('docx'==$extname)return 'docx';
    $str = $format = '';

    $file = @fopen($filename, 'rb');
    if ($file){
        $str = @fread($file, 0x400);
        @fclose($file);
    }else{
        if (stristr($filename, ROOT_PATH) === false){
            if ($extname == 'jpg' || $extname == 'jpeg' || $extname == 'gif' || $extname == 'png' || $extname == 'doc' ||
                $extname == 'xls' || $extname == 'txt'  || $extname == 'zip' || $extname == 'rar' || $extname == 'ppt' ||
                $extname == 'pdf' || $extname == 'rm'   || $extname == 'mid' || $extname == 'wav' || $extname == 'bmp' ||
                $extname == 'swf' || $extname == 'chm'  || $extname == 'sql' || $extname == 'cert')
            {
                $format = $extname;
            }
        }else{
            return '';
        }
    }

    if ($format == '' && strlen($str) >= 2 ){
        if (substr($str, 0, 4) == 'MThd' && $extname != 'txt'){
            $format = 'mid';
        }elseif (substr($str, 0, 4) == 'RIFF' && $extname == 'wav'){
            $format = 'wav';
        }elseif (substr($str ,0, 3) == "\xFF\xD8\xFF"){
            $format = 'jpg';
        }elseif (substr($str ,0, 4) == 'GIF8' && $extname != 'txt'){
            $format = 'gif';
        }elseif (substr($str ,0, 8) == "\x89\x50\x4E\x47\x0D\x0A\x1A\x0A"){
            $format = 'png';
        }elseif (substr($str ,0, 2) == 'BM' && $extname != 'txt'){
            $format = 'bmp';
        }elseif ((substr($str ,0, 3) == 'CWS' || substr($str ,0, 3) == 'FWS') && $extname != 'txt'){
            $format = 'swf';
        }elseif (substr($str ,0, 4) == "\xD0\xCF\x11\xE0"){   // D0CF11E == DOCFILE == Microsoft Office Document
            if (substr($str,0x200,4) == "\xEC\xA5\xC1\x00" || $extname == 'doc'){
                $format = 'doc';
            }elseif (substr($str,0x200,2) == "\x09\x08" || $extname == 'xls'){
                $format = 'xls';
            } elseif (substr($str,0x200,4) == "\xFD\xFF\xFF\xFF" || $extname == 'ppt'){
                $format = 'ppt';
            }
        } elseif (substr($str ,0, 4) == "PK\x03\x04"){
            $format = 'zip';
        } elseif (substr($str ,0, 4) == 'Rar!' && $extname != 'txt'){
            $format = 'rar';
        } elseif (substr($str ,0, 4) == "\x25PDF"){
            $format = 'pdf';
        } elseif (substr($str ,0, 3) == "\x30\x82\x0A"){
            $format = 'cert';
        } elseif (substr($str ,0, 4) == 'ITSF' && $extname != 'txt'){
            $format = 'chm';
        } elseif (substr($str ,0, 4) == "\x2ERMF"){
            $format = 'rm';
        } elseif ($extname == 'sql'){
            $format = 'sql';
        } elseif ($extname == 'txt'){
            $format = 'txt';
        }
    }
    if (@stristr($limit_ext_types,(string)$format) === false){
        $format = '';
    }
    return $format;
}
function make_thumb($image,$toW,$toH,$image_thumb=""){
	if($image_thumb==""){
		$image_thumb=$image;
	}

	//获取原始图片大小
	$info=GetImageSize($image);
	if($info[2]==1) {
		if(function_exists("imagecreatefromgif")){
			$im=ImageCreateFromGIF($image);
		}
	}elseif($info[2]==2){
		if(function_exists("imagecreatefromjpeg")){
			$im=ImageCreateFromJpeg($image);
		}
	}else{
		$im=ImageCreateFromPNG($image);
	}


	$srcW=ImageSX($im);//获取原始图片宽度
	$srcH=ImageSY($im);//获取原始图片高度

	$toWH=$toW/$toH;//获取缩图比例
	$srcWH=$srcW/$srcH;//获取原始图比例

	if($toWH<=$srcWH){
	   $ftoW=$toW;
	   $ftoH=$ftoW*($srcH/$srcW);
	}else{
	  $ftoH=$toH;
	  $ftoW=$ftoH*($srcW/$srcH);
	}
	//创建画布并且复制原始图像到画布
	if (function_exists('imagecreatetruecolor')&&(function_exists('imagecopyresampled'))){
		$canvas=ImageCreateTrueColor($ftoW,$ftoH);
	//	imagefilledrectangle($canvas,0,0,$toW,$toH,imagecolorallocate($canvas,255,255,255));
		ImageCopyResampled($canvas,$im,0,0,0,0,$ftoW,$ftoH,$srcW,$srcH);
	}else{
		$canvas=ImageCreate($ftoW,$ftoH);
		ImageCopyResized($canvas,$im,0,0,0,0,$ftoW,$ftoH,$srcW,$srcH);
	}

	//输入图像
	if(function_exists('imagejpeg')){
		ImageJpeg($canvas,$image_thumb,100);
	}else{
		ImagePNG($canvas,$image_thumb,100);
	}
	//回收资源
	ImageDestroy($canvas);
	ImageDestroy($im);
}
function make_watermark($groundImage,$waterImage="",$waterPos=0,$xOffset=0,$yOffset=0) {
     if(!empty($waterImage) && file_exists($waterImage)) {
         $water_info = getimagesize($waterImage);
         $water_w     = $water_info[0];//取得水印图片的宽
         $water_h     = $water_info[1];//取得水印图片的高
         switch($water_info[2])   {    //取得水印图片的格式
             case 1:$water_im = imagecreatefromgif($waterImage);break;
             case 2:$water_im = imagecreatefromjpeg($waterImage);break;
             case 3:$water_im = imagecreatefrompng($waterImage);break;
         }
     }
     //读取背景图片
     if(!empty($groundImage) && file_exists($groundImage)) {
         $ground_info = getimagesize($groundImage);
         $ground_w     = $ground_info[0];//取得背景图片的宽
         $ground_h     = $ground_info[1];//取得背景图片的高

         switch($ground_info[2]) {    //取得背景图片的格式
             case 1:$ground_im = imagecreatefromgif($groundImage);break;
             case 2:$ground_im = imagecreatefromjpeg($groundImage);break;
             case 3:$ground_im = imagecreatefrompng($groundImage);break;
         }
     }
     $w = $water_w;
     $h = $water_h;
	 //水印位置
     switch($waterPos) {
         case 0://随机
             $posX = rand(0,($ground_w - $w));
             $posY = rand(0,($ground_h - $h));
             break;
         case 1://1为顶端居左
             $posX = 0;
             $posY = 0;
             break;
         case 2://2为顶端居中
             $posX = ($ground_w - $w) / 2;
             $posY = 0;
             break;
         case 3://3为顶端居右
             $posX = $ground_w - $w;
             $posY = 0;
             break;
         case 4://4为中部居左
             $posX = 0;
             $posY = ($ground_h - $h) / 2;
             break;
         case 5://5为中部居中
             $posX = ($ground_w - $w) / 2;
             $posY = ($ground_h - $h) / 2;
             break;
         case 6://6为中部居右
             $posX = $ground_w - $w;
             $posY = ($ground_h - $h) / 2;
             break;
         case 7://7为底端居左
             $posX = 0;
             $posY = $ground_h - $h;
             break;
         case 8://8为底端居中
             $posX = ($ground_w - $w) / 2;
             $posY = $ground_h - $h;
             break;
         case 9://9为底端居右
             $posX = $ground_w - $w;
             $posY = $ground_h - $h;
             break;
         default://随机
             $posX = rand(0,($ground_w - $w));
             $posY = rand(0,($ground_h - $h));
             break;
     }
     //设定图像的混色模式
     imagealphablending($ground_im, true);
     imagecopy($ground_im, $water_im, $posX + $xOffset, $posY + $yOffset, 0, 0, $water_w,$water_h);//拷贝水印到目标文件
     @unlink($groundImage);
     switch($ground_info[2]){
         case 1:imagegif($ground_im,$groundImage,100);break;
         case 2:imagejpeg($ground_im,$groundImage,100);break;
         case 3:imagepng($ground_im,$groundImage,100);break;
     }
     //释放内存
     if(isset($water_info)) unset($water_info);
     if(isset($water_im)) imagedestroy($water_im);
     unset($ground_info);
     imagedestroy($ground_im);
}
function truncate($string,$length,$append = true){
    $string = trim($string);
    $strlength = strlen($string);
    if ($length == 0 || $length >= $strlength){
        return $string;
    }elseif ($length < 0){
        $length = $strlength + $length;
        if ($length < 0)
        {
            $length = $strlength;
        }
    }
    if (function_exists('mb_substr')){
        $newstr = mb_substr($string, 0, $length,"UTF-8");
    }elseif (function_exists('iconv_substr')){
        $newstr = iconv_substr($string, 0, $length,"UTF-8");
    }else{
		for($i=0;$i<$length;$i++){
				$tempstring=substr($string,0,1);
				if(ord($tempstring)>127){
					$i++;
					if($i<$length){
						$newstring[]=substr($string,0,3);
						$string=substr($string,3);
					}
				}else{
					$newstring[]=substr($string,0,1);
					$string=substr($string,1);
				}
			}
		$newstr =join($newstring);
    }
    if ($append && $string != $newstr){
        $newstr .= '...';
    }
    return $newstr;
}
function check_request(){
	if(empty($_SERVER['HTTP_REFERER'])||(preg_replace("/https?:\/\/([^\:\/]+).*/i","\\1",$_SERVER['HTTP_REFERER'])!=preg_replace("/([^\:]+).*/", "\\1",$_SERVER['HTTP_HOST']))){
		//exit('Access Denied!');
	}
}
function filter_badwords($content,$badwords){
	$a=$content;
	if(!empty($badwords)){
		$words=explode("\n",$badwords);
		$count=count($words);
		for($i=0;$i<$count;$i++){
			$b=explode("=",$words[$i]);
			$a=str_replace($b[0],$b[1],$a);
		}
	}
	return $a;
}
function get_ext($filename){
	if(!empty($filename)){
		return end(explode(".",strtolower($filename)));
	}
}
function get_self(){
	return isset($_SERVER['PHP_SELF'])?$_SERVER['PHP_SELF']:$_SERVER['SCRIPT_NAME'];
}
function get_position(){
	$php_self=get_self();
	$self=explode('/',$php_self);
	$self_count=count($self);
	$url='http://'.$_SERVER['SERVER_NAME'];
	if($self_count>1){
		$url.=str_replace('/'.$self[$self_count-1],'',$php_self);
	}
	if(substr($url,-1)!='/'){
		$url.='/';
	}
	return $url;
}
function get_ip(){
	if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])){
		$ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
	}elseif (isset($_SERVER['HTTP_CLIENT_IP'])){
		$ip=$_SERVER['HTTP_CLIENT_IP'];
	}else{
		$ip=$_SERVER['REMOTE_ADDR'];
	}
	if(check_ip($ip)){
		return $ip;
	}else{
		return '0.0.0.0';
	}
}
function check_ip($ip){
	$oct = explode('.', $ip);
	if (count($oct) != 4) {
		return false;
	}
	for ($i = 0; $i < 4; $i++) {
		if (!is_numeric($oct[$i])) {
			return false;
		}
		if ($oct[$i] < 0 || $oct[$i] > 255){
			return false;
		}
	}
	return true;
}
function get_ip_address($ip){
    static $fp = NULL, $offset = array(), $index = NULL;
    $ip    = @gethostbyname($ip);
    $ipdot = explode('.', $ip);
    $ip    = pack('N', ip2long($ip));
    $ipdot[0] = (int)$ipdot[0];
    $ipdot[1] = (int)$ipdot[1];
    if ($ipdot[0] == 10 || $ipdot[0] == 127 || ($ipdot[0] == 192 && $ipdot[1] == 168) || ($ipdot[0] == 172 && ($ipdot[1] >= 16 && $ipdot[1] <= 31))){
        return 'LAN';
    }
    if ($fp === NULL){
        $fp = fopen(ROOT_PATH . 'includes/ip.dat', 'rb');
        if ($fp === false){
            return 'Invalid IP data file';
        }
        $offset = unpack('Nlen', fread($fp, 4));
        if ($offset['len'] < 4){
            return 'Invalid IP data file';
        }
        $index  = fread($fp, $offset['len'] - 4);
    }
    $length = $offset['len'] - 1028;
    $start  = unpack('Vlen', $index[$ipdot[0] * 4] . $index[$ipdot[0] * 4 + 1] . $index[$ipdot[0] * 4 + 2] . $index[$ipdot[0] * 4 + 3]);
    for ($start = $start['len'] * 8 + 1024; $start < $length; $start += 8){
        if ($index{$start} . $index{$start + 1} . $index{$start + 2} . $index{$start + 3} >= $ip){
            $index_offset = unpack('Vlen', $index{$start + 4} . $index{$start + 5} . $index{$start + 6} . "\x0");
            $index_length = unpack('Clen', $index{$start + 7});
            break;
        }
    }
    fseek($fp, $offset['len'] + $index_offset['len'] - 1024);
    $area = fread($fp, $index_length['len']);
    fclose($fp);
    $fp = NULL;
    return $area;
}
function get_os($AGENT=''){
	if(empty($AGENT)){
		$AGENT=$_SERVER["HTTP_USER_AGENT"];
	}
	if(strpos($AGENT,"Windows NT 5.0"))$os="Windows 2000";
	elseif(strpos($AGENT,"Windows NT 5.1"))$os="Windows XP";
	elseif(strpos($AGENT,"Windows NT 5.2"))$os="Windows 2003";
	elseif(strpos($AGENT,"Windows NT 6.0"))$os="Windows Vista";
	elseif(strpos($AGENT,"Windows NT 6.1"))$os="Windows 7";
	elseif(strpos($AGENT,"Windows NT"))$os="Windows NT";
	elseif(strpos($AGENT,"Windows CE"))$os="Windows CE";
	elseif(strpos($AGENT,"ME"))$os="Windows ME";
	elseif(strpos($AGENT,"Windows 9"))$os="Windows 98";
	elseif(strpos($AGENT,"unix"))$os="Unix";
	elseif(strpos($AGENT,"linux"))$os="Linux";
	elseif(strpos($AGENT,"SunOS"))$os="SunOS";
	elseif(strpos($AGENT,"OpenBSD"))$os="OpenBSD";
	elseif(strpos($AGENT,"FreeBSD"))$os="FreeBSD";
	elseif(strpos($AGENT,"AIX"))$os="AIX";
	elseif(strpos($AGENT,"Mac"))$os="Mac";
	else $os="Other";
	return $os;
}
function get_bs($AGENT=''){
	if(empty($AGENT)){
		$AGENT=$_SERVER["HTTP_USER_AGENT"];
	}
	if(strpos($AGENT,"Opera"))$browser="Opera";
	elseif(strpos($AGENT,"Firefox"))$browser="Firefox";
	elseif(strpos($AGENT,"Chrome"))$browser="Chrome";
	elseif(strpos($AGENT,"MSIE 6"))$browser="IE6";
	elseif(strpos($AGENT,"MSIE 7"))$browser="IE7";
	elseif(strpos($AGENT,"MSIE 8"))$browser="IE8";
	else $browser="Other";
	return $browser;
}
function is_email($user_email){
    $chars = "/^([a-z0-9+_]|\\-|\\.)+@(([a-z0-9_]|\\-)+\\.)+[a-z]{2,6}\$/i";
    if (strpos($user_email, '@') !== false && strpos($user_email, '.') !== false){
        if (preg_match($chars, $user_email)){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}
function password($string){
	return strtoupper(sha1(trim($string)));
}
function send_mail($to,$from,$subject,$content){
	class smtp{
		var $smtp_port;
		var $time_out;
		var $host_name;
		var $log_file;
		var $relay_host;
		var $debug;
		var $auth;
		var $user;
		var $pass;
		var $sock;
		function SMTP($relay_host="", $smtp_port=25,$auth=false,$user,$pass)   {
			$this->debug=false;
			$this->smtp_port=$smtp_port;
			$this->relay_host=$relay_host;
			$this->time_out=30; //is used in fsockopen()
			$this->auth=$auth;//auth
			$this->user=$user;
			$this->pass=$pass;
			$this->host_name="localhost"; //is used in HELO command
			$this->log_file="";
			$this->sock=false;
		}
		function sendmail($to,$from,$subject="",$body="",$mailtype, $cc="",$bcc="",$additional_headers="") {
			$mail_from=$this->get_address($this->strip_comment($from));
			$body=ereg_replace("(^|(\r\n))(\.)", "\1.\3", $body);
			$header="";
			$header .= "MIME-Version:1.0\r\n";
			
			if($mailtype=="HTML"){
			$header .= "Content-Type:text/html\r\n";
			}
			else{
			$header .= "Content-type: text/plain; charset=utf-8\r\n";
			$header .= "Content-Transfer-Encoding: 8bit\r\n";
			}
			$header .= "To: ".$to."\r\n";
			if ($cc != "") {
			$header .= "Cc: ".$cc."\r\n";
			}
			$header .= "From: $from<".$from.">\r\n";
			//$header .= "Subject: ".$subject."\r\n";
			$header .= "Subject: =?UTF-8?B?".base64_encode($subject)."?=\r\n";
			$header .= $additional_headers;
			$header .= "Date: ".date("r")."\r\n";
			$header .= "X-Mailer:By Redhat (PHP/".phpversion().")\r\n";
			list($msec, $sec)=explode(" ", microtime());
			$header .= "Message-ID: <".date("YmdHis", $sec).".".($msec*1000000).".".$mail_from.">\r\n";
			$TO=explode(",", $this->strip_comment($to));
			if ($cc!=""){
				$TO=array_merge($TO, explode(",", $this->strip_comment($cc)));
			}
			if ($bcc != ""){
				$TO=array_merge($TO, explode(",", $this->strip_comment($bcc)));
			}
			$sent=TRUE;
			foreach ($TO as $rcpt_to) {
				$rcpt_to=$this->get_address($rcpt_to);
				if (!$this->smtp_sockopen($rcpt_to)) {
				$this->log_write("Error: Cannot send email to ".$rcpt_to."\n");
				$sent=FALSE;
				continue;
			}
			if ($this->smtp_send($this->host_name, $mail_from, $rcpt_to, $header, $body)) {
				$this->log_write("E-mail has been sent to <".$rcpt_to.">\n");
			} else {
				$this->log_write("Error: Cannot send email to <".$rcpt_to.">\n");
				$sent=FALSE;
			}
			fclose($this->sock);
			$this->log_write("Disconnected from remote host\n");
		}
		return $sent;
		}
		function smtp_send($helo, $from, $to, $header, $body="") {
			if (!$this->smtp_putcmd("HELO", $helo)) {
			return $this->smtp_error("sending HELO command");
			}
			if($this->auth){
				if (!$this->smtp_putcmd("AUTH LOGIN", base64_encode($this->user))) {
					return $this->smtp_error("sending HELO command");
				}

				if (!$this->smtp_putcmd("", base64_encode($this->pass))) {
					return $this->smtp_error("sending HELO command");
				}

			}
			if (!$this->smtp_putcmd("MAIL", "FROM:<".$from.">")){
				return $this->smtp_error("sending MAIL FROM command");
			}
			if (!$this->smtp_putcmd("RCPT", "TO:<".$to.">")) {
				return $this->smtp_error("sending RCPT TO command");
			}
			if (!$this->smtp_putcmd("DATA")) {
				return $this->smtp_error("sending DATA command");
			}
			if (!$this->smtp_message($header, $body)) {
				return $this->smtp_error("sending message");
			}
			if (!$this->smtp_eom()) {
				return $this->smtp_error("sending <CR><LF>.<CR><LF> [EOM]");
			}
			if (!$this->smtp_putcmd("QUIT")) {
				return $this->smtp_error("sending QUIT command");
			}
			return true;
		}
		function smtp_sockopen($address){
			if ($this->relay_host == "") {
				return $this->smtp_sockopen_mx($address);
			}else{
				return $this->smtp_sockopen_relay();
			}
		}
		function smtp_sockopen_relay(){
			$this->log_write("Trying to ".$this->relay_host.":".$this->smtp_port."\n");
			$this->sock=@fsockopen($this->relay_host, $this->smtp_port, $errno, $errstr, $this->time_out);
			if (!($this->sock && $this->smtp_ok())) {
				$this->log_write("Error: Cannot connenct to relay host ".$this->relay_host."\n");
				$this->log_write("Error: ".$errstr." (".$errno.")\n");
				return false;

			}
			$this->log_write("Connected to relay host ".$this->relay_host."\n");
			return true;
		}
		function smtp_sockopen_mx($address){
			$domain=ereg_replace("^.+@([^@]+)$", "\1", $address);
			if (!@getmxrr($domain, $MXHOSTS)) {
				$this->log_write("Error: Cannot resolve MX \"".$domain."\"\n");
				return false;
			}
			foreach ($MXHOSTS as $host) {
				$this->log_write("Trying to ".$host.":".$this->smtp_port."\n");
				$this->sock=@fsockopen($host, $this->smtp_port, $errno, $errstr, $this->time_out);
				if (!($this->sock && $this->smtp_ok())) {
				$this->log_write("Warning: Cannot connect to mx host ".$host."\n");
				$this->log_write("Error: ".$errstr." (".$errno.")\n");
				continue;
				}
			$this->log_write("Connected to mx host ".$host."\n");
			return true;
			}
			$this->log_write("Error: Cannot connect to any mx hosts (".implode(", ", $MXHOSTS).")\n");
			return false;
		}
		function smtp_message($header, $body){
			fputs($this->sock, $header."\r\n".$body);
			$this->smtp_debug("> ".str_replace("\r\n", "\n"."> ", $header."\n> ".$body."\n> "));
			return true;
		}
		function smtp_eom()   {
			fputs($this->sock, "\r\n.\r\n");
			$this->smtp_debug(". [EOM]\n");
			return $this->smtp_ok();
		}
		function smtp_ok()    {
			$response=str_replace("\r\n", "", fgets($this->sock, 512));
			$this->smtp_debug($response."\n");
			if (!ereg("^[23]", $response)) {
				fputs($this->sock, "QUIT\r\n");
				fgets($this->sock, 512);
				$this->log_write("Error: Remote host returned \"".$response."\"\n");
				return false;
			}
		return true;
		}
		function smtp_putcmd($cmd, $arg=""){
		if ($arg != "") {
			if($cmd=="") $cmd=$arg;
			else $cmd=$cmd." ".$arg;
		}
			fputs($this->sock, $cmd."\r\n");
			$this->smtp_debug("> ".$cmd."\n");
			return $this->smtp_ok();
		}
		function smtp_error($string){
			$this->log_write("Error: Error occurred while ".$string.".\n");
			return false;
		}
		function log_write($message){
			$this->smtp_debug($message);
			if ($this->log_file == "") {
				return true;
			}
			$message=date("M d H:i:s ").get_current_user()."[".getmypid()."]: ".$message;
			if (!@file_exists($this->log_file) || !($fp=@fopen($this->log_file, "a"))) {
				$this->smtp_debug("Warning: Cannot open log file \"".$this->log_file."\"\n");
				return false;
			}
			flock($fp, LOCK_EX);
			fputs($fp, $message);
			fclose($fp);
			return true;
		}
		function strip_comment($address)   {
			$comment="\([^()]*\)";
			while (ereg($comment, $address)){
				$address=ereg_replace($comment, "", $address);
			}
			return $address;
		}
		function get_address($address)   {
			$address=ereg_replace("([ \t\r\n])+", "", $address);
			$address=ereg_replace("^.*<(.+)>.*$", "\1", $address);
			return $address;
		}
		function smtp_debug($message){
			if ($this->debug){
			echo $message;
			}
		}
	}
	$smtp=new smtp($GLOBALS['config']['smtp_server'],$GLOBALS['config']['smtp_port'],true,$GLOBALS['config']['smtp_user'],$GLOBALS['config']['smtp_password']);
	return $smtp->sendmail($to,$from,$subject,$content,'HTML');
}
function create_sql_in($item_list, $field_name = ''){
    if (empty($item_list)){
        return $field_name . " IN ('') ";
    }else{
        if (!is_array($item_list)){
            $item_list = explode(',', $item_list);
        }
        $item_list = array_unique($item_list);
        $item_list_tmp = '';
        foreach ($item_list AS $item){
            if ($item !== ''){
                $item_list_tmp .= $item_list_tmp ? ",'$item'" : "'$item'";
            }
        }
        if (empty($item_list_tmp)){
            return $field_name . " IN ('') ";
        }else{
            return $field_name . ' IN (' . $item_list_tmp . ') ';
        }
    }
}
function create_password($len=10){
	$chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	mt_srand((double)microtime()*1000000*getmypid());
	$password="";
	while(strlen($password)<$len){
		$password.=substr($chars,(mt_rand()%strlen($chars)),1);
	}
	return $password;
}
?>