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

    get severity() {
        return this.$severity;
    }

    showMessage(newMessage, newSeverity) {
        this.$message = newMessage;
        this.$severity = newSeverity;
        if (this.$message) {
            this.notifySubscribers();
        }
    }


    constructor() {
        super();

        this.$message = null;
        this.$severity = null;

        this.showMessage = this.showMessage.bind(this);
    }
}

export default new Notification();
