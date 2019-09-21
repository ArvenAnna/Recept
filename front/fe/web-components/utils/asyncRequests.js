import mNotification from '../model/notification';
import routes from '../../constants/Routes';
import {getResponse} from './httpUtils';

export const retrieveRecipesByKeyword = async (keyword) => {
    return await fetch(routes.GET_RECIPES_BY_KEYWORD, {method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({keyword})})
        .then(getResponse)
        .catch(e => {
            mNotification.message = e.message;
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
            mNotification.message = e.message;
        });
}