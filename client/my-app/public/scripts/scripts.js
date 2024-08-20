

(function ($) {

    $(document).ready(function () {

        var mobile = (/iphone|ipod|android|blackberry|mini|windows phone|windowssce|palm/i.test(navigator.userAgent.toLowerCase()));
		

// const lenis = new Lenis()
        
// // lenis.on('scroll', (e) => {
// //   console.log(e)
// // })

// function raf(time) {
//   lenis.raf(time)
//   requestAnimationFrame(raf)
// }

// requestAnimationFrame(raf)


         hslider();
        $(window).resize(hslider);
        function hslider() {
             var windowHeight = $(window).height();
  

        }

        var windowHeight = ($(window).height() / 2) - $("header").height(); 
        $(window).scroll(function () {
			if ($(this).scrollTop() > ($("header").height() + 100)) {
                $('body').addClass("sticky");
            } 
            else { 
                $('body').removeClass("sticky");
            }
            //if ($("body").hasClass("home")) {
                //// if ($(this).scrollTop() > 250 && $(this).scrollTop() < 886) {
                ////     $('body').addClass("white");
                //// } 
                //// else {
                ////     $('body').removeClass("white");
                ////     $('body').removeClass("sticky");
                //// }
                //// if ($(this).scrollTop() > 886) {
                ////     $('body').addClass("sticky");
                //// } 
                //// else { 
                ////     $('body').removeClass("sticky");
                //// }
                //if ($(this).scrollTop() > $("header").height()) {
                    //$('body').addClass("sticky");
                //} 
                //else { 
                    //$('body').removeClass("sticky");
                //}
            //}
            //else if ($(".image-box").length > 0 || $(".hero-box").length > 0) {
                //if ($(this).scrollTop() > ($(window).height() - 100)) {
                    //$('body').addClass("sticky");
                //} 
                //else { 
                    //$('body').removeClass("sticky");
                //}
            //}
            //else{
                //if ($(this).scrollTop() > $("header").height()) {
                    //$('body').addClass("sticky");
                //} 
                //else { 
                    //$('body').removeClass("sticky");
                //}
            //}
            var circleMode = true;
            // if ($(this).scrollTop() > ($(window).height() / 10)) { 
			// 	//alert("1");
            //     circleMode = false;
            //     if(circleMode == false){
            //         $(".cirimg").css("display", "none !important");  
            //     }
            // } 
			if ($(this).scrollTop() > ($(window).height() / 25)) { 
                circleMode = false;
                if(circleMode == false){ 
					$(".our-info-box.nsec").removeClass("hide");
                }
            }
        });

 $(".menu").click(function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $("body").removeClass("open-nav");

            } else {
                $(this).addClass("active");
                $("body").addClass("open-nav");
            }
 });
 

 
 if ($('.intro-img-box > div').length > 0) { 
    $('.intro-img-box > div').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        variableWidth: false,
        infinite: true,
        dots: true,
        animation: 'slide',
        speed: 800,
        centerMode: false,
        centerPadding: '0',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    centerMode: true,
                    focusOnSelect: true,
                    variableWidth: false,
                    speed: 800,
                    dots: true,
                    initialSlide: 1,
                    centerPadding: '0',
                    slidesToScroll: 1
                }
            }
        ]
    }); 
}

if ($('.top-text-box .right > div').length > 0) { 
    $('.top-text-box .right > div').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        variableWidth: false,
        infinite: false,
        dots: true,
        //animation: 'slide',
        fade: true, 
        speed: 800,
        centerMode: false,
        centerPadding: '0'
    }); 
}
 $(".our-projects .h-itmes").click(function () {
       
      $(".our-projects .h-itmes").removeClass("mh");
      $(this).addClass("mh");
             
 });

  $(".jumplink").click(function () {
      
                $(".menu").removeClass("active");
      $("body").removeClass("nav-open");
             
 });
            setTimeout(function(){  
 //if (window.location.hash) scroll(0, 0); 
        if (window.location.hash) { 
        	// smooth scroll to the anchor id
        	$('html, body').animate({
        		scrollTop: $(window.location.hash).offset().top + ($("header").height() - 30)
        	}, 1000, 'swing');
        }
            }, 1500);
 
 $("header nav .nav-inner > ul > li i, header nav .nav-inner > ul > li > a").click(function () {
     if ($(this).parent('.sub-nav').hasClass("active")) {
         $(this).parent('.sub-nav').find('ul').slideDown(500);
         $("header nav .nav-inner > ul > li i, header nav .nav-inner > ul > li > a").parent('.sub-nav').find('ul').slideUp(500);
         $(this).parent('.sub-nav').removeClass("active");
     } else {
         $("header nav .nav-inner > ul > li i, header nav .nav-inner > ul > li > a").removeClass("active");
         $(this).parent('.sub-nav').addClass("active");
         $("header nav .nav-inner > ul > li i, header nav .nav-inner > ul > li > a").parent('.sub-nav').find('ul').slideUp(500);
         $(this).parent('.sub-nav').find('ul').slideDown(500);
     }
 });
        if ($(".list li").length > 0) {
            setTimeout(function(){  
                if($('.list li').length > 0){
                    //$('.list li').hide();
                    var counter = -1;
                    function updateUIState(){
                        $('.list li').removeClass("show").eq(++counter % 26).addClass("show")
                        initTimeout();
                    } 
                    function initTimeout(){
                        setTimeout(updateUIState, 2000)
                    } 
                    initTimeout(); 
                }
            //}, 4000);
            }, 2500);
        }
 if ($('.pg > a > div').length > 0) { 
    $('.pg > a > div').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        variableWidth: false,
        infinite: true,
        dots: true,
        animation: 'slide',
        speed: 800,
        centerMode: false,
        centerPadding: '0',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    centerMode: true,
                    focusOnSelect: true,
                    variableWidth: false,
                    speed: 800,
                    dots: true,
                    initialSlide: 1,
                    centerPadding: '0',
                    slidesToScroll: 1
                }
            }
        ]
    }); 
}

