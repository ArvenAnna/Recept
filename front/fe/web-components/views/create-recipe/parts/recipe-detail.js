import WebElement from '../../../abstract/web-element';
import '../../../components/file-upload/photo-upload';
import '../../../components/expandable-block';
import '../../../components/step-blocks';

import '../../../styled/text-area';
import '../../../styled/action-button';
import routes from '../../../../constants/Routes';

const CONTAINER = 'container';
const ADD_ICON = 'add-icon';

const TEXT_COMPONENT = 'text-area';
const PHOTO_UPLOAD_COMPONENT = 'photo-upload';
const EXPANDABLE_BLOCK_COMPONENT = 'expandable-block';
const STEPS_COMPONENT = 'step-blocks';
const BUTTON_COMPONENT = 'action-button';

const STEPS = {
    ADD_PHOTO_STEP: 'add-photo-step',
    ADD_DESCRIPTION_STEP: 'add-description-step',
    PRESS_ADD_BUTTON_STEP: 'press-add-button-step'
}

const template = `
  <style>
    
    #${CONTAINER} {
        display: flex;
        align-items: center;
    }

    #${ADD_ICON} {
        width: 1rem;
        height: 1rem;
    }

    ${TEXT_COMPONENT} {
        --control-width: 100%;
    }
   
  </style>
  
    <${EXPANDABLE_BLOCK_COMPONENT} caption="Add description with photo in free form:">
        <${STEPS_COMPONENT} slot="content">
            <${PHOTO_UPLOAD_COMPONENT} slot="${STEPS.ADD_PHOTO_STEP}"></${PHOTO_UPLOAD_COMPONENT}>
            <${TEXT_COMPONENT} placeholder="Add detail's description" value="" slot="${STEPS.ADD_DESCRIPTION_STEP}"></${TEXT_COMPONENT}>
            <${BUTTON_COMPONENT} text="Add" slot="${STEPS.PRESS_ADD_BUTTON_STEP}"></${BUTTON_COMPONENT}> 
        </${STEPS_COMPONENT}>
   </${EXPANDABLE_BLOCK_COMPONENT}>
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

        this.$(BUTTON_COMPONENT).onClick = this._onAdd;
        this.$(STEPS_COMPONENT).props = {
            blockNames: Object.values(STEPS)
        }
    }

    _render() {
        this.$(PHOTO_UPLOAD_COMPONENT).props = {
            uploadFileCallback: path => {
                this.$file = path;
                this.$(STEPS_COMPONENT).setNextStep(STEPS.PRESS_ADD_BUTTON_STEP);
                },
            uploadUrl: routes.UPLOAD_FILE
        };
    }

    _onAdd() {
        if (this.$file) {
            const description = this.$(TEXT_COMPONENT).value;
            const detail = {imgPath: this.$file, description};

            this.$(TEXT_COMPONENT).value = '';
            this.$file = null;

            this.$(PHOTO_UPLOAD_COMPONENT).clean();

            this.$addDetail(detail);
        }
    }
}

customElements.define('recipe-detail', RecipeDetail);
