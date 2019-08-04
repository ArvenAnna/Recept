import WebElement from '../abstract/web-element';
import './removable-image';
import './file-input';

const CONTAINER = 'container';
const IMAGE_WRAPPER = 'image_wrapper';
const FILE_WRAPPER = 'file_wrapper';

const template = `
  <style>
    #${CONTAINER} {
        display: flex;
        flex-direction: column;
    }
    
    // #${FILE_WRAPPER} {
    //     width: 300px;
    // }
    
    #${IMAGE_WRAPPER} {
        width: 300px;
    }
    
    
  </style>
  
  <div id="${CONTAINER}">
    <div id='${FILE_WRAPPER}'><file-input></file-input></div>
    <div id='${IMAGE_WRAPPER}'><removable-image></removable-image></div>
  </div>
  
`;

//todo add tooltip with filename to image and remove default from file input

class UploadImage extends WebElement {

    set props({uploadFileCallback, uploadUrl, defaultImage}) {

        this.$uploadFileCallback = uploadFileCallback;
        this.$uploadUrl = uploadUrl;
        this.$defaultImage = defaultImage;

        if (this.$defaultImage) {
            this.$_id(IMAGE_WRAPPER).style.display = 'block';
            this.$_id(FILE_WRAPPER).style.display = 'none';
            this.$('removable-image').setAttribute('src', this.$defaultImage);
        }

        this.$('file-input').props = {
            chooseFileCallback: this._onChoose
        };

        this.$('removable-image').props = {
            removeFileCallback: this._onRemove,
            addFileCallback: this._uploadFile
        }
    }

    constructor() {
        super(template, true);

        this._onChoose = this._onChoose.bind(this);
        this._onRemove = this._onRemove.bind(this);
        this._uploadFile = this._uploadFile.bind(this);
        this.notModifiable = this.notModifiable.bind(this);

        this.$file = null;

        this.$_id(IMAGE_WRAPPER).style.display = 'none';
    }

    async _uploadFile() {
        if (this.$file === null) return;

        let fd = new FormData();
        fd.append('file', this.$file);

        const path = await fetch(this.$uploadUrl, {method: 'POST',
            body: fd}).then(res => res.json()).then(json => json.path);

        this.$uploadFileCallback(path);
        this.$file = null;
    }

    _onRemove(url) {
        this.$file = null;
        this.$uploadFileCallback(null);
        this.$('file-input').cleanFile();
        this.$_id(IMAGE_WRAPPER).style.display = 'none';
        this.$_id(FILE_WRAPPER).style.display = 'block';
    }

    _onChoose(file, url) {
        this.$('removable-image').setAttribute('src', url);
        this.$file = file;
        this.$_id(IMAGE_WRAPPER).style.display = 'block';
        this.$_id(FILE_WRAPPER).style.display = 'none';
    }

    notModifiable() {
        this.$('removable-image').removeControls();
    }

}

customElements.define('upload-image', UploadImage);
