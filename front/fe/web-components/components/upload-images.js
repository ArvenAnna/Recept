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
   
  </style>
  
  <template id="${UPLOAD_IMG_TEMPLATE}">
    <div class="upload_image_container">
        <upload-image class="${UPLOAD_IMAGE}"></upload-image>
        <textarea class="description"></textarea>
        <img src="svg/add.svg" class="add_item_icon"/>
        <img src="svg/cross.svg" class="remove_item_icon"/>
    </div>
  </template>
  
  <div id="${CONTAINER}">
   
  </div>
  
`;

class UploadImages extends WebElement {

    set props({uploadFileCallback, uploadUrl }) {

        this.$uploadFileCallback = uploadFileCallback;
        this.$uploadUrl = uploadUrl;

        this.$(`#${CONTAINER}`).innerHTML = '';
        this.$files = [];

        this._render();
    }

    constructor() {
        super(template, true);



        this._addFileWithDescription = this._addFileWithDescription.bind(this);
        this._onRemove = this._onRemove.bind(this);
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
        const description = this.$(`#${CONTAINER}`).querySelector(`.upload_image_container[id="cont${id}"]`)
            .querySelector('.description').value;
        const file = this.$files.find(f => f.id === id).file;
        this.$uploadFileCallback(file, description);
        this.$(`#${CONTAINER}`).querySelector('.add_item_icon').style.display = 'none';
        this.$(`#${CONTAINER}`).querySelector('.remove_item_icon').style.display = 'block';
        this.$(`#${CONTAINER}`).querySelector(`.upload_image_container[id="cont${id}"]`)
            .querySelector('upload-image').notModifiable();
        // TODO: change textarea to simple text;

        this._render();
    }

    _onRemove(id) {
        this.$files = this.$files.filter(f => f.id !== id);
        const element = this.$(`#${CONTAINER}`).querySelector(`.upload_image_container[id="cont${id}"]`);
        element.remove();
    }
}

customElements.define('upload-images', UploadImages);
