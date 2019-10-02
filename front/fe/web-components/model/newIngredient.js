import routes, {getImageSmallCopy} from '../../constants/Routes';
import Model from '../abstract/model';
import {getResponse} from "../utils/httpUtils";
import mNotification from "./notification";

export class NewIngredient extends Model {

    constructor() {
        super();

        this._ingredient = {};

        this.save = this.save.bind(this);
    }

    get id() {
        return this._ingredient.id;
    }

    get name() {
        return this._ingredient.name;
    }

    set name(name) {
        this._ingredient.name = name;
    }

    get description() {
        return this._ingredient.text;
    }

    set description(description) {
        this._ingredient.description = description;
    }

    get parent() {
        return this._ingredient.parent;
    }

    set parent(parent) {
        this._ingredient.parent = parent;
    }

    get imgPath() {
        return getImageSmallCopy(this._ingredient.imgPath && routes.IMAGE_CATALOG + this._ingredient.imgPath);
    }

    set imgPath(path) {
        this._ingredient.imgPath = path;
    }

    get imgPathFull() {
        return this._ingredient.imgPath && routes.IMAGE_CATALOG + this._ingredient.imgPath;
    }

    async save(ingredient) {
        const method = this._ingredient.id ? 'PUT' : 'POST';
        let newIngredient = await fetch(routes.INGREDIENTS, {method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this._ingredient)})
            .then(getResponse)
            .catch(e => {
                mNotification.message = e.message;
            });
        this._ingredient = {};
        this.notifySubscribers();
        return newIngredient;
    }
}

export default new NewIngredient();

export class Ingredient extends NewIngredient {
    constructor() {
        super();

        this.retrieve = this.retrieve.bind(this);
        this._setIngredient = this._setIngredient.bind(this);
    }

    retrieve(id) {
        fetch(routes.GET_INGREDIENT(id))
            .then(getResponse)
            .then(this._setIngredient)
            .catch(e => {
                mNotification.message = e.message;
            });
    }

    _setIngredient(newIngredient) {
        this._ingredient = newIngredient;
        this.notifySubscribers();
    }
}
// for ingredient details
export const ingredient = new Ingredient();


// export { ingredient };
