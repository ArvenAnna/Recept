import mDepartments from './model/departments';
import WebElement from './abstract/web-element';
import './components/menu/vertical-menu';

const CONTAINER = 'sidebar-menu';

const MENU_COMPONENT = 'vertical-menu';

const template = `
    <style>
        #${CONTAINER} {
            margin-left: 1rem;
        }
    </style>

    <div id='${CONTAINER}'><${MENU_COMPONENT}></${MENU_COMPONENT}></div>
`;

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
        if (newDepartments.length) {

            this.$(MENU_COMPONENT).items = newDepartments.map(dep => ({
                link: `/recipes?departmentId=${dep.id}`,
                text: dep.name
            }));
        }
    }

    disconnectedCallback() {
        mDepartments.removeSubscriber(this._departmentsChanged);
    }
}

customElements.define('recipe-sidebar', RecipeSidebar);
