import routes from '../../constants/Routes';
import Model from '../abstract/model';
import {getResponse} from '../utils/httpUtils';
import mNotification from './notification';
import {SEVERITY_TYPES} from "../common-notification";

class Departments extends Model {

    constructor() {
        super();

        this._departments = [];

        this.bindMethods(this._setDepartments, this.retrieve);
    }

    get departments() {
        return [...this._departments];
    }

    retrieve() {
        fetch(routes.GET_DEPARTMENTS)
            .then(getResponse)
            .then(newDepartments => this._setDepartments(newDepartments))
            .catch(e => {
                mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
            });
    }

    _setDepartments(newDepartments) {
        this._departments = newDepartments;
        this.notifySubscribers();
    }
}

export default new Departments();
