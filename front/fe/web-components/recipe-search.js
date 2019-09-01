import WebElement from './abstract/web-element';

const CONTAINER = 'search-container';
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
        }
    
        .${BUTTON}:hover {
            background-color: var(--hover-button, lightgreen);
        }
    </style>

    <div id="${CONTAINER}"></div>
`;

class RecipeSearch extends WebElement {
    constructor() {
        super(template, true);
        //
        // this._render = this._render.bind(this);
        // this._departmentsChanged = this._departmentsChanged.bind(this);
        //
        // mDepartments.addSubscriber(this._departmentsChanged);
        // mDepartments.retrieve();
    }

    // _departmentsChanged(model) {
    //     this._render(model.departments);
    // }
    //
    // _render(newDepartments) {
    //     this.$_id(CONTAINER).innerHTML = ''; // clear all content
    //
    //     if (newDepartments.length) {
    //
    //         newDepartments.forEach(dep => {
    //             const template = this.getTemplateById(BUTTON_TEMPLATE);
    //
    //             const linkEl = template.byTag('recipe-link');
    //             linkEl.onConstruct = (link) => {
    //                 link.path = `/departments/${dep.id}/recipes`;
    //             };
    //             template.byClass(BUTTON).textContent = dep.name;
    //             this.$_id(CONTAINER).appendChild(template);
    //         });
    //
    //     }
    // }
    //
    // disconnectedCallback() {
    //     mDepartments.removeSubscriber(this._departmentsChanged);
    // }
}

customElements.define('recipe-search', RecipeSearch);
