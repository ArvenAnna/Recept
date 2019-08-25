import WebElement from '../../../abstract/web-element';

import '../../../components/removable-image';
import '../../../components/file-input-autoupload';
import routes from '../../../../constants/Routes';

const CONTAINER = 'container';
const CAPTION = 'caption';

const IMAGE_WRAPPER = 'image_wrapper';
const UPLOAD_WRAPPER = 'upload_wrapper';

const UPLOAD_COMPONENT = 'file-input-autoupload';
const IMAGE_COMPONENT = 'removable-image';


const template = `
  <style>

      #${CONTAINER} {
         display: flex;
         margin: 1rem;
         align-items: flex-start;
         flex-direction: column;
      }
      
      #${CAPTION} {
         padding-right: 0.5rem;
      }
      
      #${UPLOAD_WRAPPER} {
         display: flex;
      }
      
      #${IMAGE_WRAPPER} {
        width: 300px;
      }
  </style>
  
  <div id='${CONTAINER}'>
       <div id='${UPLOAD_WRAPPER}'>
            <div id='${CAPTION}'>Add main photo:</div>
            <${UPLOAD_COMPONENT}></${UPLOAD_COMPONENT}>
        </div>
       
       <div id='${IMAGE_WRAPPER}'><${IMAGE_COMPONENT}></${IMAGE_COMPONENT}></div>
  </div>
  
`;

class RecipeMainPhoto extends WebElement {

    set recipe(newRecipe) {
        this.$recipe = newRecipe;
        this._render();
    }

    _render() {
        this.$(UPLOAD_COMPONENT).props = {
            uploadFileCallback: path => {
                this.$recipe.imgPath = path;
                this.$(IMAGE_COMPONENT).src = path;
            },
            uploadUrl: routes.UPLOAD_FILE
        };

        this.$(IMAGE_COMPONENT).props = {
            removeFileCallback: () => {
                this.$recipe.imgPath = null;
                this.$(UPLOAD_COMPONENT).cleanFile();
            },
            src: this.$recipe.imgPath
        }
    }

    constructor() {
        super(template, true);

        this._render = this._render.bind(this);
    }

}

customElements.define('recipe-main-photo', RecipeMainPhoto);
