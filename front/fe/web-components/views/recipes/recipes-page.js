import WebElement from '../../abstract/web-element';
import { noImage } from '../../../constants/themes';
import {t} from "../../utils/translateUtils";
import '../../components/page-list';
import mRecipeSearch from "../../model/recipeSearch";
import mRecipeList from "../../model/recipeList";

const CONTAINER = 'recipe_list_page';
const RECIPE_TEMPLATE = 'recipe_template';
const RECIPE = 'recipe';
const RECIPE_NAME = 'recipe_name';
const RECIPE_PHOTO = 'recipe_photo';
const CONTENT = 'recipes-content';

const PAGE_COMPONENT = 'page-list';

const template = `
  <style>
    #${CONTAINER} {
        padding: 1rem;
    }
    
    #${CONTENT} {
       display: grid;
       grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
       justify-items: center;
       align-content: center;
       height: 100%;
    }
    
    .${RECIPE} {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        max-width: 200px;
        min-width: 80%;
        cursor: pointer;
    }
    
    .${RECIPE_NAME} {
          text-align: center;
          padding: 5px;
          font-size: medium;
          font-weight: 600;
    }
    
    .${RECIPE_PHOTO} {
        width: 100%;
        height: 200px;
        object-fit: contain;
    }
    
  </style>
  
  <template id='${RECIPE_TEMPLATE}'>
      <recipe-link>
         <div class='${RECIPE}'>
            <img src='${noImage}' class='${RECIPE_PHOTO}'/>
            <div class='${RECIPE_NAME}'></div>
         </div>
      </recipe-link>    
  </template>
  
  <div id='${CONTAINER}'>
    <div id='${CONTENT}'></div>
    <${PAGE_COMPONENT}></${PAGE_COMPONENT}>
  </div>
`;

class RecipesPage extends WebElement {

    set recipes(newRecipes) {
        this.$recipes = newRecipes;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this._renderPage = this._renderPage.bind(this);

        this._renderPage();
    }

    _renderPage() {
        this.$_id(CONTENT).innerHTML = ''; // clear all content

        if (this.$recipes && this.$recipes.length) {

            this.$recipes.forEach(recipe => {

                const template = this.getTemplateById(RECIPE_TEMPLATE);

                template.byClass(RECIPE_NAME).textContent = recipe.name;

                if (recipe.imgPath) {
                    template.byClass(RECIPE_PHOTO).src =  recipe.imgPath;
                }

                template.byTag('recipe-link').onConstruct = (link) => {
                    link.path = `/recipe/${recipe.id}`
                }

                this.$_id(CONTENT).appendChild(template);

            });

        } else {
            this.$_id(CONTENT).innerHTML = t('recipe.no_recipes_found');
        }

        this.$(PAGE_COMPONENT).props = {
            pages: {
                count: mRecipeList.totalPages,
                currentPage: mRecipeList.currentPage
            },
            onClickCallback: (newPage) => {
                mRecipeSearch.newPage = newPage;
                this.$(PAGE_COMPONENT).currentPage = newPage;
            }
        }
    }

}

customElements.define('recipes-page', RecipesPage);
