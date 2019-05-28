import './views/recipe/recipe-page-renderer';
import './views/recipes/recipes-page-renderer';
import './views/ingredients/ingredients-page-renderer';
import './router';
import './recipe-header';
import WebElement from './abstract/web-element';
import './recipe-sidebar';

const template = `
  <div class="app_container">
    <recipe-header class="nav_menu"></recipe-header>
    <div class="app_body"> 
        <div class="app_body_content">
            <recipe-route path="/recipe/:id" component="recipe-page-renderer">
            </recipe-route>
            <recipe-route path="/departments/:id/recipes" component="recipes-page-renderer">
            </recipe-route>
            <recipe-route path="/ingredients" component="ingredients-page-renderer">
            </recipe-route>
        </div>
        <div class="side_menu"><recipe-sidebar></recipe-sidebar></div>
    </div>
  </div>
  
`;

export default class App extends WebElement {
    constructor() {
        super(template);
    }
}

customElements.define('recipe-app', App);
