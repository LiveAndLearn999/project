if (!window.J7711) {
    window.J7711 = {};
};
window.debug = true;

J7711.Member = {
    init: function()
    {
        J7711.Member.enableUserPhotoHover();
        J7711.Member.enableBaseInfoSwitch();
        //J7711.Member.enableSBoxSelect();
        J7711.Member.enableProfileSubmit();
        J7711.Member.enableSecquesSBoxChange();
        J7711.Member.enableSecquesSubmit();
    },
    enableUserPhotoHover: function()
    {
        var $this = $('#page_member .photo');
        if ($this.length) {
            $this.hover(
                function(){$(this).find("div").slideDown("fast");},
                function(){$(this).find("div").slideUp("fast");}
            );
        }
    },
    enableBaseInfoSwitch: function()
    {
        var $this = $('.baseInfoNav');
        if ($this.length) {
            $this.delegate('a', 'click', function(){
                var cindex = $this.children('a').index(this);
                $this.find('a').eq(cindex).addClass('current').siblings('a').removeClass('current');
                $('.baseInfoCon').eq(cindex).show().siblings('.baseInfoCon').hide();
                return false;
            });
        }
    },
    enableSBoxSelect: function()
    {
        var $this = $('.sBox');
        if ($this.length) {
            $this.change(function(e, data){
                var toId = $(this).attr('toId');
                if (typeof(toId) != 'undefined' && toId != '') {
                    $toId = $('#'+toId);
                    var htmlTpl = '<a href="javascript:;" class="cV"></a>';
                    htmlTpl += '<ul class="cB">';
                    if ($toId.hasClass('maingameserver')) {
                        htmlTpl += '<li class="cI"><a class="selected" rel="" href="javascript:;">选择游戏服</a></li>';
                        for (var i in gameServerList_json[data]) {
                            htmlTpl += '<li class="cI"><a rel="'+i+'" href="javascript:;">'+gameServerList_json[data][i]+'</a></li>';
                        }
                    } else {
                        htmlTpl += '<li class="cI"><a class="selected" rel="" href="javascript:;">选择城市</a></li>';
                        for (var i in city.city[data]) {
                            htmlTpl += '<li class="cI"><a rel="'+i+'" href="javascript:;">'+city.city[data][i]+'</a></li>';
                        }
                    }
                    htmlTpl += '</ul>';
                    // 选择第一个默认选项
                    $toId.html(htmlTpl).find('.cB a:eq(0)').trigger('click');
                }
            });
            $this.each(function(){
                var name  = $(this).attr('data-name');
                var value = $(this).attr('data-value');
                // 初始化省份选项
                if ($(this).hasClass('provinces')) {
                    var provincesTpl = '<a href="javascript:;" class="cV"></a>';
                    provincesTpl += '<ul class="cB">';
                    provincesTpl += '<li class="cI"><a class="selected" rel="" href="javascript:;">选择省份</a></li>';
                    for (var i in city.provinces) {
                        provincesTpl += '<li class="cI"><a rel="' + i + '" href="javascript:;">' + city.provinces[i] + '</a></li>';
                    }
                    provincesTpl += '</ul>';
                    $(this).html(provincesTpl);
                } else if ($(this).hasClass('maingameserver')) {
                    // 初始化游戏列表
                    var maingame = $(this).attr('data-pid');
                    var $maingame = $('#'+maingame);
                    var maingameTpl = '<a href="javascript:;" class="cV"></a>';
                    maingameTpl += '<ul class="cB">';
                    maingameTpl += '<li class="cI"><a class="selected" rel="" href="javascript:;">选择游戏</a></li>';
                    for (var i in gameList_json) {
                        maingameTpl += '<li class="cI"><a rel="' + i + '" href="javascript:;">' + gameList_json[i] + '</a></li>';
                    }
                    maingameTpl += '</ul>';
                    $maingame.html(maingameTpl);
                }
                // 设置选项初始值
                if (typeof(value) != 'undefined') {
                    if ($(this).hasClass('maingameserver')) {
                        // 根据服务器选择游戏
                        var maingame = $(this).attr('data-pid');
                        var $maingame = $('#'+maingame);
                        var flag_game = false;
                        for (var i in gameServerList_json) {
                            for (var j in gameServerList_json[i]) {
                                if (j == value) {
                                    $maingame.find('.cB a[rel='+i+']').trigger('click');
                                    flag_game = true;
                                    break;
                                }
                            }
                        }
                        // 未找到游戏
                        if (!flag_game) {
                            $maingame.find('.cB a:eq(0)').trigger('click');
                        }
                    }
                }
            });
        }
    },
    enableProfileSubmit: function()
    {
        var $this = $('#page_profile .baseInfo');
        if ($this.length) {
            $this.find('button[type=submit]').click(function(){
                var idcard = $('#idcard').val();
                if (idcard && !IsIdCard(idcard)) {
                    alert("您输入的身份证号码有误，请重新输入");
                    return false;
                }
            });
        }
        $this = $('#page_profile .contactWay');
        if ($this.length) {
            $this.find('button[type=submit]').click(function(){
                var tel = $('#tel').val();
                if (tel && !(/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/.test(tel))) {
                    Notice.showNotice("请输入正确的固定电话", false);
                    return false;
                }
                var qq = $("#qq").val();
                if (qq && !(/^[1-9]\d{4,10}$/.test(qq))) {
                    Notice.showNotice("请输入正确的QQ号码", false);
                    return false;
                }
                var addr = $("#addr").val();
                if (addr && addr.replace(/[^\x00-\xff]/g,'**').length > 120) {
                    Notice.showNotice("地址请控制在120个字符以内", false);
                    return false;
                }
                var postcode = $("#postcode").val();
                if (postcode && !(/^[1-9]\d{5}$/.test(postcode))) {
                    Notice.showNotice("请输入正确的邮政编码", false);
                    return false;
                }
            });
            $this.find('.reset').click(function(){
                $this.find('.doReset').trigger('click');
                return false;
            });
        }
    },
    enableSecquesSBoxChange: function()
    {
        var $this = $('#page_secques .sBox');
        if ($this.length) {
            $this.change(function(e, data){
                var $otherItem = $('#page_secques .sBox').not(this);
                if ($otherItem.length) {
                    var htmlTpl = '<li class="cI"><a rel="" href="javascript:;">==请选择密保问题==</a></li>';
                    for (var i in question_json) {
                        if (i != data) {
                            htmlTpl += '<li class="cI"><a rel="' + i + '" href="javascript:;">' + question_json[i] + '</a></li>';
                        }
                    }
                    $otherItem.find('.cB').html(htmlTpl);
                }
            });
        }
    },
    enableSecquesSubmit: function()
    {
        var $this = $('#page_secques #submit');
        if ($this.length) {
            var thress= ["一","二","三"];
            $this.click(function(){
                for (var i=1; i<=2; i++) {
                    var question = $('input[name=question'+i+']').val();
                    if (!question) {
                        Notice.showNotice("请选择密保问题"+thress[i-1], false);
                        return false;
                    }
                    var answer = $('#answer'+i).val();
                    if (answer.replace(/[^\x00-\xff]/g,'**').length < 3 || answer.replace(/[^\x00-\xff]/g,'**').length > 38) {
                        Notice.showNotice("问题"+thress[i-1]+"的答案必须在3-38位之间", false);
                        return false;
                    }
                }
            });
        }
    }
};
