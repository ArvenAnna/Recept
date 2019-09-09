import routes from '../../constants/Routes';
import Model from '../abstract/model';
import {getResponse} from "../utils/httpUtils";

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
            .catch(e => console.log(e));
    }

    _setDepartments(newDepartments) {
        this._departments = newDepartments;
        this.notifySubscribers();
    }
}

export default new Departments();
