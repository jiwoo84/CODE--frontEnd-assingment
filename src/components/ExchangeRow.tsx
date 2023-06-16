import Image from "next/image";

import { useRecoilState } from "recoil";

import Exchange from "@/types/Exchange";

import { modalContentState } from "@/atoms/modalState";
import useFetchData from "@/hooks/useFetchData";

interface ExchangeRowProps {
    exchange: Exchange;
    index: number;
    isModalOpen: boolean;
    setIsModalOpen: (state: boolean) => void;
}

export default function ExchangeRow(
    { exchange, index, isModalOpen, setIsModalOpen }: ExchangeRowProps
) {
    const {
        id,
        name,
        image,
        trust_score,
        has_trading_incentive: trading_incentive,
        trade_volume_24h_btc_normalized: trade_volume
    } = exchange;

    const [_, setModalContent] = useRecoilState(modalContentState);

    const handleClickRow = async () => {
        setIsModalOpen(!isModalOpen);

        if (isModalOpen) {
            setModalContent([]);
            return;
        }

        const { tickers } = await useFetchData(`/${id}`);
        setModalContent(tickers);
    }

    return (
        <>
            <tr onClick={handleClickRow}>
                <td>{index + 1}</td>
                <td>
                    <Image src={image} alt={name} width="20" height="20" />
                    <span>{name}</span>
                </td>
                <td>{trust_score}</td>
                <td>{trading_incentive ? '있음' : '없음'}</td>
                <td>{trade_volume}</td>
            </tr>
        </>
    )
}