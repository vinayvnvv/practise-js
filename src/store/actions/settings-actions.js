import { SETTINGS } from "../types";
import { utils } from "../../services/utils";

export const saveFontSize = data => {
    return {
        type: SETTINGS.FONT_SIZE,
        payload: data,
    }
}

export const saveTabSize = data => {
    return {
        type: SETTINGS.TAB_SIZE,
        payload: data,
    }
}

export const saveWrapLine = data => {
    return {
        type: SETTINGS.WRAP_LINE,
        payload: data,
    }
}

export const addLibraries = data => {
    return {
        type: SETTINGS.ADD_LIBRARIES,
        payload: data,
    }
}

export const removeLibraries = data => {
    utils.removeLibrary(data);
    return {
        type: SETTINGS.REMOVE_LIBRARIES,
        payload: data,
    }
}

export const updateLoadLibraryFlag = data => {
    return {
        type: SETTINGS.UPDATE_LOAD_LIBRARY_FLAG,
        payload: data,
    }
}