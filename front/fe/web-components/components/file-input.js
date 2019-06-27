import WebElement from '../abstract/web-element';
import Alert from "react-s-alert";

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

    set props({chooseFileCallback}) {

        this.$chooseFileCallback = chooseFileCallback;
    }

    constructor() {
        super(template, true);

        this.$fileName = "Главное фото";
        this.reader = new FileReader();

        // this._render = this._render.bind(this);
        this.cleanFile = this.cleanFile.bind(this);
        this._onChange = this._onChange.bind(this);

        this.$(`#${FILE_INPUT}`).addEventListener('change', this._onChange);
        this.$(`#${FILE_NAME}`).innerHTML = this.$fileName;
        //this.$(`#${CONTAINER}`).querySelector('.add_item_icon').addEventListener('click', this._addItem);
    }

    // _render() {
    //     this.$(`#${FILE_NAME}`).innerHTML = this.$fileName;
    // }

    getFileUrl = (file) => {
        this.reader.onload = (e) => {
            if (this.reader){
                this.$fileUrl = e.target.result;
                this.$file = file;
                // this.setState({fileUrl: e.target.result, file});
            }
        }

        this.reader.onerror = () => console.log('Ошибка загрузки файла');
        this.reader.readAsDataURL(file);
    }

    _onChange({target}) {
        this.$fileName = target.files[0].name;
        this.$(`#${FILE_NAME}`).innerHTML = this.$fileName;
        this.$chooseFileCallback(target.files[0]);
    }

    cleanFile() {
        this.$fileName = "Файл не выбран";
        this.$(`#${FILE_NAME}`).innerHTML = this.$fileName;
    }
}

customElements.define('file-input', FileInput);
