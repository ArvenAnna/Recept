import WebElement from '../../abstract/web-element';
import './file-input-autoupload';
import '../image/image-with-overlay';
import {removeIcon} from '../../../constants/themes';

const REMOVE = 'remove';

const FILE_UPLOAD_COMPONENT = 'file-input-autoupload';
const IMAGE_COMPONENT = 'image-with-overlay';

const template = `
  <style>
    
    #${REMOVE} {
        width: 1rem;
        height: 1rem;
        cursor: pointer;
        background-color: var(--image-overlay-label-bg);
        border-radius: var(--theme-border-radius);
        align-self: flex-start;
        margin-top: 0.2rem;
        margin-left: auto;
        margin-right: 0.2rem;
    }

    ${FILE_UPLOAD_COMPONENT} {
        background-color: var(--image-overlay-label-bg);
        border-radius: var(--theme-border-radius);
    }

  </style>
 
  <${IMAGE_COMPONENT}>
        <${FILE_UPLOAD_COMPONENT}></${FILE_UPLOAD_COMPONENT}>
        <img src="${removeIcon}" id="${REMOVE}"/>
  </${IMAGE_COMPONENT}>
  
`;

const supportedAttributes = {
    SRC: 'src'
}

class PhotoUpload extends WebElement {

    static get observedAttributes() {
        return Object.values(supportedAttributes);
    }

    set props({uploadFileCallback, uploadUrl, src, defaultSrc}) {
        this.$uploadFileCallback = uploadFileCallback;
        this.$defaultSrc = defaultSrc;
        this.$(FILE_UPLOAD_COMPONENT).props = {
            uploadFileCallback: this._onUpload,
            uploadUrl
        };
        this.$(IMAGE_COMPONENT).defaultSrc = defaultSrc;

        if (!src) {
	    this.setAttribute(supportedAttributes.SRC, defaultSrc);
            this.$(FILE_UPLOAD_COMPONENT).style.display = 'block';
            this.$_id(REMOVE).style.display = 'none';
        } else {
	    this.setAttribute(supportedAttributes.SRC, src);
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

        this.clean = this.clean.bind(this);

        this.$_id(REMOVE).addEventListener('click', this._onRemove);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (supportedAttributes.SRC === name) {
            this.$(IMAGE_COMPONENT).src = newValue;
        }
    }

    _onUpload(path) {
        this.setAttribute(supportedAttributes.SRC, path);
        this._showRemoveCross();
        this.$uploadFileCallback(path);
    }

    _onRemove() {
        this.clean();
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

    clean() {
        this._showFileUpload();
        this.setAttribute(supportedAttributes.SRC, this.$defaultSrc);
    }
}

customElements.define('photo-upload', PhotoUpload);
