import WebElement from '../../abstract/web-element';
import {removeIcon, editIcon} from '../../../constants/themes';

const CONTAINER = 'tag_container';

const REMOVE_ITEM = 'remove_item';
const EDIT_ITEM = 'edit-item';

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
    
    #${REMOVE_ITEM},  #${EDIT_ITEM}{
        display: none;
        width: 1rem;
        height: 1rem;
        cursor: pointer;
        margin-left: 0.5rem;
    }
  
  </style>
  
  <div id='${CONTAINER}'>
    <slot></slot>
    <img src='${editIcon}' id='${EDIT_ITEM}'/>
    <img src='${removeIcon}' id='${REMOVE_ITEM}'/>
  </div>
  
`;

class RemovableTag extends WebElement {

    set props({removeItemCallback, editItemCallback}) {
        this.$removeItem = removeItemCallback;
        this.$editItem = editItemCallback;

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
