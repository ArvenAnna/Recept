import WebElement from '../abstract/web-element';
import './file-input-autoupload';

const CONTAINER = 'container';
const OVERLAY = 'overlay';
const IMAGE = 'image';
const REMOVE = 'remove';

const ICON_REMOVE_SRC = 'svg/cross.svg';
const DEFAULT_SRC = 'svg/dish-fork-and-knife.svg';

const FILE_UPLOAD_COMPONENT = 'file-input-autoupload';

const template = `
  <style>
    
    #${CONTAINER} {
        max-width: 100%;
        position: relative;
        width: 200px;
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
        object-fit: contain;
        border: var(--image-border, 1px);
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        box-sizing: border-box;
        border-radius: 0.2rem;
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
        border-radius: 0.2rem;
     }
    
    #${REMOVE} {
        width: 1rem;
        height: 1rem;
        cursor: pointer;
        background-color: var(--overlay-label-bg);
        border-radius: 0.2rem;
        align-self: flex-start;
        margin-top: 0.2rem;
        margin-left: auto;
        margin-right: 0.2rem;
    }
    
    ${FILE_UPLOAD_COMPONENT} {
        background-color: var(--overlay-label-bg);
        border-radius: 0.2rem;
    }

  </style>
  
  <div id="${CONTAINER}">
    <img src="${DEFAULT_SRC}" id="${IMAGE}"/>
    <div id="${OVERLAY}">
        <${FILE_UPLOAD_COMPONENT}></${FILE_UPLOAD_COMPONENT}>
        <img src="${ICON_REMOVE_SRC}" id="${REMOVE}"/>
    </div>
  </div>
  
`;

const supportedAttributes = {
    SRC: 'src'
}

class PhotoUpload extends WebElement {

    static get observedAttributes() {
        return Object.values(supportedAttributes);
    }

    set props({uploadFileCallback, uploadUrl, src}) {
        this.$uploadFileCallback = uploadFileCallback;
        this.$(FILE_UPLOAD_COMPONENT).props = {
            uploadFileCallback: this._onUpload,
            uploadUrl
        };
        this.setAttribute(supportedAttributes.SRC, src);
        if (!src) {
            this.$(FILE_UPLOAD_COMPONENT).style.display = 'block';
            this.$_id(REMOVE).style.display = 'none';
        } else {
            this.$(FILE_UPLOAD_COMPONENT).style.display = 'none';
            this.$_id(REMOVE).style.display = 'block';
        }
    }

    constructor() {
        super(template, true);

        this._onRemove = this._onRemove.bind(this);
        this._onUpload = this._onUpload.bind(this);
        this._showRemoveCross = this._showRemoveCross.bind(this);
        this._showFileUpload = this._showFileUpload.bind(this);

        this.$_id(REMOVE).addEventListener('click', this._onRemove);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (supportedAttributes.SRC === name) {
            this.$_id(IMAGE).src = newValue;
        }
    }

    _onUpload(path) {
        this.setAttribute(supportedAttributes.SRC, path);
        this._showRemoveCross();
        this.$uploadFileCallback(path);
    }

    _onRemove() {
        this._showFileUpload();
        this.setAttribute(supportedAttributes.SRC, DEFAULT_SRC);
        this.$uploadFileCallback(null);
    }

    _showRemoveCross() {
        this.hide(FILE_UPLOAD_COMPONENT);
        this.reveal_id(REMOVE);
    }

    _showFileUpload() {
        this.hide_id(REMOVE);
        this.reveal(FILE_UPLOAD_COMPONENT);
    }
}

customElements.define('photo-upload', PhotoUpload);
