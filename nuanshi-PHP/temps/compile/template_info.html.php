<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
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
					
					编辑模板文件
				</h1>
				
				<div class="stat-container">
				
				<form action="?action=template&do=template_update" method="post">
		<table width="100%" cellspacing="5" cellpadding="0">
		<tr>
		<td width="4%">文件内容</td>
		<td width="95%"><textarea name="content" cols="*" rows="25" class="textarea"><?php echo htmlspecialchars($this->_var['content']); ?></textarea></td>
		</tr>	

		<tr>
		<td height="30" >&nbsp;</td>
		<td align="right">
		<input type="submit" value="<?php echo $this->_var['language']['submit']; ?>" class="btn"/>		</td>
		</tr>
		</table>
		<input type="hidden" name="path" value="<?php echo $this->_var['path']; ?>"/>
	</form>
				
				
				
				
				</div>
			
					
					
					
					
					
					
					
					
				</div> 
				
				
				
				
			</div> 
			
			
		</div> 
		
	</div> 
	
</div> 
<?php echo $this->fetch('footer.htm'); ?>		
</body>
</html>