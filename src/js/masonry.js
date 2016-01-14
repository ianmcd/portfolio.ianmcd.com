(function () {
  'use strict';

  var $grid = $('.project__display--masonry').isotope({
    itemSelector: '.project__display--masonry figure',
    percentPosition: true,
    masonry: {
      columnWidth: '.project__display--masonry figure',
      gutter: 50
    }
  });

  $grid.imagesLoaded().progress( function() {
    $grid.isotope('layout');
  });
}());
