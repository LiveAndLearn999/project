<?php $_from = $this->_var['game_news']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'game_0_07495900_1486548136');if (count($_from)):
    foreach ($_from AS $this->_var['game_0_07495900_1486548136']):
?>
 <li>
         <span class="sort"><a target="_blank" href="game.php?action=server_list&game_id=<?php echo $this->_var['game_0_07495900_1486548136']['game_id']; ?>"><?php echo $this->_var['game_0_07495900_1486548136']['game_name']; ?></a></span>
         <span class="serName"><a target="_blank" href="game.php?action=server_list&game_id=<?php echo $this->_var['game_0_07495900_1486548136']['game_id']; ?>"><?php echo $this->_var['game_0_07495900_1486548136']['server_name']; ?></a></span>
         <span class="date"><?php echo $this->_var['game_0_07495900_1486548136']['server_trunon_date']; ?>-<?php echo $this->_var['game_0_07495900_1486548136']['server_trunon_hour']; ?></span>
     </li>
	 <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
