import WebElement from './abstract/web-element';
import './styled/input-text';
import './components/expandable-block';
import './components/suggestions-chooser';
import './components/lists/tags-list';
import './components/drop-down/drop-down';
import {retrieveIngredientsByKeyword, retrieveRecipesByKeyword} from './utils/asyncRequests';
import mDepartments from './model/departments';
import {goTo} from './router/utils';

const CONTAINER = 'search-container';

const INGREDIENT_CHOOSER = 'ingredient-chooser';
const REF_CHOOSER = 'ref-chooser';
const INGREDIENT_LIST = 'ingredient-list';
const REF_LIST = 'ref-list';
const ADDITIONAL_SEARCH_PARAMS = 'additional-search-params';

const INPUT_COMPONENT = 'input-text';
const EXPANDABLE_COMPONENT = 'expandable-block';
const SUGGESTIONS_COMPONENT = 'suggestions-chooser';
const LIST_COMPONENT = 'tags-list';
const DROP_DOWN_COMPONENT = 'drop-down';

const template = `
    <style>
        #${CONTAINER} {
            margin-left: 1rem;
            margin-top: 1rem;
            background-color: var(--background, green);
            padding: 0.5rem;
        }

        #${ADDITIONAL_SEARCH_PARAMS} {
            display: flex;
            flex-direction: column;
        }
        
        ${DROP_DOWN_COMPONENT}, ${LIST_COMPONENT} {
            margin-bottom: 1rem;
        }
    </style>

    <div id="${CONTAINER}">
        <${INPUT_COMPONENT} placeholder='search'></${INPUT_COMPONENT}>
        <${EXPANDABLE_COMPONENT} caption='Additional search params'>
            <div id='${ADDITIONAL_SEARCH_PARAMS}' slot='content'>
                <${DROP_DOWN_COMPONENT} ></${DROP_DOWN_COMPONENT}>
            
                <${SUGGESTIONS_COMPONENT} id='${INGREDIENT_CHOOSER}' placeholder='add ingredient'></${SUGGESTIONS_COMPONENT}>
                <${LIST_COMPONENT} id='${INGREDIENT_LIST}'></${LIST_COMPONENT}>

                <${SUGGESTIONS_COMPONENT} id='${REF_CHOOSER}' placeholder='add reference'></${SUGGESTIONS_COMPONENT}>
                <${LIST_COMPONENT} id='${REF_LIST}'></${LIST_COMPONENT}>
            </div>
        </${EXPANDABLE_COMPONENT}>
    </div>
`;

class RecipeSearch extends WebElement {
    constructor() {
        super(template, true);

        this.$chosenIngredients = [];
        this.$chosenRefs = [];
        this.$chosenDepartment = null;

        this._render = this._render.bind(this);
        this._onKeyPress = this._onKeyPress.bind(this);
        this._departmentsChanged = this._departmentsChanged.bind(this);

        mDepartments.addSubscriber(this._departmentsChanged);
        mDepartments.retrieve();

        this.$(INPUT_COMPONENT).addEventListener('keydown', this._onKeyPress);

        this._render();
    }

    _departmentsChanged() {
        this._render();
    }

    _render() {
        this.$(DROP_DOWN_COMPONENT).props = {
            chooseItemCallback: item => {
                this.$chosenDepartment = item;
                },
            items: [{id: null, name: 'All'}, ...mDepartments.departments],
            renderItem: item => item.name
        }
        this.$_id(INGREDIENT_CHOOSER).props = {
            getSuggestionsPromise: retrieveIngredientsByKeyword,
            renderSuggestionCallback: suggestion => suggestion.name,
            addItemCallback: (item) => {
                retrieveIngredientsByKeyword(item).then(ings => {
                    // take only first
                    if (ings[0].name === item) {
                        this.$chosenIngredients.push(ings[0]);
                        this.$_id(INGREDIENT_LIST).items = this.$chosenIngredients;
                    }
                })
            },
            placeholder: 'add ingredient'
        }
        this.$_id(INGREDIENT_LIST).props = {
            renderItem: item => item.name,
            removeItemCallback: item => {
                this.$chosenIngredients = this.$chosenIngredients.filter(ing => ing.id !== item.id);
            },
            items: this.$chosenIngredients
        }
        this.$_id(REF_CHOOSER).props = {
            getSuggestionsPromise: retrieveRecipesByKeyword,
            renderSuggestionCallback: suggestion => suggestion.name,
            addItemCallback: (item) => {
                retrieveRecipesByKeyword(item).then(recipes => {
                    // take only first
                    if (recipes[0].name === item) {
                        this.$chosenRefs.push(recipes[0]);
                        this.$_id(REF_LIST).items = this.$chosenRefs;
                    }
                })
            },
            placeholder: 'add reference'
        }
        this.$_id(REF_LIST).props = {
            renderItem: item => item.name,
            removeItemCallback: item => {
                this.$chosenRefs = this.$chosenRefs.filter(ref => ref.id !== item.id);
            },
            items: this.$chosenRefs
        }
    }

    _onKeyPress(e) {
        const key = e.key;

        if (key == 'Enter') {
            let searchUrl = '';
            if (this.$(INPUT_COMPONENT).value) {
                searchUrl = `?search=${this.$(INPUT_COMPONENT).value.trim()}`;
            }
            if (this.$chosenDepartment && this.$chosenDepartment.id) {
                searchUrl = `${searchUrl ? searchUrl + '&' : '?'}departmentId=${this.$chosenDepartment.id}`
            }
            if (this.$chosenRefs && this.$chosenRefs.length) {
                this.$chosenRefs.forEach(ref => {
                    searchUrl = `${searchUrl ? searchUrl + '&' : '?'}refs=${ref.id}`
                });
            }
            if (this.$chosenIngredients && this.$chosenIngredients.length) {
                this.$chosenIngredients.forEach(ing => {
                    searchUrl = `${searchUrl ? searchUrl + '&' : '?'}ingredients=${ing.id}`
                });
            }
            goTo(`/recipes${searchUrl}`);
        }
    }

    disconnectedCallback() {
        mDepartments.removeSubscriber(this._departmentsChanged);
    }
}

customElements.define('recipe-search', RecipeSearch);
