const axios = require('axios')
const StockModel = require('../models/stockModel').StockModel
const FullStockModel = require('../models/stockModel').FullStockModel
const CryptoHistoryModel = require('../models/stockModel').CryptoHistoryModel
const WeatherForecastModel = require('../models/stockModel').WeatherForecastModel
const NewsModel = require('../models/newsModel')
const IndexModel = require('../models/indexModel')
const CryptoModel = require('../models/cryptocurrencyModel')
const CurrencyModel = require('../models/currencyModel')
const crowler = require('./crowler')

const redisManager = require('./redisManager')
const irStock = require('./irStocksAPI')
const utils = require('./utils')

const urls = utils.urls
const keys = utils.keys


const metalSlugs = ["SEKE_BAHAR", "SEKE_EMAMI", "SEKE_NIM", "SEKE_ROB", "SEKE_GERAMI", "TALA_MESGHAL", "TALA_24", "TALA_18", "ONS", "PALA", "ONSNOGHRE", "ONSPALA", "TALADAST2", "NOGHRE999"];
var extractMetals = (currencies) => {
    var metals = currencies.filter(obj => metalSlugs.includes(obj.slug))
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
            i.namad_code,
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
        let p_ch_p_d = i["1d"]["price_change_pct"]
        return CryptoModel(
            i.symbol,
            i.name,
            i.logo_url,
            i.price,
            i["1d"]["price_change_pct"],
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

var getNews = () => {
    // crowler.getNewsFromCrowler()
         axios({
            method: 'get',
            url: urls.news
        }).then(function (response) {
            var strResponse = JSON.parse(JSON.stringify(response.data))
            var history = strResponse.map(i => {
                return NewsModel(i)
            })
            redisManager.cacheData(keys.news, history)
            console.log('news count: ' + history.length)
        }).catch(function (error) {
            console.log(error);
        })
}
var getAndSaveHedgeFundsRank = () => {
    crowler.getHedgeFundsRanks()
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
        url: urls.nomiceURl
    }).then(function (response) {
        var cryptos = JSON.parse(JSON.stringify(response.data))
        cryptos = cryptos.filter(obj => obj.status != "dead" && obj.status != "inactive")
        var tempCryptos = mapingCryptoList(cryptos)
        redisManager.cacheData(keys.cryptos, tempCryptos)
        console.log('cryptos count: ' + cryptos.length)
    }).catch(function (error) {
        console.log(error.response.data);
    })
}

function getAndSaveCryptoHistoryData(token, symbol_id, time_start, time_end, period_id) {
    axios({
        method: 'get',
        headers: { 'X-CoinAPI-Key': token },
        url: urls.cryptoHistoryV1 + `${symbol_id}/history?period_id=${period_id}&time_start=${time_start}&time_end=${time_end}&limit=100000`
    }).then(function (response) {
        var strResponse = JSON.parse(JSON.stringify(response.data))
        var history = strResponse.map(i => {
            return CryptoHistoryModel(i.time_period_start, i.time_period_end, i.time_open, i.time_close, i.rate_open, i.rate_high, i.rate_low, i.rate_close)
        })
        redisManager.cacheData(keys.historyData + '_' + symbol_id, history)
        console.log('history record count: ' + history.length)
    }).catch(function (error) {
        console.log(error.response.data);
    })
}

function getAndSaveCryptoHistoryDataV2(token, symbol_id, time_start, time_end, period_id) {
    axios({
        method: 'get',
        url: urls.cryptoHistoryV2 + `?ids=${symbol_id}&end=${time_end}&start=${time_start}&period=${period_id}&key=${token}`
    }).then(function (response) {
        var strResponse = JSON.parse(JSON.stringify(response.data)).results[0].candles
        var history = strResponse.map(i => {
            return CryptoHistoryModel(i.time, i.open, i.high, i.low, i.close, i.volume, i.volume_quote)
        })
        redisManager.cacheData(keys.historyData + '_' + symbol_id + "_" + period_id, history)
        console.log('history record count: ' + history.length)
    }).catch(function (error) {
        console.log(error);
    })
}

function getAndSaveWeatherForecast() {
    axios({
        method: 'get',
        url: urls.weatherForecast
    }).then(function (response) {
        var strResponse = JSON.parse(JSON.stringify(response.data))
        var history = strResponse.map(i => {
            return WeatherForecastModel(i)
        })
        redisManager.cacheData(keys.weatherForecast, history)
        console.log('weatherforecast count: ' + history.length)
    }).catch(function (error) {
        console.log(error.response.data);
    })
}

var getStocks = () => {
    crowler.getStoppedStocks()

    axios({
        method: 'get',
        url: urls.stocks
    }).then(function (response) {
        var stocks = JSON.parse(JSON.stringify(response.data))
        var stockList = mapingStockList(stocks)
        var stocksWithDetails = stocks.map(i => {
            return FullStockModel(i)
        })
        redisManager.getCachedData(keys.stocksStopped, (status, stocksStopped) => {
            try {
                for (const item of JSON.parse(stocksStopped)) {
                    stocksWithDetails = stocksWithDetails.filter((a) => a.name !== item.name)
                    stocksWithDetails.push(item)
                }
            } catch (error) {

            }
            redisManager.cacheData(keys.stocks, stocksWithDetails)
        })
        redisManager.getCachedData(keys.stocksListStopped, (status, stocksListStopped) => {
            try {
                for (const item of JSON.parse(stocksListStopped)) {
                    stockList = stockList.filter((a) => a.name !== item.name)
                    stockList.push(item)
                }
            } catch (error) {

            }
            redisManager.cacheData(keys.stocksList, stockList)
        })
        console.log('stocks count: ' + stocks.length)
    }).catch(function (error) {
        console.log(error);
    })
}

function getStocksV2() {
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
    }).catch(err => {
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

                for (var i = 0; i < allIndexes.length; i++) {
                    if (allIndexes[i].name === "شاخص فرابورس") {
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


const getAndSaveTetherStatus = async () => {
    try {
        const { data: { data: { currencies: { USDT } } } } = await axios({
            method: 'get',
            url: urls.tetherStatus
        });
        redisManager.cacheData(keys.USDTStatus, USDT);
    } catch (error) {
        console.log('Exception in getAndSaveTetherStatus() (apiCall.js)', error)
    }
}

const getAndSaveTetherHistory = async () => {
    try {
        const { data: { data: { prices } } } = await axios({
            method: 'get',
            url: urls.tetherChart
        });
        redisManager.cacheData(keys.USDTHistory, prices.slice(-45));
    } catch (error) {
        console.log('Exception in getAndSaveTetherHistory() (apiCall.js)', error)
    }
}


module.exports = {

    getCurrencies,
    getIndexes,
    getCryptos,
    getStocks,
    getStocksV2,
    getFaraBourse,
    getAndSaveCryptoHistoryData,
    getAndSaveCryptoHistoryDataV2,
    getAndSaveWeatherForecast,
    getNews,
    getAndSaveHedgeFundsRank,
    getAndSaveTetherStatus,
    getAndSaveTetherHistory
}