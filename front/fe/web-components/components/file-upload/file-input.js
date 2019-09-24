import WebElement from '../../abstract/web-element';
import {searchIcon} from '../../../constants/themes';

const CONTAINER = 'container';
const FILE_INPUT = 'file-input';
const FILE_NAME = 'file-name';
const SEARCH_ICON = 'search-icon';

const INITIAL_TEXT = 'upload photo';

const template = `
  <style>
    
    #${CONTAINER} {
        position: relative;
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        padding: 0.2rem 1rem;
    }
    
    #${FILE_INPUT} {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        width: 0;
        height: 0;
        visibility: hidden;
    }
    
    #${SEARCH_ICON} {
        width: 1rem;
        height: 1rem;
        cursor: pointer;
        margin-right: 0.1rem;
    }
    
  </style>
  
  <label id="${CONTAINER}">
    <img src="${searchIcon}" id="${SEARCH_ICON}"/>
    <input type='file' id='${FILE_INPUT}'/>
    <div id="${FILE_NAME}"></div>
  </label>
`;

class FileInput extends WebElement {

    set props({chooseFileCallback, isAutoUpload}) {

        this.$chooseFileCallback = chooseFileCallback;
        this.$isAutoUpload = isAutoUpload;
    }

    constructor() {
        super(template, true);

        this.$fileName = INITIAL_TEXT;
        this.reader = new FileReader();

        this.cleanFile = this.cleanFile.bind(this);
        this._onChange = this._onChange.bind(this);
        this._createFileUrl = this._createFileUrl.bind(this);

        this.$_id(FILE_INPUT).addEventListener('change', this._onChange);
        this.$_id(FILE_NAME).innerHTML = this.$fileName;
    }

    _createFileUrl(file) {
        this.$_id(FILE_NAME).innerHTML = "loading ...";
        this.reader.onload = (e) => {
            if (this.reader){
                this.$fileUrl = e.target.result;
                this.$chooseFileCallback(file, this.$fileUrl);
                this.$_id(FILE_NAME).innerHTML = this.$fileName;
            }
        }

        this.reader.onerror = () => {
            this.$_id(FILE_NAME).innerHTML = "error, try again ...";
            console.log('File uploading error'); //TODO handle error
        }
        this.reader.readAsDataURL(file);
    }

    _onChange({target}) {
        this.$fileName = target.files[0].name;
        if (this.$isAutoUpload) {
            this.$_id(FILE_NAME).innerHTML = this.$fileName;
            this.$chooseFileCallback(target.files[0]);
        } else {
            this._createFileUrl(target.files[0]);
        }
    }

    cleanFile() {
        this.$fileName = INITIAL_TEXT;
        this.$_id(FILE_NAME).innerHTML = this.$fileName;
    }

    disconnectedCallback() {
        this.reader = null;
    }
}

customElements.define('file-input', FileInput);
