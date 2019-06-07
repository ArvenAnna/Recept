import {mNewRecipe} from '../../model/recipe';
import WebElement from '../../abstract/web-element';
import './create-recipe-page';
import mDepartments from "../../model/departments";

const template = `
  <create-recipe-page></create-recipe-page>
`;

class CreateRecipePageRenderer extends WebElement {

    constructor() {
        super(template);

        this._newRecipeChanged = this._newRecipeChanged.bind(this);
        this._departmentsChanged = this._departmentsChanged.bind(this);

        mNewRecipe.addSubscriber(this._newRecipeChanged);
        mDepartments.addSubscriber(this._departmentsChanged);
        this.querySelector('create-recipe-page').recipe = mNewRecipe;
        this.querySelector('create-recipe-page').departments = mDepartments.departments;
    }

    _newRecipeChanged (model) {
        const newRecipePage = this.querySelector('create-recipe-page');
        newRecipePage.recipe = model;
        // ingPage.addIngredient = model.add; // set it once it constructed
    }

    _departmentsChanged (model) {
        const newRecipePage = this.querySelector('create-recipe-page');
        newRecipePage.departments = model.departments;
    }
    //
    // connectedCallback() {
    //     mIngredients.retrieve();
    // }
    //
    disconnectedCallback() {
        mNewRecipe.removeSubscriber(this._newRecipeChanged);
        mDepartments.removeSubscriber(this._departmentsChanged);
    }

}

customElements.define('create-recipe-page-renderer', CreateRecipePageRenderer);
