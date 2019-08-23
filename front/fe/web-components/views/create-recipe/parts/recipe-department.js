import WebElement from '../../../abstract/web-element';

import '../../../components/drop-down';

const CONTAINER = 'container';
const CAPTION = 'caption';

const DROP_DOWN_COMPONENT = 'drop-down';

const template = `
  <style>
      #${CONTAINER} {
         display: flex;
         margin: 1rem;
         align-items: center;
      }
      
      #${CAPTION} {
         margin-right: 0.5rem;
      }
  </style>
  
  <div id='${CONTAINER}'>
       <div id='${CAPTION}'>Recipe department:</div>
       <${DROP_DOWN_COMPONENT}></${DROP_DOWN_COMPONENT}>
  </div>
  
`;

class RecipeDepartment extends WebElement {

    set departments(newDepartments) {
        this.$departments = newDepartments;
        this._render();
    }

    set recipe(newRecipe) {
        this.$recipe = newRecipe;
        this._render();
    }

    _render() {
        this.$(DROP_DOWN_COMPONENT).props = {
            items: this.$departments || [],
            chooseItemCallback: (item) => {
                this.$recipe.department = item
            },
            renderItem: (item) => `${item.name}`,
            chosenItemIndex: this.$recipe.department && this.$departments
                ? this.$departments.map(d => d.id).indexOf(this.$recipe.department.id)
                : null
        };
    }

    constructor() {
        super(template, true);

        this._render = this._render.bind(this);
    }
}

customElements.define('recipe-department', RecipeDepartment);
