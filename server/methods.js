Meteor.methods({
    updateStocks: function() {
        this.unblock();
        console.log("Method called!");
        Stocks.find({}).fetch().forEach(function(stock) {
            console.log("DB queried");
            try {
                var res = HTTP.get("https://www.quandl.com/api/v1/datasets/WIKI/" + stock.symbolName + ".json?column=11&trim_start=2015-01-01&auth_token=" + Meteor.settings.quandlKey);
                //Yahoo thingy
                var url = "http://query.yahooapis.com/v1/public/yql?";
                var query = encodeURIComponent("select * from yahoo.finance.quotes where symbol in (\"" + stock.symbolName + "\")");
                var finUrl = url + "q=" + query + "&format=json&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env";
                console.log(finUrl);
                var res2 = HTTP.get(finUrl);
                var data = {};
                //Quandl data
                data.symbolName = res.data.code;
                data.name = res.data.name.substr(0, res.data.name.indexOf("(" + res.data.code + ")") - 1);
                data.stockData = res.data.data.reverse();
                //Yahoo data
                var result = res2.data.query.results.quote;
                data.dividendYield = result.DividendYield || "-";
                data.marketCap = result.MarketCapitalization;
                data.percentChange = result.PercentChange;
                data.change = result.Change;
                data.previousClose = result.PreviousClose;
                data.peRatio = result.PERatio || "-";
                data.open = result.Open;
                data.high = result.DaysHigh;
                data.low = result.DaysLow;
                Stocks.update({_id: stock._id}, data);
                console.log("Updated Successfully");
            }
            catch(e) {
                console.log(e);
            }
        });
        console.log("Data updated!");
    },
    addStocks: function(symbol) {
        console.log("Called!");
        this.unblock();
        try {
            var res = HTTP.get("https://www.quandl.com/api/v1/datasets/WIKI/" + symbol + ".json?column=11&trim_start=2015-01-01&auth_token=" + Meteor.settings.quandlKey);
            //Yahoo thingy
            var url = "http://query.yahooapis.com/v1/public/yql?";
            var query = encodeURIComponent("select * from yahoo.finance.quotes where symbol in (\"" + symbol + "\")");
            var finUrl = url + "q=" + query + "&format=json&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env";
            var res2 = HTTP.get(finUrl);
            var data = {};
            //Quandl data
            data.symbolName = res.data.code;
            data.name = res.data.name.substr(0, res.data.name.indexOf("(" + res.data.code + ")") - 1);
            data.stockData = res.data.data.reverse();
            //Yahoo data
            var result = res2.data.query.results.quote;
            data.dividendYield = result.DividendYield || "-";
            data.marketCap = result.MarketCapitalization;
            data.percentChange = result.PercentChange;
            data.change = result.Change;
            data.previousClose = result.PreviousClose;
            data.peRatio = result.PERatio || "-";
            data.open = result.Open;
            data.high = result.DaysHigh;
            data.low = result.DaysLow;
            Stocks.insert(data);
            console.log("Successfull");
            return "Success";
        }
        catch(e) {
            return e.toString().replace(/[\{\}\"]/gi, "");
        }
    }
});
