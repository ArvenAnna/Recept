import WebElement from '../abstract/web-element';

const CONTAINER = 'container';
const FILE_INPUT = 'file-input';
const FILE_NAME = 'file-name';
const SEARCH_ICON = 'search-icon';

const ICON_SRC = 'svg/search-in-folder.svg';

const template = `
  <style>
    
    #${CONTAINER} {
        position: relative;
        display: inline-flex;
        align-items: center;
        cursor: pointer;
    }
    
    #${FILE_INPUT} {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
        width: 100%;
        height: 100%;
    }
    
    #${SEARCH_ICON} {
        width: 1rem;
        height: 1rem;
        cursor: pointer;
    }
    
  </style>
  
  <div id="${CONTAINER}">
    <img src="${ICON_SRC}" id="${SEARCH_ICON}"/>
    <input type='file' id='${FILE_INPUT}'/>
    <div id="${FILE_NAME}"></div>
  </div>
  
`;

class FileInput extends WebElement {

    set props({chooseFileCallback, isAutoUpload}) {

        this.$chooseFileCallback = chooseFileCallback;
        this.$isAutoUpload = isAutoUpload;
    }

    constructor() {
        super(template, true);

        this.$fileName = "New photo";
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
        this.$fileName = "Upload photo";
        this.$_id(FILE_NAME).innerHTML = this.$fileName;
    }

    disconnectedCallback() {
        this.reader = null;
    }
}

customElements.define('file-input', FileInput);
