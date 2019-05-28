import mIngredients from '../../model/ingredients';
// import router from '../../router/router-context';
import WebElement from '../../abstract/web-element';
import './ingredients-page';

const template = `
  <ingredients-page></ingredients-page>
`;

export default class IngredientsPageRenderer extends WebElement {

    constructor() {
        super(template);

         this._ingredientsFetched = this._ingredientsFetched.bind(this);
        // this.currentRecipeChanged = this.currentRecipeChanged.bind(this);
        //
         mIngredients.addSubscriber(this._ingredientsFetched);
        // router.addSubscriber(this.currentRecipeChanged);
    }

    // currentRecipeChanged() {
    //     mRecipe.retrieve(router.params.id);
    // }

    _ingredientsFetched (model) {
        this.querySelector('ingredients-page').ingredients = model.ingredients;
    }

    connectedCallback() {
        mIngredients.retrieve();
    }

    disconnectedCallback() {
        mIngredients.removeSubscriber(this._ingredientsFetched);
        // router.removeSubscriber(this.currentRecipeChanged);
    }

}

customElements.define('ingredients-page-renderer', IngredientsPageRenderer);