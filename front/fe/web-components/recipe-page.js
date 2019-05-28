import WebElement from './abstract/web-element';
import 'list-items';

const CONTAINER = 'recipe_page';
const RECIPE_TEMPLATE = 'recipe_template';
const RECIPE_REF_TEMPLATE = 'recipe_ref_template';
const RECIPE_DETAIL_TEMPLATE = 'recipe_detail_template';

const template = `
  <style>
    #recipe_page {
        display: grid;
        grid-template-columns: 1fr auto auto;
    }
    
    .recipe_page_caption {
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 2;
        text-align: center;
        font-size: 1.6rem;
        width: 100%;
        background-color: var(--content-color, black);
        margin: 0 0 20px 0;
        box-shadow: var(--shadow);
        color: var(--text-color, white);
    }
    
    .recipe_page_proportions {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 2;
        grid-row-end: 3;
        padding: 0 1rem;
    }
    
    .recipe_page_main_photo {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 2;
        grid-row-end: 3;

        width: 100%;
    }
    
    .recipe_page_description {
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 3;
        grid-row-end: 4;

        padding: 0.5rem 0;
        font-size: 1.1rem;
        text-align: justify;
        color: var(--text-color, white);
        font-weight: 600;
    }
    
    .recipe_page_refs {
        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 2;
        grid-row-end: 3;

        display: flex;
        flex-direction: column;
        cursor: pointer;
    }
    
    .recipe_page_refs_name {
      text-align: center;
      padding: 5px;
      color: var(--text-color, white);
      font-size: medium;
      font-weight: 600;
    }
    
    .recipe_ref_photo {
        width: 5rem;
    }
    
    .recipe_page_details {
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 4;
        grid-row-end: 5;

        display: grid;
        grid-template-columns: 2fr 1fr;
    }
    
    .recipe_page_details_description {
        padding: 1rem;
        color: var(--text-color, white);
        font-size: medium;
        font-weight: 600;
    }
    
    .recipe_page_details_photo {
        width: 100%;
        padding: 0.5rem 0;
        box-sizing: border-box;
    }
    
  </style>
  
  <template id='${RECIPE_REF_TEMPLATE}'>
    <recipe-link>
        <img src='svg/dish-fork-and-knife.svg' class='recipe_ref_photo'/>
        <div class='recipe_page_refs_name'/>
    </recipe-link>
  </template>
  
  <template id='${RECIPE_DETAIL_TEMPLATE}'>
      <img src='svg/dish-fork-and-knife.svg' class='recipe_page_details_photo'/>
      <div class='recipe_page_details_description'></div>
  </template>
  
  <template id='${RECIPE_TEMPLATE}'>
       <div class='recipe_page_caption'></div>
       <div class='recipe_page_proportions'>
          <recipe-list-items/>
       </div>      
       <img src='svg/dish-fork-and-knife.svg' class='recipe_page_main_photo'/>
       <div class='recipe_page_description'></div>  
       <div class='recipe_page_refs'></div>
       <div class='recipe_page_details'></div>
  </template>
  
  <div id='recipe_page'></div>
`;

const supportedAttributes = {
    ID: 'recipe-id'
}

class RecipePage extends WebElement {

    set recipe(newRecipe) {
        this.$recipe = newRecipe;
        this.setAttribute(supportedAttributes.ID, newRecipe.id);
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this.bindMethods(this._renderPage, this._initProportions);
    }

    connectedCallback() {
        this._renderPage();
    }

    _initProportions(proportionsListItems) {
        proportionsListItems.items = this.$recipe.proportions;

        proportionsListItems.renderItem = (item) => `
                <div key='name'>${item.ingredientName}</div>
                <div key='separator'>&nbsp;-&nbsp;</div>
                <div key='norma'>${item.norma || ''}</div>
            `;
    }

    _renderPage() {
        this.$(`#${CONTAINER}`).innerHTML = ''; // clear all content

        if (this.$recipe) {

            const template = this.getTemplateById(RECIPE_TEMPLATE);

            template.querySelector('.recipe_page_caption').textContent = this.$recipe.name;

            if (this.$recipe.proportions) {
                const proportionListEl = template.querySelector('recipe-list-items');
                proportionListEl.onConstruct = this._initProportions;
            }

            if (this.$recipe.imgPath) {
                template.querySelector('.recipe_page_main_photo').src =  this.$recipe.imgPath;
            }

            if (this.$recipe.text) {
                template.querySelector('.recipe_page_description').textContent = this.$recipe.text;
            }

            if (this.$recipe.refs) {
                this.$recipe.refs.forEach(ref => {
                    const refTemplate = this.getTemplateById(RECIPE_REF_TEMPLATE);
                    refTemplate.querySelector('recipe-link').setAttribute('path', `/recipe/${ref.id}`);
                    if (ref.imgPath) {
                        refTemplate.querySelector('.recipe_ref_photo').src = ref.imgPath;
                    }
                    refTemplate.querySelector('.recipe_page_refs_name').textContent = ref.name;
                    template.querySelector('.recipe_page_refs').appendChild(refTemplate);
                })
            }

            if (this.$recipe.details) {
                this.$recipe.details.forEach(detail => {
                    const detailTemplate = this.getTemplateById(RECIPE_DETAIL_TEMPLATE);
                    if (detail.imgPath) {
                        detailTemplate.querySelector('.recipe_page_details_photo').src = detail.imgPath;
                    }
                    detailTemplate.querySelector('.recipe_page_details_description').textContent = detail.description;
                    template.querySelector('.recipe_page_details').appendChild(detailTemplate);
                })
            }

            this.$(`#${CONTAINER}`).appendChild(template);
        }
    }

}

customElements.define('recipe-page', RecipePage);
