import WebElement from '../abstract/web-element';

const CONTAINER = 'container';
const OVERLAY = 'overlay';
const IMAGE = 'image';
const REMOVE = 'remove';

const ICON_REMOVE_SRC = 'svg/cross.svg';
const DEFAULT_SRC = 'svg/dish-fork-and-knife.svg';


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
            object-fit: contain;
            border: var(--image-border, 1px);
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            box-sizing: border-box;
        }
        
     #${OVERLAY} {
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        visibility: hidden;
        text-align: right;
        background-color: rgba(0,0,0,0.7);
     }
    
    #${REMOVE} {
        width: 4rem;
        height: 4rem;
        cursor: pointer;
    }

  </style>
  
  <div id="${CONTAINER}">
    <img src="${DEFAULT_SRC}" id="${IMAGE}"/>
    <div id="${OVERLAY}">
        <img src="${ICON_REMOVE_SRC}" id="${REMOVE}"/>
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

    set props({removeFileCallback, src}) {
        this.$removeFileCallback = removeFileCallback;

        if (src) {
            this.setAttribute(supportedAttributes.SRC, src);
        }
    }

    set src(newSrc) {
        this.setAttribute(supportedAttributes.SRC, newSrc);
    }

    constructor() {
        super(template, true);

        this._onRemove = this._onRemove.bind(this);
        this.clean = this.clean.bind(this);

        this.$_id(REMOVE).addEventListener('click', this._onRemove);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (supportedAttributes.SRC === name) {
            this.$_id(IMAGE).src = newValue;
        }
    }

    _onRemove() {
        this.$removeFileCallback();
        this.clean();
    }

    clean() {
        this.src = DEFAULT_SRC;
    }
}

customElements.define('removable-image', RemovableImage);
