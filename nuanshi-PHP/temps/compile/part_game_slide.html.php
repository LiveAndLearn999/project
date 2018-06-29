  <?php $_from = $this->_var['game_focus']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'game');if (count($_from)):
    foreach ($_from AS $this->_var['game']):
?>
<div class="banner_item">
                                   <a href="game.php?action=server_list&game_id=<?php echo $this->_var['game']['game_id']; ?>" target='_blank'><img src="uploads/<?php echo $this->_var['game']['game_logo2']; ?>" title=""/></a>
                                   <div class="caption">
                                       <h3>
                                          <?php echo $this->_var['game']['game_name']; ?>
                                                                                      <span>
                                                                                              <a target="_blank" href="game.php?action=server_list&game_id=<?php echo $this->_var['game']['game_id']; ?>">进入游戏</a>
                                                                                              <a target="_blank" href="card.php?game_id=<?php echo $this->_var['game']['game_id']; ?>" class="baggift">>新手卡</a>
                                                                                              <a target="_blank" href="<?php echo $this->_var['game']['game_website']; ?>">进入官网</a>
																							   <a href="<?php echo $this->_var['game']['game_bbs']; ?>" target="_blank">下载</a>                                                                                         </span>
                                                                                  </h3>
                                   </div>
                               </div>
							   <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?></div>
							    <ul class="pagination"> <?php $_from = $this->_var['game_focus']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'game');if (count($_from)):
    foreach ($_from AS $this->_var['game']):
?>
                                                              <li class="current"><a href="javascript:;"><?php echo $this->_var['game']['i']; ?></a></li>
															  <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                                                              
                                                          </ul>