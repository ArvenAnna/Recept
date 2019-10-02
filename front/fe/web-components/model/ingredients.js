import routes from '../../constants/Routes';
import Model from '../abstract/model';
import {getResponse} from "../utils/httpUtils";
import mNotification from "./notification";

class Ingredients extends Model {

    constructor() {
        super();

        this._ingredients = [];
        // this._ingredients_in_tree = [];

        this.bindMethods(this._setIngredients, this.retrieve);
        this._getTree = this._getTree.bind(this);
        this._buildNodes = this._buildNodes.bind(this);
        this.add = this.add.bind(this);
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
                mNotification.message = e.message;
            });
    }

    add (ingredient) {
        this._ingredients.push(ingredient);
        if (ingredient.parent) {
            const parent = this._ingredients.find(ing => ing.id === ingredient.parent);
            if (!parent.children) {
                parent.children = [];
            }
            parent.children.push(ingredient.id);
        }
        this.notifySubscribers();
    }

    _setIngredients(newIngredients) {
        this._ingredients = newIngredients;
        this.notifySubscribers();
    }
}

export default new Ingredients();
