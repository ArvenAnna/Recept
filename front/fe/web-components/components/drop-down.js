import WebElement from '../abstract/web-element';
import {isDescendantOf} from "../../utils/domUtils";

const CONTAINER = 'container';
const LIST_CONTAINER = 'list-container';
const LABEL = 'label';
const LABEL_VALUE = 'label_value';
const CARET_ICON = 'caret_icon';

const ITEM_TEMPLATE = 'item_template';

const template = `
  <style>
    
    #${CONTAINER} {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    
    #${LABEL} {
       display: flex; 
       align-items: center;
       cursor: pointer;
    }
    
    #${LIST_CONTAINER} {
        display: none;
        border: 1px solid black;
    }
    
    #${CARET_ICON} {
        width: 0.5rem;
        height: 0.5rem;
        cursor: pointer;
        margin-left: 0.1rem;
    }
    
    .outlined {
        color: red;
    }
    
  </style>
  
  <template id="${ITEM_TEMPLATE}">
      <div class="item"></div>
  </template>
  
  <div id="${CONTAINER}">
    <div id="${LABEL}">
        <div id="${LABEL_VALUE}"></div><img src="svg/caret-down.svg" id="${CARET_ICON}"/>
    </div>
    <div id="${LIST_CONTAINER}"></div>
  </div>
  
`;


const supportedAttributes = {
    SUGGESTIONS_SYMBOLS: 'symbols'
}

class DropDown extends WebElement {

    static get observedAttributes() {
        return Object.values(supportedAttributes);
    }

    set items(newItems) {
        this.$items = newItems || [];
        this._renderItems();
    }

    // set symbols(newSymbols) {
    //     this.$symbols = newSymbols || 3;
    //     this.setAttribute(supportedAttributes.SUGGESTIONS_SYMBOLS, newSymbols);
    //     this._renderSuggestions(); // check if needed
    // }
    //
    set renderItem(renderItemCallback) {
        this.$renderItem = renderItemCallback;
        this._renderItems();
    }

    set chooseItem(chooseItemCallback) {
        this.$chooseItem = chooseItemCallback;
    }

    set props({chooseItemCallback, items, renderItem}) {
        this.$items = items || [];
        this.$chooseItem = chooseItemCallback;
        this.$renderItem = renderItem;

        if (this.$items.length) {
            this._renderItems();
        }
    }

    constructor() {
        super(template, true);

        //this.bindMethods(this._removeItem);

        this._renderItems = this._renderItems.bind(this);
        this._toggleDropdown = this._toggleDropdown.bind(this);
        this._toggleDropdownInner = this._toggleDropdownInner.bind(this);

        this._clickOutside = this._clickOutside.bind(this);
        this._onKeyPress = this._onKeyPress.bind(this);
        // this._addItem = this._addItem.bind(this);
        //
        // this.$(`#${CONTAINER}`).querySelector('.add_item_icon').addEventListener('click', this._addItem);

        // this._renderSuggestions();

        document.addEventListener('click', this._clickOutside);
        document.addEventListener('keydown', this._onKeyPress);

        this.$outlinedItem = null;
    }

    // connectedCallback() {
    //     super.connectedCallback();
    //     const title = this.getAttribute('title') || "";
    //     this.$('#title').innerHTML = title;
    //
    // }

    // _chooseItem(item) {
    //
    //     this.$chooseItem(item);
    // }


    _renderItems() {
        this.$(`#${LIST_CONTAINER}`).innerHTML = "";
        if (this.$items.length) {
            this.$(`#${LABEL_VALUE}`).innerHTML = this.$renderItem ? this.$renderItem(this.$items[0]) : this.$items[0];
            this.$outlinedItem = this.$items[0];
            //this.$(`#${LABEL}`).addEventListener('click', this._toggleDropdown);
            this.$items.forEach(item => {
                const template = this.getTemplateById(ITEM_TEMPLATE);
                const itemEl = template.querySelector('.item');
                if (this.$chooseItem) {
                    itemEl.addEventListener('click', this.$chooseItem.bind(null, item));
                }

                if (this.$renderItem) {
                    itemEl.innerHTML = this.$renderItem(item);
                } else {
                    itemEl.innerHTML = item;
                }

                if (item === this.$outlinedItem) {
                    itemEl.classList.add('outlined')
                }
                this.$(`#${LIST_CONTAINER}`).appendChild(template);
            });
        }
    }

    _toggleDropdown() {
        const isClosed = this.$(`#${LIST_CONTAINER}`).style.display !== 'block';
        this._toggleDropdownInner(isClosed);

    }

    _toggleDropdownInner(toOpen) {
        this.$(`#${LIST_CONTAINER}`).style.display = toOpen ? 'block' : 'none';
        this.$(`#${CARET_ICON}`).setAttribute('src', toOpen ? 'svg/sort-up.svg' : 'svg/caret-down.svg');
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
        //this.$(`#${LABEL}`).removeEventListener('click', this._toggleDropdown);

        document.removeEventListener('click', this._clickOutside);
        document.removeEventListener('keydown', this._onKeyPress);
        // const addItems = this.$(`#${CONTAINER}`).querySelectorAll('.add_item_icon');
        // addItems.forEach(item => item.removeEventListener('click', this._addItem));
    }

    // attributeChangedCallback(name, oldValue, newValue) {
    //     switch (name) {
    //         case supportedAttributes.TITLE:
    //             this.$('#title').innerHTML = newValue;
    //     }
    // }

    // _addItem() {
    //     if(this.$addItem) {
    //         this.$addItem(this.$('input').value);
    //         this.$('input').value = '';
    //     }
    // }

    _onKeyPress(e) {
        const key = e.key;
        const currentOutlinedIndex = this.$items.indexOf(this.$outlinedItem);

        this.$(`#${LIST_CONTAINER}`).querySelector('.outlined').classList.remove('outlined');

        if (key == 'ArrowDown') {
            if (currentOutlinedIndex === items.length - 1) {
                this.$outlinedItem = this.$items[0];
            } else {
                this.$outlinedItem = this.$items[currentOutlinedIndex + 1];
            }
        }
        if (key == 'ArrowUp') {
            if (currentOutlinedIndex === 0) {
                this.$outlinedItem = this.$items[this.$items.length - 1];
            } else {
                this.$outlinedItem = this.$items[currentOutlinedIndex - 1];
            }
        }

        const newOutlinedIndex = this.$items.indexOf(this.$outlinedItem);

        this.$(`#${LIST_CONTAINER}`).querySelectorAll('.item')[newOutlinedIndex].classList.add('outlined');

        if (key == 'Enter' && this.$chooseItem) {
            this.$chooseItem(this.$outlinedItem);
        }
    }

    _clickOutside(e) {
        if (isDescendantOf(e.composedPath()[0], this.$(`#${LABEL}`))) {
            this._toggleDropdown();
        } else {
            this._toggleDropdownInner(false);
        }
    }
}

customElements.define('recipe-drop-down', DropDown);
