//窗口监控事件
narchange();

window.onresize=narchange;

function narchange(){
	//alert(document.documentElement.clientHeight);
	if(document.documentElement.clientHeight > 810){
		if(document.documentElement.clientHeight > 1605){
			$('.leftzone').css("height",1495);
		}else{
			$('.leftzone').css("height",document.documentElement.clientHeight-110);
		}
	}else{
		$('.leftzone').css("height",640);
	}
}
