import './recipe-page-renderer';
import './router';
import './recipe-header';
import WebElement from './abstract/web-element';

const CONTAINER = 'sidebar_menu';
const BUTTON_TEMPLATE = 'sidebar_button_template';

const template = `

    <template id='${BUTTON_TEMPLATE}'>
        <recipe-link>
            <div class='nav_button'></div>
        </recipe-link>
    </template>

    <div class="vertical_menu side_menu" id="${CONTAINER}"></div>
`;

class RecipeSidebar extends WebElement {
    constructor() {
        super(template, true);
    }
}

customElements.define('recipe-sidebar', RecipeSidebar);
