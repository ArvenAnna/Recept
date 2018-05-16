import * as types from '../constants/ActionTypes';
import http from '../utils/HttpService';
import routes from '../constants/Routes';

export const departmentsRequest = () => ({
        type: types.REQ_DEPARTMENTS,
    })

export const setDepartments = (departments) => {
    return {
        type: types.SET_DEPARTMENTS,
        departments
    };
}

export function fetchDepartments() {
    return dispatch => {
        dispatch(departmentsRequest());
        return http
            .doGet(routes.GET_DEPARTMENTS, populateDepartmentsWithReceptsLink)
            .then(result => dispatch(setDepartments(result)));
    }
}

function populateDepartmentsWithReceptsLink(departments) {
    return departments.map(item => {
        item.to = '/receptList/' + item.id;
        return item;
    });
}