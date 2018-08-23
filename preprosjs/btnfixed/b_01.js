// fixedBtn
var fixedBtn_01 = function() {
  // Back to top
  $('ul.fixedBtn_01 li.top').click(function() {
    $('html,body').animate({ scrollTop: 0 }, 1000);
  });
  // Open share menu
  $('ul.fixedBtn_01 li.share').mousedown(function() {
    $('.fixedBtnCover_01').addClass('show');
  });
  // Close share menu
  $('.fixedBtnCover_01 .coverWrap .backCover, .fixedBtnCover_01 .item .arrow').bind('mousedown touchstart', function() {
    $('.fixedBtnCover_01').removeClass('show');
  });
  // Share with LINE
  $('.fixedBtnCover_01 ul.share li.line .material_btn').click(function(e) {
    e.preventDefault();
    window.location.href = 'http://line.naver.jp/R/msg/text/?' + document.title + '%0A' + document.URL;
  });
  // Share with FB
  $('.fixedBtnCover_01 ul.share li.fb .material_btn').click(function(e) {
    e.preventDefault();
    FB.ui({
      method: 'share',
      href: document.URL
    }, function(response) {});
  });
  // Copy link
  var clipboard = new Clipboard('.fixedBtnCover_01 ul.share li.copy .material_btn', {
    text: function(trigger) {
      return document.URL;
    }
  });
  // Copy tip
  clipboard.on('success', function(e) {
    var tipTime;
    clearTimeout(tipTime);
    $('.fixedBtnCover_01 .coverWrap .copytip').addClass('show');
    tipTime = setTimeout(hide, 2000);

    function hide() {
      $('.fixedBtnCover_01 .coverWrap .copytip').removeClass('show');
    }
  });
  /*
  -------------------------------------
  nav move out while scrolling
  -------------------------------------
  */
  var $window = $(window);

  function fixedBtnShow() {
    if (!$('#footer').length) return;/* fixed for no footer */
    var st = $(this).scrollTop(),
      ft = $('#footer').offset().top - $window.height() - 300,
      $fixedBtn = $('.fixedBtn_01');
    if (st > ft) {
      $fixedBtn.addClass('show');
    } else if (st == 0) {
      $fixedBtn.removeClass('show');
    }
  }
  $window.scroll(_.throttle(fixedBtnShow, 500));
};
fixedBtn_01();
