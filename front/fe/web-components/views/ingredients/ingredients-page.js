import WebElement from '../../abstract/web-element';
import '../../components/list-items';
import '../../components/add-item';

const CONTAINER = 'ingredients_page';
const INGREDIENTS_TEMPLATE = 'ingredients_template';

const template = `
  <style>
    
    
  </style>
  
  <template id='${INGREDIENTS_TEMPLATE}'>
      <recipe-add-item></recipe-add-item>  
      <recipe-list-items></recipe-list-items>    
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

    set addIngredient(addIngredientCallback) {
        this.$addIngredient = addIngredientCallback;
    }

    constructor() {
        super(template, true);

        this.bindMethods(this._renderPage);

        this._addIngredient = this._addIngredient.bind(this);
    }

    connectedCallback() {
        this._renderPage();
    }

    _addIngredient(newIngredient) {
        if (this.$addIngredient) {
            this.$addIngredient(newIngredient);
        }
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

            const addIngEl = template.querySelector('recipe-add-item');
            addIngEl.onConstruct = (addIng) => {
                addIng.props = {
                    addItemCallback: this._addIngredient,
                }
            }


            this.$(`#${CONTAINER}`).appendChild(template);


        }
    }

}

customElements.define('ingredients-page', IngredientsPage);
