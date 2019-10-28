import {Recipe} from './recipe';
import routes from '../../constants/Routes';
import {doJsonRequest} from '../utils/httpUtils';
import {INTERNAL_ID_KEY} from '../../constants/common';

class NewRecipe extends Recipe {

    static _getByInternalId(array, objToFind) {
        return array.find(item => item[`${INTERNAL_ID_KEY}`] === objToFind[`${INTERNAL_ID_KEY}`]);
    }

    static _getNextInternalId(array) {
        const internalKeys = array.map(item => item[`${INTERNAL_ID_KEY}`]);
        return internalKeys.length ? Math.max(...internalKeys) + 1 : 0;
    }

    static _getWithoutByInternalId(array, objToFind) {
        return array.filter(item => item[`${INTERNAL_ID_KEY}`] !== objToFind[`${INTERNAL_ID_KEY}`]);
    }

    constructor() {
        super();

        this._calculateDetailOrder = this._calculateDetailOrder.bind(this);
        this.reorderDetails = this.reorderDetails.bind(this);
        this.setAlternativeProportions = this.setAlternativeProportions.bind(this);
    }

    get name() {
        return super.name;
    }

    set name(newName) {
        this._recipe.name = newName;
    }

    set text(newDescription) {
        this._recipe.text = newDescription;
    }

    get text() {
        return super.text;
    }

    set imgPath(path) {
        this._recipe.imgPath = path;
    }

    get imgPath() {
        return super.imgPath;
    }

    set department(department) {
        if (!this._recipe.department) {
            this._recipe.department = {};
        }
        this._recipe.department.id = department.id;
        this._recipe.department.name = department.name;
    }

    get department() {
        return this._recipe.department ? {...this._recipe.department} : undefined;
    }

    set ref(ref) {
        if (!this._recipe.refs) {
            this._recipe.refs = [];
        }
        // if (!this._recipe.refs.find(r => r.id === ref.id)) {
        //     this._recipe.refs.push(ref);
        // }
        const oldRef = NewRecipe._getByInternalId(this._recipe.refs, ref);
        if (oldRef) {
            // allowed to update only these fields ??
            oldRef.optional = ref.optional;
            oldRef.norma = ref.norma;
        } else {
            this._recipe.refs.push({
                ...ref,
                [`${INTERNAL_ID_KEY}`]: NewRecipe._getNextInternalId(this._recipe.refs)
            });
        }

    }

    removeRef(ref) {
        if (this._recipe.refs) {
            this._recipe.refs = NewRecipe._getWithoutByInternalId(this._recipe.refs, ref);
        }
    }

    set proportion(proportion) {
        if (!this._recipe.proportions) {
            this._recipe.proportions = [];
        }

        const oldProportion = NewRecipe._getByInternalId(this._recipe.proportions, proportion);

        if (oldProportion) {
            // allowed to update only these fields
            oldProportion.optional = proportion.optional;
            oldProportion.norma = proportion.norma;
        } else {
            this._recipe.proportions.push({
                ...proportion,
                [`${INTERNAL_ID_KEY}`]: NewRecipe._getNextInternalId(this._recipe.proportions)
            });
        }
    }

    removeProportion(prop) {
        if (this._recipe.proportions) {
            this._recipe.proportions = NewRecipe._getWithoutByInternalId(this._recipe.proportions, prop);
        }
    }

    setAlternativeProportions(proportion, altProportions) {
        const foundProportion = NewRecipe._getByInternalId(this._recipe.proportions, proportion);
        foundProportion.alternativeProportions = altProportions.map(altP => ({
            ...altP
        }))
    }

    setAlternativeRefs(proportion, altRefs) {
        const foundProportion = NewRecipe._getByInternalId(this._recipe.proportions, proportion);
        foundProportion.alternativeRefs = altRefs.map(altP => ({
            ...altP
        }))
    }

    set detail (detail) {
        if (!this._recipe.details) {
            this._recipe.details = [];
        }

        let oldDetail = NewRecipe._getByInternalId(this._recipe.details, detail);

        if (oldDetail) {
            //then update these fields, img path can not be changed
            oldDetail.description = detail.description;
            oldDetail.order = this._calculateDetailOrder(detail);
        } else {
            //then create
            this._recipe.details.push({
                description: detail.description,
                filePath: detail.imgPath,
                order: this._calculateDetailOrder(detail),
                [`${INTERNAL_ID_KEY}`]: NewRecipe._getNextInternalId(this._recipe.details)
            });
        }
    }

    reorderDetails(detailFrom, detailTo) {
        let oldDetailFrom = NewRecipe._getByInternalId(this._recipe.details, detailFrom);
        this._recipe.details.filter(d => d.order >= detailTo.order).forEach(d => d.order = d.order + 1);
        oldDetailFrom.order = detailTo.order;
        this._recipe.details = this._recipe.details.sort((d1,d2) => d1.order - d2.order);
    }

    _calculateDetailOrder(detail) {
        if (detail.order) return detail.order;
        if (this._recipe.details.length === 0) {
            return 1;
        } else {
            return this._recipe.details[this._recipe.details.length - 1].order + 1;
        }
    }

    removeDetail(detail) {
        if (this._recipe.details) {
            this._recipe.details = NewRecipe._getWithoutByInternalId(this._recipe.details, detail);
        }
    }

    async save() {
        const method = this._recipe.id ? 'PUT' : 'POST';
        const newRecipe = await doJsonRequest(routes.POST_CREATE_RECIPE, method, this._recipe);
        return newRecipe.id;
    }

    clear() {
        this._recipe = {};
    }
}

export default new NewRecipe();
