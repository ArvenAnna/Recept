import WebElement from '../abstract/web-element';
import '../svg/apply-icon';
import '../svg/remove-icon';

const CONTAINER = 'container';
const OVERLAY = 'overlay';
const IMAGE = 'image';
const REMOVE = 'remove';
const ADD = 'add';


const template = `
  <style>
    
    #${CONTAINER} {
        max-width: 100%;
        position: relative;
    }
    
    #${CONTAINER}:before {
            content: '';
            display: block;
            padding-top: 100%;
        }
        
    #${CONTAINER}:hover #${OVERLAY} {
            visibility: visible;
        }
    
    #${IMAGE} {
            object-fit: cover;
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
        }
        
     #${OVERLAY} {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        visibility: hidden;
        text-align: right;
        background-color: rgba(0,0,0,0.7);
     }
    
    #${REMOVE}, #${ADD} {
        margin: 0.5rem;
    }

  </style>
  
  <div id="${CONTAINER}">
    <img src="svg/dish-fork-and-knife.svg" id="${IMAGE}"/>
    <div id="${OVERLAY}">
        <apply-icon id="${ADD}"></apply-icon>
        <remove-icon id="${REMOVE}"></remove-icon>
    </div>
  </div>
  
`;

const supportedAttributes = {
    SRC: 'src'
}

class RemovableImage extends WebElement {

    static get observedAttributes() {
        return Object.values(supportedAttributes);
    }

    set props({removeFileCallback, addFileCallback}) {
        this.$removeFileCallback = removeFileCallback;
        this.$addFileCallback = addFileCallback;
    }

    constructor() {
        super(template, true);

        this._onRemove = this._onRemove.bind(this);
        this._onAdd = this._onAdd.bind(this);
        this.removeControls = this.removeControls.bind(this);

        this.$_id(REMOVE).addEventListener('click', this._onRemove);
        this.$_id(ADD).addEventListener('click', this._onAdd);

        if (this.getAttribute(supportedAttributes.SRC)) {
            this.$_id(CONTAINER).style.display = 'block';
        } else {
            this.$_id(CONTAINER).style.display = 'none';
        }

    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (supportedAttributes.SRC === name) {
            this.$_id(IMAGE).setAttribute('src', newValue);
            if (!newValue) {
                this.$_id(CONTAINER).style.display = 'none';
            } else {
                this.$_id(CONTAINER).style.display = 'block';
                this.$_id(ADD).style.display = 'block';
            }
        }
    }

    _onAdd() {
        if (this.$addFileCallback) {
            this.$addFileCallback();
            this.$_id(ADD).style.display = 'none';
        }
    }

    _onRemove() {
        this.$removeFileCallback(this.getAttribute(supportedAttributes.SRC));
        this.setAttribute(supportedAttributes.SRC, '');
    }

    removeControls() {
        this.$_id(OVERLAY).remove();
    }
}

customElements.define('removable-image', RemovableImage);
