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
			$('a#save-lagu').click(this.saveLagu);
			$('a#load-lagu').click(this.loadLagu);
			$('input#search-lagu').on('input', this.searchLagu);
			$('#loadLagu').change(this.loadLagu);
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
		saveLagu: function(e) {
			e.preventDefault();
			// MazmurApp.lagus.reset();
			// MazmurApp.lagus.invoke('save');
			var pom = document.createElement('a');
		    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(MazmurApp.lagus.toJSON())));
		    pom.setAttribute('download', 'song.txt');
		    pom.click();
		},
		loadLagu: function(e) {
			if (e.currentTarget.files.length) {
				e.preventDefault();
				e.stopPropagation();
				var f = e.currentTarget.files[0];
			    if (f) {
			      var r = new FileReader();
			      r.onload = function(e) { 
			        var contents = e.target.result;
			        var data = JSON.parse(contents);
			        data.forEach(function (item) {
			        	MazmurApp.lagus.create(item);
			        });
			      }
			      r.readAsText(f);
			    } else { 
			      alert("Gagal me-load file");
			    }
			}
		    
		},
		searchLagu2: function(search_text) {
			var selector = {search_text: search_text};
			var filtered = new MazmurApp.LaguCollection();
			var self = this;
			filtered.reset( MazmurApp.lagus.filter(function ( model ) {
		        return model.match( selector );
		    }));
     		MazmurApp.LaguList.show(filtered);
     		filtered.at(0).select();
		},
		searchLagu: function(e) {
			var search_text = $(e.currentTarget).val();
			var selector = {search_text: $(e.currentTarget).val()};
			var filtered = new MazmurApp.LaguCollection();
			var self = this;
			MazmurApp.LaguCollection.prototype.add = function(item) {
			    var isDupe = this.any(function(_item) { 
			        return _item.get('judul') === item.get('judul');
			    });
			    return isDupe ? false : Backbone.Collection.prototype.add.call(this, item);
			}
			if (search_text.length > 1) {
				$.get('http://smoothie.cloudapp.net/kidung/public/index.php/api/song/'+search_text, function(data) {
					data.forEach(function (item) {
						MazmurApp.lagus.add(new MazmurApp.Lagu(item));
					});
					self.searchLagu2(search_text);
				});
			}
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
			'click a#delete-lagu': 'deleteLagu',
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
			console.log('delete');
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
