import Model from '../abstract/model';

class Notification extends Model {

    set message(newMessage) {
        this.$message = newMessage;
        if (this.$message) {
            this.notifySubscribers();
        }
    }

    get message() {
        return this.$message;
    }

    constructor() {
        super();

        this._message = null;
    }
}

export default new Notification();
