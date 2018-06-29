<?php $_from = $this->_var['game_new']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'game_0_06008300_1486548136');if (count($_from)):
    foreach ($_from AS $this->_var['game_0_06008300_1486548136']):
?>
  <li class="clearfix no">
                                <a href="game.php?action=server_list&game_id=<?php echo $this->_var['game_0_06008300_1486548136']['game_id']; ?>" target="_blank"><img title="" src="uploads/<?php echo $this->_var['game_0_06008300_1486548136']['game_logo9']; ?>"></a>
                                <div><a class="mask" href="game.php?action=server_list&game_id=<?php echo $this->_var['game_0_06008300_1486548136']['game_id']; ?>" target="_blank">点击查看</a></div>
                            </li>
							<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>