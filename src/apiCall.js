const axios = require('axios')
const StockModel = require('../models/stockModel').StockModel
const FullStockModel = require('../models/stockModel').FullStockModel
const CryptoHistoryModel = require('../models/stockModel').CryptoHistoryModel
const IndexModel = require('../models/indexModel')
const CryptoModel = require('../models/cryptocurrencyModel')
const CurrencyModel = require('../models/currencyModel')

const redisManager = require('./redisManager')
const irStock = require('./irStocksAPI')
const utils = require('./utils')

const urls = utils.urls
const keys = utils.keys


const metalSlugs = ["SEKE_BAHAR", "SEKE_EMAMI", "SEKE_NIM", "SEKE_ROB", "SEKE_GERAMI", "TALA_MESGHAL", "TALA_24", "TALA_18", "ONS"];
var extractMetals = (currencies) => {
    var metals = currencies.filter(obj => metalSlugs.includes(obj.slug) || obj.slug.length === 0)
    return metals.map(i => {
        return CurrencyModel(i)
    })
}

var extractCurrencies = (allcurrencies) => {
    var currencies = allcurrencies.filter(obj => (!metalSlugs.includes(obj.slug)) && obj.slug.length !== 0)
    return currencies.map(i => {
        return CurrencyModel(i)
    })
}

var indexesNeeded = [
    "شاخص كل",
    "شاخص كل (هم وزن)",
    "شاخص قيمت(وزني-ارزشي)",
    "شاخص قيمت (هم وزن)",
    "شاخص صنعت",
    "شاخص50شركت فعالتر"
]

var mapingStockList = (stocks) => {
    return stocks.map(i => {
        return StockModel(
            i.name,
            i.full_name,
            i.symbol_code,
            i.instance_code,
            i.state,
            i.final_price,
            i.final_price_change,
            i.final_price_change_percent,
        )
    })
}

var mapingCryptoList = (cryptos) => {
    return cryptos.map(i => {
        return CryptoModel(
            i.symbol,
            i.name,
            i.icon,
            i.price,
            i.change_percent_24h,
            i.market_cap,
        )
    })
}


var mapingIndexList = (indexes) => {
    var temps = []
    for (var i in indexesNeeded) {
        var index = indexes.find(o => o.name === indexesNeeded[i])
        temps.push(index)
    }
    return temps.map(i => {
      return IndexModel(
          i.name,
          i.value,
          i.change,
          i.percent,
          i.max,
          i.min,
      )
  })
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
        console.log('currencies count: ' + currencies.length + '\t' + 'metals count: ' + metals.length)
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
        var tempIndexes = mapingIndexList(indexes)
        redisManager.cacheData(keys.indexes, tempIndexes)
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
        var tempCryptos = mapingCryptoList(cryptos)
        redisManager.cacheData(keys.cryptos, tempCryptos)
        console.log('cryptos count: ' + cryptos.length)
    }).catch(function (error) {
        console.log(error);
    })
}

function getAndSaveCryptoHistoryData(token, symbol_id, time_start, time_end, period_id) {
    axios({
        method: 'get',
        headers: {'X-CoinAPI-Key': token},
        url: urls.cryptoHistoryV1 + `${symbol_id}/history?period_id=${period_id}&time_start=${time_start}&time_end=${time_end}&limit=100000`
    }).then(function (response) {
        var strResponse = JSON.parse(JSON.stringify(response.data))
        var history = strResponse.map(i => {
            return CryptoHistoryModel(i)
        })
        redisManager.cacheData(keys.historyData + '_' + symbol_id, history)
        console.log('history record count: ' + history.length)
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
        var stocksWithDetails = stocks.map(i => {
            return FullStockModel(i)
        })
        redisManager.cacheData(keys.stocksList, stockList)
        redisManager.cacheData(keys.stocks, stocksWithDetails)
        console.log('stocks count: ' + stocks.length)
    }).catch(function (error) {
        console.log(error);
    })
}

function getStocksV2  () {
  irStock.getStocks().then(data => {
    let dataParts = data.split('@')
    if (dataParts.length < 5) {
      reject('Wrong data format')
      console.log('Wrong data format')
      return
    }
    let stocks = dataParts[2].split(';')
    let stockObjects = stocks.map(stock => {
      stockProps = stock.split(',')
      // invalid record
      if (stockProps.length < 21) return
      return FullStockModel(stockProps)
    })
    //stockObjects = stockObjects.filter(stock => stock)
    console.log('stocks count: ' + stockObjects.length)
    let stockList = mapingStockList(stockObjects)
    redisManager.cacheData(keys.stocksList, stockList)
    redisManager.cacheData(keys.stocks, stockObjects)
  }).catch(err =>{
    console.log('error: ' + `${err.message}`)
    })
}


var getFaraBourse = () => {
  axios({
    method: 'get',
    url: urls.faraBourse
  }).then(function (response) {
    var json = JSON.parse(JSON.stringify(response.data))
    var faraBourse = json['fara-bourse']
    var farabourseModel = IndexModel(
      "شاخص فرابورس",
      faraBourse.index.replace(",", ""),
      faraBourse.index_change.replace(",", ""),
      faraBourse.index_change_percent.replace(",", ""),
      "0",
      "0"
    )
    redisManager.getCachedData(keys.indexes, (status, indexes) => {
      if (status) {
        var allIndexes = []
        allIndexes = JSON.parse(indexes)

        for( var i = 0; i < allIndexes.length; i++){ 
          if ( allIndexes[i].name === "شاخص فرابورس") {
            allIndexes.splice(i, 1);
          }
        }
        allIndexes.push(farabourseModel)
        redisManager.cacheData(keys.indexes, allIndexes)
      }
    })
    
  }).catch(function (error) {
    console.log(error);
  })
}


module.exports = {

    getCurrencies,
    getIndexes,
    getCryptos,
    getStocks,
    getStocksV2,
    getFaraBourse,
    getAndSaveCryptoHistoryData

}