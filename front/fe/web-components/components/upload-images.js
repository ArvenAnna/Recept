import WebElement from '../abstract/web-element';
import './upload-image';

const CONTAINER = 'container';
const UPLOAD_IMAGE = 'upload-image';
const UPLOAD_IMG_TEMPLATE = 'upload-img-template';

const template = `
  <style>
    
    #${CONTAINER} {
        display: flex;
        flex-direction: column;
    }
    
    .add_item_icon {
        width: 1rem;
        height: 1rem;
        cursor: pointer;
    }
    
    .remove_item_icon {
        width: 1rem;
        height: 1rem;
        cursor: pointer;
        display: none;
    }
    
    .upload_image_container {
        display: flex;
    }
    
    .readonly-image {
      display: none;
      width: 50px;
      height: 50px;
    }
   
  </style>
  
  <template id="${UPLOAD_IMG_TEMPLATE}">
    <div class="upload_image_container">
        <upload-image class="${UPLOAD_IMAGE}"></upload-image>
        <img src="" class="readonly-image"/>
        <textarea class="description"></textarea>
        <div class="description-readonly"></div>
        <img src="svg/add.svg" class="add_item_icon"/>
        <img src="svg/cross.svg" class="remove_item_icon"/>
    </div>
  </template>
  
  <div id="${CONTAINER}">
   
  </div>
  
`;

class UploadImages extends WebElement {

    set props({uploadFileCallback, uploadUrl, removeFileCallback, defaultFilesList }) {

        this.$uploadFileCallback = uploadFileCallback;
        this.$removeFileCallback = removeFileCallback;
        this.$uploadUrl = uploadUrl;
        this.$defaultFilesList = defaultFilesList;

        this.$(`#${CONTAINER}`).innerHTML = '';
        this.$files = [];

        this._renderDefaultFiles();
        this._render();
    }

    constructor() {
        super(template, true);

        this._addFileWithDescription = this._addFileWithDescription.bind(this);
        this._onRemove = this._onRemove.bind(this);

        this._renderDefaultFiles = this._renderDefaultFiles.bind(this);
    }

    _renderDefaultFiles() {
        let id = 1;
        if (this.$defaultFilesList && this.$defaultFilesList.length) {
            this.$defaultFilesList.forEach(defaultFile => {
                const template = this.getTemplateById(UPLOAD_IMG_TEMPLATE);

                this.$files.push({id, file: defaultFile.url, description: defaultFile.description});
                template.querySelector('.readonly-image').style.display = 'block';
                template.querySelector('.readonly-image').setAttribute('src', defaultFile.url);
                template.querySelector('upload-image').style.display = 'none';
                template.querySelector('.description-readonly').style.display = 'block';
                template.querySelector('.description-readonly').innerText = defaultFile.description;
                template.querySelector('.description').style.display = 'none';

                template.querySelector('.add_item_icon').style.display = 'none';
                template.querySelector('.remove_item_icon').style.display = 'block';


                // template.querySelector('.add_item_icon').addEventListener('click', this._addFileWithDescription.bind(this, id));
                template.querySelector('.upload_image_container').setAttribute('id', 'cont' + id);
                template.querySelector('.remove_item_icon').addEventListener('click', this._onRemove.bind(this, id));

                this.$(`#${CONTAINER}`).appendChild(template);

                id++;
            });
        }
    }

    _render() {
        const id = this.$files.length ? this.$files[this.$files.length - 1].id + 1 : 1;


        const template = this.getTemplateById(UPLOAD_IMG_TEMPLATE);

        this.$files.push({id, file: null});

        template.querySelector('upload-image').onConstruct = (uploadImage) => {
            uploadImage.props = {
                uploadUrl: this.$uploadUrl,
                uploadFileCallback: (file) => this.$files.find(f => f.id === id).file = file
            }
        }

        template.querySelector('.add_item_icon').addEventListener('click', this._addFileWithDescription.bind(this, id));
        template.querySelector('.upload_image_container').setAttribute('id', 'cont' + id);
        template.querySelector('.remove_item_icon').addEventListener('click', this._onRemove.bind(this, id));

        this.$(`#${CONTAINER}`).appendChild(template);
    }

    _addFileWithDescription(id) {
        if (!this.$files.find(f => f.id === id).file) return;
        const container = this.$(`#${CONTAINER}`).querySelector(`.upload_image_container[id="cont${id}"]`);

        const description = container.querySelector('.description').value;
        const file = this.$files.find(f => f.id === id).file;
        this.$files.find(f => f.id === id).description = description;
        this.$uploadFileCallback({imgPath: file, description});

        container.querySelector('.add_item_icon').style.display = 'none';
        container.querySelector('.remove_item_icon').style.display = 'block';
        container.querySelector('upload-image').notModifiable();

        container.querySelector('.description').remove();
        container.querySelector('.description-readonly').innerText = description;

        this._render();
    }

    _onRemove(id) {
        const fileToRemove = this.$files.find(f => f.id == id);
        this.$files = this.$files.filter(f => f.id !== id);
        const element = this.$(`#${CONTAINER}`).querySelector(`.upload_image_container[id="cont${id}"]`);

        this.$removeFileCallback({imgPath: fileToRemove.file, description: fileToRemove.description});
        element.remove();
    }
}

customElements.define('upload-images', UploadImages);
