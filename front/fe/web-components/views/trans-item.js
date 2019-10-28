import WebElement from '../abstract/web-element';
import mTranslations from '../model/translations';

const CONTAINER = 'container';

const template = `
  <div id="${CONTAINER}"></div>
`;

const supportedAttributes = {
    KEY: 'key'
}

class TransItem extends WebElement {

    static get observedAttributes() {
        return Object.values(supportedAttributes);
    }

    set key(v) {
        this.setAttribute(supportedAttributes.KEY, v);
    }

    get key() {
        return this.getAttribute(supportedAttributes.KEY);
    }

    constructor() {
        super(template, true);

        this._languageChanged = this._languageChanged.bind(this);

        mTranslations.addSubscriber(this._languageChanged);
    }

    async _languageChanged() {
        const value = await mTranslations.getTranslation(this.key);
        this.$_id(CONTAINER).innerHTML = value;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case supportedAttributes.KEY:
                this._languageChanged();
        }
    }

    disconnectedCallback() {
        mTranslations.removeSubscriber(this._languageChanged);
    }
}

customElements.define('trans-item', TransItem);
