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
				<a href="?action=config&do=menu_list"><?php echo $this->_var['language']['menu_list']; ?></a>
&raquo;&nbsp;<?php if ($this->_var['mode'] == 'insert'): ?><?php echo $this->_var['language']['menu_add']; ?><?php else: ?><?php echo $this->_var['language']['menu_edit']; ?><?php endif; ?>
				</h1>
				
				<div class="stat-container">
				
				
				

<div class='item'>
	<table width="100%">
	<form action="?action=config&do=menu_<?php echo $this->_var['mode']; ?>" method="post">
		<tr>
		<td align="right" width="80" height="30"><?php echo $this->_var['language']['form_menu_parent_id']; ?></td>
		<td><select name="parent_id">
		<option value="0"><?php echo $this->_var['language']['select']; ?></option><?php echo $this->html_options(array('options'=>$this->_var['menu_list'],'selected'=>$this->_var['menu']['parent_id'])); ?></select></td>
		</tr>
		<tr>
		<td align="right" width="80" height="30"><?php echo $this->_var['language']['form_menu_name']; ?></td>
		<td><input type="text" name="menu_name" size="40" value="<?php echo htmlspecialchars($this->_var['menu']['name']); ?>" class="input"/></td>
		</tr>
		<tr>
		<td align="right"  height="30"><?php echo $this->_var['language']['form_menu_link']; ?></td>
		<td><input type="text" name="menu_link" size="40" value="<?php echo htmlspecialchars($this->_var['menu']['link']); ?>" class="input"/></td>
		</tr>
		
		<tr>
		<td align="right" height="30"><?php echo $this->_var['language']['form_menu_target']; ?></td>
		<td>
		<input type="radio" name="menu_target" value="1" <?php if ($this->_var['menu']['target'] == 1): ?>checked<?php endif; ?> /> <?php echo $this->_var['language']['form_menu_target_1']; ?>
		<input type="radio" name="menu_target" value="0" <?php if ($this->_var['menu']['target'] == 0): ?>checked<?php endif; ?> /> <?php echo $this->_var['language']['form_menu_target_2']; ?>
		</td>
		</tr>
		
		
		<tr>
		<td align="right" height="30"><?php echo $this->_var['language']['form_menu_mode']; ?></td>
		<td>
		<input type="radio" name="menu_mode" value="0" <?php if ($this->_var['menu']['mode'] == 0): ?>checked<?php endif; ?> /> <?php echo $this->_var['language']['form_menu_mode_1']; ?>
		<input type="radio" name="menu_mode" value="1" <?php if ($this->_var['menu']['mode'] == 1): ?>checked<?php endif; ?> /> <?php echo $this->_var['language']['form_menu_mode_2']; ?>
		</td>
		</tr>	
		
		<tr>
		<td align="right" height="30"><?php echo $this->_var['language']['form_menu_order']; ?></td>
		<td><input type="text" name="menu_sort" size="10" value="<?php echo htmlspecialchars($this->_var['menu']['sort']); ?>" class="input" /></td>
		</tr>	

		<tr>
		<td align="right" height="30"><?php echo $this->_var['language']['form_menu_state']; ?></td>
		<td>
		<input type="radio" name="menu_state" value="1" <?php if ($this->_var['menu']['state'] == 1): ?>checked<?php endif; ?> /> <?php echo $this->_var['language']['form_menu_state_2']; ?>
		<input type="radio" name="menu_state" value="0" <?php if ($this->_var['menu']['state'] == 0): ?>checked<?php endif; ?> /> <?php echo $this->_var['language']['form_menu_state_1']; ?>
		</td>
		</tr>	

		<tr>
		<td align="right" height="30">&nbsp;</td>
		<td>
		<input type="submit" value="<?php echo $this->_var['language']['submit']; ?>" class="btn"/>
		</td>
		</tr>
		<input type="hidden" name="menu_id" value="<?php echo $this->_var['menu']['id']; ?>"/>
	</form>
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