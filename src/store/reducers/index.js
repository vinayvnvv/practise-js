import { combineReducers } from "redux";
import codeReducer from "./code-reducer";
import settingsReducer from "./settings-reducer";

const rootReducer = combineReducers({
    codeReducer,
    settingsReducer,
});

export default rootReducer;