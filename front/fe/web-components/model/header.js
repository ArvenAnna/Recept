import Model from '../abstract/model';
import mTranslations from "./translations";
import mRecipeSearch from "./recipeSearch";
import mDepartments from "./departments";

const NEW_RECIPE_ID = 1;
const INGREDIENTS_ID = 2;
const NEW_INGREDIENT_ID = 3;
const EDIT_RECIPE_ID = 4;
const EDIT_INGREDIENT_ID = 5;
const MENU_ID = 6;

class Header extends Model {

    get buttons() {
        return Object.values(this.$menu).filter(button => button.active).map(button => ({name: button.name, to: button.to}));
    }

    constructor() {
        super();

        mTranslations.addSubscriber(this._setTranslations);

        this.$menu = {
            NEW_RECIPE: { trans: mTranslations.getTranslation('common.new_recipe'), id: NEW_RECIPE_ID, linkFn: () => '/recipe', active: true },
            INGREDIENTS: { trans: mTranslations.getTranslation('common.ingredients'), id: INGREDIENTS_ID, linkFn: () =>'/ingredients', active: true },
            NEW_INGREDIENT: { trans: mTranslations.getTranslation('common.new_ingredient'), id: NEW_INGREDIENT_ID, linkFn: () =>'/ingredient', active: true },
            EDIT_RECIPE: { trans: mTranslations.getTranslation('common.edit_recipe'), id: EDIT_RECIPE_ID, linkFn: (id) => `/recipe/${id}/edit`, active: false},
            EDIT_INGREDIENT:  { trans: mTranslations.getTranslation('common.edit_ingredient'), id: EDIT_INGREDIENT_ID, linkFn: (id) => `/ingredients/${id}/edit`, active: false},
            MENU: {trans: mTranslations.getTranslation('common.menu'), id: MENU_ID, linkFn: () => `/menu`, active: true}

        };

        this.addRecipeEditButton = this.addRecipeEditButton.bind(this);
        this.removeRecipeEditButton = this.removeRecipeEditButton.bind(this);
        this.addIngredientEditButton = this.addIngredientEditButton.bind(this);
        this.removeIngredientEditButton = this.removeIngredientEditButton.bind(this);
        this._initButtons = this._initButtons.bind(this);
        this._setTranslations = this._setTranslations.bind(this);

        this._initButtons();
    }

    async _setTranslations() {
        const translations = await Promise.all(Object.values(this.$menu).map(v => v.trans));
        Object.values(this.$menu).forEach((value, i) => {
            value.name = translations[i];
        });
    }

    async _initButtons() {
        // const translations = await Promise.all(Object.values(this.$menu).map(v => v.trans));

        await this._setTranslations();
        // Object.values(this.$menu).forEach((value, i) => {
        //     value.name = translations[i];
        // });

        this.$menu.NEW_RECIPE.to = this.$menu.NEW_RECIPE.linkFn();
        this.$menu.INGREDIENTS.to = this.$menu.INGREDIENTS.linkFn();
        this.$menu.NEW_INGREDIENT.to = this.$menu.NEW_INGREDIENT.linkFn();
        this.$menu.MENU.to = this.$menu.MENU.linkFn();
        this.notifySubscribers();
    }

    addRecipeEditButton(id) {
       this.$menu.EDIT_RECIPE.to = this.$menu.EDIT_RECIPE.linkFn(id);
       this.$menu.EDIT_RECIPE.active = true;
       this.notifySubscribers();
    }

    removeRecipeEditButton() {
        this.$menu.EDIT_RECIPE.active = false;
        this.notifySubscribers();
    }

    addIngredientEditButton(id) {
        this.$menu.EDIT_INGREDIENT.to = this.$menu.EDIT_INGREDIENT.linkFn(id);
        this.$menu.EDIT_INGREDIENT.active = true;
        this.notifySubscribers();
    }

    removeIngredientEditButton() {
        this.$menu.EDIT_INGREDIENT.active = false;
        this.notifySubscribers();
    }

    disconnectedCallback() {
        mTranslations.removeSubscriber(this._setTranslations);
    }
}

export default new Header();
