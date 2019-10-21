import WebElement from '../abstract/web-element';
import {arrowDownIcon, arrowUpIcon} from '../../constants/themes';

const CONTAINER = 'container';
const CAPTION = 'caption';
const CAPTION_CONTAINER = 'caption-container';
const EXPAND_ICON = 'expand-icon';

const CONTENT_WRAPPER = 'content-wrapper';

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
         margin-top: 1rem;
         width: 100%;
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
        cursor: pointer;
      }
      
  </style>
  
  <div id='${CONTAINER}'>
       <div id='${CAPTION_CONTAINER}'>
            <img src="${arrowDownIcon}" id="${EXPAND_ICON}"/>
            <div id='${CAPTION}'></div>
       </div>
       
       <div id="${CONTENT_WRAPPER}">
            <slot name="content">Default content</slot>
       </div>
  </div>
  
`;

const supportedAttributes = {
    CAPTION: 'caption',
    OPEN: 'open'
}

class ExpandableBlock extends WebElement {

    static get observedAttributes() {
        return Object.values(supportedAttributes);
    }

    set caption(caption) {
        this.setAttribute(supportedAttributes.CAPTION, caption);
    }

    set open(open) {
        this.setAttribute(supportedAttributes.OPEN, open);
    }

    constructor() {
        super(template, true);
        this.$isContentExpanded = false;

        this._toggleContent = this._toggleContent.bind(this);

        this.$_id(CAPTION_CONTAINER).addEventListener('click', this._toggleContent);
    }

    _toggleContent() {
        this.$isContentExpanded = !this.$isContentExpanded;
        if (this.$isContentExpanded) {
            this.$_id(EXPAND_ICON).src = arrowUpIcon;
            this.reveal_id(CONTENT_WRAPPER);
        } else {
            this.$_id(EXPAND_ICON).src = arrowDownIcon;
            this.hide_id(CONTENT_WRAPPER);
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case supportedAttributes.CAPTION:
                this.$_id(CAPTION).innerHTML = newValue;
                break;
            case supportedAttributes.OPEN:
                this.$_id(EXPAND_ICON).src = arrowUpIcon;
                this.reveal_id(CONTENT_WRAPPER);
                break;
        }
    }
}

customElements.define('expandable-block', ExpandableBlock);
