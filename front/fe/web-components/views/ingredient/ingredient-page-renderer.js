import mIngredient, {newIngredient} from '../../model/newIngredient';

import WebElement from '../../abstract/web-element';
import './ingredient-page';
import router from '../../router/router-context';
import mHeader from '../../model/header';

const template = `
  <ingredient-page></ingredient-page>
`;

class IngredientPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._routeChanged = this._routeChanged.bind(this);
        this._ingredientChanged = this._ingredientChanged.bind(this);

        mIngredient.addSubscriber(this._ingredientChanged);
        router.addSubscriber(this._routeChanged);

        mIngredient.retrieve(router.params.id);
        this.querySelector('ingredient-page').ingredient = mIngredient;
    }

    _routeChanged({params: {id}}) {
        if (router.component == 'ingredient-page-renderer') {
            mIngredient.retrieve(id);
        }

    }

    _ingredientChanged (model) {
        this.querySelector('ingredient-page').ingredient = model;
        mHeader.addIngredientEditButton(model.id);
    }

    disconnectedCallback() {
        mIngredient.clear();
        mIngredient.removeSubscriber(this._ingredientChanged);
        router.removeSubscriber(this._routeChanged);
        mHeader.removeIngredientEditButton();
    }

}

customElements.define('ingredient-page-renderer', IngredientPageRenderer);
