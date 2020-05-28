import { SETTINGS } from "../types";

const initialState = {
    fontSize: 14,
    tabSize: 4,
    wrapLine: false,
    libraries: [],
    librariesLoaded: false,
}
export default function (state = initialState, action) {
    switch(action.type) {
        case SETTINGS.FONT_SIZE:
            return {
                ...state,
                fontSize: action.payload,
            }
        case SETTINGS.TAB_SIZE:
            return {
                ...state,
                tabSize: action.payload,
            }
        case SETTINGS.WRAP_LINE:
            return {
                ...state,
                wrapLine: action.payload,
            }
        case SETTINGS.ADD_LIBRARIES:
            const lib = state.libraries ? state.libraries : [];
            return {
                ...state,
                libraries: [...lib, action.payload],
            }
        case SETTINGS.REMOVE_LIBRARIES:
            return {
                ...state,
                libraries: state.libraries.filter(i => i.id !== action.payload.id),
            }
        case SETTINGS.UPDATE_LOAD_LIBRARY_FLAG:
            return {
                ...state,
                librariesLoaded: action.payload,
            }
        default:
            return state;
    }
}