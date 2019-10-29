import WebElement from '../abstract/web-element';

const BUTTON = 'button';

const template = `
  <style>
    
    #${BUTTON} {
       text-align: center;
       background-color: var(--button-background);
       border: var(--button-border);
       cursor: pointer;
       width: var(--control-width, 10rem);
       border-radius: var(--theme-border-radius);
       box-sizing: border-box;
    }
    
    #${BUTTON}:hover {
        box-shadow: var(--button-shadow);
        background-color: var(--button-hover-background);
    }
    
  </style>
  
  <div id='${BUTTON}'></div>
`;

const buttonAttributes = {
    TEXT: 'text',
}

class ActionButton extends WebElement {

    static get observedAttributes() {
        return Object.values(buttonAttributes);
    }

    set onClick(onClickHandler) {
        //remove event listener, then add it again;
        if (this.$onClick) {
            this.$_id(BUTTON).removeEventListener('click', this.$onClick);
        };

        if (onClickHandler) {
            this.$_id(BUTTON).addEventListener('click', onClickHandler);
        }

        this.$onClick = onClickHandler;
    }

    set text(v) {
        this.setAttribute(buttonAttributes.TEXT, v || '');
    }

    get text() {
        return this.getAttribute(buttonAttributes.TEXT);
    }

    constructor() {
        super(template, true);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case buttonAttributes.TEXT:
                this.$_id(BUTTON).innerHTML = newValue || '';
                break;
        }
    }

}

customElements.define('action-button', ActionButton);
