import WebElement from '../abstract/web-element';
import mSpinner from '../model/spinner';
import {loader} from '../../constants/themes';

const CONTAINER = 'container';
const CONTENT_WRAPPER = 'content-wrapper';

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
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: var(--header-font-size);
          color: var(--light-background);
      }
      
      img {
            /*width: 100%;*/
          /*height: 100%;*/
          /*object-fit: contain;*/
      }
      
  </style>
  
  <div id='${CONTAINER}'>
        <div id='${CONTENT_WRAPPER}'>
            ... обработка ...
            <img src='${loader}'/>
            ... обработка ...
        </div>
  </div>
  
`;

class RecipeSpinner extends WebElement {

    constructor() {
        super(template, true);

        this._spin = this._spin.bind(this);

        mSpinner.addSubscriber(this._spin);
    }

    _spin(spinner) {
        if (spinner.loading) {
            // this.$_id(CONTENT_WRAPPER).innerHTML = '';
            // this.$_id(CONTENT_WRAPPER).appendChild(modal.template);
            this.$_id(CONTAINER).style.display = 'flex';
        } else {
            // this.$_id(CONTENT_WRAPPER).innerHTML = '';
            this.$_id(CONTAINER).style.display = 'none';
        }
    }

    disconnectedCallback() {
        mSpinner.removeSubscriber(this._spin);
    }
}

customElements.define('recipe-spinner', RecipeSpinner);
