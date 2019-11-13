import WebElement from './abstract/web-element';
import mNotification from './model/notification';
import {removeIcon} from '../constants/themes';

const CONTAINER = 'container';
const INNER_CONTAINER = 'inner-container';
const CONTENT = 'content-text';
const REMOVE_ICON = 'remove-icon';

const DEFAULT_TIMEOUT = 5000;

const template = `
  <style>
    #${CONTAINER} {
        display: flex;
        position: fixed;
        width: 100%;
        margin-top: 0.5rem;
        transition: opacity 0.5s linear, height 0.5s step-start;
    }
    
    #${INNER_CONTAINER} {
        display: flex;
        align-items: center;
        margin: auto;
        padding: 0.5rem;
    }
    
    .error {
        background-color: var(--notification-error-color);
        border: var(--notification-error-border);
    }
    
    .info {
        background-color: var(--notification-info-color);
        border: var(--notification-info-border);
    }
    
    .success {
        background-color: var(--notification-success-color);
        border: var(--notification-success-border);
    }
    
    #${REMOVE_ICON} {
        width: 1rem;
        height: 1rem;
        cursor: pointer;
        margin-left: 0.5rem;
    }
    
    .hidden {
        opacity: 0;
        height: 0;
        overflow: hidden;
        transition-timing-function: linear, step-end;
    }
   
  </style>
  
  <div id='${CONTAINER}' class='hidden'>
    <div id='${INNER_CONTAINER}'>
        <div id='${CONTENT}'></div>
        <img src="${removeIcon}" id="${REMOVE_ICON}"/>
    </div>     
  </div>
`;

export const SEVERITY_TYPES = {
    ERROR: 'error',
    INFO: 'info',
    SUCCESS: 'success'
}

const DEFAULT_SEVERITY = SEVERITY_TYPES.INFO;

class CommonNotification extends WebElement {

    constructor() {
        super(template, true);
        this.$timeout = DEFAULT_TIMEOUT;

        this._showNotification = this._showNotification.bind(this);
        this._onRemove = this._onRemove.bind(this);

        this.$_id(REMOVE_ICON).addEventListener('click', this._onRemove);

        mNotification.addSubscriber(this._showNotification);

        this.$_id(INNER_CONTAINER).classList.add(DEFAULT_SEVERITY);
    }

    disconnectedCallback() {
        mNotification.removeSubscriber(this._showNotification);
        if (this.$timeoutId) {
            clearTimeout(this.$timeoutId);
        }
    }

    _onRemove() {
        this.$_id(CONTAINER).classList.add('hidden');
        if (this.$timeoutId) {
            clearTimeout(this.$timeoutId);
        }
    }

    _showNotification(notification) {
        if (notification.severity) {
            this.$_id(INNER_CONTAINER).classList.remove(...this.$_id(INNER_CONTAINER).classList);
            this.$_id(INNER_CONTAINER).classList.add(notification.severity);
        }
        if (notification.message) {
            this.$_id(CONTENT).innerHTML = notification.message;
            this.$_id(CONTAINER).classList.remove('hidden');
            this.$timeoutId = setTimeout(() => {
                this.$_id(CONTAINER).classList.add('hidden');
            }, this.$timeout);
        }
    }

}

customElements.define('common-notification', CommonNotification);
