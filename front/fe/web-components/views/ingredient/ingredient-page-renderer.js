import { ingredient } from '../../model/newIngredient';

import WebElement from '../../abstract/web-element';
import './ingredient-page';
import router from '../../router/router-context';

const template = `
  <ingredient-page></ingredient-page>
`;

class IngredientPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._routeChanged = this._routeChanged.bind(this);
        this._ingredientChanged = this._ingredientChanged.bind(this);

        ingredient.addSubscriber(this._ingredientChanged);
        router.addSubscriber(this._routeChanged);

        ingredient.retrieve(router.params.id);
        this.querySelector('ingredient-page').ingredient = ingredient;
    }

    _routeChanged() {
        ingredient.retrieve(router.params.id);
    }

    _ingredientChanged (model) {
        this.querySelector('ingredient-page').ingredient = model;
    }

    disconnectedCallback() {
        ingredient.removeSubscriber(this._ingredientChanged);
        router.removeSubscriber(this._routeChanged);
    }

}

customElements.define('ingredient-page-renderer', IngredientPageRenderer);
