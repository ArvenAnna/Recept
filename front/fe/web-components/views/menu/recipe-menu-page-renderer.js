import mMenu from '../../model/menu';

import WebElement from '../../abstract/web-element';
import './recipe-menu-page';

const template = `
  <recipe-menu-page></recipe-menu-page>
`;

class RecipeMenuPageRenderer extends WebElement {

    constructor() {
        super(template);

        // this._ingredientsChanged = this._ingredientsChanged.bind(this);
        //
        // mMenu.addSubscriber(this._ingredientsChanged);

        this.querySelector('recipe-menu-page').props = {
            recipes: mMenu.recipes
        };
    }

    // _ingredientsChanged (model) {
    //     this.querySelector('ingredients-page').ingredients = model.ingredients;
    // }
    //
    //
    // disconnectedCallback() {
    //     mIngredients.removeSubscriber(this._ingredientsChanged);
    // }

}

customElements.define('recipe-menu-page-renderer', RecipeMenuPageRenderer);
