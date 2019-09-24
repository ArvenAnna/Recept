import WebElement from '../../../abstract/web-element';
import '../../../components/image/image-with-tooltip';
import {noImage} from '../../../../constants/themes';

const IMAGE_WITH_TOOLTIP_COMPONENT = 'image-with-tooltip';

const template = `
  <recipe-link>
      <${IMAGE_WITH_TOOLTIP_COMPONENT}></${IMAGE_WITH_TOOLTIP_COMPONENT}>
  </recipe-link>
`;

class RecipeReference extends WebElement {

    set props({src, text, link}) {
        this.$(IMAGE_WITH_TOOLTIP_COMPONENT).src = src || noImage;
        this.$(IMAGE_WITH_TOOLTIP_COMPONENT).innerHTML = text || '';
        this.$('recipe-link').path = link;
    }

    constructor() {
        super(template, true);
    }

}

customElements.define('recipe-reference', RecipeReference);
