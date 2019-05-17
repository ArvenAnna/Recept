const template = document.createElement('template');

template.innerHTML = `
`;

const supportedAttributes = {
    PATH: 'path'
}

class RecipeLink extends HTMLElement {

    constructor() {
        super();
        this.changeUrl = this.changeUrl.bind(this);
    }

    set path(newPath) {
        this.setAttribute(supportedAttributes.PATH, newPath);
    }

    static get observedAttributes() {
        return Object.values(supportedAttributes);
    }

    changeUrl() {
        window.location.hash = '#' + this.getAttribute(supportedAttributes.PATH);
    }

    connectedCallback() {
        console.log('connected link');
        this.addEventListener('click', this.changeUrl);
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.changeUrl);
    }

    // attributeChangedCallback(name, oldValue, newValue) {
    //     switch (name) {
    //         case supportedAttributes.PATH:
    //             this.changeUrl();
    //     }
    // }

}

customElements.define('recipe-link', RecipeLink);
