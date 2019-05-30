import WebElement from '../abstract/web-element';

const CONTAINER = 'container';
const SUGGESTION_CONTAINER = 'dropdown';
const SUGGESTION_TEMPLATE = 'suggestion_template';

const template = `
  <style>
    .dropdown {
        
    }
    
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

    set suggestions(newSuggestions) {
        this.$suggestions = newSuggestions || [];
        this._renderSuggestions();
    }

    set symbols(newSymbols) {
        this.$symbols = newSymbols || 3;
        this.setAttribute(supportedAttributes.SUGGESTIONS_SYMBOLS, newSymbols);
        this._renderSuggestions(); // check if needed
    }

    set renderSuggestion(renderSuggestionCallback) {
        this.$renderSuggestion = renderSuggestionCallback;
        this._renderSuggestions();
    }

    set addItem(addItemCallback) {
        this.$addItem = addItemCallback;
    }

    set props({symbols, addItemCallback, suggestions, renderSuggestionCallback}) {
        this.$suggestions = suggestions || [];
        this.$addItem = addItemCallback;
        this.$renderSuggestion = renderSuggestionCallback;
        this.$symbols = symbols || 3;

        if (this.$suggestions.length) {
            this._renderSuggestions();
        }
    }

    constructor() {
        super(template, true);

        //this.bindMethods(this._removeItem);

        this._renderSuggestions = this._renderSuggestions.bind(this);
        this._addItem = this._addItem.bind(this);

        this.$(`#${CONTAINER}`).querySelector('.add_item_icon').addEventListener('click', this._addItem);

       // this._renderSuggestions();
    }

    // connectedCallback() {
    //     super.connectedCallback();
    //     const title = this.getAttribute('title') || "";
    //     this.$('#title').innerHTML = title;
    //
    // }


    _renderSuggestions() {
        this.$(`#${SUGGESTION_CONTAINER}`).innerHTML = "";
        if (this.$suggestions && this.$suggestions.length) {
            this.$suggestions.forEach(suggestion => {
                if (this.$renderSuggestion) {
                    this.$(`#${SUGGESTION_CONTAINER}`).appendChild(this.$renderSuggestion(suggestion));
                } else {
                    this.$(`#${SUGGESTION_CONTAINER}`).appendChild(suggestion);
                }
            });
        }
    }

    // _renderItem(item) {
    //     const template = this.getTemplateById(ITEM_TEMPLATE);
    //
    //     const itemContainer = template.querySelector('.item_container');
    //     itemContainer.querySelector('.item').innerHTML = this.$renderItem(item);
    //     if (this.$removeItem) {
    //         itemContainer.querySelector('.remove_item').addEventListener('click', this._removeItem.bind(this, item));
    //     } else {
    //         // todo remove it from layout if not needed
    //         itemContainer.querySelector('.remove_item').style.display = 'none';
    //     }
    //     this.$(`#${CONTAINER}`).appendChild(template);
    // }

    disconnectedCallback() {
        this.$(`#${CONTAINER}`).querySelector('.add_item_icon').removeEventListener('click', this._addItem);
        // const addItems = this.$(`#${CONTAINER}`).querySelectorAll('.add_item_icon');
        // addItems.forEach(item => item.removeEventListener('click', this._addItem));
    }

    // attributeChangedCallback(name, oldValue, newValue) {
    //     switch (name) {
    //         case supportedAttributes.TITLE:
    //             this.$('#title').innerHTML = newValue;
    //     }
    // }

    _addItem() {
        if(this.$addItem) {
            this.$addItem(this.$('input').value);
            this.$('input').value = '';
        }
    }

}

customElements.define('recipe-add-item', RecipeAddItem);