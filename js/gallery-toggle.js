// number to roman numeral
function romanize(num) {
    if (!+num)
        return false;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}


// reused to init swiper elements
function swiperInit(el, i) {
  // renders new classes based on index
  $(el).find('.gallery__button-prev').addClass('prev-' + i);
  $(el).find('.gallery__button-next').addClass('next-' + i);
  $(el).find('.swiper-container').addClass('cont-' + i);
  $(el).find('.gallery__pagination').addClass('page-' + i);

  // new swiper created referencing classes created above
  var swiper = new Swiper($('.cont-' + i), {
    speed: 300,
    pagination: $('.page-' + i),
    nextButton: $('.next-' + i),
    prevButton: $('.prev-' + i),
    paginationClickable: true,
    paginationBulletRender: function (index, className) {
      return '<span class="' + className + '">' + romanize(index + 1) + '</span>';
    },
    grabCursor: true
  });
}


// page loaded
$(function() {

  // init swiper on all active galleries
  $('.gallery__swiper').each(function(i) { swiperInit(this, i); });

  $('.gallery__swiper').not('.gallery__swiper--active').css('z-index', '-100');

  // gallery toggle on click
  $('.gallery__toggles a').click(function(e) {
    e.preventDefault();

    var galleryId = $(this).attr('href'),
        galleryParent = $(this).closest('.gallery'),
        parent = $(this).closest('ul'),
        activeText = $(this).text(),
        checkBox = $(galleryParent).find('.gallery__mobile-check');

    $(checkBox).prop('checked', false);

    // only remove active links from current parent -- not all gallery toggle elements
    parent.find('li').removeClass('active');
    $(this).closest('li').addClass('active');
    $(this).closest('.gallery__mobile-wrapper').find('.gallery__mobile-toggle').text(activeText);

    $(galleryParent).find('.gallery__swiper').removeClass('gallery__swiper--active');
    $(galleryId).css('z-index', '');

    // timing out for css animations
    setTimeout(function() {
      $(galleryId).addClass('gallery__swiper--active');
      Swiper($(galleryId).find('.swiper-container')).update(true);
      $('.gallery__swiper').not('.gallery__swiper--active').css('z-index', '-100');
    }, 300);
  });
});
