import WebElement from '../../abstract/web-element';
import '../../components/add-item';
import '../../components/drop-down';
import '../../components/two-fields-add-item';
import '../../components/file-input';
import '../../components/upload-image';
import '../../components/upload-images';
import '../../components/editable-list';
import '../../components/editable-two-fields-list';

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
      
      <editable-list id='ref-list'></editable-list>
      
      <editable-two-fields-list id='prop-list'></editable-two-fields-list>
      
      <div>Add main photo</div>
      <upload-image id='main-photo'></upload-image>
      <div>Add description with photo in free form</div>
      <upload-images id='detail-photos'></upload-images>
      
      <textarea class='recipe-description'></textarea>

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

    set props({recipe, departments}) {
        this.$recipe = recipe;
        this.$departments = departments;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this.bindMethods(this._renderPage);
        this._saveRecipe = this._saveRecipe.bind(this);
        this._retrieveRecipesByKeyword = this._retrieveRecipesByKeyword.bind(this);
        this._retrieveIngredientsByKeyword = this._retrieveIngredientsByKeyword.bind(this);

        this.$('.save').addEventListener('click', this._saveRecipe);
    }

    disconnectedCallback() {
        this.$('.save').removeEventListener('click', this._saveRecipe);
    }

    _saveRecipe() {
        this.$recipe.name = this.$('.recipe-name').value;
        this.$recipe.text = this.$('.recipe-description').value;

        if (!this.$recipe.department) {
            this.$recipe.department = this.$departments.length
                ? this.$departments[0] : null;
        }

        this.$recipe.save().then(id => {
           window.location.hash = '/recipe/' + id;
        });
    }

    async _retrieveRecipesByKeyword(keyword) {
        let recipes = await fetch(routes.GET_RECIPES_BY_KEYWORD, {method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({keyword})}).then(res => res.json());
        const maxSuggestionsNumber = 10;

        //exclude current recipe itself
        // exclude also already checked
        recipes = recipes.filter(ref => ref.id !== this.$recipe.id)
            .filter(ref => !this.$recipe.refs || !this.$recipe.refs.some(r => r.id === ref.id));
        recipes.slice(0, maxSuggestionsNumber);
        return recipes;
    }

    async _retrieveIngredientsByKeyword(keyword) {
        let ingredients = await fetch(routes.GET_INGREDIENTS_BY_KEYWORD, {method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({keyword})}).then(res => res.json());
        const maxSuggestionsNumber = 10;
        // exclude also already checked
        ingredients = ingredients.filter(ing => !this.$recipe.proportions || !this.$recipe.proportions.some(p => p.ingredientId === ing.id));
        ingredients.slice(0, maxSuggestionsNumber);
        return ingredients;
    }

    _renderPage() {
        if (this.$recipe) {
            this.$('.recipe-name').value = this.$recipe.name || '';
            this.$('.recipe-description').value = this.$recipe.text || '';

        }

        this.$('recipe-drop-down').props = {
            items: this.$departments || [],
            chooseItemCallback: (item) => {
                this.$recipe.department = item
            },
            renderItem: (item) => `${item.name}`,
            chosenItemIndex: this.$recipe.department && this.$departments
                ? this.$departments.map(d => d.id).indexOf(this.$recipe.department.id)
                : null
        };

        this.$('#ref-list').props = {
            title: 'List of recipe references',
            items: this.$recipe.refs,
            renderItem: ref => ref.name,
            removeItemCallback: ref => {
                this.$recipe.removeRef(ref);
                this.$('#ref-list').items = this.$recipe.refs;
            },
            addItemCallback: (item) => {
                this._retrieveRecipesByKeyword(item).then(recipes => {
                    // should be one recipe only
                    if (recipes.length === 1 && recipes[0].name === item) {
                        this.$recipe.ref = recipes[0];
                        this.$('#ref-list').items = this.$recipe.refs;
                    }
                })

            },
            getSuggestionsPromise: (keyword) => {
                return this._retrieveRecipesByKeyword(keyword);
            },
            renderSuggestionCallback: suggestion => suggestion.name
        }

        this.$('#prop-list').props = {
            title: 'List of recipe proportions',
            items: this.$recipe.proportions,
            renderItem: (item) => `
                <div key='name'>${item.ingredientName}</div>
                <div key='separator'>&nbsp;-&nbsp;</div>
                <div key='norma'>${item.norma || ''}</div>
            `,
            removeItemCallback: prop => {
                this.$recipe.removeProportion(prop);
                this.$('#prop-list').items = this.$recipe.proportions;
            },
            addItemCallback: ({first, second}) => {
                this._retrieveIngredientsByKeyword(first).then(ingredients => {
                    // should be one ingredient only
                    if (ingredients.length === 1 && ingredients[0].name === first) {
                        this.$recipe.proportion = {
                            ingredient: ingredients[0],
                            norma: second
                        };
                        this.$('#prop-list').items = this.$recipe.proportions;
                    }
                })

            },
            getSuggestionsPromise: this._retrieveIngredientsByKeyword,
            renderSuggestionCallback: suggestion => suggestion.name
        }

        this.$('#main-photo').props = {
            uploadUrl: routes.UPLOAD_FILE,
            defaultImage: this.$recipe.imgPath,
            uploadFileCallback: path => this.$recipe.imgPath = path
        }

        this.$('#detail-photos').props = {
            uploadUrl: routes.UPLOAD_FILE,
            defaultFilesList: this.$recipe.details && this.$recipe.details.map(d => ({url: d.imgPath, description: d.description})),
            uploadFileCallback: detail => this.$recipe.detail = detail,
            removeFileCallback: detail => this.$recipe.removeDetail(detail)
        }

    }

}

customElements.define('create-recipe-page', CreateRecipePage);
