import WebElement from '../../abstract/web-element';

const LIST_CONTAINER = 'list-container';
const ITEM_TEMPLATE = 'item_template';

const ITEM = 'item';
const OUTLINED = 'outlined';

const template = `
  <style>
    #${LIST_CONTAINER} {
        position: absolute;
        cursor: pointer;
        z-index: 2;
        padding: 0.2rem;
        min-width: 100%;
        background-color: var(--drop-down-bg);
        box-sizing: border-box;
        border-radius: var(--theme-border-radius);
        box-shadow: var(--drop-down-shadow);
    }
    
    .${ITEM} {
        white-space: nowrap;
        padding: 0 0.1rem;
    }
   
    .${OUTLINED} {
        color: var(--drop-down-outlined-color, red);
        background-color: var(--drop-down-outlined-bg, green);
    }
    
  </style>
  
  <template id="${ITEM_TEMPLATE}">
      <div class="${ITEM}"></div>
  </template>
 
  <div id="${LIST_CONTAINER}"></div>
  
`;

class DropDownList extends WebElement {
    set props({chooseItemCallback, items, renderItem,
                  toggleDropdownCallback, chosenItemIndex}) {
        this.$items = items || [];
        this.$chooseItem = chooseItemCallback;
        this.$renderItem = renderItem;
        this.$chosenItemIndex = chosenItemIndex;

        // required props: items, renderItem

        if (!this.$renderItem) {
            throw new Error("Dropdown-list: renderItem should be defined")
        }
        this._renderItems();
    }

    constructor() {
        super(template, true);

        this._renderItems = this._renderItems.bind(this);

        this._onKeyPress = this._onKeyPress.bind(this);
        this._selectItem = this._selectItem.bind(this);
        this._onClickItem = this._onClickItem.bind(this);
        this._changeOutlinedItem = this._changeOutlinedItem.bind(this);

        document.addEventListener('keydown', this._onKeyPress);

        this.$outlinedItem = null;
    }

    disconnectedCallback() {
        document.removeEventListener('keydown', this._onKeyPress);
    }

    _renderItems() {
        this.$_id(LIST_CONTAINER).innerHTML = "";
        if (this.$items.length && this.$renderItem) {
            const chosenItem = this.$chosenItemIndex
                ? this.$items[this.$chosenItemIndex]
                : this.$items[0];
            this.$items.forEach(item => {
                const template = this.getTemplateById(ITEM_TEMPLATE);
                const itemEl = template.byClass(ITEM);
                if (this.$chooseItem) {
                    itemEl.addEventListener('click', this._onClickItem.bind(null, item));
                }

                itemEl.innerHTML = this.$renderItem(item);

                this.$_id(LIST_CONTAINER).appendChild(template);
            });

            this._changeOutlinedItem(chosenItem);
        }
    }

    _onClickItem(item) {
        this._changeOutlinedItem(item);
        this._selectItem();
    }

    _changeOutlinedItem(item) {
        const outlinedEl = this.$(`.${OUTLINED}`);
        if (outlinedEl) {
            outlinedEl.classList.remove(OUTLINED);
        }
        this.$outlinedItem = item;
        const newOutlinedIndex = this.$items.indexOf(this.$outlinedItem);
        this.$_id(LIST_CONTAINER).querySelectorAll(`.${ITEM}`)[newOutlinedIndex].classList.add(OUTLINED);
    }

    _selectItem() {
        this.$chooseItem(this.$outlinedItem);
    }

    _onKeyPress(e) {
        const { $items } = this;
        if (!$items) {
            return;
        }
        const key = e.key;

        if (key == 'ArrowDown' || key == 'ArrowUp') {

            const currentOutlinedIndex = $items.indexOf(this.$outlinedItem);

            let newOutlinedItem;

            if (key == 'ArrowDown') {
                newOutlinedItem = currentOutlinedIndex === $items.length - 1
                    ? $items[0]
                    : $items[currentOutlinedIndex + 1];
            }
            if (key == 'ArrowUp') {
                newOutlinedItem = currentOutlinedIndex === 0
                    ? $items[$items.length - 1]
                    : $items[currentOutlinedIndex - 1]
            }

            this._changeOutlinedItem(newOutlinedItem);
        }

        if (key == 'Enter' && this.$chooseItem) {
            this._selectItem();
        }
    }
}

customElements.define('drop-down-list', DropDownList);
