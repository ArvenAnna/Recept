import {SET_INGRIDIENTS, SET_INGRIDIENTS_AUTOCOMPLETE} from '../constants/ActionTypes';

const ingridientsReducer = (state = [], action) => {
    switch (action.type) {
        case SET_INGRIDIENTS:
            return action.ingridients;
        default:
            return state;
    }
}

const IngridientReducer = {
    ingridients: ingridientsReducer
}

export default IngridientReducer;