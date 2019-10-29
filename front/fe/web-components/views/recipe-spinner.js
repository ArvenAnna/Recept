import WebElement from '../abstract/web-element';
import mSpinner from '../model/spinner';
import {loader} from '../../constants/themes';
import {t} from "../utils/translateUtils";

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
       
      }
      
  </style>
  
  <div id='${CONTAINER}'>
        <div id='${CONTENT_WRAPPER}'>
            ... ${t('common.processing')} ...
            <img src='${loader}'/>
            ... ${t('common.processing')} ...
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
        this.$_id(CONTAINER).style.display = spinner.loading ? 'flex' : 'none';
    }

    disconnectedCallback() {
        mSpinner.removeSubscriber(this._spin);
    }
}

customElements.define('recipe-spinner', RecipeSpinner);
