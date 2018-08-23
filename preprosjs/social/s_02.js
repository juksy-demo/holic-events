// social_02
var social_02 = function() {
  var $social02 = $('.social_02'),
    $windowW = $(window).width();
  $social02.each(function() {
    var $iframe = $(this).find('.photo iframe'),
      mUrl = $iframe.data('msrc'),
      pcUrl = $iframe.data('pcsrc');
    if ($windowW < 1024) {
      $iframe.attr('src', mUrl);
    } else {
      $iframe.attr('src', pcUrl);
    }
    iFrameResize();
  });
};
social_02();
