import Model from '../abstract/model';
import mTranslations from "./translations";
import mRecipeSearch from "./recipeSearch";
import mDepartments from "./departments";

class Menu extends Model {

    constructor() {
        super();

        this.$recipes = [];

        this.addRecipe = this.addRecipe.bind(this);
    }

    get recipes() {
        return [...this.$recipes];
    }

    addRecipe(id) {
        this.$recipes.push(id);
    }

}

export default new Menu();
