import mIngredients from '../../model/ingredients';

import WebElement from '../../abstract/web-element';
import './ingredients-page';

const template = `
  <ingredients-page></ingredients-page>
`;

class IngredientsPageRenderer extends WebElement {

    constructor() {
        super(template);

         this._ingredientsChanged = this._ingredientsChanged.bind(this);

         mIngredients.addSubscriber(this._ingredientsChanged);
         mIngredients.retrieve();

        this.querySelector('ingredients-page').props = {
            ingredients: mIngredients
        };
    }

    _ingredientsChanged (model) {
        this.querySelector('ingredients-page').ingredients = model.ingredients;
    }


    disconnectedCallback() {
        mIngredients.removeSubscriber(this._ingredientsChanged);
    }

}

customElements.define('ingredients-page-renderer', IngredientsPageRenderer);