//$(window).bind("load", function () {
    $.fn.visible = function (partial) {
        var $t = $(this),
            $w = $(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
    };

    var win = $(window);
    var fxup = $(".fxup");
    var fxdown = $(".fxdown");
    var fxleft = $(".fxleft");
    var fxright = $(".fxright");
    var fxfade = $(".fxfade");
    var fximg = $(".fximg");
    var fxzoom = $(".fxzoom");
    var fxanimate = $(".fxanimate");
    fxup.each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
            el.addClass("upvisible");
        }
    });
    fxdown.each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
            el.addClass("downvisible");
        }
    });
    fxleft.each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
            el.addClass("leftvisible");
        }
    });
    fxright.each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
            el.addClass("rightvisible");
        }
    });
    fxfade.each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
            el.addClass("fadevisible");
        }
    });
    fximg.each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
            el.addClass("imgvisible");
        }
    });
    fxzoom.each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
            el.addClass("fxzoomvisible");
        }
    });
    fxanimate.each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
            el.addClass("fxanimatevisible");
        }
    });
    win.scroll(function (event) {
        fxup.each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("fxup-in");
            }
        });
        fxdown.each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("fxdown-in");
            }
        });
        fxleft.each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("fxleft-in");
            }
        });
        fxright.each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("fxright-in");
            }
        });
        fxfade.each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("fxfade-in");
            }
        });
        fximg.each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("fximg-in");
            }
        });
        fxzoom.each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("fxzoom-in");
            }
        });
        fxanimate.each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("fxanimate-in");
            }
        });
    });
    // setTimeout(function(){  
    //     $("body").removeClass('animation');
    // }, 2000);
//});

//function overrideShareSendMail() {
    // $('div[data-network="email"]').replaceWith($('div[data-network="email"]').clone());
    // $('div[data-network="email"]').on("click", function () {
    //     var emailSubject = "Pyramide";
    //     var emailBody = window.location.href;
    //     window.location.href = "mailto:?subject=" + emailSubject + "&body=" + emailBody;
    // });
//}

    //const buttons = document.querySelector('.email')
    //buttons.setAttribute('data-url', `http://${recent.photo.url}`)
    //buttons.setAttribute('data-title', `Check out this picture by ${uploaded_by}`)
// $(window).on('scroll', function () {
//     $('[data-parallax="parallax"]').each(function () {
//         var $bgobj = $(this);
//         var yPos = ($(window).scrollTop() / $bgobj.data('speed'));
//         var coords = (yPos*5) + 'px';
//         //$bgobj.css({ backgroundPosition: 'center ' + coords });
//         $bgobj.css({ 'margin-top': coords });
//     });
 
// });

var headerHeight = $("header").height();

        // //if (window.location.hash) scroll(0, 0); 
        // if (window.location.hash) { 
        // 	// smooth scroll to the anchor id
        // 	$('body').animate({
        // 		scrollTop: $(window.location.hash).offset().top + '400px'
        // 	}, 500, 'swing');
        // }

        $(document).on("scroll", onScroll);
        //smoothscroll
        $('a.scroll').on('click', function (e) {
            $(document).off("scroll");
            $('a.scroll').each(function () {
                $(this).removeClass('active');
            })
            $(this).addClass('active');
            var target = this.hash, menu = target; $target = $(target);
            $('html, body').animate({ scrollTop: ($target.offset().top + (headerHeight - 30)) }, 500, 'swing', function () {
                //window.location.hash = target;
                $(document).on("scroll", onScroll);
            });
            // if (!$("body").hasClass("home") || $(window).width() < 767) {
            //     $('html, body').animate({ scrollTop: ($target.offset().top - headerHeight) }, 500, 'swing', function () {
            //         //window.location.hash = target;
            //         $(document).on("scroll", onScroll);
            //     });
            // }
            e.preventDefault();
        });

    });
     
})(jQuery); 

function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('a.scroll').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('a.scroll').removeClass("active");
            currLink.addClass("active");
        }
        else {
            currLink.removeClass("active");
        }
    });
} 


// inViewport jQuery plugin
// https://stackoverflow.com/a/26831113/383904
$(function ($, win) {
    $.fn.inViewport = function (cb) {
        return this.each(function (i, el) {
            function visPx() {
                var H = $(this).height() - Number(500),
                    r = el.getBoundingClientRect(), t = r.top, b = r.bottom;
                return cb.call(el, Math.max(0, t > 0 ? H - t : (b < H ? b : H)));
            }
            visPx();
            $(win).on("resize scroll", visPx);
        });
    };
}(jQuery, window));


jQuery(function ($) { // DOM ready and $ in scope

    $(".onview").inViewport(function (px) { // Make use of the `px` argument!!!
        // if element entered V.port ( px>0 ) and
        // if prop initNumAnim flag is not yet set
        //  = Animate numbers
        if (px > 0 && !this.initNumAnim) {
            //this.initNumAnim = true; // Set flag to true to prevent re-running the same animation
            //alert("1");
            $(this).addClass("animate");
            //$(this).addClass("animate");
            //alert("1");
            //$(this).prop('Counter', 0).animate({
            //    Counter: $(this).text()
            //}, {
            //    duration: 1000,
            //    step: function (now) {

            //        $(this).text(Math.ceil(now));

            //        //var formatted = now.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.');
            //        //$(tween.elem).text('$' + formatted);
            //    }
            //});
        }
    });
});