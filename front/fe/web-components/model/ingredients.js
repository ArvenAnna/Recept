import routes from '../../constants/Routes';
import Model from '../abstract/model';
import {getResponse} from "../utils/httpUtils";
import mNotification from "./notification";
import {SEVERITY_TYPES} from "../common-notification";

class Ingredients extends Model {

    constructor() {
        super();

        this._ingredients = [];
        // this._ingredients_in_tree = [];

        this._setIngredients = this._setIngredients.bind(this);
        this.retrieve = this.retrieve.bind(this);
        this._getTree = this._getTree.bind(this);
        this._buildNodes = this._buildNodes.bind(this);
        // this.add = this.add.bind(this);
    }

    get ingredients() {
        return this._getTree();
    }

    _getTree() {
        //find root ingredients:
        const rootIngredients = this._ingredients.filter(ing => !ing.parent).map(ing => ({...ing}));
        const nodeIngredients = this._ingredients.filter(ing => ing.parent).map(ing => ({...ing}));
        this._buildNodes(rootIngredients, nodeIngredients);
        return rootIngredients;
    }

    _buildNodes(rootIngredients, nodeIngredients) {
        rootIngredients.forEach(root => {
            if (root.children && root.children.length) {
                root.children = root.children.map(childId => {
                    return nodeIngredients.find(ing => ing.id === childId);
                });
                this._buildNodes(root.children, nodeIngredients);
            }
        })
    }

    retrieve() {
        fetch(routes.INGREDIENTS)
            .then(getResponse)
            .then(newIngredients => this._setIngredients(newIngredients))
            .catch(e => {
                mNotification.showMessage(e.message, SEVERITY_TYPES.ERROR);
                console.error(e);
            });
    }

    _setIngredients(newIngredients) {
        this._ingredients = newIngredients;
        this.notifySubscribers();
    }
}

export default new Ingredients();
