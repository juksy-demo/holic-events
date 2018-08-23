// list_04
var list_04 = function() {
  // Slider
  var $list04 = $('.list_04');
  $list04.each(function() {
    var $this = $(this),
      $slideW = $this.find('ul.slides').width(),
      $windowW = $(window).width();
    // Mobile and tablet move to second slide
    if ($windowW < 1024) {
      var $center = ($slideW - 20 - $windowW) / 2;
      $this.find('.slidesWrap').scrollLeft($center);
    }
  });
};
list_04();