import WebElement from '../../abstract/web-element';
import '../../styled/input-text';
import '../../styled/text-area';
import '../../styled/action-button';

import '../../components/removable-tag';

import '../../components/suggestions-chooser';
import '../../components/file-upload/photo-upload';

import {noImage} from '../../../constants/themes';
import routes from '../../../constants/Routes';
import {retrieveIngredientsByKeyword} from "../../utils/asyncRequests";

const CONTAINER = 'ingredient-create';

const INPUT_COMPONENT = 'input-text';
const TEXT_COMPONENT = 'text-area';
const PHOTO_UPLOAD_COMPONENT = 'photo-upload';
const SUGGESTION_INPUT_COMPONENT = 'suggestions-chooser';
const BUTTON_COMPONENT = 'action-button';
const REMOVABLE_TAG_COMPONENT = 'removable-tag';

const template = `
  <style>
    #${CONTAINER} {
        margin: 1rem;
    }
    
    ${REMOVABLE_TAG_COMPONENT} {
        display: none;
    }
    
    .flex {
        display: flex;
        margin: 0.5rem;
        align-items: center;
    }
    
    .label {
        margin-right: 0.5rem;
    }
    
    .flex-column {
        display: flex;
        flex-direction: column;
        margin: 0.5rem;
    }
    
    .label-column {
        margin-bottom: 0.5rem;
    }
    
    ${BUTTON_COMPONENT} {
       margin: 0.5rem; 
    }
    
  </style>
  
  <div id='${CONTAINER}' class='flex-column'>
      <div class='flex'>
        <span class='label'>Ingredient name:</span> 
        <${INPUT_COMPONENT}></${INPUT_COMPONENT}>
      </div>
      <div class='flex-column'>
        <span class='label-column'>Ingredient description:</span> 
        <${TEXT_COMPONENT}></${TEXT_COMPONENT}>
      </div>
      <div class='flex-column'>
        <span class='label-column'>Ingredient photo:</span>
        <${PHOTO_UPLOAD_COMPONENT}></${PHOTO_UPLOAD_COMPONENT}> 
      </div>
      <div class='flex'>
        <span class='label'>Parent ingredient:</span> 
        <${SUGGESTION_INPUT_COMPONENT}></${SUGGESTION_INPUT_COMPONENT}>
        <${REMOVABLE_TAG_COMPONENT}></${REMOVABLE_TAG_COMPONENT}>
      </div>
      <${BUTTON_COMPONENT} text="Save"></${BUTTON_COMPONENT}>
  </div>
`;

class CreateIngredientPage extends WebElement {

    set props({ingredient, addIngredientCallback}) {
        this.$ingredient = ingredient;
        this.$addIngredient = addIngredientCallback;
        this._renderPage();
    }

    set ingredient(ingredient) {
        this.$ingredient = ingredient;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this._renderPage = this._renderPage.bind(this);
        this._saveIngredient = this._saveIngredient.bind(this);
        this._retrieveIngredientsByKeyword = this._retrieveIngredientsByKeyword.bind(this);
        this._removeParentCallback = this._removeParentCallback.bind(this);

        this.$(BUTTON_COMPONENT).onClick = this._saveIngredient;
    }

    _renderPage() {

        this.$(INPUT_COMPONENT).placeholder = 'Add new ingredient';
        this.$(INPUT_COMPONENT).value = this.$ingredient.name;
        this.$(TEXT_COMPONENT).placeholder = 'Add description';
        this.$(TEXT_COMPONENT).value = this.$ingredient.description;

        this.$(PHOTO_UPLOAD_COMPONENT).props = {
            uploadFileCallback: path => {
                this.$ingredient.imgPath = path;
            },
            uploadUrl: routes.UPLOAD_FILE,
            src: this.$ingredient.imgPath,
            defaultSrc: noImage
        }


        this.$(REMOVABLE_TAG_COMPONENT).props = {
            removeItemCallback: this._removeParentCallback
        };

        if (this.$ingredient.parent) {
            this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'none';
            this.$(REMOVABLE_TAG_COMPONENT).innerHTML = this.$ingredient.parentName;
            this.$(REMOVABLE_TAG_COMPONENT).style.display = 'block';

        } else {
            this.$(REMOVABLE_TAG_COMPONENT).style.display = 'none';
            this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'block';

            this.$(SUGGESTION_INPUT_COMPONENT).props = {
                getSuggestionsPromise: this._retrieveIngredientsByKeyword,
                renderSuggestionCallback: suggestion => suggestion.name,
                addItemCallback: (item) => {
                    this._retrieveIngredientsByKeyword(item).then(ings => {
                        const ingredient = ings.find(ing => ing.name === item);
                        if (ingredient) {
                            this.$ingredient.parent = ingredient.id;
                            this.$(REMOVABLE_TAG_COMPONENT).innerHTML = ingredient.name;
                            this.$(REMOVABLE_TAG_COMPONENT).style.display = 'block';
                            this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'none';
                        }
                    })
                },
                placeholder: 'Add parent ingredient'
            }
        }
    }

    _removeParentCallback() {
        this.$ingredient.parent = null;
        this.$(REMOVABLE_TAG_COMPONENT).style.display = 'none';
        this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'block';
    }

    _saveIngredient() {
        this.$ingredient.name = this.$(INPUT_COMPONENT).value;
        this.$ingredient.description = this.$(TEXT_COMPONENT).value;

        // put default behavior
        this.$(REMOVABLE_TAG_COMPONENT).style.display = 'none';
        this.$(SUGGESTION_INPUT_COMPONENT).style.display = 'block';

        this.$ingredient.save().then(id => {
            this.$addIngredient();
            window.location.hash = '/ingredients/' + id;
        });
    }

    async _retrieveIngredientsByKeyword(keyword) {
        let ingredients = await retrieveIngredientsByKeyword(keyword);
        const maxSuggestionsNumber = 10;
        // exclude self
        ingredients = ingredients.filter(ing => this.$ingredient.parent !== ing.id);
        ingredients.slice(0, maxSuggestionsNumber);
        return ingredients;
    }
}

customElements.define('create-ingredient-page', CreateIngredientPage);
