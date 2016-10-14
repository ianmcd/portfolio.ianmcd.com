function buildGalleryArray(elem) {
  var parentGallery = $(elem).closest('.gallery__swiper'),
      galleryTitle = $(elem).siblings('h4').text(),
      galleryRange = $(elem).siblings('p.note').text();

  var startImg = $(elem).parent('.slide-details').siblings('figure').children('img').attr('src'),
      startIndex;

  var imageArray = [];

  $(parentGallery).find('.swiper-slide').each(function(i) {
    var imgStr = $(this).find('figure img').attr('src');

    if(startImg === imgStr) { startIndex = i; }

    imgStr = imgStr.replace(/-thumb/i, '');
    imageArray.push(imgStr);
  });

  return {
    'title': galleryTitle,
    'range': galleryRange,
    'images': imageArray,
    'index': startIndex
  };
}

function closeModal() {
  $('.modal__inner').removeClass('js-open');
  $('.modal__wrapper').animate({
    'opacity': 0
  }, 300, function() {
    $('.modal__wrapper').scrollTop(0);
    $('body').css('overflow', '');
    $('.modal__wrapper').css('display', '');
    $('.modal__header').css('top', '');
  });
}

function modalNext() {
  var array = $('.modal__wrapper').data('array');
  var index = $('.modal__wrapper').data('index');

  var nextIndex = array.length > index + 1 ? index + 1 : 0;

  $('.modal__image img').animate({
    opacity: 0
  }, 300, function() {
    // if header is in 'fixed' style position -- return to top
    if($('.modal__header').position().top > 25) {
      $('.modal__wrapper').scrollTop(75);
      $('.modal__header').css('top', '');
    }

    $('.modal__image img').attr('src', array[nextIndex]);
    $('.modal__image img').load(function() {
      $('.modal__image').animate({ height: $('.modal__image img').outerHeight() + 'px' }, 300);
      $('.modal__image img').animate({ opacity: 1 }, 300);

      $('.modal__wrapper').data('index', nextIndex);
    });
  });
}

function modalPrevious() {
  var array = $('.modal__wrapper').data('array');
  var index = $('.modal__wrapper').data('index');

  var prevIndex = 0 < index ? index - 1 : array.length - 1;

  $('.modal__image img').animate({
    opacity: 0
  }, 300, function() {
    // if header is in 'fixed' style position -- return to top
    if($('.modal__header').position().top > 25) {
      $('.modal__wrapper').scrollTop(75);
      $('.modal__header').css('top', '');
    }

    $('.modal__image img').attr('src', array[prevIndex]);
    $('.modal__image img').load(function() {
      $('.modal__image').animate({ height: $('.modal__image img').outerHeight() + 'px' }, 300);
      $('.modal__image img').animate({ opacity: 1 }, 300);

      $('.modal__wrapper').data('index', prevIndex);
    });
  });
}

$(function() {
  $('.slide-expand').click(function(e) {
    e.preventDefault();

    // inital loading of a gallery modal
    var galleryArray = buildGalleryArray(this),
        imgArray = galleryArray.images,
        imgIndex = galleryArray.index;

    $('body').css('overflow', 'hidden');
    $('.modal__wrapper').css('display', 'block');

    $('.modal__wrapper h4').text(galleryArray.title);
    $('.modal__wrapper p.note').text(galleryArray.range);

    $('.modal__image img').attr('src', imgArray[imgIndex]);


    $('.modal__wrapper').animate({
      'opacity': 1
    }, 300, function() {
      // without delay these were returning to previous values for whatever reason
      $('.modal__wrapper').data('array', imgArray);
      $('.modal__wrapper').data('index', imgIndex);
    });
    $('.modal__inner').addClass('js-open');
  });

  $('.modal__controls--close').click(function(e) {
    e.preventDefault();
    closeModal();
  });

  $('.modal__controls--next').click(function(e) {
    e.preventDefault();
    modalNext();
  });

  $('.modal__controls--prev').click(function(e) {
    e.preventDefault();
    modalPrevious();
  });

  $('.modal__wrapper').scroll(function(){
    var innerOffset = $('.modal__wrapper').offset().top - $('.modal__inner').offset().top;

    if(innerOffset > 25) {
      $('.modal__header').css('top', innerOffset);
    } else {
      $('.modal__header').css('top', '');
    }
  });
});
