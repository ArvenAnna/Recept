import mHeader from "./model/header";
import WebElement from "./abstract/web-element";

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
  
  <template id='header_button_template'>
    <recipe-link>
        <div class='nav_button'></div>
    </recipe-link>
  </template>
  
  <div id='nav_menu'></div>
`;

// const supportedAttributes = {
//     ID: 'recipe-id'
// }

class RecipeHeader extends WebElement {

    constructor() {
        super(template, true);

        this.renderHeader = this.renderHeader.bind(this);

        this.renderHeader();

        //mHeader.addSubscriber(this.currentRecipeFetched);
    }

    connectedCallback() {
    }

    renderHeader() {
        this.$('#nav_menu').innerHTML = ""; // clear all content

        if (mHeader.buttons) {
            mHeader.buttons.forEach(button => {
                const buttonTemplate = this.$('#header_button_template').content.cloneNode(true);
                buttonTemplate.querySelector('.nav_button').textContent = button.name;
                this.$('#nav_menu').appendChild(buttonTemplate);
                // after constructor and mount Callback called on children
                const children = this.$('#nav_menu').children;
                [...children].pop().path = button.to;
            });

        }
    }

}

customElements.define('recipe-header', RecipeHeader);
