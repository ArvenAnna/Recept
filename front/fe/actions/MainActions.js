import * as types from '../constants/ActionTypes';
import http from '../utils/HttpService';
import routes from '../constants/Routes';

//------------ Fetch all available receipts by departmant ------------------------

export const receptsRequest = (id) => ({
        type: types.REQ_RECEPT_LIST,
        id
    })

export const setReceptsByDepart = (recepts) => ({
        type: types.SET_RECEPT_LIST,
        recepts
    })

export const fetchReceptsByDepart = (id, isCut = false) => dispatch => {
        dispatch(receptsRequest(id));
        return http
            .doGet(routes.GET_RECEPTS(id), isCut ? processCutReceptList : r => r)
            .then(result => dispatch(setReceptsByDepart(result)));
    }

function processCutReceptList(recepts) {
    const count = recepts.length > 10 ? 10 : recepts.length;
    recepts.reverse();
    recepts.splice(count, recepts.length-count);
    return recepts;
}

//------------ Fetch receipt by id ------------------------

export const receptRequest = (id) => ({
        type: types.REQ_RECEPT,
        id
    })

export const setChosenRecept = (recept) => ({
        type: types.SET_RECEPT,
        recept
    })

export const fetchRecept = (id) => dispatch => {
        dispatch(receptRequest(id));
        return http
            .doGet(routes.GET_RECEPT(id))
            .then(result => dispatch(setChosenRecept(result)));
    }
