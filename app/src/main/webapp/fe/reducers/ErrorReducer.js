import {TOGGLE_ERROR} from "../constants/ActionTypes";

const errorsReducer = (state = null, action) => {
    switch (action.type) {
        case TOGGLE_ERROR:
            if (action.message) {
                return action.message;
            }
            return null;
        default:
            return state;
    }
}

const ErrorReducer = {
    error: errorsReducer
}

export default ErrorReducer;
