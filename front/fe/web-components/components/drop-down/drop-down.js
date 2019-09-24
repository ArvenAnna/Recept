import WebElement from '../../abstract/web-element';
import {isDescendantOf} from "../../../utils/domUtils";
import './toggable-drop-down-list';
import {arrowDownIcon, arrowUpIcon} from '../../../constants/themes';

const CONTAINER = 'container';
const LABEL = 'label';
const LABEL_VALUE = 'label_value';
const CARET_ICON = 'caret_icon';

const TOGGABLE_LIST_COMPONENT = 'toggable-drop-down-list';

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
       border-radius: var(--theme-border-radius);
       box-shadow: var(--drop-down-shadow); 
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
        <img src="${arrowDownIcon}" id="${CARET_ICON}"/>
    </div>
    <${TOGGABLE_LIST_COMPONENT}></${TOGGABLE_LIST_COMPONENT}>
  </div>
  
`;

class DropDown extends WebElement {

    set props({chooseItemCallback, items, renderItem, chosenItemIndex}) {
        this.$items = items || [];
        this.$chooseItem = chooseItemCallback;
        this.$renderItem = renderItem;
        this.$chosenItemIndex = chosenItemIndex;

        if (this.$items.length && this.$renderItem) {
            this._renderDropDown();
        }
    }

    get opened() {
        return this.$opened;
    }

    set opened(isOpened) {
        this.$opened = isOpened;
        this.$_id(CARET_ICON).src = isOpened ? arrowUpIcon : arrowDownIcon;
    }

    constructor() {
        super(template, true);

        this.$opened = false;

        this._renderDropDown = this._renderDropDown.bind(this);
        this._clickOutside = this._clickOutside.bind(this);

        document.addEventListener('click', this._clickOutside);
    }

    _renderDropDown() {
        const chosenItem = this.$chosenItemIndex
            ? this.$items[this.$chosenItemIndex]
            : this.$items[0];
        this.$_id(LABEL_VALUE).innerHTML = this.$renderItem(chosenItem);
        this.$(TOGGABLE_LIST_COMPONENT).props = {
            chooseItemCallback: (item) => {
                    this.$_id(LABEL_VALUE).innerHTML = this.$renderItem(item);
                    this.$chooseItem(item);
            },
            items: this.$items,
            renderItem: this.$renderItem,
            chosenItemIndex: this.$chosenItemIndex
        }
    }

    disconnectedCallback() {
        document.removeEventListener('click', this._clickOutside);
    }

    _clickOutside(e) {
        if (isDescendantOf(e.composedPath()[0], this.$_id(LABEL))) {
            this.$(TOGGABLE_LIST_COMPONENT).toggleDropdown();
            this.opened = !this.opened;
        } else {
            this.$(TOGGABLE_LIST_COMPONENT).closeDropdown();
            this.opened = false;
        }
    }
}

customElements.define('drop-down', DropDown);
