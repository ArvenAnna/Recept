import WebElement from '../../../abstract/web-element';

import '../../../components/file-upload/photo-upload';
import '../../../components/expandable-block';
import routes from '../../../../constants/Routes';

const PHOTO_UPLOAD_COMPONENT = 'photo-upload';
const EXPANDABLE_BLOCK_COMPONENT = 'expandable-block';

const template = `
  <${EXPANDABLE_BLOCK_COMPONENT} caption="Add main photo:">
        <${PHOTO_UPLOAD_COMPONENT} slot="content"></${PHOTO_UPLOAD_COMPONENT}>
  </${EXPANDABLE_BLOCK_COMPONENT}>
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

    constructor() {
        super(template, true);

        this._render = this._render.bind(this);
    }

}

customElements.define('recipe-main-photo', RecipeMainPhoto);
