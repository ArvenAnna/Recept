import WebElement from '../../abstract/web-element';

import mModal from '../../model/modal';

import '../../components/lists/tags-list';
import './parts/recipe-reference';
import { noImage } from '../../../constants/themes';
import {goTo} from '../../router/utils';

const CONTAINER = 'recipe_page';
const RECIPE_REF_TEMPLATE = 'recipe_ref_template';
const RECIPE_DETAIL_TEMPLATE = 'recipe_detail_template';
const RECIPE_DETAIL_PHOTO_TEMPLATE = 'recipe-detail-photo-template';

const CAPTION = 'recipe_page_caption';
const MAIN_PHOTO = 'recipe_page_main_photo';
const DESCRIPTION = 'recipe_page_description';
const REFS = 'recipe_page_refs';
const DETAILS = 'recipe_page_details';

const DETAIL = 'detail';
const DETAILS_PHOTO = 'recipe_page_details_photo';
const DETAILS_PHOTO_FULL = 'recipe_page_details_photo_full';
const DETAILS_DESCRIPTION = 'recipe_page_details_description';
const REFS_CONTAINER = 'refs-container';
const PROPORTIONS = 'recipe-proportions';

const LIST_COMPONENT = 'tags-list';
const RECIPE_REF_COMPONENT = 'recipe-reference';

const template = `
  <style>
    #${CONTAINER} {
        display: grid;
        grid-template-columns: 1fr auto;
        position: relative;
    }
    
    #${CAPTION} {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 2;
        text-align: center;
        font-size: var(--header-font-size);
        width: 100%;
        margin: 20px 0;
        text-shadow: var(--text-shadow);
    }
    
    #${PROPORTIONS} {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 2;
        grid-row-end: 3;
        padding: 0 1rem;
    }
    
    #${MAIN_PHOTO} {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 3;
        grid-row-end: 4;
        width: 100%;
        padding: 0.5rem 1rem;
        box-sizing: border-box;
        border-radius: var(--theme-border-radius);
    }
    
    #${DESCRIPTION} {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 4;
        grid-row-end: 5;

        text-align: justify;
        margin: 1rem;
    }
    
    #${REFS_CONTAINER} {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 3;
        grid-row-end: 4;

        display: flex;
        flex-direction: column;
        margin: 0 1rem;
        padding: 0.5rem 1rem;
    }
    
    #${REFS} {
        cursor: pointer;
    }
    
    #${DETAILS} {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 5;
        grid-row-end: 6;

        display: grid;
        background-color: var(--dark-background);
        border-radius: var(--theme-border-radius);
        grid-template-columns: repeat(auto-fit, minmax(var(--card-width), 1fr));
        justify-items: center;
        margin: 1rem;
        padding: 1rem;
    }
    
    .${DETAIL} {
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: flex-start;
       width: var(--card-width); 
       padding-bottom: 1rem;
    }
    
    .${DETAILS_DESCRIPTION} {
        padding: 0.2rem 0;
        color: var(--light-background);
     }
    
    .${DETAILS_PHOTO} {
        width: 100%;
        
        object-fit: contain;
        border-radius: var(--theme-border-radius);
    }
    
    .${DETAILS_PHOTO_FULL} {
        width: 100%;
        position: fixed;
    }
    
  </style>
  
  <template id='${RECIPE_REF_TEMPLATE}'>
    <${RECIPE_REF_COMPONENT}></${RECIPE_REF_COMPONENT}>
  </template>
  
  <template id='${RECIPE_DETAIL_TEMPLATE}'>
    <div class='${DETAIL}'>
        <img src='${noImage}' class='${DETAILS_PHOTO}'/>
        <div class='${DETAILS_DESCRIPTION}'></div>
    </div>
  </template>
  
  <template id='${RECIPE_DETAIL_PHOTO_TEMPLATE}'>
        <img src='${noImage}' class='${DETAILS_PHOTO_FULL}'/>
  </template>
  
  <div id='${CONTAINER}'>
      <div id='${CAPTION}'></div>
      <div id='${PROPORTIONS}'>
          <${LIST_COMPONENT}></${LIST_COMPONENT}>
      </div>      
      <img src='${noImage}' id='${MAIN_PHOTO}'/>
      <div id='${DESCRIPTION}'></div>  
      <div id='${REFS_CONTAINER}'>
        References:
        <div id='${REFS}'></div>
      </div>
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
        this._openFullPhoto = this._openFullPhoto.bind(this);

        this._renderPage();
    }

    _openFullPhoto(imgPath) {
        const photoTemplate = this.getTemplateById(RECIPE_DETAIL_PHOTO_TEMPLATE);
        photoTemplate.byTag('img').src = imgPath;
        mModal.open(photoTemplate);
        // this.$_id(CONTAINER).appendChild(photoTemplate);
    }

    _initProportions() {
        this.$(LIST_COMPONENT).props = {
            items: this.$recipe.proportions,
            clickItemCallback: prop => goTo(`/ingredients/${prop.ingredientId}`),
            renderItem: (item) => `${item.ingredientName} ${item.norma ? '-' : ''} ${item.norma || ''}`
        }
    }

    _clearPage() {
        this.$_id(CAPTION).textContent = '';
        this.$_id(MAIN_PHOTO).src = noImage;
        this.$_id(DESCRIPTION).textContent = '';
        this.$_id(REFS).innerHTML = '';
        this.$_id(DETAILS).innerHTML = '';
        this.$_id(DETAILS).style.display = 'none';
        this.$_id(REFS_CONTAINER).style.display = 'none';
    }

    _renderPage() {
        this._clearPage();

        if (this.$recipe) {

            this.$_id(CAPTION).textContent = this.$recipe.name || '';
            this.$_id(MAIN_PHOTO).src =  this.$recipe.imgPathFull || noImage;
            this.$_id(DESCRIPTION).textContent = this.$recipe.text || '';

            if (this.$recipe.proportions) {
                this._initProportions();
            }

            if (this.$recipe.refs && this.$recipe.refs.length) {
                this.$_id(REFS_CONTAINER).style.display = 'flex';
                this.$recipe.refs.forEach(ref => {
                    const refTemplate = this.getTemplateById(RECIPE_REF_TEMPLATE);
                    refTemplate.byTag(RECIPE_REF_COMPONENT).onConstruct = (component) => {
                        component.props = {src: ref.imgPath, text: ref.name, link: `/recipe/${ref.id}`};
                    }
                    this.$_id(REFS).appendChild(refTemplate);
                })
            }

            if (this.$recipe.details && this.$recipe.details.length) {
                this.$_id(DETAILS).style.display = 'flex';
                this.$recipe.details.forEach(detail => {
                    const detailTemplate = this.getTemplateById(RECIPE_DETAIL_TEMPLATE);
                    if (detail.imgPath) {
                        detailTemplate.byClass(DETAILS_PHOTO).src = detail.imgPath;
                        detailTemplate.byClass(DETAILS_PHOTO).addEventListener('click', this._openFullPhoto.bind(this, detail.imgPathFull));
                    }
                    detailTemplate.byClass(DETAILS_DESCRIPTION).textContent = detail.description;
                    this.$_id(DETAILS).appendChild(detailTemplate);
                })
            }

        }
    }

}

customElements.define('recipe-page', RecipePage);
