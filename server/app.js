// Setup cron jobs
SyncedCron.options.collectionName = "cronjobs";

SyncedCron.add({
	name: "Stock Data",
	schedule: function(parser) {
        return parser.text("every 30 minutes"); // parser is a later.parse object
    },
    job: function() {
		Meteor.call("updateStocks");
    }
});


// Startup
Meteor.startup(function() {

    // Start jobs
    SyncedCron.start();

});
