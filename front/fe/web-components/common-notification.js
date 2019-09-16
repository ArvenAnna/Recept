import WebElement from './abstract/web-element';
import mNotification from './model/notification';

const CONTAINER = 'container';
const INNER_CONTAINER = 'inner-container';
const ERROR_TEXT = 'error-text';
const REMOVE_ICON = 'remove-icon';

const ICON_REMOVE_SRC = 'svg/cross.svg';

const DEFAULT_TIMEOUT = 3000;

const template = `
  <style>
    #${CONTAINER} {
        display: none;
        position: fixed;
        width: 100%;
        margin-top: 0.5rem;
    }
    
    #${INNER_CONTAINER} {
        display: flex;
        align-items: center;
        margin: auto;
        padding: 0.5rem;
        background-color: var(--notification-error-color);
        border: var(--notification-error-border);
    }
    
    #${REMOVE_ICON} {
        width: 1rem;
        height: 1rem;
        cursor: pointer;
        margin-left: 0.5rem;
    }
   
  </style>
  
  <div id='${CONTAINER}'>
    <div id='${INNER_CONTAINER}'>
        <div id='${ERROR_TEXT}'></div>
        <img src="${ICON_REMOVE_SRC}" id="${REMOVE_ICON}"/>
    </div>     
  </div>
`;

class CommonNotification extends WebElement {

    // set timeout(newTimeout) {
    //     this.$timeout = newTimeout;
    // }

    constructor() {
        super(template, true);
        this.$timeout = DEFAULT_TIMEOUT;

        this._showNotification = this._showNotification.bind(this);
        this._onRemove = this._onRemove.bind(this);

        this.$_id(REMOVE_ICON).addEventListener('click', this._onRemove);

        mNotification.addSubscriber(this._showNotification);
    }

    disconnectedCallback() {
        mNotification.removeSubscriber(this._showNotification);
        if (this.$timeoutId) {
            clearTimeout(this.$timeoutId);
        }
    }

    _onRemove() {
        this.hide_id(CONTAINER);
        if (this.$timeoutId) {
            clearTimeout(this.$timeoutId);
        }
    }

    _showNotification(notification) {
        if (notification.message) {
            this.$_id(ERROR_TEXT).textContent = notification.message;
            this.reveal_id(CONTAINER);

            this.$timeoutId = setTimeout(this.$timeout, () => {
                this.hide_id(CONTAINER);
            });
        }
    }

}

customElements.define('common-notification', CommonNotification);
