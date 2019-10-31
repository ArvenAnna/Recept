import WebElement from '../../abstract/web-element';
import '../image/removable-image-with-editable-text';

const CONTAINER = 'container';
const TITLE = 'title';

const ITEM_TEMPLATE = 'item_template';

const ITEM_CONTAINER = 'item_container';
const ITEMS_CONTAINER = 'items-container';
const ITEM = 'item';
const DRAG_TARGET = 'drag-target';

const IMAGE_COMPONENT = 'removable-image-with-editable-text';

const template = `
  <style>
  
    #${CONTAINER} {
        display: none;
    }
    
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
       cursor: grab;
    }
    
    .${DRAG_TARGET} {
        background-color: var(--drag-target-bg);
    }
  </style>
  
  <template id="${ITEM_TEMPLATE}">
    <div class="${ITEM_CONTAINER}" draggable="true">
       <${IMAGE_COMPONENT} class="${ITEM}" ></${IMAGE_COMPONENT}>
    </div>
  </template>
  
  <div id="${CONTAINER}">
    <div id="${TITLE}"></div>
    <div id="${ITEMS_CONTAINER}"></div>
  </div>
  
`;

const supportedAttributes = {
    TITLE: 'list-title'
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
        this._onDrop = this._onDrop.bind(this);

        this.shadowRoot.addEventListener('drag', e => {}, false);
        this.shadowRoot.addEventListener('dragstart', e => {
            // should be ITEM_CONTAINER
            this.drag = e.target;
            e.target.style.opacity = .5;
        }, false);
        this.shadowRoot.addEventListener('dragend', e => {
            e.target.style.opacity = "";
        }, false);
        this.shadowRoot.addEventListener('dragover', e => {
            // prevent default to allow drop
            e.preventDefault();
        }, false);
        this.shadowRoot.addEventListener('dragenter', e => {
            // highlight potential drop target when the draggable element enters it
            if ( e.target.className === ITEM ) {
                e.target.parentNode.classList.add(DRAG_TARGET);
            }
        }, false);
        this.shadowRoot.addEventListener('dragleave', e => {
            // reset background of potential drop target when the draggable element leaves it
            if ( e.target.className == ITEM ) {
                e.target.parentNode.classList.remove(DRAG_TARGET);
            }
        }, false);
        this.shadowRoot.addEventListener('drop', this._onDrop, false);
    }

    _renderItems() {
        this.$_id(ITEMS_CONTAINER).innerHTML = "";
        if (this.$transformedData.length) {
            this.$_id(CONTAINER).style.display = 'block';
            // this.reveal_id(CONTAINER);
        } else {
            this.hide_id(CONTAINER);
        }
        this.$transformedData.forEach(this._renderItem);
    }

    _renderItem(dataItem) {
        const template = this.getTemplateById(ITEM_TEMPLATE);
        template.byTag(IMAGE_COMPONENT).setAttribute('innerId', dataItem.innerId);
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

    _onDrop(e) {
        // prevent default action (open as link for some elements)
        e.preventDefault();
        // move dragged elem to the selected drop target
        if ( e.target.className === ITEM ) {
            e.target.parentNode.classList.remove(DRAG_TARGET);
            // e.target.parentNode.style.background = "";
            // const containerFrom = this.drag;
            const itemFrom = this.drag.querySelector(IMAGE_COMPONENT);

            // const containerTo = e.target.parentNode;
            const itemTo = e.target;

            // containerFrom.innerHTML = '';
            // containerFrom.appendChild(itemTo);
            // containerTo.appendChild(itemFrom);

            const idFrom = parseInt(itemFrom.getAttribute('innerId'));
            const dataItemFrom = this.$transformedData.find(tdi => tdi.innerId === idFrom)

            const idTo = parseInt(itemTo.getAttribute('innerId'));
            const dataItemTo = this.$transformedData.find(tdi => tdi.innerId === idTo);

            this.$dragCallback(dataItemFrom.item, dataItemTo.item);
        }
    }

}
customElements.define('draggable-image-list', DraggableImageList);
