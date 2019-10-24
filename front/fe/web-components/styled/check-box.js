import WebElement from '../abstract/web-element';
import {checkIcon} from "../../constants/themes";

const CONTAINER = 'check-box-container';

const ICON = 'apply-icon';
const ICON_CONTAINER = 'icon-container';

const template = `
  <style>
    #${CONTAINER} {
       cursor: pointer;
       height: 100%
    }
    
    #${ICON} {
        width: 1rem;
        height: 1rem;
    }
    
    #${ICON_CONTAINER} {
        height: 100%;
        display: flex;
        align-items: center;
        box-shadow: var(--checkbox-shadow);
        background-color: var(--checkbox-background);
        padding: 0 0.1rem;
        border-radius: var(--theme-border-radius);
    }
    
  </style>
  
  <div id='${CONTAINER}'>
    <div id='${ICON_CONTAINER}'>
        <img src='${checkIcon}' id='${ICON}'/>
    </div>
  </div>
  
`;

const checkboxAttributes = {
    VALUE: 'value'
}

class CheckBox extends WebElement {

    static get observedAttributes() {
        return Object.values(checkboxAttributes);
    }

    set value(v) {
        this.setAttribute(checkboxAttributes.VALUE, v);
    }

    get value() {
        const value = this.getAttribute(checkboxAttributes.VALUE)
        return value && value === 'true';
    }

    constructor() {
        super(template, true);

        this._click = this._click.bind(this);

        this.$_id(ICON_CONTAINER).addEventListener('click', this._click);
    }

    _click() {
        this.value = !this.value;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case checkboxAttributes.VALUE:
                if (newValue === 'true') {
                    this.$_id(ICON).style.visibility = 'visible';
                } else {
                    this.$_id(ICON).style.visibility = 'hidden';
                }
                break;
        }
    }

}
customElements.define('check-box', CheckBox);
