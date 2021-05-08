const cryptocurrencyModel = (symbol, name, icon, price, change_percent_24h, market_cap) => {
    return {
      symbol: symbol,
      name: name,
      icon: icon,
      price: price,
      change_percent_24h: change_percent_24h,
      market_cap: market_cap
  }
}

module.exports = cryptocurrencyModel