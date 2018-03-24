import {SET_RECEPT_LIST, SET_RECEPT} from '../constants/ActionTypes';

const receptListReducer = (state = [], action) => {
    switch (action.type) {
        case SET_RECEPT_LIST:
            return action.recepts;
        default:
            return state;
    }
}

const receptReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_RECEPT:
            return action.recept;
        default:
            return state;
    }
}

const MainPageReducer = {
    receptList: receptListReducer,
    chosenRecept: receptReducer
}

export default MainPageReducer;