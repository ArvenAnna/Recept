import WebElement from '../../abstract/web-element';
import '../../components/lists/tags-list';
import '../../styled/input-text-with-icon';
import '../../components/removable-tag';

const CONTAINER = 'ingredients_page';

const ADD_ITEM = 'add_item';
const LIST_ITEMS = 'list_items';

const INPUT_COMPONENT = 'input-text-with-icon';
const LIST_COMPONENT = 'tags-list';
const TAG_COMPONENT = 'removable-tag';

const ICON_SRC = 'svg/add.svg';

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
      <div class='${ADD_ITEM}'><${INPUT_COMPONENT}></${INPUT_COMPONENT}></div>  
      <div class='${LIST_ITEMS}'><${LIST_COMPONENT}></${LIST_COMPONENT}></div>
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

            this.$(LIST_COMPONENT).props = {
                items: this.$ingredients,
                renderItem: (item) => item.name
            }

            if (this.$addIngredient) {
                this.$(INPUT_COMPONENT).src = ICON_SRC;
                this.$(INPUT_COMPONENT).placeholder = 'Add new ingredient';
                this.$(INPUT_COMPONENT).iconClick = this.$addIngredient;
            }
        }
    }

}

customElements.define('ingredients-page', IngredientsPage);
