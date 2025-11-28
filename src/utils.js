const shamsi = require('jalali-moment')

const baseURL = 'http://apis.sourcearena.ir/api/?token=75243df886bbfb64e6962751a91a7873'
const baseURLNews = 'http://apis.sourcearena.ir/api/news.php?token=75243df886bbfb64e6962751a91a7873'
const tseBaseURL = "http://tsetmc.com/"
const tseBaseURLV2 = "http://new.tsetmc.com/"
const coinAPIBaseURL = "https://rest.coinapi.io/"
const tokenDatabaseAPIBaseURL = "https://api.tokendatabase.com/"
const nomiceBaseURl = "https://api.nomics.com/"
const curencies = "AAVE,ADA,ALGO,AMPL,ARK,ATOM,BAT,BAL,BCD,BCH,BNB,BNTY,BSV,BTC,BTG,BTT,BURST,COMP,CRO,DAI,DASH,DCR,DGB,DOGE,EOS,ETC,ETH" +
    ",ENJ,EQL,FTM,FUSE,GAS,GRS,ONE,HT,ICX,IOTA,KIN,KMD,LEND,LINK,LSK,LTC,MTA,NANO,NEBL,NEO,ONG,ONT,QTUM,RVN,REP,RSK,SIERRA,SMART,STRAX,SWTH,TLOS" +
    ",TPAY,TRX,TWT,UBQ,USDC,USDT,VET,VSYS,VTHO,WAN,WAVES,XDC,XEM,XLM,XMR,XRP,XTZ,XVG,XZC,YFI,ZEC,ZIL,ZRX"


const keys = {
    currencies: 'currencies',
    news: 'news',
    metals: 'metals',
    indexes: 'indexes',
    cryptos: 'cryptos',
    stocks: 'stocks',
    stocksList: 'stocksList',
    stocksStopped: 'stocksStopped',
    stocksListStopped: 'stocksListStopped',
    faraBourse: 'faraBourse',
    cryptoHistoryV1: 'cryptoHistoryV1',
    cryptoHistoryV2: 'cryptoHistoryV2',
    historyData: 'history_data',
    weatherForecast: 'weather_forecast',
    hedgeFundRanks: 'hedge_funds_rank',
    USDTStatus: 'usdt_status',
    USDTHistory: 'usdt_history',
    BourseRss: 'bourse_rss',
    carRss: 'car_rss',
    housingRss: 'housing_rss',
    currenciesRss: 'currencies_rss',
    cryptoRss: 'crypto_rss',
    lastNewsRss: 'last_news_rss',
    mostViewRss: 'most_view_rss'
}

const urls = {
    currencies: baseURL + "&currency",
    stockDetails: baseURL + "&name=",
    stoppedStocks: "https://www.seo.ir/Page/lDLooqs7S17iBJ-jxFQ8Ww==/%D9%86%D9%85%D8%A7%D8%AF%D9%87%D8%A7%DB%8C-%D9%85%D8%AA%D9%88%D9%82%D9%81%D8%8C-%D8%AA%D8%B9%D9%84%DB%8C%D9%82-%D8%B4%D8%AF%D9%87-%D9%88-%D9%81%D8%B9%D8%A7%D9%84-%D8%AA%D8%AD%D8%AA-%D8%A7%D8%AD%D8%AA%DB%8C%D8%A7%D8%B7",
    news: baseURLNews + "&p=1",
    indexes: baseURL + "&market=indices",
    cryptos: baseURL + "&crypto_v2=all",
    stocks: baseURL + "&all&type=2",
    faraBourse: baseURL + "&market=market_farabourse",
    tseStocks: tseBaseURL + "tsev2/data/MarketWatchPlus.aspx",
    cryptoHistoryV1: coinAPIBaseURL + "v1/exchangerate/",
    cryptoHistoryV2: tokenDatabaseAPIBaseURL + "v1/indices/vwap5/ohlcv",
    nomiceURl: nomiceBaseURl + "v1/currencies/ticker?key=50640cf10da922ef2bc3b286e40fb5363b34389b&ids=" + curencies + "&interval=1d&convert=USDT",
    weatherForecast: tseBaseURLV2 + "weatherforecast",
    tetherChart: "https://api.tetherland.com/chart",
    tetherStatus: "https://api.tetherland.com/currencies",
    rssBourse:"https://www.fardayeeghtesad.com/rss/tp/20",
    rssCrypto:"https://www.fardayeeghtesad.com/rss/tp/57",
    rssCurrency:"https://www.fardayeeghtesad.com/rss/tp/56",
    rssCar:"https://www.fardayeeghtesad.com/rss/tp/19",
    rssHousing:'https://www.fardayeeghtesad.com/rss/tp/71',
    rssMostViews:"https://www.fardayeeghtesad.com/rss/pl/232",
    rssLastNews:"https://www.fardayeeghtesad.com/rss"

}

