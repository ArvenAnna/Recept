import routes, {getImageSmallCopy} from '../../constants/Routes';
import Model from '../abstract/model';
import {getResponse} from "../utils/httpUtils";
import mNotification from "./notification";

class RecipeSearch extends Model {

    constructor() {
        super();

        this.$ingredients = [];
        this.$refs = [];
        this.$department = null;
        this.$searchString = null;

        this.$searchUrl = '';

        // this.search = this.search.bind(this);
        // this._setRecipes = this._setRecipes.bind(this);
    }

    get searchUrl() {
        return this.$searchUrl;
    }

    set searchParams(params) {
        let searchUrl = '';
        if (params.value) {
            this.$searchString = params.value;
            searchUrl = `?search=${params.value}`;
        }
        if (params.department && params.department.id) {
            this.$department = params.department;
            searchUrl = `${searchUrl ? searchUrl + '&' : '?'}departmentId=${params.department.id}`
        }
        if (params.refs && params.refs.length) {
            this.$refs = params.refs;
            params.refs.forEach(ref => {
                searchUrl = `${searchUrl ? searchUrl + '&' : '?'}refs=${ref.id}`
            });
        }
        if (params.ingredients && params.ingredients.length) {
            this.$ingredients = params.ingredients;
            params.ingredients.forEach(ing => {
                searchUrl = `${searchUrl ? searchUrl + '&' : '?'}ingredients=${ing.id}`
            });
        }
        this.$searchUrl = searchUrl;
        this.notifySubscribers();
    }

    // get recipes() {
    //     return this._recipes.map(recipe => ({
    //         id: recipe.id,
    //         name: recipe.name,
    //         imgPath: getImageSmallCopy(recipe.imgPath && routes.IMAGE_CATALOG + recipe.imgPath),
    //         imgPathFull: recipe.imgPath && routes.IMAGE_CATALOG + recipe.imgPath
    //     }))
    // }
    //
    // search(searchUrl) {
    //     fetch(routes.SEARCH_RECIPES(searchUrl))
    //         .then(getResponse)
    //         .then(this._setRecipes)
    //         .catch(e => {
    //             mNotification.message = e.message;
    //         });
    // }
    //
    // _setRecipes(newRecipes) {
    //     this._recipes = newRecipes;
    //     this.notifySubscribers();
    // }
}

export default new RecipeSearch();
