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
					<a href="?action=member&do=member_list"><?php echo $this->_var['language']['member_list']; ?></a>&raquo;&nbsp;<?php if ($this->_var['mode'] == 'insert'): ?><?php echo $this->_var['language']['member_add']; ?><?php else: ?><?php echo $this->_var['language']['member_edit']; ?><?php endif; ?>
					
				</h1>
				
				<div class="stat-container">
				
	
	<table cellspacing="1" cellpadding="0" width="100%">
	<tr class="titlebg">
	<td height="20" width="20"></td>
	<td>文件名</td>
	<td width="250" align="center">操作</td>
	</tr>
	<tr><td height="1" bgcolor="#eeeeee" colspan="4"></td></tr>
	<?php $_from = $this->_var['dir_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'dir');if (count($_from)):
    foreach ($_from AS $this->_var['dir']):
?>
	<tr>
	<td height="25"></td>
	<td><a href="?action=template&do=template_list&path=<?php echo $this->_var['path']; ?><?php echo $this->_var['dir']; ?>"><?php echo $this->_var['dir']; ?></td>
	<td align="center">
	</td>
	</tr>
	<tr><td height="1" bgcolor="#eeeeee" colspan="4"></td></tr>
	<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
	<?php $_from = $this->_var['file_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'file');if (count($_from)):
    foreach ($_from AS $this->_var['file']):
?>
	<tr>
	<td height="25"></td>
	<td><?php echo $this->_var['file']; ?></td>
	<td align="center">
	<a href="?action=template&do=template_edit&path=<?php echo $this->_var['path']; ?><?php echo $this->_var['file']; ?>">编辑文件</a>
	</td>
	</tr>
	<tr><td height="1" bgcolor="#eeeeee" colspan="4"></td></tr>
	<?php endforeach; else: ?>
	<tr><td height="50" colspan="4" align="center"><?php echo $this->_var['language']['nodata']; ?></td></tr>
	<?php endif; unset($_from); ?><?php $this->pop_vars();; ?>
	</table>

				
				
				
				
				</div>
			
					
					
					
					
					
					
					
					
				</div> 
				
				
				
				
			</div> 
			
			
		</div> 
		
	</div> 
	
</div> 
<?php echo $this->fetch('footer.htm'); ?>		
</body>
</html>