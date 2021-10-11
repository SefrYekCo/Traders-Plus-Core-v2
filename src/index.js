const axios = require('axios')


function index  (url) {
    const data = axios({
        method: 'get',
        url: url
    }).then((response) => response.data)
    return data
}

module.exports = {
    getData: index
}
