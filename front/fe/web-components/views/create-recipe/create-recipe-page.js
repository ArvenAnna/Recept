import WebElement from '../../abstract/web-element';
import '../../components/list-items';
import '../../components/drop-down';

const CONTAINER = 'create-recipe-page';

const template = `
  <style>
    .recipe-name {
        
    }
    
    .save {
    
    }
    
  </style>
  
  
  <div id='${CONTAINER}'>
      <input class='recipe-name'/>
      <recipe-drop-down></recipe-drop-down>
      <button class='save'>Save</button>
  </div>
`;

class CreateRecipePage extends WebElement {

    set recipe(newRecipe) {
        this.$recipe = newRecipe;
        this._renderPage();
    }

    set departments(newDepartments) {
        this.$departments = newDepartments;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this.bindMethods(this._renderPage);
        this._saveRecipe = this._saveRecipe.bind(this);

        this.$('.save').addEventListener('click', this._saveRecipe);


    }

    disconnectedCallback() {
        this.$('.save').removeEventListener('click', this._saveRecipe);
    }

    _saveRecipe() {
        this.$recipe.name = this.$('.recipe-name').value;
        //this.$recipe.notifySubscribers();
        console.dir(this.$recipe);
    }

    _renderPage() {

        if (this.$recipe) {
            this.$('.recipe-name').value = this.$recipe.name || '';
        }

        this.$('recipe-drop-down').props = {
            items: this.$departments || [],
            chooseItemCallback: (item) => this.$recipe.department = item,
            renderItem: (item) => `${item.name}`
        };

    }

}

customElements.define('create-recipe-page', CreateRecipePage);
