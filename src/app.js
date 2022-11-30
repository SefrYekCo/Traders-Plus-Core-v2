const cron = require('node-cron');
const express = require('express');
const apiCall = require('./apiCall');
const utils = require('./utils')
const tokens = utils.apiTokens
const PORT = process.env.PORT || 3000

var app = express()
getAndSaveCryptoHistoryData("12hour")
getAndSaveCryptoHistoryData("1hour")
apiCall.getAndSaveRssOfBourse()
apiCall.getAndSaveRssOfCar()
apiCall.getAndSaveRssOfHousing()
apiCall.getAndSaveRssOfCryptos()
apiCall.getAndSaveRssOfLastNews()
apiCall.getAndSaveRssOfMostViews()
apiCall.getAndSaveRssOfCurrencies()

apiCall.getAndSaveWeatherForecast()
apiCall.getNews()
apiCall.getAndSaveHedgeFundsRank()

cron.schedule(process.env.CRON_SCHEDULE || '*/30 * * * * *', function () {
    var currenct = new Date()
    apiCall.getAndSaveWeatherForecast()
    apiCall.getCryptos()
    apiCall.getIndexes()
    apiCall.getCurrencies()
    apiCall.getFaraBourse()
    //apiCall.getStocksV2()
    console.log('---------------------');
    console.log('Running Cron Job Every Min  --  ' + currenct.getHours() + ':' + currenct.getMinutes() + ':' + currenct.getSeconds());
});

cron.schedule( '*/59 * * * * *', function () {
    var currenct = new Date()
    apiCall.getStocks()
    console.log('---------STOCKS------------');
    console.log('Running stocks --  ' + currenct.getHours() + ':' + currenct.getMinutes() + ':' + currenct.getSeconds());
});

cron.schedule( '*/60 * * * * ', function () {
    var currenct = new Date()
    apiCall.getAndSaveRssOfBourse()
    apiCall.getAndSaveRssOfCar()
    apiCall.getAndSaveRssOfHousing()
    apiCall.getAndSaveRssOfCryptos()
    apiCall.getAndSaveRssOfLastNews()
    apiCall.getAndSaveRssOfMostViews()
    apiCall.getAndSaveRssOfCurrencies()
    console.log('---------RSS------------');
    console.log('Running rss --  ' + currenct.getHours() + ':' + currenct.getMinutes() + ':' + currenct.getSeconds());
});


cron.schedule('*/30 * * * *', function () {
    var currenct = new Date()
    apiCall.getNews()
    apiCall.getAndSaveHedgeFundsRank()
    console.log('***************************');
    console.log('Running Cron Job Every 30 Min  --  ' + currenct.getHours() + ':' + currenct.getMinutes() + ':' + currenct.getSeconds());
});

cron.schedule('00 14 * * * *', function () {
    console.log('Running Cron Job  Every Hour--  ' + currenct.getHours() + ':' + currenct.getMinutes() + ':' + currenct.getSeconds());
    getAndSaveCryptoHistoryData("1hour")
})

cron.schedule('0 0 */12 * * *', function () {
    console.log('Running Cron Job  Every 12 Hour--  ' + currenct.getHours() + ':' + currenct.getMinutes() + ':' + currenct.getSeconds());
    getAndSaveCryptoHistoryData("12hour")
})

let tetherCron = cron.schedule('* * * * *', async function () {

    tetherCron.stop();
    await apiCall.getAndSaveTetherStatus();
    await apiCall.getAndSaveTetherHistory();
    tetherCron.start();

});

function getAndSaveCryptoHistoryData(period) {
    apiCall.getAndSaveCryptoHistoryDataV2(tokens.tokenDatabase_api0, "btc", "2020-01-01T00:00:00.000", new Date().toISOString().replace(/\..+/, '') + ".000", period)
    apiCall.getAndSaveCryptoHistoryDataV2(tokens.tokenDatabase_api1, "doge", "2020-01-01T00:00:00.000", new Date().toISOString().replace(/\..+/, '') + ".000", period)
    apiCall.getAndSaveCryptoHistoryDataV2(tokens.tokenDatabase_api2, "dot", "2020-01-01T00:00:00.000", new Date().toISOString().replace(/\..+/, '') + ".000", period)
    apiCall.getAndSaveCryptoHistoryDataV2(tokens.tokenDatabase_api3, "ltc", "2020-01-01T00:00:00.000", new Date().toISOString().replace(/\..+/, '') + ".000", period)
    apiCall.getAndSaveCryptoHistoryDataV2(tokens.tokenDatabase_api4, "eth", "2020-01-01T00:00:00.000", new Date().toISOString().replace(/\..+/, '') + ".000", period)
    apiCall.getAndSaveCryptoHistoryDataV2(tokens.tokenDatabase_api5, "bnb", "2020-01-01T00:00:00.000", new Date().toISOString().replace(/\..+/, '') + ".000", period)
    apiCall.getAndSaveCryptoHistoryDataV2(tokens.tokenDatabase_api4, "bnb", "2020-01-01T00:00:00.000", new Date().toISOString().replace(/\..+/, '') + ".000", period)
    apiCall.getAndSaveCryptoHistoryDataV2(tokens.tokenDatabase_api3, "xrp", "2020-01-01T00:00:00.000", new Date().toISOString().replace(/\..+/, '') + ".000", period)
}

app.listen(PORT, () => {
    console.log("running on port " + PORT)
})