import WebElement from '../../abstract/web-element';

const CONTAINER = 'container';
const OVERLAY = 'overlay';
const IMAGE = 'image';

const template = `
  <style>
    
    #${CONTAINER} {
        max-width: 100%;
        position: relative;
        width: var(--image-width);
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
        border-radius: var(--theme-border-radius);
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
        border-radius: var(--theme-border-radius);
     }
    
  </style>
  
  <div id='${CONTAINER}'>
    <img id='${IMAGE}'/>
    <div id='${OVERLAY}'>
        <slot></slot>
    </div>
  </div>
  
`;

const supportedAttributes = {
    SRC: 'src'
}

class ImageWithOverlay extends WebElement {

    set src(newSrc) {
        this.setAttribute(supportedAttributes.SRC, newSrc);
    }

    set defaultSrc(src) {
        this.$defaultSrc = src;
    }

    static get observedAttributes() {
        return Object.values(supportedAttributes);
    }

    constructor() {
        super(template, true);

        this.clean = this.clean.bind(this);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (supportedAttributes.SRC === name) {
            this.$_id(IMAGE).src = newValue;
        }
    }

    clean() {
        this.setAttribute(supportedAttributes.SRC, this.$defaultSrc);
    }
}

customElements.define('image-with-overlay', ImageWithOverlay);
