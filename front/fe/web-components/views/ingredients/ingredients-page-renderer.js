import mIngredients from '../../model/ingredients';
import mIngredient from '../../model/newIngredient';

import WebElement from '../../abstract/web-element';
import './ingredients-page';

const template = `
  <ingredients-page></ingredients-page>
`;

class IngredientsPageRenderer extends WebElement {

    constructor() {
        super(template);

         this._ingredientsChanged = this._ingredientsChanged.bind(this);
         this._ingredientChanged = this._ingredientChanged.bind(this);

         mIngredients.addSubscriber(this._ingredientsChanged);
         mIngredient.addSubscriber(this._ingredientChanged);
         mIngredients.retrieve();

        this.querySelector('ingredients-page').props = {
            addIngredientCallback: mIngredients.add,
            ingredients: mIngredients.ingredients,
            ingredient: mIngredient
        };
    }

    _ingredientsChanged (model) {
        this.querySelector('ingredients-page').ingredients = model.ingredients;
    }

    _ingredientChanged (model) {
        this.querySelector('ingredients-page').ingredient = model;
    }

    disconnectedCallback() {
        mIngredients.removeSubscriber(this._ingredientsChanged);
        mIngredient.removeSubscriber(this._ingredientChanged);
    }

}

customElements.define('ingredients-page-renderer', IngredientsPageRenderer);
