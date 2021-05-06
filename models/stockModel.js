const StockModel = (name, namad_code, state, final_price, final_price_change, final_price_change_percent) => {
    return {
        name: name,
        namad_code: namad_code,
        state: state,
        final_price: final_price,
        final_price_change: final_price_change,
        final_price_change_percent: final_price_change_percent,
      }
}

module.exports = StockModel