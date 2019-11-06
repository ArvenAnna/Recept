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
        border-radius: var(--theme-border-radius);
        font-size: var(--control-font-size);
        width: var(--control-width, 10rem);
        padding: 0.1rem var(--input-icon-padding, 0.1rem) 0.1rem 0.1rem;
        box-sizing: border-box; 
        resize: none;
        height: var(--textarea-height);
        box-shadow: var(--input-shadow);
        overflow: hidden;
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

    // set autoResize(autoresize) {
    //     this.$autoResize = autoresize
    // }

    get innerRef() {
        return this.$_id(INPUT);
    }

    constructor() {
        super(template, true);

        this._onInput = this._onInput.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);

        this.$callbacks = {};
        // this.$autoResize = false;

        this.$_id(INPUT).addEventListener('input', this._onInput);
        this.$_id(INPUT).addEventListener('keydown', this._onKeyDown);
    }

    _onKeyDown() {
        // if (!this.$autoResize) return;
        var el = this.$_id(INPUT);
        setTimeout(function(){
            el.style.cssText = 'height:auto; padding:0';
            // for box-sizing other than "content-box" use:
            // el.style.cssText = '-moz-box-sizing:content-box';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        },0);
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
