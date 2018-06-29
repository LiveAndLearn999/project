function get_pos(e){
	var e =e|| window.Event;
	return {x:e.pageX||(e.clientX?e.clientX+document.documentElement.scrollLeft:0),y:e.pageY||(e.clientY?e.clientY+document.documentElement.scrollTop:0)};
}
function box(title,width,height,content){
	var mask_left=-(width+14)/2;
	var mask_top=-(height+14)/2;
	var body_left=-width/2;
	var body_top=-height/2;
	var box_mask=$("<div />").attr('id','box_mask').addClass('box_mask').css({'width':'100%','height':$(document).height()+'px'}).appendTo('body');
	var box_body=$("<div />").attr('id','box_body').addClass('box_body').css({'width':width,'height':height,'marginLeft':body_left+'px','marginTop':body_top+'px'}).appendTo('body');
	var box_caption=$("<div />").attr('id','box_caption').addClass('box_caption').appendTo(box_body).append(title);
	var box_button=$("<div />").attr('id','box_button').addClass('box_button').appendTo(box_caption);
	var box_content=$("<div />").attr('id','box_content').addClass('box_content').appendTo(box_body).html(content);
		box_button.click(function(){			
			box_body.empty();
			box_body.remove();
			box_mask.remove();
		});
}
function add_favorite(){
	var title=document.title,url=document.location.href;
	if (window.sidebar){ 
		window.sidebar.addPanel(title, url,""); 
	}else if( document.all){ 
		window.external.AddFavorite(url,title); 
	}
}
function tab(id,current,count){
	var d=document;
		for(var i=1;i<=count;i++){
			d.getElementById(id+'_tag_'+i).className='';
			d.getElementById(id+'_body_'+i).style.display='none';
		}
		d.getElementById(id+'_tag_'+current).className='current';
		d.getElementById(id+'_body_'+current).style.display='block';

}
$(document).ready(function(){
	$("ul.topnav li").mouseover(function() {
		$(this).find("ul.subnav").show();
			$(this).hover(function() {
			}, function(){
				$(this).find("ul.subnav").hide();
			});
		});

});