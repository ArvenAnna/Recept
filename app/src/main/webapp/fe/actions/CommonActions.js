import * as types from '../constants/ActionTypes';

export function toggleError(message) {
    return {
        type: types.TOGGLE_ERROR,
        message
    };
}

export function addHeaderButton(button) {
    return {
        type: types.ADD_HEADER_BUTTON,
        button
    };
}

export function removeHeaderButton(button) {
    return {
        type: types.REMOVE_HEADER_BUTTON,
        button
    };
}