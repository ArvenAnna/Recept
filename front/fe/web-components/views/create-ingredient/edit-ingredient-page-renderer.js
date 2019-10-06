import {newIngredient} from '../../model/newIngredient';
import mIngredients from '../../model/ingredients';

import WebElement from '../../abstract/web-element';
import './create-ingredient-page';
import router from '../../router/router-context';

const template = `
  <create-ingredient-page></create-ingredient-page>
`;

class EditIngredientPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._ingredientChanged = this._ingredientChanged.bind(this);
        this._onRouteChange = this._onRouteChange.bind(this);

        newIngredient.addSubscriber(this._ingredientChanged);
        router.addSubscriber(this._onRouteChange);

        newIngredient.retrieve(router.params.id);

        this.querySelector('create-ingredient-page').props = {
            ingredient: newIngredient,
            addIngredientCallback: mIngredients.retrieve
        }
    }

    _onRouteChange({params: {id}}) {
        if (router.component == 'edit-ingredient-page-renderer') {
            newIngredient.retrieve(id);
        }
    }

    _ingredientChanged (model) {
        this.querySelector('create-ingredient-page').ingredient = model;
    }

    disconnectedCallback() {
        newIngredient.clear();
        newIngredient.removeSubscriber(this._ingredientChanged);
        router.removeSubscriber(this._onRouteChange);
    }

}

customElements.define('edit-ingredient-page-renderer', EditIngredientPageRenderer);
