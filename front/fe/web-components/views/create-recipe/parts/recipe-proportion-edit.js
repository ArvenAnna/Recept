import WebElement from '../../../abstract/web-element';

import '../../../components/two-fields-add-item';
import '../../../components/lists/tags-list';
import '../../../styled/input-text';
import '../../../styled/check-box';
import {MAX_SUGGESTIONS_NUMBER} from '../../../../constants/limits';
import {retrieveIngredientsByKeyword, retrieveRecipesByKeyword} from '../../../utils/asyncRequests';

import mNewRecipe from '../../../model/newRecipe';
import mModal from '../../../model/modal';
import {t} from '../../../utils/translateUtils';
import mTranslations from '../../../model/translations';

const CONTAINER = 'container';
const BUTTON_CONTAINER = 'button-container';
const CHECKBOX_CONTAINER = 'checkbox-container';
const ROW_CONTAINER = 'row-container';
const ALTERNATIVE_PROPORTIONS = 'alternative-proportions';
const ALTERNATIVE_REFS = 'alternative-refs';

const NAME = 'name';
const NORMA = 'norma';

const VERTICAL_PADDING = 'vertical-padding';

const CHECKBOX_COMPONENT = 'check-box';
const INPUT_COMPONENT = 'input-text';
const BUTTON_COMPONENT = 'action-button';
const TWO_FIELD_LIST_COMPONENT = 'two-fields-add-item';
const LIST_COMPONENT = 'tags-list';


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
     <div id='${NAME}'></div>
     <div class='${ROW_CONTAINER}'>
        <${INPUT_COMPONENT} id='${NORMA}' placeholder='norma'></${INPUT_COMPONENT}>
        <div id='${CHECKBOX_CONTAINER}'>
            <${CHECKBOX_COMPONENT}></${CHECKBOX_COMPONENT}>
            <div>${t('create-recipe.required_ingredient')}</div>
        </div>
     </div>
     <div id='${ALTERNATIVE_PROPORTIONS}'>
        <div class='${VERTICAL_PADDING}'>${t('create-recipe.add_alternative_proportions')}</div>
        <div>
            <${TWO_FIELD_LIST_COMPONENT}></${TWO_FIELD_LIST_COMPONENT}>
            <div class='${VERTICAL_PADDING}'>
                <${LIST_COMPONENT} class='${VERTICAL_PADDING}' list-title='${t('create-recipe.alternative_proportions_list')}'></${LIST_COMPONENT}>
            </div>
        </div>
     </div>
     <div id='${ALTERNATIVE_REFS}'>
        <div class='${VERTICAL_PADDING}'>${t('create-recipe.add_alternative_refs')}</div>
        <div>
            <${TWO_FIELD_LIST_COMPONENT}></${TWO_FIELD_LIST_COMPONENT}>
            <div class='${VERTICAL_PADDING}'>
                <${LIST_COMPONENT} list-title='${t('create-recipe.alternative_refs_list')}'></${LIST_COMPONENT}>
            </div>
        </div>
     </div>
     <div id='${BUTTON_CONTAINER}'>
            <${BUTTON_COMPONENT} text=${t('common.save')}></${BUTTON_COMPONENT}>
      </div>
  </div>
  
