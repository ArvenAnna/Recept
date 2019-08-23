import WebElement from '../../abstract/web-element';
import '../../components/add-item';
import '../../components/drop-down';
import '../../components/two-fields-add-item';
import '../../components/file-input';
import '../../components/upload-image';
import '../../components/upload-images';
import '../../styled/input-text';

import './parts/recipe-references';
import './parts/recipe-proportions';

import routes from '../../../constants/Routes';

const CONTAINER = 'create-recipe-page';

const RECIPE_NAME_CONTAINER = 'recipe-name-container';
const RECIPE_NAME = 'recipe-name';
const RECIPE_NAME_CAPTION = 'recipe-name-caption';
const RECIPE_DEPART_CONTAINER = 'recipe-depart-container';
const RECIPE_DEPART_CAPTION = 'recipe-depart-caption';
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
    #${ADD_PHOTO_CONTAINER}, #${DETAILS_CONTAINER} {
        display: flex;
        margin: 1rem;
        align-items: center;
    }
    
    #${DETAILS_CONTAINER} {
        flex-direction: column;
    }
    
    #${RECIPE_NAME_CAPTION}, #${RECIPE_DEPART_CAPTION} {
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
      
      <recipe-proportions></recipe-proportions>
      
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
        this.$('recipe-proportions').recipe = this.$recipe;

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
