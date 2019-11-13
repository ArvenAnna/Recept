import mMenu from '../../model/menu';

import WebElement from '../../abstract/web-element';
import './recipe-menu-page';

const template = `
  <recipe-menu-page></recipe-menu-page>
`;

class RecipeMenuPageRenderer extends WebElement {

    constructor() {
        super(template);

        this._menuChanged = this._menuChanged.bind(this);

        mMenu.addSubscriber(this._menuChanged);
        mMenu.retrieve();

        this.querySelector('recipe-menu-page').recipes = mMenu.recipes;
    }

    _menuChanged (model) {
        this.querySelector('recipe-menu-page').recipes = mMenu.recipes;
    }


    disconnectedCallback() {
        mMenu.removeSubscriber(this._menuChanged);
    }

}

customElements.define('recipe-menu-page-renderer', RecipeMenuPageRenderer);
