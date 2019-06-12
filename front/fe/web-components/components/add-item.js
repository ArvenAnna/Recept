import WebElement from '../abstract/web-element';

const CONTAINER = 'container';
const SUGGESTION_CONTAINER = 'dropdown';
const SUGGESTION_TEMPLATE = 'suggestion_template';

const template = `
  <style>
    
    #${CONTAINER} {
        display: flex;
    }
    
    .add_item_icon {
        width: 1rem;
        height: 1rem;
        cursor: pointer;
    }
    
  </style>
  
  <template id="${SUGGESTION_TEMPLATE}">
      <span class="suggestion"></span>
  </template>
  
  <div id="${CONTAINER}">
    <input type="text"/>
    <div id="${SUGGESTION_CONTAINER}"></div>
    <img src="svg/add.svg" class="add_item_icon"/>
  </div>
  
`;


const supportedAttributes = {
    SUGGESTIONS_SYMBOLS: 'symbols'
}

class RecipeAddItem extends WebElement {

    static get observedAttributes() {
        return Object.values(supportedAttributes);
    }

    // set suggestions(newSuggestions) {
    //     this.$suggestions = newSuggestions || [];
    //     this._renderSuggestions();
    // }

    // set symbols(newSymbols) {
    //     this.$symbols = newSymbols || 3;
    //     this.setAttribute(supportedAttributes.SUGGESTIONS_SYMBOLS, newSymbols);
    //     this._renderSuggestions(); // check if needed
    // }

    // set renderSuggestion(renderSuggestionCallback) {
    //     this.$renderSuggestion = renderSuggestionCallback;
    //     this._renderSuggestions();
    // }
    //
    // set addItem(addItemCallback) {
    //     this.$addItem = addItemCallback;
    // }

    set props({addItemCallback, getSuggestions, renderSuggestionCallback}) {
        this.$getSuggestions = getSuggestions || [];
        this.$addItem = addItemCallback;
        this.$renderSuggestion = renderSuggestionCallback;

        if (this.$getSuggestions) {
            this._renderSuggestions();
        }
    }

    constructor() {
        super(template, true);

        this._renderSuggestions = this._renderSuggestions.bind(this);
        this._addItem = this._addItem.bind(this);

        this.$(`#${CONTAINER}`).querySelector('.add_item_icon').addEventListener('click', this._addItem);
    }

    _renderSuggestions() {
        this.$(`#${SUGGESTION_CONTAINER}`).innerHTML = "";
        if (this.$getSuggestions) {
            this.$getSuggestions(this.$("input").value).forEach(suggestion => {
                if (this.$renderSuggestion) {
                    this.$(`#${SUGGESTION_CONTAINER}`).appendChild(this.$renderSuggestion(suggestion));
                } else {
                    this.$(`#${SUGGESTION_CONTAINER}`).appendChild(suggestion);
                }
            });
        }
    }

    _addItem() {
        if(this.$addItem) {
            this.$addItem(this.$('input').value);
            this.$('input').value = '';
        }
    }

}

customElements.define('recipe-add-item', RecipeAddItem);
