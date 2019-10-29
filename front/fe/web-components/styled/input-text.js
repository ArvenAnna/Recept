import WebElement from '../abstract/web-element';

const INPUT = 'input';

const ERROR_TEXT = 'error-text';

const template = `
  <style>
    
    #${INPUT} {
        outline: none;
        margin: 0;
        font-weight: 500;
        background-color: var(--input-background, white);
        border: none;
        border-radius: var(--theme-border-radius);
        font-size: var(--control-font-size);
        width: var(--control-width, 10rem);
        padding: 0.1rem var(--input-icon-padding, 0.1rem) 0.1rem 0.1rem;
        box-sizing: border-box; 
        box-shadow: var(--input-shadow);
    }
    
    #${INPUT}.error{
        box-shadow: var(--input-error-shadow);
    }
    
    #${INPUT}::placeholder {
        color: var(--input-placeholder, gray);
        font-weight: 400;
    }
    
    #${ERROR_TEXT} {
        color: var(--input-error-color);
        font-size: 0.7rem;
        position: absolute;
    }
    
  </style>
  
  <input type="text" id="${INPUT}"/>
  <div id="${ERROR_TEXT}"></div>
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

    set placeholder(v) {
        this.setAttribute(inputTextAttributes.PLACEHOLDER, v || '');
    }

    get placeholder() {
        return this.getAttribute(inputTextAttributes.PLACEHOLDER);
    }

    get innerRef() {
        return this.$_id(INPUT);
    }

    set validationErrorsOnBlur(errors) {
        // should be array of { pattern: regexp, errorText: string }
        this.$validationErrors = errors;
    }

    constructor() {
        super(template, true);

        this._onInput = this._onInput.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._clearErrors = this._clearErrors.bind(this);

        this.$callbacks = {};
        this.$touched = false;

        this.$_id(INPUT).addEventListener('input', this._onInput);
        this.$_id(INPUT).addEventListener('focus', this._onFocus);
        this.$_id(INPUT).addEventListener('blur', this._onBlur);
    }

    _onFocus() {
        this.$touched = true;
        this._clearErrors();
    }

    _onBlur() {
        if (this.$touched && this.$validationErrors && this.$validationErrors.length) {
            let isErrorPresent = false;
            this.$validationErrors.forEach(error => {
                if (!error.pattern.test(this.value)) {
                    this.$(INPUT).classList.add('error');
                    this.$_id(ERROR_TEXT).innerHTML = error.errorText;
                    isErrorPresent = true;
                }
            });
            if (!isErrorPresent) {
                this._clearErrors();
            }
        }
    }

    _clearErrors() {
        this.$(INPUT).classList.remove('error');
        this.$_id(ERROR_TEXT).textContent = '';
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

customElements.define('input-text', InputText);
