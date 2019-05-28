import WebElement from '../../abstract/web-element';
import '../../components/list-items';

const CONTAINER = 'recipe_list_page';
const RECIPE_TEMPLATE = 'recipe_template';

const template = `
  <style>
    #recipe_list_page {
       display: grid;
       grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
       justify-items: center;
    }
    
    .recipe {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        max-width: 200px;
        min-width: 80%;
    }
    
    .recipe_name {
        text-align: center;
          padding: 5px;
          color: var(--text);
          font-size: medium;
          font-weight: 600;
    }
    
    .recipe_photo {
        width: 100%;
    }
   
    
  </style>
  
  <template id='${RECIPE_TEMPLATE}'>
      <recipe-link>
        <div class='recipe'>
         <img src='svg/dish-fork-and-knife.svg' class='recipe_photo'/>
         <div class='recipe_name'/>
        </div>
      </recipe-link>    
  </template>
  
  <div id='${CONTAINER}'></div>
`;

// const supportedAttributes = {
//     ID: 'recipe-id'
// }

class RecipesPage extends WebElement {

    set recipes(newRecipes) {
        this.$recipes = newRecipes;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this.bindMethods(this._renderPage);
    }

    connectedCallback() {
        this._renderPage();
    }

    _renderPage() {
        this.$(`#${CONTAINER}`).innerHTML = ''; // clear all content

        if (this.$recipes) {

            this.$recipes.forEach(recipe => {

                const template = this.getTemplateById(RECIPE_TEMPLATE);

                template.querySelector('.recipe_name').textContent = recipe.name;

                if (recipe.imgPath) {
                    template.querySelector('.recipe_photo').src =  recipe.imgPath;
                }

                template.querySelector('recipe-link').onConstruct = (link) => {
                    link.path = `/recipe/${recipe.id}`
                }

                this.$(`#${CONTAINER}`).appendChild(template);

            });


        }
    }

}

customElements.define('recipes-page', RecipesPage);
