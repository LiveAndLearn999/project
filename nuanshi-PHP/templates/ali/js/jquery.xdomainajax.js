/**
 * 实现7711 ajax跨域
 */
jQuery.ajax = (function(_ajax){
    var protocol = location.protocol,
        hostname = location.hostname,
        exRegex  = RegExp(protocol + '//' + hostname),
        proxyPath = '/ajaxProxy.html',
        // 获取xdomainajax路径
        thisScript = (function (script, i, me) {
            for (i in script) {
                // 如果通过第三方脚本加载器加载本文件，请保证文件名含有"xdomainajax"字符
                if (script[i].src && script[i].src.indexOf('xdomainajax') !== -1) return script[i].src;
            };
        }(document.getElementsByTagName('script')));
        domain = thisScript.split('domain=')[1];
        domain = domain.substr(0,1) == '.' ? domain.substr(1) : domain;

    /**
     * 检测是否外部链接
     * 条件:a) 是否与当前域名一样  b) 包含://(排除不带域名的url)
     */
    function isExternal(url) {
        return !exRegex.test(url) && /:\/\//.test(url);
    }
    /**
     * 返回域名
     */
    function getHost(url)
    {
        if ( null == url || url == '' ) {
            return '';
        }
        reg = /(https?:\/\/[^\/\?]+).*/i;
        if ( reg.test(url) ) {
            return reg.exec(url)[1];
        } else {
            return '';
        }
    }
    /**
     * 创建iframe
     */
    var createAjaxIframe = {
        appIframe: function(iframeId, iframeSrc, callback){
            if ( callback == null || callback == 'undefined' ) {
                callback = function(j){}
            }
            var iframe = document.createElement("iframe");
            iframe.src = iframeSrc;
            iframe.id = iframeId;
            iframe.style.display = "none";
            if ( iframe.attachEvent ) {
                iframe.attachEvent("onload", function(){
                    callback(document.getElementById(iframeId).contentWindow);
                });
            } else {
                iframe.onload = function(){
                    callback(document.getElementById(iframeId).contentWindow);
                };
            }
            document.body.appendChild(iframe);
        }
    };
    // 返回处理
    return function(o) {
        var url = o.url;
        /**
         * 条件:a)GET请求 b)数据类型不为json c)外部链接
         */
        if ( isExternal(url) ) {
            document.domain = domain;
            // 操作选择使用代理
            var proxyUrl = getHost(url) + proxyPath;
            createAjaxIframe.appIframe("_iframe" + (new Date()).valueOf() + parseInt(10*Math.random()), proxyUrl, function(iframeWindow){
                return iframeWindow.$.ajax(o);
            });
        } else {
            return _ajax.apply(this, arguments);
        }
    };
})(jQuery.ajax);
