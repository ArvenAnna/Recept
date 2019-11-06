import WebElement from '../abstract/web-element';
import {PAGE_COUNT_SHOW_BUTTONS} from "../../constants/limits";

const CONTAINER = 'page_list';
const PAGE_TEMPLATE = 'page_template';
const PAGE = 'page';
// const RECIPE_NAME = 'recipe_name';
// const RECIPE_PHOTO = 'recipe_photo';

const template = `
  <style>
    #${CONTAINER} {
       display: flex;
       padding: 1rem;
       justify-content: center;
    }
    
    .${PAGE} {
        display: flex;
        cursor: pointer;
        align-items: center;
        background-color: var(--page-list-background);
        padding: 0.2rem;
        border: var(--page-list-border);
        border-radius: var(--theme-border-radius);
        margin-left: 0.5rem;
    }
    
    .active {
        background-color: var(--page-list-background-active);
    }
 
  </style>
  
  <template id='${PAGE_TEMPLATE}'>
     <div class='${PAGE}'></div>
  </template>
  
  <div id='${CONTAINER}'></div>
`;

class PageList extends WebElement {

    set props({pages, onClickCallback}) {
        this.$pages = pages;
        this.$currentPage = pages.currentPage;
        this.$onClickCallback = onClickCallback;
        this._renderPage();
    }

    set currentPage(currentPage) {
        this.$currentPage = currentPage;
        this._renderPage();
    }

    constructor() {
        super(template, true);

        this._renderPage = this._renderPage.bind(this);
    }

    _renderPage() {
        this.$_id(CONTAINER).innerHTML = ''; // clear all content

        if (this.$pages.count) {

            Array.from(Array(this.$pages.count).keys()).forEach((page, i) => {

                if (i + PAGE_COUNT_SHOW_BUTTONS + 1 < this.$pages.currentPage || i > this.$pages.currentPage + PAGE_COUNT_SHOW_BUTTONS + 1) {
                    return;
                }

                const template = this.getTemplateById(PAGE_TEMPLATE);

                if (i + PAGE_COUNT_SHOW_BUTTONS + 1 === this.$pages.currentPage) {
                    template.byClass(PAGE).textContent = '<';
                    template.byClass(PAGE).addEventListener('click', () => {
                        this.$onClickCallback(0);
                    });
                }
                else if (i === this.$pages.currentPage + PAGE_COUNT_SHOW_BUTTONS + 1) {
                    template.byClass(PAGE).textContent = '>';
                    template.byClass(PAGE).addEventListener('click', () => {
                        this.$onClickCallback(this.$pages.count - 1);
                    });
                }
                else {
                    template.byClass(PAGE).textContent = i + 1;
                    template.byClass(PAGE).addEventListener('click', () => {
                        this.$onClickCallback(i);
                    });
                }

                if (i === this.$pages.currentPage) {
                    template.byClass(PAGE).classList.add('active');
                }

                this.$_id(CONTAINER).appendChild(template);

            });

        }
    }

}

customElements.define('page-list', PageList);
