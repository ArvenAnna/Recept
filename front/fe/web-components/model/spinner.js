import Model from '../abstract/model';

class Spinner extends Model {

    get loading() {
        return this.$loading;
    }

    set loading(loading) {
        this.$loading = loading;
        this.notifySubscribers();
    }

    constructor() {
        super();

        this.$loading = false;
    }
}

export default new Spinner();
