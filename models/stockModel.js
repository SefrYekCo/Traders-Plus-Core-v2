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

const WeatherForecastModel = (item) => {
    return {
        isGreen: String(item.IsGreen),
        insCode: String(item.InsCode),
        weight: String(item.Weight),
        LVal18AFC: String(item.LVal18AFC),
        LVal30: String(item.LVal30),
        percent: String(item.Percent),
        LSecVal: String(item.LSecVal),
        CSecVal: String(item.CSecVal),
        fontSize: String(item.FontSize),
        PClosing: String(item.PClosing),
        PClosingChange: String(item.PClosingChange),
        PDrCotVal: String(item.PDrCotVal),
        ZTotTran: String(item.ZTotTran),
        QTotTran5J: String(item.QTotTran5J),
        QTotCap: String(item.QTotCap),
        heven: String(item.Heven)
    }
}
const HedgeFundModel = (item) => {
    return {
        regNo:item.regNo,
        name:item.name,
        rankOf12Month:item.rankOf12Month,
        rankOf36Month:item.rankOf36Month,
        rankOf60Month:item.rankOf60Month,
        rankLastUpdate:item.rankLastUpdate,
        fundType:item.fundType,
        typeOfInvest:item.typeOfInvest,
        fundSize:item.fundSize,
        initiationDate:item.initiationDate,
        dailyEfficiency:item.dailyEfficiency,
        weeklyEfficiency:item.weeklyEfficiency,
        monthlyEfficiency:item.monthlyEfficiency,
        quarterlyEfficiency:item.quarterlyEfficiency,
        sixMonthEfficiency:item.sixMonthEfficiency,
        annualEfficiency:item.annualEfficiency,
        efficiency:item.efficiency,
        cancelNav:item.cancelNav,
        issueNav:item.issueNav,
        dividendIntervalPeriod:item.dividendIntervalPeriod,
        guaranteedEarningRate:item.guaranteedEarningRate,
        date:item.date,
        netAsset:item.netAsset,
        estimatedEarningRate:item.estimatedEarningRate,
        investedUnits:item.investedUnits,
        manager:item.manager,
        auditor:item.auditor,
        custodian:item.custodian,
        guarantor:item.guarantor,
        fundWatch:item.fundWatch
    }
}

const FullStockModel = (i) => {
    return {
        name: i.name,
        market: i.market,
        instance_code: i.instance_code,
        symbol_code: i.namad_code,
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

function toFixed(num, fixed) {
  var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
}


module.exports = {
    FullStockModel,
    StockModel,
    CryptoHistoryModel,
    WeatherForecastModel,
    HedgeFundModel
}