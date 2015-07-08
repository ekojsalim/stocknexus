Template.stock.helpers({
    company: function() {
        return Template.currentData().name;
    }
});

Template.stock.events({
	"click #openGraph": function() {
		var self = this;
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
            text: self.name,
            style: {
                fontWeight: "bold",
                fontFamily: "Istok Web"
            }
        },
        series: [
			{
				type: "line",
				name: "Stock price",
				data: self.stockData,
				tooltip: {
					valueDecimals: 2
				}
			}]
		});
		$("#modalGraph").openModal();
	}
});

Template.stock.onRendered(function(){
    this.autorun(function() {
        redraw(Template.currentData());
    });
});

