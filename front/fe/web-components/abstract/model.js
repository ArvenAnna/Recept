export default class Model {

    // #subscribers = [];

    constructor() {
        this._subscribers = [];

        this.bindMethods = this.bindMethods.bind(this);
        this.bindMethods(this.addSubscriber,
            this.removeSubscriber, this.notifySubscribers);
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

    bindMethods(...methods) {
        methods.forEach(method => {
            method = method.bind(this);
        });
    }
}