const StockModel = (name, full_name, namad_code, instance_code, state, final_price, final_price_change, final_price_change_percent) => {
    return {
        name: String(name),
        full_name: String(full_name),
        symbol_code: String(namad_code),
        instance_code: String(instance_code),
        state: String(state),
        final_price: String(final_price),
        final_price_change: parseInt(final_price_change),
        final_price_change_percent: String(final_price_change_percent),
    }
}
const CryptoHistoryModel = (time, open, high, low, close, volume, volume_quote) => {
    return {
        time: String(time),
        open: String(open),
        high: String(high),
        low: String(low),
        close: String(close),
        volume: String(volume),
        volume_quote: String(volume_quote)
    }
}

const FullStockModel = (stockProps) => {
  return {
    name: stockProps[2],
    market: null,
    instance_code: stockProps[0],
    symbol_code: stockProps[1],
    industry_code: null,
    industry: null,
    state: null,
    full_name: stockProps[3],
    first_price: stockProps[5],
    yesterday_price: stockProps[13],
    close_price: stockProps[6],
    close_price_change: stockProps[6] - stockProps[13],
    close_price_change_percent: toFixed((((stockProps[6] - stockProps[13]))/stockProps[13])*100, 2),
    final_price: stockProps[7],
    final_price_change: stockProps[7] - stockProps[13],
    final_price_change_percent: toFixed((((stockProps[7] - stockProps[13]))/stockProps[13])*100, 2),
    eps: stockProps[14],
    free_float: null,
    highest_price: stockProps[12],
    lowest_price: stockProps[11],
    daily_price_high: stockProps[19],
    daily_price_low: stockProps[20],
    P_E: stockProps[7]/stockProps[14],
    trade_number: stockProps[8],
    trade_volume: stockProps[9],
    trade_value: stockProps[10],
    all_stocks: null,
    basis_volume: stockProps[15],
    real_buy_volume: null,
    co_buy_volume: null,
    real_sell_volume: null,
    co_sell_volume: null,
    real_buy_value: null,
    co_buy_value: null,
    real_sell_value: null,
    co_sell_value: null,
    real_buy_count: null,
    co_buy_count: null,
    real_sell_count: null,
    co_sell_count: null,
    }
}

function toFixed(num, fixed) {
  var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
}


module.exports = {
    FullStockModel,
    StockModel,
    CryptoHistoryModel
}