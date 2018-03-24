import * as types from '../constants/ActionTypes';
import http from '../HttpService';
import routes from '../constants/Routes';
import {ERROR_SHOWING_TIME} from "../constants/appConstants";
import {toggleError} from './CommonActions';

export function ingridientsRequest() {
    return {
        type: types.REQ_INGRIDIENTS,
    }
}

export function setIngridients(ingridients) {
    return {
        type: types.SET_INGRIDIENTS,
        ingridients
    };
}

export function fetchIngridients() {
    return dispatch => {
        dispatch(ingridientsRequest());
        return http
            .doGet(routes.GET_INGRIDIENTS, sortIngridients)
            .then(result => dispatch(setIngridients(result)));
    }
}

function sortIngridients(ingridients) {
    return ingridients.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
    });
}

export function addIngridientRequest(name) {
    return {
        type: types.REQ_ADD_INGRIDIENT,
        name
    };
}

export function addIngridient(name) {
    return dispatch => {
        dispatch(addIngridientRequest(name));
        const ingridient = {name};
        return http
            .doPost(routes.POST_INGRIDIENTS, ingridient)
            .then(result => dispatch(fetchIngridients()))
            .catch(error => {
                setTimeout(() => {
                    dispatch(toggleError());
                }, ERROR_SHOWING_TIME);
                dispatch(toggleError(error.response.data.message));
            });
    }
}
