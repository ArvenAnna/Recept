import WebElement from '../../../abstract/web-element';

import '../../../components/two-fields-add-item-with-checkbox';
import '../../../components/lists/tags-list';
import './recipe-proportion-edit';
import {retrieveIngredientsByKeyword} from '../../../utils/asyncRequests';
import {MAX_SUGGESTIONS_NUMBER} from '../../../../constants/limits';
import mModal from '../../../model/modal';
import mTranslations from '../../../model/translations';
import {t} from '../../../utils/translateUtils';

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
       <div id='${CAPTION}'>
            ${t('create-recipe.add_recipe_proportions')}
       </div>
       <${TWO_FIELD_LIST_COMPONENT}></${TWO_FIELD_LIST_COMPONENT}>
     </div>
     <${LIST_COMPONENT} list-title='${t('create-recipe.list_recipe_proportions')}'></${LIST_COMPONENT}>
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

    async _render() {
        const firstPlaceholder = await mTranslations.getTranslation('create-recipe.add_ingredient');
        const secondPlaceholder = await mTranslations.getTranslation('create-recipe.add_norma');
        this.$(TWO_FIELD_LIST_COMPONENT).props = {
            addItemCallback: ({first, second, optional}) => {
                this._retrieveIngredientsByKeyword(first).then(ingredients => {
                    // find with exact name matching
                    const ingredient = ingredients.find(ing => ing.name === first);
                    if (ingredient) {
                        const proportion = {
                            ingredientId: ingredient.id,
                            ingredientName: ingredient.name,
                            norma: second,
                            optional
                        };
                        this.$recipe.proportion = proportion;
                        this.$(LIST_COMPONENT).items = this.$recipe.proportions;
                    }
                })

            },
            getSuggestionsPromise: this._retrieveIngredientsByKeyword,
            renderSuggestionCallback: suggestion => suggestion.name,
            placeholders: {first: firstPlaceholder, second: secondPlaceholder},
            defaultChecked: true,
            tooltipContent: t('create-recipe.is_mandatory')
        }

        this.$(LIST_COMPONENT).props = {
            items: this.$recipe.proportions,
            renderItem: (item) => `${item.ingredientName} - ${item.norma || ''}`,
            removeItemCallback: prop => {
                this.$recipe.removeProportion(prop);
                this.$(LIST_COMPONENT).items = this.$recipe.proportions;
            },
            editItemCallback: prop => {
                const editTemplate = this.getTemplateById(EDIT_PROPORTION_TEMPLATE);
                editTemplate.byTag(EDIT_PROPORTION_COMPONENT).onConstruct = comp => {
                    comp.props = {
                        recipe: this.$recipe,
                        proportion: prop,
                        saveCallback: () => this.$(LIST_COMPONENT).items = this.$recipe.proportions
                    }
                }
                mModal.open(editTemplate);
            },
            renderTooltip: prop => {
                let tooltipContent = '';
                if (prop.optional) {
                    tooltipContent = `${tooltipContent}${t('create-recipe.optional_proportion')}`;
                }
                if (prop.alternativeProportions && prop.alternativeProportions.length) {
                    tooltipContent = `${tooltipContent}${t('create-recipe.alternative_could_be')}`
                    prop.alternativeProportions.forEach(p => {
                        tooltipContent = tooltipContent + `<div>${p.ingredientName} - ${p.norma || ''}</div>`;
                    })
                }
                if (prop.alternativeRefs && prop.alternativeRefs.length) {
                    tooltipContent = `${tooltipContent}${t('create-recipe.alternative_among_recipes_could_be')}`
                    prop.alternativeRefs.forEach(p => {
                        tooltipContent = tooltipContent + `<div>${p.recipeName} - ${p.norma || ''}</div>`;
                    })
                }
                return tooltipContent;
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
