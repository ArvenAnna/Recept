import WebElement from '../abstract/web-element';
import {isDescendantOf} from "../../utils/domUtils";
import './dropdown-list';
import '../styled/input-text';
import {textInputAttributes} from '../styled/input-text';

const CONTAINER = 'container';
const DROP_DOWN_TEMPLATE = 'drop-down-template';

const template = `
  <style>
    
    #${CONTAINER} {
        display: flex;
        position: relative;
        flex-direction: column;
    }
    
  </style>
  
  <template id="${DROP_DOWN_TEMPLATE}">
    <drop-down-list></drop-down-list> 
  </template>
  
  <div id="${CONTAINER}">
    <input-text></input-text>
  </div>
  
`;


class SuggestionsInput extends WebElement {

    set props({getSuggestionsPromise, renderSuggestionCallback, placeholder}) {

        // required props: renderSuggestionCallback

        this.$getSuggestions = getSuggestionsPromise;
        this.$renderSuggestion = renderSuggestionCallback;

        if (this.$getSuggestions) {
            if (!this.$renderSuggestion) {
                throw new Error("suggestion-input component:  if you want to use suggestions pass please renderSuggestionCallback");
            }
        }

        this.$('input-text').setAttribute(textInputAttributes.PLACEHOLDER, placeholder);
    }

    get currentValue() {
        return this.$('input-text').getAttribute(textInputAttributes.VALUE);
    }

    constructor() {
        super(template, true);

        this._renderSuggestions = this._renderSuggestions.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onSuggestionSelect = this._onSuggestionSelect.bind(this);

        this._clickOutside = this._clickOutside.bind(this);

        this._openDropdown = this._openDropdown.bind(this);
        this._closeDropdown = this._closeDropdown.bind(this);


        document.addEventListener('click', this._clickOutside);

        this.$('input-text').callbacks = {
            input: this._onChange,
            focus: this._onFocus
        };
    }

    disconnectedCallback() {
        document.removeEventListener('click', this._clickOutside);
    }

    clearInput() {
        this.$('input-text').setAttribute(textInputAttributes.VALUE, '');
    }

    async _renderSuggestions() {
        if (this.$getSuggestions && this.$renderSuggestion) {
            const value = this.$('input-text').getAttribute(textInputAttributes.VALUE);
            this.$suggestions = value
                ? await this.$getSuggestions(value)
                : [];

            if (this.$suggestions && this.$suggestions.length) {
                this._openDropdown();

                this.$('drop-down-list').props = {
                    chooseItemCallback: this._onSuggestionSelect,
                    items: this.$suggestions,
                    renderItem: this.$renderSuggestion,
                }
            } else {
                this._closeDropdown();
            }
        }
    }

    _onChange() {
        if (this.$getSuggestions && this.$renderSuggestion) {
            this._renderSuggestions();
        }
    }

    _onFocus() {
        if (this.$suggestions && this.$suggestions.length
            && this.$('input-text').getAttribute(textInputAttributes.VALUE)) {
            this._openDropdown();

            this.$('drop-down-list').props = {
                chooseItemCallback: this._onSuggestionSelect,
                items: this.$suggestions,
                renderItem: this.$renderSuggestion,
            }
        }
    }

    _openDropdown() {
        const dropdown = this.$('drop-down-list');
        if (!dropdown) {
            const template = this.getTemplateById(DROP_DOWN_TEMPLATE);
            // template.querySelector('drop-down-list').style.display = 'none';
            this.$_id(CONTAINER).appendChild(template);
        }
    }

    _closeDropdown() {
        const dropdown = this.$('drop-down-list');
        if (dropdown) {
            dropdown.remove();
        }
    }

    _clickOutside(e) {
        if (!isDescendantOf(e.composedPath()[0], this.$('input-text').getInnerRef())) {
            this._closeDropdown();
        }
    }

    _onSuggestionSelect(suggestion) {
        this.$('input-text').setAttribute(textInputAttributes.VALUE, suggestion.name);
    }

}

customElements.define('suggestions-input', SuggestionsInput);
