import WebElement from '../../abstract/web-element';
import {removeIcon, editIcon, infoIcon} from '../../../constants/themes';

import '../tool-tip';

const CONTAINER = 'tag_container';

const REMOVE_ITEM = 'remove_item';
const EDIT_ITEM = 'edit-item';
const INFO = 'info';
const INFO_TOOLTIP = 'info-tooltip';

const TOOLTIP_COMPONENT = 'tool-tip';

const template = `
  <style>
    #${CONTAINER} {
       display: flex;
       align-items:center;
       font-style: italic;
       background-color: var(--tag-background, white);
       color: var(--tag-font-color, black);
       border-radius: var(--theme-border-radius);
       padding: 0.2rem 0.3rem;
       box-shadow: var(--tag-shadow);
       font-size: var(--tag-font-size);
    }
    
    #${REMOVE_ITEM},  #${EDIT_ITEM}, #${INFO} {
        display: none;
        width: 1rem;
        height: 1rem;
        cursor: pointer;
        margin-left: 0.5rem;
    }
  
  </style>
  
  <div id='${CONTAINER}'>
    <slot></slot>
    <${TOOLTIP_COMPONENT}>
        <img src='${infoIcon}' id='${INFO}' slot='component'/>
        <div id='${INFO_TOOLTIP}' slot='tooltip-content'></div>
    </${TOOLTIP_COMPONENT}>
    <img src='${editIcon}' id='${EDIT_ITEM}'/>
    <img src='${removeIcon}' id='${REMOVE_ITEM}'/>
  </div>
  
`;

class RemovableTag extends WebElement {

    set props({removeItemCallback, editItemCallback, tooltipContent}) {
        this.$removeItem = removeItemCallback;
        this.$editItem = editItemCallback;

        if (tooltipContent) {
            this.reveal_id(INFO);
            this.$_id(INFO_TOOLTIP).innerHTML = tooltipContent;
        } else {
            this.hide_id(INFO);
        }

        if (removeItemCallback) {
            this.reveal_id(REMOVE_ITEM);
        } else {
            this.hide_id(REMOVE_ITEM);
        }

        if (editItemCallback) {
            this.reveal_id(EDIT_ITEM);
        } else {
            this.hide_id(EDIT_ITEM);
        }
    }

    constructor() {
        super(template, true);

        this._removeItem = this._removeItem.bind(this);
        this._editItem = this._editItem.bind(this);

        this.$_id(REMOVE_ITEM).addEventListener('click', this._removeItem);
        this.$_id(EDIT_ITEM).addEventListener('click', this._editItem);
    }

    _removeItem() {
        if (this.$removeItem) {
            this.$removeItem();
            this.remove();
        }
    }

    _editItem() {
        if (this.$editItem) {
            this.$editItem();
        }
    }

}
customElements.define('removable-tag', RemovableTag);