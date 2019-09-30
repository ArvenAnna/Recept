import Model from '../abstract/model';

class Modal extends Model {

    get template() {
        return this.$template;
    }

    constructor() {
        super();
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.$template = null;
    }

    open(html) {
        this.$template = html;
        this.notifySubscribers();
    }

    close() {
        this.$template = null;
        this.notifySubscribers();
    }
}

export default new Modal();
