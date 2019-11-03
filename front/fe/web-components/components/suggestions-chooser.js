import WebElement from '../abstract/web-element';
import {isDescendantOf} from '../../utils/domUtils';
import './drop-down/toggable-drop-down-list';
import '../styled/input-text-with-icon';
import {addIcon} from '../../constants/themes';

const CONTAINER = 'container';

const TOGGABLE_LIST_COMPONENT = 'toggable-drop-down-list';
const INPUT_COMPONENT = 'input-text-with-icon';

const template = `
  <style>
   
    #${CONTAINER} {
        display: flex;
        position: relative;
        flex-direction: column;
    }
    
  </style>
  
  <div id="${CONTAINER}">
    <${INPUT_COMPONENT}></${INPUT_COMPONENT}>
    <${TOGGABLE_LIST_COMPONENT}></${TOGGABLE_LIST_COMPONENT}>
  </div>
  
`;

class SuggestionsChooser extends WebElement {

    set placeholder(placeholder) {
        this.$(INPUT_COMPONENT).placeholder = placeholder;
    }

    set props({getSuggestionsPromise, renderSuggestionCallback, placeholder, addItemCallback}) {

        // required props: renderSuggestionCallback

        this.$getSuggestions = getSuggestionsPromise;
        this.$renderSuggestion = renderSuggestionCallback;

        if (this.$getSuggestions) {
            if (!this.$renderSuggestion) {
                throw new Error("suggestion-input component:  if you want to use suggestions pass please renderSuggestionCallback");
            }
        }

        if (placeholder) {
            this.$(INPUT_COMPONENT).placeholder = placeholder;
        }
        this.$(INPUT_COMPONENT).iconClick = addItemCallback;
    }

    constructor() {
        super(template, true);

        this._renderSuggestions = this._renderSuggestions.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onSuggestionSelect = this._onSuggestionSelect.bind(this);

        this._clickOutside = this._clickOutside.bind(this);

        document.addEventListener('click', this._clickOutside);

        this.$(INPUT_COMPONENT).callbacks = {
            input: this._onChange,
            focus: this._onFocus
        };

        this.$(INPUT_COMPONENT).src = addIcon;
    }

    disconnectedCallback() {
        document.removeEventListener('click', this._clickOutside);
    }

    async _renderSuggestions() {
        if (this.$getSuggestions && this.$renderSuggestion) {
            const value = this.$(INPUT_COMPONENT).value;
            this.$suggestions = value
                ? await this.$getSuggestions(value)
                : [];

            if (this.$suggestions && this.$suggestions.length) {
                this.$(TOGGABLE_LIST_COMPONENT).props = {
                    chooseItemCallback: this._onSuggestionSelect,
                    items: this.$suggestions,
                    renderItem: this.$renderSuggestion,
                }
                this.$(TOGGABLE_LIST_COMPONENT).openDropdown();
            } else {
                this.$(TOGGABLE_LIST_COMPONENT).closeDropdown();
            }
        }
    }

    _onChange() {
        if (this.$getSuggestions && this.$renderSuggestion) {
            this._renderSuggestions();
        }
    }

    _onFocus() {
        if (this.$suggestions && this.$suggestions.length && this.$(INPUT_COMPONENT).value) {
            this.$(TOGGABLE_LIST_COMPONENT).openDropdown();
        }
    }

    _clickOutside(e) {
        if (!isDescendantOf(e.composedPath()[0], this.$(INPUT_COMPONENT).innerRef)) {
            this.$(TOGGABLE_LIST_COMPONENT).closeDropdown();
        }
    }

    _onSuggestionSelect(suggestion) {
        this.$(INPUT_COMPONENT).value = suggestion.name;
    }

}

customElements.define('suggestions-chooser', SuggestionsChooser);
