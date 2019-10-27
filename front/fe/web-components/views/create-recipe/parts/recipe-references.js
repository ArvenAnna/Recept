import WebElement from '../../../abstract/web-element';

import '../../../components/two-fields-add-item-with-checkbox';
import '../../../components/lists/tags-list';

import {retrieveRecipesByKeyword} from '../../../utils/asyncRequests';
import mModal from '../../../model/modal';

const CONTAINER = 'container';
const CAPTION = 'caption';
const INPUT_CONTAINER = 'input-container';
const LIST_CONTAINER = 'list-container';

const TWO_FIELD_LIST_COMPONENT = 'two-fields-add-item-with-checkbox';
const LIST_COMPONENT = 'tags-list';


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
  
  <div id='${CONTAINER}'>
     <div id='${INPUT_CONTAINER}'>
       <div id='${CAPTION}'>Add recipe reference:</div>
       <${TWO_FIELD_LIST_COMPONENT}></${TWO_FIELD_LIST_COMPONENT}>
     </div>
     <div id='${LIST_CONTAINER}'><${LIST_COMPONENT}></${LIST_COMPONENT}></div>
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

    _render() {
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
            placeholders: {first: 'Add recipe ref', second: 'Add norma'},
            defaultChecked: true,
            tooltipContent: 'Is mandatory?'
        }

        this.$(LIST_COMPONENT).props = {
            title: 'List of recipe references:',
            items: this.$recipe.refs,
            renderItem: (item) => `${item.recipeName} - ${item.norma || ''}`,
            removeItemCallback: ref => {
                this.$recipe.removeRef(ref);
                this.$(LIST_COMPONENT).items = this.$recipe.refs;
            },
            editItemCallback: ref => {
                //todo own component
                // const editTemplate = this.getTemplateById(EDIT_PROPORTION_TEMPLATE);
                // editTemplate.byTag(EDIT_PROPORTION_COMPONENT).onConstruct = comp => {
                //     comp.recipe = this.$recipe;
                //     comp.proportion = prop;
                //     comp.saveCallback = () => {
                //         this.$(LIST_COMPONENT).items = this.$recipe.proportions;
                //     }
                // }
                // mModal.open(editTemplate);
            },
        }
    }

    constructor() {
        super(template, true);

        this._retrieveRecipesByKeyword = this._retrieveRecipesByKeyword.bind(this);
        this._render = this._render.bind(this);
    }
}

customElements.define('recipe-references', RecipeReferences);
