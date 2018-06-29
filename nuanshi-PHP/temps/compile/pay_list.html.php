<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html;charset=utf-8" />
<title><?php echo $this->_var['language']['title']; ?></title>
<script type="text/javascript" src="scripts/jquery.js"></script>
<script type="text/javascript" src="scripts/jquery.calendar.js"></script>
<link href="styles/calendars.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
$(document).ready(function(){
  $("#stime").cld();
  $("#etime").cld();
});
</script>
</head>
<body>
<?php echo $this->fetch('top.htm'); ?>
<div id="content">
	
	<div class="container">
		
		<div class="row">
<?php echo $this->fetch('left.htm'); ?>
<div class="span9">
				
				<h1 class="page-title">
					<a href="?action=game&do=paymode_list">充值方式管理</a>
&raquo;&nbsp;充值列表
					
				</h1>
				
				<div class="stat-container">
				
				<form action="?action=game&do=pay_list" method="post">
	<table width="100%" border="0" cellspacing="2" cellpadding="2" align="center">
	  <tr>
		<td width="180">充值方式：
		  <select name="mode_id" style="width:95px">
		    <option value="">全部</option>
		      <?php $_from = $this->_var['paymode_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'paymode');if (count($_from)):
    foreach ($_from AS $this->_var['paymode']):
?>
			  <option value="<?php echo $this->_var['paymode']['mode_id']; ?>" <?php if ($this->_var['paymode']['mode_id'] == $this->_var['search']['mode_id']): ?>selected="selected"<?php endif; ?>><?php echo $this->_var['paymode']['mode_name']; ?></option>
			  <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
		    </select></td>
	    <td width="350">充值游戏：
          <select id="game_id" name="game_id" onchange="getServer(this.options[selectedIndex].value)" style="width:95px">
            <option value="">全部</option>
              <?php $_from = $this->_var['game_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'game');if (count($_from)):
    foreach ($_from AS $this->_var['game']):
?>
			  <option value="<?php echo $this->_var['game']['game_id']; ?>" <?php if ($this->_var['game']['game_id'] == $this->_var['search']['game_id']): ?>selected="selected"<?php endif; ?>><?php echo $this->_var['game']['game_name']; ?></option>
			  <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
			</select>
          <select id="server_id" name="server_id" style="width:95px">
            <option value="">全部</option>
			</select></td>
	    <td>充值时间：
          <input id="stime" name="stime" type="text" size="15" value="<?php echo $this->_var['search']['stime']; ?>" readonly bj="cBj" style="width:95px"/>
			-
			<input id="etime" name="etime" type="text" size="15" value="<?php echo $this->_var['search']['etime']; ?>" readonly bj="cBj" style="width:95px"/></td>
	  </tr>
	  <tr>
	    <td>订单状态：
          <select name="pay_state" style="width:95px">
            <option value="">全部</option>
            <option value="3" <?php if ($this->_var['search']['pay_state'] == 3): ?>selected="selected"<?php endif; ?>>未处理</option>
			<option value="2" <?php if ($this->_var['search']['pay_state'] == 2): ?>selected="selected"<?php endif; ?>>处理中</option>
			<option value="1" <?php if ($this->_var['search']['pay_state'] == 1): ?>selected="selected"<?php endif; ?>>已处理</option>
			</select></td>
	    <td>订单号：　
	      <input name="order_no" type="text" size="20" value="<?php echo $this->_var['search']['order_no']; ?>" /></td>
	    <td>充值账号：
          <input name="game_user" type="text" size="20" value="<?php echo $this->_var['search']['game_user']; ?>" /></td>
	  </tr>
	  <tr>
	    <td><input type="submit" name="Submit" value="提交查询" class="btn" /></td>
	    <td>&nbsp;</td>
	    <td>&nbsp;</td>
	  </tr>
	</table>
	</form>
	<hr></hr>
	<table cellspacing="1" cellpadding="0" width="100%">
	<tr class="titlebg">
	<td height="20" width="2%" align="center">ID</td>
	<td width="5%" align="center">订单号</td>
	<td width="5%" align="center">充值方式</td>
	<td width="5%" align="center">充值状态</td>
	<td width="5%" align="center">充值账号</td>
	<td width="5%" align="center">手机号</td>
	<td width="5%" align="center">充值金额</td>
	<td width="10%" align="center">充值时间</td>
	<td width="5%" align="center">充值IP</td>
	<td width="8%" align="center">充值游戏</td>
	<td width="15%" align="center">操作</td>
	</tr>
	<tr><td height="1" bgcolor="#eeeeee" colspan="10"></td></tr>
	<?php $_from = $this->_var['pay_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'pay');if (count($_from)):
    foreach ($_from AS $this->_var['pay']):
?>
	<tr>
	<td height="30" align="center"><?php echo $this->_var['pay']['id']; ?></td>
	<td align="center"><?php echo $this->_var['pay']['order_no']; ?></td>
	<td><?php echo $this->_var['pay']['mode_id']; ?></td>
	<td><span style="color:<?php if ($this->_var['pay']['state'] == 1): ?>green<?php else: ?>red<?php endif; ?>;"><?php echo $this->_var['pay']['state_str']; ?></span></td>
	<td><?php echo $this->_var['pay']['game_user']; ?><?php if ($this->_var['pay']['game_role'] != ''): ?> (<?php echo $this->_var['pay']['game_role']; ?>)<?php endif; ?></td>
	<td><?php echo $this->_var['pay']['tel']; ?></td>
	<td><?php echo $this->_var['pay']['money']; ?></td>
	<td><?php echo $this->_var['pay']['time']; ?></td>
	<td><?php echo $this->_var['pay']['ip']; ?></td>
	<td><?php echo $this->_var['pay']['game_id']; ?>-<?php echo $this->_var['pay']['server_id']; ?></td>
	<td align="center">
	<a href="?action=game&do=pay_rehash&order_no=<?php echo $this->_var['pay']['order_no']; ?>" onclick="return confirm('确定要手动处理订单？')">手动处理</a>
	| <a href="?action=game&do=pay_modify&pay_id=<?php echo $this->_var['pay']['id']; ?>&state=<?php echo $this->_var['pay']['state']; ?>" onclick="return confirm('确定要更改订单状态？')">更改状态</a>
	| <a href="?action=game&do=pay_delete&pay_id=<?php echo $this->_var['pay']['id']; ?>" onclick="return confirm('<?php echo $this->_var['language']['confirm_delete']; ?>')"><?php echo $this->_var['language']['delete']; ?></a>
	</td>
	</tr>
	<tr><td height="1" bgcolor="#eeeeee" colspan="10"></td></tr>
	<?php endforeach; else: ?>
	<tr><td height="50" colspan="10" align="center"><?php echo $this->_var['language']['nodata']; ?></td></tr>
	<?php endif; unset($_from); ?><?php $this->pop_vars();; ?>
	<tr>
	<td colspan="3" style="color:red;">&nbsp;&nbsp;合计金额：<?php echo $this->_var['total']; ?></td>
	<td height="50" colspan="7" align="right"><?php echo $this->_var['pagebar']; ?></td>
	</tr>
	</table>
				
				
				
				
				</div>
			
					
					
					
					
					
					
					
					
				</div> 
				
				
				
				
			</div> 
			
			
		</div> 
		
	</div> 
	
</div> 
<?php echo $this->fetch('footer.htm'); ?>		

<script type="text/javascript">
	function getServer(id){
		$.ajax({
			url:'pay.php',
			data:"action=get_server&game_id="+id,
			type:'get',
			dataType:'text',
			success:function(result){
				//alert(result);
				$("#server_id").empty();
				$("#server_id").append('<option value="">全部</option>');
				$("#server_id").append(result);
			}
		});
	}
	//默认游戏
	<?php if ($this->_var['search']['game_id'] > 0): ?>
		getServer(<?php echo $this->_var['search']['game_id']; ?>);
	<?php endif; ?>
</script>
</body>
</html>