 <?php $_from = $this->_var['news']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'news_0_06858500_1486548136');if (count($_from)):
    foreach ($_from AS $this->_var['news_0_06858500_1486548136']):
?>
 <li>
             <dl class="clearfix">
                     <dt><img src="/uploads/zxxmbe.png" width="47" height="47" /></dt>
                     <dd>
                         <span class="clearfix">
                             <strong>【<?php echo $this->_var['news_0_06858500_1486548136']['content_title']; ?>】</strong>
                            <var><?php echo $this->_var['news_0_06858500_1486548136']['content_time']; ?></var> 
                         </span>
                         <p><a href="<?php echo $this->_var['news_0_06858500_1486548136']['url']; ?>" target="_blank"><span style="color:<?php echo $this->_var['news_0_06858500_1486548136']['color']; ?>"><?php echo $this->_var['news_0_06858500_1486548136']['content_description']; ?></span></a></p>
                     </dd>
   </dl>
              </li><?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>