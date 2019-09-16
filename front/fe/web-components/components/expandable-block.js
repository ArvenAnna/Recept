import WebElement from '../abstract/web-element';

const CONTAINER = 'container';
const CAPTION = 'caption';
const CAPTION_CONTAINER = 'caption-container';
const EXPAND_ICON = 'expand-icon';

const CONTENT_WRAPPER = 'content-wrapper';


const ICON_ARROW_DOWN = 'svg/caret-down.svg';
const ICON_ARROW_UP = 'svg/sort-up.svg';

const template = `
  <style>

      #${CONTAINER} {
         display: flex;
         margin: 1rem;
         align-items: flex-start;
         flex-direction: column;
      }
      
      #${CONTENT_WRAPPER} {
         display: none;
      }
      
      #${EXPAND_ICON} {
        width: 0.5rem;
        height: 0.5rem;
        cursor: pointer;
        position: absolute;
        left: -0.8rem;
      }
      
      #${CAPTION_CONTAINER} {
        display: flex;
        align-items: center;
        position: relative;
      }
      
  </style>
  
  <div id='${CONTAINER}'>
       <div id='${CAPTION_CONTAINER}'>
            <img src="${ICON_ARROW_DOWN}" id="${EXPAND_ICON}"/>
            <div id='${CAPTION}'></div>
       </div>
       
       <div id="${CONTENT_WRAPPER}">
            <slot name="content">Default content</slot>
       </div>
  </div>
  
`;

const supportedAttributes = {
    CAPTION: 'caption'
}

class ExpandableBlock extends WebElement {

    static get observedAttributes() {
        return Object.values(supportedAttributes);
    }

    constructor() {
        super(template, true);
        this.$isContentExpanded = false;

        this._toggleContent = this._toggleContent.bind(this);

        this.$_id(EXPAND_ICON).addEventListener('click', this._toggleContent);
    }

    _toggleContent() {
        this.$isContentExpanded = !this.$isContentExpanded;
        if (this.$isContentExpanded) {
            this.$_id(EXPAND_ICON).src = ICON_ARROW_UP;
            this.reveal_id(CONTENT_WRAPPER);
        } else {
            this.$_id(EXPAND_ICON).src = ICON_ARROW_DOWN;
            this.hide_id(CONTENT_WRAPPER);
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case supportedAttributes.CAPTION:
                this.$_id(CAPTION).innerHTML = newValue;
        }
    }
}

customElements.define('expandable-block', ExpandableBlock);
