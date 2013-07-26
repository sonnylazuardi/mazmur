(function(MazmurApp) {
	MazmurApp.addInitializer(function() {
		MazmurApp.LirikViewer.init();
	});

	MazmurApp.LirikViewer = {
		init: function() {
			this.lirikList = MazmurApp.lirikList;
			lirikData = new MazmurApp.LirikCollection();
		},
		show: function(lagu) {
			var lirikText = lagu.get('lirik');
			var	parsed = lirikText.split('\n\n');
			var ctr = 0;
			lirikData.reset();
			_.each(parsed, function(baris) {
				baris = $.trim(baris);
				var caption = (baris.substring(0, 6).toLowerCase() == 'chorus');
				if (caption) baris = baris.substring(7, baris.length);
				baris = baris.replace('\n','<br>');
				var lirik = new MazmurApp.Lirik({caption: caption, ctr: ctr, lirik: baris});
				lirikData.push(lirik);
				ctr++;
			}, this);
			var lirikList = new MazmurApp.LirikViewList({
				collection: lirikData
			});
			this.lirikList.show(lirikList);
		}
	};

	MazmurApp.Lirik = Backbone.Model.extend({
		initialize: function() {
			var selectable = new Backbone.Picky.Selectable(this);
    	_.extend(this, selectable);
		},
	});

	MazmurApp.LirikCollection = Backbone.Collection.extend({
		model: MazmurApp.Lirik,
		initialize: function() {
			var singleSelect = new Backbone.Picky.SingleSelect(this);
    	_.extend(this, singleSelect);
    	MazmurApp.vent.bind("prevSlide", this.prevSlide, this);
    	MazmurApp.vent.bind("nextSlide", this.nextSlide, this);
		},

		prevSlide: function() {
			var index = this.indexOf(this.selected);
	    if (index > 0){
	      index -= 1;
	    } else {
	      index = this.length - 1;
	    }
	    var lirik = this.at(index);
	    lirik.select();
		},

		nextSlide: function() {
			var index = this.indexOf(this.selected);
	    if (index < this.length - 1){
	      index += 1;
	    } else {
	      index = 0;
	    }
	    var lirik = this.at(index);
	    lirik.select();
		}
	});

	MazmurApp.LirikView = Marionette.ItemView.extend({
		tagName: 'li',
		template: '#lirik-view-template',
		events: {
			'click a.lirik-preview': 'lirikClicked',
		},
		initialize: function () {
			this.model.bind('selected', this.lirikSelected, this);
			this.model.bind('deselected', this.lirikDeselected, this);
		},
		lirikClicked: function(e) {
			e.preventDefault();
			this.model.select();
		},
		lirikSelected: function() {
			this.$el.addClass('active');
			if (typeof(windowPreview)!='undefined' && !windowPreview.closed)
				windowPreview.changeSlide(this.model.get('ctr'));
		},
		lirikDeselected: function() {
			this.$el.removeClass('active');
		}
	});

	MazmurApp.LirikViewList = Marionette.CollectionView.extend({
		tagName: 'ul',
		itemView: MazmurApp.LirikView
	});

})(MazmurApp);

