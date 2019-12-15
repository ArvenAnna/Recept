import WebElement from '../../../abstract/web-element';

import '../../../components/two-fields-add-item-with-checkbox';
import '../../../components/lists/tags-list';
import './recipe-refs-edit';

import {retrieveRecipesByKeyword} from '../../../utils/asyncRequests';
import mModal from '../../../model/modal';
import {t} from '../../../utils/translateUtils';
import mTranslations from '../../../model/translations';

const CONTAINER = 'container';
const CAPTION = 'caption';
const INPUT_CONTAINER = 'input-container';
const LIST_CONTAINER = 'list-container';

const EDIT_REFS_TEMPLATE = 'edit-refs-template';

const TWO_FIELD_LIST_COMPONENT = 'two-fields-add-item-with-checkbox';
const LIST_COMPONENT = 'tags-list';

const EDIT_REFS_COMPONENT = 'recipe-refs-edit';

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
  
  <template id='${EDIT_REFS_TEMPLATE}'>
    <${EDIT_REFS_COMPONENT}></${EDIT_REFS_COMPONENT}>
  </template>
  
  <div id='${CONTAINER}'>
     <div id='${INPUT_CONTAINER}'>
       <div id='${CAPTION}'>${t('create-recipe.add_references')}</div>
       <${TWO_FIELD_LIST_COMPONENT}></${TWO_FIELD_LIST_COMPONENT}>
     </div>
     <div id='${LIST_CONTAINER}'><${LIST_COMPONENT} list-title='${t('create-recipe.refs_list')}'></${LIST_COMPONENT}></div>
  </div>
  
`;

class RecipeReferences extends WebElement {

    set recipe(newRecipe) {
        this.$recipe = newRecipe;
        this._render();
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
        const firstPlaceholder = await mTranslations.getTranslation('create-recipe.add_ref');
        const secondPlaceholder = await mTranslations.getTranslation('create-recipe.add_norma');

        this.$(TWO_FIELD_LIST_COMPONENT).props = {
            getSuggestionsPromise: this._retrieveRecipesByKeyword,
            renderSuggestionCallback: suggestion => suggestion.name,
            addItemCallback: ({first, second, optional}) => {
                this._retrieveRecipesByKeyword(first).then(recipes => {
                    // find with exact name matching
                    const recipe = recipes.find(r => r.name === first);
                    if (recipe) {
                        const ref = {
                            recipeId: recipe.id,
                            recipeName: recipe.name,
                            norma: second,
                            optional
                        }
                        this.$recipe.ref = ref;
                        this.$(LIST_COMPONENT).items = this.$recipe.refs;
                    }
                })
            },
            placeholders: {first: firstPlaceholder, second: secondPlaceholder},
            defaultChecked: true,
            tooltipContent: t('create-recipe.is_mandatory')
        }

        this.$(LIST_COMPONENT).props = {
            items: this.$recipe.refs,
            renderItem: (item) => `${item.recipeName} - ${item.norma || ''}`,
            removeItemCallback: ref => {
                this.$recipe.removeRef(ref);
                this.$(LIST_COMPONENT).items = this.$recipe.refs;
            },
            editItemCallback: ref => {
                const editTemplate = this.getTemplateById(EDIT_REFS_TEMPLATE);
                editTemplate.byTag(EDIT_REFS_COMPONENT).onConstruct = comp => {
                    comp.props = {
                        ref,
                        recipe: this.$recipe,
                        saveCallback: () => {
                            this.$(LIST_COMPONENT).items = this.$recipe.refs;
                        }
                    }
                }
                mModal.open(editTemplate);
            },
            renderTooltip: prop => {
                let tooltipContent = '';
                if (prop.optional) {
                    tooltipContent = `${tooltipContent}${t('create-recipe.optional_proportion')}`;
                }
                return tooltipContent;
            }
        }
    }

    constructor() {
        super(template, true);

        this._retrieveRecipesByKeyword = this._retrieveRecipesByKeyword.bind(this);
        this._render = this._render.bind(this);

        mTranslations.addSubscriber(this._render);
    }

    disconnectedCallback() {
        mTranslations.removeSubscriber(this._render);
    }
}

customElements.define('recipe-references', RecipeReferences);
