import {
    COPY_RECEPT
} from '../constants/ActionTypes';

const copyReducer = (state = {}, action) => {
    switch (action.type) {
        case COPY_RECEPT:
            return Object.assign({}, state.chosenRecept);
        default:
            return state;
    }
}

const EditReceptReducer = {
    editRecept: copyReducer
}

export default EditReceptReducer