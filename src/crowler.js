const cheerio = require('cheerio');
const index = require('./index')
const {parse} = require('node-html-parser')
const redisManager = require("./redisManager");
const utils = require("./utils");
let newsItems = []
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
                getDetails(url, title, message, date_time, image)
            } catch (e) {
                console.log(e)
            }
        }
        return newsItems

    }).catch(err => {
        console.log(err)
    })
}

function getDetails(url, title, message, date_time, image) {
    return index.getData(encodeURI(url)).then(response => {
        const root = parse(response.data)
        let text = root.querySelector("main").childNodes[1].childNodes[1].childNodes[1].childNodes[7].childNodes[6].text
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
    getHedgeFundsRanks
}