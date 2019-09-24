import WebElement from '../../../abstract/web-element';

import '../../../components/suggestions-chooser';
import '../../../components/lists/tags-list';

import {retrieveRecipesByKeyword} from '../../../utils/asyncRequests';

const CONTAINER = 'container';
const CAPTION = 'caption';
const INPUT_CONTAINER = 'input-container';
const LIST_CONTAINER = 'list-container';

const SUGGESTION_INPUT_COMPONENT = 'suggestions-chooser';
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
      }
      
      #${CAPTION} {
         margin-right: 0.5rem;
      }
  </style>
  
  <div id='${CONTAINER}'>
     <div id='${INPUT_CONTAINER}'>
       <div id='${CAPTION}'>Add recipe reference:</div>
       <${SUGGESTION_INPUT_COMPONENT}></${SUGGESTION_INPUT_COMPONENT}>
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
        this.$(SUGGESTION_INPUT_COMPONENT).props = {
            getSuggestionsPromise: this._retrieveRecipesByKeyword,
            renderSuggestionCallback: suggestion => suggestion.name,
            addItemCallback: (item) => {
                this._retrieveRecipesByKeyword(item).then(recipes => {
                    // take only
                    if (recipes[0].name === item) {
                        this.$recipe.ref = recipes[0];
                        this.$(LIST_COMPONENT).items = this.$recipe.refs;
                        this.$(LIST_COMPONENT).title = 'List of recipe references:';
                    }
                })
            },
            placeholder: 'Add new reference'
        }

        this.$(LIST_COMPONENT).props = {
            title: this.$recipe.refs && this.$recipe.refs.length ? 'List of recipe references:' : null,
            items: this.$recipe.refs,
            renderItem: ref => ref.name,
            removeItemCallback: ref => {
                this.$recipe.removeRef(ref);
                this.$(LIST_COMPONENT).items = this.$recipe.refs;
            }
        }
    }

    constructor() {
        super(template, true);

        this._retrieveRecipesByKeyword = this._retrieveRecipesByKeyword.bind(this);
        this._render = this._render.bind(this);
    }
}

customElements.define('recipe-references', RecipeReferences);
