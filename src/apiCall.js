const axios = require('axios');
const StockModel = require('../models/stockModel');
const redisManager = require('./redisManager');
const utils = require('./utils');

const urls = utils.urls
const keys = utils.keys 

var metalSlugs = ["SEKE_BAHAR", "SEKE_EMAMI", "SEKE_NIM", "SEKE_ROB", "SEKE_GERAMI", "TALA_MESGHAL", "TALA_24", "TALA_18", "ONS"]
var extractMetals = (currencies) => {
  var metals = currencies.filter(obj => metalSlugs.includes(obj.slug) || obj.slug.length == 0)
  return metals
}

var extractCurrencies = (allcurrencies) => {
    var currencies = allcurrencies.filter(obj => (!metalSlugs.includes(obj.slug)) && obj.slug.length != 0)
    return currencies
}

var mapingStockList = (stocks) => {
    var array = stocks.map( i => { 
        return StockModel(
            i.name,
            i.namad_code,
            i.state,
            i.final_price,
            i.final_price_change,
            i.final_price_change_percent,
        )
      })
    return array
}

var getCurrencies = () => {
    axios({
      method: 'get',
      url: urls.currencies
    }).then(function (response) {
      var allcurrencies = JSON.parse(JSON.stringify(response.data)).data
      var metals = extractMetals(allcurrencies)
      redisManager.cacheData(keys.metals, metals)
      var currencies = extractCurrencies(allcurrencies)
      redisManager.cacheData(keys.currencies, currencies)
      console.log('currencies count: '+ currencies.length + '\t' + 'metals count: '+ metals.length)
    }).catch(function (error) {
      console.log(error);
    })
}

var getIndexes = () => {
  axios({
    method: 'get',
    url: urls.indexes
  }).then(function (response) {
    var indexes = JSON.parse(JSON.stringify(response.data))
    redisManager.cacheData(keys.indexes, indexes)
    console.log('indexes count: '+ indexes.length)
  }).catch(function (error) {
    console.log(error);
  })
}

var getCryptos = () => {
  axios({
    method: 'get',
    url: urls.cryptos
  }).then(function (response) {
    var cryptos = JSON.parse(JSON.stringify(response.data)).data
    redisManager.cacheData(keys.cryptos, cryptos)
    console.log('cryptos count: '+ cryptos.length)
  }).catch(function (error) {
    console.log(error);
  })
}

var getStocks = () => {
  axios({
    method: 'get',
    url: urls.stocks
  }).then(function (response) {
    var stocks = JSON.parse(JSON.stringify(response.data))
    var stockList = mapingStockList(stocks)
    redisManager.cacheData(keys.stocksList, stockList)
    redisManager.cacheData(keys.stocks, stocks)
    console.log('stocks count: '+ stocks.length)
  }).catch(function (error) {
    console.log(error);
  })
}

module.exports = {

    getCurrencies,
    getIndexes,
    getCryptos,
    getStocks

}