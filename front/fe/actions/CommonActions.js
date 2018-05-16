import * as types from '../constants/ActionTypes';

export const addHeaderButton = (button) => ({
        type: types.ADD_HEADER_BUTTON,
        button
    })

export const removeHeaderButton = (button) => ({
        type: types.REMOVE_HEADER_BUTTON,
        button
    })