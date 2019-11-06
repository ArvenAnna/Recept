import WebElement from '../../abstract/web-element';
// import '../../components/tree-tags';
// import {goTo} from '../../router/utils';

const CONTAINER = 'ingredients_page';

// const TREE_COMPONENT = 'tree-tags';

const template = `
  <style>
    #${CONTAINER} {
        padding: 1rem;
    }
  </style>
  <div id='${CONTAINER}'>
  </div>
`;

class RecipeMenuPage extends WebElement {

    set recipes(recipes) {
        this.$recipes = recipes;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this._renderPage = this._renderPage.bind(this);
    }

    _renderPage() {
        if (this.$recipes) {
            console.log(this.$recipes)
            // this.$(TREE_COMPONENT).props = {
            //     items: this.$ingredients,
            //     onClick: item => goTo(`/ingredients/${item.id}`),
            //     renderItem: item => item.name
            // }
        }
    }

}

customElements.define('recipe-menu-page', RecipeMenuPage);
