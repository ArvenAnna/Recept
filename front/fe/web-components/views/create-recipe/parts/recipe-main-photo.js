import WebElement from '../../../abstract/web-element';

import '../../../components/removable-image';
import '../../../components/file-input-autoupload';

import '../../../components/photo-upload';
import routes from '../../../../constants/Routes';

const CONTAINER = 'container';
const CAPTION = 'caption';
const CAPTION_CONTAINER = 'caption-container';
const EXPAND_ICON = 'expand-icon';

const IMAGE_WRAPPER = 'image_wrapper';
const UPLOAD_WRAPPER = 'upload_wrapper';

const PHOTO_UPLOAD_COMPONENT = 'photo-upload';

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
            <${PHOTO_UPLOAD_COMPONENT}></${PHOTO_UPLOAD_COMPONENT}>
       </div>
  </div>
  
`;

class RecipeMainPhoto extends WebElement {

    set recipe(newRecipe) {
        this.$recipe = newRecipe;
        this._render();
    }

    _render() {
        this.$(PHOTO_UPLOAD_COMPONENT).props = {
            uploadFileCallback: path => {
                this.$recipe.imgPath = path;
            },
            uploadUrl: routes.UPLOAD_FILE,
            src: this.$recipe.imgPath
        }
    }

    _toggleContent() {
        this.$isContentExpanded = !this.$isContentExpanded;
        if (this.$isContentExpanded) {
            this.$_id(EXPAND_ICON).src = ICON_ARROW_UP;
            this.reveal_id(UPLOAD_WRAPPER);
        } else {
            this.$_id(EXPAND_ICON).src = ICON_ARROW_DOWN;
            this.hide_id(UPLOAD_WRAPPER);
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
