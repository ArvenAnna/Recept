import mTranslations, {DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES} from '../model/translations';
import WebElement from '../abstract/web-element';
import '../components/drop-down/drop-down';

const DROP_DOWN_COMPONENT = 'drop-down';
const CONTAINER = 'drop-down-container';

const template = `
  <style>
    #${CONTAINER} {
        margin: 0 0.5rem;
    }
    
    ${DROP_DOWN_COMPONENT} {
        --control-width: 3rem;
    }
  </style>
  <div id='${CONTAINER}'><${DROP_DOWN_COMPONENT}></${DROP_DOWN_COMPONENT}></div>
`;

class LangSwitcher extends WebElement {

    constructor() {
        super(template, true);
        this._renderDropdown = this._renderDropdown.bind(this);

        this._renderDropdown();
    }

    _renderDropdown() {
        this.$(DROP_DOWN_COMPONENT).props = {
            items: Object.values(SUPPORTED_LANGUAGES),
            renderItem: item => item,
            chosenItemIndex: Object.values(SUPPORTED_LANGUAGES).indexOf(DEFAULT_LANGUAGE),
            chooseItemCallback: value => mTranslations.lang = value
        }
    }
}

customElements.define('lang-switcher', LangSwitcher);
