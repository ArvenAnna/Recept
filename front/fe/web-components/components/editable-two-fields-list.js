import WebElement from '../abstract/web-element';
import './two-fields-add-item';
import './list-items';

const CONTAINER = 'container';

const template = `
  <style>
    
  </style>
  
  <div id="${CONTAINER}">
    <recipe-list-items></recipe-list-items>
    <two-fields-add-item></two-fields-add-item>
  </div>
  
`;

// TODO: parametrize by component two-fields-add-item / one field-add-item
class EditableTwoFieldsList extends WebElement {

    set props({addItemCallback, getSuggestionsPromise,
                  renderSuggestionCallback, items, renderItem,
                  removeItemCallback, title, placeholders}) {

        if (title) {
            this.$('recipe-list-items').setAttribute('title', title);
        }

        this.$('recipe-list-items').props = {
            items, renderItem,
            removeItemCallback
        }

        this.$('two-fields-add-item').props = {
            getSuggestionsPromise, renderSuggestionCallback,
            addItemCallback, placeholders
        }
    }

    set items(items) {
        this.$('recipe-list-items').items = items;
    }

    constructor() {
        super(template, true);
    }
}

customElements.define('editable-two-fields-list', EditableTwoFieldsList);
