const templateElement = document.createElement('template');

export default class WebElement extends HTMLElement {
    $(selector) {
        return this.shadowRoot && this.shadowRoot.querySelector(selector)
    }

    constructor(template, isShadow) {
        super();

        const root = isShadow ? this.attachShadow({mode: 'open'}) : this;

        if (template) {
            templateElement.innerHTML = template;
            root.appendChild(templateElement.content.cloneNode(true));
        }

    }

    connectedCallback() {
    }
}
