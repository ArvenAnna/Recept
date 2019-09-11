import WebElement from '../../../abstract/web-element';

import '../../../components/list-items';
import './recipe-detail';

const CONTAINER = 'container';
const CAPTION = 'caption';
const CAPTION_CONTAINER = 'caption-container';
const EXPAND_ICON = 'expand-icon';

const LIST_COMPONENT = 'list-items';
const DETAIL_COMPONENT = 'recipe-detail';

const ICON_ARROW_DOWN = 'svg/caret-down.svg';
const ICON_ARROW_UP = 'svg/sort-up.svg';

const template = `
  <style>

      #${CONTAINER} {
         display: flex;
         margin: 1rem;
         align-items: flex-start;
         flex-direction: column;
      }
      
      #${CAPTION} {
      }
      
      #${EXPAND_ICON} {
        width: 0.5rem;
        height: 0.5rem;
        cursor: pointer;
        position: absolute;
        left: -0.8rem;
      }
      
      ${DETAIL_COMPONENT} {
        display: none;
      }
      
      #${CAPTION_CONTAINER} {
        display: flex;
        align-items: center;
        position: relative;
      }
      
  </style>
  
  <div id='${CONTAINER}'>
       <div id='${CAPTION_CONTAINER}'>
            <img src="${ICON_ARROW_DOWN}" id="${EXPAND_ICON}"/>
            <span id='${CAPTION}'>Add description with photo in free form:</span>
       </div>
       
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

    _toggleContent() {
        this.$isContentExpanded = !this.$isContentExpanded;
        if (this.$isContentExpanded) {
            this.$_id(EXPAND_ICON).src = ICON_ARROW_UP;
            this.$(DETAIL_COMPONENT).style.display = 'block';
        } else {
            this.$_id(EXPAND_ICON).src = ICON_ARROW_DOWN;
            this.$(DETAIL_COMPONENT).style.display = 'none';
        }
    }

    constructor() {
        super(template, true);

        this._render = this._render.bind(this);
        this._toggleContent = this._toggleContent.bind(this);

        this.$isContentExpanded = false;

        this.$_id(EXPAND_ICON).addEventListener('click', this._toggleContent);
    }
}

customElements.define('recipe-details', RecipeDetails);
