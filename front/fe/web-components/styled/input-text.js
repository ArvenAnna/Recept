import WebElement from '../abstract/web-element';

const INPUT = 'input';

const template = `
  <style>
    
    #${INPUT} {
        outline: none;
        margin: 0;
        padding: 0.1rem;
        font-weight: 500;
        background-color: var(--input-background, white);
        border: none;
        font-size: 1rem;
        width: var(--control-width, 10rem);
    }
    
    #${INPUT}::placeholder {
        color: var(--input-placeholder, gray);
        font-weight: 400;
    }
    
  </style>
  
  <input type="text" id="${INPUT}"/>
  
`;

const inputTextAttributes = {
    PLACEHOLDER: 'placeholder',
    VALUE: 'value'
}

class InputText extends WebElement {

    static get observedAttributes() {
        return Object.values(inputTextAttributes);
    }

    set callbacks(cbs) {
        //remove all event listeners, then add them again;
        Object.keys(this.$callbacks).forEach(cbName => {
            this.$_id(INPUT).removeEventListener(cbName, cbs[cbName]);
        });

        Object.keys(cbs).forEach(cbName => {
            this.$_id(INPUT).addEventListener(cbName, cbs[cbName]);
        });

        this.$callbacks = cbs;
    }

    set value(v) {
        this.setAttribute(inputTextAttributes.VALUE, v || '');
    }

    get value() {
        return this.getAttribute(inputTextAttributes.VALUE);
    }

    constructor() {
        super(template, true);

        this._onInput = this._onInput.bind(this);
        this.getInnerRef = this.getInnerRef.bind(this);

        const placeholder = this.getAttribute(inputTextAttributes.PLACEHOLDER);
        const value = this.getAttribute(inputTextAttributes.VALUE);
        this.$_id(INPUT).setAttribute('placeholder', placeholder || '');
        this.$_id(INPUT).setAttribute('value', value || '');
        this.$callbacks = {};

        this.$_id(INPUT).addEventListener('input', this._onInput);
    }

    _onInput({target}) {
        this.setAttribute(inputTextAttributes.VALUE, target.value);
    }

    getInnerRef() {
        return this.$_id(INPUT);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case inputTextAttributes.PLACEHOLDER:
                this.$_id(INPUT).placeholder = newValue || '';
                break;
            case inputTextAttributes.VALUE:
                this.$_id(INPUT).value = newValue || '';
                break;
        }
    }

}

customElements.define('input-text', InputText);
