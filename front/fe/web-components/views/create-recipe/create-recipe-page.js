import WebElement from '../../abstract/web-element';
import '../../components/add-item';
import '../../components/drop-down';
import routes from '../../../constants/Routes';

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
      <recipe-add-item id='ref-add'></recipe-add-item>
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
        this._retrieveRecipesByKeyword = this._retrieveRecipesByKeyword.bind(this);

        this.$('.save').addEventListener('click', this._saveRecipe);


    }

    disconnectedCallback() {
        this.$('.save').removeEventListener('click', this._saveRecipe);
    }

    _saveRecipe() {
        this.$recipe.name = this.$('.recipe-name').value;
        //this.$recipe.department =
        //this.$recipe.notifySubscribers();
        console.dir(this.$recipe);
    }

    async _retrieveRecipesByKeyword(keyword) {
        const recipes = await fetch(routes.GET_RECIPES_BY_KEYWORD(keyword))
            .then(res => res.json());
        const maxSuggestionsNumber = 10;
        recipes.slice(0, maxSuggestionsNumber);
        //exclude current recipe itself
        return recipes.filter(ref => ref.id !== this.$recipe.id);
    }

    _renderPage() {

        if (this.$recipe) {
            this.$('.recipe-name').value = this.$recipe.name || '';
        }

        this.$('recipe-drop-down').props = {
            items: this.$departments || [],
            chooseItemCallback: (item) => {
                this.$recipe.department = item
            },
            renderItem: (item) => `${item.name}`
        };

        this.$('#ref-add').props = {
            symbols: 3,
            addItemCallback: (item) => {
                // TODO: add validation of input string against existing recipes
                this.$recipe.ref = item
            },
            getSuggestionsPromise: (keyword) => {
                return this._retrieveRecipesByKeyword(keyword);

            },
            renderSuggestionCallback: suggestion => suggestion.name
        }

    }

}

customElements.define('create-recipe-page', CreateRecipePage);
