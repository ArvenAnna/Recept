import WebElement from '../../abstract/web-element';
import './file-input';

const FILE_INPUT_COMPONENT = 'file-input';

const template = `
  <${FILE_INPUT_COMPONENT}></${FILE_INPUT_COMPONENT}>
`;

class FileInputAutoUpload extends WebElement {

    set props({uploadFileCallback, uploadUrl }) {

        this.$uploadFileCallback = uploadFileCallback;
        this.$uploadUrl = uploadUrl;

        this.$(FILE_INPUT_COMPONENT).props = {
            chooseFileCallback: this._uploadFile,
            isAutoUpload: true
        };
    }

    constructor() {
        super(template, true);

        this._uploadFile = this._uploadFile.bind(this);
        this.cleanFile = this.cleanFile.bind(this);
    }

    async _uploadFile(file) {
        if (file === null) return;

        let fd = new FormData();
        fd.append('file', file);

        const path = await fetch(this.$uploadUrl, {method: 'POST',
            body: fd}).then(res => res.json()).then(json => json.path);

        this.$uploadFileCallback(path);
	this.cleanFile();
    }

    cleanFile() {
        this.$(FILE_INPUT_COMPONENT).cleanFile();
    }
}

customElements.define('file-input-autoupload', FileInputAutoUpload);
