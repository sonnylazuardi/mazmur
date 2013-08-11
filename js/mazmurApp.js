var lirikData = [];
var currentBg;

var MazmurApp = new Marionette.Application();

MazmurApp.addRegions({
	laguList: '#lagu-list',
	laguForm: '#lagu-form',
	lirikList: '#lirik-list',
	previewList: '#preview-list',
	scheduleList: '#schedule-list'
});

MazmurApp.on('initialize:before', function(options){
	MazmurApp.lagus = new MazmurApp.LaguCollection();
	MazmurApp.lagus.fetch();
});