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
		initialize: function() {
			var singleSelect = new Backbone.Picky.SingleSelect(this);
    	_.extend(this, singleSelect);
    	MazmurApp.vent.bind("prevLagu", this.prevLagu, this);
    	MazmurApp.vent.bind("nextLagu", this.nextLagu, this);
		},
		localStorage: new Backbone.LocalStorage("LaguCollection"),
		prevLagu: function() {
			var index = this.indexOf(this.selected);
	    if (index > 0){
	      index -= 1;
	    } else {
	      index = this.length - 1;
	    }
	    var lagu = this.at(index);
	    lagu.select();
		},

		nextLagu: function() {
			var index = this.indexOf(this.selected);
	    if (index < this.length - 1){
	      index += 1;
	    } else {
	      index = 0;
	    }
	    var lagu = this.at(index);
	    lagu.select();
		}
	});

})(MazmurApp);