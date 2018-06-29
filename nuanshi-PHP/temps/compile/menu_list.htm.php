<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html;charset=utf-8" />
<title><?php echo $this->_var['language']['title']; ?></title>
<script type="text/javascript" src="scripts/jquery.js"></script>
</head>
<body>
<?php echo $this->fetch('top.htm'); ?>
<div id="content">
	
	<div class="container">
		
		<div class="row">
<?php echo $this->fetch('left.htm'); ?>
<div class="span9">
				
				<h1 class="page-title">
					<a href="?action=config&do=menu_add"><?php echo $this->_var['language']['menu_add']; ?></a>
&raquo;&nbsp;<?php echo $this->_var['language']['menu_list']; ?>
					
				</h1>
				
				<div class="stat-container">
				
				

<div class='item'>
	<table cellspacing="0" cellpadding="0" width="100%">
	<?php $_from = $this->_var['menu_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'menu');if (count($_from)):
    foreach ($_from AS $this->_var['menu']):
?>
	<tr>
	<td height="28" align="center" width="40"><?php echo $this->_var['menu']['id']; ?></td>
	<td><a href="?action=config&do=menu_edit&menu_id=<?php echo $this->_var['menu']['id']; ?>" class="name"><?php echo $this->_var['menu']['name']; ?></a>&nbsp;(<?php echo $this->_var['menu']['link']; ?>)</td>
	<td width="50" align="center" >
	<?php if ($this->_var['menu']['mode'] == 0): ?>
		<?php echo $this->_var['language']['form_menu_mode_1']; ?>
	<?php else: ?>
		<?php echo $this->_var['language']['form_menu_mode_2']; ?>
	<?php endif; ?>
	</td>
	<td width="100" align="center" >
	<a href="?action=config&do=menu_edit&menu_id=<?php echo $this->_var['menu']['id']; ?>"><?php echo $this->_var['language']['edit']; ?></a>
	<a href="?action=config&do=menu_delete&menu_id=<?php echo $this->_var['menu']['id']; ?>" onclick="return confirm('<?php echo $this->_var['language']['confirm_delete']; ?>')"><?php echo $this->_var['language']['delete']; ?></a>
	</td>
	</tr>
	<tr><td height="1" bgcolor="#eeeeee" colspan="4"></td></tr>
		<?php $_from = $this->_var['menu']['children']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'child');if (count($_from)):
    foreach ($_from AS $this->_var['child']):
?>
		<tr>
		<td height="28" align="center" width="40">&nbsp;</td>
		<td>&nbsp;&nbsp;-&nbsp;&nbsp;<a href="?action=config&do=menu_edit&menu_id=<?php echo $this->_var['child']['id']; ?>" class="name"><?php echo $this->_var['child']['name']; ?></a>&nbsp;(<?php echo $this->_var['child']['link']; ?>)</td>
		<td width="50" align="center" >&nbsp;

		</td>
		<td width="100" align="center" >
		<a href="?action=config&do=menu_edit&menu_id=<?php echo $this->_var['child']['id']; ?>"><?php echo $this->_var['language']['edit']; ?></a>
		<a href="?action=config&do=menu_delete&menu_id=<?php echo $this->_var['child']['id']; ?>" onclick="return confirm('<?php echo $this->_var['language']['confirm_delete']; ?>')"><?php echo $this->_var['language']['delete']; ?></a>
		</td>
		</tr>
		<tr><td height="1" bgcolor="#eeeeee" colspan="4"></td></tr>
		<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
	<?php endforeach; else: ?>
	<tr><td height="50" colspan="2" align="center"><?php echo $this->_var['language']['nodata']; ?></td></tr>
	<?php endif; unset($_from); ?><?php $this->pop_vars();; ?>
	</table>
</div>

				
				
				
				
				</div>
			
					
					
					
					
					
					
					
					
				</div> 
				
				
				
				
			</div> 
			
			
		</div> 
		
	</div> 
	
</div> 
<?php echo $this->fetch('footer.htm'); ?>		

</body>
</html>