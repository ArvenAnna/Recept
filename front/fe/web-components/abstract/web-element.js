const templateElement = document.createElement('template');

export default class WebElement extends HTMLElement {
    $(selector) {
        return this.shadowRoot && this.shadowRoot.querySelector(selector)
    }

    $_id(id) {
        return this.$(`#${id}`);
    }

    hide(selector) {
        this.$(selector).style.display = 'none';
    }

    hide_id(id) {
        this.hide(`#${id}`);
    }

    reveal(selector) {
        this.$(selector).style.display = 'flex';
    }

    reveal_id(id) {
        this.reveal(`#${id}`);
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
        // console.log(`${this.localName} is connected`);
    }

    getTemplateById(templateId) {
        const template = this.shadowRoot
            ? this.$(`#${templateId}`).content.cloneNode(true)
            : this.querySelector(`#${templateId}`).content.cloneNode(true);

        template.byTag = function (tagName) {
            return this.querySelector(`${tagName}`);
        };
        template.byClass = function (className) {
            return this.querySelector(`.${className}`);
        }
        return template;
        // return this.shadowRoot
        //     ? this.$(`#${templateId}`).content.cloneNode(true)
        //     : this.querySelector(`#${templateId}`).content.cloneNode(true);
    }
}
