const cheerio = require('cheerio');
const index = require('./index')
const {parse} = require('node-html-parser')
const redisManager = require("./redisManager");
const utils = require('./utils')
const urls = utils.urls
const {FullStockModel, StockModel} = require("../models/stockModel");
const constants = require("constants");
let newsItems = []
let stoppedStocks = []
const keys = utils.keys
const HedgeFundModel = require('../models/stockModel').HedgeFundModel

var mappingHedgeFundItem = (items) => {
    return items.map(i => {
        return HedgeFundModel(i)
    })
}

function getHedgeFundsRanks() {
    index.getData("https://fund.fipiran.ir/api/v1/fund/fundcompare").then(response => {
        if (response.status == 200) {
            let items = mappingHedgeFundItem(response.data.items)
            redisManager.cacheData(keys.hedgeFundRanks, items)
        } else {
            console.log(`hedge funds rank caching error - ${response.statusText}`)
        }
    }).catch(err => {
        console.log(err)
    })

    /*    return index.getData("https://www.fipiran.ir/Symbol?symbolpara=%D8%AD%D9%81%D8%A7%D8%B1%D8%B3").then(response => {
            const root = parse(response);
            cheerio.load(response)
            // nesbat hay mali

        }).catch(err => {
            console.log(err)
        })

        return index.getData("https://www.fipiran.ir/Codal/Ratio").then(response => {
            const root = parse(response);
            cheerio.load(response)
            // nesbat hay mali
            let vars = cheerio.load(cheerio.load(response)('faq_area')._root[0].children[0].data)('div')[19].children[0].children[1].children[1]

        }).catch(err => {
            console.log(err)
        })*/
}

function getNewsFromCrowler() {
    newsItems = []
    return index.getData("https://www.khabaronline.ir/service/Economy/financial-market").then(response => {
        const $ = cheerio.load(response.data);
        for (const element of $('.news')) {
            try {
                let url = "https://www.khabaronline.ir" + element.children[1].children[0].attribs.href
                let title = element.children[3].children[1].children[0].children[0].data
                let message = element.children[3].children[3].children[0].data
                let date_time = element.children[3].children[5].attribs.title
                let image = element.children[1].children[0].children[1].attribs.src
                getNewsDetails(url, title, message, date_time, image)
            } catch (e) {
                console.log(e)
            }
        }
        return newsItems

    }).catch(err => {
        console.log(err)
    })
}

function getStoppedStocks() {
    stoppedStocks = []
    return index.getData(urls.stoppedStocks).then(response => {
        const $ = cheerio.load(response.data);
        for (const element of $('table')["5"].children["3"].childNodes) {
            try {
                stoppedStocks.push(element.children["3"].children["0"].data)
            } catch (e) {
                console.log(e)
            }
        }
        for (const element of $('table')["6"].children["3"].childNodes) {
            try {
                stoppedStocks.push(element.children["3"].children["0"].data)
            } catch (e) {
                console.log(e)
            }
        }
     	 return  getStockDetails(stoppedStocks);

    }).catch(err => {
        console.log(err)
    })
}

function getStockDetails(stoppedStocks) {
    for (const item of stoppedStocks) {
        console.log(item);
        index.getData(encodeURI(urls.stockDetails  + item)).then(response => {
            if (response.status === 200) {
                let simpleModel = StockModel(response.data.name, response.data.full_name, response.data.namad_code, response.data.instance_code, response.data.state,
                    response.data.final_price, response.data.final_price_change, response.data.final_price_change_percent);
                let fullModel = FullStockModel(response.data);
                redisManager.getCachedData(keys.stocksListStopped, (status, stocksList) => {
                    if (status === false){
                        redisManager.cacheData(keys.stocksListStopped, [simpleModel])
                        return
                    }
                    let stockListAfterFilter = JSON.parse(stocksList).filter((a) => a.name !== item)
                    stockListAfterFilter.push(simpleModel)
                    redisManager.cacheData(keys.stocksListStopped, stockListAfterFilter)
                })
                redisManager.getCachedData(keys.stocksStopped, (status, stocksList) => {
                    if (status === false){
                        redisManager.cacheData(keys.stocksStopped, [fullModel])
                        return
                    }
                    let stockListAfterFilter = JSON.parse(stocksList).filter((a) => a.name !== item)
                    stockListAfterFilter.push(fullModel)
                    redisManager.cacheData(keys.stocksStopped, stockListAfterFilter)
                })
            }
        })

    }
  return;
}

function getNewsDetails(url, title, message, date_time, image) {
    return index.getData(encodeURI(url)).then(response => {
        const root = parse(response.data)
        let text = root.querySelector('#item').childNodes[6].text
        let id = utils.convertNumbers2English(image.split("/")[image.split("/").length - 1].replace(".jpg", "")) + url.split("/")[4]
        newsItems.push({
            id: id,
            title: title,
            link: url,
            pic: image,
            thumb: image,
            shortDescription: message,
            text: text,
            date: utils.getPersianDate(date_time),
            pDate: (date_time),
            view: ""
        })
        newsItems.sort(function (a, b) {
            var keyA = new Date(a.date.replace("-", "")),
                keyB = new Date(b.date.replace("-", ""));
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        redisManager.cacheData(keys.news, newsItems)
    })
        .catch(err => {
            console.log(err)
        })

}

module.exports = {
    getNewsFromCrowler,
    getHedgeFundsRanks,
    getStoppedStocks
}
