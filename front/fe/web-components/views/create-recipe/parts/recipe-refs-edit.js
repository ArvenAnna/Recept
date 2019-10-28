import WebElement from '../../../abstract/web-element';

import '../../../styled/input-text';
import '../../../styled/check-box';

import mNewRecipe from '../../../model/newRecipe';
import mModal from '../../../model/modal';

const CONTAINER = 'container';
const BUTTON_CONTAINER = 'button-container';
const CHECKBOX_CONTAINER = 'checkbox-container';
const ROW_CONTAINER = 'row-container';

const NAME = 'name';
const NORMA = 'norma';

const CHECKBOX_COMPONENT = 'check-box';
const INPUT_COMPONENT = 'input-text';
const BUTTON_COMPONENT = 'action-button';

const template = `
  <style>
      #${CONTAINER} {
         display: flex;
         flex-direction: column;
         background-color: var(--main-background);
         padding: 1rem;
      }
      
      #${NAME} {
         align-self: center;
         font-size: var(--header-font-size);
         margin-bottom: 1rem;
      }
      
      #${BUTTON_CONTAINER} {
         align-self: center;
         margin-top: 1rem;
      }
      
      .${ROW_CONTAINER} {
        display: flex;
        align-items: stretch;
        padding: 0.5rem 0;
      }
      
      ${CHECKBOX_COMPONENT} {
        margin: 0 0.2rem;
      }
      
      #${CHECKBOX_CONTAINER} {
        display: flex;
        align-self: center;
        margin-left: 0.2rem;
      }
  </style>
  
  <div id='${CONTAINER}'>
     <div id="${NAME}"></div>
     <div class='${ROW_CONTAINER}'>
        <${INPUT_COMPONENT} id='${NORMA}' placeholder='norma'></${INPUT_COMPONENT}>
        <div id='${CHECKBOX_CONTAINER}'>
            <${CHECKBOX_COMPONENT}></${CHECKBOX_COMPONENT}>
            <div>required ingredient</div>
        </div>
     </div>
     <div id='${BUTTON_CONTAINER}'>
            <${BUTTON_COMPONENT} text="Save"></${BUTTON_COMPONENT}>
      </div>
  </div>
  
`;

class RecipeRefsEdit extends WebElement {

    set props({ref, recipe, saveCallback}) {
        this.$ref = ref;
        this.$recipe = recipe;
        this.$saveCallback = saveCallback;
        this._render();
    }

    _render() {
        if (this.$ref) {
            this.$_id(NAME).textContent = this.$ref.recipeName;
            this.$_id(NORMA).value = this.$ref.norma;
            this.$(CHECKBOX_COMPONENT).value = !this.$ref.optional;
        }
    }

    _saveRef() {
        this.$ref.norma = this.$_id(NORMA).value;
        this.$ref.optional = !this.$(CHECKBOX_COMPONENT).value;
        mNewRecipe.ref = this.$ref;
        mModal.close();
        this.$saveCallback && this.$saveCallback();
    }

    constructor() {
        super(template, true);

        this._render = this._render.bind(this);
        this._saveRef = this._saveRef.bind(this);

        this.$(BUTTON_COMPONENT).onClick = this._saveRef;
    }
}

customElements.define('recipe-refs-edit', RecipeRefsEdit);
