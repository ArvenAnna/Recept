import WebElement from '../../abstract/web-element';
import {noImage} from "../../../constants/themes";

const CONTAINER = 'ingredient-page';

const CAPTION = 'ingredient-page-caption';
const MAIN_PHOTO = 'ingredient-page-photo';
const DESCRIPTION = 'ingredient-page-description';

const template = `
  <style>
    #${CAPTION} {
        text-align: center;
        font-size: var(--header-font-size);
        /*width: 100%;*/
        /*margin: 20px 0;*/
        text-shadow: var(--text-shadow);
    }
    
    #${DESCRIPTION} {
        text-align: justify;
        /*margin: 1rem;*/
    }
    
    #${MAIN_PHOTO} {
        width: 100%;
        /*padding: 0.5rem 1rem;*/
        box-sizing: border-box;
        border-radius: var(--theme-border-radius);
    }
  </style>
  
  <div id='${CONTAINER}'>
      <div id='${CAPTION}'></div>
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
    }

    _renderPage() {
        this._clearPage();
        if (this.$ingredient) {
            this.$_id(CAPTION).textContent = this.$ingredient.name || '';
            this.$_id(MAIN_PHOTO).src =  this.$ingredient.imgPathFull || noImage;
            this.$_id(DESCRIPTION).textContent = this.$ingredient.description || '';
        }
    }

}

customElements.define('ingredient-page', IngredientPage);
