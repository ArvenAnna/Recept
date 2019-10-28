import Model from '../abstract/model';
import mNotification from "./notification";
import routes from "../../constants/Routes";
import {getResponse} from "../utils/httpUtils";

export const SUPPORTED_LANGUAGES = {
    RU: 'ru',
    EN: 'en'
}

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.RU;
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

    constructor() {
        super();

        this.$lang = DEFAULT_LANGUAGE;
        this.$bundles = {};

        this._getBundle = this._getBundle.bind(this);
        this.getTranslation = this.getTranslation.bind(this);
    }

    async _getBundle(bundle) {
        return fetch(routes.GET_TRANSLATION(this.$lang, bundle))
            .then(getResponse)
            .then(resp => {
                this.$bundles[`${bundle}`] = resp;
            })
            .catch(e => {
                mNotification.message = e.message;
            });
    }

}

export default new Translations();
