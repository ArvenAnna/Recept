import {mNewRecipe} from '../../model/recipe';
import WebElement from '../../abstract/web-element';
import './create-recipe-page';

const template = `
  <create-recipe-page></create-recipe-page>
`;

class CreateRecipePageRenderer extends WebElement {

    constructor() {
        super(template);

        this._newRecipeChanged = this._newRecipeChanged.bind(this);
        mNewRecipe.addSubscriber(this._newRecipeChanged);
        this.querySelector('create-recipe-page').recipe = mNewRecipe;
    }

    _newRecipeChanged (model) {
        const newRecipePage = this.querySelector('create-recipe-page');
        newRecipePage.recipe = model;
        // ingPage.addIngredient = model.add; // set it once it constructed
    }
    //
    // connectedCallback() {
    //     mIngredients.retrieve();
    // }
    //
    disconnectedCallback() {
        mNewRecipe.removeSubscriber(this._newRecipeChanged);
    }

}

customElements.define('create-recipe-page-renderer', CreateRecipePageRenderer);
