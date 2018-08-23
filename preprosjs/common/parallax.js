// plugin parallax
$(document).on('parallax', function() {
  var $parallax = $('[data-module="parallax"]');
  $parallax.each(function(index, element) {
    var i = index;
    // z-index set for each parallax
    $parallax.eq(i).css('z-index', -1 - i);

    $(window).on('load scroll', function() {
      var $el = $parallax.eq(i),
        heightP = $el.parent().height(),
        startP = $el.parent().offset().top,
        endP = startP + heightP,
        rateP = 0.25; // parallax (25% scroll rate)

      var scrolled = $(this).scrollTop();
      if (scrolled >= startP && scrolled <= endP) {
        $el.css('transform', 'translate3d(0, ' + (startP - scrolled) * rateP + 'px, 0)');
        $el.css('z-index', -1);
      } else if (scrolled > endP) {
        $el.css('transform', 'none');
        $el.css('z-index', -$parallax.length - i);
      } else {
        $el.css('transform', 'none');
        $el.css('z-index', -1 - i);
      }
    });
  });
});
$(document).trigger('parallax');
