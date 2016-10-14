$(function() {
  var parallax = document.querySelectorAll('.parallax');
  var section = parallax[0].parentNode;
  var speed = 0.5;

  window.onscroll = function() {

    if (window.outerWidth > 1080) {
      speed = 0.5;
    } else if (window.outerWidth <= 1080 && window.outerWidth > 640) {
      speed = 0.6425;
    } else {
      speed = 0.7;
    }

    [].slice.call(parallax).forEach(function(el){

      var windowYOffset = window.pageYOffset,
          elBackgroundPos = (windowYOffset * speed) + 'px';

      el.style.transform = 'translate(-50%,' + elBackgroundPos + ')';

    });
  };
});
