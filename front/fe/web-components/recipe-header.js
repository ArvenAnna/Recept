import mHeader from './model/header';
import WebElement from './abstract/web-element';
import './components/menu/horizontal-menu';
import './views/lang-switcher';

const CONTAINER = 'container';
const MENU_COMPONENT = 'horizontal-menu';
const LANG_SWITCHER_COMPONENT = 'lang-switcher';

const template = `
    <style>
        #${CONTAINER} {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: var(--menu-background);
        }
    </style>
    <div id='${CONTAINER}'>
        <${MENU_COMPONENT}></${MENU_COMPONENT}>
        <${LANG_SWITCHER_COMPONENT}></${LANG_SWITCHER_COMPONENT}>
    </div>
`;

class RecipeHeader extends WebElement {

    constructor() {
        super(template, true);
        this._renderHeader = this._renderHeader.bind(this);
        this._getNameWithCount = this._getNameWithCount.bind(this);

        this._renderHeader();

        mHeader.addSubscriber(this._renderHeader);
    }

    _renderHeader() {
        if (mHeader.buttons) {
            this.$(MENU_COMPONENT).items = mHeader.buttons.map(({to, name, count}) => ({link: to, text: this._getNameWithCount(name, count)}));
        }
    }

    _getNameWithCount(name, count) {
        return count == null ? name : `<style>.counter{color:var(--light-background);}</style>${name} <span class='counter'>${count}</span>`;
    }

    disconnectedCallback() {
        mHeader.removeSubscriber(this._renderHeader);
    }

}

customElements.define('recipe-header', RecipeHeader);
