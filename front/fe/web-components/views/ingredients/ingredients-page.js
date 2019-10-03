import WebElement from '../../abstract/web-element';
import '../../components/tree-tags';

const CONTAINER = 'ingredients_page';

const TREE_COMPONENT = 'tree-tags';

const template = `
  <div id='${CONTAINER}'>
      <${TREE_COMPONENT}></${TREE_COMPONENT}>
  </div>
`;

class IngredientsPage extends WebElement {

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
            this.$(TREE_COMPONENT).props = {
                items: this.$ingredients,
                onClick: console.log,
                renderItem: item => item.name
            }
        }
    }

}

customElements.define('ingredients-page', IngredientsPage);
