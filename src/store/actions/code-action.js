import { CODE } from "../types";

export const updateCode = code => {
    // console.clear();
    return {
        type: CODE.UPDATE_CODE,
        payload: code,
    }
}