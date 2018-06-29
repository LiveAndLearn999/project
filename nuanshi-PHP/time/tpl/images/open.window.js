function hsOpen(url,id,width,height,openStat)
{
	var hsExploer = navigator.appName;
	if(hsExploer == "Microsoft Internet Explorer")
	{
		width = width - 6;
		height = height - 55;
		/*********判断openStat是否限制焦点*******/
		showModalDialog(url,window,"dialogWidth:"+ width +"px;dialogHeight:"+ height +"px;help:no;scroll:yes;status:yes;resizable:no");
	}
	else
	{
		qinggan_left = (screen.width-width)/2;
		qinggan_top = (screen.height-height)/2;
		qinggan_win_option = "location=no,menubar=no,toolbar=no,dependance=yes,dialog=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,scrollbars=yes,z-look=yes,width="+ width +",height="+ height +",top="+ qinggan_top +",left="+ qinggan_left
		window.open(url,id,qinggan_win_option);
	}
}

function qinggan_open(url,id)
{
	var qinggan_exploer = navigator.appName;
	if(qinggan_exploer == "Microsoft Internet Explorer")
	{
		showModalDialog(url,window,"dialogWidth:246px;dialogHeight:280px;help:no;scroll:no;status:yes;resizable:no");
	}
	else
	{
		qinggan_left = (screen.width-240)/2;
		qinggan_top = (screen.height-225)/2;
		qinggan_win_option = "location=no,menubar=no,toolbar=no,dependent=yes,dialog=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=no,width=240,height=225,top="+ qinggan_top +",left="+ qinggan_left
		window.open(url,id,qinggan_win_option,true);
	}
}

function qinggan_style(input_var,input_value,input_type)
{
	if(input_type == "font-weight")
	{
		var old = /(font-weight:\w+\;)/;
	}
	else if(input_type == "font-style")
	{
		var old = /(font-style:\w+\;)/;
	}
	else if(input_type == "text-decoration")
	{
		var old = /(text-decoration:\w+\;)/;
	}
	var str = window.document.getElementById(input_var).value;
	if(old.test(str))
	{
		window.document.getElementById(input_var).value = str.replace(old,input_value);
	}
	else
	{
		window.document.getElementById(input_var).value += input_value;
	}
}

function qinggan_cleanup(input_var)
{
	window.document.getElementById(input_var).value = "";
}
/*************全选函数***********/
function select_all()
{
	var objs = window.document.getElementsByTagName("input");
	for(var i=0; i<objs.length; i++)
	{
		if(objs[i].type.toLowerCase() == "checkbox" ) objs[i].checked = true;
	}
}

/***************全不选函数***********/
function selectNone()
{
	var objs = window.document.getElementsByTagName("input");
	for(var i=0; i<objs.length; i++)
	{
		if(objs[i].type.toLowerCase() == "checkbox" ) objs[i].checked = false;
	}
}

/*****************反选函数**************/
function revCheck()
{
	var objs = window.document.getElementsByTagName("input");
	for(var i=0; i<objs.length; i++)
	{
		if(objs[i].type.toLowerCase() == "checkbox" )
		{
			if(objs[i].checked == true)
			{
				objs[i].checked = false;
			}
			else
			{
				objs[i].checked = true;
			}
		}
	}
}