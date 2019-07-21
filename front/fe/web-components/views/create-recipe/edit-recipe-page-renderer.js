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
        this._onRouteChange = this._onRouteChange.bind(this);

        mNewRecipe.addSubscriber(this._newRecipeChanged);
        mDepartments.addSubscriber(this._departmentsChanged);
        router.addSubscriber(this._onRouteChange);

        mNewRecipe.retrieve(router.params.id);

        this.querySelector('create-recipe-page').props = {
            recipe: mNewRecipe,
            departments: mDepartments.departments
        }
    }

    _onRouteChange({params: {id}}) {
        mNewRecipe.retrieve(id);
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
        router.removeSubscriber(this._onRouteChange);
    }

}

customElements.define('edit-recipe-page-renderer', EditRecipePageRenderer);
