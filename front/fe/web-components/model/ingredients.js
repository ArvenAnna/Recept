import routes from '../../constants/Routes';
import Model from '../abstract/model';

class Ingredients extends Model {

    constructor() {
        super();

        this._ingredients = [];

        this.bindMethods(this._setIngredients, this.retrieve);
    }

    get ingredients() {
        return [...this._ingredients];
    }

    retrieve() {
        fetch(routes.INGREDIENTS)
            .then(res => res.json())
            .then(newIngredients => this._setIngredients(newIngredients));
    }

    _setIngredients(newIngredients) {
        this._ingredients = newIngredients;
        this.notifySubscribers();
    }
}

export default new Ingredients();
