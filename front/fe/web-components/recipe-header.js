import mHeader from './model/header';
import WebElement from './abstract/web-element';
import mNewRecipe from './model/newRecipe';

const CONTAINER = 'nav_menu';
const BUTTON_TEMPLATE = 'header_button_template';
const BUTTON = 'nav_button';

const template = `
  <style>    
    #${CONTAINER} {
        display: flex;
        background-color: var(--background);
    }
    
    .${BUTTON} {
        display: flex;
        justify-content: center;
        margin: 0.5rem;
        padding: 0 0.5rem;
        cursor: pointer;
    }
    
  </style>
  
  <template id='${BUTTON_TEMPLATE}'>
    <recipe-link>
        <div class='${BUTTON}'></div>
    </recipe-link>
  </template>
  
  <div id='${CONTAINER}'></div>
`;

class RecipeHeader extends WebElement {

    constructor() {
        super(template, true);
        this._renderHeader = this._renderHeader.bind(this);

        this._renderHeader();

        mHeader.addSubscriber(this._renderHeader);
    }

    _renderHeader() {
        this.$_id(CONTAINER).innerHTML = ''; // clear all content

        if (mHeader.buttons) {
            mHeader.buttons.forEach(button => {
                const buttonTemplate = this.getTemplateById(BUTTON_TEMPLATE);

                buttonTemplate.byTag('recipe-link').onConstruct = (link) => {
                    link.path = button.to;
                };
                buttonTemplate.byClass(BUTTON).textContent = button.name;

                this.$_id(CONTAINER).appendChild(buttonTemplate);
            });
        }
    }

    disconnectedCallback() {
        mNewRecipe.removeSubscriber(this._renderHeader);
    }

}

customElements.define('recipe-header', RecipeHeader);
