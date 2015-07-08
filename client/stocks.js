Template.stocks.helpers({
	company: function() {
		return Stocks.find();
	}
});

Template.stocks.events({
	"click .trigger": function() {
		$("#modalnew").openModal();
	},
	"click #submitNew": function() {
		var input = $("#ticker").val().toUpperCase();
		Meteor.call("addStocks", input, function(a, b) {
			Materialize.toast(b, 4000);
		});
	},
	"click .delete": function() {
		$("#modaldelete").openModal();
	},
	"click #submitDelete": function() {
		var input = $("#ticking").val().toUpperCase();
		console.log(input);
		var id = Stocks.findOne({symbolName: input})._id;
		console.log(id);
		Stocks.remove(id, function(a, b) {
			console.log(a, b);
			if(b > 0) {
				Materialize.toast("Removed!", 3000);
			}
		});
	},
	"click .allChart": function() {
		var data = Stocks.find().fetch().map(function(item) {
			return {
				type: "line",
				name: item.symbolName,
				data: item.stockData,
				tooltip: {
					valueDecimals: 2
				}
			};
		});
		$("#modalStock").highcharts("StockChart", {
        chart: {
            backgroundColor: "white"
        },
        navigation: {
            buttonOptions: {
                enabled: false
            }
        },
        scrollbar: {
            enabled: false
        },
        rangeSelector: {
            enabled: false
        },
		navigator: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        title: {
            text: "All",
            style: {
                fontWeight: "bold",
                fontFamily: "Istok Web"
            }
        },
        series: data
		});
		$("#modalGraph").openModal();
	}
});

Template.stocks.onRendered(function(){
	this.subscribe("stocks");
});
