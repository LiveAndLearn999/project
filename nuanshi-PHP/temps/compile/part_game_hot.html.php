<?php $_from = $this->_var['game_hot']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'game_0_05311700_1486548136');if (count($_from)):
    foreach ($_from AS $this->_var['game_0_05311700_1486548136']):
?>
 <dl class="d101 clearfix">
                         <dt><a href="game.php?action=server_list&game_id=<?php echo $this->_var['game_0_05311700_1486548136']['game_id']; ?>" alt="<?php echo $this->_var['game_0_05311700_1486548136']['game_name']; ?>"><img alt="<?php echo $this->_var['game_0_05311700_1486548136']['game_name']; ?>" title="" src="uploads/<?php echo $this->_var['game_0_05311700_1486548136']['game_logo']; ?>" /></a></dt>
                         <dd>
                             <div class="clearfix">
                                 <strong><?php echo $this->_var['game_0_05311700_1486548136']['game_name']; ?></strong>
                                 <span class="clearfix">
                                     <a class="gw" href="<?php echo $this->_var['game_0_05311700_1486548136']['game_website']; ?>" target="_blank">介绍</a> 
                                     <a class="bbs" href="<?php echo $this->_var['game_0_05311700_1486548136']['game_bbs']; ?>" target="_blank">下载</a> 
                                     <a class="ksbtn" href="game.php?action=server_list&game_id=<?php echo $this->_var['game_0_05311700_1486548136']['game_id']; ?>" target="_blank">开始游戏</a> 
                                 </span>
                             </div>
                             <p><?php echo $this->_var['game_0_05311700_1486548136']['game_depict']; ?></p>
                             <ul class="clearfix">
                                                                                                   <li onmouseout="this.className='clearfix'" onmousemove="this.className='clearfix on'" class="clearfix">
                                     
                                 </li>
                                                                  <li onmouseout="this.className='clearfix'" onmousemove="this.className='clearfix on'" class="clearfix">
                                     
                                 </li>
                                                                                               </ul>
                         </dd>
                     </dl><?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>