import WebElement from '../../abstract/web-element';
import '../image/removable-image-with-editable-text';

const CONTAINER = 'items_container';
const TITLE = 'title';

const ITEM_TEMPLATE = 'item_template';

const ITEM_CONTAINER = 'item_container';
const ITEMS_CONTAINER = 'items-container';
const ITEM = 'item';

const IMAGE_COMPONENT = 'removable-image-with-editable-text';

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

class DraggableImageList extends WebElement {

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

    set props({data, removeItemCallback, title, defaultSrc, editTextCallback}) {
        this.$data = data || [];
        this.$defaultSrc = defaultSrc;
        this.$removeItem = removeItemCallback;
        this.$editTextCallback = editTextCallback;
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

        template.byTag(IMAGE_COMPONENT).onConstruct = (image) => {
            image.props = {
                removeFileCallback: this.$removeItem.bind(null, dataItem.item),
                src: dataItem.src,
                text: dataItem.text,
                defaultSrc: this.$defaultSrc,
                editTextCallback: this.$editTextCallback.bind(null, dataItem.item)
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
customElements.define('draggable-image-list', DraggableImageList);
