<?php
/**
 * 数据库类
*/
class db{
	var $db_link=null;
	var $db_name='';
	function __construct($db_host, $db_user, $db_password,$db_name){
		$this->db_link=@mysql_connect($db_host, $db_user, $db_password,true) or exit("Can't connect MySQL server($db_host)!");
					   @mysql_select_db($db_name,$this->db_link) or exit("Can't select MySQL database($db_name)!");
					   @mysql_query("set names 'utf8'",$this->db_link);
		$this->db_name=$db_name;
	}
	function __destruct(){
		if($this->db_link)@mysql_close($this->db_link);
	}
	function db($db_host, $db_user, $db_password,$db_name){
		$this->__construct($db_host, $db_user, $db_password,$db_name);
	}
	function query($sql){
		return mysql_query($sql,$this->db_link);
	}
	function insert($table,$values,$debug=false){
		$ks='';
		$vs='';
		foreach($values as $key => $value){
			$ks.=$ks?",`$key`":"`$key`";
			$vs.=$vs?",'$value'":"'$value'";
		}
		$sql="insert into `$table` ($ks) values ($vs)";
		if($debug)return $sql;
		return $this->query($sql);
	}
	function update($table,$values,$where='',$debug=false){
		$v='';
		foreach($values as $key => $value){
			$v.=$v?",`$key`='$value'":"`$key`='$value'";
		}
		$sql="update `$table` set $v  where $where";
		if($debug)return $sql;
		return $this->query($sql);
	}
	function delete($table,$where='',$debug=false){
		if(empty($where)||$where==''){
			$sql="delete from $table";
		}else{
			$sql="delete from $table where $where";
		}
		if($debug)return $sql;
		return $this->query($sql);
	}
	function getcount($sql){
		return mysql_num_rows($this->query($sql));
    }
	function getall($sql){
		$temp;
        $result =$this->query($sql);
        if ($result){
            $array = array();
            while ($row = mysql_fetch_assoc($result)){
                $array[] = $row;
            }
            $temp=$array;
			mysql_free_result($result);
        }else{
            $temp=false;
        }
		return $temp;
    }
	function getone($sql){
		$temp;
		$result=$this->query($sql);
        if ($result){
			$temp=mysql_fetch_array($result);
			mysql_free_result($result);
		}else{
			$temp=false;
		}
		return $temp;
	}
	function getdata(){
		$res=mysql_list_tables($this->db_name);
		while ($row = mysql_fetch_row($res))$table[]=$row[0];
		$sql='';
		foreach ($table as $v){
			$sql.="DROP TABLE IF EXISTS `$v`;\n";
			$rs=mysql_fetch_row(mysql_query("show create table $v"));
			$sql.=$rs[1].";\n\n";
		}
		foreach ($table as $v){
			$res=$this->query("select * from $v");
			$fild=mysql_num_fields($res);
			while ($rs=mysql_fetch_array($res)){
				$comma="";
				$sql.="insert into $v values(";
				for($i=0;$i<$fild;$i++){
					$sql.=$comma."'".mysql_escape_string($rs[$i])."'";
					$comma = ",";
				}
				$sql.=");\n";
			}
			$sql.="\n";
		}
		return $sql;
	}
    function insert_id(){
        return mysql_insert_id($this->db_link);
    }
	function version(){
		return mysql_get_server_info($this->db_link);
	}
}
?>