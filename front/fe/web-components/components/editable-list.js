import WebElement from '../abstract/web-element';
import './add-item';
import './list-items';

const CONTAINER = 'container';

const template = `
  <style>
    
  </style>
  
  <div id="${CONTAINER}">
    <recipe-list-items></recipe-list-items>
    <recipe-add-item></recipe-add-item>
  </div>
  
`;

class EditableList extends WebElement {

    set props({addItemCallback, getSuggestionsPromise,
                  renderSuggestionCallback, items, renderItem,
                  removeItemCallback, title, placeholder}) {

        if (title) {
            this.$('recipe-list-items').setAttribute('title', title);
        }


        this.$('recipe-list-items').props = {
            items, renderItem,
            removeItemCallback
        }

        this.$('recipe-add-item').props = {
            getSuggestionsPromise, renderSuggestionCallback,
            addItemCallback, placeholder
        }
    }

    set items(items) {
        this.$('recipe-list-items').items = items;
    }

    constructor() {
        super(template, true);
    }
}

customElements.define('editable-list', EditableList);
