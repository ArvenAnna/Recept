import WebElement from '../../abstract/web-element';
import '../../styled/input-text';
import '../../styled/text-area';

import './parts/recipe-references';
import './parts/recipe-proportions';
import './parts/recipe-department';
import './parts/recipe-main-photo';
import './parts/recipe-details';

const CONTAINER = 'create-recipe-page';

const RECIPE_NAME_CONTAINER = 'recipe-name-container';
const RECIPE_NAME = 'recipe-name';
const RECIPE_NAME_CAPTION = 'recipe-name-caption';
const RECIPE_DESCRIPTION = 'recipe-description';

const RECIPE_DEPARTMENT_COMPONENT = 'recipe-department';
const RECIPE_REFS_COMPONENT = 'recipe-references';
const RECIPE_PROPORTIONS_COMPONENT = 'recipe-proportions';
const RECIPE_MAIN_PHOTO_COMPONENT = 'recipe-main-photo';
const RECIPE_DETAILS_COMPONENT = 'recipe-details';
const RECIPE_DESCRIPTION_COMPONENT = 'text-area';


const SAVE = 'save';

const template = `
  <style>
    #${CONTAINER} {
        color: var(--dark-dark-background-crp);
    }
    
    #${RECIPE_NAME_CONTAINER}{
        display: flex;
        margin: 1rem;
        align-items: center;
    }
    
    #${RECIPE_NAME_CAPTION} {
        margin-right: 0.5rem;
    }
    
    ${RECIPE_DESCRIPTION_COMPONENT} {
        --control-width: 100%;
        width: 100%;
        
    }
    
  </style>
  
  <div id='${CONTAINER}'>
      <div id='${RECIPE_NAME_CONTAINER}'>
        <div id='${RECIPE_NAME_CAPTION}'>Recipe name:</div>
        <input-text id='${RECIPE_NAME}' placeholder='Enter name'/>
      </div>
      
      <${RECIPE_DEPARTMENT_COMPONENT}></${RECIPE_DEPARTMENT_COMPONENT}>
      
      <${RECIPE_REFS_COMPONENT}></${RECIPE_REFS_COMPONENT}>
      
      <${RECIPE_PROPORTIONS_COMPONENT}></${RECIPE_PROPORTIONS_COMPONENT}>
      
      <${RECIPE_MAIN_PHOTO_COMPONENT}></${RECIPE_MAIN_PHOTO_COMPONENT}>
      
      <${RECIPE_DETAILS_COMPONENT}></${RECIPE_DETAILS_COMPONENT}>
      
      <div id='${RECIPE_NAME_CONTAINER}'>
            <${RECIPE_DESCRIPTION_COMPONENT} placeholder="Add description"></${RECIPE_DESCRIPTION_COMPONENT}>
      </div>

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

        this.$_id(SAVE).addEventListener('click', this._saveRecipe);
    }

    _saveRecipe() {
        this.$recipe.name = this.$_id(RECIPE_NAME).value;
        this.$recipe.text = this.$(RECIPE_DESCRIPTION_COMPONENT).value;

        if (!this.$recipe.department) {
            this.$recipe.department = this.$departments.length
                ? this.$departments[0] : null;
        }

        this.$recipe.save().then(id => {
           window.location.hash = '/recipe/' + id;
        });
    }

    _renderPage() {
        if (this.$recipe) {
            this.$_id(RECIPE_NAME).value = this.$recipe.name || '';
            this.$(RECIPE_DESCRIPTION_COMPONENT).value = this.$recipe.text || '';
        }

        this.$(RECIPE_DEPARTMENT_COMPONENT).recipe = this.$recipe;
        this.$(RECIPE_DEPARTMENT_COMPONENT).departments = this.$departments;
        this.$(RECIPE_REFS_COMPONENT).recipe = this.$recipe;
        this.$(RECIPE_PROPORTIONS_COMPONENT).recipe = this.$recipe;
        this.$(RECIPE_MAIN_PHOTO_COMPONENT).recipe = this.$recipe;
        this.$(RECIPE_DETAILS_COMPONENT).recipe = this.$recipe;
    }

}

customElements.define('create-recipe-page', CreateRecipePage);
