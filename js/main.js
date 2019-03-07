$(document).ready(function() {
    var uid = Transsion.getUserId();
    // var uid = 47491;
    var host = Transsion.getBaseUrl();
    // var host = 'http://xclub.pre.transsion.net/';
    var shareHost = Transsion.getBaseShareUrl();
    // 统计数据元素
    var numberBox = $('.text i');
    // code元素
    var codeBox = $('.num');
    var codeInputBox = $('#inviteCode');
    // 邀请链接元素
    var invitUrlBox = $('#inviteUrl');
    var codeCopy = $('#codeCopy');
    var urlCopy = $('#urlCopy');
    // 获取初始化信息
    $.ajax({
        url: host + 'api/mobile/index.php?version=9&module=recommend_user_statistics&uid='+ uid,
        type: 'get',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            if (Number(res.code) === 0) {
                var data = res.data
                var code = data.invitation_code
                var _arr = [data.month_xgolds, data.all_xgolds, data.month_count, data.all_count]
                $.each(numberBox, function(index, item) {
                    $(item).text(_arr[index])
                })
                $.each(codeBox, function(index, item) {
                    $(item).text(code[index])
                })
                codeInputBox.val(code);
                // http://xclub.stg.transsion.net?showregister=yes&code=MAFkEC
                invitUrlBox.val(shareHost + '?showregister=yes&code=' + code);
                codeCopy.attr('data-clipboard-text', code)
            } else {
                Transsion.showToast('error')
            }
        },
        error: function(err) {
            console.log(err);
        }
    })

    // 复制操作
    // 复制code
    var codeClipboard = new ClipboardJS('#codeCopy');
    codeClipboard.on('success', function() {
        Transsion.showToast('succeed');
    })
    codeClipboard.on('error', function() {
        Transsion.showToast('succeed');
    })
    // 复制url
    var urlClipboard = new ClipboardJS('#urlCopy');
    urlClipboard.on('success', function() {
        Transsion.showToast('succeed');
    })
    urlClipboard.on('error', function() {
        Transsion.showToast('error');
    })

    // 分享
    $('.invite').on('click', function() {
        // console.log(invitUrlBox.val());
        Transsion.showAdvertShare('Invitation get XGold', invitUrlBox.val());
    })
})