var lirikData = [];

var MazmurApp = new Marionette.Application();

MazmurApp.addRegions({
	laguList: '#lagu-list',
	lirikList: '#lirik-list',
});

MazmurApp.on('initialize:before', function(options){
	MazmurApp.lagus = new MazmurApp.LaguCollection(options.lagus);
	MazmurApp.lagus.fetch();
});