import WebElement from '../../../abstract/web-element';
import '../../../components/file-input-autoupload';
import '../../../styled/text-area';
import routes from '../../../../constants/Routes';

const CONTAINER = 'container';
const ADD_BUTTON = 'add-button';
const IMAGE_WRAPPER = 'image_wrapper';
const ADD_ICON = 'add-icon';

const UPLOAD_COMPONENT = 'file-input-autoupload';
const IMAGE_COMPONENT = 'removable-image';
const TEXT_COMPONENT = 'text-area';

const ICON_ADD_SRC = 'svg/add.svg';

const template = `
  <style>
    
    #${CONTAINER} {
        display: flex;
        margin: 1rem;
        align-items: flex-start;
        flex-direction: column;
    }
      
    #${IMAGE_WRAPPER} {
        width: 300px;
    }
    
    #${ADD_ICON} {
        width: 1rem;
        height: 1rem;
    }
    
    #${ADD_BUTTON} {
        border: 1px solid black;
        display: flex;
        padding: 0.5rem;
        cursor: pointer;
    }
   
  </style>
  
  <div id="${CONTAINER}">
        <${UPLOAD_COMPONENT}></${UPLOAD_COMPONENT}>
        <div id='${IMAGE_WRAPPER}'><${IMAGE_COMPONENT}></${IMAGE_COMPONENT}></div>
        <${TEXT_COMPONENT}></${TEXT_COMPONENT}>
        <div id="${ADD_BUTTON}">
            <span>Add detail</span>
            <img src="${ICON_ADD_SRC}" id="${ADD_ICON}"/>
        </div>
  </div>
  
`;

class RecipeDetail extends WebElement {

    set props({addDetail}) {
        this.$addDetail = addDetail;
        this._render();
    }

    constructor() {
        super(template, true);

        this._onAdd = this._onAdd.bind(this);
        this._render = this._render.bind(this);

        this.$file = null;

        this.$_id(ADD_BUTTON).addEventListener('click', this._onAdd);
    }

    _render() {
        this.$(UPLOAD_COMPONENT).props = {
            uploadFileCallback: path => {
                this.$file = path;
                this.$(IMAGE_COMPONENT).src = path;
            },
            uploadUrl: routes.UPLOAD_FILE
        };

        this.$(IMAGE_COMPONENT).props = {
            removeFileCallback: () => {
                this.$file = null;
                this.$(UPLOAD_COMPONENT).cleanFile();
            },
            src: this.$file
        }
    }

    _onAdd() {
        if (this.$file) {
            const description = this.$(TEXT_COMPONENT).value;
            const detail = {imgPath: this.$file, description};

            this.$(TEXT_COMPONENT).value = '';
            this.$file = null;
            this.$(UPLOAD_COMPONENT).cleanFile();
            this.$(IMAGE_COMPONENT).clean();

            this.$addDetail(detail);
        }
    }
}

customElements.define('recipe-detail', RecipeDetail);
