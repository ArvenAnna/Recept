import Model from '../abstract/model';

class RouterContext extends Model {

    constructor() {
        super();

        this._context = null;
    }

    get url() {
        return this._context.url;
    }

    get params() {
        return this._context.pathVariables;
    }

    get component() {
        return this._context.component;
    }

    get search() {
        return this._context.search;
    }

    set context(newContext) {
        //if newContext is the same is previous don't do anything
        if (!this._context || newContext.url !== this._context.url) {
            this._context = newContext;
            this.notifySubscribers();
        }
    }
}

export default new RouterContext();