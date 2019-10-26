import WebElement from '../abstract/web-element';
import {removeIcon} from '../../constants/themes';
import mModal from '../model/modal';

const CONTAINER = 'container';
const CONTENT_WRAPPER = 'content-wrapper';

const REMOVE_ICON = 'remove-icon';

const template = `
  <style>
      #${CONTAINER} {
            position: fixed;
            width: 100%;
            left: 0;
            justify-content: center;
            z-index: 50;
            padding: 2rem;
            background-color: rgba(0,0,0,0.7);
            display: none;
            box-sizing: border-box;
            height: 100vh;
      }
      
      #${CONTENT_WRAPPER} {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
      }
      
      #${CONTENT_WRAPPER} > img {
          width: 100%;
          height: 100%;
          object-fit: contain;
      }
      
      #${REMOVE_ICON} {
            width: 2rem;
            height: 2rem;
            cursor: pointer;
            background-color: var(--modal-cross-background);
            position: absolute;
            right: 0;
            margin-right: 2rem;
      }
      
  </style>
  
  <div id='${CONTAINER}'>
        <div id='${CONTENT_WRAPPER}'></div>
        <img src='${removeIcon}' id='${REMOVE_ICON}'/>
  </div>
  
`;

class ModalWindow extends WebElement {

    constructor() {
        super(template, true);

        this._openModalCallback = this._openModalCallback.bind(this);

        this.$_id(REMOVE_ICON).addEventListener('click', mModal.close);
        mModal.addSubscriber(this._openModalCallback);
    }

    _openModalCallback(modal) {
        if (modal.template) {
            this.$_id(CONTENT_WRAPPER).innerHTML = '';
            this.$_id(CONTENT_WRAPPER).appendChild(modal.template);
            this.$_id(CONTAINER).style.display = 'flex';
        } else {
            this.$_id(CONTENT_WRAPPER).innerHTML = '';
            this.$_id(CONTAINER).style.display = 'none';
        }
    }

    disconnectedCallback() {
        mModal.removeSubscriber(this._openModalCallback);
    }
}

customElements.define('modal-window', ModalWindow);
