import * as types from '../constants/ActionTypes';
import http from '../HttpService';
import routes from '../constants/Routes';

export function receptsRequest(id) {
    return {
        type: types.REQ_RECEPT_LIST,
        id
    };
}

export function setReceptsByDepart(recepts) {
    return {
        type: types.SET_RECEPT_LIST,
        recepts
    };
}

export function fetchReceptsByDepart(id, isCut = false) {
    return dispatch => {
        dispatch(receptsRequest(id));
        const processResponse = isCut ? processCutReceptList : processReceptList;
        return http
            .doGet(routes.GET_RECEPTS(id), processResponse)
            .then(result => dispatch(setReceptsByDepart(result)));
    }
}

function processCutReceptList(recepts) {
    const count = recepts.length > 10 ? 10 : recepts.length;
    recepts.reverse();
    recepts.splice(count, recepts.length-count);
    return processReceptList(recepts);
}

function processReceptList(recepts) {
    return recepts.map(item => {
        item.to = '/recept/' + item.id;
        item.imgPath = item.imgPath ? (routes.IMAGE_CATALOG + item.imgPath) : null;
        return item;
    });
}


export function receptRequest(id) {
    return {
        type: types.REQ_RECEPT,
        id
    };
}

export function setChosenRecept(recept) {
    return {
        type: types.SET_RECEPT,
        recept
    };
}

export function fetchRecept(id) {
    return dispatch => {
        dispatch(receptRequest(id));
        return http
            .doGet(routes.GET_RECEPT(id), populateReceptWithImgPath)
            .then(result => dispatch(setChosenRecept(result)));
    }
}

function populateReceptWithImgPath(recept) {
    recept.imgPath = recept.imgPath ? (routes.IMAGE_CATALOG + recept.imgPath) : null;
    recept.details = recept.details.map(detail => {
        detail.filePath = detail.filePath ? (routes.IMAGE_CATALOG + detail.filePath) : null;
        return detail;
    });
    recept.refs = recept.refs.map(ref => {
        ref.imgPath = ref.imgPath ? (routes.IMAGE_CATALOG + ref.imgPath) : null;
        ref.to = '/recept/' + ref.id;
        return ref;
    });
    return recept;
}