(function(MazmurApp) {
	MazmurApp.addInitializer(function(){
    MazmurApp.LaguList.init();
    MazmurApp.LaguList.show(MazmurApp.lagus);
  });

  MazmurApp.LaguList = {
		init: function() {
			_.bindAll(this, 'addLagu', 'searchLagu');
			this.laguList = MazmurApp.laguList;
			$('a#add-lagu').click(this.addLagu);
			$('input#search-lagu').on('input', this.searchLagu);
		},
		show: function(lagus) {
			var laguList = new MazmurApp.LaguViewList({
				collection: lagus
			});
			this.laguList.show(laguList);
		},
		addLagu: function(e) {
			e.preventDefault();
			MazmurApp.lagus.deselect();
			MazmurApp.AddEditLagu.addEditLagu(new MazmurApp.Lagu());
		},
		searchLagu: function(e) {
			var selector = {search_text: $(e.currentTarget).val()};
			var filtered = new MazmurApp.LaguCollection();
			filtered.reset( MazmurApp.lagus.filter(function ( model ) {
        return model.match( selector );
     	}));
     	MazmurApp.LaguList.show(filtered);
     	filtered.at(0).select();
		}
	};

	MazmurApp.LaguView = Marionette.ItemView.extend({
		tagName: 'li',
		template: '#lagu-preview-template',
		events: {
			'click a.lagu-preview': 'selectLagu',
			'dblclick a.lagu-preview': 'lirikLagu',
			'click a#edit-lagu': 'editLagu',
		},
		initialize: function() {
			this.model.bind('selected', this.laguSelected, this);
			this.model.bind('deselected', this.laguDeselected, this);
		},
		selectLagu: function(e) {
			e.preventDefault();
			this.model.select();
		},
		editLagu: function(e) {
			e.preventDefault();
			MazmurApp.AddEditLagu.addEditLagu(this.model);
		},
		deleteLagu: function(e) {
			e.preventDefault();
			this.model.destroy();
		},
		laguSelected: function() {
			this.$el.addClass('active');
			MazmurApp.PreviewList.show(this.model);
			MazmurApp.PreviewList.previewTemp.at(0).select();
		},
		lirikLagu: function() {
			MazmurApp.PreviewList.previewTemp.at(0).trigger('dblclicked');
		},
		laguDeselected: function() {
			this.$el.removeClass('active');
		}
	});

	MazmurApp.LaguViewList = Marionette.CollectionView.extend({
		tagName: 'ul',
		itemView: MazmurApp.LaguView,
		initialize: function() {
			this.collection.on('change', this.render, this);
		}
	});
	
})(MazmurApp);
