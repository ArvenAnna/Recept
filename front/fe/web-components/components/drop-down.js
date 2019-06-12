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
        /*display: flex;*/
        /*flex-direction: column;*/
        /*align-items: flex-start;*/
    }
    
    #${LABEL} {
       display: flex; 
       align-items: center;
       cursor: pointer;
    }
    
    #${LIST_CONTAINER} {
        display: none;
        position: absolute;
        border: 1px solid black;
        cursor: pointer;
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


// const supportedAttributes = {
//     SUGGESTIONS_SYMBOLS: 'symbols'
// }

class DropDown extends WebElement {

    // static get observedAttributes() {
    //     return Object.values(supportedAttributes);
    // }

    // set items(newItems) {
    //     this.$items = newItems || [];
    //     this._renderItems();
    // }
    //
    // set renderItem(renderItemCallback) {
    //     this.$renderItem = renderItemCallback;
    //     this._renderItems();
    // }
    //
    // set chooseItem(chooseItemCallback) {
    //     this.$chooseItem = chooseItemCallback;
    // }

    set props({chooseItemCallback, items, renderItem}) {
        this.$items = items || [];
        this.$chooseItem = chooseItemCallback;
        this.$renderItem = renderItem;

        if (this.$items.length) {
            // always render first item as chosen
            this._renderItems();
        }
    }

    constructor() {
        super(template, true);

        //this.bindMethods(this._removeItem);

        this._renderItems = this._renderItems.bind(this);
        this._closeDropdown = this._closeDropdown.bind(this);
        this._openDropdown = this._openDropdown.bind(this);
        this._toggleDropdown = this._toggleDropdown.bind(this);
        this._toggleDropdownInner = this._toggleDropdownInner.bind(this);

        this._clickOutside = this._clickOutside.bind(this);
        this._onKeyPress = this._onKeyPress.bind(this);
        this._selectItem = this._selectItem.bind(this);
        this._onClickItem = this._onClickItem.bind(this);
        this._changeOutlinedItem = this._changeOutlinedItem.bind(this);

        document.addEventListener('click', this._clickOutside);
        document.addEventListener('keydown', this._onKeyPress);

        this.$outlinedItem = null;
    }

    _renderItems() {
        this.$(`#${LIST_CONTAINER}`).innerHTML = "";
        if (this.$items.length) {
            this.$(`#${LABEL_VALUE}`).innerHTML = this.$renderItem ? this.$renderItem(this.$items[0]) : this.$items[0];

            this.$items.forEach(item => {
                const template = this.getTemplateById(ITEM_TEMPLATE);
                const itemEl = template.querySelector('.item');
                if (this.$chooseItem) {
                    itemEl.addEventListener('click', this._onClickItem.bind(null, item));
                }

                itemEl.innerHTML = this.$renderItem ? this.$renderItem(item) : item;

                this.$(`#${LIST_CONTAINER}`).appendChild(template);
            });

            this._changeOutlinedItem(this.$items[0]);
        }
    }

    _onClickItem(item) {
        this._changeOutlinedItem(item);
        this._selectItem();
    }

    _changeOutlinedItem(item) {
        const outlinedEl = this.$(`#${LIST_CONTAINER}`).querySelector('.outlined');
        if (outlinedEl) {
            outlinedEl.classList.remove('outlined');
        }
        this.$outlinedItem = item;
        const newOutlinedIndex = this.$items.indexOf(this.$outlinedItem);
        this.$(`#${LIST_CONTAINER}`).querySelectorAll('.item')[newOutlinedIndex].classList.add('outlined');
    }

    _selectItem() {
        this.$(`#${LABEL_VALUE}`).innerHTML = this.$renderItem ? this.$renderItem(this.$outlinedItem) : this.$outlinedItem;
        this._closeDropdown();
        this.$chooseItem(this.$outlinedItem);
    }

    _openDropdown() {
        this._toggleDropdownInner(true);
    }

    _closeDropdown() {
        this._toggleDropdownInner(false);
    }

    _toggleDropdown() {
        const isClosed = this.$(`#${LIST_CONTAINER}`).style.display !== 'block';
        this._toggleDropdownInner(isClosed);
    }

    _toggleDropdownInner(toOpen) {
        this.$(`#${LIST_CONTAINER}`).style.display = toOpen ? 'block' : 'none';
        this.$(`#${CARET_ICON}`).setAttribute('src', toOpen ? 'svg/sort-up.svg' : 'svg/caret-down.svg');
    }


    disconnectedCallback() {
        document.removeEventListener('click', this._clickOutside);
        document.removeEventListener('keydown', this._onKeyPress);
    }

    _onKeyPress(e) {
        const key = e.key;

        if (key == 'ArrowDown' || key == 'ArrowUp') {
            const { $items } = this;
            const currentOutlinedIndex = $items.indexOf(this.$outlinedItem);

            let newOutlinedItem;

            if (key == 'ArrowDown') {
                newOutlinedItem = currentOutlinedIndex === $items.length - 1
                    ? $items[0]
                    : $items[currentOutlinedIndex + 1];
            }
            if (key == 'ArrowUp') {
                newOutlinedItem = currentOutlinedIndex === 0
                    ? $items[$items.length - 1]
                    : $items[currentOutlinedIndex - 1]
            }

            this._changeOutlinedItem(newOutlinedItem);
        }

        if (key == 'Enter' && this.$chooseItem) {
            this._selectItem();
        }
    }

    _clickOutside(e) {
        if (isDescendantOf(e.composedPath()[0], this.$(`#${LABEL}`))) {
            this._toggleDropdown();
        } else {
            this._closeDropdown();
        }
    }
}

customElements.define('recipe-drop-down', DropDown);
