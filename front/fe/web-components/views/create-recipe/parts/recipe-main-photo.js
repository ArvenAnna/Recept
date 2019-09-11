import WebElement from '../../../abstract/web-element';

import '../../../components/removable-image';
import '../../../components/file-input-autoupload';
import routes from '../../../../constants/Routes';

const CONTAINER = 'container';
const CAPTION = 'caption';
const CAPTION_CONTAINER = 'caption-container';
const EXPAND_ICON = 'expand-icon';

const IMAGE_WRAPPER = 'image_wrapper';
const UPLOAD_WRAPPER = 'upload_wrapper';

const UPLOAD_COMPONENT = 'file-input-autoupload';
const IMAGE_COMPONENT = 'removable-image';

const ICON_ARROW_DOWN = 'svg/caret-down.svg';
const ICON_ARROW_UP = 'svg/sort-up.svg';

const template = `
  <style>

      #${CONTAINER} {
         display: flex;
         margin: 1rem;
         align-items: flex-start;
         flex-direction: column;
      }
      
      #${UPLOAD_WRAPPER} {
         display: none;
            
         flex-direction: column;
         align-items: center;
      }
      
      #${IMAGE_WRAPPER} {
        width: 300px;
      }
      
      #${EXPAND_ICON} {
        width: 0.5rem;
        height: 0.5rem;
        cursor: pointer;
        position: absolute;
        left: -0.8rem;
      }
      
      #${CAPTION_CONTAINER} {
        display: flex;
        align-items: center;
        position: relative;
      }
      
  </style>
  
  <div id='${CONTAINER}'>
       <div id='${CAPTION_CONTAINER}'>
            <img src="${ICON_ARROW_DOWN}" id="${EXPAND_ICON}"/>
            <div id='${CAPTION}'>Add main photo:</div>
            
       </div>
       <div id="${UPLOAD_WRAPPER}">
            <${UPLOAD_COMPONENT}></${UPLOAD_COMPONENT}>
            <div id='${IMAGE_WRAPPER}'><${IMAGE_COMPONENT}></${IMAGE_COMPONENT}></div>
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

    _toggleContent() {
        this.$isContentExpanded = !this.$isContentExpanded;
        if (this.$isContentExpanded) {
            this.$_id(EXPAND_ICON).src = ICON_ARROW_UP;
            this.$_id(UPLOAD_WRAPPER).style.display = 'flex';
        } else {
            this.$_id(EXPAND_ICON).src = ICON_ARROW_DOWN;
            this.$_id(UPLOAD_WRAPPER).style.display = 'none';
        }
    }

    constructor() {
        super(template, true);
        this.$isContentExpanded = false;

        this._render = this._render.bind(this);
        this._toggleContent = this._toggleContent.bind(this);

        this.$_id(EXPAND_ICON).addEventListener('click', this._toggleContent);
    }

}

customElements.define('recipe-main-photo', RecipeMainPhoto);
