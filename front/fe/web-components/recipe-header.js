import mHeader from './model/header';
import WebElement from './abstract/web-element';
import './components/menu/horizontal-menu';

const MENU_COMPONENT = 'horizontal-menu';

const template = `
  <${MENU_COMPONENT}></${MENU_COMPONENT}>
`;

class RecipeHeader extends WebElement {

    constructor() {
        super(template, true);
        this._renderHeader = this._renderHeader.bind(this);

        this._renderHeader();

        mHeader.addSubscriber(this._renderHeader);
    }

    _renderHeader() {
        if (mHeader.buttons) {
            this.$(MENU_COMPONENT).items = mHeader.buttons.map(({to, name}) => ({link: to, text: name}));
        }
    }

    disconnectedCallback() {
        mHeader.removeSubscriber(this._renderHeader);
    }

}

customElements.define('recipe-header', RecipeHeader);
