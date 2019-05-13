const template = document.createElement('template');
template.innerHTML = `
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
  
  <template id="item_template">
    <div class="item_container">
        <span class="item"></span>
        <img src="svg/cross.svg" class="remove_item"/>
    </div>
  </template>
  <div>
    <div id="title">List items title</div>
    <div id="items_container"></div>
  </div>
  
`;


const supportedAttributes = {
    TITLE: 'title'
}

class RecipeListItems extends HTMLElement {
    $(selector) {
        return this.shadowRoot && this.shadowRoot.querySelector(selector)
    }

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
        super();

        // initializing private variables
        this.$items = this.items || [];
        this.$renderItem = this.renderItem;
        this.$removeItem = this.removeItem;

        this._removeItem = this._removeItem.bind(this);
        this._renderItems = this._renderItems.bind(this);
        const root = this.attachShadow({mode: 'open'});
        root.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const title = this.getAttribute('title') || "";
        this.$('#title').innerHTML = title;
        this._renderItems();
    }


    _renderItems() {
        // simply rerender all items
        this.$('#items_container').innerHTML = "";
        if (this.$renderItem) {
            this.$items.forEach((item, i) => {
                const template = this.$('#item_template').content.cloneNode(true);
                //item.$key = i;
                const itemContainer = template.querySelector('.item_container');
                //itemContainer.setAttribute('key', item.$key);
                itemContainer.querySelector('.item').innerHTML = this.$renderItem(item);
                if (this.$removeItem) {
                    itemContainer.querySelector('.remove_item').addEventListener('click', this._removeItem.bind(this, item));
                } else {
                    // todo remove it from layout if not needed
                    itemContainer.querySelector('.remove_item').style.display = 'none';
                }
                this.$('#items_container').appendChild(template);
            });
        }
    }

    disconnectedCallback() {
        const removeItems = this.$('#items_container').querySelectorAll('.remove_item');
        removeItems.forEach(item => item.removeEventListener('click', this.removeItem));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case supportedAttributes.TITLE:
                this.$('#title').innerHTML = newValue;
        }
    }

    _removeItem(item) {
        // const removeEvent = new CustomEvent('recipe-list-items_items-removed',
        //     {bubbles: true, detail: {item: item}});
        // this.dispatchEvent(removeEvent);
        if(this.$removeItem) {
            this.$removeItem(item);
        }
    }

}

customElements.define('recipe-list-items', RecipeListItems);