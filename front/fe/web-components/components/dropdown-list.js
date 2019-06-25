import WebElement from '../abstract/web-element';

const LIST_CONTAINER = 'list-container';
const ITEM_TEMPLATE = 'item_template';

const template = `
  <style>
    #${LIST_CONTAINER} {
        display: none;
        position: absolute;
        border: 1px solid black;
        cursor: pointer;
    }
    
    
    .outlined {
        color: red;
    }
    
  </style>
  
  <template id="${ITEM_TEMPLATE}">
      <div class="item"></div>
  </template>
 
  <div id="${LIST_CONTAINER}"></div>
  
`;


class DropDownList extends WebElement {
    set props({chooseItemCallback, items, renderItem, toggleDropdownCallback}) {
        this.$items = items || [];
        this.$chooseItem = chooseItemCallback;
        this.$renderItem = renderItem;
        this.$toggleDropdown = toggleDropdownCallback;

        // required props: items, renderItem

        if (this.$items.length && this.$renderItem) {
            // always render first item as chosen
            this._renderItems();
        }
    }

    constructor() {
        super(template, true);

        this.closeDropdown = this.closeDropdown.bind(this);
        this.openDropdown = this.openDropdown.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);

        this._renderItems = this._renderItems.bind(this);
        this._toggleDropdownInner = this._toggleDropdownInner.bind(this);

        this._onKeyPress = this._onKeyPress.bind(this);
        this._selectItem = this._selectItem.bind(this);
        this._onClickItem = this._onClickItem.bind(this);
        this._changeOutlinedItem = this._changeOutlinedItem.bind(this);

        document.addEventListener('keydown', this._onKeyPress);

        this.$outlinedItem = null;
    }

    _renderItems() {
        this.$(`#${LIST_CONTAINER}`).innerHTML = "";
        if (this.$items.length && this.$renderItem) {

            this.$items.forEach(item => {
                const template = this.getTemplateById(ITEM_TEMPLATE);
                const itemEl = template.querySelector('.item');
                if (this.$chooseItem) {
                    itemEl.addEventListener('click', this._onClickItem.bind(null, item));
                }

                itemEl.innerHTML = this.$renderItem(item);

                this.$(`#${LIST_CONTAINER}`).appendChild(template);
            });

            this._changeOutlinedItem(this.$items[0]);
        }
    }

    _onClickItem(item) {
        this._changeOutlinedItem(item);
        this._selectItem();
    }

    _changeOutlinedItem(item) {
        const outlinedEl = this.$(`#${LIST_CONTAINER}`).querySelector('.outlined');
        if (outlinedEl) {
            outlinedEl.classList.remove('outlined');
        }
        this.$outlinedItem = item;
        const newOutlinedIndex = this.$items.indexOf(this.$outlinedItem);
        this.$(`#${LIST_CONTAINER}`).querySelectorAll('.item')[newOutlinedIndex].classList.add('outlined');
    }

    _selectItem() {
        this.closeDropdown();
        this.$chooseItem(this.$outlinedItem);
    }

    openDropdown() {
        this._toggleDropdownInner(true);
    }

    closeDropdown() {
        this._toggleDropdownInner(false);
    }

    toggleDropdown() {
        const isClosed = this.$(`#${LIST_CONTAINER}`).style.display !== 'block';
        this._toggleDropdownInner(isClosed);
    }

    _toggleDropdownInner(toOpen) {
        this.$(`#${LIST_CONTAINER}`).style.display = toOpen ? 'block' : 'none';
        if (this.$toggleDropdown) {
            this.$toggleDropdown(toOpen);
        }
    }


    disconnectedCallback() {
        document.removeEventListener('keydown', this._onKeyPress);
    }

    _onKeyPress(e) {
        const key = e.key;

        if (key == 'ArrowDown' || key == 'ArrowUp') {
            const { $items } = this;
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
