const axios = require('axios')
const utils = require('./utils')
const urls = utils.urls

function getStocks  () {
    const data = axios({
        method: 'get',
        url: urls.tseStocks
    }).then((response) => response.data)
    return data
}

module.exports = {
    getStocks
}
