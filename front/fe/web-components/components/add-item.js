import WebElement from '../abstract/web-element';
import './dropdown-list';
import './suggestions-input';

const CONTAINER = 'container';

const SUGGESTION_INPUT_COMPONENT = 'suggestions-input';

const template = `
  <style>
    
    #${CONTAINER} {
        display: flex;
        position: relative;
        align-items: center;
    }
    
  </style>
  
  <div id="${CONTAINER}">
    <${SUGGESTION_INPUT_COMPONENT}></${SUGGESTION_INPUT_COMPONENT}>
  </div>
  
`;

// Deprecated
class RecipeAddItem extends WebElement {

    set props({addItemCallback, getSuggestionsPromise, renderSuggestionCallback, placeholder}) {

        // required props: renderSuggestionCallback

        // this.$addItem = addItemCallback;

        if (getSuggestionsPromise) {
            if (!renderSuggestionCallback) {
                throw new Error("add-item component:  if you want to use suggestions pass please renderSuggestionCallback");
            }
        }

        this.$(SUGGESTION_INPUT_COMPONENT).props = {
            getSuggestionsPromise, renderSuggestionCallback, placeholder, addItemCallback
        }
    }

    constructor() {
        super(template, true);

        // this._addItem = this._addItem.bind(this);

        //this.$_id(ADD_ITEM).addEventListener('click', this._addItem);
    }

    // _addItem() {
    //     if (this.$addItem) {
    //         this.$addItem(this.$(SUGGESTION_INPUT_COMPONENT).currentValue);
    //         this.$(SUGGESTION_INPUT_COMPONENT).clearInput();
    //     }
    // }
}

customElements.define('add-item', RecipeAddItem);
