$(document).ready(function() {
    var startX, startY, dir, maxPage;
    var ajaxStatus = true;
    var loadEle = $('#loading');
    var noMoreEle = $('.no-more')
    var boxEle = $('#recordBox')
    var page = 1;
    var limit = 20;
    var uid = 47491;
    var recordData = [];
    loadData(page);
    document.addEventListener('touchstart', function(e) {
        var touch = e.touches[0]
        startX = touch.pageX;
        startY = touch.pageY;
    }, false)
    document.addEventListener('touchmove', function(e) {
        dir = 0;
    }, false)
    document.addEventListener('touchend', function(e) {
        var touch = e.changedTouches[0]
        var endX = touch.pageX;
        var endY = touch.pageY
        dir = getSlideDirection(startX, startY, endX, endY);
    }, false)
    function getSlideDirection(startX, startY, endX, endY) {
        var offsetX = endX - startX;
        var offsetY = endY - startY;
        var direction = 0;
        if (offsetY > 0) {
            // 向下滑动
            direction = 1;
            console.log('向上滚动');
        } else {
            // 向上滑动
            direction = -1;
            console.log('向下滚动');
        }
        return direction;
    }
    $(window).scroll(function() {
        var $this = $(this);
        var scrollTop = $this.scrollTop();
        var viewH = $this.innerHeight();
        var scrollHeight = $(document).height();
        // console.log(scrollTop,  viewH, scrollHeight)
        if (scrollTop + viewH >= scrollHeight && ajaxStatus){
            console.log('应该加载了...');
            if (++page <= maxPage) {
                loadData(page);
            } else {
                maxPage > 1 ? hideMore(noMoreEle, boxEle, 'padding-bottom') : '';
            }
        }
    })
    
    // 获取邀请记录
    function loadData(page) {
        $.ajax({
            url: 'http://xclub.pre.transsion.net/api/mobile/index.php?version=9&module=recommend_user_list&limit='+ limit +'&uid='+ uid +'&page='+ page,
            type: 'get',
            dataType: 'json',
            beforeSend: function() {
                loadEle.show();
                ajaxStatus = false;
            },
            success: function(res) {
                console.log(res);
                loadEle.hide();
                ajaxStatus = true;
                if (Number(res.code) === 0) {
                    var _data = res.data
                    maxPage = Math.ceil(_data.count / 20)
                    if (_data.list.length) {
                        recordData =  _data.list
                        createHtml(recordData);
                    }
                } else {
                    alert('error:出错了。。。')
                }
            },
            error: function(err) {
                console.log(err);
                loadEle.hide();
                ajaxStatus = true;
            }
        })
    }

    // 隐藏更多
    function hideMore(ele, box, classname) {
        $(ele).show();
        $(box).addClass(classname);
        setTimeout(function(){
            ele.hide();
            box.removeClass(classname);
        }, 2000);
    }

    // 生成html
    function createHtml(data) {
        var contentBox = $('#recordContent')
        var _html = ''
        $.each(data, function(index, item) {
            _html += '<div class="record-row">' +
                        '<span>'+ item.username +'</span>' +
                        '<span>'+ format(item.create_time) +'</span>' +
                        '<span>'+ item.xgolds +' XGold</span>' +
                    '</div>'
        })
        $(_html).appendTo(contentBox);
    }

    // 格式化时间
    function format(date) {
        var d = new Date(date * 1000) || new Date();
        var fullYear = d.getFullYear();
        var month = d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : '0' + Number(d.getMonth() + 1);
        var date = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate();
        var hours = d.getHours() >= 10 ? d.getHours() : '0' + d.getHours();
        var minutes = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes();
        var seconds = d.getSeconds() >= 10 ? d.getSeconds() : '0' + d.getSeconds();
        return fullYear + '-' + month + '-' + date;
    }
})