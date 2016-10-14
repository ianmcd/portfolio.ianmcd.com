function openMobileNav(el) {
  $(el).addClass('js-nav-open').removeClass('js-nav-close');
  var winH = $(window).height();
  $('.js-nav-list').css('display', 'block');
  $('body').css('overflow', 'hidden');
  $('.js-nav-list').animate({
    height: winH - 50
  }, 300);
}

function closeMobileNav(el) {
  $('body').css('overflow', '');

  $(el).addClass('js-nav-close').removeClass('js-nav-open');
  $('.js-nav-list').animate({
    height: 0
  }, 300);
}

$(function() {
  // scrollspy highlighting
  $('body').scrollspy({ target: '.js-nav-list' });


  // scrollTo
  $(".nav a").click(function(e) {
    var dest = $(this).attr('href');
    $('body, html').animate({ scrollTop: $(dest).offset().top }, 300);
    e.preventDefault();
  });


  // mobile navigation
  $('.mobile-nav').click(function(e) {
    e.preventDefault();

    if($(this).hasClass('js-nav-open')) {
      closeMobileNav(this);
    } else {
      openMobileNav(this);
    }
  });

  $(window).resize(function() {
    console.log($(window).outerWidth());
    if($(window).outerWidth() > 640) {
      if(!$('.modal__inner').hasClass('js-open')) { $('body').css('overflow', ''); }
      $('.mobile-nav').removeClass('js-nav-open js-nav-close');
      $('.js-nav-list').css('height', 0);
    }
  });

  $('.list__nav-list a').click(function(e) { closeMobileNav($('.js-nav-open')); });
});
