import routes, {getImageSmallCopy} from '../../constants/Routes';
import Model from '../abstract/model';
import {getResponse} from '../utils/httpUtils';
import mNotification from './notification';
import mRecipeSearch from './recipeSearch';

class RecipeList extends Model {

    constructor() {
        super();

        this._recipes = [];
        this._page = {};

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

    get currentPage() {
        return this._page.currentPage;
    }

    get totalElements() {
        return this._page.totalElements;
    }

    get totalPages() {
        return this._page.totalPages;
    }

    search() {
        const searchUrl = mRecipeSearch.searchUrl;
        fetch(routes.SEARCH_RECIPES_PAGEABLE(searchUrl))
            .then(getResponse)
            .then(this._setRecipes)
            .catch(e => {
                mNotification.message = e.message;
            });
    }

    _setRecipes(recipePage) {
        this._recipes = recipePage.recipes;
        this._page = recipePage;
        this.notifySubscribers();
    }
}

export default new RecipeList();
