var windowPreview;

(function(MazmurApp) {

  MazmurApp.addInitializer(function(){
    MazmurApp.Presenter.init();
  });

  MazmurApp.LirikViewList = Marionette.CompositeView.extend({
    itemView: MazmurApp.LirikView,
    itemViewContainer: "#live-items",
    template: "#live-template",
    events: {
      'click a#livePreview': 'livePreview',
      'click a#clearPreview': 'clearPreview',
      'click a#blankPreview': 'blankPreview',
      
    },
    livePreview: function(e) {
      e.preventDefault();
      if (typeof(windowPreview)!='undefined' && !windowPreview.closed) {
        windowPreview.close();
        $(e.currentTarget).find('span').attr('class', 'fui-play');
      } else {
        windowPreview = window.open("show.html", "_blank", "channelmode=yes, fullscreen=yes");  
        $(e.currentTarget).find('span').attr('class', 'fui-pause');
      }
    },
    clearPreview: function(e) {
      e.preventDefault();
      if (typeof(windowPreview)!='undefined' && !windowPreview.closed) {
        if ($(e.currentTarget).find('span').attr('class') == 'fui-eye') {
          windowPreview.clearSlide(true);
          $(e.currentTarget).find('span').attr('class', 'fui-cross');
        } else {
          windowPreview.clearSlide(false);
          $(e.currentTarget).find('span').attr('class', 'fui-eye');
        }
      }
    },
    blankPreview: function(e) {
      e.preventDefault();
      if (typeof(windowPreview)!='undefined' && !windowPreview.closed) {
        if ($(e.currentTarget).find('span').attr('class') == 'fui-radio-unchecked') {
          windowPreview.blankSlide(true);
          $(e.currentTarget).find('span').attr('class', 'fui-radio-checked');
        } else {
          windowPreview.blankSlide(false);
          $(e.currentTarget).find('span').attr('class', 'fui-radio-unchecked');
        }
      }
    }
  });

  MazmurApp.Presenter = {
    init: function() {
      _.bindAll(this, 'keyDown');      
      $(document).on('keydown', this.keyDown);
    },
    keyDown: function(e) {
      // console.log(e.keyCode);
      // if (e.target.tagName.toLowerCase() !== 'input' &&
      //   e.target.tagName.toLowerCase() !== 'textarea' && e.which == 46) {
      if (e.target.tagName.toLowerCase() != 'input' && e.target.tagName.toLowerCase() != 'textarea') {
        if (e.keyCode == 38 || e.keyCode == 33) {
          //prev
          MazmurApp.vent.trigger('prevSlide');
        } else if (e.keyCode == 40 || e.keyCode == 32 || e.keyCode == 34) {
          //next
          MazmurApp.vent.trigger('nextSlide');
        } else if (e.keyCode == 37) {
          //prevLagu
          // MazmurApp.vent.trigger('prevLagu');
        } else if (e.keyCode == 39) {
          //nextLagu
          // MazmurApp.vent.trigger('nextLagu');
        }
      }
      // }
    }
  };

})(MazmurApp);
