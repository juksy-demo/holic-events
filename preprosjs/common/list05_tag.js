// plugin list_05_tag auto loading
var $list05_tag = $('.list_05_tag');
$list05_tag.each(function() {
  var $layout = $(this).find('.layoutWrap'),
    engtitle = $layout.data('engtitle'),
    title = $layout.data('title'),
    description = $layout.data('description'),
    countFrom = 0,
    countSize = 8,
    source,
    template,
    article;

  // add article
  var addArticle = function() {
    $layout.append(article);
    $layout.find('.title').html(engtitle);
    $layout.find('.detail').html(title);
    $layout.find('p.subTitle').html(description);
    $(document).trigger('lazy_image');
    $(document).trigger('dotdotdot');
  }

  // ajax
  var list_05_ajax = function(ifrom, isize) {
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
        console.log('AJAX layout_05 SUCCESS!!!');

        // no data
        if (!Jdata.length) return;

        // has data
        source = $("#template-l05-start").html();
        template = Handlebars.compile(source);
        article += template();
        for (var n = 0; n < Jdata.length; n++) {
          source = $("#template-l05").html();
          template = Handlebars.compile(source);
          article += template(Jdata[n]);
        }
        source = $("#template-l05-end").html();
        template = Handlebars.compile(source);
        article += template();
        addArticle();
      },
      error: function() {
        console.log('AJAX layout_05 ERROR!!!');
      }
    });
  }

  //init loading ajax
  list_05_ajax(countFrom, countSize);
});
