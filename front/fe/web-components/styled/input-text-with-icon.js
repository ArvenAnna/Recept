import WebElement from '../abstract/web-element';
import './input-text';

const CONTAINER = 'container';
const ICON = 'icon';

const INPUT_COMPONENT = 'input-text';

const template = `
  <style>
    ${INPUT_COMPONENT} {
        --input-icon-padding: 1rem;
    }
  
    #${CONTAINER} {
        position: relative;
        width: var(--control-width, 10rem);
    }
  
    #${ICON} {
        position: absolute;
        width: 1rem;
        height: 1rem;
        cursor: pointer;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }
  </style>
  
  <div id="${CONTAINER}">
    <${INPUT_COMPONENT}></${INPUT_COMPONENT}>
    <img id="${ICON}"/>
  </div>
  
`;

const inputTextWithIconAttributes = {
    SRC: 'src'
}

class InputTextWithIcon extends WebElement {

    static get observedAttributes() {
        return Object.values(inputTextWithIconAttributes);
    }

    set callbacks(cbs) {
        this.$(INPUT_COMPONENT).callbacks = cbs;
    }

    set value(v) {
        this.$(INPUT_COMPONENT).value = v || '';
    }

    get value() {
        return this.$(INPUT_COMPONENT).value;
    }

    set placeholder(v) {
        this.$(INPUT_COMPONENT).placeholder = v || '';
    }

    set src (v) {
        this.setAttribute(inputTextWithIconAttributes.SRC, v || '');
    }

    get innerRef() {
        return this.$(INPUT_COMPONENT).innerRef;
    }

    set iconClick(v) {
        this.$iconClick = v;
    }

    constructor() {
        super(template, true);

        this._clickIcon = this._clickIcon.bind(this);

        this.$_id(ICON).addEventListener('click', this._clickIcon);
    }

    _clickIcon() {
        if (this.$iconClick) {
            this.$iconClick(this.value);
            this.value = '';
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case inputTextWithIconAttributes.SRC:
                this.$_id(ICON).src = newValue || '';
                break;
        }
    }

}

customElements.define('input-text-with-icon', InputTextWithIcon);
