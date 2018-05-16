import * as types from '../constants/ActionTypes';
import http from '../utils/HttpService';
import routes from '../constants/Routes';

export const setReceptName = (name) => ({
        type: types.SET_RECEPT_NAME,
        name
    })

export const setReceptDepartment = (depart) => ({
        type: types.SET_RECEPT_DEPARTMENT,
        depart
    })

export const setReceptText = (text) => ({
        type: types.SET_RECEPT_TEXT,
        text
    })

export const addProportion = (ingridient, norma) => ({
        type: types.ADD_RECEPT_PROPORTION,
        ingridient,
        norma
    })

export const removeProportion = (proportion) => ({
        type: types.REMOVE_RECEPT_PROPORTION,
        proportion
    })

export const tagsRequest = () => ({
        type: types.REQ_TAGS
    })

export const setTags = (tags) => ({
        type: types.SET_TAGS,
        tags
    })

export const fetchTags = () => dispatch => {
    dispatch(tagsRequest());
    return http
        .doGet(routes.GET_TAGS)
        .then(result => dispatch(setTags(result)));
}

export const addTag = (tag) => ({
        type: types.ADD_TAG,
        tag
    })

export const removeTag = (tag) => ({
        type: types.REMOVE_TAG,
        tag
    })

export const addRef = (ref) => ({
        type: types.ADD_REF,
        ref
    })

export const removeRef = (ref) => ({
        type: types.REMOVE_REF,
        ref
    })


export const addDetailWithFilePath = (text, path) => ({
        type: types.ADD_DETAIL,
        text,
        path
    })


export const addDetail = (text, file) => dispatch => {
        return http
            .sendFile(routes.UPLOAD_FILE, file)
            .then(result => dispatch(addDetailWithFilePath(text, result)));
    }

export const removeDetail = (detail) => ({
        type: types.REMOVE_DETAIL,
        filePath: detail.filePath
    })

export const setFilePath = (filePath) => ({
        type: types.SET_FILE_PATH,
        filePath
    })

export const removeReceptFoto = () => ({
    type: types.REMOVE_FOTO
})

export const uploadFile = file => dispatch =>
    http.sendFile(routes.UPLOAD_FILE, file).then(result => dispatch(setFilePath(result)))

export const copyReceptToNew = (recept) => ({
    type: types.COPY_RECEPT,
    recept
})