import WebElement from '../../../abstract/web-element';

import '../../../components/two-fields-add-item-with-checkbox';
import '../../../components/lists/tags-list';
import './recipe-proportion-edit';
import {retrieveIngredientsByKeyword} from '../../../utils/asyncRequests';
import {MAX_SUGGESTIONS_NUMBER} from "../../../../constants/limits";
import mModal from '../../../model/modal';

const CONTAINER = 'container';
const CAPTION = 'caption';
const INPUT_CONTAINER = 'input-container';

const EDIT_PROPORTION_TEMPLATE = 'edit-proportion-template';

const TWO_FIELD_LIST_COMPONENT = 'two-fields-add-item-with-checkbox';
const LIST_COMPONENT = 'tags-list';
const EDIT_PROPORTION_COMPONENT = 'recipe-proportion-edit';

const template = `
  <style>
      #${CONTAINER} {
         display: flex;
         margin: 1rem;
         flex-direction: column;
      }
      
      #${INPUT_CONTAINER} {
         display: flex;
         align-items: center;
         margin-bottom: 1rem;
       }      
      
      #${CAPTION} {
         margin-right: 0.5rem;
      }
  </style>
  
  <template id='${EDIT_PROPORTION_TEMPLATE}'>
    <${EDIT_PROPORTION_COMPONENT}></${EDIT_PROPORTION_COMPONENT}>
  </template>
  
  <div id='${CONTAINER}'>
     <div id='${INPUT_CONTAINER}'>
       <div id='${CAPTION}'>Add recipe proportion:</div>
       <${TWO_FIELD_LIST_COMPONENT}></${TWO_FIELD_LIST_COMPONENT}>
     </div>
     <${LIST_COMPONENT}></${LIST_COMPONENT}>
  </div>
  
`;

class RecipeProportions extends WebElement {

    set recipe(newRecipe) {
        this.$recipe = newRecipe;
        this._render();
    }

    async _retrieveIngredientsByKeyword(keyword) {
        let ingredients = await retrieveIngredientsByKeyword(keyword);
        // exclude also already checked
        ingredients = ingredients.filter(ing => !this.$recipe.proportions || !this.$recipe.proportions.some(p => p.ingredientId === ing.id));
        ingredients.slice(0, MAX_SUGGESTIONS_NUMBER);
        return ingredients;
    }

    _render() {
        this.$(TWO_FIELD_LIST_COMPONENT).props = {
            addItemCallback: ({first, second, optional}) => {
                this._retrieveIngredientsByKeyword(first).then(ingredients => {
                    // find with exact name matching
                    const ingredient = ingredients.find(ing => ing.name === first);
                    if (ingredient) {
                        this.$recipe.proportion = {
                            ingredient,
                            norma: second,
                            optional
                        };
                        this.$(LIST_COMPONENT).items = this.$recipe.proportions;
                        this.$(LIST_COMPONENT).title = 'List of recipe proportions:';
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
            title: this.$recipe.proportions && this.$recipe.proportions.length ? 'List of recipe proportions:' : null,
            items: this.$recipe.proportions,
            renderItem: (item) => `${item.ingredientName} - ${item.norma || ''}`,
            removeItemCallback: prop => {
                this.$recipe.removeProportion(prop);
                this.$(LIST_COMPONENT).items = this.$recipe.proportions;
            },
            editItemCallback: prop => {
                const editTemplate = this.getTemplateById(EDIT_PROPORTION_TEMPLATE);
                editTemplate.byTag(EDIT_PROPORTION_COMPONENT).onConstruct = comp => {
                    comp.recipe = this.$recipe;
                    comp.proportion = prop;
                }
                mModal.open(editTemplate);
            }
        }
    }

    constructor() {
        super(template, true);

        this._retrieveIngredientsByKeyword = this._retrieveIngredientsByKeyword.bind(this);
        this._render = this._render.bind(this);
    }
}

customElements.define('recipe-proportions', RecipeProportions);
