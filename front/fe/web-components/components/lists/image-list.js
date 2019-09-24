import WebElement from '../../abstract/web-element';
import '../image/removable-image-with-text';

const CONTAINER = 'items_container';
const TITLE = 'title';

const ITEM_TEMPLATE = 'item_template';

const ITEM_CONTAINER = 'item_container';
const ITEMS_CONTAINER = 'items-container';
const ITEM = 'item';

const IMAGE_COMPONENT = 'removable-image-with-text';

const template = `
  <style>
    
    #${ITEMS_CONTAINER} {
        display: flex;
        flex-wrap: wrap;
        justify-content: stretch;
    }
    
    .${ITEM_CONTAINER} {
        margin-right: 1rem;
    }
    
    .${ITEM} {
       padding-right: 0.5rem;
       cursor: default;
    }
  </style>
  
  <template id="${ITEM_TEMPLATE}">
    <div class="${ITEM_CONTAINER}">
        <${IMAGE_COMPONENT} class="${ITEM}"></${IMAGE_COMPONENT}>
    </div>
  </template>
  
  <div id="${CONTAINER}">
    <div id="${TITLE}"></div>
    <div id="${ITEMS_CONTAINER}"></div>
  </div>
  
`;

const supportedAttributes = {
    TITLE: 'title'
}

class ImageList extends WebElement {

    static get observedAttributes() {
        return Object.values(supportedAttributes);
    }

    set data(newData) {
        this.$data = newData || [];
        this._renderItems();
    }

    set title(v) {
        this.setAttribute(supportedAttributes.TITLE, v);
    }

    set props({data, removeItemCallback, title, defaultSrc}) {
        this.$data = data || [];
        this.$defaultSrc = defaultSrc;
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
        this.$_id(ITEMS_CONTAINER).innerHTML = "";
        this.$data.forEach(this._renderItem);
    }

    _renderItem(dataItem) {
        const template = this.getTemplateById(ITEM_TEMPLATE);

        template.byClass(ITEM).onConstruct = (image) => {
            image.props = {
                removeFileCallback: this.$removeItem.bind(null, dataItem.item),
                src: dataItem.src,
                text: dataItem.text,
                defaultSrc: this.$defaultSrc
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
customElements.define('image-list', ImageList);
