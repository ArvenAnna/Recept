import WebElement from '../abstract/web-element';
import './dropdown-list';
import './suggestions-input';

const CONTAINER = 'container';
const SECOND_INPUT = 'second-input';
const ADD_ITEM_ICON = 'add_item_icon';

const template = `
  <style>
    
    #${CONTAINER} {
        display: flex;
        align-items: center;
        position: relative;
    }
    
    #${ADD_ITEM_ICON} {
        width: 1rem;
        height: 1rem;
        cursor: pointer;
    }
    
  </style>
  
  <div id="${CONTAINER}">
    <suggestions-input></suggestions-input>
    <input id='${SECOND_INPUT}'/>
    <img src="svg/add.svg" id="${ADD_ITEM_ICON}"/>
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

        this.$('suggestions-input').props = {
            getSuggestionsPromise, renderSuggestionCallback, placeholder: placeholders.first
        }

        this.$(`#${SECOND_INPUT}`).placeholder = placeholders.second;
    }

    constructor() {
        super(template, true);

        this._addItem = this._addItem.bind(this);

        this.$(`#${CONTAINER}`).querySelector('.add_item_icon').addEventListener('click', this._addItem);
    }

    _addItem() {
        if (this.$addItem) {
            this.$addItem({
                first: this.$('suggestions-input').currentValue,
                second: this.$(`#${SECOND_INPUT}`).value
            });
            this.$('suggestions-input').clearInput();
            this.$(`#${SECOND_INPUT}`).value = '';
        }
    }
}

customElements.define('two-fields-add-item', TwoFieldsAddItem);
