import WebElement from '../abstract/web-element';
import {isDescendantOf} from "../../utils/domUtils";
import './dropdown-list';

const CONTAINER = 'container';
const SUGGESTION_CONTAINER = 'dropdown';
const INPUT = 'input';

const template = `
  <style>
    
    #${CONTAINER} {
        display: flex;
        position: relative;
    }
    
    #${SUGGESTION_CONTAINER} {
        /*display: none;*/
        position: absolute;
        top: 100%;
        border: 1px solid black;
        cursor: pointer;
        background-color: blue;
    }
    
  </style>
  
  <div id="${CONTAINER}">
    <input type="text" id="${INPUT}"/>
    <div id="${SUGGESTION_CONTAINER}"><drop-down-list></drop-down-list></div>
  </div>
  
`;


class SuggestionsInput extends WebElement {

    // set suggestions(newSuggestions) {
    //     this.$suggestions = newSuggestions || [];
    //     this._renderSuggestions();
    // }

    set props({getSuggestionsPromise, renderSuggestionCallback}) {

        // required props: renderSuggestionCallback

        this.$getSuggestions = getSuggestionsPromise;
        this.$renderSuggestion = renderSuggestionCallback;

        if (this.$getSuggestions) {
            if (!this.$renderSuggestion) {
                throw new Error("suggestion-input component:  if you want to use suggestions pass please renderSuggestionCallback");
            }
        }
    }

    constructor() {
        super(template, true);

        this._renderSuggestions = this._renderSuggestions.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onSuggestionSelect = this._onSuggestionSelect.bind(this);

        this._clickOutside = this._clickOutside.bind(this);

        document.addEventListener('click', this._clickOutside);

        // this.$(`#${CONTAINER}`).querySelector('.add_item_icon').addEventListener('click', this._addItem);
        this.$(`#${INPUT}`).addEventListener('input', this._onChange);
        this.$(`#${INPUT}`).addEventListener('focus', this._onFocus);
    }

    async _renderSuggestions() {
        if (this.$getSuggestions && this.$renderSuggestion) {
            this.$suggestions = this.$(`#${INPUT}`).value
                ? await this.$getSuggestions(this.$(`#${INPUT}`).value)
                : [];

            this.$('drop-down-list').props = {
                chooseItemCallback: this._onSuggestionSelect,

                //reset of props every time do the better way
                items: this.$suggestions,
                renderItem: this.$renderSuggestion,
            }
            this.$('drop-down-list').openDropdown();
        }
    }

    _onChange() {
        if (this.$getSuggestions && this.$renderSuggestion) {
            this._renderSuggestions();
        }
    }

    _onFocus() {
        if (this.$suggestions && this.$(`#${INPUT}`).value) {
            this.$('drop-down-list').openDropdown();
        }
    }

    get currentValue() {
        return this.$('input').value;
    }

    clearInput() {
        this.$('input').value = '';
    }

    disconnectedCallback() {
        document.removeEventListener('click', this._clickOutside);
    }

    _clickOutside(e) {
        if (!isDescendantOf(e.composedPath()[0], this.$(`#${INPUT}`))) {
            this.$('drop-down-list').closeDropdown();
        }
    }

    _onSuggestionSelect(suggestion) {
        this.$(`#${INPUT}`).value = suggestion.name;
    }

}

customElements.define('suggestions-input', SuggestionsInput);
