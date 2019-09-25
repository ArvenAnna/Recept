import mRecipeList from '../../model/recipeList';
import router from '../../router/router-context';
import WebElement from '../../abstract/web-element';
import './recipes-page';

const template = `
  <recipes-page></recipes-page>
`;

export default class RecipesPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._recipeListChanged = this._recipeListChanged.bind(this);
        this._currentRouteChanged = this._currentRouteChanged.bind(this);

        mRecipeList.addSubscriber(this._recipeListChanged);
        router.addSubscriber(this._currentRouteChanged);

        mRecipeList.search(router.search);
    }

    _currentRouteChanged() {
        if (router.component == 'recipes-page-renderer') {
            mRecipeList.search(router.search);
        }
    }

    _recipeListChanged (model) {
        this.querySelector('recipes-page').recipes = model.recipes;
    }

    disconnectedCallback() {
        mRecipeList.removeSubscriber(this._recipeListChanged);
        router.removeSubscriber(this._currentRouteChanged);
    }

}

customElements.define('recipes-page-renderer', RecipesPageRenderer);
