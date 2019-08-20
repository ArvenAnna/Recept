import WebElement from '../abstract/web-element';
import './dropdown-list';
import './suggestions-input';

const CONTAINER = 'container';
const ADD_ITEM = 'add_item_icon';

const template = `
  <style>
    
    #${CONTAINER} {
        display: flex;
        position: relative;
        align-items: center;
    }
    
    #${ADD_ITEM} {
        width: 1rem;
        height: 1rem;
        cursor: pointer;
    }
    
  </style>
  
  <div id="${CONTAINER}">
    <suggestions-input></suggestions-input>
    <img src="svg/add.svg" id="${ADD_ITEM}"/>
  </div>
  
`;

class RecipeAddItem extends WebElement {

    set props({addItemCallback, getSuggestionsPromise, renderSuggestionCallback, placeholder}) {

        // required props: renderSuggestionCallback

        this.$addItem = addItemCallback;

        if (getSuggestionsPromise) {
            if (!renderSuggestionCallback) {
                throw new Error("add-item component:  if you want to use suggestions pass please renderSuggestionCallback");
            }
        }

        this.$('suggestions-input').props = {
            getSuggestionsPromise, renderSuggestionCallback, placeholder
        }
    }

    constructor() {
        super(template, true);

        this._addItem = this._addItem.bind(this);

        this.$_id(ADD_ITEM).addEventListener('click', this._addItem);
    }

    _addItem() {
        if (this.$addItem) {
            this.$addItem(this.$('suggestions-input').currentValue);
            this.$('suggestions-input').clearInput();
        }
    }
}

customElements.define('add-item', RecipeAddItem);
