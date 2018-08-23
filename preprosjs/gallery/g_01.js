// gallery_01
var gallery_01 = function() {
  var $gallery01 = $('.gallery_01');
  $gallery01.each(function(i) {
    var windowW = $(window).width(),
      galleryH = windowW * 3 / 4,
      moveW = (windowW - 800) / 2,
      $banner = $(this).find('.slider'),
      pcNum = Math.round(windowW / 800 * 10) / 10,
      pwspNum = windowW < 1024 ? 1 : Math.ceil(pcNum),
      slider;
    var mobile_options = {
      addClass: 'gallery_01_slider',
      speed: 1000,
      controls: false,
      gallery: true,
      item: 1,
      loop: true,
      thumbItem: 5,
      slideMargin: 0
    };
    var desktop_options = {
      addClass: 'gallery_01_slider',
      speed: 1000,
      controls: true,
      gallery: true,
      item: pcNum,
      loop: true,
      thumbItem: 10,
      slideMargin: 0,
      galleryMargin: 10,
      thumbMargin: 15,
      prevHtml: '<svg class="arrowL" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 60"><polyline points="18.91 0.51 1.17 30.17 18.91 59.38" /></svg>',
      nextHtml: '<svg class="arrowR" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 60"><polyline points="0.86 0.51 18.61 30.17 0.86 59.38" /></svg>',
      onSliderLoad: function(e) {
        // center gallery
        e.css({
          'margin-left': moveW
        });
        // add wrapper to thumb and resize
        e.parents().find('ul.lSGallery').wrap('<div class="galleryWrap"></div>');
        // set prev next btn width
        e.parent().find('.lSAction >a').width(moveW);
      }
    };
    //set id gallery_01_slider+i
    $banner.attr('id', 'gallery_01_slider' + i);

    //set image width and height
    function setImage(imgW, imgH) {
      var $imgWrap = $banner.find('.img');
      $imgWrap.each(function() {
        var $img = $(this).find('img'),
          w = $img.data('width'),
          h = $img.data('height'),
          r = w / h;
        if (r >= (4 / 3)) {
          $img.attr({
            width: imgW,
            height: "auto"
          });
        } else {
          $img.attr({
            width: "auto",
            height: imgH
          });
        }
      });
    }
    setImage(windowW, galleryH);

    if (windowW < 1024) {
      // mobile size set img
      setImage(windowW, galleryH);
      // init gallery
      slider = $('#gallery_01_slider' + i).lightSlider(mobile_options);
    } else {
      // desktop size set img
      setImage(800, 600);
      // init gallery
      slider = $('#gallery_01_slider' + i).lightSlider(desktop_options);
    }

    /*--------------------------
    PhotoSwipe lightbox gallery
    ----------------------------*/
    var pswpElement = document.querySelectorAll('.pswp')[0];

    // build items array
    var pswpItems = [],
      pswpSlide = $banner.find('>li'),
      pswpLength = pswpSlide.length;
    for (var i = pwspNum; i < pswpLength - pwspNum; i++) {
      var $item = pswpSlide.eq(i).find('.img img'),
        iSrc = $item.attr('src'),
        iW = $item.data('width'),
        iH = $item.data('height'),
        mSrc = iSrc;
      pswpItems.push({
        src: iSrc,
        w: iW,
        h: iH,
        msrc: mSrc
      });
    }

    var pswpoptions, // define options
      gallery; // Initializes and opens PhotoSwipe

    // click to open current lightbox
    pswpSlide.find('.img img').on('click', function() {
      var istart = $(this).parents('li').index();
      // 解決倒著滑第一個 lightbox 問題
      if (istart < pwspNum) {
        istart = istart + (pswpLength-pwspNum*2);
      }
      // define options (if needed)
      pswpoptions = {
        shareEl: false,
        index: istart - pwspNum,
        getThumbBoundsFn: function(istart) {
          var $thumb = pswpSlide.eq(istart + pwspNum).find('.img img'),
            toff = $thumb.offset(),
            tw = $thumb.width();
          return { x: toff.left, y: toff.top, w: tw };
        }
      };
      // Initializes and opens PhotoSwip
      gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, pswpItems, pswpoptions);
      gallery.init();
    });
  });
};
gallery_01();
