//通用js信息

//判断浏览器类型
var hsExploer = navigator.appName;
var hsIE;
if(hsExploer == "Microsoft Internet Explorer")
{
	hsIE = "IE";
	if(navigator.appVersion.match(/7./i)!='7.')
	{
		hsIE = "IE6";
	}
}
else
{
	hsIE = "FF";
}

function hsopen(url,height,inputname)
{
	hs_open(url,height,inputname);
}

function hs_open(url,height)
{
	//判断高度小于或等于100时，变为154，主要是兼容Firefox浏览器
	if(height < 154)
	{
		height = 154;
	}
	if(hsIE == "IE" || hsIE == "IE6")
	{
		var iframe_height;
		if(hsIE == "IE6")
		{
			iframe_height = eval(height + " - 28");
			height = eval(height + " + 53");
		}
		else
		{
			iframe_height = eval(height + " - 28");
		}
		showModalDialog("admin.php?incfile="+UrlEncode(url)+"&iframe_height="+iframe_height,window,"dialogWidth:500px;dialogHeight:"+ height +"px;help:no;scroll:no;status:yes;resizable:no");
	}
	else
	{
		hardy_left = (screen.width-500)/2;
		hardy_win_option = "modal=yes,location=no,menubar=no,toolbar=no,dependent=yes,dialog=yes,status=0,minimizable=no,alwaysRaised,resizable=yes,scrollbars=no,width=500,height="+ height +",top=100,left="+ hardy_left
		window.open("admin.php?incfile="+UrlEncode(url)+"&iframe_height="+(height-30),"_blank",hardy_win_option);
	}
}

function $(id)
{
	return document.getElementById(id);
}


function hs_close()
{
	window.close();
}

function UrlEncode(str)
{
	return transform(str);
}

function transform(s)
{
	var hex=''
	var i,j,t

	j=0
	for (i=0; i<s.length; i++)
	{
		t = hexfromdec( s.charCodeAt(i) );
		if (t=='25')
		{
			t='';
		}
		hex += '%' + t;
	}
	return hex;
}

function hexfromdec(num) {
        if (num > 65535) { return ("err!") }
        first = Math.round(num/4096 - .5);
        temp1 = num - first * 4096;
        second = Math.round(temp1/256 -.5);
        temp2 = temp1 - second * 256;
        third = Math.round(temp2/16 - .5);
        fourth = temp2 - third * 16;
        return (""+getletter(third)+getletter(fourth));
}

function getletter(num) {
        if (num < 10) {
                return num;
        }
        else {
            if (num == 10) { return "A" }
            if (num == 11) { return "B" }
            if (num == 12) { return "C" }
            if (num == 13) { return "D" }
            if (num == 14) { return "E" }
            if (num == 15) { return "F" }
        }
}

function hsurl(url)
{
	window.location.href=url;
}