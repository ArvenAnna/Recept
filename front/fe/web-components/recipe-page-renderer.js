import mRecipe from './model/recipe';
import router from './router/router-context';

const template = document.createElement('template');
template.innerHTML = `
  <recipe-page/>
`;


export default class RecipePageRenderer extends HTMLElement {

    constructor() {
        super();

        this.currentRecipeFetched = this.currentRecipeFetched.bind(this);
        this.currentRecipeChanged = this.currentRecipeChanged.bind(this);

        this.appendChild(template.content.cloneNode(true));
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