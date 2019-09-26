import routes, {getImageSmallCopy} from '../../constants/Routes';
import Model from '../abstract/model';
import {getResponse} from "../utils/httpUtils";
import mNotification from "./notification";

class RecipeList extends Model {

    constructor() {
        super();

        this._recipes = [];

        this.search = this.search.bind(this);
        this._setRecipes = this._setRecipes.bind(this);
    }

    get recipes() {
        return this._recipes.map(recipe => ({
            id: recipe.id,
            name: recipe.name,
            imgPath: getImageSmallCopy(recipe.imgPath && routes.IMAGE_CATALOG + recipe.imgPath),
            imgPathFull: recipe.imgPath && routes.IMAGE_CATALOG + recipe.imgPath
        }))
    }

    search(searchUrl) {
        fetch(routes.SEARCH_RECIPES(searchUrl))
            .then(getResponse)
            .then(this._setRecipes)
            .catch(e => {
                mNotification.message = e.message;
            });
    }

    _setRecipes(newRecipes) {
        this._recipes = newRecipes;
        this.notifySubscribers();
    }
}

export default new RecipeList();
