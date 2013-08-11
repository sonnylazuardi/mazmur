(function(MazmurApp) {

	MazmurApp.Lagu = Backbone.Model.extend({
		initialize: function() {
			var selectable = new Backbone.Picky.Selectable(this);
    	_.extend(this, selectable);
		},
		selector: null,
		match: function(select) {
			this.selector = select;
			return (
				select.search_text.length == 0 ||
				(select.search_text.length > 0 && 
					_.chain(
						_.values(
							_.pick(this.attributes, 'judul', 'lirik')
						)
					)
					.any(
						function (s) {
							return s.toLowerCase().indexOf(select.search_text.toLowerCase()) > -1;
						}
					)
					.value()
				)
			);
		}
	});

	MazmurApp.LaguCollection = Backbone.Collection.extend({
		model: MazmurApp.Lagu,
		// url: '/lagus',
		initialize: function(options) {
			var singleSelect = new Backbone.Picky.SingleSelect(this);
    	_.extend(this, singleSelect);
		},
		localStorage: new Backbone.LocalStorage("LaguCollection")
	});

})(MazmurApp);