const baseURL =  'https://www.sourcearena.ir/api/?token=75243df886bbfb64e6962751a91a7873' 
const tseBaseURL = "http://tsetmc.com/"
const coinAPIBaseURL = "https://rest.coinapi.io/"
const tokenDatabaseAPIBaseURL = "https://api.tokendatabase.com/"
const nomiceBaseURl = "https://api.nomics.com/"
const curencies = "AAVE,ADA,ALGO,AMPL,ARK,ATOM,BAT,BAL,BCD,BCH,BNB,BNTY,BSV,BTC,BTG,BTT,BURST,COMP,CRO,DAI,DASH,DCR,DGB,DOGE,EOS,ETC,ETH" +
    ",ENJ,EQL,FTM,FUSE,GAS,GRS,ONE,HT,ICX,IOTA,KIN,KMD,LEND,LINK,LSK,LTC,MTA,NANO,NEBL,NEO,ONG,ONT,QTUM,RVN,REP,RSK,SIERRA,SMART,STRAX,SWTH,TLOS" +
    ",TPAY,TRX,TWT,UBQ,USDC,USDT,VET,VSYS,VTHO,WAN,WAVES,XDC,XEM,XLM,XMR,XRP,XTZ,XVG,XZC,YFI,ZEC,ZIL,ZRX"
const keys = {
    currencies: 'currencies',
    metals: 'metals',
    indexes: 'indexes',
    cryptos: 'cryptos',
    stocks: 'stocks',
    stocksList: 'stocksList',
    faraBourse: 'faraBourse',
    cryptoHistoryV1: 'cryptoHistoryV1',
    cryptoHistoryV2: 'cryptoHistoryV2',
    historyData: 'history_data'
}

const urls = {
    currencies: baseURL + "&currency",
    indexes: baseURL + "&market=indices",
    cryptos: baseURL + "&crypto_v2=all",
    stocks: baseURL + "&all&type=0",
    faraBourse: baseURL + "&market=market_farabourse",
    tseStocks : tseBaseURL + "tsev2/data/MarketWatchPlus.aspx",
    cryptoHistoryV1 : coinAPIBaseURL + "v1/exchangerate/",
    cryptoHistoryV2 : tokenDatabaseAPIBaseURL + "v1/indices/vwap5/ohlcv",
    nomiceURl : nomiceBaseURl + "v1/currencies/ticker?key=50640cf10da922ef2bc3b286e40fb5363b34389b&ids=" + curencies + "&interval=1d&convert=USDT"

}
const apiTokens ={
    //https://docs.coinapi.io/
    coin_api0 : "16E3ED0A-FDFB-47D8-B7A4-0B718224568D",
    coin_api1 : "C47417AF-3290-48B8-98E1-3B0F8736E00D",
    coin_api2 : "D3D5C28A-F35A-4990-ACA5-CDCDB4420D03",
    coin_api3 : "191EDE74-A6CA-4E46-8E79-CF38FC0EB708",
    coin_api4 : "06B90324-C33C-450B-81AD-5816DD9BFE74",
    coin_api5 : "88F65E1C-5867-4133-9F61-E9FF367665BE",
    coin_api6 : "C687125B-26BA-42B1-BD1A-BF2F65DFAA54",
    coin_api7 : "C89CB675-4947-4563-9308-C806E3B045B4",
    coin_api8 : "F0EA49A4-D727-456C-8BA2-0F11BC319C4D",
    tokenDatabase_api0 :"AUNUCWhsafR3VXgU4AZ_UV1c8PQIHY0YD9XtQGVqjXH4mqa7cof9g9UEmOQO",
    tokenDatabase_api1 :"ARWu-gtqt3EpG85g75av1gqicjXJr7vWDA4Rli2W1ZuvnwQWRRcypGfhCfJO"


}

module.exports = {
    urls, 
    keys,
    apiTokens
}