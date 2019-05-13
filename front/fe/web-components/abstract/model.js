export default class Model {

    // #recipe = null;
    // #subscribers = [];

    constructor() {
        this._subscribers = [];

        this.addSubscriber = this.addSubscriber.bind(this);
        this.removeSubscriber = this.removeSubscriber.bind(this);
        this.notifySubscribers = this.notifySubscribers.bind(this);
    }

    addSubscriber (subscriber) {
        if (this._subscribers.indexOf(subscriber) === -1) {
            this._subscribers.push(subscriber);
        }
    }

    removeSubscriber (subscriber) {
        if (this._subscribers.indexOf(subscriber) !== -1) {
            this._subscribers.splice(this._subscribers.indexOf(subscriber), 1);
        }
    }

    notifySubscribers() {
        this._subscribers.forEach(sub => sub(this));
    }
}