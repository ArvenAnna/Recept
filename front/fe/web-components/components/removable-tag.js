import WebElement from '../abstract/web-element';
import {removeIcon} from '../../constants/themes';

const CONTAINER = 'tag_container';

const REMOVE_ITEM = 'remove_item';

const template = `
  <style>
    #${CONTAINER} {
       display: flex;
       align-items:center;
       margin: 0.5rem 1rem 0.5rem 0;
       font-style: italic;
       background-color: var(--tag-background, white);
       color: var(--tag-font-color, black);
       border-radius: var(--theme-border-radius);
       padding: 0.2rem 0.3rem;
       box-shadow: var(--tag-shadow);
       font-size: var(--tag-font-size);
    }
    
    #${REMOVE_ITEM} {
        display: none;
        width: 1rem;
        height: 1rem;
        cursor: pointer;
        margin-left: 0.5rem;
    }
  
  </style>
  
  <div id='${CONTAINER}'>
    <slot></slot>
    <img src='${removeIcon}' id='${REMOVE_ITEM}'/>
  </div>
  
`;

class RemovableTag extends WebElement {

    set props({removeItemCallback}) {
        this.$removeItem = removeItemCallback;

        if (removeItemCallback) {
            this.reveal_id(REMOVE_ITEM);
        } else {
            this.hide_id(REMOVE_ITEM);
        }
    }

    constructor() {
        super(template, true);

        this._removeItem = this._removeItem.bind(this);

        this.$_id(REMOVE_ITEM).addEventListener('click', this._removeItem);
    }

    _removeItem() {
        if (this.$removeItem) {
            this.$removeItem();
            this.remove();
        }
    }

}
customElements.define('removable-tag', RemovableTag);
