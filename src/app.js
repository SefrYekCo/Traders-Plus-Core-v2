const cron = require('node-cron');
const express = require('express');
const apiCall = require('./apiCall');
const utils = require('./utils')

const tokens = utils.apiTokens
const PORT = process.env.PORT || 3000

var app = express()
getAndSaveCryptoHistoryData()

cron.schedule('*/10 * * * * *', function () {
    var currenct = new Date()
    apiCall.getCryptos()
    apiCall.getIndexes()
    //apiCall.getStocks()
    apiCall.getCurrencies()
    apiCall.getFaraBourse()
    apiCall.getStocksV2()
    console.log('---------------------');
    console.log('Running Cron Job Every Min  --  ' + currenct.getHours() + ':' + currenct.getMinutes() + ':' + currenct.getSeconds());
});


cron.schedule('00 14 * * * *', function () {
    console.log('Running Cron Job  Every Hour--  ' + currenct.getHours() + ':' + currenct.getMinutes() + ':' + currenct.getSeconds());
    getAndSaveCryptoHistoryData()
})


function getAndSaveCryptoHistoryData() {
    apiCall.getAndSaveCryptoHistoryData(tokens.coin_api0, "BTC/USD", "2015-01-01T00:00:00", new Date().toISOString().replace(/\..+/, ''), "1HRS")
    apiCall.getAndSaveCryptoHistoryData(tokens.coin_api1, "DOGE/USD", "2015-01-01T00:00:00", new Date().toISOString().replace(/\..+/, ''), "1HRS")
    apiCall.getAndSaveCryptoHistoryData(tokens.coin_api2, "DOT/USD", "2015-01-01T00:00:00", new Date().toISOString().replace(/\..+/, ''), "1HRS")
    apiCall.getAndSaveCryptoHistoryData(tokens.coin_api3, "LTC/USD", "2015-01-01T00:00:00", new Date().toISOString().replace(/\..+/, ''), "1HRS")
    apiCall.getAndSaveCryptoHistoryData(tokens.coin_api4, "ETH/USD", "2015-01-01T00:00:00", new Date().toISOString().replace(/\..+/, ''), "1HRS")
    apiCall.getAndSaveCryptoHistoryData(tokens.coin_api5, "BNB/USD", "2015-01-01T00:00:00", new Date().toISOString().replace(/\..+/, ''), "1HRS")
    apiCall.getAndSaveCryptoHistoryData(tokens.coin_api6, "ADA/USD", "2015-01-01T00:00:00", new Date().toISOString().replace(/\..+/, ''), "1HRS")
    apiCall.getAndSaveCryptoHistoryData(tokens.coin_api7, "XRP/USD", "2015-01-01T00:00:00", new Date().toISOString().replace(/\..+/, ''), "1HRS")
}

app.listen(PORT, () => {
    console.log("running on port " + PORT)
})