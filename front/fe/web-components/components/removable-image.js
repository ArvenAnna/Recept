import WebElement from '../abstract/web-element';

const CONTAINER = 'container';
const OVERLAY = 'overlay';
const IMAGE = 'image';
const REMOVE = 'remove';

const template = `
  <style>
    
    #${CONTAINER} {
        margin: 0.5rem;
        max-width: 100%;
        position: relative;
        box-shadow: 0px 0px 3px 3px #0f6b38
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
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        visibility: hidden;
        text-align: right;
        background-color: rgba(0,0,0,0.7);
     }
    
    #${REMOVE} {
        width: 1.5rem;
        height: 1.5rem;
        margin: 0.5rem;
        fill: #24ea7b;
    }
    
  </style>
  
  <div id="${CONTAINER}">
    <img src="svg/dish-fork-and-knife.svg" id="${IMAGE}"/>
    <div id="${OVERLAY}">
       <img src="svg/cross.svg" id="${REMOVE}"/> 
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

    set props({removeFileCallback}) {

        this.$removeFileCallback = removeFileCallback;
    }

    constructor() {
        super(template, true);

        this._onRemove = this._onRemove.bind(this);
        this.removeCross = this.removeCross.bind(this);

        this.$(`#${REMOVE}`).addEventListener('click', this._onRemove);

        if (this.getAttribute(supportedAttributes.SRC)) {
            this.$(`#${CONTAINER}`).style.display = 'block';
        } else {
            this.$(`#${CONTAINER}`).style.display = 'none';
        }

    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (supportedAttributes.SRC === name) {
            this.$(`#${IMAGE}`).setAttribute('src', newValue);
            if (!newValue) {
                this.$(`#${CONTAINER}`).style.display = 'none';
            } else {
                this.$(`#${CONTAINER}`).style.display = 'block';
            }
        }
    }

    _onRemove() {
        this.$removeFileCallback(this.getAttribute(supportedAttributes.SRC));
        this.setAttribute(supportedAttributes.SRC, '');
    }

    removeCross() {
        this.$(`#${OVERLAY}`).remove();
    }
}

customElements.define('removable-image', RemovableImage);
