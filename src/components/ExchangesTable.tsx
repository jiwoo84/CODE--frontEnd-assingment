import useFetchData from '@/hooks/useFetchData';
import Exchange from '@/types/Exchange';
import { useEffect, useState } from 'react';
import ExchangeRow from './ExchangeRow';

export default function ExchangesTable() {
    const [exchanges, setExchanges] = useState([]);

    useEffect(() => {
        const fetchExchanges = async () => {
            const exchanges = await useFetchData();
            setExchanges(exchanges);
        };

        fetchExchanges();
    }, [])

    return (
        <table>
            <thead>
                <tr>
                    <th> </th>
                    <th>거래소</th>
                    <th>Trust Score</th>
                    <th>Trading Incentive</th>
                    <th>24시간내 거래대금(정규화)</th>
                </tr>
            </thead>
            <tbody>
                {exchanges.map((exchange: Exchange, index: number) => (
                    <ExchangeRow
                        key={exchange.id}
                        exchange={exchange}
                        index={index}
                    />
                ))}
            </tbody>
        </table>
    );
}