import routes, {getImageSmallCopy} from '../../constants/Routes';
import Model from '../abstract/model';
import {getResponse} from "../utils/httpUtils";
import mNotification from "./notification";
import {INTERNAL_ID_KEY} from '../../constants/common';

export class Recipe extends Model {

    constructor() {
        super();

        this._recipe = {};

        this.retrieve = this.retrieve.bind(this);
        this._setRecipe = this._setRecipe.bind(this);
    }

    get id() {
        return this._recipe.id;
    }

    get name() {
        return this._recipe.name;
    }

    get text() {
        return this._recipe.text;
    }

    get refs() {
        if (!this._recipe.refs || !this._recipe.refs.length) {
            return null;
        }
        return this._recipe.refs.map(ref => ({
            ...ref
           // id: ref.recipeId,
           // name: ref.recipeName,
           // optional: ref.optional,
           // [`${INTERNAL_ID_KEY}`]: detail[`${INTERNAL_ID_KEY}`],
            // imgPath: getImageSmallCopy(ref.imgPath && routes.IMAGE_CATALOG + ref.imgPath),
           // imgPathFull: ref.imgPath && routes.IMAGE_CATALOG + ref.imgPath
        }));
    }

    get imgPath() {
        return getImageSmallCopy(this._recipe.imgPath && routes.IMAGE_CATALOG + this._recipe.imgPath);
    }

    get imgPathFull() {
        return this._recipe.imgPath && routes.IMAGE_CATALOG + this._recipe.imgPath;
    }

    get proportions() {
        return this._recipe.proportions
            && this._recipe.proportions.map(prop => ({ ...prop,
                alternativeProportions: prop.alternativeProportions && prop.alternativeProportions.map(altP => ({...altP}))
            }));
    }

    get details() {
        return this._recipe.details && this._recipe.details.map((detail) => {
            const {filePath, id, order, description} = detail;
            const isTempImage = filePath && `/${filePath}`.startsWith(routes.TEMP_CATALOG);
            return {
                id,
                description,
                order,
                [`${INTERNAL_ID_KEY}`]: detail[`${INTERNAL_ID_KEY}`],
                imgPath: isTempImage ? filePath : getImageSmallCopy(routes.IMAGE_CATALOG + filePath),
                imgPathFull: isTempImage ? filePath : routes.IMAGE_CATALOG + filePath
            }
        });
    }

    retrieve(id) {
        fetch(routes.GET_RECIPE(id))
            .then(getResponse)
            .then(this._setRecipe)
            .catch(e => {
                mNotification.message = e.message;
            });
    }

    _setRecipe(newRecipe) {
        this._recipe = newRecipe;
        // check and fix orders of details
        this._recipe.details = this._recipe.details.sort((d1,d2) => d1.order - d2.order);
        this._recipe.details.forEach((d, i) => d.order = i + 1);
        // todo: set internalId's for detail's search
        this._recipe.proportions = this._recipe.proportions.map((p, i) => ({...p, [`${INTERNAL_ID_KEY}`]: i}));
        this.notifySubscribers();
    }
}

export default new Recipe();
