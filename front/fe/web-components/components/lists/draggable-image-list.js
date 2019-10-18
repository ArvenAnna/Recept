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
        <${IMAGE_COMPONENT} class="${ITEM}" draggable="true"></${IMAGE_COMPONENT}>
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
        this.$transformedData = this.$data.map((item, i) => ({...item, innerId: i + 1}));
        this._renderItems();
    }

    set title(v) {
        this.setAttribute(supportedAttributes.TITLE, v);
    }

    set props({data, removeItemCallback, title, defaultSrc, editTextCallback, dragCallback}) {
        this.$data = data || [];
        this.$transformedData = this.$data.map((item, i) => ({...item, innerId: i + 1}));
        this.$defaultSrc = defaultSrc;
        this.$removeItem = removeItemCallback;
        this.$editTextCallback = editTextCallback;
        this.$dragCallback = dragCallback;
        if (title) {
            this.setAttribute(supportedAttributes.TITLE, title);
        }
        this._renderItems();
    }

    constructor() {
        super(template, true);

        this.drag = null;

        this._renderItem = this._renderItem.bind(this);
        this._renderItems = this._renderItems.bind(this);

        document.addEventListener('drag', e => {}, false);
        document.addEventListener('dragstart', e => {
            this.drag = event.target;
            event.target.style.opacity = .5;
        }, false);
    }

    _renderItems() {
        this.$_id(ITEMS_CONTAINER).innerHTML = "";
        this.$transformedData.forEach(this._renderItem);
    }

    _renderItem(dataItem) {
        const template = this.getTemplateById(ITEM_TEMPLATE);
        template.byClass(ITEM_CONTAINER).setAttribute('innerId', dataItem.innerId);
        // template.byClass(ITEM_CONTAINER).addEventListener('dragstart', this._onDragStart.bind(this, dataItem));
        // template.byClass(ITEM_CONTAINER).addEventListener('drage', this._onDragStart.bind(this, dataItem));
        template.byClass(ITEM_CONTAINER).addEventListener('dragend', this._onDrop.bind(this, dataItem));

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

    // _onDragStart(dataItem, e) {
    //     console.log(dataItem);
    //     this.dragObj = {
    //         item: dataItem
    //     }
    // }

    _onDrop(dataItem, e) {
        // console.log(e);
        // console.log(dataItem);
        const coordinates = {
            x: e.x,
            y: e.y
        }
        const dropElement = this.shadowRoot.elementFromPoint(coordinates.x, coordinates.y);
        if (dropElement && dropElement.hasAttribute("innerId")) {
            const innerId = dropElement.getAttribute("innerId");
            const targetDataItem = this.$transformedData.find(item => item.innerId === parseInt(innerId));
            console.log(dataItem);
            console.log(targetDataItem);
            //change elements:

            // this.$dragCallback(dataItem.item, targetDataItem.item);

            const targetDataItemCopy = {...targetDataItem};
            const targetItem = {... targetDataItem.item};
            targetDataItem.src = dataItem.src;
            targetDataItem.text = dataItem.text;
            targetDataItem.item = dataItem.item;

            dataItem.src = targetDataItemCopy.src;
            dataItem.text = targetDataItemCopy.text;
            dataItem.item = targetItem;

            this._renderItems();
        }


        //this.$dragCallback(this.dragObj.item, dataItem);
        // this.dragObj = {}
    }

}
customElements.define('draggable-image-list', DraggableImageList);
