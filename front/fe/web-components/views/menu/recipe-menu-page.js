import WebElement from '../../abstract/web-element';
import '../recipe/parts/recipe-page-proportions';
import {t} from "../../utils/translateUtils";

const CONTAINER = 'ingredients_page';
const NAME = 'name';
const RECIPE_TEMPLATE = 'recipe-template';
const SUMMARY_TEMPLATE = 'summary-template';

const PROPORTIONS_COMPONENT = 'recipe-page-proportions';

const template = `
  <style>
    #${CONTAINER} {
        padding: 1rem;
    }
  </style>
  
  <template id='${RECIPE_TEMPLATE}'>
    <recipe-link><div class='${NAME}'></div></recipe-link>
    <${PROPORTIONS_COMPONENT}></${PROPORTIONS_COMPONENT}>
  </template>
  
  <template id='${SUMMARY_TEMPLATE}'>
  
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
                recipeTemplate.byTag(PROPORTIONS_COMPONENT).onConstruct = (comp) => {
                    comp.proportions = recipe.proportions;
                }
                recipeTemplate.byTag('recipe-link').onConstruct = (link) => {
                    link.path = `/recipe/${recipe.id}`
                }
                this.$_id(CONTAINER).appendChild(recipeTemplate);
            });
        } else {
            this.$_id(CONTAINER).innerHTML = t('menu.no_menu');
        }
    }

}

customElements.define('recipe-menu-page', RecipeMenuPage);
