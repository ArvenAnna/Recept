import WebElement from '../../abstract/web-element';

import './removable-image';

const CONTAINER = 'container';
const IMAGE_COMPONENT = 'removable-image';
const TEXT = 'text';

const template = `
  <style>
     #${CONTAINER} {
        width: var(--image-width);
     }
     
     #${TEXT} {
        white-space: pre-wrap;
     }
  </style>
  
  <div id="${CONTAINER}">
      <${IMAGE_COMPONENT}></${IMAGE_COMPONENT}>
      <div id="${TEXT}"></div>
  </div>

`;

const supportedAttributes = {
    SRC: 'src'
}

class RemovableImageWithText extends WebElement {

    static get observedAttributes() {
        return Object.values(supportedAttributes);
    }

    set props({removeFileCallback, src, text, defaultSrc}) {
        this.$_id(TEXT).textContent = text;
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
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (supportedAttributes.SRC === name) {
            this.$(IMAGE_COMPONENT).src = newValue;
        }
    }
}

customElements.define('removable-image-with-text', RemovableImageWithText);
