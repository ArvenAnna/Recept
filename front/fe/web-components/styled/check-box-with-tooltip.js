import WebElement from '../abstract/web-element';
import './check-box';
import '../components/tool-tip';

const CONTAINER = 'check-box-container';
const TOOLTIP_CONTENT = 'tooltip-content';

const CHECKBOX_COMPONENT = 'check-box';
const TOOLTIP_COMPONENT = 'tool-tip';

const template = `
  <style>
    #${CONTAINER} {
       height: 100%;
       display: flex;
       align-items: stretch;
    }
    
    ${TOOLTIP_COMPONENT} {
        display: flex;
        align-items: stretch;
    }
  </style>
  
  <div id='${CONTAINER}'>
    <${TOOLTIP_COMPONENT}>
        <${CHECKBOX_COMPONENT} slot='component'></${CHECKBOX_COMPONENT}>
        <div id='${TOOLTIP_CONTENT}' slot='tooltip-content'></div>
    </${TOOLTIP_COMPONENT}>
  </div>
  
`;

class CheckBoxWithTooltip extends WebElement {

    set content(content) {
        this.$_id(TOOLTIP_CONTENT).innerHTML = content;
    }

    set value(v) {
        this.$(CHECKBOX_COMPONENT).value = v
    }

    get value() {
        return this.$(CHECKBOX_COMPONENT).value;
    }

    constructor() {
        super(template, true);
    }
}
customElements.define('check-box-with-tooltip', CheckBoxWithTooltip);
