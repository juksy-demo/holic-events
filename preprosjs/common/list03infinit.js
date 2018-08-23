// plugin list_03 infinite scroll
var $list03infinit = $('.list_03_infinit');
$list03infinit.each(function() {
  var $layout = $(this).find('.layoutWrap'),
    moreBtn = '.moreBtn',
    countFrom = 0,
    countSize = 6,
    source,
    template,
    article;

  // add btn click listener
  var btnClick = function() {
    $layout.find(moreBtn).one('click', function() {
      $(this).remove();
      // get new data
      countFrom += countSize;
      list_03_ajax(countFrom, countSize);
      // append article
      addArticle();
    });
  };

  // add article
  var addArticle = function() {
    $layout.append('<div class="articleWrap">' + article + '</div>');
    $(document).trigger('lazy_image');
    $(document).trigger('dotdotdot');
    btnClick();
  }

  // ajax
  var list_03_ajax = function(ifrom, isize) {
    // clear article content
    article = '';
    var items = {
      from: ifrom,
      size: isize,
      tags: $layout.data('tags'),
      filter: $layout.data('filter')
    };
    $.ajax({
      url: JUKSY.apiUri + '/v1.0/search/articles',
      data: { tags: items.tags, filter: items.filter, from: items.from, size: items.size },
      type: 'GET',
      dataType: 'json',
      success: function(Jdata) {
        console.log('AJAX layout_03 SUCCESS!!!');

        // no data
        if (!Jdata.length) return;

        // has data
        source = $("#entry-template-start").html();
        template = Handlebars.compile(source);
        article += template();
        for (var n = 0; n < Jdata.length; n++) {
          source = $("#entry-template" + n % 2).html();
          template = Handlebars.compile(source);
          article += template(Jdata[n]);
        }
        if (Jdata.length < items.size) {
          article += "</ul>";
        } else {
          source = $("#entry-template-end").html();
          template = Handlebars.compile(source);
          article += template();
        }
        addArticle();
      },
      error: function() {
        console.log('AJAX layout_03 ERROR!!!');
      }
    });
  }

  //init loading ajax
  list_03_ajax(countFrom, countSize);
});