`;

class RecipeProportionEdit extends WebElement {

    set props({proportion, recipe, saveCallback}) {
        this.$saveCallback = saveCallback;
        this.$recipe = recipe;
        this.$proportion = proportion;
        this.alternativeProportions = proportion.alternativeProportions || [];
        this.alternativeRefs = proportion.alternativeRefs || [];
        this._render();
    }

    async _retrieveIngredientsByKeyword(keyword) {
        let ingredients = await retrieveIngredientsByKeyword(keyword);
        // exclude also already checked in recipe and alternative list
        ingredients = ingredients.filter(ing => !this.$recipe.proportions || !this.$recipe.proportions.some(p => p.ingredientId === ing.id));
        ingredients = ingredients.filter(ing => !this.alternativeProportions.some(p => p.ingredientId === ing.id));
        ingredients.slice(0, MAX_SUGGESTIONS_NUMBER);
        return ingredients;
    }

    async _retrieveRecipesByKeyword(keyword) {
        let recipes = await retrieveRecipesByKeyword(keyword);
        const maxSuggestionsNumber = 10;

        //exclude current recipe itself
        // exclude also already checked
        recipes = recipes.filter(ref => ref.id !== this.$recipe.id)
            .filter(ref => !this.$recipe.refs || !this.$recipe.refs.some(r => r.id === ref.id));
        recipes.slice(0, maxSuggestionsNumber);
        return recipes;
    }

    async _render() {
        mTranslations.getTranslation('create-recipe.add_norma').then(value => this.$_id(NORMA).placeholder = value);
        if (this.$proportion) {
            this.$_id(NAME).textContent = this.$proportion.ingredientName;
            this.$_id(NORMA).value = this.$proportion.norma;
            this.$(CHECKBOX_COMPONENT).value = !this.$proportion.optional;

            const firstPlaceholder = await mTranslations.getTranslation('create-recipe.add_ingredient');
            const secondPlaceholder = await mTranslations.getTranslation('create-recipe.add_norma');

            this.$_id(ALTERNATIVE_PROPORTIONS).querySelector(TWO_FIELD_LIST_COMPONENT).props = {
                addItemCallback: ({first, second}) => {
                    this._retrieveIngredientsByKeyword(first).then(ingredients => {
                        // find with exact name matching
                        const ingredient = ingredients.find(ing => ing.name === first);
                        if (ingredient) {
                            this.alternativeProportions.push({
                                ingredientId: ingredient.id,
                                ingredientName: ingredient.name,
                                norma: second
                            });
                            this.$_id(ALTERNATIVE_PROPORTIONS).querySelector(LIST_COMPONENT).items = this.alternativeProportions;
                        }
                    })

                },
                getSuggestionsPromise: this._retrieveIngredientsByKeyword,
                renderSuggestionCallback: suggestion => suggestion.name,
                placeholders: {first: firstPlaceholder, second: secondPlaceholder}
            }

            this.$_id(ALTERNATIVE_PROPORTIONS).querySelector(LIST_COMPONENT).props = {
                items: this.alternativeProportions,
                renderItem: (item) => `${item.ingredientName} - ${item.norma || ''}`,
                removeItemCallback: prop => {
                    this.alternativeProportions = this.alternativeProportions.filter(p => p.ingredientId !== prop.ingredientId);
                    this.$_id(ALTERNATIVE_PROPORTIONS).querySelector(LIST_COMPONENT).items = this.alternativeProportions;
                }
            }

            const refsPlaceholder = await mTranslations.getTranslation('create-recipe.add_ref');

            this.$_id(ALTERNATIVE_REFS).querySelector(TWO_FIELD_LIST_COMPONENT).props = {
                addItemCallback: ({first, second}) => {
                    this._retrieveRecipesByKeyword(first).then(refs => {
                        // find with exact name matching
                        const ref = refs.find(r => r.name === first);
                        if (ref) {
                            this.alternativeRefs.push({
                                recipeId: ref.id,
                                recipeName: ref.name,
                                norma: second
                            });
                            this.$_id(ALTERNATIVE_REFS).querySelector(LIST_COMPONENT).items = this.alternativeRefs;
                        }
                    })

                },
                getSuggestionsPromise: this._retrieveRecipesByKeyword,
                renderSuggestionCallback: suggestion => suggestion.name,
                placeholders: {first: refsPlaceholder, second: secondPlaceholder}
            }

            this.$_id(ALTERNATIVE_REFS).querySelector(LIST_COMPONENT).props = {
                items: this.alternativeRefs,
                renderItem: (item) => `${item.recipeName} - ${item.norma || ''}`,
                removeItemCallback: prop => {
                    this.alternativeRefs = this.alternativeRefs.filter(p => p.recipeId !== prop.recipeId);
                    this.$_id(ALTERNATIVE_REFS).querySelector(LIST_COMPONENT).items = this.alternativeRefs;
                }
            }
        }
    }

    _saveProportion() {
        this.$proportion.norma = this.$_id(NORMA).value;
        this.$proportion.optional = !this.$(CHECKBOX_COMPONENT).value;
        mNewRecipe.proportion = this.$proportion;
        mNewRecipe.setAlternativeProportions(this.$proportion, this.alternativeProportions);
        mNewRecipe.setAlternativeRefs(this.$proportion, this.alternativeRefs);
        mModal.close();
        this.$saveCallback && this.$saveCallback();
    }

    constructor() {
        super(template, true);
        this.alternativeProportions = [];
        this.alternativeRefs = [];

        this._retrieveIngredientsByKeyword = this._retrieveIngredientsByKeyword.bind(this);
        this._retrieveRecipesByKeyword = this._retrieveRecipesByKeyword.bind(this);
        this._render = this._render.bind(this);
        this._saveProportion = this._saveProportion.bind(this);

        mTranslations.addSubscriber(this._render);

        this.$(BUTTON_COMPONENT).onClick = this._saveProportion;
    }

    disconnectedCallback() {
        mTranslations.removeSubscriber(this._render);
    }
}

customElements.define('recipe-proportion-edit', RecipeProportionEdit);
