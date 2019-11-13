import Model from '../abstract/model';
import {goTo} from "../router/utils";
import {PAGE_SIZE} from "../../constants/limits";

const DEFAULT_EMPTY_ARRAY = [];
const DEFAULT_SEARCH_STRING = '';
const DEFAULT_PAGE_NUMBER = 0;

class RecipeSearch extends Model {

    constructor() {
        super();

        this.$ingredients = DEFAULT_EMPTY_ARRAY;
        this.$refs = DEFAULT_EMPTY_ARRAY;
        this.$department = null;
        this.$searchString = DEFAULT_SEARCH_STRING;

        this.$searchUrl = DEFAULT_SEARCH_STRING;
        this.$pageSize = PAGE_SIZE;
        this.$pageNumber = DEFAULT_PAGE_NUMBER;

        this._search = this._search.bind(this);
        this.searchByDepartment = this.searchByDepartment.bind(this);
        this._reset = this._reset.bind(this);
        this.reset = this.reset.bind(this);
        this.searchByParams = this.searchByParams.bind(this);
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

    get page() {
        return this.$pageNumber;
    }

    set search(searchUrl) {
        // for direct opening from url
        const PARAMS = {
            VALUE: 'value',
            REFS: 'refs',
            INGREDIENTS: 'ingredients',
            DEPARTMENT: 'departmentId',
            PAGE_SIZE: 'pageSize',
            PAGE_NUMBER: 'pageNumber'
        }
        this.$ingredients = [];
        this.$refs = [];
        this.$department = null;
        this.$searchString = '';
        this.$pageSize = PAGE_SIZE;
        this.$pageNumber = 0;

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
                case PARAMS.PAGE_SIZE:
                    this.$pageSize = parseInt(paramValue);
                    break;
                case PARAMS.PAGE_NUMBER:
                    this.$pageNumber = parseInt(paramValue);
                    break;
            }
        });
        this.$searchUrl = searchUrl;
    }

    set newPage(newPage) {
        this.$pageNumber = newPage;
        this._search();
    }

    searchByParams(params) {
        this.$searchString = params.value || this.$searchString;
        // department should be reset anyway
        this.$department = params.department;
        this.$refs = params.refs || this.$refs;
        this.$ingredients = params.ingredients || this.$ingredients;
        this.$pageSize = params.pageSize || this.$pageSize;
        this.$pageNumber = params.pageNumber || this.$pageNumber;

        this._search();
    }

    searchByDepartment(id) {
        this._reset();
        this.$department = id;

        this._search();
    }

    reset() {
        this._reset();
        this._search();
    }

    _reset() {
        this.$searchString = DEFAULT_SEARCH_STRING;
        this.$department = null;
        this.$refs = DEFAULT_EMPTY_ARRAY;
        this.$ingredients = DEFAULT_EMPTY_ARRAY;
        this.$pageSize = PAGE_SIZE;
        this.$pageNumber = DEFAULT_PAGE_NUMBER;
    }

    _search() {
        // mandatory params:
        let searchUrl = `?page=${this.$pageNumber}&size=${this.$pageSize}`;

        if (this.$searchString) {
            searchUrl = `${searchUrl}&search=${this.$searchString}`;
        }
        if (this.$department) {
            searchUrl = `${searchUrl}&departmentId=${this.$department}`
        }
        if (this.$refs && this.$refs.length) {
            this.$refs.forEach(ref => {
                searchUrl = `${searchUrl}&refs=${ref}`
            });
        }
        if (this.$ingredients && this.$ingredients.length) {
            this.$ingredients.forEach(ing => {
                searchUrl = `${searchUrl}&ingredients=${ing}`
            });
        }

        this.$searchUrl = searchUrl;
        goTo(`/recipes${searchUrl}`);
        this.notifySubscribers();
    }
}

export default new RecipeSearch();
