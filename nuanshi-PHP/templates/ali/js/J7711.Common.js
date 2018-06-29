if (!window.J7711) {
    window.J7711 = {};
};
window.debug = true;

J7711.Common = {
    init: function()
    {
        J7711.Common.enableSBoxSelect();
        J7711.Common.enableAutoShowNotice();
        J7711.Common.enableAddFavorite();
        J7711.Common.enableAddPageHome();
        J7711.Common.enableTopUserMenuToggle();
        J7711.Common.enableFriendLinkScroll();
        J7711.Common.enableBossKey();
        J7711.Common.enableAjaxLogin();
        J7711.Common.enableGinfoAccordion();
        //J7711.Common.enableGuidLeftScroll();
        J7711.Common.enableBwdhClose();
        J7711.Common.enableGoTop();
        J7711.Common.enableGetFloatPlayed();
        J7711.Common.enableGetFloatRightBottom();
    },
    enableSBoxSelect: function()
    {
        var $this = $('.sBox');
        if ($this.length) {
            $this.hover(
                function(){
                    $(this).addClass('sBoxHover');
                },
                function(){
                    $(this).removeClass('sBoxHover');
                }
            ).click(function(){
                $(this).children('.cB').show();
                return false;
            }).delegate('.cI a', 'click', function(e){
                var $this2 = $(e.liveFired);
                var id    = $this2.attr('data-id');
                var name  = $this2.attr('data-name');
                var value = $(this).attr('rel');
                var txt   = $(this).text();
                var $val  = $this2.find('input[name='+name+']');
                var defval= $val.val();
                if ($val.length) {
                    $val.val(value);
                } else if (name) {
                    if (id) {
                        $this2.append('<input type="hidden" value="'+value+'" id="'+id+'" name="'+name+'" />');
                    } else {
                        $this2.append('<input type="hidden" value="'+value+'" name="'+name+'" />');
                    }
                }
                $this2.find('.cV').attr('rel', value).text(txt);
                $this2.find('.cI a').removeClass('selected');
                $(this).addClass('selected');
                $this2.find('.cB').hide();
                if (value != defval) {
                    $this2.trigger('change', value);
                }
                return false;
            }).bind('replaceAllOption', function(e, dataArr){
                var def_value  = $(this).attr('data-value');
                var selectedVal = (typeof(def_value) == 'undefined') ? '' : def_value;
                if (dataArr) {
                    var htmlTpl = [];
                    var htmlTplVal = '';
                    var firstVal = '';
                    htmlTpl.push('<ul class="cB">');
                    for (var i in dataArr) {
                        if (firstVal == '') firstVal = [i,dataArr[i]];
                        if (i == selectedVal) {
                            htmlTpl.push('<li class="cI"><a class="selected" rel="' + i + '" href="javascript:;">' + dataArr[i] + '</a></li>');
                            htmlTplVal = [i,dataArr[i]];
                        } else {
                            htmlTpl.push('<li class="cI"><a rel="' + i + '" href="javascript:;">' + dataArr[i] + '</a></li>');
                        }
                    }
                    htmlTpl.push('</ul>');
                    if (htmlTplVal == '') {
                        htmlTplVal = firstVal;
                    }
                    $(this).html('<a href="javascript:;" class="cV" rel="'+htmlTplVal[0]+'">'+htmlTplVal[1]+'</a>'+htmlTpl.join(''));
                    var name  = $(this).attr('data-name');
                    if (name) {
                        var id  = $(this).attr('data-id');
                        if (id) {
                            $(this).append('<input type="hidden" value="'+htmlTplVal[0]+'" id="'+id+'" name="'+name+'" />');
                        } else {
                            $(this).append('<input type="hidden" value="'+htmlTplVal[0]+'" name="'+name+'" />');
                        }
                    }

                    return false;
                }
            }).bind('selectOption', function(e, val){
                $(this).find('.cI a[rel="'+val+'"]').trigger('click');
                return false;
            });
            // 设置选项初始值
            $this.each(function(){
                var name  = $(this).attr('data-name');
                var value = $(this).attr('data-value');
                if (typeof(value) != 'undefined') {
                    var $item = $(this).find('.cB a[rel='+value+']');
                    if ($item.length) {
                        $item.trigger('click');
                    } else {
                        $(this).find('.cB a:eq(0)').trigger('click');
                    }
                }
            });
            $(document).click(function(e){
                $this.find('.cB').hide();
            });
        }
    },
    enableAutoShowNotice: function()
    {
        if (window.autoShowNotice && window.notice) Notice.showNotice(window.notice, false);
    },
    enableAddFavorite: function()
    {
        var $this = $('.addFavorite');
        if ($this.length) {
            $this.click(function(){
                var urlStr = $this.attr('data-url');
                if (!(urlStr && urlStr.length>0)) {
                    urlStr = window.location + '';
                }
                var titleStr = $this.attr('data-title');
                if (!(titleStr && titleStr.length>0)) {
                    titleStr = document.title;
                }
                if (document.all) {
                    window.external.addFavorite(urlStr, titleStr);
                } else if (window.sidebar) {
                    window.sidebar.addPanel(titleStr, urlStr, '');
                }
            });
        }
    },
    enableAddPageHome: function()
    {
        var $this = $('.addPageHome');
        if ($this.length) {
            $this.click(function(){
                if(document.all){
                    var urlStr = $this.attr('data-url');
                    if (!(urlStr && urlStr.length>0)) {
                        urlStr = window.location + '';
                    }
                    $this[0].style.behavior='url(#default#homepage)';
                    $this[0].setHomePage(urlStr);
                }
            });
        }
    },
    enableTopUserMenuToggle: function()
    {
        var $this = $("#mostrar");
        if ($this.length) {
            $this.click(function() {
                if ($(this).hasClass('off')) {
                    $(this).removeClass('off').addClass('on');
                } else {
                    $(this).removeClass('on').addClass('off');
                }

                $(".ucSec").slideToggle(500);
                return false;
            });
            $(document).bind('click', function(){
                $("#mostrar").removeClass('on').addClass('off');
                $('.ucSec').hide();
            });
        }
    },
    enableFriendLinkScroll: function()
    {
        var $this = $('#friend_scroll');
        if ($this.length) {
            var divvotescroll = document.getElementById('friend_scroll');
            var divvote_seed = 5000;
            var divvote_step = 10
            var divvote_MyMar = null;
            var divvote_list = divvotescroll.getElementsByTagName('a');
                function divvote_moveLeft()
                {
                    if (divvotescroll.scrollTop <= divvote_list[0].offsetHeight) {
                        if (divvote_MyMar) clearInterval(divvote_MyMar);
                        divvotescroll.scrollTop += divvote_step;
                        setTimeout(divvote_moveLeft,25);
                    } else {
                        divvotescroll.scrollTop = 0;
                        divvote_MyMar = setInterval(divvote_moveLeft, divvote_seed);
                    }
                }
            ivvote_MyMar = setInterval(divvote_moveLeft, divvote_seed);
        }
    },
    enableBossKey: function()
    {
        var title = decodeURI(getCookie("UserTitle"))
        if (title) {
            window.document.title = title;
        }
    },
    enableAjaxLogin: function()
    {
        var $this = $('.ajax_login');
        if ($this.length && !$('#page_login').length) {
            $this.click(function(){
                var $popLogin = $('#popLogin');
                if (!$popLogin.length) {
                    WEBSERVER = window.WEBSERVER;
                    var urlStr = '/websiteAjax/op/login/';
                    if (WEBSERVER) urlStr = WEBSERVER + urlStr;
                    $.ajax({
                        type: 'GET',
                        url: urlStr,
                        dataType: 'json',
                        cache: false,
                        success: function(data) {
                            if (data.status == 2) {
                                // 已登陆
                                window.location = window.location + '';
                            } else if (data.status == 0) {
                                $('body').append(data.msg);
                            }
                        }
                    });
                } else {
                    $popLogin.show();
                    $('#popLogin').css('top', $(window).scrollTop() + $(window).height()*0.3);
                    $('#alpha').css('height', $(document).height()+'px').show();
                }
                return false;
            });
        }
    },
    enableGinfoAccordion: function()
    {
        var $this = $("#gInfo");
        if ($this.length) {
            $this.accordion({triggerCls:'tabs',panelCls:'tabcon'});
        }
    },
    enableGuidLeftScroll: function()
    {
        var $this = $("#guide_left");
        if ($this.length) {
            $this.scrollFollow( {
                speed: 500,
                offset: 0,
                container: "container"
            });
        }
    },
    enableBwdhClose: function()
    {
        var $this = $('#bwdh-close a');
        if ($this.length) {
            $this.click(function(){
                $('#bwdh').hide();
                return false;
            });
        }
    },
    enableGoTop: function()
    {
        var win_width  = (function(){return $(window).width();})();
        var win_height = $(window).height();
        var doc_width  = $(document).width();
        var doc_height = $(document).height();
        if (!$('#noGoTop').length && win_width >= 1120) {
            var getPos = function(){
                var top = $(document).scrollTop() + (win_height-40)/2;
                var right = (win_width - 1000)/2 - 40 - 20;
                return {top:top,right:right};
            };
            var pos = getPos();
            var toTopTpl = $('<div id="goTop" style="display:none;width:40px;height:40px;position:absolute; right:'+pos.right+'px'+'; top:'+pos.top+'px'+'; z-index:100;"><a href="javascript:;" id="gtr" style="display:block;background:url(/style/img/fhoff.png) no-repeat left top;width:40px;height:40px;outline:none;" onfocus="this.blur()"></a></div>');
            toTopTpl.find('#gtr').hover(
                function(){
                    $(this).css('backgroundImage',"url(/style/img/fh.png");
                    return false;
                },
                function(){
                    $(this).css('backgroundImage',"url(/style/img/fhoff.png");
                    return false;
                }
            ).click(function(){
                $(document).scrollTop(0);
                return false;
            });
            $('body').append(toTopTpl);
            $(window).scroll(function(){
                var pos = getPos();
                var $goTop = $('#goTop');
                // 过一屏开始显示
                if ($(document).scrollTop() < win_height ) {
                    $goTop.css('display', 'none');
                } else{
                    $('#goTop').stop();
                    $goTop.css('display', 'block');
                    $('#goTop').animate({top:pos.top}, 200);
                }
            });
        }
    },
    enableGetFloatPlayed: function()
    {
        var $this = $('.topbar .aLogin');
        var noFloatPlayed = $('#noFloatPlayed').length;
        var WEBSERVER = window.WEBSERVER;
        if ($this.length && !noFloatPlayed && WEBSERVER == 'http://'+location.host) {
            $.ajax({
                type: 'GET',
                url: WEBSERVER + '/websiteAjax/op/getFloatPlayed/',
                dataType: 'json',
                success: function(data) {
                    if (data.status) {
                        $('body').append(data.msg);
                    }
                    return false;
                }
            });
        }
    },
    enableGetFloatRightBottom: function()
    {
        var WEBSERVER = window.WEBSERVER;
        if (WEBSERVER == 'http://'+location.host) {
            $.ajax({
                type: 'GET',
                url: WEBSERVER + '/websiteAjax/op/getFloatRightBottom/',
                dataType: 'json',
                success: function(data) {
                    if (data.status) {
                        $('body').append(data.msg);
                    }
                    return false;
                }
            });
        }
    }
};

