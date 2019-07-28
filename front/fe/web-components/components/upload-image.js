import WebElement from '../abstract/web-element';
import './removable-image';
import './file-input';

const CONTAINER = 'container';


const template = `
  <style>
    
    #${CONTAINER} {
        display: flex;
        flex-direction: column;
    }
    
    #input_wrapper {
        width: 300px;
    }
   
    .add_item_icon {
        width: 1rem;
        height: 1rem;
        cursor: pointer;
    }
    
    #image_wrapper {
        width: 300px;
    }
  </style>
  
  <div id="${CONTAINER}">
    <div id='input_wrapper'><file-input></file-input></div>
    <div>
        <div id='image_wrapper'><removable-image></removable-image></div>
        <div id=''>
            <img src="svg/add.svg" class="add_item_icon"/>
        </div>
    </div>
  </div>
  
`;

class UploadImage extends WebElement {

    set props({uploadFileCallback, uploadUrl, defaultImage }) {

        this.$uploadFileCallback = uploadFileCallback;
        this.$uploadUrl = uploadUrl;
        this.$defaultImage = defaultImage;

        if (this.$defaultImage) {
            this.$(`#${CONTAINER}`).querySelector('#image_wrapper').style.display = 'block';
            this.$(`#${CONTAINER}`).querySelector('#input_wrapper').style.display = 'none';
            this.$('removable-image').setAttribute('src', this.$defaultImage);
        }

        this.$('file-input').props = {
            chooseFileCallback: this._onChoose
        };

        this.$('removable-image').props = {
            removeFileCallback: this._onRemove
        }
    }

    constructor() {
        super(template, true);

        this._onChoose = this._onChoose.bind(this);
        this._onRemove = this._onRemove.bind(this);
        this._uploadFile = this._uploadFile.bind(this);
        this.notModifiable = this.notModifiable.bind(this);

        this.$file = null;

        this.$(`#${CONTAINER}`).querySelector('.add_item_icon').style.display = 'none';
        this.$(`#${CONTAINER}`).querySelector('#image_wrapper').style.display = 'none';


        this.$(`#${CONTAINER}`).querySelector('.add_item_icon').addEventListener('click', this._uploadFile);

    }

    async _uploadFile() {
        if (this.$file === null) return;

        let fd = new FormData();
        fd.append('file', this.$file);

        const path = await fetch(this.$uploadUrl, {method: 'POST',
            body: fd}).then(res => res.json()).then(json => json.path);

        this.$uploadFileCallback(path);
        this.$file = null;
        this.$(`#${CONTAINER}`).querySelector('.add_item_icon').style.display = 'none';
        this.$(`#${CONTAINER}`).querySelector('#input_wrapper').style.display = 'none';
    }

    _onRemove(url) {
        this.$file = null;
        this.$uploadFileCallback(null);
        this.$('file-input').cleanFile();
        this.$(`#${CONTAINER}`).querySelector('.add_item_icon').style.display = 'none';
        this.$(`#${CONTAINER}`).querySelector('#image_wrapper').style.display = 'none';
        this.$(`#${CONTAINER}`).querySelector('#input_wrapper').style.display = 'block';
    }

    _onChoose(file, url) {
        this.$('removable-image').setAttribute('src', url);
        this.$file = file;
        this.$(`#${CONTAINER}`).querySelector('.add_item_icon').style.display = 'block';
        this.$(`#${CONTAINER}`).querySelector('#image_wrapper').style.display = 'block';
        this.$(`#${CONTAINER}`).querySelector('#input_wrapper').style.display = 'block';
    }

    notModifiable() {
        this.$('removable-image').removeCross();
    }

}

customElements.define('upload-image', UploadImage);
