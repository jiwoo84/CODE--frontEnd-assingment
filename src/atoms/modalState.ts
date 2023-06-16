import Ticker from "@/types/Ticker";
import { atom } from "recoil";

export const isModalOpenState = atom<boolean>({
    key: 'isModalOpenState',
    default: false,
})

export const modalContentState = atom<Ticker[]>({
    key: 'modalContentState',
    default: [],
})