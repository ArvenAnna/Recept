import {Recipe} from './recipe';
import routes from '../../constants/Routes';
import {getResponse} from "../utils/httpUtils";

import mNotification from './notification';

class NewRecipe extends Recipe {

    constructor() {
        super();
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

    set proportion({ingredient, norma}) {
        if (!this._recipe.proportions) {
            this._recipe.proportions = [];
        }
        this._recipe.proportions.push({
            ingredientId: ingredient.id,
            ingredientName: ingredient.name,
            norma
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
        this._recipe.details.push({
            description: detail.description,
            filePath: detail.imgPath
        });
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
        let newRecipe = await fetch(routes.POST_CREATE_RECIPE, {method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this._recipe)})
            .then(getResponse)
            .catch(e => {
                mNotification.message = e.message;
            });
        return newRecipe.id;
    }

    clear() {
        this._recipe = {};
    }
}

export default new NewRecipe();
