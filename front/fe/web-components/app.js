import WebElement from './abstract/web-element';

import './router/recipe-route';

import './views/recipe/recipe-page-renderer';
import './views/recipes/recipes-page-renderer';
import './views/ingredients/ingredients-page-renderer';
import './views/create-recipe/create-recipe-page-renderer';
import './views/create-recipe/edit-recipe-page-renderer';

import './recipe-header';
import './recipe-sidebar';

const CONTAINER = 'app_container';
const BODY = 'app_body';
const CONTENT = 'app_body_content';
const SIDE = 'side_menu';

const template = `
  <style>
    /*@import "../css/index.css";*/
    /*@import "../css/green-theme.css";*/
    
    #${CONTAINER} {
        display: grid;
        grid-template-columns: 1fr 5fr 1fr;
    }
    
    recipe-header {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 2;
        
        margin: 2rem 0;
    }
    
    #${BODY} {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 2;
        grid-row-end: 3;
        
        display: grid;
        grid-template-columns: 3fr 1fr;
    }
    
    #${CONTENT} {
        grid-column-start: 1;
        grid-column-end: 2;
        background-color: var(--main-background);
    }
    
    #${SIDE} {
        grid-column-start: 2;
        grid-column-end: 3;
    }
    
  </style>
  <div id="${CONTAINER}">
    <recipe-header></recipe-header>
    <div id="${BODY}"> 
        <div id="${CONTENT}">
            <recipe-route path="/recipe/:id" component="recipe-page-renderer"></recipe-route>
            <recipe-route path="/departments/:id/recipes" component="recipes-page-renderer"></recipe-route>
            <recipe-route path="/ingredients" component="ingredients-page-renderer"></recipe-route>
            <recipe-route path="/recipe/:id/edit" component="edit-recipe-page-renderer"></recipe-route>
            <recipe-route path="/recipe" component="create-recipe-page-renderer"></recipe-route>
        </div>
        <div id="${SIDE}"><recipe-sidebar></recipe-sidebar></div>
    </div>
  </div>
  
`;

export default class App extends WebElement {
    constructor() {
        super(template);
    }
}

customElements.define('recipe-app', App);
