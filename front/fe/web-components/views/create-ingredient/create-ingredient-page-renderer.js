import {newIngredient} from '../../model/newIngredient';
import WebElement from '../../abstract/web-element';
import './create-ingredient-page';
import mIngredients from "../../model/ingredients";

const template = `
  <create-ingredient-page></create-ingredient-page>
`;

class CreateIngredientPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._ingredientChanged = this._ingredientChanged.bind(this);

        mIngredients.addSubscriber(this._ingredientsChanged);
        newIngredient.addSubscriber(this._ingredientChanged);

        // mIngredient.clear();

        this.querySelector('create-ingredient-page').props = {
            ingredient: newIngredient,
            addIngredientCallback: mIngredients.retrieve
        }
    }

    _ingredientChanged (model) {
        this.querySelector('create-ingredient-page').ingredient = model;
    }

    disconnectedCallback() {
        newIngredient.removeSubscriber(this._ingredientChanged);
    }

}

customElements.define('create-ingredient-page-renderer', CreateIngredientPageRenderer);
