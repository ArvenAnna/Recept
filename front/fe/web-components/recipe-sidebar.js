import mDepartments from './model/departments';
import WebElement from './abstract/web-element';
import './router/recipe-link';

const CONTAINER = 'sidebar_menu';
const BUTTON_TEMPLATE = 'sidebar_button_template';
const BUTTON = 'nav_button';

const template = `
    <style>
        #${CONTAINER} {
            margin-left: 1rem;
            background-color: var(--background, green);
            padding: 0.5rem 0;
        }

        .${BUTTON} {
            padding: 0 0.5rem;
            cursor: pointer;
            border-radius: var(--theme-border-radius);
        }
    
        .${BUTTON}:hover {
            background-color: var(--hover-button, lightgreen);
            box-shadow: var(--shadow-button);
        }
    </style>

    <template id='${BUTTON_TEMPLATE}'>
        <recipe-link>
            <div class='${BUTTON}'></div>
        </recipe-link>
    </template>

    <div class="side_menu" id="${CONTAINER}">search</div>
`;

//todo: remove css class from container
class RecipeSidebar extends WebElement {
    constructor() {
        super(template, true);

        this._render = this._render.bind(this);
        this._departmentsChanged = this._departmentsChanged.bind(this);

        mDepartments.addSubscriber(this._departmentsChanged);
        mDepartments.retrieve();
    }

    _departmentsChanged(model) {
        this._render(model.departments);
    }

    _render(newDepartments) {
        this.$_id(CONTAINER).innerHTML = ''; // clear all content

        if (newDepartments.length) {

            newDepartments.forEach(dep => {
                const template = this.getTemplateById(BUTTON_TEMPLATE);

                const linkEl = template.byTag('recipe-link');
                linkEl.onConstruct = (link) => {
                    link.path = `/recipes?departmentId=${dep.id}`;
                };
                template.byClass(BUTTON).textContent = dep.name;
                this.$_id(CONTAINER).appendChild(template);
            });

        }
    }

    disconnectedCallback() {
        mDepartments.removeSubscriber(this._departmentsChanged);
    }
}

customElements.define('recipe-sidebar', RecipeSidebar);
