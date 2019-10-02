import WebElement from '../abstract/web-element';
import {arrowRightIcon} from '../../constants/themes';

const CONTAINER = 'container';

const STEP_ICON = 'step-icon';

const STEP_ICON_TEMPLATE = 'step-icon-template';
const SLOT_TEMPLATE = 'slot-template';

const template = `
  <style>
    
    #${CONTAINER} {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    
    .${STEP_ICON} {
        width: 2rem;
        height: 2rem;
        padding: 1rem;
    }
  </style>
  
    <template id="${STEP_ICON_TEMPLATE}">
        <img src="${arrowRightIcon}" class="${STEP_ICON}"/>
    </template>
    <template id="${SLOT_TEMPLATE}">
        <slot></slot>
    </template>
    <div id="${CONTAINER}">
        
    </div>
`;

class StepBlocks extends WebElement {

    set props({blockNames}) {
        // should be array
        this.$blockNames = blockNames;
        if (blockNames && blockNames.length) {
            this.$currentStep = 0;
        }
        this._render();
    }

    constructor() {
        super(template, true);

        this._render = this._render.bind(this);
        this.setNextStep = this.setNextStep.bind(this);
    }

    setNextStep(stepName) {
        const nextStepIndex = this.$blockNames.indexOf(stepName);
        // one way process (steps only discovered, not collapsed
        if (nextStepIndex > this.$currentStep) {
            this.$currentStep = nextStepIndex;
        }
        this._render();
    }

    _render() {
        this.$_id(CONTAINER).innerHTML = '';
        if (this.$blockNames && this.$blockNames.length) {
            this.$blockNames.forEach((block, i) => {
                if (i > this.$currentStep) {
                    return;
                }
                const slotTemplate = this.getTemplateById(SLOT_TEMPLATE);

                const slot = slotTemplate.byTag('slot');
                slot.setAttribute('name', block);

                this.$_id(CONTAINER).appendChild(slotTemplate);

                if (i !== this.$blockNames.length - 1) {
                    const iconTemplate = this.getTemplateById(STEP_ICON_TEMPLATE);
                    this.$_id(CONTAINER).appendChild(iconTemplate);
                }
            });
        }

    }
}

customElements.define('step-blocks', StepBlocks);
