// plugin lazy_image
$(document).on('lazy_image', function() {
  var $window = $(window),
    target = $('[data-module="lazy_image"]'),
    complete = 'lazyImgComplete';

  function addComplete() {
    var length = target.length;
    for (var i = 0; i < length; i++) {
      if (target.eq(i).hasClass(complete)) continue;
      var in_position = target.eq(i).offset().top + 100;
      var window_bottom_position = $window.scrollTop() + $window.height() + 150;
      if (in_position < window_bottom_position) {
        var targeturl = target.eq(i).data('lazyimg');
        target.eq(i).css('background-image', 'url(' + targeturl + ')');
        target.eq(i).addClass(complete);
      }
    }
  }
  addComplete();
  $window.scroll(_.throttle(addComplete, 250));
});
$(document).trigger('lazy_image');
