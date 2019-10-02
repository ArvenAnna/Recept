import WebElement from '../../abstract/web-element';
import '../../components/lists/tags-list';
import '../../components/tree-tags';

import './parts/create-ingredient';

const CONTAINER = 'ingredients_page';
const LIST_ITEMS = 'list_items';

const LIST_COMPONENT = 'tags-list';
const CREATE_INGREDIENT_COMPONENT = 'create-ingredient';
const TREE_COMPONENT = 'tree-tags';

const template = `
  <style>
    .${LIST_ITEMS} {
        margin: 1rem;
    }
  </style>
  
  <div id='${CONTAINER}'>
      <${CREATE_INGREDIENT_COMPONENT}></${CREATE_INGREDIENT_COMPONENT}>
      <!--<div class='${LIST_ITEMS}'><${LIST_COMPONENT}></${LIST_COMPONENT}></div>-->
      <${TREE_COMPONENT}></${TREE_COMPONENT}>
  </div>
`;

class IngredientsPage extends WebElement {

    set props({addIngredientCallback, ingredient, ingredients}) {
        this.$addIngredient = addIngredientCallback;
        this.$ingredient = ingredient;
        this.$ingredients = ingredients;
        this._renderPage();
    }

    set ingredient(ingredient) {
        this.$ingredient = ingredient;
        this._renderPage();
    }

    set ingredients(ingredients) {
        this.$ingredients = ingredients;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this._renderPage = this._renderPage.bind(this);
    }

    _renderPage() {
        if (this.$ingredients) {

            // this.$(LIST_COMPONENT).props = {
            //     items: this.$ingredients,
            //     renderItem: (item) => item.name
            // }

            if (this.$addIngredient) {
                this.$(CREATE_INGREDIENT_COMPONENT).props = {
                    ingredient: this.$ingredient,
                    addIngredientCallback: this.$addIngredient
                };
            }

            this.$(TREE_COMPONENT).props = {
                items: this.$ingredients,
                onClick: console.log,
                renderItem: item => item.name
            }
        }
    }

}

customElements.define('ingredients-page', IngredientsPage);
