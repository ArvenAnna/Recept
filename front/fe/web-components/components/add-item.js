import WebElement from '../abstract/web-element';
import './dropdown-list';
import './suggestions-input';

const CONTAINER = 'container';

const template = `
  <style>
    
    #${CONTAINER} {
        display: flex;
        position: relative;
    }
    
    .add_item_icon {
        width: 1rem;
        height: 1rem;
        cursor: pointer;
    }
    
  </style>
  
  <div id="${CONTAINER}">
    <suggestions-input></suggestions-input>
    <img src="svg/add.svg" class="add_item_icon"/>
  </div>
  
`;

class RecipeAddItem extends WebElement {

    set props({addItemCallback, getSuggestionsPromise, renderSuggestionCallback}) {

        // required props: renderSuggestionCallback

        this.$addItem = addItemCallback;

        if (getSuggestionsPromise) {
            if (!renderSuggestionCallback) {
                throw new Error("add-item component:  if you want to use suggestions pass please renderSuggestionCallback");
            }
        }

        this.$('suggestions-input').props = {
            getSuggestionsPromise, renderSuggestionCallback
        }
    }

    constructor() {
        super(template, true);

        this._addItem = this._addItem.bind(this);

        this.$(`#${CONTAINER}`).querySelector('.add_item_icon').addEventListener('click', this._addItem);
    }

    _addItem() {
        if (this.$addItem) {
            this.$addItem(this.$('suggestions-input').currentValue);
            this.$('suggestions-input').clearInput();
        }
    }
}

customElements.define('recipe-add-item', RecipeAddItem);
