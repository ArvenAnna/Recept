import WebElement from '../abstract/web-element';

const CONTAINER = 'tag_container';

const REMOVE_ITEM = 'remove_item';
const REMOVE_ICON_SRC = 'svg/cross.svg';

const template = `
  <style>
    #${CONTAINER} {
       display: flex;
       align-items:center;
       margin: 0.5rem 0;
       font-style: italic;
       background-color: var(--list-background, white);
       color: var(--list-font-color, black);
       border-radius: 0.2rem;
       padding: 0.1rem 0.2rem;
       margin-right: 1rem;
    }
    
    #${REMOVE_ITEM} {
        display: none;
        width: 1rem;
        height: 1rem;
        cursor: pointer;
        margin-left: 0.3rem;
    }
  
  </style>
  
  <div id='${CONTAINER}'>
    <slot></slot>
    <img src='${REMOVE_ICON_SRC}' id='${REMOVE_ITEM}'/>
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

    disconnectedCallback() {
        console.log('removed tag');
    }

}
customElements.define('removable-tag', RemovableTag);
