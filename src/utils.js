const baseURL =  'https://www.sourcearena.ir/api/?token=75243df886bbfb64e6962751a91a7873' 
const tseBaseURL = "http://tsetmc.com/"
const coinAPIBaseURL = "https://rest.coinapi.io/"
const keys = {
    currencies: 'currencies',
    metals: 'metals',
    indexes: 'indexes',
    cryptos: 'cryptos',
    stocks: 'stocks',
    stocksList: 'stocksList',
    faraBourse: 'faraBourse',
    cryptoHistoryV1: 'cryptoHistoryV1'
}
  
const urls = {
    currencies: baseURL + "&currency",
    indexes: baseURL + "&market=indices",
    cryptos: baseURL + "&crypto_v2=all",
    stocks: baseURL + "&all&type=0",
    faraBourse: baseURL + "&market=market_farabourse",
    tseStocks : tseBaseURL + "tsev2/data/MarketWatchPlus.aspx",
    cryptoHistoryV1 : coinAPIBaseURL + "v1/exchangerate/"

}
const apiTokens ={
    //https://docs.coinapi.io/
    coin_api0 : "16E3ED0A-FDFB-47D8-B7A4-0B718224568D",
    coin_api1 : "C47417AF-3290-48B8-98E1-3B0F8736E00D",
    coin_api2 : "D3D5C28A-F35A-4990-ACA5-CDCDB4420D03",
    coin_api3 : "D3D5C28A-F35A-4990-ACA5-CDCDB4420D03",
    coin_api4 : "06B90324-C33C-450B-81AD-5816DD9BFE74",
    coin_api5 : "88F65E1C-5867-4133-9F61-E9FF367665BE",
    coin_api6 : "C687125B-26BA-42B1-BD1A-BF2F65DFAA54",
    coin_api7 : "C89CB675-4947-4563-9308-C806E3B045B4",
    coin_api8 : "F0EA49A4-D727-456C-8BA2-0F11BC319C4D"


}

module.exports = {
    urls, 
    keys,
    apiTokens
}