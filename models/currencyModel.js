const CurrencyModel = (i) => {
    return {
        slug: i.slug,
        name: i.name,
        price: i.price,
        change: i.change,
        change_percent: i.change_percent,
        min_price: i.min_price,
        max_price: i.max_price,
        last_update: i.last_update,
      }
}

module.exports = CurrencyModel