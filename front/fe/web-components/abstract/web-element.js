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

        this.bindMethods = this.bindMethods.bind(this);

        this.bindMethods(this.getTemplateById)
    }

    bindMethods(...methods) {
        methods.forEach(method => {
            method = method.bind(this);
        })
    }

    connectedCallback() {
        // setters or getters on properties don't work before constructor was invoked
        // onConstruct - callback when constructor is already invoked, there you can place setting of properties
        // there should be properties set
        if (this.onConstruct) {
            this.onConstruct(this);
        }
    }

    getTemplateById(templateId) {
        return this.shadowRoot
            ? this.$(`#${templateId}`).content.cloneNode(true)
            : this.querySelector(`#${templateId}`).content.cloneNode(true);
    }
}
