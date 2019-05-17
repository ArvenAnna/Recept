import Model from '../abstract/model';

class Header extends Model {

    get buttons() {
        return this._buttons.map(button => ({...button}));
    }

    constructor() {
        super();

        this._buttons = [
            {'name': 'Новый рецепт', 'id': 1, 'to': '/newRecept'},
            {'name': 'Ингридиенты', 'id': 2, 'to': '/ingridients'},
        ];

        // this.retrieve = this.retrieve.bind(this);
        // this._setRecipe = this._setRecipe.bind(this);
    }

    // retrieve(id) {
    //     fetch(routes.GET_RECIPE(id))
    //         .then(res => res.json())
    //         .then(res => this._setRecipe(res));
    // }
    //
    // _setRecipe(newRecipe) {
    //     this._recipe = newRecipe;
    //     this.notifySubscribers();
    // }
}

export default new Header();
