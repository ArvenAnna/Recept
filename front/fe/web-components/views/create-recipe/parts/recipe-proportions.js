import WebElement from '../../../abstract/web-element';

import routes from '../../../../constants/Routes';

import '../../../components/two-fields-add-item';
import '../../../components/list-items';

const CONTAINER = 'container';
const CAPTION = 'caption';
const INPUT_CONTAINER = 'input-container';
const LIST_CONTAINER = 'list-container';

const TWO_FIELD_LIST_COMPONENT = 'two-fields-add-item';
const LIST_COMPONENT = 'list-items';

const template = `
  <style>
      #${CONTAINER} {
         
      }
      
      #${INPUT_CONTAINER} {
         display: flex;
         margin: 1rem;
         align-items: center;
      }
      
      #${LIST_CONTAINER} {
         margin: 1rem;
      }
      
      #${CAPTION} {
         margin-right: 0.5rem;
      }
  </style>
  
  <div id='${CONTAINER}'>
     <div id='${INPUT_CONTAINER}'>
       <div id='${CAPTION}'>Add recipe proportion:</div>
       <${TWO_FIELD_LIST_COMPONENT}></${TWO_FIELD_LIST_COMPONENT}>
     </div>
     <div id='${LIST_CONTAINER}'><${LIST_COMPONENT}></${LIST_COMPONENT}></div>
  </div>
  
`;

class RecipeProportions extends WebElement {

    set recipe(newRecipe) {
        this.$recipe = newRecipe;
        this._render();
    }

    async _retrieveIngredientsByKeyword(keyword) {
        let ingredients = await fetch(routes.GET_INGREDIENTS_BY_KEYWORD, {method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({keyword})}).then(res => res.json());
        const maxSuggestionsNumber = 10;
        // exclude also already checked
        ingredients = ingredients.filter(ing => !this.$recipe.proportions || !this.$recipe.proportions.some(p => p.ingredientId === ing.id));
        ingredients.slice(0, maxSuggestionsNumber);
        return ingredients;
    }

    _render() {
        this.$(TWO_FIELD_LIST_COMPONENT).props = {
            addItemCallback: ({first, second}) => {
                this._retrieveIngredientsByKeyword(first).then(ingredients => {
                    // should be one ingredient only
                    if (ingredients.length === 1 && ingredients[0].name === first) {
                        this.$recipe.proportion = {
                            ingredient: ingredients[0],
                            norma: second
                        };
                        this.$(LIST_COMPONENT).items = this.$recipe.proportions;
                        this.$(LIST_COMPONENT).title = 'List of recipe proportions:';
                    }
                })

            },
            getSuggestionsPromise: this._retrieveIngredientsByKeyword,
            renderSuggestionCallback: suggestion => suggestion.name,
            placeholders: {first: 'Add ingredient', second: 'Add norma'}
        }

        this.$(LIST_COMPONENT).props = {
            title: this.$recipe.proportions && this.$recipe.proportions.length ? 'List of recipe proportions:' : null,
            items: this.$recipe.proportions,
            renderItem: (item) => `
                <span>${item.ingredientName}</span>
                <span>&nbsp;-&nbsp;</span>
                <span>${item.norma || ''}</span>
            `,
            removeItemCallback: prop => {
                this.$recipe.removeProportion(prop);
                this.$(LIST_COMPONENT).items = this.$recipe.proportions;
            },
        }
    }

    constructor() {
        super(template, true);

        this._retrieveIngredientsByKeyword = this._retrieveIngredientsByKeyword.bind(this);
        this._render = this._render.bind(this);
    }
}

customElements.define('recipe-proportions', RecipeProportions);
