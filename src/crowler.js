const cheerio = require('cheerio');
const index = require('./index')
const { parse }  = require('node-html-parser')
const redisManager = require("./redisManager");
const utils = require("./utils");
const {getPersianDate} = require("./utils");
let items = []
let count = 0
const keys = utils.keys

function getNewsFromCrowler(itemsNew) {
    items = itemsNew
    return index.getData("https://www.khabaronline.ir/service/Economy/financial-market").then(response => {
        const $ = cheerio.load(response);
        for (const element of $('.news')) {
            try {
                let url = "https://www.khabaronline.ir" + element.children[1].children[0].attribs.href
                let title = element.children[3].children[1].children[0].children[0].data
                let message = element.children[3].children[3].children[0].data
                let date_time = element.children[3].children[5].attribs.title
                let image = element.children[1].children[0].children[1].attribs.src
                getDetails(url, title, message, date_time, image)
            }catch (e){
                console.log(e)
            }
        }
        return items

    }).catch(err => {
        count -=1
        console.log(err)
    })
}
function getDetails(url, title, message, date_time, image) {
    return  index.getData(encodeURI(url)).then(response => {
        const root = parse(response)
        let text = root.querySelector("main").childNodes[1].childNodes[1].childNodes[1].childNodes[7].childNodes[6].text
        let id = utils.convertNumbers2English(image.split("/")[image.split("/").length - 1].replace(".jpg", ""))
        items.push( {
            id: id,
            title: title,
            link:url,
            pic:image,
            thumb:image,
            shortDescription: message,
            text: text,
            date: utils.getPersianDate(date_time),
            pDate: (date_time),
            view: ""
        })
        redisManager.cacheData(keys.news, items)
    })
        .catch(err => {
            console.log(err)
        })

}
module.exports = {
    getNewsFromCrowler
}