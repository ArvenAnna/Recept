import WebElement from '../abstract/web-element';

const INPUT = 'input';

const template = `
  <style>
    
    #${INPUT} {
        outline: none;
        margin: 0;
        font-weight: 500;
        background-color: var(--input-background, white);
        border: none;
        font-size: 1rem;
        width: var(--control-width, 10rem);
        padding: 0.1rem var(--input-icon-padding, 0.1rem) 0.1rem 0.1rem;
        box-sizing: border-box; 
        resize: none;
        height: 4rem;
    }
    
    #${INPUT}::placeholder {
        color: var(--input-placeholder, gray);
        font-weight: 400;
    }
    
    
    
  </style>
  
  <textarea id="${INPUT}"/>
  
`;

const inputTextAttributes = {
    PLACEHOLDER: 'placeholder',
    VALUE: 'value'
}

class TextArea extends WebElement {

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

    set placeholder(v) {
        this.setAttribute(inputTextAttributes.PLACEHOLDER, v || '');
    }

    get placeholder() {
        return this.getAttribute(inputTextAttributes.PLACEHOLDER);
    }

    get innerRef() {
        return this.$_id(INPUT);
    }

    constructor() {
        super(template, true);

        this._onInput = this._onInput.bind(this);

        this.$callbacks = {};

        this.$_id(INPUT).addEventListener('input', this._onInput);
    }

    _onInput({target}) {
        this.setAttribute(inputTextAttributes.VALUE, target.value);
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

customElements.define('text-area', TextArea);
