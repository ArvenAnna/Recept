import WebElement from '../abstract/web-element';

const CONTAINER = 'tag_container';
const CHILD_TEMPLATE = 'child-template';

const COMPONENT = 'tree-tags';

const template = `
  <style>
    #${CONTAINER} {
       display: flex;
       align-items:center;
       margin: 0.5rem 1rem 0.5rem 0;
       font-style: italic;
       background-color: var(--tag-background, white);
       color: var(--tag-font-color, black);
       border-radius: var(--theme-border-radius);
       padding: 0.2rem 0.3rem;
       box-shadow: var(--tag-shadow);
       font-size: var(--tag-font-size);
    }
    
    #${REMOVE_ITEM} {
        display: none;
        width: 1rem;
        height: 1rem;
        cursor: pointer;
        margin-left: 0.5rem;
    }
  
  </style>
  
  <template id='${CHILD_TEMPLATE}'>
     <${COMPONENT}></${COMPONENT}>
  </template>
  
  <div id='${CONTAINER}'>
    
  </div>
  
`;

class TreeTags extends WebElement {

    set props({items, onClick, renderItem, childrenProp}) {
        this.$items = items;
        this.$onClick = onClick;
        this.$renderItem = renderItem;
        this.$childrenProp = childrenProp;
    }

    constructor() {
        super(template, true);

        this._render = this._render.bind(this);

    }

    _render() {

    }

}
customElements.define('tree-tags', TreeTags);
