// list_09
var list_09 = function() {
  var $list09 = $('.list_09');
  $list09.each(function() {
    var $this = $(this),
        nowIndex = 0,
        pic = $this.find('ul.pic li'),
        date = $this.find('ul.dateWrap li'),
        article = $this.find('ul.main li'),
        totalLength = $this.find('.article ul.pic li').length,
        nowNum = $this.find('.nav span.now'),
        totalNum = $this.find('.nav span.total'),
        navBtn = $this.find('.nav .btn'),
        rightBtn = $this.find('.nav .btn.right'),
        leftBtn = $this.find('.nav .btn.left');

    function changeNav() {
      nowNum.text(nowIndex+1);
      if (nowIndex == totalLength-1) {rightBtn.addClass('end');}
      else {rightBtn.removeClass('end');}
      if (nowIndex == 0) {leftBtn.addClass('end');}
      else {leftBtn.removeClass('end');}
    }

    function removeNow() {
      pic.eq(nowIndex).removeClass('now');
      date.eq(nowIndex).removeClass('now');
      article.eq(nowIndex).removeClass('now');
    }

    function addNow() {
      pic.eq(nowIndex).addClass('now');
      date.eq(nowIndex).addClass('now');
      article.eq(nowIndex).addClass('now');
    }

    // set total number
    totalNum.text(totalLength);

    // click nav button
    navBtn.click(function () {
      var eq = $(this).index();
      removeNow();
      switch (eq) {
        case 0:
          if (nowIndex !== 0) {nowIndex --;}
          break;
        case 2:
          if (nowIndex !== totalLength-1) {nowIndex ++;}
          break;
      }
      addNow();
      changeNav();
    });

    // swipe img
    pic.swipe({
      allowPageScroll: 'none',
      preventDefaultEvents: false,
      excludedElements: '',
      swipeLeft: function(){
        var eq = $(this).index();
        removeNow();
        if (nowIndex == totalLength-1) {
          nowIndex = 0;
        }
        else { nowIndex ++; }
        addNow();
        changeNav();
      },
      swipeRight: function(){
        var eq = $(this).index();
        removeNow();
        if (nowIndex == 0) {
          nowIndex = totalLength-1;
        }
        else { nowIndex --; }
        addNow();
        changeNav();
      }
    });
  });
};
list_09();