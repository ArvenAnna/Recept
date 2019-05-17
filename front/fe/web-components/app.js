import './recipe-page-renderer';
import './router';
import './recipe-header';

const template = document.createElement('template');
template.innerHTML = `
  <div class="app_container">
    <recipe-header class="nav_menu"></recipe-header>
    <div class="app_body"> 
        <div class="app_body_content">
            <recipe-route path="/recipe/:id">
                <recipe-page-renderer></recipe-page-renderer>
            </recipe-route>
        </div>
        <div class="side_menu">menu</div>
    </div>
  </div>
  
`;

export default class App extends HTMLElement {
    constructor() {
        super();

        this.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('recipe-app', App);
