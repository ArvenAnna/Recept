import WebElement from '../abstract/web-element';
import {isDescendantOf} from "../../utils/domUtils";
import './dropdown-list';

const CONTAINER = 'container';
const LABEL = 'label';
const LABEL_VALUE = 'label_value';
const CARET_ICON = 'caret_icon';

const template = `
  <style>
  
    #${CONTAINER} {
        position: relative;
        width: var(--control-width, 10rem);
    }
    
    #${LABEL} {
       display: flex; 
       align-items: center;
       cursor: pointer;
       color: var(--drop-down-font-color);
       background-color: var(--drop-down-bg);
       padding: 0.1rem;
       font-weight: 500;
       box-sizing: border-box;
       justify-content: space-between;
    }
    
    #${CARET_ICON} {
        width: 0.5rem;
        height: 0.5rem;
        cursor: pointer;
        margin: 0 0.2rem;
    }
    
  </style>
  
  <div id="${CONTAINER}">
    <div id="${LABEL}">
        <div id="${LABEL_VALUE}"></div>
        <img src="svg/caret-down.svg" id="${CARET_ICON}"/>
    </div>
    <drop-down-list/>
  </div>
  
`;

class DropDown extends WebElement {

    set props({chooseItemCallback, items, renderItem, chosenItemIndex}) {
        this.$items = items || [];
        this.$chooseItem = chooseItemCallback;
        this.$renderItem = renderItem;
        this.$chosenItemIndex = chosenItemIndex;

        if (this.$items.length && this.$renderItem) {
            // always render first item as chosen
            this._renderItems();
        }
    }

    constructor() {
        super(template, true);

        this._renderItems = this._renderItems.bind(this);
        this._clickOutside = this._clickOutside.bind(this);

        document.addEventListener('click', this._clickOutside);
    }

    _renderItems() {
        if (this.$items.length && this.$renderItem) {
            const chosenItem = this.$chosenItemIndex
                ? this.$items[this.$chosenItemIndex]
                : this.$items[0];
            this.$_id(LABEL_VALUE).innerHTML = this.$renderItem(chosenItem);

            this.$('drop-down-list').props = {
                chooseItemCallback: (item) => {
                    this.$_id(LABEL_VALUE).innerHTML = this.$renderItem(item);
                    this.$chooseItem(item);
                },
                items: this.$items,
                renderItem: this.$renderItem,
                chosenItemIndex: this.$chosenItemIndex,
                toggleDropdownCallback: (toOpen) => this.$_id(CARET_ICON).setAttribute('src', toOpen ? 'svg/sort-up.svg' : 'svg/caret-down.svg')
            }
        }
    }

    disconnectedCallback() {
        document.removeEventListener('click', this._clickOutside);
    }

    _clickOutside(e) {
        if (isDescendantOf(e.composedPath()[0], this.$_id(LABEL))) {
            this.$('drop-down-list').toggleDropdown();
        } else {
            this.$('drop-down-list').closeDropdown();
        }
    }
}

customElements.define('drop-down', DropDown);
