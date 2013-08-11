(function(MazmurApp) {
	MazmurApp.addInitializer(function() {
		MazmurApp.AddEditLagu.init();
	});

	MazmurApp.AddEditLagu = {
		init: function () {
			this.mainRegion = MazmurApp.laguForm;
			$('a#removeAdd').click(this.removeAdd);
		},
		addEditLagu: function(lagu) {
			var addEditLaguView = new AddEditLaguView({
				model: lagu
			});
			this.mainRegion.show(addEditLaguView);
			MazmurApp.laguForm.$el.hide().slideDown('slow');
		}
	};

	var AddEditLaguView = Marionette.ItemView.extend({
		template: '#form-lagu-template',
		events: {
			'click #simpan': 'saveLagu',
			'click #removeAdd': 'removeAdd',
		},
		saveLagu: function (e) {
			e.preventDefault();
			var data = Backbone.Syphon.serialize(this);
			this.collection = MazmurApp.lagus;
			if (MazmurApp.lagus.selected) {
				this.model.set(data);
				this.model.save();
				MazmurApp.lagus.deselect();
				MazmurApp.lagus.select(this.model);
			} else {
				this.collection.create(data, {
					success: function(lagu) {
						MazmurApp.lagus.add(lagu);
						MazmurApp.lagus.select(lagu);
					}
				});
			}
			MazmurApp.laguForm.reset();
			MazmurApp.laguForm.$el.show().slideUp('slow');
		},
		removeAdd: function() {
			MazmurApp.laguForm.$el.show().slideUp('slow');
		}
	});


})(MazmurApp);