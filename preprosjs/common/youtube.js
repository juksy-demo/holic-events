// Youtube api for header_02, video_02
// create deferred object
var YTdeferred = $.Deferred();
window.onYouTubeIframeAPIReady = function() {
  // console.log('Youtube API ready');
  // resolve when youtube callback is called
  // passing YT as a parameter
  YTdeferred.resolve(window.YT);
};

// embedding youtube iframe api
// https://developers.google.com/youtube/iframe_api_reference#Getting_Started
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

$(function() {
  var player,
    header_02_player = $('#header_02_player'),
    header_02_videoId = header_02_player.data('videoid'),
    header_02_start = header_02_player.data('start'),
    video_02_player = $('#video_02_player'),
    video_02_videoId = video_02_player.data('videoid'),
    video_02_start = video_02_player.data('start');
  // whenever youtube callback was called = deferred resolved
  // your custom function will be executed with YT as an argument
  YTdeferred.done(function(YT) {
    // creating a player
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    player = new YT.Player('header_02_player', {
      videoId: header_02_videoId, // YouTube 影片ID
      width: 560, // 播放器寬度 (px)
      height: 315, // 播放器高度 (px)
      playerVars: {
        rel: 0, // 播放結束後推薦其他影片
        controls: 0, // 在播放器顯示暫停／播放按鈕
        start: header_02_start, //指定起始播放秒數
        autoplay: 1, // 在讀取時自動播放影片
        loop: 1, // 讓影片循環播放
        playlist: header_02_videoId,
        showinfo: 0, // 隱藏影片標題
        modestbranding: 1, // 隱藏YouTube Logo
        fs: 0, // 隱藏全螢幕按鈕
        cc_load_policty: 0, // 隱藏字幕
        iv_load_policy: 3, // 隱藏影片註解
        autohide: 0 // 當播放影片時隱藏影片控制列
      },
      events: {
        onReady: function(e) {
          e.target.mute(); // 靜音
        }
      }
    });

    player = new YT.Player('video_02_player', {
      videoId: video_02_videoId, // YouTube 影片ID
      width: 1280, // 播放器寬度 (px)
      height: 720, // 播放器高度 (px)
      playerVars: {
        rel: 0, // 播放結束後推薦其他影片
        controls: 0, // 在播放器顯示暫停／播放按鈕
        start: video_02_start, //指定起始播放秒數
        autoplay: 0, // 在讀取時自動播放影片
        loop: 1, // 讓影片循環播放
        playlist: video_02_videoId,
        showinfo: 0, // 隱藏影片標題
        modestbranding: 1, // 隱藏YouTube Logo
        fs: 0, // 隱藏全螢幕按鈕
        cc_load_policty: 0, // 隱藏字幕
        iv_load_policy: 3, // 隱藏影片註解
        autohide: 0 // 當播放影片時隱藏影片控制列
      },
      events: {
        onReady: function(e) {
          var $video02 = $('#video_02_player'),
              $window = $(window);
          // mobile don't active
          if ($window.width() < 1024) return;
          // set video high quality
          e.target.setPlaybackQuality('hd1080');
          // control video play and pause
          $video02.parents().find('.parallaxContent').click(function() {
            if (e.target.getPlayerState() == 1) {
              e.target.pauseVideo();
            }
            else {
              e.target.playVideo();
            }
          });
          // scroll to auto play
          function vPlay() {
            var in_position = $video02.parents().find('.title').offset().top,
                window_position = $window.scrollTop(),
                status = $video02.data('vplay');
            if (status == 'true') return;
            if (in_position < window_position) {
              e.target.playVideo();
              $video02.data('vplay', 'true');
            }
          }
          $window.scroll(_.throttle(vPlay, 250));
        }
      }
    });
  });
});
