var windowPreview;

(function(MazmurApp) {

  MazmurApp.addInitializer(function(){
    MazmurApp.Presenter.init();
  });

  MazmurApp.Presenter = {
    init: function() {
      _.bindAll(this, 'keyDown', 'livePreview');
      $('#livePreview').click(this.livePreview);
      $(document).on('keydown', this.keyDown);
    },
    livePreview: function(e) {
      e.preventDefault();
      windowPreview = window.open("show.html", "_blank", "channelmode=yes, fullscreen=yes");
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
          MazmurApp.vent.trigger('prevLagu');
        } else if (e.keyCode == 39) {
          //nextLagu
          MazmurApp.vent.trigger('nextLagu');
        }
      }
      // }
    }
  };

})(MazmurApp);
