import mNewRecipe from '../../model/newRecipe';
import WebElement from '../../abstract/web-element';
import './create-recipe-page';
import mDepartments from "../../model/departments";
import router from '../../router/router-context';

const template = `
  <create-recipe-page></create-recipe-page>
`;

class EditRecipePageRenderer extends WebElement {

    constructor() {
        super(template);

        this._newRecipeChanged = this._newRecipeChanged.bind(this);
        this._departmentsChanged = this._departmentsChanged.bind(this);

        mNewRecipe.addSubscriber(this._newRecipeChanged);
        mDepartments.addSubscriber(this._departmentsChanged);

        mNewRecipe.retrieve(router.params.id);

        //router.addSubscriber(this._newRecipeChanged);

        this.querySelector('create-recipe-page').props = {
            recipe: mNewRecipe,
            departments: mDepartments.departments
        }
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
        //router.removeSubscriber(this._newRecipeChanged);
    }

}

customElements.define('edit-recipe-page-renderer', EditRecipePageRenderer);
