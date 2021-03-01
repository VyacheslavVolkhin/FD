$(document).ready(function(){

	//phone masked
	$('input[type="tel"]').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
	$('input[type="tel"]').on('click', function() {
		$(this).setCursorPosition(4);
	})
	$.fn.setCursorPosition = function(pos) {
	  this.each(function(index, elem) {
	    if (elem.setSelectionRange) {
	      elem.setSelectionRange(pos, pos);
	    } else if (elem.createTextRange) {
	      var range = elem.createTextRange();
	      range.collapse(true);
	      range.moveEnd('character', pos);
	      range.moveStart('character', pos);
	      range.select();
	    }
	  });
	  return this;
	};


	//img to bg
    $('.js-bg-box').each(function() {
        var picUrl = $(this).find('.js-bg-photo').attr('src');
        $(this).css('background-image', 'url('+picUrl+')');
        $(this).find('.js-bg-photo').hide();
    })


	//main menu
    $('.js-menu-toggle').on('click', function() {
        $('body').toggleClass('nav-show');
        $('.js-menu-toggle').toggleClass('active');
        return false;
    })
    $('.nav').hover(function() {
        $(this).addClass('active');
    }, function() {
        $(this).removeClass('active');
        $(this).removeClass('submenu-active');
        $(this).find('.submenu-wrap').removeClass('active');
        $(this).find('li.open').removeClass('open');
        $('.nav li:not(.open) .menu-item').css('background', 'transparent');
    })
    $('.nav .btn-action-ico.ico-back').on('click', function() {
        $('.nav').removeClass('active');
        $('.nav').removeClass('submenu-active');
        $('.nav').find('.submenu-wrap').removeClass('active');
        $('.nav').find('li.open').removeClass('open');
        $('.nav li:not(.open) .menu-item').css('background', 'transparent');
        return false;
    })
    $('.main-menu-wrap .menu-item').on('click', function() {
        let curMenu = $(this).parent().attr('data-submenu');
        $('.nav li.open').removeClass('open');
        $(this).parent().addClass('open');
        $('.nav').addClass('submenu-active').find('.submenu-wrap').removeClass('active');
        $('.nav .submenu-wrap[data-submenu="'+curMenu+'"]').addClass('active');
        $('.nav li:not(.open) .menu-item').css('background', 'transparent');
        return false;
    })
    $('.main-menu-wrap [data-bg]').each(function() {
        let bgColor = $(this).attr('data-bg');
        let bgPrevColor = 0;
        let hoverMenu = $(this).attr('data-submenu');
        $('.nav .submenu-wrap[data-submenu="'+hoverMenu+'"]').css('background', bgColor);
        $(this).hover(function() {
            bgPrevColor = $('.nav li.open').attr('data-bg');
            $(this).find('.menu-item').css('background', bgColor);
            $('.submenu-outer-wrap').css('background', bgPrevColor);
            console.log(bgPrevColor)
        }, function() {
            if ($(this).hasClass('open')) {
                $(this).find('.menu-item').css('background', bgColor);
            } else {
                $('.nav li:not(.open) .menu-item').css('background', 'transparent');
            }
        })
    })


    //btn tgl
    $('.js-btn-tgl').on('click', function () {
        $(this).toggleClass('active');
        return false;
    })

	//popup block
	$('.js-popup-wrap .js-btn-toggle').on('click touchstart', function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('body').removeClass('menu-show');
		} else {
			$('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
			$(this).addClass('active');
			if ($(this).parent().hasClass('main-menu-wrap')) {
				$('body').addClass('menu-show');
			}
		}
		return false;
	})
	$('.js-popup-wrap .js-btn-close').on('click', function() {
		$(this).parents('.js-popup-wrap').children('.js-btn-toggle').removeClass('active');
		$('body').removeClass('menu-show');
		return false;
	})
	$(document).click(function(event) {
	    if ($(event.target).closest(".js-popup-block").length) return;
	    $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
	    $('body').removeClass('menu-show');
	    event.stopPropagation();
	});
	$('.js-popup-wrap').each(function() {
		if ($(this).hasClass('js-popup-select')) {
			// alert(1)
			if ($(this).find('.js-popup-block').find('.active').length>0) {} else {
				$(this).find('.js-popup-block').find('li').eq(0).children('a').addClass('active');
			}
			var currentSelect = $(this).find('.js-popup-block').find('.active').html();
			$(this).find('.js-btn-toggle').html(currentSelect);
		}
	})
	$('.js-popup-wrap.js-popup-select .js-popup-block a').on('click', function() {
		if ($(this).hasClass('active')) {} else {
			$(this).parents('.js-popup-wrap').find('.js-popup-block').find('.active').removeClass('active');
			$(this).addClass('active');
		}
		$('.js-popup-wrap').each(function() {
			if ($(this).hasClass('js-popup-select')) {
				if ($(this).find('.js-popup-block').find('.active').length>0) {} else {
					$(this).find('.js-popup-block').find('li').eq(0).children('a').addClass('active');
				}
				var currentSelect = $(this).find('.js-popup-block').find('.active').html();
				$(this).find('.js-btn-toggle').html(currentSelect);
			}
		})
		$(this).parents('.js-popup-wrap').find('.js-btn-toggle').removeClass('active');
		return false;
	})

	//tabs
	$('.js-tabs-nav').each(function() {
		$('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
	})
	$('.js-tab-title').each(function() {
		if ($(this).hasClass('active')) {
			$(this).next('.js-tab-content').show(0);
		}
	})
	$('.js-tabs-nav li a').on('click', function() {
		if ($(this).hasClass('active')) {} else {
			$('.js-tab-block').removeClass('active');
			$(this).parents('.js-tabs-nav').find('.active').removeClass('active');
			$(this).addClass('active');
			$('.js-tabs-nav').each(function() {
				$('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
			})
		}
		return false;
	})
	$('.js-tab-title').on('click' , function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active').next('.js-tab-content').slideUp(200);
		} else {
			$(this).addClass('active').next('.js-tab-content').slideDown(200);
		}
	})
	
});