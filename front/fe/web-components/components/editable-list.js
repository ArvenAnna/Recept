import WebElement from '../abstract/web-element';
import './add-item';
import './list-items';

const CONTAINER = 'container';

const template = `
  <style>
    
  </style>
  
  <div id="${CONTAINER}">
    <list-items></list-items>
    <add-item></add-item>
  </div>
  
`;

class EditableList extends WebElement {

    set props({addItemCallback, getSuggestionsPromise,
                  renderSuggestionCallback, items, renderItem,
                  removeItemCallback, title, placeholder}) {

        if (title) {
            this.$('list-items').setAttribute('title', title);
        }


        this.$('list-items').props = {
            items, renderItem,
            removeItemCallback
        }

        this.$('add-item').props = {
            getSuggestionsPromise, renderSuggestionCallback,
            addItemCallback, placeholder
        }
    }

    set items(items) {
        this.$('list-items').items = items;
    }

    constructor() {
        super(template, true);
    }
}

customElements.define('editable-list', EditableList);
