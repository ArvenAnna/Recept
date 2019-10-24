import {Recipe} from './recipe';
import routes from '../../constants/Routes';
import {doJsonRequest} from '../utils/httpUtils';

class NewRecipe extends Recipe {

    constructor() {
        super();

        this._calculateDetailOrder = this._calculateDetailOrder.bind(this);
        this._findDetailInList = this._findDetailInList.bind(this);
        this.reorderDetails = this.reorderDetails.bind(this);
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
        if (!this._recipe.refs.find(r => r.id === ref.id)) {
            this._recipe.refs.push(ref);
        }
    }

    removeRef(ref) {
        if (this._recipe.refs) {
            this._recipe.refs = this._recipe.refs.filter(r => r.id !== ref.id);
        }
    }

    set imgPath(path) {
        this._recipe.imgPath = path;
    }

    get imgPath() {
        return super.imgPath;
    }

    set proportion({ingredient, norma, optional}) {
        if (!this._recipe.proportions) {
            this._recipe.proportions = [];
        }
        this._recipe.proportions.push({
            ingredientId: ingredient.id,
            ingredientName: ingredient.name,
            norma,
            optional
        });
    }

    removeProportion(prop) {
        if (this._recipe.proportions) {
            this._recipe.proportions = this._recipe.proportions.filter(p => p.ingredientName !== prop.ingredientName);
        }
    }

    set detail (detail) {
        if (!this._recipe.details) {
            this._recipe.details = [];
        }

        let oldDetail = this._findDetailInList(detail);

        // img path can not be changed
        if (oldDetail) {
            //then update
            oldDetail.description = detail.description;
            oldDetail.order = this._calculateDetailOrder(detail);
        } else {
            //then create
            this._recipe.details.push({
                description: detail.description,
                filePath: detail.imgPath,
                order: this._calculateDetailOrder(detail)
            });
        }
    }

    reorderDetails(detailFrom, detailTo) {
        let oldDetailFrom = this._findDetailInList(detailFrom);
        // let oldDetailTo = this._findDetailInList(detailTo);
        this._recipe.details.filter(d => d.order >= detailTo.order).forEach(d => d.order = d.order + 1);
        oldDetailFrom.order = detailTo.order;
        this._recipe.details = this._recipe.details.sort((d1,d2) => d1.order - d2.order);
    }

    _findDetailInList(detail) {
        if (detail.id) {
            return this._recipe.details.find(p => p.id == detail.id);
        } else {
            return this._recipe.details.find(p => detail.imgPathFull && p.filePath == detail.imgPathFull);
        }
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
            if (detail.id) {
                this._recipe.details = this._recipe.details.filter(p => p.id !== detail.id);
            } else {
                this._recipe.details = this._recipe.details.filter(p => p.filePath !== detail.imgPath);
            }
        }
    }

    async save() {
        const method = this._recipe.id ? 'PUT' : 'POST';
        let newRecipe = await doJsonRequest(routes.POST_CREATE_RECIPE, method, this._recipe);
        return newRecipe.id;
    }

    clear() {
        this._recipe = {};
    }
}

export default new NewRecipe();
