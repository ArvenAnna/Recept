import WebElement from '../../abstract/web-element';

import './image-with-overlay';
import {removeIcon} from '../../../constants/themes';

const REMOVE_ICON = 'remove-icon';
const IMAGE_COMPONENT = 'image-with-overlay';

const template = `
  <style>

    #${REMOVE_ICON} {
        width: 1rem;
        height: 1rem;
        cursor: pointer;
        background-color: var(--overlay-label-bg);
        border-radius: var(--theme-border-radius);
        align-self: flex-start;
        margin-top: 0.2rem;
        margin-left: auto;
        margin-right: 0.2rem;
    }

  </style>
  
  <${IMAGE_COMPONENT}>
      <img src="${removeIcon}" id="${REMOVE_ICON}"/>
  </${IMAGE_COMPONENT}>
  
`;

const supportedAttributes = {
    SRC: 'src'
}

class RemovableImage extends WebElement {

    static get observedAttributes() {
        return Object.values(supportedAttributes);
    }

    set props({removeFileCallback, src, defaultSrc}) {
        this.$removeFileCallback = removeFileCallback;

        if (src) {
            this.setAttribute(supportedAttributes.SRC, src);
        }

        this.$(IMAGE_COMPONENT).defaultSrc = defaultSrc;
    }

    set src(newSrc) {
        this.setAttribute(supportedAttributes.SRC, newSrc);
    }

    constructor() {
        super(template, true);

        this._onRemove = this._onRemove.bind(this);

        this.$_id(REMOVE_ICON).addEventListener('click', this._onRemove);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (supportedAttributes.SRC === name) {
            this.$(IMAGE_COMPONENT).src = newValue;
        }
    }

    _onRemove() {
        this.$removeFileCallback();
    }
}

customElements.define('removable-image', RemovableImage);
