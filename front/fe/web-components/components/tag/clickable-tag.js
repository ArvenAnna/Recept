import WebElement from '../../abstract/web-element';
import './removable-tag';

const CONTAINER = 'tag-container';

const TAG_COMPONENT = 'removable-tag';

const template = `  
  <div id='${CONTAINER}'>
    <${TAG_COMPONENT}>
        <slot></slot>
    </${TAG_COMPONENT}>
  </div>
`;

class ClickableTag extends WebElement {

    set props({removeItemCallback, clickItemCallback, editItemCallback, tooltipContent}) {
        this.$clickItemCallback = clickItemCallback;

        this.$(TAG_COMPONENT).props = { removeItemCallback, editItemCallback, tooltipContent };
        if (clickItemCallback) {
            this.$_id(CONTAINER).style.cursor = 'pointer';
        } else {
            this.$_id(CONTAINER).style.cursor = 'default';
        }
    }

    constructor() {
        super(template, true);

        this._clickItem = this._clickItem.bind(this);

        this.$_id(CONTAINER).addEventListener('click', this._clickItem);
    }

    _clickItem() {
        this.$clickItemCallback && this.$clickItemCallback();
    }

}
customElements.define('clickable-tag', ClickableTag);
