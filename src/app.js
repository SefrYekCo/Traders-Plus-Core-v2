const cron = require('node-cron');
const express = require('express');
const apiCall = require('./apiCall');
const utils = require('./utils')
const tokens = utils.apiTokens
const PORT = process.env.PORT || 3000

var app = express()
getAndSaveCryptoHistoryData("12hour")
getAndSaveCryptoHistoryData("1hour")

apiCall.getAndSaveWeatherForecast()
apiCall.getNews()
apiCall.getAndSaveHedgeFundsRank()

cron.schedule('*/10 * * * * *', function () {
    var currenct = new Date()
    apiCall.getAndSaveWeatherForecast()
    apiCall.getCryptos()
    apiCall.getIndexes()
    apiCall.getStocks()
    apiCall.getCurrencies()
    apiCall.getFaraBourse()
    //apiCall.getStocksV2()
    console.log('---------------------');
    console.log('Running Cron Job Every Min  --  ' + currenct.getHours() + ':' + currenct.getMinutes() + ':' + currenct.getSeconds());
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


function getAndSaveCryptoHistoryData(period) {
    apiCall.getAndSaveCryptoHistoryDataV2(tokens.tokenDatabase_api0, "btc", "2020-01-01T00:00:00.000", new Date().toISOString().replace(/\..+/, '')+".000", period)
    apiCall.getAndSaveCryptoHistoryDataV2(tokens.tokenDatabase_api0, "doge", "2020-01-01T00:00:00.000", new Date().toISOString().replace(/\..+/, '')+".000", period)
    apiCall.getAndSaveCryptoHistoryDataV2(tokens.tokenDatabase_api0, "dot", "2020-01-01T00:00:00.000", new Date().toISOString().replace(/\..+/, '')+".000", period)
    apiCall.getAndSaveCryptoHistoryDataV2(tokens.tokenDatabase_api0, "ltc", "2020-01-01T00:00:00.000", new Date().toISOString().replace(/\..+/, '')+".000", period)
    apiCall.getAndSaveCryptoHistoryDataV2(tokens.tokenDatabase_api1, "eth", "2020-01-01T00:00:00.000", new Date().toISOString().replace(/\..+/, '')+".000", period)
    apiCall.getAndSaveCryptoHistoryDataV2(tokens.tokenDatabase_api1, "bnb", "2020-01-01T00:00:00.000", new Date().toISOString().replace(/\..+/, '')+".000", period)
    apiCall.getAndSaveCryptoHistoryDataV2(tokens.tokenDatabase_api1, "bnb", "2020-01-01T00:00:00.000", new Date().toISOString().replace(/\..+/, '')+".000", period)
    apiCall.getAndSaveCryptoHistoryDataV2(tokens.tokenDatabase_api1, "xrp", "2020-01-01T00:00:00.000", new Date().toISOString().replace(/\..+/, '')+".000", period)
}

app.listen(PORT, () => {
    console.log("running on port " + PORT)
})