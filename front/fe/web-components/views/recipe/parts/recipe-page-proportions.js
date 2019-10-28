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
          <${LIST_COMPONENT} list-title='Optional:' id='${PROPORTIONS_LIST_OPTIONAL}'></${LIST_COMPONENT}>
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
        const props = {
            clickItemCallback: prop => goTo(`/ingredients/${prop.ingredientId}`),
            renderItem: (item) => `${item.ingredientName} ${item.norma ? '-' : ''} ${item.norma || ''}`,
            renderTooltip: prop => {
                let tooltipContent = ''
                if (prop.alternativeProportions && prop.alternativeProportions.length) {
                    tooltipContent = tooltipContent + '<div>Alternative to this could be:</div>'
                    prop.alternativeProportions.forEach(p => {
                        tooltipContent = tooltipContent + `<div>${p.ingredientName} - ${p.norma || ''}</div>`;
                    })
                }
                if (prop.alternativeRefs && prop.alternativeRefs.length) {
                    tooltipContent = tooltipContent + '<div>Alternative to this among recipes could be:</div>'
                    prop.alternativeRefs.forEach(p => {
                        tooltipContent = tooltipContent + `<div>${p.recipeName} - ${p.norma || ''}</div>`;
                    })
                }
                return tooltipContent;
            }
        };
        this.$_id(PROPORTIONS).querySelector(LIST_COMPONENT).props = {
            ...props,
            items: this.$proportions.filter(prop => !prop.optional)
        }
        this.$_id(PROPORTIONS_OPTIONAL).querySelector(LIST_COMPONENT).props = {
            ...props,
            items: this.$proportions.filter(prop => prop.optional)
        }
    }

    _renderPage() {
        if (this.$proportions && this.$proportions.length) {
            this._initProportions();
        }
    }

}

customElements.define('recipe-page-proportions', RecipePageProportions);
