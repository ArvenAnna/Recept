import WebElement from '../abstract/web-element';

const CONTAINER = 'container';
const FILE_INPUT = 'file-input';
const FILE_NAME = 'file-name';


const template = `
  <style>
    
    #${CONTAINER} {
        margin: 0.5rem;
        padding: 0.5rem;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 0px 3px 3px #0f6b38
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
    
    .search_icon {
        width: 1rem;
        height: 1rem;
        cursor: pointer;
    }
    
  </style>
  
  <div id="${CONTAINER}">
    <img src="svg/search-in-folder.svg" class="search_icon"/>
    <input type='file' id='${FILE_INPUT}'/>
    <div id="${FILE_NAME}"></div>
  </div>
  
`;

class FileInput extends WebElement {

    set props({chooseFileCallback, }) {

        this.$chooseFileCallback = chooseFileCallback;
    }

    constructor() {
        super(template, true);

        this.$fileName = "New photo";
        this.reader = new FileReader();

        this.cleanFile = this.cleanFile.bind(this);
        this._onChange = this._onChange.bind(this);
        this._createFileUrl = this._createFileUrl.bind(this);

        this.$(`#${FILE_INPUT}`).addEventListener('change', this._onChange);
        this.$(`#${FILE_NAME}`).innerHTML = this.$fileName;
    }

    _createFileUrl(file) {
        this.reader.onload = (e) => {
            if (this.reader){
                this.$fileUrl = e.target.result;
                this.$file = file;
                this.$chooseFileCallback(file, this.$fileUrl);
            }
        }

        this.reader.onerror = () => console.log('File uploading error');
        this.reader.readAsDataURL(file);
    }

    _onChange({target}) {
        this.$fileName = target.files[0].name;
        this.$(`#${FILE_NAME}`).innerHTML = this.$fileName;
        this._createFileUrl(target.files[0]);
    }

    cleanFile() {
        this.$fileName = "New photo";
        this.$(`#${FILE_NAME}`).innerHTML = this.$fileName;
    }

    disconnectedCallback() {
        this.reader = null;
    }
}

customElements.define('file-input', FileInput);
