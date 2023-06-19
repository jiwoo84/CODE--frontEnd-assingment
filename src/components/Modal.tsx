import { useEffect, useRef } from "react";

import { useRecoilState } from "recoil";

import Ticker from "@/types/Ticker";

import { modalContentState } from "@/atoms/modalState";

interface ModalProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
}

export default function Modal({ setIsModalOpen }: ModalProps) {
    const [modalContent, setModalContent] = useRecoilState(modalContentState);

    const modalRef = useRef<HTMLDivElement>(null);

    // 데이터에 중복이 있어 문자열로 가공 후 중복 제거 처리
    const pairs = modalContent.map(({ base, target }: Ticker) => `${base} / ${target}`)
        .reduce((acc: string[], pair: string) => {
            return acc.includes(pair) ? acc : [pair, ...acc]
        }, [])

    const handleClickX = () => {
        setModalContent([]);
        setIsModalOpen(false);
    }

    useEffect(() => {
        // 모달창 바깥 영역 클릭시, 모달창 닫기
        const handleClickBackground = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsModalOpen(false);
                setModalContent([]);
            }
        };

        document.addEventListener('mousedown', handleClickBackground);

        // 모달 컴포넌트 사라질 때, 이벤트핸들러 제거
        return () => {
            document.removeEventListener('mousedown', handleClickBackground);
        };
    });

    return (
        <div
            ref={modalRef}
            className="fixed w-[75%] h-[90%] translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] bg-white border-solid border-8 border-gray-500 p-10">
            <p className="text-2xl font-bold mb-5 text-center">지원하는 거래쌍(pair) 목록</p>
            <button
                type="button"
                onClick={handleClickX}
                className="fixed top-5 right-10 text-3xl"
            >X</button>
            <div className="h-[90%] overflow-auto">
                {pairs.length
                    ? (
                        <ul>
                            {pairs.map((pair: string, index: number) => (
                                <li key={pair} className="h-7 flex">
                                    <div className="w-10 text-center">{index + 1}. </div>
                                    <span>{pair}</span>
                                </li>
                            ))}
                        </ul>
                    )
                    : <h3>Loading...</h3>}
            </div>
        </div>
    )
}