function setCookie(name, value, time)
{
    var nameString = name + '=' + escape(value);
    var expiryString = "";
    if(time !== 0) {
        var expdate = new Date();
        if(time == null || isNaN(time)) time = 60*60*1000;
        expdate.setTime(expdate.getTime() +  time);
        expiryString = ' ;expires = '+ expdate.toGMTString();
    }
    var path = " ;path =/";
    document.cookie = nameString + expiryString + path;
}

function getCookie(sName)
{
    var aCookie = document.cookie.split('; ');
    for (var i=0; i < aCookie.length; i++) {
        var aCrumb = aCookie[i].split('=');
        if (sName == aCrumb[0])
            return unescape(aCrumb[1]);
    }
    return '';
}

function copyToClipboard(txt)
{
    if (!txt) return false;
    if (window.clipboardData) {
        window.clipboardData.clearData();
        window.clipboardData.setData("Text",txt);
        alert("复制成功！");
    } else if(navigator.userAgent.indexOf("Opera")!= -1) {
        window.location = txt;
    } else if (window.netscape) {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        } catch (e) {
            alert("您的firefox安全限制限制您进行剪贴板操作，请打开'about:config'将signed.applets.codebase_principal_support'设置为true'之后重试");
            return false;
        }
        var clip = Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);
        if (!clip) return false;
        var trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
        if (!trans) return false;
        trans.addDataFlavor('text/unicode');
        var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext = txt;
        str.data = copytext;
        trans.setTransferData("text/unicode",str,copytext.length*2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip) return false;
        clip.setData(trans,null,clipid.kGlobalClipboard);
    }
}

