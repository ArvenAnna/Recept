import WebElement from '../abstract/web-element';
import './clickable-tag';
import './expandable-block';

const CONTAINER = 'tag_container';
const TAG_TEMPLATE = 'tag-template';
const CHILDREN_CONTAINER_TEMPLATE = 'children-container-template';

const COMPONENT = 'tree-tags';
const TAG_COMPONENT = 'clickable-tag';
const EXPANDER_COMPONENT = 'expandable-block';
const ROOT = 'root';
const TAG_CONTAINER = 'tag-container';
const INNER_TREE_CONTAINER = 'inner-tree-container';

const CHILD_TAG_CONTAINER = 'child_tag_container';

const template = `
  <style>
    #${CONTAINER} {
       display: flex;
       align-items: flex-start;
       flex-direction: column;
    }
    
    .${CHILD_TAG_CONTAINER} {
        display: flex;
    }
    
    .${INNER_TREE_CONTAINER} {
        display: flex;
        align-items: center;
    }
  </style>

  <template id='${TAG_TEMPLATE}'>
     <div class='${TAG_CONTAINER}'>
         <${TAG_COMPONENT}></${TAG_COMPONENT}>
    </div>
  </template>
  
  <template id='${CHILDREN_CONTAINER_TEMPLATE}'>
     <div class='${CHILD_TAG_CONTAINER}'>
        <div class='${TAG_CONTAINER}'><${TAG_COMPONENT}></${TAG_COMPONENT}></div>
        <div class='${INNER_TREE_CONTAINER}'><${COMPONENT}></${COMPONENT}></div>
     </div>
  </template>
  
  <div id='${ROOT}'>
    <${EXPANDER_COMPONENT}>
     <div id='${CONTAINER}' slot='content'></div>
    </${EXPANDER_COMPONENT}>
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
        if (level === 1) {
           const html = this.$(EXPANDER_COMPONENT).innerHTML;
           this.$(EXPANDER_COMPONENT).remove();
           this.$_id(ROOT).innerHTML = html;
        } else {
            this.$(EXPANDER_COMPONENT).caption = items.length;
        }
        this._render();
    }

    constructor() {
        super(template, true);

        this._render = this._render.bind(this);
        this._setTagProps = this._setTagProps.bind(this);
    }

    _render() {
        this.$_id(CONTAINER).innerHTML = '';
        if (this.$items) {
            this.$items.forEach(item => {
                const hasChildren = item[this.$childrenProp] && item[this.$childrenProp].length;

                if (!hasChildren) {
                    const tagTemplate = this.getTemplateById(TAG_TEMPLATE);
                    this._setTagProps(tagTemplate, item);
                    this.$_id(CONTAINER).appendChild(tagTemplate);
                } else {
                    const childrenContainerTemplate = this.getTemplateById(CHILDREN_CONTAINER_TEMPLATE);
                    this._setTagProps(childrenContainerTemplate, item);

                    childrenContainerTemplate.byTag(COMPONENT).onConstruct = (comp) => {
                        comp.props = {
                            items: item[this.$childrenProp],
                            onClick: this.$onClick,
                            renderItem: this.$renderItem,
                            childrenProp: this.$childrenProp,
                            level: this.$level + 1
                        }
                    };

                    this.$_id(CONTAINER).appendChild(childrenContainerTemplate);
                }

            });
        }

    }

    _setTagProps(tmpl, item) {
        tmpl.byTag(TAG_COMPONENT).innerHTML = this.$renderItem(item);
        // tmpl.byClass(TAG_CONTAINER).style.marginLeft = `${this.$level * MARGIN_SIZE}rem`;
        tmpl.byTag(TAG_COMPONENT).onConstruct = comp => {
            comp.props = {
                clickItemCallback: this.$onClick.bind(null, item)
            }
        }
    }

}
customElements.define('tree-tags', TreeTags);
