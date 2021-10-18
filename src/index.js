const axios = require('axios')


function index  (url) {
    const data = axios({
        method: 'get',
        url: url
    }).then((response) => response)
    return data
}

module.exports = {
    getData: index
}
