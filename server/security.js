Stocks.permit("insert").exceptProps(["name", "stockData"]).apply();
Stocks.permit("remove").apply();
