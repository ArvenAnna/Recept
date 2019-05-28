import mHeader from './model/header';
import WebElement from './abstract/web-element';

const CONTAINER = 'nav_menu';
const BUTTON_TEMPLATE = 'header_button_template';

const template = `
  <style>
    .nav_button {
        background-color: var(--button-color);
        box-shadow: var(--shadow-color);
        margin: 10px;
        display: flex;
        justify-content: center;
        padding: 0 0.5rem;
    }
    
  </style>
  
  <template id='${BUTTON_TEMPLATE}'>
    <recipe-link>
        <div class='nav_button'></div>
    </recipe-link>
  </template>
  
  <div id='${CONTAINER}'></div>
`;

class RecipeHeader extends WebElement {

    constructor() {
        super(template, true);

        this.bindMethods(this.renderHeader);

        this.renderHeader();

        //mHeader.addSubscriber(this.currentRecipeFetched);
    }

    renderHeader() {
        this.$(`#${CONTAINER}`).innerHTML = ''; // clear all content

        if (mHeader.buttons) {
            mHeader.buttons.forEach(button => {
                const buttonTemplate = this.getTemplateById(BUTTON_TEMPLATE);
                buttonTemplate.querySelector('.nav_button').textContent = button.name;
                buttonTemplate.querySelector('recipe-link').onConstruct = (link) => {
                    link.path = button.to;
                };
                this.$(`#${CONTAINER}`).appendChild(buttonTemplate);
            });
        }
    }

}

customElements.define('recipe-header', RecipeHeader);
