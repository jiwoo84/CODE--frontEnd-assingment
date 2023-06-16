import { atom } from "recoil";

import Exchange from "@/types/Exchange";

const exchangesState = atom<Exchange[]>({
    key: 'exchangesState',
    default: [],
})

export default exchangesState;