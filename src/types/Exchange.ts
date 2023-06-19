interface Exchange {
    has_trading_incentive: boolean;
    id: string;
    image: string;
    name: string;
    trade_volume_24h_btc_normalized: number;
    trust_score: number;
}

export default Exchange;