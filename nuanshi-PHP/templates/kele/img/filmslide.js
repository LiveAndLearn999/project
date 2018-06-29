var imgShow = document.getElementById('imgShow');
var ul = imgShow.getElementsByTagName('ul');
var imgWidth = ul[0].getElementsByTagName('li')[0].offsetWidth;
ul[0].scrollLeft = 0;
var imgNow = 0;
var imgLength = ul[0].getElementsByTagName('li').length;
var step = 100;
var seed = 50;
var btnLi = ul[1].getElementsByTagName('li');
var timer = null;

function showImg(num)
{
num = num % imgLength;
if(num == imgNow) return;
var from = ul[0].scrollLeft;
var to = num * imgWidth;
for(var i=0; i< btnLi.length;i++)
{
btnLi[i].className = "";
}
btnLi[num].className="on";
if(timer) clearTimeout(timer);
if(from < to)
moveImg(from,to,'r',num);
else
moveImg(from,to,'l',num);
}

function moveImg(from, to,t,n)
{
if(t == "r")
{
from += step;
if(from >= to)
{
ul[0].scrollLeft = to+10;
imgNow = n;
timer = window.setTimeout("showImg(imgNow + 1);",3000)
}
else
{
ul[0].scrollLeft = from;
timer = window.setTimeout("moveImg(" + from + ',' + to + ",'" + t + "'," +  n+ ')',50)
}
}
else
{
from -= step;
if(from <= to)
{
ul[0].scrollLeft = to;
imgNow = n;
timer = window.setTimeout("showImg(imgNow + 1);",3000)
}
else
{
ul[0].scrollLeft = from;
timer = window.setTimeout("moveImg(" + from + ',' + to + ",'" + t + "'," +  n+ ')',50)
}
}
}
timer = window.setTimeout("showImg(imgNow + 1);",3000)
