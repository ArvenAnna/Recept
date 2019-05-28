import WebElement from '../abstract/web-element';

const CONTAINER = 'items_container';
const ITEM_TEMPLATE = 'item_template';

const template = `
  <style>
    .remove_item {
        width: 1rem;
        height: 1rem;
        cursor: pointer;
    }
    .item_container {
       display: flex;
       align-items:center;
       margin: 0.5rem;
       font-style: italic;
       font-weight: bold;
    }
    .item {
       display: flex;
    }
  </style>
  
  <template id="${ITEM_TEMPLATE}">
    <div class="item_container">
        <span class="item"></span>
        <img src="svg/cross.svg" class="remove_item"/>
    </div>
  </template>
  <div>
    <div id="title"></div>
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
        // make a copy
        this.$items = newItems || [];
        this._renderItems();
    }

    set renderItem(renderItemCallback) {
        this.$renderItem = renderItemCallback;
        this._renderItems();
    }

    set removeItem(removeItemCallback) {
        this.$removeItem = removeItemCallback;
        this._renderItems();
    }

    constructor() {
        super(template, true);

        this.bindMethods(this._removeItem, this._renderItems, this._renderItem);
    }

    connectedCallback() {
        const title = this.getAttribute('title') || "";
        this.$('#title').innerHTML = title;
        this._renderItems();
    }


    _renderItems() {
        // simply rerender all items
        this.$(`#${CONTAINER}`).innerHTML = "";
        if (this.$renderItem) {
            this.$items.forEach(this._renderItem);
        }
    }

    _renderItem(item) {
        const template = this.getTemplateById(ITEM_TEMPLATE);

        const itemContainer = template.querySelector('.item_container');
        itemContainer.querySelector('.item').innerHTML = this.$renderItem(item);
        if (this.$removeItem) {
            itemContainer.querySelector('.remove_item').addEventListener('click', this._removeItem.bind(this, item));
        } else {
            // todo remove it from layout if not needed
            itemContainer.querySelector('.remove_item').style.display = 'none';
        }
        this.$(`#${CONTAINER}`).appendChild(template);
    }

    disconnectedCallback() {
        const removeItems = this.$(`#${CONTAINER}`).querySelectorAll('.remove_item');
        removeItems.forEach(item => item.removeEventListener('click', this._removeItem));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case supportedAttributes.TITLE:
                this.$('#title').innerHTML = newValue;
        }
    }

    _removeItem(item) {
        if(this.$removeItem) {
            this.$removeItem(item);
        }
    }

}

customElements.define('recipe-list-items', RecipeListItems);