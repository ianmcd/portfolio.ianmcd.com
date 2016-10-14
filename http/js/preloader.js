// preloading portfolio images using folder names
function preloadImages() {
  for (var i = 0; i < arguments.length; i++) {
    var directory = '/img/' + arguments[i] + '/';
    var extension = '.png';

    $.ajax({
      url: directory,
      success: function(data) {
        $(data).find('a:contains(' + extension + ')').each(function() {
          var uri = $(this).attr('href');

          // no need to preload thumbs
          if(!(uri.includes('-thumb'))) {
            var img = $("<img />").attr("src", uri);
          }
        });
      }
    });
  }
}

$(function() {
  preloadImages('corvisa', 'trivera');
});
