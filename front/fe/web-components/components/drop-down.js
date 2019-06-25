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
        /*display: flex;*/
        /*flex-direction: column;*/
        /*align-items: flex-start;*/
    }
    
    #${LABEL} {
       display: flex; 
       align-items: center;
       cursor: pointer;
    }
    
    #${CARET_ICON} {
        width: 0.5rem;
        height: 0.5rem;
        cursor: pointer;
        margin-left: 0.1rem;
    }
    
  </style>
  
 
  
  <div id="${CONTAINER}">
    <div id="${LABEL}">
        <div id="${LABEL_VALUE}"></div><img src="svg/caret-down.svg" id="${CARET_ICON}"/>
    </div>
    <drop-down-list/>
  </div>
  
`;

class DropDown extends WebElement {

    set props({chooseItemCallback, items, renderItem}) {
        this.$items = items || [];
        this.$chooseItem = chooseItemCallback;
        this.$renderItem = renderItem;

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
            this.$(`#${LABEL_VALUE}`).innerHTML = this.$renderItem(this.$items[0]);

            this.$('drop-down-list').props = {
                chooseItemCallback: (item) => {
                    this.$(`#${LABEL_VALUE}`).innerHTML = this.$renderItem(item);
                    this.$chooseItem(item);
                },
                items: this.$items,
                renderItem: this.$renderItem,
                toggleDropdownCallback: (toOpen) => this.$(`#${CARET_ICON}`).setAttribute('src', toOpen ? 'svg/sort-up.svg' : 'svg/caret-down.svg')
            }
        }
    }

    disconnectedCallback() {
        document.removeEventListener('click', this._clickOutside);
    }

    _clickOutside(e) {
        if (isDescendantOf(e.composedPath()[0], this.$(`#${LABEL}`))) {
            this.$('drop-down-list').toggleDropdown();
        } else {
            this.$('drop-down-list').closeDropdown();
        }
    }
}

customElements.define('recipe-drop-down', DropDown);
