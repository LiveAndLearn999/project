<!DOCTYPE html>
<html>
  <head>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title><?php echo $this->_var['language']['title']; ?>-阿狸网页游戏混服代理平台</title>
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />    
    
   
   
	
  </head>

<body>
<?php echo $this->fetch('top.htm'); ?>
	





<div id="content">
	
	<div class="container">
		
		<div class="row">
			<?php echo $this->fetch('left.htm'); ?>
			 
			
			
			
			<div class="span9">
				
				<h1 class="page-title">
					
					统计					
				</h1>
				
				<div class="stat-container">
										
					<div class="stat-holder">						
						<div class="stat">							
							<span><?php echo $this->_var['tj']['hysj']; ?></span>							
							注册会员【个】						
						</div> 						
					</div> 
					
					<div class="stat-holder">						
						<div class="stat">							
							<span><?php echo $this->_var['tj']['cz']; ?></span>							
							充值金额【元】							
						</div> 						
					</div> 
					
					<div class="stat-holder">						
						<div class="stat">							
							<span><?php echo $this->_var['tj']['yx']; ?></span>							
							代理游戏【款】							
						</div> 						
					</div> 
					
					<div class="stat-holder">						
						<div class="stat">							
							<span><?php echo $this->_var['tj']['tg']; ?></span>							
							推广成员【个】							
						</div> 						
					</div> 
					
				</div> 
				
				<div class="widget">
										
					<div class="widget-header">
						
						<h3>服务器配置</h3>
					</div> 
														
					<div class="widget-content">					
						<div id="line-chart" class="chart-holder"><ul class='list' style="list-style-type:none">
	<li><?php echo $this->_var['language']['system_info_1']; ?><?php echo $this->_var['system_info']['SERVER_TIME']; ?></li>
	<li  style="background:#efefef"><?php echo $this->_var['language']['system_info_2']; ?><?php echo $this->_var['system_info']['SERVER_PORT']; ?></li>
	<li><?php echo $this->_var['language']['system_info_3']; ?><a href='./' target="_blank" style="color:red;text-decoration:underline"><?php echo $this->_var['system_info']['SERVER_NAME']; ?></a></li>
	<li  style="background:#efefef"><?php echo $this->_var['language']['system_info_4']; ?><?php echo $this->_var['system_info']['PHP_OS']; ?></li>
	<li><?php echo $this->_var['language']['system_info_5']; ?><?php echo $this->_var['system_info']['SERVER_SOFTWARE']; ?></li>
	<li  style="background:#efefef"><?php echo $this->_var['language']['system_info_6']; ?>MYSQL <?php echo $this->_var['system_info']['DB_VERSION']; ?></li>
	<li><?php echo $this->_var['language']['system_info_7']; ?><?php echo $this->_var['system_info']['DOCUMENT_ROOT']; ?></li>
	<li  style="background:#efefef"><?php echo $this->_var['language']['system_info_8']; ?><?php echo $this->_var['system_info']['UPLOAD_MAX_FILESIZE']; ?></li>
	</ul></div> 				
					</div> 
					
				</div> 
				
				
			</div> 
			
			
		</div> 
		
	</div> 
	
</div> 
					
	
<div id="footer">
	
	<div class="container">				
		<hr />
		<p>&copy; 2013. 阿狸网页游戏代理平台</p>
	</div> 
	
</div> 


    <script src="./js/jquery-1.7.2.min.js"></script>
<script src="./js/excanvas.min.js"></script>
<script src="./js/jquery.flot.js"></script>
<script src="./js/jquery.flot.pie.js"></script>
<script src="./js/jquery.flot.orderBars.js"></script>
<script src="./js/jquery.flot.resize.js"></script>


<script src="./js/bootstrap.js"></script>
<script src="./js/charts/line.js"></script>


<!-- Le javascript
================================================== -->



  </body>
</html>
