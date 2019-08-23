import WebElement from '../../../abstract/web-element';

import '../../../components/upload-image';
import routes from "../../../../constants/Routes";

const CONTAINER = 'container';
const CAPTION = 'caption';

const UPLOAD_PHOTO_CONTAINER = 'upload-photo-container';

const UPLOAD_COMPONENT = 'upload-image';

const template = `
  <style>

      #${CONTAINER} {
         display: flex;
         margin: 1rem;
         align-items: center;
      }
      
      #${UPLOAD_PHOTO_CONTAINER} {
        margin-left: 1rem;
      }
  </style>
  
  <div id='${CONTAINER}'>
       <div id='${CAPTION}'>Add main photo:</div>
       <div id='${UPLOAD_PHOTO_CONTAINER}'>
           <${UPLOAD_COMPONENT}></${UPLOAD_COMPONENT}>
       </div>
  </div>
  
`;

class RecipeMainPhoto extends WebElement {

    set recipe(newRecipe) {
        this.$recipe = newRecipe;
        this._render();
    }

    _render() {
        this.$(UPLOAD_COMPONENT).props = {
            uploadUrl: routes.UPLOAD_FILE,
            defaultImage: this.$recipe.imgPath,
            uploadFileCallback: path => this.$recipe.imgPath = path
        }
    }

    constructor() {
        super(template, true);

        this._render = this._render.bind(this);
    }
}

customElements.define('recipe-main-photo', RecipeMainPhoto);
