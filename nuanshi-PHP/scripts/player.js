function player(url,width,height,mode){
	var temp='';
	if(url.toLowerCase().substring(0,6)=='youku:'){
		var code=url.split(":");
			temp=youku(code[1],width,height);
			if(mode==0){
				document.write(temp);
			}else{
				document.getElementById('vod_player').innerHTML=temp;
			}
			return;
	}
	var ext=String(url).split(".");
		ext=ext[ext.length-1];
	if (ext=='mp3'||ext=='wma'||ext=='mid'||ext=='wav'){
		temp='<div style="margin:10px;text-align:center"><embed showstatusbar="true" showtracker="false" showaudiocontrols="false" autostart="false" style="filter: xray()alpha(opacity=80,style=1,finishopacity=5)" volume="0" loop="1" height="69" width="500" src="'+url+'"></embed></div>';
	}else if(url.toLowerCase().substring(0,7)=='qvod://'){
		temp=qvod(url,width,height);
	}else if(url.toLowerCase().substring(0,7)=='pvod://'){
		temp=pvod(url,width,height);
	}else if(ext=='flv'){
		temp=flv(url,width,height);
	}else if(url.toLowerCase().substring(0,23)=='http://player.youku.com'){
		var code=url.split("/");
		temp=youku(code[5],width,height);
	}else{
		temp='<div style="text-align:center"><embed showstatusbar="true" autostart="false" enablecontextmenu="0" showpositioncontrols="true" style="FILTER:xray(); alpha(opacity=100,style=0,finishopacity=100)" volume="0" loop="1" width="'+width+'" height="'+height+'" src="'+url+'"></embed></div>';
	}
	if(mode==0){
		document.write(temp);
	}else{
		document.getElementById('vod_player').innerHTML=temp;
	}
}
function flv(url,width,height){
	return '<div style="text-align:center"><object type="application/x-shockwave-flash" data="images/flvplayer.swf" width="'+width+'" height="'+height+'"><param name="movie" value="images/flvplayer.swf"/><param name="allowFullScreen" value="true" /><param name="FlashVars" value="xml=<vcastr><channel><item><source>'+url+'</source></item></channel><config><isShowAbout>false</isShowAbout><defautVolume>1</defautVolume><bufferTime>4</bufferTime><contralPanelAlpha>0.6</contralPanelAlpha><controlPanelBgColor>0x000000</controlPanelBgColor><controlPanelBtnColor>0xFFFFFF</controlPanelBtnColor><contralPanelBtnGlowColro>0xFFFF00</contralPanelBtnGlowColro><controlPanelMode>float</controlPanelMode><defautVolume>1</defautVolume><isAutoPlay>false</isAutoPlay><isLoadBegin>true</isLoadBegin><isShowAbout>false</isShowAbout><scaleMode>showAll</scaleMode><isRepeat>false</isRepeat></config></vcastr>"/></object></div>';	
}
function youku(code,width,height){
	return "<div style=\"text-align:center\"><EMBED pluginspage=http://www.macromedia.com/go/getflashplayer src=http://player.youku.com/player.php/sid/"+code+"=/v.swf width=\""+width+"\" height=\""+height+"\" type=application/x-shockwave-flash flashvars=\"isAutoPlay=false&amp;Version=/v1.0.0304&amp;winType=interior\" allowscriptaccess=\"always\" allowfullscreen=\"true\" quality=\"high\" bgcolor=\"#FFFFFF\" EnableContextMenu=\"1\" wmode=\"opaque\"></EMBED></div>";
}

function qvod(url,width,height){
	return "<div style=\"text-align:center\"><object classid='clsid:F3D0D36F-23F8-4682-A195-74C92B03D4AF' width='"+width+"' height='"+height+"' id='QvodPlayer' onError=\"if(confirm('请您先安装QvodPlayer软件,然后刷新本页才可以正常播放.')){window.open('http://www.qvod.com/download.htm')}\"><PARAM NAME='URL' VALUE='"+url+"'><PARAM NAME='Autoplay' VALUE='1'></object></div>";
}

function pvod(url,width,height){
	return "<div style=\"text-align:center\"><object classid=\"CLSID:1DD5176B-B71E-4956-8F32-691702ACDCFE\" width='"+width+"' height='"+height+"' id='PvodPlayer' onError=\"if(confirm('请您先安装PvodPlayer软件,然后刷新本页才可以正常播放.')){window.open('http://www.pvod.cn/install/index.html')}\"><PARAM NAME='URL' VALUE='"+url+"'></object></div>";
}