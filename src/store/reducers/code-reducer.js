import { CODE } from "../types";

const initialState = {
    code: '',
}
export default function (state = initialState, action) {
    switch(action.type) {
        case CODE.UPDATE_CODE:
            return {
                ...state,
                code: action.payload,
            }
        default:
            return state;
    }
}