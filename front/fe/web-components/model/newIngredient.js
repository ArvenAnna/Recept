import routes, {getImageSmallCopy} from '../../constants/Routes';
import Model from '../abstract/model';
import {doJsonRequest, getResponse} from '../utils/httpUtils';
import mNotification from "./notification";

export class Ingredient extends Model {

    constructor() {
        super();

        this._ingredient = {};
        this._parent = {};

        this._setIngredient = this._setIngredient.bind(this);
        this._getIngredientById = this._getIngredientById.bind(this);
        this.retrieve = this.retrieve.bind(this);
        this.clear = this.clear.bind(this);
    }

    get id() {
        return this._ingredient.id;
    }

    get name() {
        return this._ingredient.name;
    }

    get description() {
        return this._ingredient.description;
    }

    get parent() {
        return this._ingredient.parent;
    }

    get imgPath() {
        return getImageSmallCopy(this._ingredient.imgPath && routes.IMAGE_CATALOG + this._ingredient.imgPath);
    }

    get imgPathFull() {
        return this._ingredient.imgPath && routes.IMAGE_CATALOG + this._ingredient.imgPath;
    }

    get parentName() {
        return this._parent.name;
    }

    retrieve(id) {
        this._getIngredientById(id)
            .then(ing => {
                const parentPromise = ing.parent
                    ? this._getIngredientById(ing.parent)
                    : Promise.resolve();
                return parentPromise.then(parent => this._setIngredient(ing, parent))
            })
            .catch(e => {
                mNotification.message = e.message;
                console.error(e);
            });
    }

    _getIngredientById(id) {
        return fetch(routes.GET_INGREDIENT(id))
            .then(getResponse)
            .catch(e => {
                mNotification.message = e.message;
                console.error(e);
            })
    }

    _setIngredient(newIngredient, parent) {
        this._ingredient = newIngredient;
        this._parent = parent || {};
        this.notifySubscribers();
    }

    clear() {
        this._ingredient = {};
        this._parent = {};
    }
}

export default new Ingredient();

export class NewIngredient extends Ingredient {
    constructor() {
        super();

        this.save = this.save.bind(this);
    }

    get name() {
        return super.name;
    }

    set name(name) {
        this._ingredient.name = name;
    }

    get description() {
        return super.description;
    }

    set description(description) {
        this._ingredient.description = description;
    }

    get parent() {
        return super.parent;
    }

    set parent(parent) {
        this._ingredient.parent = parent;
    }

    get imgPath() {
        return super.imgPath;
    }

    set imgPath(path) {
        this._ingredient.imgPath = path;
    }

    async save() {
        const method = this._ingredient.id ? 'PUT' : 'POST';
        let newIngredient = await doJsonRequest(routes.INGREDIENTS, method, this._ingredient);
        this._ingredient = {};
        this.notifySubscribers();
        return newIngredient.id;
    }
}
// for ingredient details
export const newIngredient = new NewIngredient();


// export { ingredient };
