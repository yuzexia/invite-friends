$(document).ready(function() {
    var uid = 47491;
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
        url: 'http://xclub.pre.transsion.net/api/mobile/index.php?version=9&module=recommend_user_statistics&uid='+ uid,
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
                invitUrlBox.val('http://www.infinix.com/code=' + code);
                codeCopy.attr('data-clipboard-text', code)
            } else {
                alert('error:::出错了。。。')
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
        console.log('复制成功...');
    })
    codeClipboard.on('error', function() {
        console.log('复制失败...');
    })
    // 复制url
    var urlClipboard = new ClipboardJS('#urlCopy');
    urlClipboard.on('success', function() {
        console.log('复制成功...');
    })
    urlClipboard.on('error', function() {
        console.log('复制失败...');
    })
})