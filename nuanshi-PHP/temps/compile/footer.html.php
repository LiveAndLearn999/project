<div id="footer">
   <?php if ($this->_var['bottom_menu']): ?> <p><?php $_from = $this->_var['bottom_menu']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'menu');$this->_foreach['bottom_menu'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['bottom_menu']['total'] > 0):
    foreach ($_from AS $this->_var['menu']):
        $this->_foreach['bottom_menu']['iteration']++;
?>
  <a href="<?php echo $this->_var['menu']['link']; ?>" <?php if ($this->_var['menu']['target'] == 1): ?>target="_blank"<?php endif; ?>><?php echo $this->_var['menu']['name']; ?></a>
  <?php if (! ($this->_foreach['bottom_menu']['iteration'] == $this->_foreach['bottom_menu']['total'])): ?>┊<?php endif; ?>
	<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?><br></p>
   <div>
     <div id="div">
<P>
  Copyright@2016 玛岸游戏——南京玛岸网络科技有限公司 All rights reserved ┊ <?php echo $this->_var['config']['site_icp']; ?>
  </P>
   <P>
  地址：南京市雨花经济开发区凤华路18号8幢405室  联系电话：025-52359970
    </P>
	   <P>
   健康游戏忠告:抵制不良游戏,拒绝盗版游戏。注意自我保护,谨防受骗上当。适度游戏益脑,沉迷游戏伤身。合理安排时间,享受健康生活。
    </P>     </div>
   </div>
   <?php endif; ?>
</div>

  
