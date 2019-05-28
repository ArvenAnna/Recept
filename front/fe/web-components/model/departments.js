import routes from '../../constants/Routes';
import Model from '../abstract/model';

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
            .then(res => res.json())
            .then(newDepartments => this._setDepartments(newDepartments));
    }

    _setDepartments(newDepartments) {
        this._departments = newDepartments;
        this.notifySubscribers();
    }
}

export default new Departments();
