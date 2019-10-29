import WebElement from '../../../abstract/web-element';

import '../../../components/lists/draggable-image-list';
import './recipe-detail';
import {noImage} from '../../../../constants/themes';
import {t} from '../../../utils/translateUtils';

const CONTAINER = 'container';
const LIST_CONTAINER = 'list-container';

const LIST_COMPONENT = 'draggable-image-list';
const DETAIL_COMPONENT = 'recipe-detail';

const template = `
  <style>
      #${CONTAINER} {
     
      }
      
      #${LIST_CONTAINER} {
          margin-left: 1rem;
      }

  </style>
  
  <div id='${CONTAINER}'>
       <${DETAIL_COMPONENT}></${DETAIL_COMPONENT}>
       <div id='${LIST_CONTAINER}'>
            <${LIST_COMPONENT} list-title='${t('create-recipe.details_list')}'></${LIST_COMPONENT}>
       </div>
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
                this.$(LIST_COMPONENT).data = this._constructDataForList();
            }
        };
        this.$(LIST_COMPONENT).props = {
            data: this._constructDataForList(),
            removeItemCallback: detail => {
                this.$recipe.removeDetail(detail);
                this.$(LIST_COMPONENT).data = this._constructDataForList();
            },
            defaultSrc: noImage,
            editTextCallback: (dataItem, newText) => {
                dataItem.description = newText;
                this.$recipe.detail = dataItem;
            },
            dragCallback: (dataItemFrom, dataItemTo) => {
                this.$recipe.reorderDetails(dataItemFrom, dataItemTo);
                this.$(LIST_COMPONENT).data = this._constructDataForList();
            }
        }
    }

    _constructDataForList() {
        return this.$recipe.details && this.$recipe.details.map(detail =>({
            item: detail,
            src: detail.imgPath,
            text: detail.description,
        }));
    }

    constructor() {
        super(template, true);

        this._render = this._render.bind(this);
        this._constructDataForList = this._constructDataForList.bind(this);
    }
}

customElements.define('recipe-details', RecipeDetails);
