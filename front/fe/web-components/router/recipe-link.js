const template = document.createElement('template');
template.innerHTML = `
  <content/>
`;

const supportedAttributes = {
    PATH: 'path'
}

class RecipeLink extends HTMLElement {

    constructor() {
        super();
        this.changeUrl = this.changeUrl.bind(this);
        this.appendChild(template.content.cloneNode(true));
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