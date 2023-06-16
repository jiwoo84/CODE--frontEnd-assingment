import { modalContentState } from "@/atoms/modalState";
import Ticker from "@/types/Ticker";
import { useRecoilState, useRecoilValue } from "recoil";

interface ModalProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
}

export default function Modal({ setIsModalOpen }: ModalProps) {
    const [tickers, setTickers] = useRecoilState(modalContentState);

    // memo 지우: 데이터 가공 후 중복 제거 처리
    const pairs = tickers.map(({ base, target }: Ticker) => `${base}/${target}`)
        .reduce((acc: string[], pair: string) => {
            return acc.includes(pair) ? acc : [pair, ...acc]
        }, [])

    const handleClickX = () => {
        setTickers([]);
        setIsModalOpen(false);
    }

    return (
        <>
            <span onClick={handleClickX}>X</span>
            {pairs.length
                ? (
                    <ul>
                        {pairs.map((pair) => <li key={pair}>{pair}</li>)}
                    </ul>
                )
                : <h3>Loading...</h3>}
        </>
    )
}