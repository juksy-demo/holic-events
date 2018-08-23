var init = function() {
  // android version under 4.4 FB APP can't use css fadeout
  function getAndroidVersion(ua) {
    ua = (ua || navigator.userAgent).toLowerCase();
    var match = ua.match(/android\s([0-9\.]*)/);
    return match ? match[1] : false;
  };
  var $android = parseFloat(getAndroidVersion());
  if ($android < 4.4) {
    alert('Android 4.3 以下手機，請使用Chrome瀏覽器閱讀');
  }

  // Configure webfont
  window.WebFontConfig = {
    google: {
      families: ['Roboto+Condensed:400,400italic,700,700italic:latin', 'Open+Sans:400,700,800']
    }
  };

  // Init Facebook
  window.fbAsyncInit = function() {
    FB.init({
      appId: '608477045879026',
      cookie: true, // enable cookies to allow the server to access 
      // the session
      xfbml: true, // parse social plugins on this page
      version: 'v2.8' // use version 2.8
    });
  };
};
init();
