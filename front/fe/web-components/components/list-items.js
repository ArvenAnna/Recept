import WebElement from '../abstract/web-element';

const CONTAINER = 'items_container';
const TITLE = 'title';

const ITEM_TEMPLATE = 'item_template';

const ITEM_CONTAINER = 'item_container';
const ITEM = 'item';
const REMOVE_ITEM = 'remove_item';
const REMOVE_ICON_SRC = 'svg/cross.svg';

const template = `
  <style>
    #${TITLE} {
        /* don't put margin here*/
    }
    
    .${REMOVE_ITEM} {
        width: 1rem;
        height: 1rem;
        cursor: pointer;
    }
    
    .${ITEM_CONTAINER} {
       display: flex;
       align-items:center;
       margin: 0.5rem;
       font-style: italic;
       background-color: var(--list-background, white);
       display: inline-flex;
    }
    
    .${ITEM} {
       padding: 0 0.1rem;
       cursor: default;
    }
  </style>
  
  <template id="${ITEM_TEMPLATE}">
    <div class="${ITEM_CONTAINER}">
        <span class="${ITEM}"></span>
        <img src="${REMOVE_ICON_SRC}" class="${REMOVE_ITEM}"/>
    </div>
  </template>
  
  <div>
    <div id="${TITLE}"></div>
    <div id="${CONTAINER}"></div>
  </div>
  
`;

const supportedAttributes = {
    TITLE: 'title'
}

class RecipeListItems extends WebElement {

    static get observedAttributes() {
        return Object.values(supportedAttributes);
    }

    set items(newItems) {
        this.$items = newItems || [];
        this._renderItems();
    }

    set title(v) {
        this.setAttribute(supportedAttributes.TITLE, v);
    }

    set props({items, renderItem, removeItemCallback, title}) {
        this.$items = items || [];
        this.$renderItem = renderItem;
        this.$removeItem = removeItemCallback;
        if (title) {
            this.setAttribute(supportedAttributes.TITLE, title);
        }
        this._renderItems();
    }

    constructor() {
        super(template, true);

        this._renderItem = this._renderItem.bind(this);
        this._renderItems = this._renderItems.bind(this);
        this._removeItem = this._removeItem.bind(this);
    }

    _renderItems() {
        this.$_id(CONTAINER).innerHTML = "";
        if (this.$renderItem) {
            this.$items.forEach(this._renderItem);
        }
    }

    _renderItem(item) {
        const template = this.getTemplateById(ITEM_TEMPLATE);

        template.byClass(ITEM).innerHTML = this.$renderItem(item);

        if (this.$removeItem) {
            template.byClass(REMOVE_ITEM).addEventListener('click', this._removeItem.bind(null, item));
        } else {
            template.byClass(REMOVE_ITEM).style.display = 'none';
        }
        this.$_id(CONTAINER).appendChild(template);
    }

    _removeItem(item, e) {
        this.$removeItem(item);
        e.target.parentElement.remove();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case supportedAttributes.TITLE:
                this.$_id(TITLE).innerHTML = newValue;
        }
    }

}
customElements.define('list-items', RecipeListItems);
