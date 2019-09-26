import WebElement from '../../abstract/web-element';
import '../../styled/action-button';
import '../../router/recipe-link';

const CONTAINER = 'menu';
const BUTTON_TEMPLATE = 'header_button_template';
const BUTTON_CONTAINER = 'button-container';

const BUTTON_COMPONENT = 'action-button';

const template = `
  <style>    
    #${CONTAINER} {
        display: flex;
        background-color: var(--menu-background, green);
    }
    
    .${BUTTON_CONTAINER} {
        padding: 0.5rem;
    }
    
  </style>
  
  <template id='${BUTTON_TEMPLATE}'>
    <recipe-link>
        <div class='${BUTTON_CONTAINER}'><${BUTTON_COMPONENT}></${BUTTON_COMPONENT}></div>
    </recipe-link>
  </template>
  
  <div id='${CONTAINER}'></div>
`;

class HorizontalMenu extends WebElement {

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

                buttonTemplate.byTag('recipe-link').onConstruct = (link) => {
                    link.path = item.link;
                };
                buttonTemplate.byTag(BUTTON_COMPONENT).onConstruct = (button) => {
                    button.text = item.text;
                }

                this.$_id(CONTAINER).appendChild(buttonTemplate);
            });
        }
    }


}

customElements.define('horizontal-menu', HorizontalMenu);