stat = {
    sURL: "http://log.game2.cn/stat.htm",
    visit: function($, A) {
        var _ = new Image();
        _.src = this.sURL + "?app=" + $ + "&from=" + (A || 0) + "&pid=5&r=" + Math.random();
        _.onload = function() {
            return
        }
    }
};


/*登陆验证*/
(function($){
    $.fn.extend({
        doLogin: function(options, callback){
            var that = this;
            var defaults = {
                loginUrl: window.WEBSERVER ? window.WEBSERVER+'/websiteAjax/op/login/' : '/websiteAjax/op/login/',
                submitBtn: 'input[type=submit]',
                isAjax: true,
                init: function() {
                    var femail = true;
                    var fpwd   = true;
                    // 用户名
                    $(this).find('input[name=code]').focus(function(){
                        if (femail) {
                            $(this).css('color', '#111111').val('');
                            femail = false;
                        }
                    }).change(function(){
                        $(this).val($(this).val().replace(/^\s*|\s*$/g, ''));
                    });
                    // 密码
                    $(this).find('input[name=password]').focus(function(){
                        if (fpwd) {
                            $(this).css('color', '#111111').val('');
                            fpwd = false;
                        }
                    });
                    // 登陆过的用户名
                    var keepcode= getCookie("keepcode");
                    if (keepcode) {
                        $(this).find('input[name=code]').css('color', '#111111').val(decodeURIComponent(escape(keepcode)));
                        $(this).find('input[name=password]').css('color', '#111111').val('');
                        femail = false;
                        fpwd = false;
                    }
                },
                beforeSubmit: function() {
                    var code = $(this).find('input[name=code]').val();
                    if (/^[a-z_][a-z_0-9]*$/i.test(code)) {
                        if (code.length > 20 || code.length <3) {
                            alert("您输入的账号有误！");
                            return false;
                        }
                    } else if(!(/^1(3|5|8)\d{9}$/.test(code))) {
                        alert("您输入的账号有误！");
                        return false;
                    }
                    var pwd = $(this).find('input[name=password]').val();
                    if (pwd.length < 6) {
                        alert("您输入的密码不正确！");
                        return false;
                    }
                    if (typeof(hex_md5) == 'function') {
                        pwd = hex_md5(pwd);
                    }
                    var $keeplive = $(this).find('.input[name=keeplive]');
                    var keeplive = $keeplive.attr('checked');
                    var dataStr = 'code='+code+'&password='+pwd;
                    if (keeplive) {
                        dataStr += '&keeplive='+ $keeplive.val();
                    }

                    return dataStr;
                },
                callback: function(data) {
                    if (data.status > 0) {
                        window.location = window.location + '';
                    } else if (data.status < 0) {
                        alert(data.msg);
                    }
                }
            };
            options = options || {};
            if (typeof(options) == 'function') options = {callback:options};
            options = $.extend(defaults, options);

            // 初始化
            options.init.call(that);
            $(that).find(options.submitBtn).click(function(){
                var dataStr = options.beforeSubmit.call(that);
                if (dataStr === false) return false;
                if (options.isAjax) {
                    $.ajax({
                        type: 'POST',
                        url: options.loginUrl,
                        data: dataStr,
                        dataType: 'json',
                        success: function(data) {
                            return options.callback.call(that, data);
                        }
                    });
                    return false;
                }
            });
        }
    });
})(jQuery);
