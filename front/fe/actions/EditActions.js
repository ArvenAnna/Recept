import * as types from '../constants/ActionTypes';

export const copyReceptToNew = (recept) => ({
        type: types.COPY_RECEPT,
        recept
    })