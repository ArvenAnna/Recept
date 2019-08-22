import WebElement from '../../abstract/web-element';
import '../../components/add-item';
import '../../components/drop-down';
import '../../components/two-fields-add-item';
import '../../components/file-input';
import '../../components/upload-image';
import '../../components/upload-images';
import '../../components/editable-two-fields-list';
import '../../styled/input-text';

import './parts/recipe-references';

import routes from '../../../constants/Routes';

const CONTAINER = 'create-recipe-page';

const RECIPE_NAME_CONTAINER = 'recipe-name-container';
const RECIPE_NAME = 'recipe-name';
const RECIPE_NAME_CAPTION = 'recipe-name-caption';
const RECIPE_DEPART_CONTAINER = 'recipe-depart-container';
const RECIPE_DEPART_CAPTION = 'recipe-depart-caption';
const RECIPE_PROPORTIONS_CONTAINER = 'recipe-proportions-container';
const RECIPE_PROPORTIONS = 'recipe-proportions';
const RECIPE_PROPORTIONS_CAPTION = 'recipe-proportions-caption';
const RECIPE_DESCRIPTION = 'recipe-description';
const RECIPE_PHOTO = 'recipe-photo';
const RECIPE_DETAIL_PHOTOS = 'detail-photos';
const DETAILS_CONTAINER = 'details-container';
const DETAILS_CAPTION = 'details-caption';
const ADD_PHOTO_CONTAINER = 'add-photo-container';
const UPLOAD_PHOTO_CONTAINER = 'upload-photo-container';

const SAVE = 'save';

const template = `
  <style>
    #${CONTAINER} {
        color: var(--dark-dark-background-crp);
    }
    
    #${RECIPE_NAME_CONTAINER}, #${RECIPE_DEPART_CONTAINER}, 
    #${RECIPE_PROPORTIONS_CONTAINER}, 
    #${ADD_PHOTO_CONTAINER}, #${DETAILS_CONTAINER} {
        display: flex;
        margin: 1rem;
        align-items: center;
    }
    
    #${DETAILS_CONTAINER} {
        flex-direction: column;
    }
    
    #${RECIPE_NAME_CAPTION}, #${RECIPE_DEPART_CAPTION}, 
    #${RECIPE_PROPORTIONS_CAPTION} {
        margin-right: 0.5rem;
    }
    
    #${DETAILS_CAPTION} {
        margin-bottom: 0.5rem;
    }
    
    #${UPLOAD_PHOTO_CONTAINER} {
        margin-left: 1rem;
    }
    
  </style>
  
  <div id='${CONTAINER}'>
      <div id='${RECIPE_NAME_CONTAINER}'>
        <div id='${RECIPE_NAME_CAPTION}'>Recipe name:</div>
        <input-text id='${RECIPE_NAME}' placeholder='Enter name'/>
      </div>
      
      <div id='${RECIPE_DEPART_CONTAINER}'>
        <div id='${RECIPE_DEPART_CAPTION}'>Recipe department:</div>
        <drop-down></drop-down>
      </div>
      
      <recipe-references></recipe-references>
      
      <div id='${RECIPE_PROPORTIONS_CONTAINER}'>
        <div id='${RECIPE_PROPORTIONS_CAPTION}'>Add recipe proportion:</div>
        <editable-two-fields-list id='${RECIPE_PROPORTIONS}'></editable-two-fields-list>
      </div>
      
      <div id='${ADD_PHOTO_CONTAINER}'>
          <div>Add main photo:</div>
          <div id='${UPLOAD_PHOTO_CONTAINER}'>
               <upload-image id='${RECIPE_PHOTO}'></upload-image>
          </div>
      </div>
      
      <div id='${DETAILS_CONTAINER}'>
            <div id='${DETAILS_CAPTION}'>Add description with photo in free form:</div>
            <upload-images id='${RECIPE_DETAIL_PHOTOS}'></upload-images>
      </div>
      
      
      <textarea id='${RECIPE_DESCRIPTION}'></textarea>

      <button id='${SAVE}'>Save</button>
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

        this._renderPage = this._renderPage.bind(this);
        this._saveRecipe = this._saveRecipe.bind(this);
        this._retrieveIngredientsByKeyword = this._retrieveIngredientsByKeyword.bind(this);

        this.$_id(SAVE).addEventListener('click', this._saveRecipe);
    }

    _saveRecipe() {
        this.$recipe.name = this.$_id(RECIPE_NAME).value;
        this.$recipe.text = this.$_id(RECIPE_DESCRIPTION).value;

        if (!this.$recipe.department) {
            this.$recipe.department = this.$departments.length
                ? this.$departments[0] : null;
        }

        this.$recipe.save().then(id => {
           window.location.hash = '/recipe/' + id;
        });
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
            this.$_id(RECIPE_NAME).value = this.$recipe.name || '';
            this.$_id(RECIPE_DESCRIPTION).value = this.$recipe.text || '';
        }

        this.$('drop-down').props = {
            items: this.$departments || [],
            chooseItemCallback: (item) => {
                this.$recipe.department = item
            },
            renderItem: (item) => `${item.name}`,
            chosenItemIndex: this.$recipe.department && this.$departments
                ? this.$departments.map(d => d.id).indexOf(this.$recipe.department.id)
                : null
        };

        this.$('recipe-references').recipe = this.$recipe;

        this.$_id(RECIPE_PROPORTIONS).props = {
            title: this.$recipe.proportions && this.$recipe.proportions.length ? 'List of recipe proportions:' : null,
            items: this.$recipe.proportions,
            renderItem: (item) => `
                <div key='name'>${item.ingredientName}</div>
                <div key='separator'>&nbsp;-&nbsp;</div>
                <div key='norma'>${item.norma || ''}</div>
            `,
            removeItemCallback: prop => {
                this.$recipe.removeProportion(prop);
                this.$_id(RECIPE_PROPORTIONS).items = this.$recipe.proportions;
            },
            addItemCallback: ({first, second}) => {
                this._retrieveIngredientsByKeyword(first).then(ingredients => {
                    // should be one ingredient only
                    if (ingredients.length === 1 && ingredients[0].name === first) {
                        this.$recipe.proportion = {
                            ingredient: ingredients[0],
                            norma: second
                        };
                        this.$_id(RECIPE_PROPORTIONS).items = this.$recipe.proportions;
                    }
                })

            },
            getSuggestionsPromise: this._retrieveIngredientsByKeyword,
            renderSuggestionCallback: suggestion => suggestion.name,
            placeholders: {first: 'Add ingredient', second: 'Add norma'}
        }

        this.$_id(RECIPE_PHOTO).props = {
            uploadUrl: routes.UPLOAD_FILE,
            defaultImage: this.$recipe.imgPath,
            uploadFileCallback: path => this.$recipe.imgPath = path
        }

        this.$_id(RECIPE_DETAIL_PHOTOS).props = {
            uploadUrl: routes.UPLOAD_FILE,
            defaultFilesList: this.$recipe.details && this.$recipe.details.map(d => ({url: d.imgPath, description: d.description})),
            uploadFileCallback: detail => this.$recipe.detail = detail,
            removeFileCallback: detail => this.$recipe.removeDetail(detail)
        }
    }

}

customElements.define('create-recipe-page', CreateRecipePage);
