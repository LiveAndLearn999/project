<?php $_from = $this->_var['game_best']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'game');if (count($_from)):
    foreach ($_from AS $this->_var['game']):
?>

 <a onclick="getServer(<?php echo $this->_var['game']['game_id']; ?>)" id="i<?php echo $this->_var['game']['i']; ?>"  class="tabs" href="javascript:void(0)"><span><?php echo $this->_var['game']['game_name']; ?></span></a>
           <div class="tabcon" style="height:136px">
              <ul id="server_id<?php echo $this->_var['game']['game_id']; ?>">
			
										
              </ul>
           </div><?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
		   <script type="text/javascript">
		   function getServer(id){
		
		$.ajax({
			url:'gameajax.php',
			data:"id=get_server&game_id="+id,
			type:'get',
			dataType:'text',
			success:function(result){
				//alert(result);
				$("#server_id"+id).empty();
				$("#server_id"+id).append(result);
			}
		});
	}
	</script>