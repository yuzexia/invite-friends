$(document).ready(function() {


    // 获取初始化信息
    $.ajax({
        url: 'http://xclub.pre.transsion.net/api/mobile/index.php?version=9&module=recommend_user_statistics&uid=1',
        type: 'get',
        dataType: 'json',
        success: function(res) {
            console.log(res);
        },
        error: function(err) {
            console.log(err);
        }
    })
})