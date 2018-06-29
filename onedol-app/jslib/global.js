// 定义【全局变量】
var domain = "https://api.1yuanxing.com/";
// var domain = "http://test.1yuanxing.com:9015/";
// var domain = "http://192.168.0.19:9090/";
// var domain2 = "http://test.1yuanxing.com:9015/";
var domain2 = "https://api.1yuanxing.com/";
// var domain2 = "http://192.168.0.19:9090/";
var domain3 = "https://resource.1yuanxing.com/";
var basePath = domain+"apiAngular/";

// 判断平台
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

var alertPopup = '';//请求弹框
// 如果是IOS,则查询当前真实的数据接口,提交审核用测试接口,审核通过后用正式接口
if(isiOS) {
    // var url = 'https://ios.1yuanxing.com/apiAngular/getIOSApi.jsp';
    var url = domain + "apiAngular/getIOSApi.jsp";
    var data = {};
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("post", url, false);
    // xmlHttp.open("get",url,false);
    xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xmlHttp.send(null);
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
        var jsonRet = JSON.parse(xmlHttp.responseText);
        var apiPathNow = jsonRet.apiPathNow3_0_1;// IOS 3.0.1 版本
        if (jsonRet.code == 200 && apiPathNow != null && apiPathNow != ""){
			domain = apiPathNow;
            domain2 = apiPathNow;
            basePath = apiPathNow+"apiAngular/";
		}
    }
}

// 跳转
function skip(url){
	window.location.href = url;
}
Array.prototype.removeByValue = function(val) {
    for(var i=0; i<this.length; i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
}
Array.prototype.removeById = function(val) {
    for(var i=0; i<this.length; i++) {
        if(this[i].id == val) {
            this.splice(i, 1);
            break;
        }
    }
}
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
function compareSize(str1,str2) {
    var flag = 1;
    var arr1 = str1.split(".");
    var arr2 = str2.split(".");
    var len = Math.min(arr1.length,arr2.length);
    for(var i=0;i<len;i++){
        if(parseInt(arr2[i]) == parseInt(arr1[i])){
            flag = 3;
        } else if(parseInt(arr2[i]) > parseInt(arr1[i])){
            flag = 1;
            break;
        }else {
            flag = 2;
            break;
        }
    }
    if(flag == 3){
        if(arr2.length > arr1.length){
            flag = 1;
        } else {
            flag = 2;
        }
    }
    return flag;
}
// setInterval(function () {
//     showWinInfoDialog({flag:1,nid:108});
// },10000);

