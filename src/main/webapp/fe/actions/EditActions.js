import * as types from '../constants/ActionTypes';

export function copyReceptToNew(recept) {
    return {
        type: types.COPY_RECEPT,
        recept
    }
}