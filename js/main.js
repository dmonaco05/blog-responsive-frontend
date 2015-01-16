function overlayIt(image, x, y){
    $('body').prepend('<div class="bg_overlay" style="display:none; position:absolute; top:0; bottom:0; left:0; right:0; z-index:9998; background:url('+image+') no-repeat '+x+' '+y+'; opacity:.5; height:5000px"></div><a href="#" class="trigger" style="position:fixed; z-index:9999; display:block; text-indent:-9999px; width:50px; height:20px; background:#000;">Trigger</a>');
    $('a.trigger').click(function(){
        if($('.bg_overlay').hasClass('showing')===true){
            $('.bg_overlay').removeClass('showing').css('display', 'none');
        }else{
            $('.bg_overlay').addClass('showing').css('display', 'block');
        }
        return false;
    });
}


function scrollIt(where){
    $('html,body').animate(
        {scrollTop: where.offset().top},
        500
    );
}


jQuery.timer = function(time, func, callback) {
    var a = { timer: setTimeout(func, time), callback: null };
    if (typeof (callback) === 'function') { a.callback = callback; }
    return a;
};

jQuery.clearTimer = function(a) {
    clearTimeout(a.timer);
    if (typeof (a.callback) === 'function') { a.callback(); }
    return this;
};


$(function(){
    overlayIt('overlays/blog.png','50%','0px');

    $('nav.main').naver({
        maxWidth: "767px"
    });

    if($('#slider').length){
        $(window).load(function() {
            $('#slider').nivoSlider({
                controlNav: false
            });
        });
    }

    var $the_window = $(window),
        $body = $('body'),
        mobile_width_max = 630,
        tablet_width_max = 768,
        phone_func = function(){

        },
        tablet_func = function(){

        },
        desktop_func = function(){

        },
        mquerie_func = function(device){
            $body.removeClass('mobile tablet desktop').addClass(device);
        },
        sizecheck = function(){
            var window_width = $the_window.width();
            if(window_width < mobile_width_max){
                mquerie_func('mobile');
                phone_func();
            }else if(window_width >= mobile_width_max && window_width <= tablet_width_max){
                mquerie_func('tablet');
                tablet_func();
            }else{
                mquerie_func('desktop');
                desktop_func();
            }
        };



    $the_window.resize(function(){
        if(this.resizeTO){ clearTimeout(this.resizeTO);}
        this.resizeTO = setTimeout(function() {
            $(this).trigger('resizeEnd');
        }, 500);
    }).bind('resizeEnd', function() {
        sizecheck();
    }).load(function(){
        sizecheck();
    });

});