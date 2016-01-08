(function () {
  'use strict';

  var parallax = document.querySelectorAll('.parallax');
  var speed = 0.3;

  window.onscroll = function(){
    [].slice.call(parallax).forEach(function(el){

      var windowYOffset = window.pageYOffset,
          elBackgroundPos = (windowYOffset * speed) + 'px';

      el.style.transform = 'translate(-50%,' + elBackgroundPos + ')';

    });
  };
}());
