import WebElement from '../../../abstract/web-element';

import '../../../components/lists/tags-list';
import { goTo } from '../../../router/utils';

const CONTAINER = 'recipe-page-proportions-container';
const PROPORTIONS = 'recipe-page-proportions';
const PROPORTIONS_OPTIONAL = 'recipe-page-proportions-optional';
const PROPORTIONS_LIST = 'proportions-list';
const PROPORTIONS_LIST_OPTIONAL = 'proportions-list-optional';

const LIST_COMPONENT = 'tags-list';

const template = `
  <style>
    #${CONTAINER} {
      
    }
  </style>
  
  <div id='${CONTAINER}'>
      <div id='${PROPORTIONS}'>
          <${LIST_COMPONENT} id='${PROPORTIONS_LIST}'></${LIST_COMPONENT}>
      </div> 
      <div id='${PROPORTIONS_OPTIONAL}'>
          <${LIST_COMPONENT} title='Опционально:' id='${PROPORTIONS_LIST_OPTIONAL}'></${LIST_COMPONENT}>
      </div>   
  </div>
`;

class RecipePageProportions extends WebElement {

    set proportions(proportions) {
        this.$proportions = proportions || [];
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this._renderPage = this._renderPage.bind(this);
        this._initProportions = this._initProportions.bind(this);

        this._renderPage();
    }

    _initProportions() {
        this.$_id(PROPORTIONS).querySelector(LIST_COMPONENT).props = {
            items: this.$proportions.filter(prop => !prop.optional),
            clickItemCallback: prop => goTo(`/ingredients/${prop.ingredientId}`),
            renderItem: (item) => `${item.ingredientName} ${item.norma ? '-' : ''} ${item.norma || ''}`
        }
        this.$_id(PROPORTIONS_OPTIONAL).querySelector(LIST_COMPONENT).props = {
            items: this.$proportions.filter(prop => prop.optional),
            clickItemCallback: prop => goTo(`/ingredients/${prop.ingredientId}`),
            renderItem: (item) => `${item.ingredientName} ${item.norma ? '-' : ''} ${item.norma || ''}`
        }
    }

    _renderPage() {
        if (this.$proportions && this.$proportions.length) {
            this._initProportions();
        }
    }

}

customElements.define('recipe-page-proportions', RecipePageProportions);
