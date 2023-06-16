import Exchange from "@/types/Exchange";

export default function sortExchanges(exchanges: Exchange[], sortOrder: string) {
    return exchanges.sort((a, b) => {
        const aTradeVolume = a.trade_volume_24h_btc_normalized;
        const bTradeVolume = b.trade_volume_24h_btc_normalized;

        if (sortOrder === 'asc') {
            return aTradeVolume - bTradeVolume
        }
        return bTradeVolume - aTradeVolume
    })
}