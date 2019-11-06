import WebElement from '../../abstract/web-element';

import './removable-image';
import '../../styled/text-area';
import {addIcon} from "../../../constants/themes";

const CONTAINER = 'container';
const TEXT = 'text';
const EDIT_TEXT = 'edit-text';
const ADD_ICON = 'add-icon';

const IMAGE_COMPONENT = 'removable-image';
const TEXT_COMPONENT = 'text-area';

const template = `
  <style>
     #${CONTAINER} {
        width: var(--image-width);
     }
     
     #${TEXT} {
        cursor: pointer;
        width: var(--card-width);
        background-color: var(--image-with-text-bg);
        color: var(--image-with-text-color);
        padding: 0.2rem;
        box-sizing: border-box;
        min-height: 1.5rem;
        white-space: pre-wrap;
     }
     
     #${EDIT_TEXT} {
        display: none;
        position: relative;
     }
     
     #${ADD_ICON} {
        width: 1rem;
        height: 1rem;
        cursor: pointer;
        position: absolute;
        right: 0.1rem;
     }
     
     ${TEXT_COMPONENT} {
        --control-width: 100%;
        --textarea-height: 3rem;
     }
     
  </style>
  
  <div id="${CONTAINER}">
      <${IMAGE_COMPONENT}></${IMAGE_COMPONENT}>
      <div id='${TEXT}'></div>
      <div id='${EDIT_TEXT}'>
         <${TEXT_COMPONENT}></${TEXT_COMPONENT}>
         <img id='${ADD_ICON}' src='${addIcon}'/>
      </div>
  </div>

`;

const supportedAttributes = {
    SRC: 'src'
}

class RemovableImageWithEditableText extends WebElement {

    static get observedAttributes() {
        return Object.values(supportedAttributes);
    }

    set props({removeFileCallback, src, text, defaultSrc, editTextCallback}) {
        this.$_id(TEXT).textContent = text;
        this.$editTextCallback = editTextCallback;
        this.$(IMAGE_COMPONENT).props = {
            removeFileCallback,
            src,
            defaultSrc
        }
        if (src) {
            this.setAttribute(supportedAttributes.SRC, src);
        }

    }

    set src(newSrc) {
        this.setAttribute(supportedAttributes.SRC, newSrc);
    }

    constructor() {
        super(template, true);

        this._openEditMode = this._openEditMode.bind(this);
        this._closeEditMode =this._closeEditMode.bind(this);
        this._editText = this._editText.bind(this);

        this.$_id(ADD_ICON).addEventListener('click', this._editText);
        this.$_id(TEXT).addEventListener('click', this._openEditMode);

        // this.$(TEXT_COMPONENT).autoResize = true;
        // this.$(TEXT_COMPONENT).callbacks = {
        //     blur: this._closeEditMode
        // }
    }

    _openEditMode() {
        this.$(TEXT_COMPONENT).value = this.$_id(TEXT).textContent;
        this.$_id(TEXT).style.display = 'none';
        this.$_id(EDIT_TEXT).style.display = 'flex';
        this.$(TEXT_COMPONENT).innerRef.focus();
    }

    _closeEditMode() {
        this.$_id(TEXT).style.display = 'block';
        this.$_id(EDIT_TEXT).style.display = 'none';
    }


    _editText() {
        const text = this.$(TEXT_COMPONENT).value;
        this.$editTextCallback(text);
        this.$_id(TEXT).textContent = text;
        this._closeEditMode();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (supportedAttributes.SRC === name) {
            this.$(IMAGE_COMPONENT).src = newValue;
        }
    }
}

customElements.define('removable-image-with-editable-text', RemovableImageWithEditableText);
