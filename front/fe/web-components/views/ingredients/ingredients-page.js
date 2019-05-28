import WebElement from '../../abstract/web-element';
import '../../components/list-items';

const CONTAINER = 'ingredients_page';
const INGREDIENTS_TEMPLATE = 'ingredients_template';

const template = `
  <style>
    
    
  </style>
  
  <template id='${INGREDIENTS_TEMPLATE}'>
      <recipe-list-items>
      </recipe-list-items>    
  </template>
  
  <div id='${CONTAINER}'></div>
`;

// const supportedAttributes = {
//     ID: 'recipe-id'
// }

class IngredientsPage extends WebElement {

    set ingredients(newIngredients) {
        this.$ingredients = newIngredients;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this.bindMethods(this._renderPage);
    }

    connectedCallback() {
        this._renderPage();
    }

    _renderPage() {
        this.$(`#${CONTAINER}`).innerHTML = ''; // clear all content

        if (this.$ingredients) {

            const template = this.getTemplateById(INGREDIENTS_TEMPLATE);

            const ingListEl = template.querySelector('recipe-list-items');
            ingListEl.onConstruct = (listItems) => {
                listItems.items = this.$ingredients;
                listItems.renderItem = (item) => `<div>${item.name}</div>`
            };


            this.$(`#${CONTAINER}`).appendChild(template);


        }
    }

}

customElements.define('ingredients-page', IngredientsPage);
