import mRecipe from '../../model/recipe';
import mHeader from '../../model/header';
import router from '../../router/router-context';
import WebElement from '../../abstract/web-element';
import './recipe-page';

const template = `
  <recipe-page></recipe-page>
`;

//TODO: add decorator for adding subscriber
export default class RecipePageRenderer extends WebElement {

    constructor() {
        super(template);

        this.currentRecipeFetched = this.currentRecipeFetched.bind(this);
        this.currentRecipeChanged = this.currentRecipeChanged.bind(this);

        mRecipe.addSubscriber(this.currentRecipeFetched);
        router.addSubscriber(this.currentRecipeChanged);

        mRecipe.retrieve(router.params.id);
    }

    currentRecipeChanged() {
        mRecipe.retrieve(router.params.id);
    }

    currentRecipeFetched (newRecipe) {
        this.querySelector('recipe-page').recipe = newRecipe;
        mHeader.addRecipeEditButton(newRecipe.id);
    }

    disconnectedCallback() {
        mRecipe.removeSubscriber(this.currentRecipeFetched);
        router.removeSubscriber(this.currentRecipeChanged);
        mHeader.removeRecipeEditButton();
    }

}

customElements.define('recipe-page-renderer', RecipePageRenderer);
