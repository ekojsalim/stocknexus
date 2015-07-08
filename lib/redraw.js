redraw = function(data) {
	console.log("Render");
	var max = data.stockData.reduce(function(a, b) {
		return a[1] > b[1] ? a : b;
	})[1];
	var posmin = data.percentChange.indexOf("-") === -1;
	var icon = posmin ? "arrow_drop_up" : "arrow_drop_down";
	var color = posmin ? "#A6C675" : "#d08276";
    $("#" + data._id).highcharts("StockChart", {
        colors: ["#fff"],
        tooltip: {
            enabled: false,
            crosshairs: false
        },
        chart: {
            backgroundColor: color
        },
        credits: {
            enabled: false
        },
        title: {
            text: "<span class=\"valign-wrapper\"><i class=\"material-icons\">" + icon + "</i>" + data.open + "</span>",
            align: "left",
            useHTML: true,
            style: {
                color: "#fff",
                fontWeight: "bold",
                fontFamily: "Istok Web"
            }
        },
        subtitle: {
			align: "left",
			useHTML: true,
            style: {
                color: "#fff",
                fontWeight: "bold"
            },
            text: data.change + " (" + data.percentChange + ")"
        },
        navigator: {
            enabled: false
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
        yAxis: {
            gridLineWidth: 0,
            labels: {
                enabled: false
            },
			plotLines: [{
				color: "#5B5B5B",
				zIndex: 4,
				width: 0.5,
				dashStyle: "LongDash",
				value: max
			}]
        },
        xAxis: {
            gridLineWidth: 0,
            tickWidth: 0,
            lineWidth: 0,
            labels: {
                enabled: false
            }
        },
        series: [
			{
				type: "line",
				data: data.stockData,
				tooltip: {
					valueDecimals: 2
				}
			}]
    });
};
