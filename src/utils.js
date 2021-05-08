const baseURL =  'https://www.sourcearena.ir/api/?token=75243df886bbfb64e6962751a91a7873' 

const keys = {
    currencies: 'currencies',
    metals: 'metals',
    indexes: 'indexes',
    cryptos: 'cryptos',
    stocks: 'stocks',
    stocksList: 'stocksList',
}
  
const urls = {
    currencies: baseURL + "&currency",
    indexes: baseURL + "&market=indices",
    cryptos: baseURL + "&crypto_v2=all",
    stocks: baseURL + "&all&type=0", 
}

module.exports = {
    urls, 
    keys,
}