import WebElement from '../../../abstract/web-element';

import '../../../components/list-items';
import './recipe-detail';

const CONTAINER = 'container';
const CAPTION = 'caption';

const LIST_COMPONENT = 'list-items';
const DETAIL_COMPONENT = 'recipe-detail';

const template = `
  <style>

      #${CONTAINER} {
         display: flex;
         margin: 1rem;
         align-items: flex-start;
         flex-direction: column;
      }
      
      #${CAPTION} {
        margin-bottom: 0.5rem;
      }
  </style>
  
  <div id='${CONTAINER}'>
       <div id='${CAPTION}'>Add description with photo in free form:</div>
       <${DETAIL_COMPONENT}></${DETAIL_COMPONENT}>
       <${LIST_COMPONENT}></${LIST_COMPONENT}>
  </div>
  
`;

class RecipeDetails extends WebElement {

    set recipe(newRecipe) {
        this.$recipe = newRecipe;
        this._render();
    }

    _render() {
        this.$(DETAIL_COMPONENT).props = {
            addDetail: detail => {
                this.$recipe.detail = detail;
                this.$(LIST_COMPONENT).items = this.$recipe.details;
                this.$(LIST_COMPONENT).title = 'List of details'
            }
        };
        this.$(LIST_COMPONENT).props = {
            items: this.$recipe.details,
            renderItem: item => {
                return `
                <img src="${item.imgPath}" style="width: 10rem;"/>
                <div>${item.description || ''}</div>
            `;},
            removeItemCallback: detail => {
                this.$recipe.removeDetail(detail);
            },
            title: this.$recipe.details && this.$recipe.details.length && 'List of details'
        }
    }

    constructor() {
        super(template, true);

        this._render = this._render.bind(this);
    }
}

customElements.define('recipe-details', RecipeDetails);
