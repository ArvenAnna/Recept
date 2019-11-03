import WebElement from '../../abstract/web-element';
import {noImage} from '../../../constants/themes';
import '../../router/recipe-link';

const CONTAINER = 'ingredient-page';

const CAPTION = 'ingredient-page-caption';
const SUB_CAPTION = 'ingredient-parent';
const MAIN_PHOTO = 'ingredient-page-photo';
const DESCRIPTION = 'ingredient-page-description';

const LINK_COMPONENT = 'recipe-link';

const template = `
  <style>
    #${CAPTION} {
        text-align: center;
        font-size: var(--header-font-size);
        text-shadow: var(--text-shadow);
    }
    
    #${SUB_CAPTION} {
        text-align: center;
        font-size: var(--normal-font-size);
        cursor: pointer;
        text-decoration: underline;
    }
    
    #${DESCRIPTION} {
        text-align: justify;
        margin: 1rem;
        white-space: pre-wrap;
    }
    
    #${MAIN_PHOTO} {
        width: 100%;
        padding: 0.5rem 1rem;
        box-sizing: border-box;
        border-radius: var(--theme-border-radius);
    }
  </style>
  
  <div id='${CONTAINER}'>
      <div id='${CAPTION}'></div>
      <${LINK_COMPONENT}>
        <div id='${SUB_CAPTION}'></div>
      </${LINK_COMPONENT}>
      <img src='${noImage}' id='${MAIN_PHOTO}'/>
      <div id='${DESCRIPTION}'></div> 
  </div>
`;

class IngredientPage extends WebElement {

    set ingredient(ingredient) {
        this.$ingredient = ingredient;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this._clearPage = this._clearPage.bind(this);
        this._renderPage = this._renderPage.bind(this);
    }

    _clearPage() {
        this.$_id(CAPTION).textContent = '';
        this.$_id(MAIN_PHOTO).src = noImage;
        this.$_id(DESCRIPTION).textContent = '';
        this.$_id(SUB_CAPTION).textContent = '';
        this.$(LINK_COMPONENT).path = null;
    }

    _renderPage() {
        this._clearPage();
        if (this.$ingredient) {
            this.$_id(CAPTION).textContent = this.$ingredient.name || '';
            this.$_id(MAIN_PHOTO).src =  this.$ingredient.imgPathFull || noImage;
            this.$_id(DESCRIPTION).textContent = this.$ingredient.description || '';
            this.$_id(SUB_CAPTION).textContent = this.$ingredient.parentName || '';
            this.$(LINK_COMPONENT).path = `/ingredients/${this.$ingredient.parent}`;
        }
    }

}

customElements.define('ingredient-page', IngredientPage);
