import Model from '../abstract/model';
import {goTo} from "../router/utils";

class RecipeSearch extends Model {

    constructor() {
        super();

        this.$ingredients = [];
        this.$refs = [];
        this.$department = null;
        this.$searchString = '';

        this.$searchUrl = '';
    }

    get searchUrl() {
        return this.$searchUrl;
    }

    get searchString() {
        return this.$searchString;
    }

    get department() {
        return this.$department;
    }

    get refs() {
        return [...this.$refs];
    }

    get ingredients() {
        return [...this.$ingredients];
    }

    set search(searchUrl) {
        // for direct opening from url
        const PARAMS = {
            VALUE: 'value',
            REFS: 'refs',
            INGREDIENTS: 'ingredients',
            DEPARTMENT: 'departmentId'
        }
        this.$ingredients = [];
        this.$refs = [];
        this.$department = null;
        this.$searchString = '';

        let search = searchUrl.startsWith('?') ? searchUrl.substr(1) : searchUrl;

        const params = search.split('&');
        params.forEach(param => {
            const paramWithValue = param.split('=');
            const paramName = paramWithValue[0];
            const paramValue = paramWithValue[1];
            switch (paramName) {
                case PARAMS.VALUE:
                    this.$searchString = paramValue;
                    break;
                case PARAMS.REFS:
                    this.$refs.push(parseInt(paramValue));
                    break;
                case PARAMS.INGREDIENTS:
                    this.$ingredients.push(parseInt(paramValue));
                    break;
                case PARAMS.DEPARTMENT:
                    this.$department = parseInt(paramValue);
                    break;
            }
        });
        this.$searchUrl = searchUrl;
    }

    set searchParams(params) {
        let searchUrl = '';
        this.$searchString = params.value;
        this.$department = params.department;
        this.$refs = params.refs || [];
        this.$ingredients = params.ingredients || [];

        if (params.value) {
            searchUrl = `?search=${params.value}`;
        }
        if (params.department) {
            searchUrl = `${searchUrl ? searchUrl + '&' : '?'}departmentId=${params.department}`
        }
        if (params.refs && params.refs.length) {
            params.refs.forEach(ref => {
                searchUrl = `${searchUrl ? searchUrl + '&' : '?'}refs=${ref}`
            });
        }
        if (params.ingredients && params.ingredients.length) {
            params.ingredients.forEach(ing => {
                searchUrl = `${searchUrl ? searchUrl + '&' : '?'}ingredients=${ing}`
            });
        }
        this.$searchUrl = searchUrl;
        goTo(`/recipes${searchUrl}`);
        this.notifySubscribers();
    }
}

export default new RecipeSearch();
