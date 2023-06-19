import { atom } from "recoil";

import Ticker from "@/types/Ticker";

export const isModalOpenState = atom<boolean>({
    key: 'isModalOpenState',
    default: false,
})

export const modalContentState = atom<Ticker[]>({
    key: 'modalContentState',
    default: [],
})