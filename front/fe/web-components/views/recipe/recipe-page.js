import WebElement from '../../abstract/web-element';
import '../../components/lists/tags-list';
import {noImage} from '../../../constants/themes';

const CONTAINER = 'recipe_page';
const RECIPE_REF_TEMPLATE = 'recipe_ref_template';
const RECIPE_DETAIL_TEMPLATE = 'recipe_detail_template';

const CAPTION = 'recipe_page_caption';
const MAIN_PHOTO = 'recipe_page_main_photo';
const DESCRIPTION = 'recipe_page_description';
const REFS = 'recipe_page_refs';
const DETAILS = 'recipe_page_details';

const REF_PHOTO = 'recipe_ref_photo';
const REF_NAME = 'recipe_page_refs_name';
const DETAIL = 'detail';
const DETAILS_PHOTO = 'recipe_page_details_photo';
const DETAILS_DESCRIPTION = 'recipe_page_details_description';

const LIST_COMPONENT = 'tags-list';

const template = `
  <style>
    #${CONTAINER} {
        display: grid;
        grid-template-columns: 1fr auto auto;
    }
    
    #${CAPTION} {
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 2;
        text-align: center;
        font-size: 1.6rem;
        width: 100%;
        margin: 20px 0;
    }
    
    #recipe_page_proportions {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 2;
        grid-row-end: 3;
        padding: 0 1rem;
    }
    
    #${MAIN_PHOTO} {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 3;
        grid-row-end: 4;
        width: 100%;
        padding: 0 1rem;
        box-sizing: border-box;
    }
    
    #${DESCRIPTION} {
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 4;
        grid-row-end: 5;

        font-size: 1.1rem;
        text-align: justify;
        font-weight: 600;
        margin: 1rem;
    }
    
    #${REFS} {
        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 2;
        grid-row-end: 3;

        display: flex;
        flex-direction: column;
        cursor: pointer;
        margin: 0 1rem;
    }
    
    .${REF_NAME} {
      text-align: center;
      padding: 5px;
      font-size: medium;
      font-weight: 600;
    }
    
    .${REF_PHOTO} {
        width: 5rem;
    }
    
    #${DETAILS} {
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 5;
        grid-row-end: 6;

        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        justify-items: center;
        margin: 1rem;
    }
    
    .${DETAIL} {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        max-width: 200px;
        min-width: 80%;
        
    }
    
    .${DETAILS_DESCRIPTION} {
        padding: 1rem;
        font-size: medium;
        font-weight: 600;
     }
    
    .${DETAILS_PHOTO} {
        width: 100%;
        height: 200px;
        object-fit: contain;
    }
    
  </style>
  
  <template id='${RECIPE_REF_TEMPLATE}'>
    <recipe-link>
        <img src='${noImage}' class='${REF_PHOTO}'/>
        <div class='${REF_NAME}'/>
    </recipe-link>
  </template>
  
  <template id='${RECIPE_DETAIL_TEMPLATE}'>
    <div class='${DETAIL}'>
      <img src='${noImage}' class='${DETAILS_PHOTO}'/>
      <div class='${DETAILS_DESCRIPTION}'></div>
    </div>
  </template>
  
  <div id='${CONTAINER}'>
      <div id='${CAPTION}'></div>
      <div id='recipe_page_proportions'>
          <${LIST_COMPONENT}></${LIST_COMPONENT}>
      </div>      
      <img src='${noImage}' id='${MAIN_PHOTO}'/>
      <div id='${DESCRIPTION}'></div>  
      <div id='${REFS}'></div>
      <div id='${DETAILS}'></div>
  </div>
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

        this._renderPage = this._renderPage.bind(this);
        this._clearPage = this._clearPage.bind(this);
        this._initProportions = this._initProportions.bind(this);

        this._renderPage();
    }

    _initProportions() {
        this.$(LIST_COMPONENT).props = {
            items: this.$recipe.proportions,
            renderItem: (item) => `${item.ingredientName} ${item.norma ? '-' : ''} ${item.norma || ''}`
        }
    }

    _clearPage() {
        this.$_id(CAPTION).textContent = '';
        this.$_id(MAIN_PHOTO).src = noImage;
        this.$_id(DESCRIPTION).textContent = '';
        this.$_id(REFS).innerHTML = '';
        this.$_id(DETAILS).innerHTML = '';
    }

    _renderPage() {
        this._clearPage();

        if (this.$recipe) {

            this.$_id(CAPTION).textContent = this.$recipe.name || '';
            this.$_id(MAIN_PHOTO).src =  this.$recipe.imgPath || noImage;
            this.$_id(DESCRIPTION).textContent = this.$recipe.text || '';

            if (this.$recipe.proportions) {
                this._initProportions();
            }

            if (this.$recipe.refs) {
                this.$recipe.refs.forEach(ref => {
                    const refTemplate = this.getTemplateById(RECIPE_REF_TEMPLATE);
                    refTemplate.byTag('recipe-link').setAttribute('path', `/recipe/${ref.id}`);
                    if (ref.imgPath) {
                        refTemplate.byClass(REF_PHOTO).src = ref.imgPath;
                    }
                    refTemplate.byClass(REF_NAME).textContent = ref.name;
                    this.$_id(REFS).appendChild(refTemplate);
                })
            }

            if (this.$recipe.details) {
                this.$recipe.details.forEach(detail => {
                    const detailTemplate = this.getTemplateById(RECIPE_DETAIL_TEMPLATE);
                    if (detail.imgPath) {
                        detailTemplate.byClass(DETAILS_PHOTO).src = detail.imgPath;
                    }
                    detailTemplate.byClass(DETAILS_DESCRIPTION).textContent = detail.description;
                    this.$_id(DETAILS).appendChild(detailTemplate);
                })
            }

        }
    }

}

customElements.define('recipe-page', RecipePage);
