<?php $_from = $this->_var['faq']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'faq_0_58813200_1486559295');if (count($_from)):
    foreach ($_from AS $this->_var['faq_0_58813200_1486559295']):
?>
<a title="<?php echo $this->_var['faq_0_58813200_1486559295']['content_title']; ?>" href="<?php echo $this->_var['faq_0_58813200_1486559295']['url']; ?>"><span style="color:<?php echo $this->_var['faq_0_58813200_1486559295']['color']; ?>"><?php echo $this->_var['faq_0_58813200_1486559295']['content_title']; ?></span></a> 
<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>