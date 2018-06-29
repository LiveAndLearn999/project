<?php

class hsSQL
{
	var $queryCount = 0;
	var $host;
	var $user;
	var $pass;
	var $data;
	var $conn;
	var $result;
	var $rsType = MYSQL_ASSOC;
	var $queryTimes = 0;#[查询时间]

	#[构造函数]
	function hsSQL($db_host,$db_name,$db_user="",$db_password="",$dbOpenType=false)
	{
		$this->host = $db_host;
		$this->user = $db_user;
		$this->pass = $db_password;
		$this->data = $db_name;
		$this->connect($dbOpenType);
		unset($db_host,$db_name,$db_user,$db_password,$dbOpenType);
	}

	#[兼容PHP5]
	function __construct($db_host,$db_name,$db_user="",$db_password="",$dbOpenType=false)
	{
		$this->hsSQL($db_host,$db_name,$db_user,$db_password,$dbOpenType);
		unset($db_host,$db_name,$db_user,$db_password,$dbOpenType);
	}

	#[连接数据库]
	function connect($dbconn = false)
	{
		if($dbconn)
		{
			$this->conn = mysql_pconnect($this->host,$this->user,$this->pass) or die(mysql_errno()." : ".mysql_error());
		}
		else
		{
			$this->conn = mysql_connect($this->host,$this->user,$this->pass) or die(mysql_errno()." : ".mysql_error());
		}

		$mysql_version = $this->get_mysql_version();

		if($mysql_version>"4.1")
		{
			mysql_query("SET NAMES utf8",$this->conn);
			
		}

		if($mysql_version>"5.0.1")
		{

		    mysql_query("SET NAMES utf8",$this->conn);
			mysql_query("SET sql_mode=''",$this->conn);
		}

		mysql_select_db($this->data) or die(mysql_errno()." : ".mysql_error());
	}

	#[关闭数据库连接，当您使用持续连接时该功能失效]
	function hsClose()
	{
		return mysql_close($this->conn);
	}

	#[兼容PHP5]
	function __destruct()
	{
		return mysql_close($this->conn);
	}

	function hsQuery($sql,$type="ASSOC")
	{
		$this->rsType = $type != "ASSOC" ? ($type == "NUM" ? MYSQL_NUM : MYSQL_BOTH) : MYSQL_ASSOC;
		$this->result = mysql_query($sql,$this->conn);
		$this->queryCount++;
		if($this->result)
		{
			return $this->result;
		}
		else
		{
			return false;
		}
	}

	function hsBigQuery($sql,$type="ASSOC")
	{
		$this->rsType = $type != "ASSOC" ? ($type == "NUM" ? MYSQL_NUM : MYSQL_BOTH) : MYSQL_ASSOC;
		$this->result = mysql_unbuffered_query($sql,$this->conn);
		$this->queryCount++;
		if($this->result)
		{
			return $this->result;
		}
		else
		{
			return false;
		}
	}

	function hsGetAll($sql="",$nocache=false)
	{
		if($sql)
		{
			if($nocache)
			{
				$this->hsBigQuery($sql);
			}
			else
			{
				$this->hsQuery($sql);
			}
		}
		$rs = array();
		while($rows = mysql_fetch_array($this->result,$this->rsType))
		{
			$rs[] = $rows;
		}
		return $rs;
	}

	function hsGetOne($sql = "")
	{
		if($sql)
		{
			$this->hsQuery($sql);
		}
		$rows = mysql_fetch_array($this->result,$this->rsType);
		return $rows;
	}

	function hsInsertID($sql="")
	{
		if($sql)
		{
			$rs = $this->hsGetOne($sql);
			return $rs;
		}
		else
		{
			return mysql_insert_id($this->conn);
		}
	}

	function hsInsert($sql)
	{
		$this->result = $this->hsQuery($sql);
		$id = $this->hsInsertID();
		return $id;
	}

	function hs_count($sql="")
	{
		if($sql)
		{
			$this->hsQuery($sql,"NUM");
			$rs = $this->hsGetOne();
			return $rs[0];
		}
		else
		{
			$rsC = mysql_num_rows($this->result);
			return $rsC;
		}
	}

	function hsCount($sql = "")
	{
		if($sql)
		{
			$this->hsQuery($sql);
			unset($sql);
		}
		$rsC = mysql_num_rows($this->result);
		return $rsC;
	}

	function hsNumFields($sql = "")
	{
		if($sql)
		{
			$this->hsQuery($sql);
		}
		return @mysql_num_fields($this->result);
	}

	function hsListFields($table)
	{
		$rs = @mysql_list_fields($this->data,$table,$this->conn);
		$count = mysql_num_fields($rs);
		for($i=0;$i<$count;$i++)
		{
			$rslist[] = @mysql_field_name($rs,$i);
		}
		return $rslist;
	}


	function hsListTables()
	{
		$query = mysql_list_tables($this->data);
		$rs = array();
		while($rows = @mysql_fetch_array($query))
		{
			$rs[] = $rows[0];
		}
		return $rs;
	}

	function hsTableName($table_list,$i)
	{
		return @mysql_tablename($table_list,$i);
	}

	function hsEscapeString($char)
	{
		if(!$char)
		{
			return false;
		}
		return @mysql_escape_string($char);
	}

	function get_mysql_version()
	{
		return mysql_get_server_info();
	}
}
?>