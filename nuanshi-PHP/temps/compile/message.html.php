<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="UTF-8">
<head>
<title>系统提示</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link type="text/css" rel="stylesheet" href="/templates/ali/style/global.css" />
<link type="text/css" rel="stylesheet" href="/templates/ali/style/layout.css" />
<link type="text/css" rel="stylesheet" href="/templates/ali/style/pop.css" />
<link type="text/css" rel="stylesheet" href="/templates/ali/style/page.css" />
</head>
<body>

<div id="pop_notice" class="popTip popWarn" style="top: 285.5px; ">
        <h3>
            <span>系统提示</span>
            <a onclick="Notice.closeNotice();return false;" href="javascript:void(0)" id="notice_close" class="popClose">关闭</a>
        </h3>
        <div class="popTipMain">
            <div class="warmTip" id="notice_content">
			<?php echo $this->_var['message']['text']; ?>
			
			
			</div>
            <div class="popBtn clearfix">
                <a class="sure1Btn" href="javascript:;" onclick="jump(0);return false;">确定</a>
            </div>
        </div>
    </div>







<script type="text/javascript">
function jump(ts) {
	<?php if ($this->_var['message']['link'] == ''): ?>
	window.setTimeout(function(){history.go(-1)},ts);
	<?php else: ?>
	window.setTimeout(function(){location.href='<?php echo $this->_var['message']['link']; ?>';},ts);
	<?php endif; ?>
}

<?php if ($this->_var['message']['jump'] == '0'): ?>
	//return false;
<?php else: ?>
	//自动跳转
	jump(2000);
<?php endif; ?>
</script>
</body>
</html>
