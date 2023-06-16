import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import ExchangeRow from './ExchangeRow';

import useFetchData from '@/hooks/useFetchData';

import Exchange from '@/types/Exchange';

import sortExchanges from '@/utils/sortExchanges';

import exchangesState from '@/atoms/exchangesState';

export default function ExchangesTable() {
    const [exchanges, setExchanges] = useRecoilState(exchangesState);
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        const fetchExchanges = async () => {
            const exchanges = await useFetchData();
            const sortedExchanges = sortExchanges(exchanges, sortOrder);
            setExchanges(sortedExchanges);
        };

        fetchExchanges();
    }, [sortOrder])

    return (
        <table>
            <thead>
                <tr>
                    <th> </th>
                    <th>거래소</th>
                    <th>Trust Score</th>
                    <th>Trading Incentive</th>
                    <th>
                        <span>24시간내 거래대금(정규화)</span>
                        <select onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="desc">내림차순</option>
                            <option value="asc">오름차순</option>
                        </select>
                    </th>
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