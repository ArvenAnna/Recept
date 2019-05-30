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
    }

    _ingredientsChanged (model) {
        const ingPage = this.querySelector('ingredients-page');
        ingPage.ingredients = model.ingredients;
        ingPage.addIngredient = model.add; // set it once it constructed
    }

    connectedCallback() {
        mIngredients.retrieve();
    }

    disconnectedCallback() {
        mIngredients.removeSubscriber(this._ingredientsChanged);
    }

}

customElements.define('ingredients-page-renderer', IngredientsPageRenderer);