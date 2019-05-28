import './recipe-page-renderer';
import './router';
import './recipe-header';
import WebElement from './abstract/web-element';

const template = `
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

export default class App extends WebElement {
    constructor() {
        super(template);
    }
}

customElements.define('recipe-app', App);
