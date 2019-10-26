import WebElement from '../../../abstract/web-element';

import '../../../components/two-fields-add-item-with-checkbox';
import '../../../components/lists/tags-list';
import '../../../styled/input-text';
import '../../../styled/check-box';
import {MAX_SUGGESTIONS_NUMBER} from '../../../../constants/limits';
import {retrieveIngredientsByKeyword} from '../../../utils/asyncRequests';

const CONTAINER = 'container';
const BUTTON_CONTAINER = 'button-container';
const CAPTION = 'caption';
const CHECKBOX_CONTAINER = 'checkbox-container';
const ROW_CONTAINER = 'row-container';

const NAME = 'name';
const NORMA = 'norma';

const VERTICAL_PADDING = 'vertical-padding';

const CHECKBOX_COMPONENT = 'check-box';
const INPUT_COMPONENT = 'input-text';
const BUTTON_COMPONENT = 'action-button';
const TWO_FIELD_LIST_COMPONENT = 'two-fields-add-item-with-checkbox';
const LIST_COMPONENT = 'tags-list';


const template = `
  <style>
      #${CONTAINER} {
         display: flex;
         flex-direction: column;
         background-color: var(--light-background);
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
      
      .${VERTICAL_PADDING} {
        padding: 0.5rem 0
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
     <div>
        <div class='${VERTICAL_PADDING}'>Add alternative proportions:</div>
        <div>
            <${TWO_FIELD_LIST_COMPONENT}></${TWO_FIELD_LIST_COMPONENT}>
            <div class='${VERTICAL_PADDING}'>
                <${LIST_COMPONENT} class='${VERTICAL_PADDING}'></${LIST_COMPONENT}>
            </div>
        </div>
     </div>
     <div id='${BUTTON_CONTAINER}'>
            <${BUTTON_COMPONENT} text="Save"></${BUTTON_COMPONENT}>
      </div>
  </div>
  
`;

class RecipeProportionEdit extends WebElement {

    set proportion(newProportion) {
        this.$proportion = newProportion;
        this._render();
    }

    set recipe(newRecipe) {
        this.$recipe = newRecipe;
        // this._render();
    }

    async _retrieveIngredientsByKeyword(keyword) {
        let ingredients = await retrieveIngredientsByKeyword(keyword);
        // exclude also already checked in recipe and alternative list
        ingredients = ingredients.filter(ing => !this.$recipe.proportions || !this.$recipe.proportions.some(p => p.ingredientId === ing.id));
        ingredients = ingredients.filter(ing => !this.alternativeProportions.some(p => p.ingredient.id === ing.id));
        ingredients.slice(0, MAX_SUGGESTIONS_NUMBER);
        return ingredients;
    }

    _render() {
        if (this.$proportion) {
            this.$_id(NAME).textContent = this.$proportion.ingredientName;
            this.$_id(NORMA).value = this.$proportion.norma;
            this.$(CHECKBOX_COMPONENT).value = !this.$proportion.optional;

            this.$(TWO_FIELD_LIST_COMPONENT).props = {
                addItemCallback: ({first, second, optional}) => {
                    this._retrieveIngredientsByKeyword(first).then(ingredients => {
                        // find with exact name matching
                        const ingredient = ingredients.find(ing => ing.name === first);
                        if (ingredient) {
                            this.alternativeProportions.push({
                                ingredient,
                                norma: second,
                                optional
                            });
                            this.$(LIST_COMPONENT).items = this.alternativeProportions;
                        }
                    })

                },
                getSuggestionsPromise: this._retrieveIngredientsByKeyword,
                renderSuggestionCallback: suggestion => suggestion.name,
                placeholders: {first: 'Add ingredient', second: 'Add norma'},
                defaultChecked: true,
                tooltipContent: 'Is mandatory?'
            }

            this.$(LIST_COMPONENT).props = {
                title: 'Alternative proportions list:',
                items: this.alternativeProportions,
                renderItem: (item) => `${item.ingredient.name} - ${item.norma || ''}`,
                removeItemCallback: prop => {
                    this.alternativeProportions = this.alternativeProportions.filter(p => p.ingredient.id !== prop.ingredient.id);
                    this.$(LIST_COMPONENT).items = this.alternativeProportions;
                }
            }
        }
    }

    _saveProportion() {
        console.log(this.alternativeProportions)
    }

    constructor() {
        super(template, true);
        this.alternativeProportions = [];

        this._retrieveIngredientsByKeyword = this._retrieveIngredientsByKeyword.bind(this);
        this._render = this._render.bind(this);
        this._saveProportion = this._saveProportion.bind(this);

        this.$(BUTTON_COMPONENT).onClick = this._saveProportion;
    }
}

customElements.define('recipe-proportion-edit', RecipeProportionEdit);
