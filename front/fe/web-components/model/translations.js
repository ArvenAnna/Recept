import Model from '../abstract/model';
import mNotification from "./notification";
import routes from "../../constants/Routes";
import {getResponse} from "../utils/httpUtils";
import {SEVERITY_TYPES} from "../common-notification";

export const SUPPORTED_LANGUAGES = {
    RU: 'ru',
    EN: 'en'
}

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.EN;
;
class Translations extends Model {

    set lang(lang) {
        const language = Object.values(SUPPORTED_LANGUAGES).find(supportedLang => supportedLang === lang);
        if (!language) {
            console.warn(`Language ${lang} is not supported, fallback to default ${DEFAULT_LANGUAGE}`);
        }
        this.$lang = language || DEFAULT_LANGUAGE;
        this.$bundles = {};
        this.notifySubscribers();
    }

    async getTranslation(key) {
        const bundle = key.split('.')[0];
        const transKey = key.split('.')[1];
        if (!this.$bundles[`${bundle}`]) {
            await this._getBundle(bundle);
        }
        return this.$bundles[`${bundle}`][`${transKey}`];
    }

    // async wrap(key, fn) {
    //     this.addSubscriber(this._callWrappedFunction.bind(null, key, fn))
    //     // const trans = await this.getTranslation(key);
    //     // fn(trans);
    // }
    //
    // async _callWrappedFunction(key, fn) {
    //     const trans = await this.getTranslation(key);
    //     fn(trans);
    // }

    constructor() {
        super();

        this.$lang = DEFAULT_LANGUAGE;
        this.$bundles = {};
        this.$bundlePromises = {}

        this._getBundle = this._getBundle.bind(this);
        this.getTranslation = this.getTranslation.bind(this);
        // this.wrap = this.wrap.bind(this);
        // this._callWrappedFunction = this._callWrappedFunction.bind(this);
    }

    async _getBundle(bundle) {
        if (this.$bundlePromises[`${bundle}`]) {
            return await this.$bundlePromises[`${bundle}`];
        }
        this.$bundlePromises[`${bundle}`] = fetch(routes.GET_TRANSLATION(this.$lang, bundle))
            .then(getResponse)
            .then(resp => {
                this.$bundles[`${bundle}`] = resp;
                this.$bundlePromises[`${bundle}`] = null;
            })
            .catch(e => {
                mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
                this.$bundlePromises[`${bundle}`] = null;
            });
        return await this.$bundlePromises[`${bundle}`];
    }

}

export default new Translations();
