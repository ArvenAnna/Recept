import WebElement from '../abstract/web-element';
import './tag/clickable-tag';
import {arrowDownIcon, arrowUpIcon} from '../../constants/themes';


const CONTAINER = 'tag_container';
const TAG_TEMPLATE = 'tag-template';
const CHILDREN_CONTAINER_TEMPLATE = 'children-container-template';

const COMPONENT = 'tree-tags';
const TAG_COMPONENT = 'clickable-tag';

const TAG_CONTAINER = 'tag-container';
const INNER_TREE_CONTAINER = 'inner-tree-container';
const CHILD_TAG_CONTAINER = 'child_tag_container';
const EXPAND_ICON = 'expand-icon';
const COUNT_CONTAINER = 'count-container';
const ARROW_CONTAINER = 'arrow-container';

const template = `
  <style>
    #${CONTAINER} {
       display: flex;
       align-items: flex-start;
       flex-direction: column;
    }
    
    .${CHILD_TAG_CONTAINER} {
        display: flex;
        flex-direction: column;
    }
    
    .${TAG_CONTAINER} {
        display: flex;
        align-items: center;
        margin: 0.4rem 0;
    }
    
    .${INNER_TREE_CONTAINER} {
        display: none;
        align-items: center;
    }
    
    .${EXPAND_ICON} {
        width: 0.5rem;
        height: 0.5rem;
        margin-right: 0.2rem;
     }
    
    .${ARROW_CONTAINER} {
        display: flex;
        cursor: pointer;
        align-items: center;
        background-color: var(--tree-tags-background);
        padding: 0.2rem;
        border: var(--tree-tags-border);
        border-radius: var(--theme-border-radius);
        margin-left: 0.5rem;
    }
    
    ${TAG_COMPONENT} {
        --tag-font-size: var(--big-font-size);
    }
  </style>

  <template id='${TAG_TEMPLATE}'>
     <div class='${TAG_CONTAINER}'>
         <${TAG_COMPONENT}></${TAG_COMPONENT}>
    </div>
  </template>
  
  <template id='${CHILDREN_CONTAINER_TEMPLATE}'>
     <div class='${CHILD_TAG_CONTAINER}'>
        <div class='${TAG_CONTAINER}'>
            <${TAG_COMPONENT}></${TAG_COMPONENT}>
            <div class='${ARROW_CONTAINER}'>
                <img class='${EXPAND_ICON}' src='${arrowDownIcon}'/>
                <div class='${COUNT_CONTAINER}'></div>
            </div>
        </div>
        <div class='${INNER_TREE_CONTAINER}'><${COMPONENT}></${COMPONENT}></div>
     </div>
  </template>
  
  <div id='${CONTAINER}'></div>
  
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
                    childrenContainerTemplate.byClass(COUNT_CONTAINER).textContent = item[this.$childrenProp].length;
                    childrenContainerTemplate.byClass(INNER_TREE_CONTAINER).style.marginLeft = `${MARGIN_SIZE * this.$level}rem`;
                    childrenContainerTemplate.byClass(TAG_CONTAINER).addEventListener('click', this._triggerExpander);
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
        tmpl.byTag(TAG_COMPONENT).onConstruct = comp => {
            comp.props = {
                clickItemCallback: this.$onClick.bind(null, item)
            }
        }
    }

    _triggerExpander(e) {
        const tagContainer = e.currentTarget;
        const isOpened = tagContainer.parentNode.querySelector(`.${INNER_TREE_CONTAINER}`).style.display === 'flex';
        tagContainer.querySelector(`.${EXPAND_ICON}`).src = isOpened ? arrowDownIcon : arrowUpIcon;
        tagContainer.parentNode.querySelector(`.${INNER_TREE_CONTAINER}`).style.display = isOpened ? 'none' : 'flex';

    }

}
customElements.define('tree-tags', TreeTags);
