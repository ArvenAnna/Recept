import mNotification from '../model/notification';
import routes from '../../constants/Routes';
import {getResponse} from './httpUtils';
import {SEVERITY_TYPES} from "../common-notification";

export const retrieveRecipesByKeyword = async (keyword) => {
    return await fetch(routes.GET_RECIPES_BY_KEYWORD, {method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({keyword})})
        .then(getResponse)
        .catch(e => {
            mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
        });
}

export const retrieveIngredientsByKeyword = async (keyword) => {
    return await fetch(routes.GET_INGREDIENTS_BY_KEYWORD, {method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({keyword})})
        .then(getResponse)
        .catch(e => {
            mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
        });
}

export const retrieveRecipesByIds = async (ids) => {
    return await fetch(routes.GET_RECIPES_BY_IDS, {method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ids)})
        .then(getResponse)
        .catch(e => {
            mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
        });
}

export const retrieveIngredientsByIds = async (ids) => {
    return await fetch(routes.GET_INGREDIENTS_BY_IDS, {method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ids)})
        .then(getResponse)
        .catch(e => {
            mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
        });
}
