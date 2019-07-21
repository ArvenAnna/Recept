import mNewRecipe from '../../model/newRecipe';
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

        this.querySelector('create-recipe-page').props = {
            recipe: mNewRecipe,
            departments: mDepartments.departments
        }
    }

    _newRecipeChanged (model) {
        const newRecipePage = this.querySelector('create-recipe-page');
        newRecipePage.recipe = model;
    }

    _departmentsChanged (model) {
        const newRecipePage = this.querySelector('create-recipe-page');
        newRecipePage.departments = model.departments;
    }

    disconnectedCallback() {
        mNewRecipe.removeSubscriber(this._newRecipeChanged);
        mDepartments.removeSubscriber(this._departmentsChanged);
    }

}

customElements.define('create-recipe-page-renderer', CreateRecipePageRenderer);
