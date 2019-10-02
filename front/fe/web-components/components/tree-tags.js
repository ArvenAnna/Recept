import WebElement from '../abstract/web-element';
import './removable-tag';

const CONTAINER = 'tag_container';
const CHILD_TEMPLATE = 'child-template';
const TAG_TEMPLATE = 'tag-template';

const COMPONENT = 'tree-tags';
const TAG_COMPONENT = 'removable-tag';

const template = `
  <style>
    #${CONTAINER} {
       display: flex;
       align-items: flex-start;
       flex-direction: column;
       /*margin: 0.5rem 1rem 0.5rem 0;*/
       /*font-style: italic;*/
       /*background-color: var(--tag-background, white);*/
       /*color: var(--tag-font-color, black);*/
       /*border-radius: var(--theme-border-radius);*/
       /*padding: 0.2rem 0.3rem;*/
       /*box-shadow: var(--tag-shadow);*/
       /*font-size: var(--tag-font-size);*/
    }
  
  </style>
  
  <template id='${CHILD_TEMPLATE}'>
     <${COMPONENT}></${COMPONENT}>
  </template>
  
  <template id='${TAG_TEMPLATE}'>
     <${TAG_COMPONENT}></${TAG_COMPONENT}>
  </template>
  
  <div id='${CONTAINER}'>
     
  </div>
  
`;

const MARGIN_SIZE = 1;

class TreeTags extends WebElement {

    set props({items, onClick, renderItem, childrenProp = 'children', level = 1}) {
        this.$items = items;
        this.$onClick = onClick;
        this.$renderItem = renderItem;
        this.$childrenProp = childrenProp;
        this.$level = level;
        this._render();
    }

    constructor() {
        super(template, true);

        this._render = this._render.bind(this);

    }

    _render() {
        this.$_id(CONTAINER).innerHTML = '';
        if (this.$items) {
            this.$items.forEach(item => {
                const tagTemplate = this.getTemplateById(TAG_TEMPLATE);
                tagTemplate.byTag(TAG_COMPONENT).innerHTML = this.$renderItem(item);
                tagTemplate.byTag(TAG_COMPONENT).style.marginLeft = `${this.$level * MARGIN_SIZE}rem`
                this.$_id(CONTAINER).appendChild(tagTemplate);

                if (item[this.$childrenProp] && item[this.$childrenProp].length) {
                    const nodeTemplate = this.getTemplateById(CHILD_TEMPLATE);
                    nodeTemplate.byTag(COMPONENT).onConstruct = (comp) => {
                        comp.props = {
                            items: item[this.$childrenProp],
                            onClick: this.$onClick,
                            renderItem: this.$renderItem,
                            childrenProp: this.$childrenProp,
                            level: this.$level + 1
                        }
                    };
                    this.$_id(CONTAINER).appendChild(nodeTemplate);
                }

            });
        }

    }

}
customElements.define('tree-tags', TreeTags);
