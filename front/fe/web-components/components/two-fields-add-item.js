import WebElement from '../abstract/web-element';
import './drop-down/dropdown-list';
import './suggestions-input';
import '../styled/input-text-with-icon';
import {addIcon} from '../../constants/themes';

const CONTAINER = 'container';

const INGREDIENT_INPUT_COMPONENT = 'suggestions-input';
const NORMA_INPUT_COMPONENT = 'input-text-with-icon';

const template = `
  <style>
    
    #${CONTAINER} {
        display: flex;
        align-items: center;
        position: relative;
    }
    
    ${INGREDIENT_INPUT_COMPONENT} {
        margin-right: 0.2rem;
    }
    
  </style>
  
  <div id="${CONTAINER}">
    <${INGREDIENT_INPUT_COMPONENT}></${INGREDIENT_INPUT_COMPONENT}>
    <${NORMA_INPUT_COMPONENT}></${NORMA_INPUT_COMPONENT}>
  </div>
  
`;

class TwoFieldsAddItem extends WebElement {

    set props({addItemCallback, getSuggestionsPromise,
                  renderSuggestionCallback, placeholders}) {

        // required props: renderSuggestionCallback

        this.$addItem = addItemCallback;

        if (getSuggestionsPromise) {
            if (!renderSuggestionCallback) {
                throw new Error("add-item component:  if you want to use suggestions pass please renderSuggestionCallback");
            }
        }

        this.$(INGREDIENT_INPUT_COMPONENT).props = {
            getSuggestionsPromise, renderSuggestionCallback, placeholder: placeholders.first
        }

        this.$(NORMA_INPUT_COMPONENT).placeholder = placeholders.second;
        this.$(NORMA_INPUT_COMPONENT).iconClick = this._addItem;
        this.$(NORMA_INPUT_COMPONENT).src = addIcon;
    }

    constructor() {
        super(template, true);

        this._addItem = this._addItem.bind(this);
    }

    _addItem() {
        if (this.$addItem) {
            this.$addItem({
                first: this.$(INGREDIENT_INPUT_COMPONENT).currentValue,
                second: this.$(NORMA_INPUT_COMPONENT).value
            });
            this.$(INGREDIENT_INPUT_COMPONENT).clearInput();
            this.$(NORMA_INPUT_COMPONENT).value = '';
        }
    }
}

customElements.define('two-fields-add-item', TwoFieldsAddItem);
