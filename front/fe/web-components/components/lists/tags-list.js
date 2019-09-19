import WebElement from '../../abstract/web-element';
import '../removable-tag';

const CONTAINER = 'container';
const TITLE = 'title';

const ITEM_TEMPLATE = 'item_template';

const ITEMS_CONTAINER = 'items-container';

const TAG_COMPONENT = 'removable-tag';

const template = `
  <style>
    #${CONTAINER} {
        margin-top: 1rem;
        flex-direction: column;
    }
  
    #${TITLE} {
        /* don't put margin here*/
    }
    
    #${ITEMS_CONTAINER} {
        display: flex;
        flex-wrap: wrap;
        justify-content: stretch;
    }
  </style>
  
  <template id="${ITEM_TEMPLATE}">
      <${TAG_COMPONENT}></${TAG_COMPONENT}>
  </template>
  
  <div id="${CONTAINER}">
    <div id="${TITLE}"></div>
    <div id="${ITEMS_CONTAINER}"></div>
  </div>
  
`;

const supportedAttributes = {
    TITLE: 'title'
}

class TagsList extends WebElement {

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
    }

    _renderItems() {
        if (this.$items.length) {
            this.reveal_id(CONTAINER);
        } else {
            this.hide_id(CONTAINER);
        }
        this.$_id(ITEMS_CONTAINER).innerHTML = "";
        if (this.$renderItem) {
            this.$items.forEach(this._renderItem);
        }
    }

    _renderItem(item) {
        const template = this.getTemplateById(ITEM_TEMPLATE);

        const tag = template.byTag(TAG_COMPONENT);

        tag.innerHTML = this.$renderItem(item);

        tag.onConstruct = (tagEl) => {
            tagEl.props = {
                removeItemCallback: this.$removeItem.bind(null, item)
            }
        }

        this.$_id(ITEMS_CONTAINER).appendChild(template);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case supportedAttributes.TITLE:
                this.$_id(TITLE).innerHTML = newValue;
        }
    }

}
customElements.define('tags-list', TagsList);
