import Exchange from "@/types/Exchange";
import Image from "next/image";

interface ExchangeRowProps {
    exchange: Exchange;
    index: number;
}

export default function ExchangeRow({ exchange, index }: ExchangeRowProps) {
    const {
        name,
        image,
        trust_score,
        has_trading_incentive: trading_incentive,
        trade_volume_24h_btc_normalized: trade_volume
    } = exchange;

    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <Image src={image} alt={name} width="20" height="20" />
                <span>{name}</span>
            </td>
            <td>{trust_score}</td>
            <td>{trading_incentive ? '있음' : '없음'}</td>
            <td>{trade_volume}</td>
        </tr>
    )
}