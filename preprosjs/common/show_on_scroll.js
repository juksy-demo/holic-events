// plugin showOnScroll for infinite times doing animation
$(document).on('showOnScroll', function() {
  var $window = $(window);
  function showOnScroll() {
    var scrolled = $window.scrollTop(),
        wHeight = $window.height();
    // show
    $('.showOnScroll:not(.animated)').each(function(){
      var $this = $(this),
          offsetTop = $this.offset().top,
          offset = $this.data('show-offset');
      if (scrolled + wHeight - offset > offsetTop) {
        $this.addClass('animated ' + $this.data('show-animation'));
      }
    });
    // hide
    $(".showOnScroll.animated").each(function() {
      var $this     = $(this),
          offsetTop = $this.offset().top,
          offset = $this.data('show-offset'),
          oHeight = $(this).height();
      if (scrolled + wHeight + offset < offsetTop || scrolled > offsetTop + oHeight + offset) {
        $(this).removeClass('animated');
        $(this).removeClass($this.data('show-animation'));
      }
    });
  }
  showOnScroll();
  $window.scroll(_.throttle(showOnScroll, 250));
});
$(document).trigger('showOnScroll');
