import routes from '../../constants/Routes';
import Model from '../abstract/model';

export class Recipe extends Model {

    constructor() {
        super();

        this._recipe = {};

        this.retrieve = this.retrieve.bind(this);
        this._setRecipe = this._setRecipe.bind(this);
    }

    get id() {
        return this._recipe.id;
    }

    get name() {
        return this._recipe.name;
    }

    get text() {
        return this._recipe.text;
    }

    get refs() {
        if (!this._recipe.refs || !this._recipe.refs.length) {
            return null;
        }
        return this._recipe.refs.map(ref => ({
           id: ref.id,
           name: ref.name,
           imgPath: ref.imgPath && routes.IMAGE_CATALOG + ref.imgPath
        }));
    }

    get imgPath() {
        return this._recipe.imgPath && routes.IMAGE_CATALOG + this._recipe.imgPath;
    }

    get proportions() {
        return this._recipe.proportions && this._recipe.proportions.map(prop => ({...prop}));
    }

    get details() {
        return this._recipe.details && this._recipe.details.map(({id, description, filePath}) =>
            ({id, description, imgPath: filePath && routes.IMAGE_CATALOG + filePath}));
    }

    retrieve(id) {
        fetch(routes.GET_RECIPE(id))
            .then(res => res.json())
            .then(this._setRecipe);
    }

    _setRecipe(newRecipe) {
        this._recipe = newRecipe;
        this.notifySubscribers();
    }
}

export default new Recipe();
