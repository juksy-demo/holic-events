// header_03
var header_03_slider = function() {
  var $header_03_banner = $("#header_03_banner");
  var slider = $header_03_banner.lightSlider({
    item: 1,
    slideMargin: 0,
    addClass: 'header_03_banner',
    speed: 1000,
    auto: true,
    loop: true,
    pause: 3000,
    controls: false,
    galleryMargin: 0,
    pager: $header_03_banner.data('pager'),
    onSliderLoad: function (e) {
      e.parents().find('ul.lSpg >li').click(function(){
        slider.pause();
      });
    }
  });
};
header_03_slider();