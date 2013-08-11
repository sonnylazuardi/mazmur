(function(MazmurApp) {
	MazmurApp.addInitializer(function() {
		MazmurApp.Schedule.init();
		MazmurApp.Schedule.show(MazmurApp.schedules);
	});

	MazmurApp.Schedule = {
		init: function() {
			MazmurApp.schedules = new MazmurApp.LaguCollection();
		},
		show: function(lagus) {
			var scheduleList = new MazmurApp.LaguViewList({
				collection: lagus
			});
			MazmurApp.scheduleList.show(scheduleList);
		}
	};
})(MazmurApp);