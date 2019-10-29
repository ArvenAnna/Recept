import WebElement from '../../../abstract/web-element';
import '../../../components/file-upload/photo-upload';
import '../../../components/expandable-block';
import '../../../components/step-blocks';
import '../../../styled/text-area';
import '../../../styled/action-button';

import routes from '../../../../constants/Routes';
import {noImage} from '../../../../constants/themes';

import mTranslations from '../../../model/translations';
import {t} from '../../../utils/translateUtils';

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
  
    <${EXPANDABLE_BLOCK_COMPONENT} caption='${t('create-recipe.add_description_with_photo')}'> 
        <${STEPS_COMPONENT} slot='content'>
            <${PHOTO_UPLOAD_COMPONENT} slot='${STEPS.ADD_PHOTO_STEP}'></${PHOTO_UPLOAD_COMPONENT}>
            <${TEXT_COMPONENT} value='' slot='${STEPS.ADD_DESCRIPTION_STEP}'></${TEXT_COMPONENT}>
            <${BUTTON_COMPONENT} text='${t('create-recipe.add_button')}' slot='${STEPS.PRESS_ADD_BUTTON_STEP}'></${BUTTON_COMPONENT}> 
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
        this._init = this._init.bind(this);

        this.$file = null;

        this._init();
    }

    async _init() {
        this.$(BUTTON_COMPONENT).onClick = this._onAdd;
        this.$(STEPS_COMPONENT).props = {
            blockNames: Object.values(STEPS)
        }
        const placeholder = await mTranslations.getTranslation('create-recipe.add_details_description');
        this.$(TEXT_COMPONENT).placeholder = placeholder;
    }

    _render() {
        this.$(PHOTO_UPLOAD_COMPONENT).props = {
            uploadFileCallback: path => {
                this.$file = path;
                this.$(STEPS_COMPONENT).setNextStep(STEPS.PRESS_ADD_BUTTON_STEP);
                },
            uploadUrl: routes.UPLOAD_FILE,
            defaultSrc: noImage
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
