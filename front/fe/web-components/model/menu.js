import Model from '../abstract/model';
import {retrieveRecipesByIds} from "../utils/asyncRequests";

class Menu extends Model {

    constructor() {
        super();

        this.$recipes = [];
        this.$ids = [];

        this.addRecipe = this.addRecipe.bind(this);
        this.retrieve = this.retrieve.bind(this);
    }

    get recipes() {
        return [...this.$recipes.map(recipe => {
            return {
                id: recipe.id,
                name: recipe.name,
                proportions: recipe.proportions.map(p => ({
                    norma: p.norma,
                    ingredientId: p.ingredientId,
                    ingredientName: p.ingredientName
                }))
            }
        })];
    }

    get ids() {
        return [...this.$ids];
    }

    addRecipe(id) {
        this.$ids.push(id);
    }

    async retrieve() {
        this.$recipes = await retrieveRecipesByIds(this.$ids);
        this.notifySubscribers();
    }

}

export default new Menu();
