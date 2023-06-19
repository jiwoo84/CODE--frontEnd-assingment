import { useRecoilState } from "recoil";

import Modal from "@/components/Modal";
import ExchangesTable from '@/components/ExchangesTable';

import { isModalOpenState } from "@/atoms/modalState";

export default function App() {
    const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);

    return (
        <div>
            {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
            <ExchangesTable />
        </div>
    )
}