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
        min-width: var(--control-width, 10rem);
        padding: 0.3rem var(--input-icon-padding, 0.3rem) 0.3rem 0.3rem;
        box-sizing: border-box; 
        resize: none;
        min-height: var(--textarea-height);
        box-shadow: var(--input-shadow);
        overflow: hidden;
        white-space: pre-wrap;
    }
    
    // #${INPUT}::placeholder {
    //     color: var(--input-placeholder, gray);
    //     font-weight: 400;
    //    
    // }
    
    .placeholder {
        color: var(--input-placeholder, gray);
        font-weight: 400;
    }
    
  </style>
  
  <div contenteditable id="${INPUT}"></div>
  
`;

class TextArea extends WebElement {

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
        this.$textContent = v;
        this.$_id(INPUT).textContent = v || '';
    }

    get value() {
        return this.$textContent;
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
        this.$textContent = target.textContent;
    }

}

customElements.define('text-area', TextArea);
