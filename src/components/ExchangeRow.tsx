import Image from "next/image";

import { useSetRecoilState } from "recoil";

import Exchange from "@/types/Exchange";

import useFetchData from "@/hooks/useFetchData";

import { isModalOpenState, modalContentState } from "@/atoms/modalState";

interface ExchangeRowProps {
    exchange: Exchange;
    index: number;
}

export default function ExchangeRow({ exchange, index }: ExchangeRowProps) {
    const {
        id,
        name,
        image,
        trust_score,
        has_trading_incentive: trading_incentive,
        trade_volume_24h_btc_normalized: trade_volume
    } = exchange;

    const setIsModalOpen = useSetRecoilState(isModalOpenState);
    const setModalContent = useSetRecoilState(modalContentState);

    const handleClickRow = async () => {
        setIsModalOpen(true);
        const { tickers } = await useFetchData(`/${id}`);
        setModalContent(tickers);
    }

    return (
        <tr
            onClick={handleClickRow}
            className='h-10 border-2'
        >
            <td className='border-2'>{index + 1}</td>
            <td className='flex items-center'>
                <Image
                    src={image}
                    alt={name}
                    width="20"
                    height="20"
                    className="m-2"
                />
                <p className="font-bold">{name}</p>
            </td>
            <td className='border-2'>{trust_score}</td>
            <td className='border-2'>{trading_incentive ? '있음' : '없음'}</td>
            <td className='border-2'>{trade_volume}</td>
        </tr>
    )
}