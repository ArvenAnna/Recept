import WebElement from '../../abstract/web-element';
import '../../components/list-items';
import '../../components/add-item';

const CONTAINER = 'ingredients_page';

const ADD_ITEM = 'add_item';
const LIST_ITEMS = 'list_items';

const template = `
  <style>
    .${ADD_ITEM} {
        margin: 1rem;
    }
    .${LIST_ITEMS} {
        margin: 1rem;
    }
  </style>
  
  <div id='${CONTAINER}'>
      <div class='${ADD_ITEM}'><add-item></add-item></div>  
      <div class='${LIST_ITEMS}'><list-items></list-items></div>
  </div>
`;

class IngredientsPage extends WebElement {

    set props({ingredients, addIngredientCallback}) {
        this.$ingredients = ingredients;
        this.$addIngredient = addIngredientCallback;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this._renderPage = this._renderPage.bind(this);
    }

    _renderPage() {
        if (this.$ingredients) {

            const ingListEl = this.$('list-items');
            ingListEl.props = {
                items: this.$ingredients,
                renderItem: (item) => `<div>${item.name}</div>`
            }

            if (this.$addIngredient) {
                const addIngEl = this.$('add-item');
                addIngEl.props = {
                    addItemCallback: this.$addIngredient
                }
            }
        }
    }

}

customElements.define('ingredients-page', IngredientsPage);