const apiTokens = {
    //https://docs.coinapi.io/
    coin_api0: "16E3ED0A-FDFB-47D8-B7A4-0B718224568D",
    coin_api1: "C47417AF-3290-48B8-98E1-3B0F8736E00D",
    coin_api2: "D3D5C28A-F35A-4990-ACA5-CDCDB4420D03",
    coin_api3: "191EDE74-A6CA-4E46-8E79-CF38FC0EB708",
    coin_api4: "06B90324-C33C-450B-81AD-5816DD9BFE74",
    coin_api5: "88F65E1C-5867-4133-9F61-E9FF367665BE",
    coin_api6: "C687125B-26BA-42B1-BD1A-BF2F65DFAA54",
    coin_api7: "C89CB675-4947-4563-9308-C806E3B045B4",
    coin_api8: "F0EA49A4-D727-456C-8BA2-0F11BC319C4D",
    tokenDatabase_api0: "AUNUCWhsafR3VXgU4AZ_UV1c8PQIHY0YD9XtQGVqjXH4mqa7cof9g9UEmOQO",
    tokenDatabase_api1: "ARWu-gtqt3EpG85g75av1gqicjXJr7vWDA4Rli2W1ZuvnwQWRRcypGfhCfJO",
    tokenDatabase_api2: "ATvIk6pUL7f6FOTAXcun9uHjfFJGOB_tvtCSYsyhBD2lV_qp1zn3cnTDwIPC",
    tokenDatabase_api3: "AV-eiHDDuJpqiw47Arwlx0-p7xMWy-6EEDv57Z7OZbOdDk1a_Du655I6D4pS",
    tokenDatabase_api4: "ARgxaeS3yo53hi0w3bchMtqi5jTHxIRkI3YX-fbG7jCs2L6TX2WHZoLwrb79",
    tokenDatabase_api5: "AQrnNtUI1H-Vve77UhpCR1knZOUz50MU5HM1vYgfn4WEXGh0Yh6zbUtyUy16"
}

function convertNumbers2English(string) {
    return string.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, function (c) {
        return c.charCodeAt(0) & 0xf;
    });
}

function convertArabicToPersian(string) {
    return string.replace("ي", "ی").replace("ك", "ک").replace("آ", "ا")
}

function getPersianDate(date) {
    let week = Array("يكشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه", "شنبه")
    let months = Array("فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "ابان", "اذر", "دی", "بهمن", "اسفند");
    let stringArray = date.split(/(\s+)/);
    let month = months.indexOf(convertArabicToPersian(stringArray[4]))
    let year = convertNumbers2English(stringArray[6])
    let day = convertNumbers2English(stringArray[2])
    return shamsi.from(`${year}/${month}/${day} ${convertNumbers2English(stringArray[10])}`, 'fa', 'YYYY/M/D HH:mm')
        .format('YYYY/MM/DD - HH:mm');

}

module.exports = {
    urls,
    keys,
    apiTokens,
    getPersianDate,
    convertNumbers2English

}
