import WebElement from '../../abstract/web-element';
import '../../styled/action-button';

const CONTAINER = 'menu';
const BUTTON_TEMPLATE = 'header_button_template';
const BUTTON_CONTAINER = 'button-container';

const template = `
  <style>    
    #${CONTAINER} {
        padding: 0.5rem 0;
        background-color: var(--menu-background, green);
    }
    
    .${BUTTON_CONTAINER} {
        padding: 0 0.5rem;
        cursor: pointer;
        border-radius: var(--theme-border-radius);
    }
    
    .${BUTTON_CONTAINER}:hover {
        background-color: var(--button-hover-background, lightgreen);
        box-shadow: var(--button-shadow);
    }
    
  </style>
  
  <template id='${BUTTON_TEMPLATE}'>
     <div class='${BUTTON_CONTAINER}'></div>
  </template>
  
  <div id='${CONTAINER}'></div>
`;

class VerticalMenu extends WebElement {

    set items(newItems) {
        this._render(newItems);
    }

    constructor() {
        super(template, true);
        this._render = this._render.bind(this);
    }

    _render(items) {
        this.$_id(CONTAINER).innerHTML = ''; // clear all content

        if (items && items.length) {
            items.forEach(item => {
                const buttonTemplate = this.getTemplateById(BUTTON_TEMPLATE);

                buttonTemplate.byClass(BUTTON_CONTAINER).textContent = item.text;
                buttonTemplate.byClass(BUTTON_CONTAINER).addEventListener('click', item.onClick);

                this.$_id(CONTAINER).appendChild(buttonTemplate);
            });
        }
    }


}

customElements.define('vertical-menu', VerticalMenu);
