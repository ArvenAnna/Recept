import mRecipe from '../../model/recipe';
import router from '../../router/router-context';
import WebElement from '../../abstract/web-element';
import './recipe-page';

const template = `
  <recipe-page></recipe-page>
`;

export default class RecipePageRenderer extends WebElement {

    constructor() {
        super(template);

        this.currentRecipeFetched = this.currentRecipeFetched.bind(this);
        this.currentRecipeChanged = this.currentRecipeChanged.bind(this);

        mRecipe.addSubscriber(this.currentRecipeFetched);
        router.addSubscriber(this.currentRecipeChanged);
    }

    currentRecipeChanged() {
        mRecipe.retrieve(router.params.id);
    }

    currentRecipeFetched (newRecipe) {
        this.querySelector('recipe-page').recipe = newRecipe;
    }

    connectedCallback() {
        mRecipe.retrieve(router.params.id);
    }

    disconnectedCallback() {
        mRecipe.removeSubscriber(this.currentRecipeFetched);
        router.removeSubscriber(this.currentRecipeChanged);
    }

}

customElements.define('recipe-page-renderer', RecipePageRenderer);