import WebElement from '../../abstract/web-element';

const CONTAINER = 'ingredients_page';
const NAME = 'name';
const RECIPE_TEMPLATE = 'recipe-template';

const template = `
  <style>
    #${CONTAINER} {
        padding: 1rem;
    }
  </style>
  
  <template id='${RECIPE_TEMPLATE}'>
    <div class='${NAME}'></div>
  </template>
  
  <div id='${CONTAINER}'>
  
  </div>
`;

class RecipeMenuPage extends WebElement {

    set recipes(recipes) {
        this.$recipes = recipes;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this._renderPage = this._renderPage.bind(this);
    }

    _renderPage() {
        this.$_id(CONTAINER).innerHTML = '';
        if (this.$recipes) {
            this.$recipes.forEach(recipe => {
                const recipeTemplate = this.getTemplateById(RECIPE_TEMPLATE);

                recipeTemplate.byClass(NAME).textContent = recipe.name;
                this.$_id(CONTAINER).appendChild(recipeTemplate);
            });
        }
    }

}

customElements.define('recipe-menu-page', RecipeMenuPage);
