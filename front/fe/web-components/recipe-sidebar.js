import './views/recipe/recipe-page-renderer';
import './router';
import mDepartments from './model/departments';
import WebElement from './abstract/web-element';
import './router/recipe-link';

const CONTAINER = 'sidebar_menu';
const BUTTON_TEMPLATE = 'sidebar_button_template';

const template = `
    <style>
       .side_menu {
        grid-column-start: 2;
        grid-column-end: 3;
        margin: 1rem;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .nav_button {
        background-color: var(--button-color);
        display: flex;
        justify-content: center;
        padding: 0 0.5rem;
    }
    
    .nav_button:hover {
        background-color: var(--bg-color);
        cursor: pointer;
    }
    </style>

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

        this._render = this._render.bind(this);
        this._departmentsChanged = this._departmentsChanged.bind(this);

        mDepartments.addSubscriber(this._departmentsChanged);
    }

    _departmentsChanged(model) {
        this._render(model.departments);
    }

    _render(newDepartments) {
        this.$(`#${CONTAINER}`).innerHTML = ''; // clear all content

        if (newDepartments.length) {

            newDepartments.forEach(dep => {
                const template = this.getTemplateById(BUTTON_TEMPLATE);

                const linkEl = template.querySelector('recipe-link');
                linkEl.onConstruct = (link) => {
                    link.path = `/department/${dep.id}/recipes`;
                };
                template.querySelector('.nav_button').textContent = dep.name;
                this.$(`#${CONTAINER}`).appendChild(template);
            });

        }
    }

    connectedCallback() {
        mDepartments.retrieve();
    }

    disconnectedCallback() {
        mDepartments.removeSubscriber(this._departmentsChanged);
    }
}

customElements.define('recipe-sidebar', RecipeSidebar);
