import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import ExchangeRow from './ExchangeRow';

import useFetchData from '@/hooks/useFetchData';

import Exchange from '@/types/Exchange';

import sortExchanges from '@/utils/sortExchanges';

import exchangesState from '@/atoms/exchangesState';

export default function ExchangesTable() {
    const [sortOrder, setSortOrder] = useState('desc');
    const [exchanges, setExchanges] = useRecoilState(exchangesState);

    useEffect(() => {
        const fetchExchanges = async () => {
            const exchanges = await useFetchData();
            const sortedExchanges = sortExchanges(exchanges, sortOrder);
            setExchanges(sortedExchanges);
        };

        fetchExchanges();
    }, [sortOrder])

    return (
        <table className='w-[70%] mx-auto mt-[3%] mb-[5%] border-4 border-gray-300'>
            <thead className='bg-gray-300'>
                <tr className='h-12'>
                    <th></th>
                    <th>거래소</th>
                    <th>Trust Score</th>
                    <th>Trading Incentive</th>
                    <th>
                        <span>24시간내 거래대금(정규화)</span>
                        <select
                            onChange={(e) => setSortOrder(e.target.value)}
                            className='ml-2'
                        >
                            <option value="desc">내림차순</option>
                            <option value="asc">오름차순</option>
                        </select>
                    </th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {exchanges.map((exchange: Exchange, index: number) => (
                    <ExchangeRow
                        key={exchange.id}
                        exchange={exchange}
                        index={index}
                    />
                ))}
            </tbody>
        </table >
    );
}