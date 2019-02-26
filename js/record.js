$(document).ready(function() {
    var startX, startY, dir;
    var ajaxStatus = true;
    var loadEle = $('#loading');
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
        console.log(scrollTop,  viewH, scrollHeight)
        if (scrollTop + viewH >= scrollHeight && ajaxStatus){
            console.log('应该加载了...');
            loadData();
        }
    })
    
    function loadData() {
        $.ajax({
            url: 'http://www.baidu.com',
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
            },
            error: function(err) {
                console.log(err);
                loadEle.hide();
                ajaxStatus = true;
            }
        })
    }
})