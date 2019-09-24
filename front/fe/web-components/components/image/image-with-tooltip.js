import WebElement from '../../abstract/web-element';

const CONTAINER = 'container';
const TOOLTIP = 'tooltip';
const IMAGE = 'image';

const template = `
  <style>
    
    #${CONTAINER} {
        position: relative;
        width: var(--image-width);
        cursor: pointer;
    }
        
    #${CONTAINER}:hover #${TOOLTIP} {
       display: flex;
    }
    
    #${IMAGE} {
        object-fit: contain;
        width: 100%;
        box-sizing: border-box;
        border-radius: var(--theme-border-radius);
        
     }
        
     #${TOOLTIP} {
        display: none;
        position: fixed;
        width: var(--image-width);
        word-break: break-word;
        background-color: var(--tooltip-background);
        padding: 0.2rem;
        border-radius: var(--theme-border-radius);
        z-index: 10;
        color: var(--tooltip-font--color);
        box-shadow: var(--tooltip-shadow);
     }
    
  </style>
  
  <div id="${CONTAINER}">
    <img id="${IMAGE}"/>
    <div id="${TOOLTIP}">
        <slot></slot>
    </div>
  </div>
  
`;

const supportedAttributes = {
    SRC: 'src'
}

class ImageWithTooltip extends WebElement {

    set src(newSrc) {
        this.setAttribute(supportedAttributes.SRC, newSrc);
    }

    static get observedAttributes() {
        return Object.values(supportedAttributes);
    }

    constructor() {
        super(template, true);

        this._setTooltipPlacement = this._setTooltipPlacement.bind(this);

        this.$_id(CONTAINER).addEventListener('mousemove', this._setTooltipPlacement)
    }

    _setTooltipPlacement(e) {
        this.$_id(TOOLTIP).style.top = `${e.y}px`;
        this.$_id(TOOLTIP).style.left = `${e.x + 15}px`;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (supportedAttributes.SRC === name) {
            this.$_id(IMAGE).src = newValue;
        }
    }
}

customElements.define('image-with-tooltip', ImageWithTooltip);
