import Model from '../abstract/model';

const NEW_RECIPE_ID = 1;
const INGREDIENTS_ID = 2;
const NEW_INGREDIENT_ID = 3;
const EDIT_RECIPE_ID = 4;

class Header extends Model {

    get buttons() {
        return this._buttons.map(button => ({...button}));
    }

    constructor() {
        super();

        this._buttons = [
            { name: 'Новый рецепт', id: NEW_RECIPE_ID, to: '/recipe' },
            { name: 'Ингридиенты', id: INGREDIENTS_ID, to: '/ingredients' },
            { name: 'Новый ингридиент', id: NEW_INGREDIENT_ID, to: '/ingredient' }
        ];

        this.addRecipeEditButton = this.addRecipeEditButton.bind(this);
        this.removeRecipeEditButton = this.removeRecipeEditButton.bind(this);
    }

    addRecipeEditButton(id) {
        if (!this._buttons.find(bt => bt.id === EDIT_RECIPE_ID)) {
            this._buttons.push ({'name': 'Редактировать рецепт', 'id': EDIT_RECIPE_ID, 'to': `/recipe/${id}/edit`});
        } else {
            // if button already present, then only update link
            this._buttons.find(bt => bt.id === EDIT_RECIPE_ID).to = `/recipe/${id}/edit`;
        }
        this.notifySubscribers();
    }

    removeRecipeEditButton() {
        this._buttons = this._buttons.filter(button => button.id !== EDIT_RECIPE_ID);
        this.notifySubscribers();
    }
}

export default new Header();
