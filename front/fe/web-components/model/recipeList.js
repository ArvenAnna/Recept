import routes from '../../constants/Routes';
import Model from '../abstract/model';

class RecipeList extends Model {

    constructor() {
        super();

        this._recipes = [];

        this.retrieve = this.retrieve.bind(this);
        this._setRecipes = this._setRecipes.bind(this);
    }

    get recipes() {
        return this._recipes.map(recipe => ({
            id: recipe.id,
            name: recipe.name,
            imgPath: recipe.imgPath && routes.IMAGE_CATALOG + recipe.imgPath
        }))
    }

    retrieve(departId) {
        fetch(routes.GET_RECIPES(departId))
            .then(res => res.json())
            .then(this._setRecipes);
    }

    _setRecipes(newRecipes) {
        this._recipes = newRecipes;
        this.notifySubscribers();
    }
}

export default new RecipeList();
