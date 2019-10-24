import WebElement from '../abstract/web-element';

const CONTAINER = 'container';
const TOOLTIP = 'tooltip';

const template = `
  <style>
    
    #${CONTAINER} {
        position: relative;
        cursor: pointer;
    }
        
    #${CONTAINER}:hover #${TOOLTIP} {
       display: flex;
    }
        
    #${TOOLTIP} {
        display: none;
        position: fixed;
        width: var(--tooltip-width);
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
    <slot name="component"></slot>
    <div id="${TOOLTIP}">
        <slot name="tooltip-content"></slot>
    </div>
  </div>
  
`;

class Tooltip extends WebElement {

    constructor() {
        super(template, true);

        this._setTooltipPlacement = this._setTooltipPlacement.bind(this);

        this.$_id(CONTAINER).addEventListener('mousemove', this._setTooltipPlacement)
    }

    _setTooltipPlacement(e) {
        this.$_id(TOOLTIP).style.top = `${e.y}px`;
        this.$_id(TOOLTIP).style.left = `${e.x + 15}px`;
    }
}

customElements.define('tool-tip', Tooltip);
