import routes from '../../constants/Routes';
import Model from '../abstract/model';
import {getResponse} from "../utils/httpUtils";
import mNotification from "./notification";

class Ingredients extends Model {

    constructor() {
        super();

        this._ingredients = [];

        this.bindMethods(this._setIngredients, this.retrieve);
        this._isNewIngredientValid = this._isNewIngredientValid.bind(this);
        this._addIngredient = this._addIngredient.bind(this);
        this.add = this.add.bind(this);
    }

    get ingredients() {
        return [...this._ingredients];
    }

    retrieve() {
        fetch(routes.INGREDIENTS)
            .then(getResponse)
            .then(newIngredients => this._setIngredients(newIngredients))
            .catch(e => {
                mNotification.message = e.message;
            });
    }

    add(ingredient) {
        if (this._isNewIngredientValid(ingredient)) {
            fetch(routes.INGREDIENTS, {method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: ingredient})})
                .then(getResponse)
                .then(savedIngredient => this._addIngredient(savedIngredient))
                .catch(e => {
                    mNotification.message = e.message;
                });
        }
    }

    _isNewIngredientValid(ingredient) {
        return !this._ingredients.map(ing => ing.name).includes(ingredient);
    }

    _addIngredient(ingredient) {
        this._ingredients.push(ingredient);
        this.notifySubscribers();
    }

    _setIngredients(newIngredients) {
        this._ingredients = newIngredients;
        this.notifySubscribers();
    }
}

export default new Ingredients();
