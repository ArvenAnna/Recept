import WebElement from '../../abstract/web-element';
import './dropdown-list';

const CONTAINER = 'container';
const DROP_DOWN_TEMPLATE = 'drop-down-template';

const LIST_COMPONENT = 'drop-down-list';

const template = `
  <template id="${DROP_DOWN_TEMPLATE}">
    <${LIST_COMPONENT}></${LIST_COMPONENT}> 
  </template>
 
  <div id="${CONTAINER}"></div>
  
`;

class ToggableDropDownList extends WebElement {
    set props({chooseItemCallback, items, renderItem, chosenItemIndex}) {
        this.$items = items || [];
        this.$chooseItemCallback = chooseItemCallback;
        this.$renderItem = renderItem;
        this.$chosenItemIndex = chosenItemIndex;

        // required props: items, renderItem

        if (!this.$renderItem) {
            throw new Error("Dropdown-list: renderItem should be defined")
        }

        if (this.$isOpened) {
            this._renderList();
        }
    }

    constructor() {
        super(template, true);

        this.$isOpened = false;

        this.openDropdown = this.openDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this._chooseItem = this._chooseItem.bind(this);
        this._renderList = this._renderList.bind(this);
    }

    _renderList() {
        this.$(LIST_COMPONENT).props = {
            chooseItemCallback: this._chooseItem,
            chosenItemIndex: this.$chosenItemIndex,
            items: this.$items,
            renderItem: this.$renderItem,
        }
    }

    _chooseItem(item) {
        this.closeDropdown();
        this.$chooseItemCallback(item);
    }

    openDropdown() {
        if (!this.$isOpened) {
            const template = this.getTemplateById(DROP_DOWN_TEMPLATE);
            this.$_id(CONTAINER).appendChild(template);

            this._renderList();

            this.$isOpened = true;
        }
    }

    closeDropdown() {
        if (this.$isOpened) {
            this.$(LIST_COMPONENT).remove();
            this.$isOpened = false;
        }
    }

    toggleDropdown() {
        if (this.$isOpened) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }
}

customElements.define('toggable-drop-down-list', ToggableDropDownList);
