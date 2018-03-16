import {SET_DEPARTMENTS} from '../constants/ActionTypes';

const departmentsReducer = (state = [], action) => {
    switch (action.type) {
        case SET_DEPARTMENTS:
            return action.departments;
        default:
            return state;
    }
}

const SidebarReducer = {
    departments: departmentsReducer
}

export default SidebarReducer;