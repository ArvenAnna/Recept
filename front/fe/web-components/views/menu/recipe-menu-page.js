import WebElement from '../../abstract/web-element';
import '../recipe/parts/recipe-page-proportions';
import {t} from "../../utils/translateUtils";

const CONTAINER = 'menu_page';
const NAME = 'name';
const SUMMARY = 'summary';
const RECIPE_TEMPLATE = 'recipe-template';
const SUMMARY_TEMPLATE = 'summary-template';
const NO_CONTENT_TEMPLATE = 'no-content-template';

const PROPORTIONS_COMPONENT = 'recipe-page-proportions';

const template = `
  <style>
    #${CONTAINER} {
        padding: 1rem;
    }
    
    .center {
        display: flex;
        justify-content: center;
    }
  </style>
  
  <template id='${RECIPE_TEMPLATE}'>
    <recipe-link><div class='${NAME}'></div></recipe-link>
    <${PROPORTIONS_COMPONENT}></${PROPORTIONS_COMPONENT}>
  </template>
  
  <template id='${SUMMARY_TEMPLATE}'>
    <div class='center'>Summary: </div>
    <div class='${SUMMARY}'></div>
  </template>
  
  <template id='${NO_CONTENT_TEMPLATE}'>
    <div class='center'>${t('menu.no_menu')}</div>
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
        this._consolidateProportions = this._consolidateProportions.bind(this);
    }

    _renderPage() {
        this.$_id(CONTAINER).innerHTML = '';
        if (this.$recipes && this.$recipes.length) {
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

            const summaryTemplate = this.getTemplateById(SUMMARY_TEMPLATE);
            let summary = '';
            this._consolidateProportions(this.$recipes).forEach(prop => {
                summary = `${summary}<div>${prop.ingredientName} - ${prop.normas.join(', ')}</div>`
            });
            summaryTemplate.byClass(SUMMARY).innerHTML = summary;
            this.$_id(CONTAINER).appendChild(summaryTemplate);

        } else {
            const noContentTemplate = this.getTemplateById(NO_CONTENT_TEMPLATE);
            this.$_id(CONTAINER).appendChild(noContentTemplate);
        }
    }

    _consolidateProportions(recipes) {
        const consolidatedProportions = [];
        recipes.forEach(recipe => {
            recipe.proportions.forEach(prop => {
                const existentProp = consolidatedProportions.find(cp => cp.ingredientId === prop.ingredientId);
                if (existentProp && prop.norma) {
                    existentProp.normas.push(prop.norma);
                } else if (!existentProp && prop.norma) {
                    consolidatedProportions.push({ingredientId: prop.ingredientId, ingredientName: prop.ingredientName, normas: [prop.norma]})
                }
            });
        });
        return consolidatedProportions;
    }

}

customElements.define('recipe-menu-page', RecipeMenuPage);
