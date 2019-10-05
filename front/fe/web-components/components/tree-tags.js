import WebElement from '../abstract/web-element';
import './clickable-tag';

const CONTAINER = 'tag_container';
const CHILD_TEMPLATE = 'child-template';
const TAG_TEMPLATE = 'tag-template';

const COMPONENT = 'tree-tags';
const TAG_COMPONENT = 'clickable-tag';

const template = `
  <style>
    #${CONTAINER} {
       display: flex;
       align-items: flex-start;
       flex-direction: column;
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
                tagTemplate.byTag(TAG_COMPONENT).style.marginLeft = `${this.$level * MARGIN_SIZE}rem`;
                tagTemplate.byTag(TAG_COMPONENT).onConstruct = comp => {
                    comp.props = {
                        clickItemCallback: this.$onClick.bind(null, item)
                    }
                }
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
