// nav_01
var nav_01 = function() {
  var $window = $(window),
    $nav = $('.nav_01'),
    $body = $('body'),
    sourceLi = $('#template-n01').html(),
    sourceMstart = $('#template-n01-more-start').html(),
    sourceMend = $('#template-n01-more-end').html(),
    $ulmenu = $nav.find('.menuWrap ul.menu'),
    $menuData = $ulmenu.data('navli') ? $ulmenu.data('navli') : {},
    $menuLen = $menuData.length,
    template,
    menuInner = '',
    $openBtn = $nav.find('.mIcon .open'),
    $closeBtn = $nav.find('.mIcon .close'),
    $menuOpen = 'menuOpen',
    $noscroll = 'noscroll',
    lastScrollTop = 0,
    $scrollout = 'scrollout',
    $menuli,
    $menuTimer;
  /*
  -------------------------------------
  set menu items
  -------------------------------------
  */
  for (var i = 0; i < $menuLen; i++) {
    // the 4th item will in the 更多 list
    if (i == 3) {
      template = Handlebars.compile(sourceMstart);
      menuInner += template();
    }

    // insert the list in menu
    var context = { title: $menuData[i] };
    template = Handlebars.compile(sourceLi);
    menuInner += template(context);

    // the last item if more than 4 items will have the 更多 close tag
    if (i >= 3 && i == $menuLen - 1) {
      template = Handlebars.compile(sourceMend);
      menuInner += template();
    }
  }

  // add menu
  $ulmenu.html(menuInner);

  /*
  -------------------------------------
  open and close menu // didn't use toggleClass because FB APP can't work for android4.2
  -------------------------------------
  */
  $openBtn.click(function() {
    $nav.addClass($menuOpen);
    $body.addClass($noscroll);
  });
  $closeBtn.click(function() {
    $nav.removeClass($menuOpen);
    $body.removeClass($noscroll);
  });
  /*
  -------------------------------------
  FB share, Line share
  -------------------------------------
  */
  $nav.find("ul.share li.fb, ul.share .title").click(function(e) {
    e.preventDefault();
    FB.ui({
      method: 'share',
      href: document.URL
    }, function(response) {});
  });
  $nav.find("ul.share li.line a.btn").attr("href", "http://line.naver.jp/R/msg/text/?" + document.title + "%0A" + document.URL);
  /*
  -------------------------------------
  nav move out while scrolling
  -------------------------------------
  */
  function navmove() {
    var st = $(this).scrollTop();
    if (st > lastScrollTop) {
      // downscroll code
      $nav.stop(true, true).addClass($scrollout);
    } else if (st == 0) {
      // top
      scrollOut();
    } else if (st < lastScrollTop) {
      // upscroll code
      $window.scroll(_.debounce(scrollOut, 10000));
    }
    lastScrollTop = st;

    function scrollOut() {
      $nav.stop(true, true).removeClass($scrollout);
    }
  }
  $window.scroll(_.throttle(navmove, 500));
  /*
  -------------------------------------
  hover menu li animation
  -------------------------------------
  */
  $menuli = $nav.find('ul.menu >li');
  $menuli.hover(function() {
    clearTimeout($menuTimer);
    $menuli.not(this).stop(true, true).animate({ opacity: 0.5 }, 500);
    $(this).stop(true, true).animate({ opacity: 1 }, 500);
  }, function() {
    $menuTimer = setTimeout(menuHover, 300);
  });

  function menuHover() {
    $menuli.stop(true, true).animate({ opacity: 1 }, 500);
  }
  /*
  -------------------------------------
  page scroll
  -------------------------------------
  */
  $nav.find('ul.menu >li').not('notli').click(goPosition);
  $nav.find('ul.submenu >li').click(goPosition);

  function goPosition() {
    var nowIndex = $(this).index(),
      $submenu = $(this).parent('ul.submenu').length,
      scrollPosition;
    if ($submenu == 0 && nowIndex == 3) {
      return;
    } else if ($submenu > 0) { nowIndex += 3; }
    scrollPosition = $('[data-menu="true"]').eq(nowIndex).offset().top;
    $closeBtn.trigger('click');
    $('html,body').animate({ scrollTop: scrollPosition }, 1000);
  }
};
nav_01();