import WebElement from '../abstract/web-element';

const supportedAttributes = {
    PATH: 'path'
}

class RecipeLink extends WebElement {

    constructor() {
        super();
        this.bindMethods(this.changeUrl);
    }

    set path(newPath) {
        this.setAttribute(supportedAttributes.PATH, newPath);
    }

    changeUrl() {
        window.location.hash = '#' + this.getAttribute(supportedAttributes.PATH);
    }

    connectedCallback() {
        this.addEventListener('click', this.changeUrl);
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.changeUrl);
    }

}

customElements.define('recipe-link', RecipeLink);
