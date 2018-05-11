import * as types from '../constants/ActionTypes';
import http from '../utils/HttpService';
import routes from '../constants/Routes';
import {ERROR_SHOWING_TIME} from "../constants/appConstants";
import {toggleError} from './CommonActions';

export function setReceptName(name) {
    return {
        type: types.SET_RECEPT_NAME,
        name
    }
}

export function setReceptDepartment(depart) {
    return {
        type: types.SET_RECEPT_DEPARTMENT,
        depart
    }
}

export function setReceptText(text) {
    return {
        type: types.SET_RECEPT_TEXT,
        text
    }
}

export function addProportion(ingridient, norma) {
    return {
        type: types.ADD_RECEPT_PROPORTION,
        ingridient,
        norma
    }
}

export function removeProportion(proportion) {
    return {
        type: types.REMOVE_RECEPT_PROPORTION,
        proportion
    }
}

export function setCreatedRecept(id) {
    return {
        type: types.SET_CREATED_RECEPT,
        id
    }
}

function preProcessRecept(recept) {
    const cutRecept = {};
    cutRecept.name = recept.name;
    cutRecept.id = recept.id;
    cutRecept.imgPath = recept.imgPath;
    cutRecept.text = recept.text;
    cutRecept.department = {id: recept.department.id};
    cutRecept.refs = [];
    recept.refs && recept.refs.forEach(ref => cutRecept.refs.push({id: ref.id}));
    cutRecept.tags = [];
    recept.tags && recept.tags.forEach(tag => cutRecept.tags.push({id: tag.id}));
    cutRecept.proportions = [];
    recept.proportions && recept.proportions.forEach(proportion => cutRecept.proportions.push(
        {ingridient: {id: proportion.ingridient.id}, norma: proportion.norma}));
    cutRecept.details = recept.details;
    return cutRecept;
}

export function createRecept(recept) {
    return dispatch => {
        //dispatch(createReceptRequest(recept));

        const proccessedRecept = preProcessRecept(recept);
        return http
            .doPost(routes.POST_CREATE_RECEPT, proccessedRecept)
            .then(result => {
                // dispatch(setChosenRecept(result));
                dispatch(setCreatedRecept(result));
            })
            .catch(error => {
                setTimeout(() => {
                    dispatch(toggleError());
                }, ERROR_SHOWING_TIME);
                dispatch(toggleError(error.response ? error.response.data.message : error.message));
            });
    }
}

export function tagsRequest() {
    return {
        type: types.REQ_TAGS
    }
}

export function setTags(tags) {
    return {
        type: types.SET_TAGS,
        tags
    };
}

export function fetchTags() {
    return dispatch => {
        dispatch(tagsRequest());
        return http
            .doGet(routes.GET_TAGS)
            .then(result => dispatch(setTags(result)));
    }
}

export function addTag(tag) {
    return {
        type: types.ADD_TAG,
        tag
    }
}

export function removeTag(tag) {
    return {
        type: types.REMOVE_TAG,
        tag
    }
}

export function addRef(ref) {
    return {
        type: types.ADD_REF,
        ref
    }
}

export function removeRef(ref) {
    return {
        type: types.REMOVE_REF,
        ref
    }
}


export function addDetailWithFilePath(text, path) {
    return {
        type: types.ADD_DETAIL,
        text,
        path
    }
}

export function addDetail(text, file) {
    return dispatch => {
        return http
            .sendFile(routes.UPLOAD_FILE, file)
            .then(result => {
                dispatch(addDetailWithFilePath(text, result))
            });
    }
}

export function removeDetail(detail) {
    return {
        type: types.REMOVE_DETAIL,
        filePath: detail.filePath
    }
}

export function setFilePath(filePath) {
    return {
        type: types.SET_FILE_PATH,
        filePath
    }
}

export const removeReceptFoto = () => ({
    type: types.REMOVE_FOTO
})

export function uploadFile(file) {
    return dispatch => {
        //dispatch(tagsRequest());
        return http
            .sendFile(routes.UPLOAD_FILE, file)
            .then(result => {
                dispatch(setFilePath(result))
            });
    }
}




