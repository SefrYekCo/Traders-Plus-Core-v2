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

const FullStockModel = (i) => {
  return {
    name: i.name,
    market: i.market,
    instance_code: i.instance_code,
    namad_code: i.namad_code,
    industry_code: i.industry_code,
    industry: i.industry,
    state: i.state,
    full_name: i.full_name,
    first_price: i.first_price,
    yesterday_price: i.yesterday_price,
    close_price: i.close_price,
    close_price_change: i.close_price_change,
    close_price_change_percent: i.close_price_change_percent,
    final_price: i.final_price,
    final_price_change: i.final_price_change,
    final_price_change_percent: i.final_price_change_percent,
    eps: i.eps,
    free_float: i.free_float,
    highest_price: i.highest_price,
    lowest_price: i.lowest_price,
    daily_price_high: i.daily_price_high,
    daily_price_low: i.lowest_price,
    P_E: i['P:E'],
    trade_number: i.trade_number,
    trade_volume: i.trade_volume,
    trade_value: i.trade_value,
    all_stocks: i.all_stocks,
    basis_volume: i.basis_volume,
    real_buy_volume: i.real_buy_volume,
    co_buy_volume: i.co_buy_volume,
    real_sell_volume: i.real_sell_volume,
    co_sell_volume: i.co_sell_volume,
    real_buy_value: i.real_buy_value,
    co_buy_value: i.co_buy_value,
    real_sell_value: i.real_sell_value,
    co_sell_value: i.co_sell_value,
    real_buy_count: i.real_buy_count,
    co_buy_count: i.co_buy_count,
    real_sell_count: i.real_sell_count,
    co_sell_count: i.co_sell_count,
    }
}


module.exports = {FullStockModel, StockModel}