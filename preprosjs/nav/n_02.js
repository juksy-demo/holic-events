// nav_02
var nav_02 = function() {
  var $window = $(window),
      $menuBtn = $('.nav_02_btn'),
      $body = $('body'),
      $nav_02 = $('.nav_02'),
      $list = $nav_02.find('ul.list li'),
      $nav_02_line = $('.nav_02_line'),
      $list_line = $nav_02_line.find('.listWrap ul.list li'),
      list_animate = $nav_02_line.find('.listWrap .line'),
      $menu = $('[data-menu="true"]'),
      open = 'open',
      noscroll = 'noscroll';
  /*
  -------------------------------------
  open menu
  -------------------------------------
  */
  $menuBtn.click(function(){
    $(this).toggleClass(open);
    $nav_02.toggleClass(open);
    $nav_02_line.toggleClass(open);
    if ($window.width() < 1024) {
      $body.toggleClass(noscroll);
    }
  });
  /*
  -------------------------------------
  page scroll
  -------------------------------------
  */
  function goPosition(index) {
    var scrollPosition;
    scrollPosition = $menu.eq(index).offset().top;
    $('html,body').animate({ scrollTop: scrollPosition }, 1000);
  }
  $list.click(function(){
    var nowIndex = $(this).index();
    goPosition(nowIndex);
    $menuBtn.trigger('click');
  });
  $list_line.click(function(){
    var nowIndex = $(this).index();
    goPosition(nowIndex);
  });
  /*
  -------------------------------------
  menu number change
  -------------------------------------
  */
  // Adding extra zeros in front of a number
  function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
  }
  // listen number
  function numChange () {
    var length = $menu.length,
        window_position = $window.scrollTop();
    // set total number
    $nav_02_line.find('.number .total').text(pad(length, 2));
    for (var i = 0; i < length ; i++) {
      var yset = $menu.eq(i).offset().top;
      if (window_position + 100 > yset) {
        $nav_02_line.find('.number .now').text(pad(i+1, 2));
      }
      if (window_position == 0) {
        $nav_02_line.find('.number .now').text(pad(1, 2));
      }
    }
  }
  if ($window.width() >= 1024) {
    $window.scroll(_.throttle(numChange, 250));
  }
  /*
  -------------------------------------
  scroll animation
  -------------------------------------
  */
  function lineMove() {
    var length = $menu.length,
        window_position = $window.scrollTop();
    for (var i = 0; i < length ; i++) {
      if (i == length - 1) continue;
      var yset = $menu.eq(i).offset().top;
      if (window_position + 100 > yset) {
        list_animate.css({
          'transform': 'translateY(' + 72*i + 'px)'
        });
      }
      if (window_position == 0) {
        list_animate.css({
          'transform': 'translateY(0)'
        });
      }
    }
  }
  if ($window.width() >= 1024) {
    $window.scroll(_.throttle(lineMove, 250));
  }
};
nav_02();