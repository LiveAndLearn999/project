<div class="span3">
				
				<div class="account-container">
				
					<div class="account-avatar">
						<img src="./img/headshot.png" alt="" class="thumbnail" />
					</div> 
				
					<div class="account-details">
					
						<span class="account-name"><?php echo $_SESSION['admin_name']; ?></span>
						
						<span class="account-role">Administrator</span>
						
						<span class="account-actions">
							<a href="?action=start">平台参数</a> |
							
							<a href="?action=config&do=dlapi">接口配置</a>
						</span>
					
					</div> 
				
				</div> 
				
				<hr />
				
				<ul id="main-nav" class="nav nav-tabs nav-stacked">
					
					<li >
						<a href='?action=config&do=config'><?php echo $this->_var['language']['menu_config_1']; ?></a>
					</li>
					
					<li>
						<a href='?action=config&do=menu_list'><?php echo $this->_var['language']['menu_config_2']; ?></a>
					</li>
					
					<li>
						<a href='?action=config&do=admin_list'><?php echo $this->_var['language']['menu_config_3']; ?></a>
					</li>
					
					<li>
						<a href='?action=content&do=channel_list'><?php echo $this->_var['language']['menu_content_4']; ?></a>
					</li>
					
					<li>
						<a href='?action=game&do=game_list'><?php echo $this->_var['language']['menu_content_5']; ?></a>
					</li>
					
					<li>
						<a href='?action=game&do=pay_list'><?php echo $this->_var['language']['menu_content_6']; ?></a>
					</li>
					
					<li>
						<a href='?action=game&do=card_list'><?php echo $this->_var['language']['menu_content_7']; ?></a>
					</li>
					
					<li>
						<a href='?action=member&do=member_list'><?php echo $this->_var['language']['menu_member_1']; ?></a>
					</li>
					
					<li>
						<a href='?action=template&do=template_list'>编辑模板</a>
					</li>
					
					<li>
						<a href='?action=other&do=link_list'><?php echo $this->_var['language']['menu_other_3']; ?></a>
					</li>
					
					<li>
						<a href='?action=game&do=sp_data'><?php echo $this->_var['language']['menu_other_4']; ?></a>
					</li>
					
					<li>
						<a href='?action=game&do=sp_cash'>提现申请</a>
					</li>
					<li>
						<a href='?action=plugin&do=plugin'><?php echo $this->_var['language']['menu_plugin']; ?></a>
					</li>
					<li>
						<a href='?action=gameweb&do=gameweblist'><?php echo $this->_var['language']['menu_gameweblist']; ?></a>
					</li>
				</ul>	
				<script type="text/javascript" language="javascript">
                       var nav = document.getElementById("main-nav");
                       var links = nav.getElementsByTagName("li");
                       var lilen = nav.getElementsByTagName("a");
                       var currenturl = document.location.href;
                       var last = 0;
                       for (var i=0;i<links.length;i++)
                               {
                        var linkurl =  lilen[i].getAttribute("href");
                        if(currenturl.indexOf(linkurl)!=-1)
                       {
                      last = i;
                       }
                  }
                         links[last].className = "active";
</script>
				<hr />
				
				<div class="sidebar-extra">
					<p>阿狸科技版权所有</p>
					<p>客服QQ：1815080514</p>
				</div> 
				
				<br />
		
			</div>