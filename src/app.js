
const cron = require('node-cron');
const express = require('express');
const apiCall = require('./apiCall');

const PORT = process.env.PORT || 3000

var app = express()

cron.schedule('*/1000 * * * * *', function() {
    var currenct = new Date()
    apiCall.getCryptos()
    apiCall.getIndexes()
    apiCall.getStocks()
    apiCall.getCurrencies()
    console.log('---------------------');
    console.log('Running Cron Job  --  ' + currenct.getHours() + ':' + currenct.getMinutes() + ':' + currenct.getSeconds());
});


app.listen(PORT, ()=> {
    console.log("running on port " + PORT)
})