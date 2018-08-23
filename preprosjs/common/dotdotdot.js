// plugin dotdotdot
$(document).on('dotdotdot', function() {
  $('[data-module="dotdotdot"]').dotdotdot({
    wrap: 'letter'
  });
});
$(document).trigger('dotdotdot');
