import * as types from '../constants/ActionTypes';
import http from '../utils/HttpService';
import routes from '../constants/Routes';

export const ingridientsRequest = () => ({
        type: types.REQ_INGRIDIENTS,
    })

export const setIngridients = (ingridients) => ({
        type: types.SET_INGRIDIENTS,
        ingridients
    })

export const fetchIngridients = () => dispatch => {
        dispatch(ingridientsRequest());
        return http
            .doGet(routes.GET_INGREDIENTS, sortIngridients)
            .then(result => dispatch(setIngridients(result)));
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

export const addIngridientRequest = (name) => ({
        type: types.REQ_ADD_INGRIDIENT,
        name
    })

export const addIngridient = (name) => dispatch => {
        dispatch(addIngridientRequest(name));
        const ingridient = {name};
        return http
            .doPost(routes.POST_INGREDIENTS, ingridient)
            .then(result => dispatch(fetchIngridients()));
    }
